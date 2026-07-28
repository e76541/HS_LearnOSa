---
type: question
id: atl-q-h05
slot: question
source: agent-architecture-three-layers
related:
  - "[[atl-layer-harness-01]]"
module_ref: ATL-C13
status: practice-ready
qtype: Evaluate
difficulty: 2
char_span: "[11388,11593)"
tags: [usage-loop, f3c, harness]
---

# Q05｜評估：Harness 當垃圾場

**題型**：Evaluate（主張＋後果）  
**考點**：ATL-C13「Treating the harness as a dumping ground」  
**原文**：`source.txt` `[11388,11593)`

## 題幹

有人主張：「工具與 long-term memory 越多，agent 一定越強，所以把能接的 API 全掛上。」  
依原文，這個主張錯在哪？請寫出文中指出的**三種風險機制**（選錯／混亂／風險），並用一句話說明對本專案「不擴工具堆」決策是否同向。

## 作答空間

（三種機制＋一句對帳）

## 評分要點

- crowded toolset → selection errors  
- noisy context → confusion  
- broad permissions → risk  
- 與本篇深讀決策「不擴工具堆／窄工具」**同向**。  
- 扣分：只罵「太多不好」卻說不出三種機制；或主張應繼續堆工具。
