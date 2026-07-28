---
type: question
id: atl-q-h03
slot: question
source: agent-architecture-three-layers
related:
  - "[[atl-layer-harness-01]]"
module_ref: ATL-C05
status: practice-ready
qtype: Diagnose
difficulty: 2
char_span: "[3771,4440)"
tags: [usage-loop, f3c, harness]
---

# Q03｜診斷：何時優先修 Harness

**題型**：Diagnose（失效／觸發條件）  
**考點**：ATL-C05  
**原文**：`source.txt` `[3771,4440)`

## 題幹

下列三個現象，哪些應**優先**當 Harness 問題處理？哪些不該先怪模型？請逐條標「Harness／先別當 Harness」並給一句理由（理由須能對回原文觸發句）。

1. Agent 沒有瀏覽器工具，卻被要求核對網頁連結是否有效。  
2. 同一任務換一台機器跑，行為明顯不同（權限／路徑／可用 API 不一致）。  
3. 產出已經接近正確，但每次都要人工改兩處格式才過 schema。

## 作答空間

1. …  
2. …  
3. …

## 評分要點

- 1 → **Harness**（doesn't have a capability／缺 action surface）。  
- 2 → **Harness**（acts differently on environments）。  
- 3 → **先別當 Harness**（「接近但不穩」屬 Loop／驗證與有界重試；原文把 unreliable first attempt 分給 Loop）。  
- 扣分：3 答成「再加一堆工具」；或 1／2 答成「換模型」。
