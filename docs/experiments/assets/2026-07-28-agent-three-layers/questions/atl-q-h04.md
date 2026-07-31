---
type: question
id: atl-q-h04
slot: question
source: agent-architecture-three-layers
related:
  - "[[atl-q-h03]]"
  - "[[atl-layer-harness-01]]"
module_ref: "ATL-C12, ATL-C05"
status: practice-ready
qtype: Apply
difficulty: 2
char_span: "[9681,10641)"
edge_ref: "ATL-C12 depends_on ATL-C05"
tags: [usage-loop, f3c, harness]
---

# Q04｜應用：跨 session 丟進度

**題型**：Apply（有約束的決策規則）  
**考點**：ATL-C12（症狀表）depends_on ATL-C05（長任務 harness）  
**原文**：症狀表列「forgets progress across sessions」；C05 的 progress file／git／incremental discipline

## 題幹

情境：一個 coding agent 每天新開 session。昨天改了一半的檔與待辦，今天模型「不記得」且重做衝突變更。

依文中症狀表：**Start with** 哪一層？**Likely fix** 應朝哪一類手段？再依 C05，列出至少兩樣具體 harness 產物／紀律（不要只寫「加記憶」）。

約束（題內給定）：不得用「換更強模型」當主修法；不得把問題先改判成 Graph 節點重畫。

## 作答空間

- Start with：  
- Likely fix 方向：  
- 至少兩樣具體手段：  

## 評分要點

- Start with ＝ **Harness**。  
- Likely fix ⊆ durable state／checkpointing／progress artifacts／compaction（表列原文）。  
- 具體手段須對齊 C05：initializer、progress file、git history、incremental work discipline（至少 2）。  
- 扣分：主答「加一個反思 prompt」；或「先畫完整 workflow 圖」。
