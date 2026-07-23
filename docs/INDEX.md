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

## 舊 M2 一體語境（已廢止）

舊作業模塊「M2 結構與視圖」在草案語境裡常被當成一整包。**該一體語境已廢止**；內容已分拆到新代號（見 [ops-id-legend.md](management/ops-id-legend.md)）。`agent-ops` 已落表：舊 M2 **已廢止**；視圖／HTML 掛作業模塊 **T**（站位 T2／T3／C1），結構半邊掛 **F**（F2）：

| 分拆後 | 承接什麼 |
|---|---|
| **F2** | 模塊＋邊（結構半邊） |
| **T2** | 繪圖／SVG／概念圖（含 Archify 試作線） |
| **T3** | HTML 頁面輸出 |
| **C1-(T3)** | HTML 管理中心（hub） |
| **INI-005／React** | 知識視覺化儀表板 Phase 1（仍屬路線事項，不等於整包舊 M2） |

下列視圖相關草案**不刪**；檔頭／本表後繼改掛分拆，不再維持「整包 M2 草案」狀態。

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
| [specs/2026-07-13-knowledge-visualizer-design.md](specs/2026-07-13-knowledge-visualizer-design.md) | 草稿 | 無 | `tools/viz/`（Phase 0 部分） | 舊 M2 一體已廢止→掛 **INI-005／React**；HTML hub 另見 **C1-(T3)** |
| [specs/2026-07-14-ai-native-three-view-inline-design.md](specs/2026-07-14-ai-native-three-view-inline-design.md) | 已實作 | 無 | `DOC/Review/how-to-make-company-ai-native/views/` | 無 |
| [specs/2026-07-14-module-selection-design.md](specs/2026-07-14-module-selection-design.md) | 待裁決 | 無 | `DOC/Review/how-to-make-company-ai-native/selection.md`（試點） | 無 |
| [specs/2026-07-14-document-centered-intake-pipeline-proposal.md](specs/2026-07-14-document-centered-intake-pipeline-proposal.md) | 待裁決 | 無 | 無 | 無 |
| [specs/2026-07-14-document-centered-intake-pipeline-overview.md](specs/2026-07-14-document-centered-intake-pipeline-overview.md) | 草稿 | 無 | 無 | 無 |
| [specs/2026-07-14-post-intake-disposition-trial.md](specs/2026-07-14-post-intake-disposition-trial.md) | 已裁決-試行 | AOI 2026-07-14 | `tools/post-intake-disposition-trial/` | 無 |
| [specs/2026-07-15-speaking-module-graph-design.md](specs/2026-07-15-speaking-module-graph-design.md) | 草案 | 無 | 無 | 舊 M2 一體已廢止→演講互動掛 **INI-005**／候補 **F3**；見 knowledge-visualizer、modular-visualization-trial |
| [specs/2026-07-15-modular-visualization-trial.md](specs/2026-07-15-modular-visualization-trial.md) | 草稿 | 無 | `docs/archive/html-2026-07-23/archify-demo/`（已封存）、`tools/viz/` | 舊 M2 一體已廢止→方案 1+2＝**T2**；方案 3＝**INI-005**；hub＝**C1-(T3)** |
| [specs/2026-07-15-management-preferences-and-decisions.md](specs/2026-07-15-management-preferences-and-decisions.md) | 已實作 | AOI 2026-07-15 | `docs/management/preferences.md`、`docs/management/decisions.md` | 無 |
| [specs/2026-07-16-nine-palace-dual-phase.md](specs/2026-07-16-nine-palace-dual-phase.md) | 已裁決-試行 | AOI 2026-07-18 | 無 | [module-flow-loop](specs/2026-07-18-module-flow-loop.md)、[module-fragments…](specs/2026-07-19-module-fragments-nine-grid-agent-view.md)、[pipeline-deck-nine-grid-integration](specs/2026-07-22-pipeline-deck-nine-grid-integration.md)（九宮改練習出口之一；待裁） |
| [specs/2026-07-16-gpt-live-cyclic-thinking.md](specs/2026-07-16-gpt-live-cyclic-thinking.md) | 草稿 | 無 | 無 | 無（循環定義待補；或升格 preferences） |
| [specs/2026-07-18-learnos-terminal-dashboard.md](specs/2026-07-18-learnos-terminal-dashboard.md) | 草稿 | 無 | 無（原型已封存 `archive/html-2026-07-23/specs/assets/2026-07-18-learnos-terminal.html`） | 無（邊詞彙與資料來源待決） |
| [specs/2026-07-18-talk-roadmap-nine-palace.md](specs/2026-07-18-talk-roadmap-nine-palace.md) | 草稿 | 無 | 無（原型已封存 `archive/html-2026-07-23/specs/assets/2026-07-18-talk-roadmap.html`） | 無（與九宮雙階段是否合併待議） |
| [specs/2026-07-18-module-flow-loop.md](specs/2026-07-18-module-flow-loop.md) | 已裁決-試行 | AOI 2026-07-18 | 無 | [pipeline-deck-nine-grid-integration](specs/2026-07-22-pipeline-deck-nine-grid-integration.md)（拆選後接固定牌；待裁）；[module-fragments…](specs/2026-07-19-module-fragments-nine-grid-agent-view.md) |
| [specs/2026-07-18-explain-this-conversion.md](specs/2026-07-18-explain-this-conversion.md) | 已裁決-試行 | AOI 2026-07-18 | 無 | [pipeline-deck-nine-grid-integration](specs/2026-07-22-pipeline-deck-nine-grid-integration.md)（回宮｜回固定牌；待裁） |
| [specs/2026-07-19-module-fragments-nine-grid-agent-view.md](specs/2026-07-19-module-fragments-nine-grid-agent-view.md) | 草稿 | 無 | 無（整合圖已封存 `archive/html-2026-07-23/specs/assets/2026-07-19-module-pipeline-flow.html`；r0 凍結於 [archive/…](archive/2026-07-19-module-fragments-nine-grid-agent-view-r0.md)） | 無（r1 修併稿；§12 待裁決後執行試作 `module-fragments-nine-grid`） |
| [specs/2026-07-21-draft-integration-conflicts.md](specs/2026-07-21-draft-integration-conflicts.md) | 草稿 | 無 | 無（互動原型已封存 `archive/html-2026-07-23/specs/assets/2026-07-21-draft-integration-conflicts.html`） | [pipeline-deck-nine-grid-integration](specs/2026-07-22-pipeline-deck-nine-grid-integration.md)（六衝突仍待裁） |
| [specs/2026-07-21-navigation-osa-decision-deck.md](specs/2026-07-21-navigation-osa-decision-deck.md) | 草稿 | 無 | 無 | [pipeline-deck-nine-grid-integration](specs/2026-07-22-pipeline-deck-nine-grid-integration.md)、[zhaogou-decision-deck-p1](plans/2026-07-22-zhaogou-decision-deck-p1.md)、[decision-trainer-v2](specs/2026-07-23-decision-trainer-v2.md) |
| [specs/2026-07-22-pipeline-deck-nine-grid-integration.md](specs/2026-07-22-pipeline-deck-nine-grid-integration.md) | 草稿 | 無 | 無 | 對齊 F3a～F3d；三份准試行總覽句改寫仍待授權 |
| [specs/2026-07-23-decision-trainer-v2.md](specs/2026-07-23-decision-trainer-v2.md) | 草稿 | 無 | 無 | 掛 **F3a**；M5 已結案；問／邊界見 [question-boundary-integration](specs/2026-07-23-question-boundary-integration.md) |
| [specs/2026-07-23-question-boundary-integration.md](specs/2026-07-23-question-boundary-integration.md) | 草稿 | 無 | 無 | 三種提問 × 五類邊界 × F3；不合併引擎 |

## Plans

| 檔案 | 狀態 | 裁決來源 | 實作參照 | 後繼 |
|---|---|---|---|---|
| [plans/2026-07-13-doc-storage-implementation.md](plans/2026-07-13-doc-storage-implementation.md) | 已實作 | AOI 2026-07-13 v0.3 r2 | `DOC/` | 無 |
| [plans/2026-07-14-ai-native-three-view-inline.md](plans/2026-07-14-ai-native-three-view-inline.md) | 已實作 | 無 | `DOC/Review/how-to-make-company-ai-native/views/` | 無 |
| [plans/2026-07-14-module-selection-implementation.md](plans/2026-07-14-module-selection-implementation.md) | 草稿 | 無 | 無 | 無 |
| [plans/2026-07-14-post-intake-disposition-trial-test.md](plans/2026-07-14-post-intake-disposition-trial-test.md) | 已裁決-試行 | AOI 2026-07-14 | `tools/post-intake-disposition-trial/test/` | 無 |
| [plans/2026-07-14-skill-registry-automation.md](plans/2026-07-14-skill-registry-automation.md) | 已實作 | AOI 2026-07-14 Gate A（v0.3 r3） | `tools/registry/` | 無 |
| [plans/2026-07-22-zhaogou-decision-deck-p1.md](plans/2026-07-22-zhaogou-decision-deck-p1.md) | 草稿 | 無 | [experiments/2026-07-22-zhaogou-decision-deck-p1-spike.md](experiments/2026-07-22-zhaogou-decision-deck-p1-spike.md) | 無（母草案 §11 1～6 未裁；M5 已處理＝改掛 F） |
