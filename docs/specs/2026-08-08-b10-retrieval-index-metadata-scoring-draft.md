# B10 檢索索引表：語義標籤 × 來源屬性 × Query-time 加成

- 短代號：D55
- 狀態：草稿
- 裁決來源：無
- 實作參照：無
- 後繼：以 D54/B9 為直接 baseline；先以固定 TeachingRequest 做紙上與小樣本查詢試跑，再決定權重、分數區間與資料表實作；本稿不修改 ModuleCore／Semantic Edge canonical

- 日期：2026-08-08
- 分支：`REBUILD1`
- 直接上游：[D54｜B9 薄提取：模塊標籤優先級 × 3–5 收手](2026-08-08-b9-thin-pool-extraction-priority-cap.md)
- 上游架構：[D53｜B8 全域知識池 × 遞迴專案分解 × 教學適配候選](2026-08-08-b8-global-knowledge-pool-recursive-project-teaching.md)

---

## 0. 目的

D54 已把 Global Knowledge Pool 的提取限制成：先硬篩、再排序、目標 3 個、最多 5 個。

本稿進一步整理「排序與快速搜尋所需的資料」，核心不是先做總分公式，而是建立可進資料庫、可快速檢索、可日後調權重的結構化檢索表。

核心原則：

> **資料庫保存可觀察屬性與原始分數；Project/Teaching 查詢時才產生本次檢索排序。**

避免把不同語義的資訊一開始壓成不可解釋的單一總分。

---

# Part A｜四層資料

## 1. Module 語義索引

Module 的搜尋重點是「這個 Module 在講什麼、能做什麼、適用於什麼情境」。

建議索引欄位：

```text
ModuleSemanticIndex
- module_id
- name
- summary
- concepts[]
- attributes[]
- operations[]
- problem_types[]
- input_types[]
- output_types[]
- constraints[]
- failure_modes[]
- edge_refs[]
```

其中 `concepts / attributes / operations ...` 可帶簡單相關分數。

例：

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

這些分數只回答：

> **某標籤對該 Module 有多核心。**

不得解讀為：權威度、真實度、來源品質或本次 Project 的適用性。

---

## 2. Source 中繼資料

來源相關資料應由 Source 擁有，不直接變成 Module 真值。

```text
SourceMetadata
- source_id
- title
- year
- author / organization
- source_type
- authority_score
- provenance
```

### 2.1 年份

第一版保存原始年份：

```text
year = 2026
```

不預先轉成 1–5 分。

原因：年份的價值依領域而變。

例如：

- API／軟體文件通常高度受時間影響。
- 數學定理、經典理論不一定越新越好。

因此「年份 → 檢索加權」留到 query-time 或後續領域規則處理。

### 2.2 權威度

`authority_score` 評的是來源，而不是 Module 本身。

第一版只要求：

- 可解釋。
- 可人工修改。
- 不因同來源有很多 Module 而重複建立多份真值。

如果來源權威度日後改變，應由 Source 層更新；搜尋索引可同步展開或 cache，但 source of truth 仍在 Source。

---

## 3. Module × Source 內容占比

「內涵文章量」收斂成 `content_share`。

定義：

> **某 Module／主題在該來源實質內容中所占的比重，反映它在來源中是主題核心還是順帶提及。**

例如：

```text
Source S17 = 10,000 字
其中約 2,000 字實質處理 rolling window
→ content_share ≈ 0.20
```

建議資料：

```text
ModuleSourceProfile
- module_id
- source_id
- content_share
- source_span / char_span
```

`content_share` 不代表內容品質，只代表「這個來源在這個主題上投入了多少內容」。

如果同一 Module 由多個來源形成／對照，應保留多筆 ModuleSourceProfile，而不是把來源資訊壓掉。

---

## 4. Query-time 原文加成

「原文加成」不是永久 Module 分數，而是本次 Project/TeachingRequest 的動態特徵。

例如：

```text
current_project.source_id = S17

Candidate M102.source_id = S17
→ original_source_bonus = ON / +N

Candidate M221.source_id = S88
→ original_source_bonus = 0
```

精確語義：

> **當候選 Module 的 provenance 與本次 Project 的直接來源相符時，提高檢索優先級。**

它表示 context proximity，不表示 authority 或 truth。

數字大小暫不裁定，後續依試跑調整。

---

# Part B｜檢索表

## 5. 可進資料庫的索引資料

檢索層可以為查詢效率做 denormalized view，但必須知道每個欄位的 source of truth。

建議檢索資料視圖：

```text
RetrievalIndex
- module_id
- name
- summary

# Module semantic
- concepts + relevance
- attributes + relevance
- operations + relevance
- problem_types
- input_types
- output_types
- constraints
- failure_modes

# Source projected metadata
- source_id
- source_year
- authority_score

# Module × Source
- content_share
- provenance_ref

# Graph
- edge_refs
```

Query-time 再加入：

```text
QueryFeatures
- original_source_bonus
- query_tag_match
- hard_filter_result
```

不把 `original_source_bonus` 永久寫回 Module 或 Source。

---

## 6. 快速搜索流程

```text
AtomicStep / TeachingRequest
↓
抽取 query tags / needs
↓
DB filter / search RetrievalIndex
↓
Hard Filter
├─ 明確衝突 → Reject
├─ 資料不足 → Unknown
└─ 無硬衝突 → Candidate
↓
建立 Retrieval Table
↓
用欄位直接比較
- 語義標籤相符
- 原文加成
- 年份
- content_share
- authority
↓
去除確定等價重複
↓
目標 3、最多 5
↓
TeachingBundle
```

第一版不要求複雜總分，也不要求所有候選排出完整名次。

---

# Part C｜檢索表顯示

## 7. 建議顯示欄位

例：

| Module | 主要語義標籤 | 原文加成 | 年份 | 內容占比 | 權威度 |
|---|---|---:|---:|---:|---:|
| M102 | rolling 5 / window 5 | + | 2026 | 32% | 4 |
| M221 | leakage 5 / rolling 4 | — | 2025 | 18% | 5 |
| M304 | rolling 5 | — | 2023 | 55% | 3 |
| M410 | smoothing 4 | — | 2026 | 12% | 5 |

用途：

1. Agent 可以快速判斷候選差異。
2. 使用者／開發者可以看懂為什麼某 Module 被選中。
3. 權重調整前仍能保留原始資訊，不被總分遮蔽。
4. 可以直接作 DB query 結果或 debug view。

---

# Part D｜分數語義隔離

## 8. 三類數字不得混用

### A. Module 語義相關分

回答：

> 這個標籤對 Module 有多核心？

例：

```text
rolling_mean = 5
time_series = 4
statistics = 2
```

### B. Source 屬性

回答：

> 這份來源具備什麼外部條件？

例：

```text
year = 2026
authority_score = 4
```

其中 `year` 優先保留原值，不硬映射成分數。

### C. Query-time 情境加成

回答：

> 這個候選對「本次 Project」是否具有額外優先性？

例：

```text
original_source_bonus = +N
```

三類數字不得在 schema 語義上互相替代。

---

# Part E｜第一版不做什麼

## 9. 暫不建立總分公式

第一版禁止直接把：

```text
semantic
+ year
+ authority
+ content_share
+ original_source_bonus
```

壓成：

```text
score = 87.3
```

原因：

- 權重尚未有實測資料。
- 不同領域年份意義不同。
- 總分會隱藏某候選到底靠什麼勝出。
- D54 目前真正目的只是快速找出 3–5 個可用 Module，不需要完整 ranking engine。

第一版允許簡單排序規則或 Agent 根據檢索表判斷；若未來累積足夠 trace，再另案設計總分／權重。

---

## 10. 不把 Source 資料複製成新的真值

為搜尋速度可以在 `RetrievalIndex` denormalize：

```text
source_year
authority_score
```

但必須明確：

```text
SourceMetadata = source of truth
RetrievalIndex = search projection/cache
```

來源評級改動時由索引重建／同步，不逐 Module 人工維護。

---

# Part F｜與 D53/D54 的關係

## 11. D53/B8 保留

- Global Knowledge Pool。
- Module + Semantic Edge → Knowledge Graph view。
- Project execution hierarchy 與 Knowledge Graph 分離。
- Teaching 只在 human capability blocker 時啟動。
- B Pool reuse，必要時 A Generate。
- same/similar comparison。

## 12. D54/B9 保留

- Hard Filter 優先。
- `Reject / Unknown / Candidate`。
- 目標 3、最多 5。
- equivalent 重複壓縮。
- Graph 鄰接 Module 共用同一 3–5 evidence budget。

## 13. D54 改寫部分

D54 暫定的「原文本 5、其他有質量來源 4」不再作唯一主要排序模型。

改成拆開保存：

```text
原文本 → query-time original_source_bonus
年份 → SourceMetadata.year
內容量 → ModuleSourceProfile.content_share
權威度 → SourceMetadata.authority_score
語義相關 → ModuleSemanticIndex tag relevance
```

數字後續再依試跑調整，不需要重寫 ModuleCore。

---

# Part G｜試跑要回答的問題

## 14. 第一版必測

1. **Search latency**：結構化索引是否能比重讀全文更快取得候選。
2. **Top-5 coverage**：使用此檢索表後，3–5 個候選能否覆蓋解卡所需知識。
3. **Original-source bias**：原文加成是否讓較差但同來源候選不合理壓過更合適外部 Module。
4. **Authority usefulness**：authority_score 是否實際幫助選擇，還是只增加欄位。
5. **Content-share usefulness**：高 content_share 是否真的與「可教／可用」相關。
6. **Year usefulness**：哪些領域需要 freshness，哪些領域應忽略年份。
7. **Tag relevance quality**：概念／操作／屬性分數能否支援快速初篩。
8. **Debuggability**：選錯 Module 時，是否能從檢索表直接看出錯在語義、來源、年份、內容占比或原文偏置。

未取得上述資料前，不建立正式總分公式。

---

# Part H｜目前候選結論

## 15. B10

目前方案可濃縮為：

```text
Global Knowledge Pool
↓
ModuleSemanticIndex
+ SourceMetadata
+ ModuleSourceProfile
↓
Query-time original_source_bonus
↓
Retrieval Table
↓
Hard Filter
↓
快速比較
↓
取 3–5 個
```

資料責任：

```text
Module
→ 語義標籤與相關程度

Source
→ 年份、作者／組織、權威度、provenance

Module × Source
→ content_share / source span

Query
→ 原文加成與本次匹配特徵
```

本稿目前只取得：

> **可試作候選。**

尚未證明比 D54 的簡單 5/4 提取在實際 recall、速度或 retry 成功率上更好。
