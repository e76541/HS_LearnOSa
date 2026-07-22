# 推進路線

管理事項的唯一執行真值。依階段、依賴、優先順序與阻塞排列；草案與已規劃但尚未實行的計畫見各事項主文件與 [INDEX.md](../INDEX.md)。

狀態變更當下更新本檔；不限推送時。

代號掛靠見 [ops-id-legend.md](ops-id-legend.md)（C／F／T／R／V）。**INI-ID 本身不改**（既有連結與歷史不變）；下列「掛靠」只是敘述對照。**V1** 暫空、不掛進任何 INI。

## 推進順序

| 序 | 事項ID | 名稱 | 掛靠 | 狀態 | 目前階段 | 前置 | 下一個可執行動作 |
|---|---|---|---|---|---|---|---|
| 1 | INI-001 | 文檔中心收錄管線 | **F1** | 待裁決 | P0 裁決前 | — | 裁決 ADJ-001～004 |
| 2 | INI-002 | 模塊篩選機制 | **F2** 前篩 | 待裁決 | 設計完成待裁決 | INI-001 非硬依賴 | 裁決 ADJ-005；須先有實際來源驗證（P6） |
| 3 | INI-003 | 收錄後處置 shadow | **F1** 旁路 | 已裁決-試行 | 試行中 | — | 持續試行；不可升格為文檔身份與保存層 |
| 4 | INI-004 | 技能登記簿半自動化 | **T1／R1** 同表 | 已實作 | Phase 0–5 完成 | — | Gate B：三十篇基準與 R10 裁決 |
| 5 | INI-005 | 知識視覺化 React | **T2**／INI-005；≠ **C1**；演講候補 **F3** | 草稿 | Phase 1 未開 | Phase 0 inline 已完成 | 演講備課互動（隨機選／拖曳）列草案；見 [speaking-graph](../specs/2026-07-15-speaking-module-graph-design.md)；Phase 1 待資源 |

## 進行中事項

| 事項ID | 名稱 | 狀態 | 目前階段 | 主文件 | 開放阻塞 | 上次更新 |
|---|---|---|---|---|---|---|
| INI-001 | 文檔中心收錄管線 | 待裁決 | P0 裁決前 | [proposal](../specs/2026-07-14-document-centered-intake-pipeline-proposal.md)、[overview](../specs/2026-07-14-document-centered-intake-pipeline-overview.md) | 4 項待裁決未定；P1–P3 shadow 未開始｜掛 **F1** | 2026-07-22 |
| INI-002 | 模塊篩選機制 | 待裁決 | 設計完成待裁決 | [design](../specs/2026-07-14-module-selection-design.md)、[plan](../plans/2026-07-14-module-selection-implementation.md) | 尚未 canonical；`tools/selection/` 未建｜掛 **F2** 前篩 | 2026-07-22 |
| INI-003 | 收錄後處置 shadow | 已裁決-試行 | 試行中 | [spec](../specs/2026-07-14-post-intake-disposition-trial.md)、[test plan](../plans/2026-07-14-post-intake-disposition-trial-test.md) | 不可升格為文檔身份與保存層｜仍屬 **F1** 試行旁路 | 2026-07-22 |
| INI-004 | 技能登記簿半自動化 | 已實作 | Phase 0–5 完成 | [plan](../plans/2026-07-14-skill-registry-automation.md) | Gate B 未過：三十篇基準與 R10 未裁決｜對 **T1／R1** 同表 | 2026-07-22 |
| INI-005 | 知識視覺化 React | 草稿 | Phase 1 未開 | [design](../specs/2026-07-13-knowledge-visualizer-design.md)、[trial](../specs/2026-07-15-modular-visualization-trial.md)、[speaking-graph](../specs/2026-07-15-speaking-module-graph-design.md) | Phase 0 已完成；Archify 試作在 `docs/archify-demo/`；React 未實作｜**T2／INI-005**；hub 已另立 **C1-(T3)**（測試暫取消） | 2026-07-22 |

## 開放裁決

| 裁決ID | 所屬事項 | 問題 | 建議（若有） |
|---|---|---|---|
| ADJ-001 | INI-001 | 「封存」是否僅代表冷保存，或代表預設暫停模板排程 | 建議採前者，排程另記 |
| ADJ-002 | INI-001 | 模板是否一律對每個文檔修訂建立獨立實例，以及是否允許同一修訂套用多個模板 | — |
| ADJ-003 | INI-001 | 文檔儲存根的實體位置、原始檔與正規化檔的保存格式，以及既有 Inbox／DOC 的遷移策略 | — |
| ADJ-004 | INI-001 | 累積足夠試行資料前，不固定保存或模板相關的 enum、狀態轉移與 canonical 名稱 | — |
| ADJ-005 | INI-002 | 模塊篩選機制是否升格 canonical；實作計畫是否啟動 | 須先有實際來源驗證（P6） |

## 近期已結案

| 事項 | 結案狀態 | 主文件 | 說明 |
|---|---|---|---|
| DOC 文檔儲存與索引 | 已併入 canonical | [design](../specs/2026-07-13-doc-storage-design.md)、[plan](../plans/2026-07-13-doc-storage-implementation.md) | v0.3 r2；詳見 INDEX |
| Inline 模塊可視化 Phase 0 | 已實作 | [plan](../specs/2026-07-13-inline-diagram-module-viz-plan.md) | `tools/viz/`；Phase 1 未開 |
| AI-Native 三視圖內聯 | 已實作 | [design](../specs/2026-07-14-ai-native-three-view-inline-design.md)、[plan](../plans/2026-07-14-ai-native-three-view-inline.md) | `DOC/Review/how-to-make-company-ai-native/views/` |

## 待實行計畫（已規劃、尚未實作）

| 所屬事項 | 計畫 | 狀態 | 啟動條件 | 掛靠 |
|---|---|---|---|---|
| INI-001 | P1 shadow：`BatchReceipt` + `DocumentManifest` | 未開始 | ADJ-001～004 裁決完成 | **F1** shadow |
| INI-001 | P2 shadow：指紋／重複收錄／保存參照 | 未開始 | P1 完成 | **F1** shadow |
| INI-001 | P3 shadow：`TemplateInstance` 只讀契約 | 未開始 | P2 完成 | **F1** shadow |
| INI-002 | [module-selection-implementation](../plans/2026-07-14-module-selection-implementation.md) | 草稿 | ADJ-005 裁決通過；`tools/selection/` 待建 | **F2** 前篩 |
| INI-005 | React 儀表板 Phase 1 | 未開始 | 設計就緒、Phase 0 已驗收 | **T2**（非 C1） |
