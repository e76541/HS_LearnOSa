# 使用紀錄｜Agent 三層架構（Harness／Loop／Graph）

- id: `exp-2026-07-28-atl-usage-01`
- slot: usage
- 角色：主
- 深度契約：2
- 目的：用三層架構診斷並整理本專案 Agent 工程邊界，產出一條可執行決策
- 草案：`docs/specs/2026-07-27-usage-first-learning-loop.md`（未裁；試作）
- 來源試作夾：`Inbox/agent-architecture-three-layers/`
- 日期：2026-07-28
- 層預覽：[`layer-preview.md`](layer-preview.md)

```text
規則：
  - [運用] Agent 出問題時先分層：缺工具／丟狀態／權限亂 → Harness；接近但不穩或停不下來 → Loop；多專家可控順序／分支 → Graph。
  - [公式] 心智模型＝環境→回饋→流程；依症狀選層修，不拿「換模型」頂替編排失敗；驗證只對證據循環，不對自信循環。
  - [公式] Graph 只在有分支／並行／審批／恢復／多專家時值得儀式化；流程還常變就維持較簡 Harness＋模型驅動控制。
情境：為 HS_LearnEdge 現行治理／使用迴路／流程圖對帳，判斷哪一層該補強、哪一層不該過早形式化。
計畫：
1. 把專案既有機制對進 Harness／Loop／Graph 三格。
2. 用文中症狀表挑一個當前最相關症狀。
3. 只落一條可執行決策（不開新站位、不改 canonical）。
結果：符合。Harness＝AGENTS／agent-ops／Skills／記憶／交接／Inbox-DOC；Loop＝使用迴路＋必做檢查當證據終態；Graph＝flow-map／站位／archify 工作流。當前主症狀≈「流程仍常變」→ 維持較簡控制、延後把使用迴路升成固定圖；繼續用實跑痕跡再形式化穩定路徑。
修正：無。
```

## ① 擷取規則（契約層 2；≤3）

1. **[運用]** 失敗先分層：Harness（環境／工具／狀態）／Loop（證據與有界重試）／Graph（誰可以下一步）。
2. **[公式]** 環境→回饋→流程；驗證 loop on evidence，不是 loop on confidence。
3. **[公式]** 有分支／並行／審批／多專家才上 Graph；否則先強化 Harness＋Loop。

## 深度池（不展開）

- LangChain／OpenAI／AutoGen 產品與版本細節
- Harness 六類組件全文列舉、Loop 七解剖、Graph 六決策原文
- Anthropic initializer／progress file 實作細節

## ② 選情境觀察

- 本篇第②步：**未卡**。情境直接點名「本專案三層對帳」。
- 未喚醒 F3a／F3b。

## 後續｜一層一層深讀

- 2026-07-28：使用者「接下來一層一層來」→ 主圈下鑽，順序 **Harness → Loop → Graph**。
- 已開：[`layer-walkthrough-harness.md`](layer-walkthrough-harness.md)（`id: atl-layer-harness-01`，深度 2）。
- Loop／Graph：未開。

## F3c｜要練習

- 2026-07-28：使用者喚醒 `f3c` → 本篇標 **要練習**（範圍：Harness）。
- 題目目錄：[`extra-questions.md`](extra-questions.md)（6 題，`atl-q-h01`～`h06`）。
- 不計熟練度點；試作模塊溯源。
