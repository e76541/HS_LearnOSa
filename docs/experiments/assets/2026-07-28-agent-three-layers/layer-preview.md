# 層預覽｜Agent 三層架構（Harness／Loop／Graph）

- `type: layer-preview`
- `slot: depth`
- 日期：2026-07-28
- 來源：`Inbox/agent-architecture-three-layers/`
- 說明：讀完後、鎖 ⓪ 前；不佔使用卡五欄。

## 1＝運用

- 失敗時先分層診斷：缺能力／丟狀態→Harness；不穩／停不下來→Loop；多專家可控順序→Graph。
- 心智模型一句話：環境 → 回饋 → 流程。
- 三層不能互相頂替；圖畫得再漂亮，Harness 丟狀態仍會垮。

## 2＝公式／判準

- 依症狀選層：工具／權限／跨 session 狀態→Harness；證據與有界重試→Loop；節點／邊／合流／審批→Graph。
- 驗證迴圈：對證據循環，不對「模型自信」循環；「我說做完」不是終態。
- Graph 值得儀式化：有分支、並行、審批、恢復路徑或多專家；單 Agent＋少工具則延後圖式。

## 3＝深度／參數（只點名類別）

- 各家命名與產品細節（LangChain／LangGraph、OpenAI Agents SDK、AutoGen GraphFlow）。
- Anthropic 多 session 編碼案例中的 initializer／progress file 細節。
- 清單級 Harness 組件表、Loop 七解剖項、Graph 六決策項的完整原文列舉。
