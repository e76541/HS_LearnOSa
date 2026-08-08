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
2. 狀態變更須同步更新本登記簿與該文件檔頭（必含：`短代號`、`狀態`、`裁決來源`、`實作參照`、`後繼`）。
3. 新增 spec 或 plan 時，須同次登記本表、分配下一個未用短代號 `D{n}`，並補齊檔頭。
4. **凡草案必有短代號**：本表領域草案用 `D{n}`；治理待裁用 `裁{n}`（見 [drafts/INDEX](drafts/INDEX.md)）。定義見 [草案短代號](reference/terms/草案短代號.md)。號不回收、不改義。
5. 本登記簿只管 `docs/specs/` 與 `docs/plans/`；不取代 canonical 規範、管理層（總覽／藍圖／路線）或版本化交接索引。
6. `已裁決-試行` 轉 `已實作` 須附試作紀錄連結（[experiments/INDEX.md](experiments/INDEX.md)）；裁決時註明「免試作」者（純管理／文件類）可直接轉 `已實作`。本條僅約束 2026-07-18 之後的狀態變更，不回改舊列。

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

## 最優先草案

2026-08-08：新增 **D53**，在 D52/B7 上提出 **B8：全域 Knowledge Pool + 文本導出 Project + 大中小／lazy recursive decomposition + A生成／B池取用 Teaching + same/similar comparison**。D53 只列為**可試作候選**；Module/Edge 的 canonical 真值不變，Knowledge Graph 是全域池的語義圖譜視圖，Project hierarchy 仍是獨立 execution truth。**D48** 仍是目前整體主幹，直到同題實跑／裁決另有結果。

| 序 | 短代號 | 檔案 | 狀態 | 說明 |
|---|---|---|---|---|
| 0 | **D53** | [specs/2026-08-08-b8-global-knowledge-pool-recursive-project-teaching.md](specs/2026-08-08-b8-global-knowledge-pool-recursive-project-teaching.md) | 草稿 | **目前最優先新候選**；全域可溯源 Knowledge Pool／Knowledge Graph，文本導出 Project，大中小 lazy 遞迴到 AtomicStep，卡點以 Pool reuse 或 Generate 教學，再按需 same/similar 比較 |
| 1 | **D52** | [specs/2026-08-08-b7-four-change-project-run-optimization.md](specs/2026-08-08-b7-four-change-project-run-optimization.md) | 草稿 | **B8 直接 baseline**；B6.1 上 2 加 2 減：Project Contract、Resource Resolver、inline blocker classification、inline repair return |
| 2 | **D51** | [specs/2026-08-08-d50-paper-trace-and-b6-optimization.md](specs/2026-08-08-d50-paper-trace-and-b6-optimization.md) | 草稿 | **B0→B6 評價／試跑入口**；固定 T1 trace，依 canonical 重評 B1～B5，B6列可試作候選 |
| 3 | **D50** | [specs/2026-08-08-project-first-flow-candidates-evaluation.md](specs/2026-08-08-project-first-flow-candidates-evaluation.md) | 草稿 | **候選總表＋評判標準**；B0 baseline、B1～B5完整保留，不互相覆蓋 |
| 4 | **D49** | [specs/2026-08-08-d48-decision-draft-priority.md](specs/2026-08-08-d48-decision-draft-priority.md) | 草稿 | **治理優先入口**；依 D48 重排／重寫裁1～4，處理 WORK↔LEARN 主循環 |
| 5 | **D48** | [specs/2026-08-08-osa-core-work-learn-verify-integration.md](specs/2026-08-08-osa-core-work-learn-verify-integration.md) | 草稿 | **目前整體主幹／B0 一部分**：WORK／LEARN／VERIFY 銜接；只定義切換與返回，不重編既有系統 |
| 6 | **RBF1** | [rebuild/REBUILD1-framework.md](rebuild/REBUILD1-framework.md) | 框架定稿 | **B0 的 LEARN 現行框**（L0–L3／SK／C*）；非 D 短代號 |
| 7 | **D38** | [specs/2026-08-05-f3a-navigation-current.md](specs/2026-08-05-f3a-navigation-current.md) | 草稿 | **LEARN L1／L3 規則**；列入 baseline 評價 |
| 8 | **D37** | [specs/2026-08-05-navigation-osa-current.md](specs/2026-08-05-navigation-osa-current.md) | 草稿 | **L1 產品方向**；列入 baseline 評價 |
| 9 | **D36** | [specs/2026-08-05-source-learning-schedule.md](specs/2026-08-05-source-learning-schedule.md) | 草稿 | **L1-06 複習收窄**＋來源佇列（已依 REBUILD1 改寫） |

暫留：LEARNOSA **D32～D34**（已裁決-試行，承接 VERIFY／開發日誌）；收錄 **D6／D7／D8**。治理 **裁1～4** 的正式狀態仍以 drafts/INDEX 為準；D50～D53 對裁1／裁4的使用或內聯只屬比較／候選設計，不等於正式撤回或改裁。

## Specs

| 短代號 | 檔案 | 狀態 | 裁決來源 | 實作參照 | 後繼 |
|---|---|---|---|---|---|
| **D1** | [specs/2026-07-13-doc-storage-design.md](specs/2026-07-13-doc-storage-design.md) | 已併入 canonical | AOI 2026-07-13 v0.3 r2 | `DOC/` | [Library/規範/70-版本與裁決.md](../Library/規範/70-版本與裁決.md) §v0.3 r2 |
| **D2** | [specs/2026-07-13-inline-diagram-module-viz-plan.md](specs/2026-07-13-inline-diagram-module-viz-plan.md) | 已實作 | 無 | `tools/viz/` | 無 |
| **D3** | [specs/2026-07-13-knowledge-visualizer-design.md](specs/2026-07-13-knowledge-visualizer-design.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D4** | [specs/2026-07-14-ai-native-three-view-inline-design.md](specs/2026-07-14-ai-native-three-view-inline-design.md) | 已實作 | 無 | `DOC/Review/how-to-make-company-ai-native/views/` | 無 |
| **D5** | [specs/2026-07-14-module-selection-design.md](specs/2026-07-14-module-selection-design.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D6** | [specs/2026-07-14-document-centered-intake-pipeline-proposal.md](specs/2026-07-14-document-centered-intake-pipeline-proposal.md) | 待裁決 | 無 | 無 | 無 |
| **D7** | [specs/2026-07-14-document-centered-intake-pipeline-overview.md](specs/2026-07-14-document-centered-intake-pipeline-overview.md) | 草稿 | 無 | 無 | 無 |
| **D8** | [specs/2026-07-14-post-intake-disposition-trial.md](specs/2026-07-14-post-intake-disposition-trial.md) | 已裁決-試行 | AOI 2026-07-14 | `tools/post-intake-disposition-trial/` | 無 |
| **D9** | [specs/2026-07-15-speaking-module-graph-design.md](specs/2026-07-15-speaking-module-graph-design.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D10** | [specs/2026-07-15-modular-visualization-trial.md](specs/2026-07-15-modular-visualization-trial.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D11** | [specs/2026-07-15-management-preferences-and-decisions.md](specs/2026-07-15-management-preferences-and-decisions.md) | 已實作 | AOI 2026-07-15 | `docs/management/preferences.md`、`docs/management/decisions.md` | 無 |
| **D12** | [specs/2026-07-16-nine-palace-dual-phase.md](specs/2026-07-16-nine-palace-dual-phase.md) | 已封存 | AOI 2026-07-18；2026-07-27 C-13 九宮放棄 | 無 | 無（歷史參照） |
| **D13** | [specs/2026-07-16-gpt-live-cyclic-thinking.md](specs/2026-07-16-gpt-live-cyclic-thinking.md) | 已封存 | 無 | 無 | 無（循環步驟已併入建議步驟節；歷史參照） |
| **D14** | [specs/2026-07-18-learnos-terminal-dashboard.md](specs/2026-07-18-learnos-terminal-dashboard.md) | 已封存 | 無 | 原型已封存 | 無（歷史參照） |
| **D15** | [specs/2026-07-18-talk-roadmap-nine-palace.md](specs/2026-07-18-talk-roadmap-nine-palace.md) | 已封存 | 無 | 原型已封存 | 無（九宮已放棄） |
| **D16** | [specs/2026-07-18-module-flow-loop.md](specs/2026-07-18-module-flow-loop.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D17** | [specs/2026-07-18-explain-this-conversion.md](specs/2026-07-18-explain-this-conversion.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D18** | [specs/2026-07-19-module-fragments-nine-grid-agent-view.md](specs/2026-07-19-module-fragments-nine-grid-agent-view.md) | 已封存 | 無 | 整合圖已封存 | 無（九宮已放棄；歷史參照） |
| **D19** | [specs/2026-07-21-draft-integration-conflicts.md](specs/2026-07-21-draft-integration-conflicts.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D20** | [specs/2026-07-21-navigation-osa-decision-deck.md](specs/2026-07-21-navigation-osa-decision-deck.md) | 已封存 | 2026-07-27 C-12 | 無 | **活內容**→[navigation-osa-current](specs/2026-08-05-navigation-osa-current.md)、[f3a-navigation-current](specs/2026-08-05-f3a-navigation-current.md) |
| **D21** | [specs/2026-07-22-pipeline-deck-nine-grid-integration.md](specs/2026-07-22-pipeline-deck-nine-grid-integration.md) | 已封存 | 2026-07-27 C-13 | 無 | 無（決策牌／九宮管線已退場） |
| **D22** | [specs/2026-07-23-decision-trainer-v2.md](specs/2026-07-23-decision-trainer-v2.md) | 已封存 | 2026-07-27 B-7 | 無 | [f3a-navigation-current](specs/2026-08-05-f3a-navigation-current.md) |
| **D23** | [specs/2026-07-23-question-boundary-integration.md](specs/2026-07-23-question-boundary-integration.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D24** | [specs/2026-07-24-f3a-navigation-mode-extract.md](specs/2026-07-24-f3a-navigation-mode-extract.md) | 已封存 | 無 | 展示 HTML（歷史） | [f3a-navigation-current](specs/2026-08-05-f3a-navigation-current.md) |
| **D25** | [specs/2026-07-25-gap-driven-navigation.md](specs/2026-07-25-gap-driven-navigation.md) | 已封存 | 對話裁決 2026-07-25 | 流程圖（歷史） | [f3a-navigation-current](specs/2026-08-05-f3a-navigation-current.md) |
| **D26** | [specs/2026-07-25-f3a-navigation-consolidated-handover.md](specs/2026-07-25-f3a-navigation-consolidated-handover.md) | 已封存 | 無 | [試跑回放（歷史）](../experiments/assets/2026-07-25-ge-5step/dry-run-playback.html) | [f3a-navigation-current](specs/2026-08-05-f3a-navigation-current.md)（投影稿收斂） |
| **D27** | [specs/2026-07-25-f3a-navigation-redesign.md](specs/2026-07-25-f3a-navigation-redesign.md) | 已封存 | 無 | 無 | [f3a-navigation-current](specs/2026-08-05-f3a-navigation-current.md) |
| **D28** | [specs/2026-07-26-navigation-redesign-alignment.md](specs/2026-07-26-navigation-redesign-alignment.md) | 已封存 | 無 | 無 | [f3a-navigation-current](specs/2026-08-05-f3a-navigation-current.md)（投影稿收斂） |
| **D29** | [specs/2026-07-26-skill-tree.md](specs/2026-07-26-skill-tree.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D30** | [specs/2026-07-27-usage-first-learning-loop.md](specs/2026-07-27-usage-first-learning-loop.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D31** | [specs/2026-07-29-universal-text-learning-workflow.md](specs/2026-07-29-universal-text-learning-workflow.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D32** | [specs/2026-08-04-learnosa-content-standard-v0.2.md](specs/2026-08-04-learnosa-content-standard-v0.2.md) | 已裁決-試行 | 使用者 2026-08-04 | 無 | **LEARNOSA 內容製作標準 v0.2**；詞彙見 [共同語言](specs/2026-08-04-learnosa-content-glossary.md)；對接見 [bridge](specs/2026-08-04-learnosa-hs-learnedge-bridge.md)；未升格 canonical |
| **D33** | [specs/2026-08-04-learnosa-content-glossary.md](specs/2026-08-04-learnosa-content-glossary.md) | 已裁決-試行 | 使用者 2026-08-04 | 無 | **LEARNOSA 內容製作共同語言**；內容側詞彙真值 |
| **D34** | [specs/2026-08-04-learnosa-hs-learnedge-bridge.md](specs/2026-08-04-learnosa-hs-learnedge-bridge.md) | 已裁決-試行 | 使用者 2026-08-04 | [試作](../experiments/2026-08-04-learnosa-content-verification-trial.md) | **全專案詞彙分流＋銜接縫**；流程參考見 [runnable-flow-reference](specs/2026-08-04-learnosa-learnedge-runnable-flow-reference.md) |
| **D35** | [specs/2026-08-04-learnosa-learnedge-runnable-flow-reference.md](specs/2026-08-04-learnosa-learnedge-runnable-flow-reference.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D36** | [specs/2026-08-05-source-learning-schedule.md](specs/2026-08-05-source-learning-schedule.md) | 草稿 | 使用者 2026-08-07 REBUILD1 改寫 | 無 | **L1-06 複習收窄**（活線）|
| **D37** | [specs/2026-08-05-navigation-osa-current.md](specs/2026-08-05-navigation-osa-current.md) | 草稿 | 使用者 2026-08-07 REBUILD1 改寫 | 無 | **L1 產品方向**（活線）|
| **D38** | [specs/2026-08-05-f3a-navigation-current.md](specs/2026-08-05-f3a-navigation-current.md) | 草稿 | 使用者 2026-08-07 REBUILD1 改寫 | [試跑回放](../experiments/assets/2026-07-25-ge-5step/dry-run-playback.html) | **L1／L3 規則**（活線）；↔ 裁1～4|
| **D39** | [specs/2026-08-05-doc-integration-extraction-strategy.md](specs/2026-08-05-doc-integration-extraction-strategy.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D46** | [specs/2026-08-05-char-gold-module-tables.md](specs/2026-08-05-char-gold-module-tables.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D47** | [specs/2026-08-05-llm-wiki-learnedge-bridge.md](specs/2026-08-05-llm-wiki-learnedge-bridge.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D48** | [specs/2026-08-08-osa-core-work-learn-verify-integration.md](specs/2026-08-08-osa-core-work-learn-verify-integration.md) | 草稿 | 無 | 無 | **WORK／LEARN／VERIFY 跨系統整合草案**；目前整體主幹／B0 baseline |
| **D49** | [specs/2026-08-08-d48-decision-draft-priority.md](specs/2026-08-08-d48-decision-draft-priority.md) | 草稿 | 無 | 無 | **治理優先入口**；依 D48 重排／重寫裁1～4，處理 WORK↔LEARN 主循環 |
| **D50** | [specs/2026-08-08-project-first-flow-candidates-evaluation.md](specs/2026-08-08-project-first-flow-candidates-evaluation.md) | 草稿 | 無 | 無 | **候選總表＋12項評判標準**；B0 baseline、B1～B5完整保留，不互相覆蓋 |
| **D51** | [specs/2026-08-08-d50-paper-trace-and-b6-optimization.md](specs/2026-08-08-d50-paper-trace-and-b6-optimization.md) | 草稿 | 無 | 無 | **B0→B6 評價／試跑入口**；固定 T1 紙上 trace，依 canonical 重評 B1～B5，提出 B6可試作候選 |
| **D52** | [specs/2026-08-08-b7-four-change-project-run-optimization.md](specs/2026-08-08-b7-four-change-project-run-optimization.md) | 草稿 | 無 | 無 | **B8 直接 baseline**；B6.1 上只做 2 加 2 減，維持單一路線真值與 canonical 邊界 |
| **D53** | [specs/2026-08-08-b8-global-knowledge-pool-recursive-project-teaching.md](specs/2026-08-08-b8-global-knowledge-pool-recursive-project-teaching.md) | 草稿 | 無 | 無 | **目前最優先新候選**；全域可溯源 Knowledge Pool／Knowledge Graph，文本導出 Project，lazy 遞迴到 AtomicStep，Teaching 以 Pool reuse 或 Generate，按需 same/similar 比較 |

## Plans

| 短代號 | 檔案 | 狀態 | 裁決來源 | 實作參照 | 後繼 |
|---|---|---|---|---|---|
| **D40** | [plans/2026-07-13-doc-storage-implementation.md](plans/2026-07-13-doc-storage-implementation.md) | 已實作 | AOI 2026-07-13 v0.3 r2 | `DOC/` | 無 |
| **D41** | [plans/2026-07-14-ai-native-three-view-inline.md](plans/2026-07-14-ai-native-three-view-inline.md) | 已實作 | 無 | `DOC/Review/how-to-make-company-ai-native/views/` | 無 |
| **D42** | [plans/2026-07-14-module-selection-implementation.md](plans/2026-07-14-module-selection-implementation.md) | 已封存 | 使用者 2026-08-07 REBUILD1 舊框架批次封存 | — | [REBUILD1-framework](rebuild/REBUILD1-framework.md)（歷史）|
| **D43** | [plans/2026-07-14-post-intake-disposition-trial-test.md](plans/2026-07-14-post-intake-disposition-trial-test.md) | 已裁決-試行 | AOI 2026-07-14 | `tools/post-intake-disposition-trial-test/` | 無 |
| **D44** | [plans/2026-07-14-skill-registry-automation.md](plans/2026-07-14-skill-registry-automation.md) | 已實作 | AOI 2026-07-14 Gate A（v0.3 r3） | `tools/registry/` | 無 |
| **D45** | [plans/2026-07-22-zhaogou-decision-deck-p1.md](plans/2026-07-22-zhaogou-decision-deck-p1.md) | 已封存 | 無 | [試作 spike](experiments/2026-07-22-zhaogou-decision-deck-p1-spike.md) | 無（決策牌已退出） |