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

**主線**：`草稿 → 待裁決 → 已裁決-試行 → 已實作 → 已併入 canonical`。`已撤回`／`已封存`為岔路，任一站可轉入。裁決結論記於 [management/decisions.md](management/decisions.md)；升格（已併入 canonical）時，涉及的作業模塊同批議啟用（術語不混用：文件叫升格，作業模塊叫啟用）。

## 認定規則

1. 狀態變更須有觸發依據：AOI 裁決記錄，或可驗證的實作證據（測試通過、canonical 修訂記錄）。
2. 狀態變更須同步更新本登記簿與該文件檔頭四行（`狀態`、`裁決來源`、`實作參照`、`後繼`）。
3. 新增 spec 或 plan 時，須同次登記本表並補齊檔頭。
4. 本登記簿只管 `docs/specs/` 與 `docs/plans/`；不取代 canonical 規範、管理層（總覽／藍圖／路線）或版本化交接索引。
5. `已裁決-試行` 轉 `已實作` 須附試作紀錄連結（[experiments/INDEX.md](experiments/INDEX.md)）；裁決時註明「免試作」者（純管理／文件類）可直接轉 `已實作`。本條僅約束 2026-07-18 之後的狀態變更，不回改舊列。

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
| [specs/2026-07-16-nine-palace-dual-phase.md](specs/2026-07-16-nine-palace-dual-phase.md) | 草稿 | 無 | 無 | [module-flow-loop.md](specs/2026-07-18-module-flow-loop.md)（循環化擴充；口頭驗證後再議是否附錄入 v0.4） |
| [specs/2026-07-16-gpt-live-cyclic-thinking.md](specs/2026-07-16-gpt-live-cyclic-thinking.md) | 草稿 | 無 | 無 | 無（循環定義待補；或升格 preferences） |
| [specs/2026-07-18-learnos-terminal-dashboard.md](specs/2026-07-18-learnos-terminal-dashboard.md) | 草稿 | 無 | 無（原型 `docs/specs/assets/2026-07-18-learnos-terminal.html`） | 無（邊詞彙與資料來源待決） |
| [specs/2026-07-18-talk-roadmap-nine-palace.md](specs/2026-07-18-talk-roadmap-nine-palace.md) | 草稿 | 無 | 無（原型 `docs/specs/assets/2026-07-18-talk-roadmap.html`） | 無（與九宮雙階段是否合併待議） |
| [specs/2026-07-18-module-flow-loop.md](specs/2026-07-18-module-flow-loop.md) | 草稿 | 無 | 無 | 無（與雙階段草案同批口頭驗證） |
| [specs/2026-07-18-explain-this-conversion.md](specs/2026-07-18-explain-this-conversion.md) | 草稿 | 無 | 無 | 無（隨流程閉環同批驗證） |

## Plans

| 檔案 | 狀態 | 裁決來源 | 實作參照 | 後繼 |
|---|---|---|---|---|
| [plans/2026-07-13-doc-storage-implementation.md](plans/2026-07-13-doc-storage-implementation.md) | 已實作 | AOI 2026-07-13 v0.3 r2 | `DOC/` | 無 |
| [plans/2026-07-14-ai-native-three-view-inline.md](plans/2026-07-14-ai-native-three-view-inline.md) | 已實作 | 無 | `DOC/Review/how-to-make-company-ai-native/views/` | 無 |
| [plans/2026-07-14-module-selection-implementation.md](plans/2026-07-14-module-selection-implementation.md) | 草稿 | 無 | 無 | 無 |
| [plans/2026-07-14-post-intake-disposition-trial-test.md](plans/2026-07-14-post-intake-disposition-trial-test.md) | 已裁決-試行 | AOI 2026-07-14 | `tools/post-intake-disposition-trial/test/` | 無 |
| [plans/2026-07-14-skill-registry-automation.md](plans/2026-07-14-skill-registry-automation.md) | 已實作 | AOI 2026-07-14 Gate A（v0.3 r3） | `tools/registry/` | 無 |
