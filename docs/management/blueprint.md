# 發展藍圖

整體方向、目標樣貌、預期工程與各工程目前進度。不追蹤逐項阻塞或每日變更；執行排序與裁決見 [roadmap.md](roadmap.md)。

## 願景

HS_LearnEdge 以文檔為中心的學習管線：收錄 → 登記與保存 → 模板化 → 模塊化／抽邊 → 下游學習產物（視圖、練習、演講）。管理、草案登記、版本化交接與 canonical 規範分層運作，執行層產物獨立於治理決策。

## 工程藍圖

### 文檔中心收錄管線（INI-001）

**目標樣貌**：在模板化前插入「文檔登記與保存層」，以 `BatchReceipt`、`DocumentManifest`、`PreservationEvent`、`TemplateInstance` 管理收錄身份與保存決策，與語意層（模塊、邊、技能）分離。

**預期工程**：P0 裁決 → P1–P3 shadow 試行 → P4 驗收 → P5 canonical 化與遷移。

**目前進度**：提案與可視化說明已完成；位於 P0 裁決前。P1–P5 均未開始。

- [proposal](../specs/2026-07-14-document-centered-intake-pipeline-proposal.md)
- [overview](../specs/2026-07-14-document-centered-intake-pipeline-overview.md)

### 模塊篩選機制（INI-002）

**目標樣貌**：模塊級內容篩選（主動不要／被動忽略），支援 Review 與下游產物生成前的內容裁決，不取代 `DOC/INDEX.md` 查找語意。

**預期工程**：設計裁決 → `tools/selection/` 實作 → 實際來源驗證（P6）→ 視結果升格 canonical。

**目前進度**：設計完成、試點註記存在；實作計畫為草稿，`tools/selection/` 未建。

- [design](../specs/2026-07-14-module-selection-design.md)
- [plan](../plans/2026-07-14-module-selection-implementation.md)

### 收錄後處置（INI-003）

**目標樣貌**：模板後／Review 側的可回放人工註記，記錄收錄後處置決策，不改變文檔身份、模塊、邊或技能登記真值。

**預期工程**：shadow 試行 → 累積試行資料 → 評估是否納入正式流程（不可升格為文檔身份與保存層）。

**目前進度**：已裁決-試行中；`tools/post-intake-disposition-trial/` 可運作。

- [spec](../specs/2026-07-14-post-intake-disposition-trial.md)
- [test plan](../plans/2026-07-14-post-intake-disposition-trial-test.md)

### 技能登記簿半自動化（INI-004）

**目標樣貌**：以 `tools/registry/` 半自動對齊模塊與技能節點，支援 shadow 登記、人工覆核與可重建 embedding；正式真值仍由人工 Gate 控制。

**預期工程**：Phase 0–5 工具鏈 → Gate B（三十篇基準與 R10 裁決）→ 正式真值自動化（待裁決）。

**目前進度**：Phase 0–5 已實作；Gate B 未過，正式真值仍人工寫入。

- [plan](../plans/2026-07-14-skill-registry-automation.md)

### 知識視覺化（INI-005）

**目標樣貌**：兩階段——Phase 0 inline（Mermaid／Markdown 投影至 `views/`）服務 Review 與交接；Phase 1 React 儀表板支援即時篩選、聚光與多來源 UI。

**預期工程**：Phase 0（已完成）→ Phase 1 React 儀表板 → 與模塊篩選、技能登記整合。

**目前進度**：Phase 0 inline 已實作（`tools/viz/`）；React Phase 1 未開。

- [design](../specs/2026-07-13-knowledge-visualizer-design.md)
- [inline plan](../specs/2026-07-13-inline-diagram-module-viz-plan.md)

### 已併入基線

| 工程 | 狀態 | 說明 |
|---|---|---|
| DOC 文檔儲存與索引 | 已併入 canonical | v0.3 r2；`DOC/Stocks`、`DOC/Archive`、`DOC/Review` |
| AI-Native 三視圖內聯 | 已實作 | Dynamic View 產物，不回寫真值 |
| Inline 模塊可視化 Phase 0 | 已實作 | `tools/viz/` |
