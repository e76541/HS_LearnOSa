# B10 檢索表：Module 語義索引 × Source 屬性 × Query-time 加成

- 短代號：D55
- 狀態：草稿
- 裁決來源：無
- 實作參照：無
- 後繼：以 D54/B9 的「3–5 收手」為直接上游；先完成資料欄位與查詢投影試作，再以同一 TeachingRequest 比較檢索速度、候選品質與可解釋性；本稿不修改 ModuleCore／Semantic Edge canonical

- 日期：2026-08-08
- 分支：`REBUILD1`
- 上游：D53、D54
- 直接基底：Global Knowledge Pool、可溯源 Module、Knowledge Graph、TeachingRequest、3–5 提取上限

---

## 0. 目的

D54 已把 Pool 提取收斂為：

```text
TeachingRequest
→ hard filter
→ priority / 去重
→ 目標 3，最多 5
→ TeachingBundle
```

本稿處理下一個問題：**如何讓候選 Module 可以直接進資料庫、快速查詢，而且每個數字都有明確語義，不先壓成不可解釋的總分。**

核心原則：

> **資料庫保存可觀察屬性與局部分數；Project/Teaching 查詢時才計算本次情境加成與排序。**

因此本稿不先建立單一 `total_score`，也不把所有數字寫回 ModuleCore。

---

# Part A｜四層資料責任

## 1. Module Semantic Index

Module 層保存「這個模塊在講什麼、能做什麼」。

建議檢索欄位：

```text
module_id
name
summary

concepts[]
attributes[]
operations[]
problem_types[]
input_types[]
output_types[]
constraints[]
failure_modes[]
verification_tags[]

source_id
edge_refs[]
```

其中可對語義標籤附 **relevance score**：

```text
concepts:
- rolling_mean: 5
- time_series: 4
- statistics: 2

operations:
- rolling: 5
- aggregation: 5
- smoothing: 3
```

這個分數只回答：

> **此標籤對這個 Module 有多核心。**

它不代表：

- 來源權威度。
- 內容正確性。
- 本次 Project 適用度。
- 永久品質排名。

---

## 2. Source Metadata

Source 層保存來源本身的屬性：

```text
source_id
source_title
author / organization
publisher
published_at / source_year
source_type
authority_score
provenance
```

### 2.1 年份

第一版直接保存實際年份：

```text
source_year = 2026
```

不先轉成 1–5。

理由：年份是否重要依領域而異。

例如：

- API／軟體文件：新版本通常更重要。
- 數學定理／基礎理論：新年份不自然代表更好。

因此 `year → ranking effect` 留到 query-time 規則處理。

### 2.2 權威度

`authority_score` 屬於 Source，不屬於 Module。

例如：

```text
Source S17
authority_score = 5
```

Module 的檢索表可以為了速度冗餘顯示這個值，但 Source 才是唯一真值。

權威度的量尺與判準本稿暫不定死，後續另依資料調整。

---

## 3. Module × Source：內容占比

使用者提出的「內涵文章量」本稿改稱：

> **content_share / 內容占比**

定義：

> 某 Module／主題在其來源中占多少實質內容，反映它在該來源是主題核心還是順帶提及。

例如：

```text
Source S17 = 10,000 字
M102 對應內容 ≈ 3,200 字
content_share ≈ 0.32
```

它回答：

> **這個知識在來源中有多核心。**

它不回答：

> **這個知識有多正確／多權威。**

`content_share` 可視實作放在索引表或 Module-Source relation；不要求 breaking-change ModuleCore。

---

## 4. Query-time：原文加成

原文加成是**動態情境值**，不得永久寫在 Module。

假設目前 Project 的原文本：

```text
current_source_id = S17
```

查到：

```text
M102.source_id = S17
→ original_source_bonus = +N

M221.source_id = S88
→ original_source_bonus = 0
```

`N` 的數值後續再調。

這個加成回答：

> **這個 Module 是否直接來自本次 Project 的文本上下文。**

它不代表該 Module 真實性較高。

換一個 Project 後，同一 Module 的 bonus 可以不同。

---

# Part B｜三類數字必須分離

## 5. 語義相關分

用途：快速查找「這個 Module 在講什麼」。

例如：

```text
rolling_mean: 5
window: 5
time_series: 4
statistics: 2
```

名稱建議：

```text
semantic_relevance
```

---

## 6. 來源屬性

用途：描述知識來源。

例如：

```text
source_year = 2026
authority_score = 4
```

其中年份是原始值，權威度是來源級評分。

---

## 7. 本次情境加成

用途：排序目前 Project／TeachingRequest 的候選。

例如：

```text
original_source_bonus = +5
```

只在 query-time 存在。

禁止把三者合併解讀成同一種「品質分」。

---

# Part C｜檢索表

## 8. 資料庫用途

檢索表的目標不是取代 Source／Module 真值，而是建立可快速 query 的 projection / index。

概念：

```text
Source truth
+
Module semantic truth
+
Module-Source content_share
↓
Retrieval Index / Table
↓
Project query-time bonus / ranking
```

最小檢索列可以是：

```text
module_id
name
summary
semantic_tags
semantic_relevance
source_id
source_year
authority_score
content_share
constraints
failure_modes
```

查詢時再附：

```text
original_source_bonus
matched_tags
hard_filter_state
```

---

## 9. 顯示表範例

假設 TeachingRequest：

```text
rolling + time_series + leakage
```

可投影：

| Module | 核心標籤 | 原文加成 | 年份 | 內容占比 | 權威度 |
|---|---|---:|---:|---:|---:|
| M102 | rolling 5 / window 5 / time_series 4 | +5 | 2026 | 32% | 4 |
| M221 | leakage 5 / rolling 4 | 0 | 2025 | 18% | 5 |
| M304 | rolling 5 / time_series 4 | 0 | 2023 | 55% | 3 |
| M410 | smoothing 4 | 0 | 2026 | 12% | 5 |

第一版**不必產生總分**。

Agent 可以從欄位直接判斷：

- M102：與本次原文最接近，且 Module 主題高度相關。
- M221：不是原文來源，但專門處理 leakage，來源權威高。
- M304：內容占比高，但來源權威度較低。

然後依 D54 的 budget 取 3–5 個即停。

---

# Part D｜查詢流程

## 10. 第一版 runtime

```text
AtomicStep / TeachingRequest
↓
抽 query tags / need
↓
DB 搜 Module Semantic Index
↓
Hard Filter
├─ 明確衝突 → Reject
├─ 資料不足 → Unknown
└─ 無衝突 → Candidate
↓
附 Source Metadata
↓
附 content_share
↓
計算 original_source_bonus
↓
產生 Retrieval Table
↓
去除確定等價／高度重複
↓
目標取 3，最多 5
↓
TeachingBundle
↓
retry AtomicStep
```

### 10.1 Hard Filter 優先於分數

任何分數都不能救回明確不適用的 Module。

至少看：

```text
problem / need
operation
input / output
constraint / failure mode
```

因此：

```text
5 分語義相關 + 原文加成
但 constraint 明確衝突
→ Reject
```

---

# Part E｜和 Knowledge Graph 的關係

## 11. Graph 不另造排名真值

Module + Semantic Edge 仍構成 Global Knowledge Pool 的 Knowledge Graph 視圖。

Graph 的用途：

- 找 prerequisite。
- 找 constraint。
- 找 contrasts。
- 找 verification／failure 相關知識。
- 找 equivalent cluster。

但 Graph 鄰居被拿進 Retrieval Table 後，仍使用同一套欄位與 3–5 budget。

禁止：

```text
先取 5 個 Module
+ Graph 再展開 5 個
```

Graph 只提供候選，不擁有另一套配額與總分。

---

# Part F｜資料正規化與檢索冗餘

## 12. 真值與索引分開

### Source truth

```text
year
author
publisher
authority
provenance
```

### Module semantic truth / indexable fields

```text
concept
attribute
operation
problem_type
input / output
constraint
failure_mode
verification
```

### Module-Source relation

```text
content_share
source span / provenance link
```

### Query-time

```text
original_source_bonus
matched_tags
ranking / shortlist
```

檢索表為了效能可以把 `source_year / authority_score` 冗餘帶入，但不因此改變 source of truth。

---

# Part G｜第一版不做的東西

## 13. 暫不實作

本稿第一版明確不做：

1. 單一 `total_score`。
2. 0.xx 的複雜相似度總評。
3. 年份固定轉成 1–5。
4. 每個 Module 自己永久保存原文加成。
5. 把 authority 寫成 Module 真值。
6. 大型 reranker／多階段 agent judge。
7. Graph traversal 獨立 scoring engine。
8. 為每一個標籤建立複雜 ontology 權重。

原因：目前需要先證明結構化檢索表是否已足以支援快速搜索與 3–5 提取。

---

# Part H｜待調數字

## 14. 可調參數

使用者已明確表示數字後續再調，因此以下都列為參數，不升格為固定規範：

```text
semantic_relevance scale
original_source_bonus
source authority scale
content_share calculation
D54 target_count = 3
D54 normal_cap = 5
```

調參時應盡量只改 index/query policy，不重寫 ModuleCore。

---

# Part I｜自檢

## 15. 對 D54/B9 的十二項檢查

| 指標 | 結果 | 判斷 |
|---|---|---|
| E1 單一責任 | P | Module 管語義；Source 管來源；Module-Source 管內容占比；query 管原文加成 |
| E2 單一真值 | P | 檢索表是 projection/index，不成為 Source／Module 第二份 canonical truth |
| E3 必要步驟 | P/R | 增加 index 建置，但 runtime 可直接 DB search；淨成本需試跑 |
| E4 分支複雜度 | P | 未新增人工 route；欄位直接投影候選 |
| E5 重複處理 | P/R | 預先索引避免每次重讀全文；index 更新成本需量測 |
| E6 回寫衝突 | P | query bonus 不回寫 Module；Source metadata 各有 owner |
| E7 可追溯性 | P | 每列仍有 module_id / source_id / provenance |
| E8 卡點成本 | P/R | 可先 DB 縮候選再讓 Agent 看 3–5；實際查詢速度待測 |
| E9 可刪除性 | P | 可刪臨場重讀大量來源與不可解釋總分的需求 |
| E10 實作增量 | P/R | 需新增／擴展 retrieval index projection；不需改 canonical core |
| E11 失敗模式 | P/R | 主要風險為標籤錯標、authority 過度影響、content_share 誤估；可由欄位逐項 debug |
| E12 驗證方式 | P | 可比較全文臨場搜尋 vs index table 的速度、命中、漏召回與 retry 成功率 |

### 15.1 資格

目前沒有看到 E1／E2／E6 的直接硬衝突。

因此：

> **D55/B10 = 可試作候選，不得稱優於 D54/B9。**

---

# Part J｜試跑必測

## 16. 第一輪指標

1. **DB candidate latency**：從 TeachingRequest 到候選表的時間／步驟。
2. **Top 3–5 hit usefulness**：3–5 個是否足以組 TeachingBundle。
3. **Original-source bias**：原文加成是否把較差但同源 Module 推得過高。
4. **Authority usefulness**：權威度是否真的協助選到可用知識，而非只偏好名氣大的來源。
5. **Content-share usefulness**：內容占比是否能有效區分「主題核心」和「順帶一提」。
6. **Semantic-tag precision**：名詞／屬性／操作標籤是否能快速命中真正相關 Module。
7. **Index staleness**：Source metadata 修改後檢索表是否能正確更新，不產生雙真值。
8. **Explainability**：Agent 能否直接說明「為什麼這三個 Module 被選中」。

---

## 17. 目前結論

本版把 D54 的簡單 `5 / 4` 優先級展開成可資料庫化的多欄檢索表，但仍不建立總分：

```text
Module Semantic Index
├─ 名詞／概念 + relevance
├─ 屬性 + relevance
├─ operations + relevance
├─ I/O
├─ constraints
└─ failure modes

Source Metadata
├─ year
├─ authority
└─ provenance

Module × Source
└─ content_share

Query-time
└─ original_source_bonus

↓
Retrieval Table
↓
Hard Filter
↓
取 3–5
```

其目的只有兩個：

1. **可以進資料庫做結構化索引。**
2. **Project／Teaching 卡點時可以快速縮到少量可解釋候選。**

總分、年份權重、權威量尺與各數字大小，全部留待實跑後再調。