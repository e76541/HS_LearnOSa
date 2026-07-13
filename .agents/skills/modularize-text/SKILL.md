---
name: modularize-text
description: Use when dividing a source text into HS_LearnEdge modules, assigning module types, semantic roles, skill signals, or char_span evidence.
---

# 文本模塊化

## 規範定位

1. 先讀 `Library/CURRENT.md`，解析 `design-principles`、`module-layer`、`identity-terminology`。
2. 不讀 archive；不寫死規範實體檔名。

## 作業

1. 以原文為證據；每個模塊保留 `source_id`、`char_span` 與 ModuleCore 核心投影。模塊是索引，不是閱讀面。
2. 依主要命題簇拆分。只有詳述、例示、不可分的機制，或移除即使另一命題不完整時，才可留在同一模塊。
3. 不同簇若各自依賴不同外部目標，強制拆分；簇或依賴無法確定時標 `needs_review`，不可自動切分。
4. 依 `module-layer` 選 Teaching、Method、Case 或 Analysis 本體，補齊該型別欄位；空欄只表示作者未提供，型別不適用須由分型排除。
5. 將故事、金句、公式記為附屬 `hooks`，連同其字元區間隨宿主模塊移動；不另建節點、不進邊或對齊。
6. `is_skill_signal` 為否且角色含 `background`：作背景模塊；可供渲染與作邊端點，不進對齊、圖式主體或考點。否且不含背景：純填充，只保留字元區間連續性，不進下游。
7. 模塊建立後唯讀；熟練度與流轉狀態只住登記層。

## 常見混淆

| 情況 | 處理 |
|---|---|
| 同主題 | 不等於同命題簇；先看是否共享外部依賴與不可分機制。 |
| 背景 | 是舞台，不是技能模塊；不可因可渲染而進對齊。 |
| 缺敘事資訊 | 用結構層的邊補，不縮小成心智圖式標籤。 |