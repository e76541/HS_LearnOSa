# 專案治理台帳

持續更新的整體管理入口。只管專案治理（進行中事項、裁決、開放議題、路線進度），不管學習內容或 DOC 文檔卡關狀態。

狀態變更當下更新本檔；不限推送時。推送交接只引用本檔，不重寫台帳全文。

## 入口分工

| 入口 | 管轄範圍 |
|---|---|
| 本檔 `docs/MANAGEMENT.md` | 整體治理：進行中事項、開放裁決、路線進度 |
| [docs/INDEX.md](INDEX.md) | 檔案級草案與實作計畫狀態 |
| [Library/CURRENT.md](../Library/CURRENT.md) | Canonical 規範分檔 |
| [.agents/handover.md](../.agents/handover.md) | 推送當下快照與交接歷史 |

**分層原則**：MANAGEMENT 管事項；INDEX 管檔案；handover 管推送快照；`docs/specs`、`docs/plans`、`tools/`、`DOC/` 為執行層產物。

## 進行中事項

| 事項ID | 名稱 | 狀態 | 目前階段 | 主文件 | 開放阻塞 | 上次更新 |
|---|---|---|---|---|---|---|
| INI-001 | 文檔中心收錄管線 | 待裁決 | P0 裁決前 | [proposal](specs/2026-07-14-document-centered-intake-pipeline-proposal.md)、[overview](specs/2026-07-14-document-centered-intake-pipeline-overview.md) | 4 項待裁決未定；P1–P3 shadow 未開始 | 2026-07-14 |
| INI-002 | 模塊篩選機制 | 待裁決 | 設計完成待裁決 | [design](specs/2026-07-14-module-selection-design.md)、[plan](plans/2026-07-14-module-selection-implementation.md) | 尚未 canonical；`tools/selection/` 未建 | 2026-07-14 |
| INI-003 | 收錄後處置 shadow | 已裁決-試行 | 試行中 | [spec](specs/2026-07-14-post-intake-disposition-trial.md)、[test plan](plans/2026-07-14-post-intake-disposition-trial-test.md) | 不可升格為文檔身份與保存層 | 2026-07-14 |
| INI-004 | 技能登記簿半自動化 | 已實作 | Phase 0–5 完成 | [plan](plans/2026-07-14-skill-registry-automation.md) | Gate B 未過：三十篇基準與 R10 未裁決 | 2026-07-14 |
| INI-005 | 知識視覺化 React | 草稿 | Phase 1 未開 | [design](specs/2026-07-13-knowledge-visualizer-design.md) | Phase 0 inline 已完成；React 儀表板未實作 | 2026-07-14 |

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
| DOC 文檔儲存與索引 | 已併入 canonical | [design](specs/2026-07-13-doc-storage-design.md)、[plan](plans/2026-07-13-doc-storage-implementation.md) | v0.3 r2；詳見 INDEX |
| Inline 模塊可視化 Phase 0 | 已實作 | [plan](specs/2026-07-13-inline-diagram-module-viz-plan.md) | `tools/viz/`；Phase 1 未開 |
| AI-Native 三視圖內聯 | 已實作 | [design](specs/2026-07-14-ai-native-three-view-inline-design.md)、[plan](plans/2026-07-14-ai-native-three-view-inline.md) | `DOC/Review/how-to-make-company-ai-native/views/` |

## 更新規則

1. 事項狀態變更時，同步更新本檔與 [INDEX.md](INDEX.md) 對應檔案列。
2. 新增進行中事項時，須在 INDEX 登記主文件，並在本表新增列。
3. 裁決定案後，從「開放裁決」移除，並更新所屬事項的「目前階段」或移至「近期已結案」。
4. 撰寫交接手冊前，若本次變更影響事項狀態，須先更新本檔；交接正文開頭連結本檔，不重寫台帳全文。
