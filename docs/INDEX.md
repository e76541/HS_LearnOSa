# 草案登記簿

草案層的統一入口。整體管理見 [management/overview.md](management/overview.md)；推進路線見 [management/roadmap.md](management/roadmap.md)；Canonical 規範見 [Library/CURRENT.md](../Library/CURRENT.md)；推送歷史見 [.agents/handover.md](../.agents/handover.md)。

## 狀態詞彙（封閉集）

| 狀態 | 意義 |
|---|---|
| `草稿` | 撰寫中，未請求裁決 |
| `待裁決` | 內容完成，等待 AOI 裁決 |
| `已裁決-試行` | 裁決通過，shadow／試行中 |
| `已實作` | 實作完成並通過驗證，尚未 canonical 化 |
| `已併入 canonical` | 內容已寫入 `Library/規範`，草案轉為歷史參照 |
| `已撤回` | 不再推進 |
| `已封存` | 保留參照，暫不推進 |

禁止自創狀態詞彙。

## 認定規則

1. 狀態變更須有觸發依據：AOI 裁決記錄，或可驗證的實作證據（測試通過、canonical 修訂記錄）。
2. 狀態變更須同步更新本登記簿與該文件檔頭四行（`狀態`、`裁決來源`、`實作參照`、`後繼`）。
3. 新增 spec 或 plan 時，須同次登記本表並補齊檔頭。
4. 本登記簿只管 `docs/specs/` 與 `docs/plans/`；不取代 canonical 規範、管理層（總覽／藍圖／路線）或版本化交接索引。

## 入口分工

| 入口 | 管轄範圍 |
|---|---|
| [management/overview.md](management/overview.md) | 專案管理總覽與分層導覽 |
| [management/roadmap.md](management/roadmap.md) | 推進路線：階段、排序、阻塞與裁決 |
| [management/preferences.md](management/preferences.md) | 長期協作偏好 |
| [management/decisions.md](management/decisions.md) | 討論結論備忘（未升格） |
| 本檔 `docs/INDEX.md` | 檔案級草案與實作計畫狀態 |
| [Library/CURRENT.md](../Library/CURRENT.md) | Canonical 規範分檔 |
| [.agents/handover.md](../.agents/handover.md) | 版本化推送快照與交接索引 |

## Specs

| 檔案 | 狀態 | 裁決來源 | 實作參照 | 後繼 |
|---|---|---|---|---|
| [specs/2026-07-13-doc-storage-design.md](specs/2026-07-13-doc-storage-design.md) | 已併入 canonical | AOI 2026-07-13 v0.3 r2 | `DOC/` | [Library/規範/70-版本與裁決.md](../Library/規範/70-版本與裁決.md) §v0.3 r2 |
| [specs/2026-07-13-inline-diagram-module-viz-plan.md](specs/2026-07-13-inline-diagram-module-viz-plan.md) | 已實作 | 無 | `tools/viz/` | 無 |
| [specs/2026-07-13-knowledge-visualizer-design.md](specs/2026-07-13-knowledge-visualizer-design.md) | 草稿 | 無 | `tools/viz/`（Phase 0 部分） | 無 |
| [specs/2026-07-14-ai-native-three-view-inline-design.md](specs/2026-07-14-ai-native-three-view-inline-design.md) | 已實作 | 無 | `DOC/Review/how-to-make-company-ai-native/views/` | 無 |
| [specs/2026-07-14-module-selection-design.md](specs/2026-07-14-module-selection-design.md) | 待裁決 | 無 | `DOC/Review/how-to-make-company-ai-native/selection.md`（試點） | 無 |
| [specs/2026-07-14-document-centered-intake-pipeline-proposal.md](specs/2026-07-14-document-centered-intake-pipeline-proposal.md) | 待裁決 | 無 | 無 | 無 |
| [specs/2026-07-14-document-centered-intake-pipeline-overview.md](specs/2026-07-14-document-centered-intake-pipeline-overview.md) | 草稿 | 無 | 無 | 無 |
| [specs/2026-07-14-post-intake-disposition-trial.md](specs/2026-07-14-post-intake-disposition-trial.md) | 已裁決-試行 | AOI 2026-07-14 | `tools/post-intake-disposition-trial/` | 無 |
| [specs/2026-07-15-speaking-module-graph-design.md](specs/2026-07-15-speaking-module-graph-design.md) | 草案 | 無 | 無 | [knowledge-visualizer-design.md](specs/2026-07-13-knowledge-visualizer-design.md)、[modular-visualization-trial.md](specs/2026-07-15-modular-visualization-trial.md) |
| [specs/2026-07-15-modular-visualization-trial.md](specs/2026-07-15-modular-visualization-trial.md) | 草稿 | 無 | `docs/archify-demo/`、`tools/viz/` | [knowledge-visualizer-design.md](specs/2026-07-13-knowledge-visualizer-design.md) |
| [specs/2026-07-15-management-preferences-and-decisions.md](specs/2026-07-15-management-preferences-and-decisions.md) | 已實作 | AOI 2026-07-15 | `docs/management/preferences.md`、`docs/management/decisions.md` | 無 |

## Plans

| 檔案 | 狀態 | 裁決來源 | 實作參照 | 後繼 |
|---|---|---|---|---|
| [plans/2026-07-13-doc-storage-implementation.md](plans/2026-07-13-doc-storage-implementation.md) | 已實作 | AOI 2026-07-13 v0.3 r2 | `DOC/` | 無 |
| [plans/2026-07-14-ai-native-three-view-inline.md](plans/2026-07-14-ai-native-three-view-inline.md) | 已實作 | 無 | `DOC/Review/how-to-make-company-ai-native/views/` | 無 |
| [plans/2026-07-14-module-selection-implementation.md](plans/2026-07-14-module-selection-implementation.md) | 草稿 | 無 | 無 | 無 |
| [plans/2026-07-14-post-intake-disposition-trial-test.md](plans/2026-07-14-post-intake-disposition-trial-test.md) | 已裁決-試行 | AOI 2026-07-14 | `tools/post-intake-disposition-trial/test/` | 無 |
| [plans/2026-07-14-skill-registry-automation.md](plans/2026-07-14-skill-registry-automation.md) | 已實作 | AOI 2026-07-14 Gate A（v0.3 r3） | `tools/registry/` | 無 |
