# 專案管理總覽

持續更新的專案決策與推進入口。只管專案治理，不管學習內容或 DOC 文檔卡關狀態。

狀態變更當下更新；不限推送時。推送交接只引用本層文件，不重寫全文。

## 管理文件

| 文件 | 職責 |
|---|---|
| 本檔 [overview.md](overview.md) | 管理入口、目前焦點、分層導覽 |
| [blueprint.md](blueprint.md) | 整體方向、目標樣貌、預期工程與進度 |
| [handover.md](handover.md) | 最近工作摘要；版本快照見 [.agents/handover.md](../../.agents/handover.md) |
| [roadmap.md](roadmap.md) | 推進路線：階段、排序、阻塞與裁決（執行真值） |

## 目前焦點

1. **INI-001** 文檔中心收錄管線：P0 裁決前，4 項待裁決（ADJ-001～004）未定。
2. **INI-002** 模塊篩選機制：設計完成，待裁決是否升格 canonical（ADJ-005）。
3. **INI-003** 收錄後處置 shadow：試行中，不可升格為文檔身份與保存層。
4. **INI-004** 技能登記簿半自動化：Phase 0–5 完成，Gate B 未過。
5. **INI-005** 知識視覺化 React：草稿，Phase 1 未開。

詳見 [roadmap.md](roadmap.md)。

## 分層入口

| 入口 | 管轄範圍 |
|---|---|
| 本目錄 `docs/management/` | 專案管理：總覽、藍圖、近期交接、推進路線 |
| [docs/INDEX.md](../INDEX.md) | 檔案級草案與實作計畫狀態 |
| [Library/CURRENT.md](../../Library/CURRENT.md) | Canonical 規範分檔 |
| [.agents/handover.md](../../.agents/handover.md) | 推送當下快照與交接歷史 |

**分層原則**：管理層管事項與推進；INDEX 管檔案；版本化 handover 管推送快照；`docs/specs`、`docs/plans`、`tools/`、`DOC/` 為執行層產物。

## 更新規則

1. 事項狀態、階段、排序或阻塞變更時，先更新 [roadmap.md](roadmap.md)，並同步 [INDEX.md](../INDEX.md) 對應檔案列。
2. 工程願景或預期進度變更時，更新 [blueprint.md](blueprint.md)；不將逐項阻塞寫入藍圖。
3. 推送完成後，更新 [handover.md](handover.md) 為最近工作摘要；完整快照寫入 `.agents/handover/<commit>.md`。
4. 新增進行中事項時，須在 INDEX 登記主文件，並在 roadmap 新增列。
5. 裁決定案後，從 roadmap「開放裁決」移除，並更新所屬事項階段或移至「近期已結案」。
6. 撰寫版本化交接前，若本次變更影響路線狀態，須先更新 roadmap；交接正文連結本總覽與相關路線項目。
