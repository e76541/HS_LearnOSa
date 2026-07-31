---
type: question
id: atl-q-h02
slot: question
source: agent-architecture-three-layers
related:
  - "[[atl-q-h01]]"
  - "[[atl-layer-harness-01]]"
module_ref: ATL-C04
status: practice-ready
qtype: Explain
difficulty: 1
char_span: "[2449,3771)"
edge_ref: "ATL-C04 elaborates ATL-C03"
tags: [usage-loop, f3c, harness]
---

# Q02｜解釋：拿掉模型之後

**題型**：Explain  
**考點**：ATL-C04（ elaborates → ATL-C03）  
**原文**：`source.txt` `[3484,3771)` 為主；前文 `[2449,2848)` 可作語境

## 題幹

文中說：把架構圖上的**模型拿掉**，剩下的大概都是什麼？為什麼這個動作能把注意力從「模型崇拜」移開？請對照「兩個團隊用同一 foundation model、結果卻差很多」的論點。

## 作答空間

（寫 3～5 句）

## 評分要點

- 剩下的 ≈ Harness：tools、data access、state store、sandbox、middleware、evaluators、retry、UI 等。
- 同模型、不同工作條件（clean tools／stable workspace／permissions／observable state vs vague prompt／unreliable wrapper）→ 結果可差很多。
- 智力相近，差在 working conditions。
- 扣分：答案只談「換更大模型」或把差距全歸因於 prompt 文采。
