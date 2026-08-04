---
type: depth
id: atl-layer-harness-01
slot: depth
depth_cap: 2
source: agent-architecture-three-layers
related:
  - "[[exp-2026-07-28-atl-usage-01]]"
module_ref: "ATL-C03, ATL-C04, ATL-C05"
status: seeded
tags: [usage-loop, layer-walkthrough, harness]
---

# 分層深讀 1／3｜Harness（環境層）

- 順序：本篇三架構層 **Harness → Loop → Graph**；本檔只開第 1 層。
- 深度契約：2（運用＋公式）；深度池附末、不進規則正文。
- 掛靠模塊：ATL-C03／C04／C05。

## 運用（何時拿出來）

- Agent「看起來笨」但其實是**沒環境**：沒工具、沒穩定工作區、沒權限邊界、沒跨 session 進度。
- 同一個模型，好 harness vs 爛 API 包＋模糊 prompt → 結果可以差很多；先查工作條件，再怪模型。
- **何時優先修 Harness**（原文觸發）：缺能力／回不來／丟狀態／權限過寬／難審計／不同環境行為不一致。

## 公式（可搬判準）

1. **定義**：Agent ＝ 模型 ＋ Harness；Harness ＝ 模型外的程式、設定與執行邏輯（context／tools／state／control／safety／obs）。
2. **體檢法**：架構圖上把模型拿掉——剩下的幾乎都是 Harness。
3. **長任務**：只靠 context compaction 不夠；要有 initializer、progress 產物、git／歷史、增量紀律，讓**新上下文**接得上「已做／待做」。
4. **反貴錯**：Harness 不是垃圾場——工具越多選錯率越高、context 越吵越混、權限越寬風險越大。

## 本專案對帳（只 Harness）

| 文中組件類 | 本專案對應 | 狀態 |
|---|---|---|
| Context injection | `AGENTS.md`、Skills、記憶、偏好、CURRENT | 有；詞彙觸發讀檔 |
| Action surfaces | Shell／MCP／檔案；領域 Skills | 有；工具面偏窄是優點 |
| Persistence | Inbox／DOC、交接快照、看板變更表、git | 有；跨 session 靠交接＋看板 |
| Execution control | 作業模塊啟用閘、更新說明、必做檢查、一主一副 | 有（治理閘 ≈ approval gate） |
| Safety／governance | 記憶禁項、權限／沙箱（執行環境）、待裁門禁 | 有 |
| Observability | 看板檢查欄、交接五欄、試作報告 | 有；成本／延遲監控偏弱 |

**本層一句決策**：Harness 已夠撐長任務；本層**不擴工具堆**，只維持「窄工具＋可接續進度產物」。缺的若是「不穩／停不對」，屬下一層 Loop，不在此層硬加。

## 檢查（本層）

- [x] 能說出「拿掉模型後剩下什麼」
- [x] 能點名本專案至少 4 類 harness 對應
- [x] 未把 Loop／Graph 症狀誤修成「再塞工具」

## 深度池（契約＜3 不展開）

- LangChain／OpenAI Agents SDK 產品介面細節（未核）
- Anthropic multi-session 的 initializer／progress 檔格式
- 原文六類組件的完整英文列舉與 MCP 細節

## 下一層預告

說「下一層」或「Loop」→ 開 **Loop（回饋層）**；本檔不預灌。
