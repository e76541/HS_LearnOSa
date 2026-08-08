# B9 薄提取：模塊標籤優先級 × 3–5 收手

- 短代號：D54
- 狀態：草稿
- 裁決來源：無
- 實作參照：無
- 後繼：以 D53/B8 為直接 baseline；先做紙上 trace，再用同一 TeachingRequest 試跑 Pool 提取；本稿不修改 ModuleCore／Semantic Edge canonical

- 日期：2026-08-08
- 分支：`REBUILD1`
- 直接上游：[D53｜B8 全域知識池 × 遞迴專案分解 × 教學適配候選](2026-08-08-b8-global-knowledge-pool-recursive-project-teaching.md)

---

## 0. 目的

D53 的主要新風險是 Global Knowledge Pool 跨來源檢索時，候選太多、表面相似但實際不適用，導致 matching 過度複雜。

本稿不建立完整 scoring engine。先採一個薄提取規則：

```text
AtomicStep / TeachingRequest
→ 硬相容篩選
→ 對候選 Module 加「本次檢索優先級」
→ 排序／去重
→ 取 3–5 個就停止
→ TeachingBundle / same-similar comparison
```

數字只作候選優先級，後續可重調；不得解讀為知識真實性、永久品質分數或 ModuleCore 欄位。

---

# Part A｜標籤與數字

## 1. 不改 ModuleCore

canonical ModuleCore 已凍結，因此本稿不把數字直接寫進 ModuleCore。

採 retrieval/index metadata 或 query-time label：

```text
RetrievalCandidate
- module_id
- retrieval_priority
- match_tags[]
- provenance_ref
```

`retrieval_priority` 只對「這一次 Project / TeachingRequest」有效。

## 2. 暫定優先級

目前只定兩級，其餘數字保留：

| priority | 暫定意義 |
|---|---|
| **5** | 本次 Project 的原文本／直接來源所產生的 Module |
| **4** | 其他已認定有質量、可溯源的來源所產生的 Module |
| **1–3** | 暫不定義；後續有資料再裁 |

重要：

- 5 不代表內容一定正確，只代表與當前 Project context 最近。
- 4 不代表一定次於 5 的真實性，只代表來源不是本次原文本但具可用質量。
- 若 5 分 Module 與 AtomicStep constraint 衝突，仍應先被硬篩淘汰。

---

# Part B｜先硬篩，再看數字

## 3. 硬相容篩選

數字不能救回不適用的 Module。

候選至少檢查：

```text
1. problem / need 是否相容
2. operation 是否能支援當前 Step
3. input / output 是否相容
4. 已知 constraint / failure mode 是否衝突
```

判斷：

```text
任一硬衝突 → Reject
無硬衝突 → Candidate
```

第一版不做複雜加權分數，也不要求 0.xx 相似度。

---

# Part C｜3–5 收手

## 4. 提取上限

硬篩後：

```text
Candidate
→ retrieval_priority 高到低
→ equivalent / 高度重複候選去重
→ 提取目標 3 個
→ 最多 5 個
→ stop
```

精確規則：

1. **3 是目標，不是硬下限。** 若只有 1–2 個真正合格候選，就只回 1–2 個，不為湊數加入弱候選。
2. **5 是硬上限。** 一次 TeachingRequest 不再繼續擴展第 6 個以上候選。
3. Knowledge Graph 鄰接 Module 也算在同一個 5 個名額內，不另開額度。
4. 同一 `equivalent_to` cluster 預設只取一個代表；若本次目的就是做來源比較，才允許同 cluster 取兩個。
5. `contrasts`、constraint、failure/verification 相關鄰接 Module，只有能補足當前 TeachingRequest 缺口時才佔一個名額。

因此禁止：

```text
先取 5 個核心 Module
+ 再展開 5 個 Graph 鄰居
+ 再取 5 個比較案例
```

所有 Pool evidence 先共享一個 3–5 預算。

---

# Part D｜與 A/B Teaching 的關係

## 5. B Pool Retrieve

```text
TeachingRequest
→ Global Pool
→ hard filter
→ priority 5 / 4 / ...
→ dedupe
→ take <=5
```

取得 1–5 個真正可用 Module 後，組成 TeachingBundle。

## 6. 何時切 A Generate

不是「沒拿滿 3 個就 Generate」。

只有當：

```text
Pool 回傳內容不足以讓 parent AtomicStep retry
```

才切 A Generate。

例如：

- 只命中 1 個 Module，但它已足夠解卡 → 不 Generate。
- 命中 4 個，但都缺少本 Step 的操作細節 → Generate 局部補足。

A Generate 仍是 Run-local，不自動寫回 Pool。

---

# Part E｜same / similar comparison

## 7. 比較不另佔 Pool 提取預算

Pool 的 3–5 個是 evidence/module 預算；same/similar 是取得 TeachingBundle 後的適配產物。

```text
Pool <=5 Modules
→ TeachingBundle
→ 按需生成
   - same-case
   - similar-case
```

same/similar 不再回 Pool 重新抓一輪 3–5，除非比較本身暴露新的 blocker。

---

# Part F｜例子

## 8. Rolling mean 卡點

AtomicStep：

```text
Input: 球員逐場資料
Action: rolling mean(20)
Output: MA20
Verification: 無 future leakage，window 定義正確
```

Pool 候選：

```text
M10 本篇文本：rolling mean                    priority 5
M11 本篇文本：window leakage                  priority 5
M40 金融文本：rolling mean                    priority 4
M41 感測器文本：centered moving average       priority 4
M42 時序教材：rolling window verification     priority 4
M43 股票教材：rolling mean                    priority 4
M44 另一教材：exponential moving average      priority 4
```

硬篩：

- M41 若 centered window 會造成未來資料洩漏 → Reject。
- M44 operation 不同且本次不需要比較 → Reject。

去重：

- M10、M40、M43 若 `equivalent_to` 且沒有重要 constraint 差異 → 預設只取 M10；若要做來源差異比較才多取一個。

可能最後：

```text
1. M10 priority 5 — core rule
2. M11 priority 5 — leakage / constraint
3. M42 priority 4 — verification
STOP
```

不用因 Pool 還有幾百個相關 Module 繼續找。

---

# Part G｜對 D53 的修改量

## 9. 保留

- Global Knowledge Pool。
- Knowledge Graph = Module + Semantic Edge 的 view。
- Project 大／中／小 lazy decomposition → AtomicStep。
- human capability blocker 才啟動 Teaching。
- B Pool first，A Generate fallback。
- same / similar comparison。

## 10. 新增／收窄

新增：

1. query-time `retrieval_priority`。
2. 3–5 共用提取預算。

收窄：

1. D53 原本泛稱 matching rule，本稿先不建複雜 matcher，只保留硬相容篩選。
2. Knowledge Graph expansion 不可無限展開，只能在同一 5 個名額內補缺口。

---

# Part H｜十二項自檢

## 11. B9 對 B8

| 指標 | 結果 | 判斷 |
|---|---|---|
| E1 單一責任 | P | Pool仍只供 knowledge retrieval；priority 不取得 Project/Teaching owner |
| E2 單一真值 | P | 數字是 query-time priority，不改 ModuleCore／provenance |
| E3 必要步驟 | P/R | hard filter + top-k 很薄，但是否比更自由檢索更省成本需試跑 |
| E4 分支複雜度 | P | 不新增人工二選一；B不足才 A |
| E5 重複處理 | P/R | equivalent cluster 去重可減候選重複；cluster 品質待測 |
| E6 回寫衝突 | P | priority 不回寫 canonical；Generate 不自動入 Pool |
| E7 可追溯性 | P | 每個候選仍保留 module_id/provenance；priority 本次可重算 |
| E8 卡點成本 | P/R | 3–5 上限限制閱讀／選擇成本；若硬篩過嚴可能漏掉可用 Module |
| E9 可刪除性 | P | 可暫不做複雜 scoring/reranker/多跳 Graph expansion |
| E10 實作增量 | P | 主要是 query-time metadata、hard filter、top-k stop rule |
| E11 失敗模式 | P/R | 主要風險由「候選爆炸」轉為「漏召回」；可用 retry 失敗與 Pool miss 觀察 |
| E12 驗證方式 | P | 可固定同一 TeachingRequest 比 B8自由檢索 vs B9 3–5 提取 |

## 12. 目前資格

> **B9 / D54 = 可試作候選。**

目前不能稱優於 B8；需要比較：候選數、第一次 retry 成功率、漏召回、跨來源 reuse、人工選擇成本。

---

## 13. 一句話

```text
先排除不能用的
→ 原文本候選暫定 priority 5
→ 其他有質量來源暫定 priority 4
→ 去重後取 3，最多 5
→ 夠解卡就收手
→ 不夠才 Generate
```
