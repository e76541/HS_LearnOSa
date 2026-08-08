# B8 全域知識池 × 遞迴專案分解 × 教學適配候選

- 短代號：D53
- 狀態：草稿
- 裁決來源：無
- 實作參照：無
- 後繼：以 D52/B7 為直接 baseline，先做同題紙上 trace；通過 D50 十二項標準後再試跑；本稿不直接修改 canonical、RBF1、D48、D37、D38

- 日期：2026-08-08
- 分支：`REBUILD1`
- 上游：D50、D51、D52
- 直接基底：D52/B7 的 Project Contract、inline BlockerEvent、RepairEpisode、Run Record

---

## 0. 目的

本稿依本輪思考調整 D52/B7，核心不是增加另一套系統，而是重新分清三個角色：

1. **Knowledge Pool**：全域可查的知識資產池；Module 是節點，Module + Semantic Edge 構成知識圖譜視圖。
2. **Project**：先依文本建立 Project Contract 與大／中／小執行分解；執行路線只屬 Project。
3. **Teaching**：只有 Project 葉節點無法執行且屬人的能力缺口時才啟動；來源有 A 生成、B 池中取用兩種，取得後可按需做「相同／相似」比較。

本稿仍不允許 Knowledge Graph 直接成為 Project execution path，也不允許生成教材自動寫回 Knowledge Pool。

---

# Part A｜全域 Knowledge Pool

## 1. Module + Edge = Knowledge Graph 視圖

### 1.1 定位

沿用 canonical：

- Module 是唯讀 semantic evidence，保留 `source_id / char_span / provenance`。
- Semantic Edge 表示 `depends_on / exemplifies / elaborates / equivalent_to / contrasts / motivates / solves ...` 等語義關係。
- Semantic Edge **不是** Project execution order。

因此：

```text
Knowledge Pool
├─ Module node
├─ Module node
├─ Module node
└─ Semantic Edge
```

當池中 Module 有 Edge 時，可投影為 **Knowledge Graph**。

Knowledge Graph 不是第三份儲存真值，只是同一 Knowledge Pool 的圖譜視圖。

### 1.2 單一模塊也在同一池

不再分：

```text
某篇文本自己的 Modules
某篇文本自己的 Graph
```

改成：

```text
Global Knowledge Pool
├─ M001 ← Source A
├─ M002 ← Source A
├─ M003 ← Source B
├─ M004 ← Source C
├─ E(M001, M003)
└─ E(M002, M004)
```

「不被文本綁住」的精確定義：

> **查詢、組合與教學取用不以 source/document 為邊界；但每個 Module 仍必須保留自己的 provenance，不能變成無來源知識。**

### 1.3 跨來源相同知識

同一知識若來自不同來源，不直接合併成一個匿名 Module。

優先：

```text
M-A(source A)
M-B(source B)
↓
equivalent_to / contrasts / elaborates
↓
查詢時形成 cluster / graph view
```

理由：

- provenance 不丟失。
- 不需要決定哪篇文本「擁有」這個知識。
- 不因跨來源整併而改寫 ModuleCore。
- 可同時保留相同說法、差異、限制與反例。

---

# Part B｜文本 → Project

## 2. Project 先依文本設計

本版撤回 D51 後續「Goal 必須先於 Text」的強限定，改成：

```text
Text
↓
derive Project Contract
- goal
- deliverable
- acceptance
- constraints
↓
Project
```

如果使用者本來已有 Goal，則：

```text
Goal + Text
→ Project Contract
```

如果只有 Text，Agent 可先從文本提出一個可執行 Project 候選；未啟動前仍只是候選，不把「讀到文本」自動算成已完成 Project。

Knowledge Pool 不負責決定 Project 路線；Project 初始結構由 Text／Goal／Contract 產生。

---

## 3. 大／中／小 + 局部遞迴三分

### 3.1 初始 Project 視圖

開始時提供三個尺度：

```text
大：Project phases
中：目前 phase 的主要流程
小：目前要執行的 steps
```

大／中／小是 **Project execution hierarchy**，不是 Knowledge Graph 層級。

### 3.2 不建立完整 3^n 樹

禁止一次把所有節點都預展開三層以上。

只對「目前無法直接執行的葉節點」繼續拆：

```text
Step X 無法執行
↓
拆成最多三個更小 Step
↓
仍有葉節點不可執行？
→ 只拆該葉節點
```

「三步」是預設分解模板，不是必須硬湊三個；若 1～2 步已足夠，不新增無意義節點。

### 3.3 最小一步（Atomic Step）停止條件

葉節點同時滿足以下條件就停止拆解：

1. 有明確 Input。
2. 有單一主要 Action / Process。
3. 有可觀察 Output。
4. 有 Verification。
5. 可以在一次局部嘗試中執行。
6. 若仍失敗，能判斷是 external condition 還是 human capability blocker。

此時稱 `AtomicStep`。

`Minimum Path` = 為完成當前 Project node 所需的一組有序 Atomic Steps；不是 Knowledge Graph 子圖。

---

# Part C｜教學啟動

## 4. 只有 Atomic Step 卡住才進 Teaching

Project 先執行；不因「可能不會」而提前啟動完整教學。

```text
AtomicStep
↓ Execute
成功 → 繼續 Project
失敗 → BlockerEvent
```

沿用 D52 inline 裁1語義：

```text
external_condition
→ 原 Project/WORK 內修復

human_capability
→ Teaching Request / Repair Episode
```

---

## 5. Teaching 的兩種來源

Teaching Request 最小輸入：

```text
parent_step_id
step_need
known_input
expected_output
verification
constraints
current_refs[]
blocker_observation
```

### 5.1 A｜Generate

適用：

- Knowledge Pool 無足夠匹配。
- 本次需要非常貼近 Project Context 的教學。
- 既有 Module 有內容，但不能直接補足本次操作／判斷。

輸出為 **Run-local Teaching Bundle**：

```text
TeachingBundle
- core_rule
- steps
- constraints
- example
- provenance_refs[]
```

若內容是 Agent 推導／生成：

- 不自動取得 module_id。
- 不自動寫回 Knowledge Pool。
- 若值得長期保存，先形成可溯源 authored source/note，再走正常 Module 候選流程。

### 5.2 B｜Retrieve from Knowledge Pool

預設優先嘗試 reuse：

```text
TeachingRequest
↓
query Knowledge Pool
↓
可回傳
- 單一 Module
- 多個 Modules
- 一個局部 Knowledge Graph / subgraph view
```

檢索不按文本來源分庫，主要看：

- problem_type
- operations
- input_type / output_type
- constraints / failure_modes
- semantic relations
- provenance quality

Module 來源可以完全不同於目前 Project Text，只要可追溯且符合當前 Step need。

### 5.3 A/B 的 runtime 順序

預設：

```text
B Pool reuse
↓ 不足
A Generate
```

原因：先重用已存在、可溯源資產，避免每次都重新生成。

使用者可明確要求直接 A。

A 與 B 最後都轉成同一 `TeachingBundle` 介面，因此下游流程不需要知道教材從哪種方式取得。

---

# Part D｜相同／相似比較

## 6. Teaching Bundle 後的 Comparison Adapter

取得 TeachingBundle 後，不固定產生大量練習；只依需求產生兩種比較。

### 6.1 相同比較（same-case）

目的：確認「我能不能把這條規則直接對到現在這一步」。

定義：

- 操作／底層規則相同。
- 主要限制條件相同。
- 只改資料值、例子或表面輸入。

輸出：

```text
current AtomicStep
↔ same-case example

對應：Input / Action / Output / Verification
```

用來建立一對一映射，不測遠距遷移。

### 6.2 相似比較（similar-case）

目的：確認是否理解規則邊界，而不是只會照抄當前例子。

定義：

- 保留核心規則。
- 至少改一個有意義的 context / constraint / input pattern。
- 明確指出「哪些不變、哪些改變、為何仍可用／不可用」。

輸出：

```text
current case
↔ near-transfer case

相同：core rule / invariant
不同：context / constraint / signal
判斷：仍適用｜需調整｜不可直接套用
```

### 6.3 不把 Comparison 變成新 Gate

- same/similar 是 Teaching Adapter 的按需產物。
- 不要求每個卡點都兩種全做。
- 不建立新的 completion score。
- 是否可返回仍沿用 D52 裁4語義：`retry_ready=true` 就回 parent AtomicStep。

---

# Part E｜完整流程

## 7. B8 Runtime

```text
Text (+ optional Goal)
↓
Project Contract
Goal / Deliverable / Acceptance / Constraints
↓
建立大／中／小 Project hierarchy
↓
執行目前 leaf Step
↓
若不能執行 → 只對該 leaf 最多三分
↓
遞迴直到 AtomicStep
↓
Execute AtomicStep
↓
成功？
├─ 是 → 下一 AtomicStep
└─ 否 → BlockerEvent
          ├─ external_condition
          │    → Project/WORK 局部修復
          │    → retry
          │
          └─ human_capability
               → RepairEpisode / TeachingRequest
               → B：查 Global Knowledge Pool
               │      ├─ Module
               │      └─ local Knowledge Graph view
               │
               └─ 不足 → A：Generate TeachingBundle
                        ↓
                 依需求 same / similar comparison
                        ↓
                 retry_ready=true
                        ↓
                 retry parent AtomicStep
↓
Project Acceptance
↓
Run Record
```

背景知識處理：

```text
Source
→ canonical Module candidates
→ Global Knowledge Pool
→ Semantic Edge
→ Knowledge Graph view
```

此流程與 Project execution hierarchy 分離；Graph 不直接寫 Project Path。

---

# Part F｜對 D52/B7 的調整

## 8. 保留／改寫／降級

### 保留

- Project Contract。
- BlockerEvent inline classification。
- RepairEpisode inline return。
- Run Record 為本次完整歷史。
- ModuleCore 唯讀與 Semantic Edge 語義。

### 改寫

D52 `Step Resource Resolver` 拆成兩個責任：

1. Project execution 所需 Tool/SOP/Skill 可照常按需解決。
2. **Knowledge Pool 的 Module/Graph 教學檢索只在 human_capability blocker 時啟動。**

避免每個普通 Step 都為了「可能會學到東西」掃 Knowledge Pool。

### 降級

- Text-specific module set：降為來源／展示 grouping，不再是教學檢索邊界。
- Text-specific graph：降為 Knowledge Graph 的 source-filtered view，不再是獨立 graph truth。
- 大中小：只屬 Project hierarchy，不再承擔 Knowledge Module 分層。

---

# Part G｜十二項自檢

## 9. B8 對 B7

| 指標 | 結果 | 判斷 |
|---|---|---|
| E1 單一責任 | P | Project 決 execution；Pool 決 semantic knowledge；Teaching 只做卡點補足 |
| E2 單一真值 | P | Module/Edge仍 canonical；Project hierarchy另有 execution truth；Graph只是 Pool view |
| E3 必要步驟 | P/R | lazy decomposition避免全樹展開；但三分規則與 Teaching compare 的實際成本仍待試跑 |
| E4 分支複雜度 | P/R | 新增 A/B teaching source 選擇；用 B-first→A fallback 可避免人工二選一 Gate |
| E5 重複處理 | P/R | 全域 Pool 提升跨文本 reuse；相同知識仍保留多來源 Module，需靠 equivalent cluster 避免檢索重複 |
| E6 回寫衝突 | P | Generate不自動寫 Pool；Project 不寫 Module/Edge；Teaching只寫 Run events |
| E7 可追溯性 | P | Module保留 provenance；Run保留 bundle/module refs；可由 Step追回來源 |
| E8 卡點成本 | P/R | 只在 AtomicStep 卡點啟 Teaching，局部性明確；Pool query / Generate latency待測 |
| E9 可刪除性 | P | 可刪「教學只能查本篇模塊」邊界、Text-specific graph truth、每Step掃Module的規則 |
| E10 實作增量 | P/R | 主要新增 global query/index view、Project lazy decomposition、TeachingBundle；需確認現有資料庫是否已能跨來源查詢 |
| E11 失敗模式 | P/R | 主要風險是跨來源誤配 Module；要求保留 provenance、constraints 並由 AtomicStep verification 暴露 |
| E12 驗證方式 | P | 可固定同一 Text/Project/blocker，比 B7 的步驟數、Pool hit、錯配、retry 與 reuse |

### 9.1 目前資格

沒有發現 E1／E2／E6 的直接硬衝突；E11 的跨來源錯配風險可觀察但尚未實測。

因此：

> **B8 = 可試作候選，不得稱優於 B7。**

---

# Part H｜必測項

## 10. B7 → B8

除沿用 D50/D51 指標外，新增：

1. **Global Pool hit rate**：卡點查詢命中不同來源 Module 的比例。
2. **Source independence**：有用 Module 是否能在不依賴原文本 grouping 的情況被找到。
3. **Equivalent cluster noise**：同義／等價 Module 是否造成重複返回與選擇成本。
4. **Decomposition depth**：Project leaf 實際拆到第幾層才成 AtomicStep；是否出現硬湊三步。
5. **Teaching origin**：B Pool 命中與 A Generate 的比例。
6. **same-case usefulness**：是否能提高第一次 retry 成功率。
7. **similar-case transfer**：改變一個重要條件後，是否仍能正確判斷適用邊界。
8. **wrong-module visibility**：錯取跨來源 Module 時，能否在本 AtomicStep verification 發現，且不污染 Pool。

---

## 11. 目前結論

本版最核心的改變可濃縮為：

```text
Knowledge
= Global Pool of traceable Modules + Semantic Edges
= 可投影 Knowledge Graph

Project
= Text/Goal → Contract → 大中小 hierarchy → lazy recursive decomposition → Atomic Steps

Teaching
= Atomic Step capability blocker 時
  B：先查 Global Pool
  A：不足再 Generate
  → 視需要 same / similar comparison
  → retry 原 AtomicStep
```

這三者不共用同一種邊：

- Knowledge Graph Edge = semantic relation。
- Project hierarchy / path = execution decomposition/order。

只透過 `refs` 銜接，不互相冒充。