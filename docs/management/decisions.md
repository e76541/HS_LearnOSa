# 討論結論備忘

已談過、可複用、但尚未（或不需）升格為 roadmap 開放裁決／canonical 的結論。

- 不做逐字稿；不做第三份進度表。
- 升格或寫入藍圖／路線後，標記「已反映」或移出。
- 正式待裁事項仍只在 [roadmap.md](roadmap.md)。

## 現行備忘

| 日期 | 結論 | 來源 | 狀態 |
|---|---|---|---|
| 2026-07-15 | 管理層分總覽／藍圖／交接／路線；總覽＝導航＋站位，藍圖＝樣貌＋預期工程，路線＝執行真值，交接分近期摘要與版本快照 | 對話；實作於 `docs/management/` | 已反映（overview／blueprint 已依此拉開） |
| 2026-07-15 | 總覽與藍圖不得都以 INI 清單＋目前進度填滿，否則職責坍成同一種文件 | 對話檢討 | 已反映 |
| 2026-07-15 | 偏好與討論結論用 `preferences.md`／`decisions.md` 補強；列 INDEX 草案並交接強調；**不開路線 INI** | AOI；本備忘機制本身 | 已反映（見 spec） |
| 2026-07-15 | 演講備課需隨機選模塊 + 自由移動；正式場次仍走合規鏈、禁隨機走圖；列草案 spec，實作併 INI-005 React Flow | 對話；見 [spec](../specs/2026-07-15-speaking-module-graph-design.md) | 草案 |
| 2026-07-15 | 模塊視覺化三方案試作：1+2 用 Archify 完成 quant demo；**方案 3（tools/viz → React）列為草案**，不開新路線 INI；試作不得掩蓋 INI-001 未完成 | 對話；見 [spec](../specs/2026-07-15-modular-visualization-trial.md) | 草案 |
| 2026-07-16 | 九宮雙階段：攝入期＝假設、練習期＝考卷；先口頭驗證（建圖→骰起格），**不寫進規範**；通過後再議半頁附錄入 v0.4 | 對話；見 [spec](../specs/2026-07-16-nine-palace-dual-phase.md) | 草稿 |
| 2026-07-16 | **除演講外，GPT-LIVE 進入循環思考**；演講場次不套用；循環步驟待補 | 對話；見 [spec](../specs/2026-07-16-gpt-live-cyclic-thinking.md) | 草稿 |
| 2026-07-18 | 學習流程改為閉環：文本→模塊化⇄提問（探邊界、校粒度）→挑選（以知帶新）→九宮→測驗+間隔重複→回宮；複習原面優先、拆併才重組；攝入期照舊 | 對話；見 [spec](../specs/2026-07-18-module-flow-loop.md) | 已裁決-試行（AOI 2026-07-18） |
| 2026-07-18 | DannyMac180/skills **不直接套**：取 explain-this 四設計（學習者檔案、題出原文禁自評、SM-2 改模塊粒度、深度等級）轉為自有草案；codex-dynamic-workflows 不取（與 agent-ops 重疊） | 對話；見 [spec](../specs/2026-07-18-explain-this-conversion.md) | 已裁決-試行（AOI 2026-07-18） |
| 2026-07-18 | 流程閉環、explain-this 轉換、九宮雙階段**三份同批准試行**；試作內容：口頭走一輪「提問→挑選→建圖→骰起格→測驗記分」，結果記試作紀錄 | 對話裁決 | 已反映（INDEX 與三份檔頭已轉試行） |
| 2026-07-18 | mattpocock/skills 評估：wayfinder→to-spec→to-tickets 工作流**不搬**（與治理帳本重疊）；取三零件——提問站問法改**前沿輪**（grilling/batch-grill-me，去建議答案），「引用帶標題不用裸編號」與「垂直切片＋context window 粒度」列**試作後引入**備忘 | 對話；已補入 [流程閉環 spec](../specs/2026-07-18-module-flow-loop.md) | 已反映（spec 已補） |
| 2026-07-19 | 模塊碎片化與九宮配合四點裁量：①組件可跨來源共用（獨立節點）；②九宮格位場景優先、不限場景；③組裝觸發雙軌（管線自動＋提問站前沿輪）；④以實際 PDF 專業課程試作。分層與等級細節為 Agent 建議，待裁決 | 對話；見 [spec](../specs/2026-07-19-module-fragments-nine-grid-agent-view.md) | 草稿 |
| 2026-07-19 | 學習管線敘述整合：權威寫法改為「原文→組件→模塊→(場景)→九宮」，中間接提問／挑選、之後接測驗循環；舊「文本→模塊層→九宮」作廢。雙階段、流程閉環、組件化三份草案同批改寫；整合圖見 `specs/assets/2026-07-19-module-pipeline-flow.html`。裁決前仍待補：引用關係儲存、hooks 試作策略 | 對話；三份 spec 已同步 | 已反映（spec／INDEX） |
| 2026-07-20 | 組件化草案 r1 修併：分層改儲存／呈現／控制面；不跳儲存層；建議獨立 `fragment_reference`；L1=欄位引用、L3=`intake_ready`(含 scene／module_only)；拆併不改組件本體；入宮完整性承認為新增子集判準；場景背景封閉集；背景模塊試作不單獨佔格。舊版凍結 `docs/archive/…-r0.md`。§12 十四項仍待裁決 | 對話審視＋修併；見 [spec](../specs/2026-07-19-module-fragments-nine-grid-agent-view.md) | 草稿 |
| 2026-07-21 | 草案整合總綱：10 份草案按層歸位，標出 6 處真衝突（邊詞彙／九宮語義／組件層前置／hooks×fragment／弱策略旗標／試作材料雙軌）與整合建議；互動原型可篩選／展開／勾選，勾選僅本機暫存。正式 6 項裁決仍待對話確認 | 對話；見 [spec](../specs/2026-07-21-draft-integration-conflicts.md) | 草稿 |
| 2026-07-21 | 導航 OSA 方向草案：模塊保留為證據；決策牌顯示選項、影響、條件與來源；牌組依目的和選擇動態重組；GRILLME 在無法判斷時診斷並補最小知識，最後仍由使用者作決定 | 對話；見 [spec](../specs/2026-07-21-navigation-osa-decision-deck.md) | 草稿 |
| 2026-07-22 | 導航 OSA 補決策前置閘門：先檢查權限、資訊來源衝突、未知、期限與能否等待；引導投影負責展開可能漏想的考量，方案投影才比較得失。頂層骨架固定、欄內細項依領域／文本／情境生成；通用六維只作提示，不作封閉答案 | 對話；見 [spec](../specs/2026-07-21-navigation-osa-decision-deck.md) | 草稿 |
| 2026-07-22 | 模塊建立前新增候選分流：主張性質、來源層級、支持狀態與 `retention`；純填充直接丟棄，不配發 `module_id`。因「啟用」專屬作業模塊，文本候選正式欄位不用 `enabled`。 | AOI 對話裁決；已反映於 `Library` v0.3 r6 | 已反映 |
| 2026-07-22 | 導航 OSA 決策牌 P1 以趙構／靖康之變作歷史域紙上試跑（八牌、三情境、含尚不能決定）；網站 MVP 仍為母草案預設領域。母草案 §11／M5 未裁，不開路線 INI | 對話；見 [plan](../plans/2026-07-22-zhaogou-decision-deck-p1.md)、[試作](../experiments/2026-07-22-zhaogou-decision-deck-p1-spike.md) | 草稿 |
| 2026-07-22 | 決策牌補活棋／文本邊界／跨源複用／霧戰；權威管線提案改為「文本→模塊(拆選)→固定牌→九宮｜隨機牌」，三份准試行掛後繼不改其試行狀態；六衝突不自動解消 | 對話；見 [navigation §3.7](../specs/2026-07-21-navigation-osa-decision-deck.md)、[管線整合](../specs/2026-07-22-pipeline-deck-nine-grid-integration.md) | 草稿 |

## 已關閉（保留短跡）

| 日期 | 結論 | 去向 |
|---|---|---|
| 2026-07-14 | 單一 `MANAGEMENT.md` 拆為四份管理文件 | 已實作；交接 `7d8b876` |
