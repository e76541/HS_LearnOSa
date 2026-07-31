---
type: question
id: atl-q-h01
slot: question
source: agent-architecture-three-layers
related:
  - "[[exp-2026-07-28-atl-usage-01]]"
  - "[[atl-layer-harness-01]]"
module_ref: ATL-C03
status: practice-ready
qtype: Explain
difficulty: 1
char_span: "[1871,2220)"
tags: [usage-loop, f3c, harness]
---

# Q01｜解釋：Agent 與 Harness

**題型**：Explain（機制／概念）  
**考點**：ATL-C03  
**原文**：`source.txt` `[1871,2220)`

## 題幹

依文中定義：為什麼說「agent 是 model plus the harness」？Harness 指的是模型的哪一側？請用自己的話回答（不必背產品名）。

## 作答空間

（寫 2～4 句）

## 評分要點（封閉世界）

- Agent ＝ 模型 ＋ 模型外的執行條件／程式／設定。
- Harness ＝ code、configuration、execution logic **outside** the model。
- 可舉例：system prompt、tools、memory、filesystem、permissions、logging（不必列全）。
- 扣分：把 Harness 說成「更好的 prompt」或「更強的模型」。
