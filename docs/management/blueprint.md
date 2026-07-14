# 發展藍圖

回答「往哪走、長什麼樣、預期工程為何」。不回答「現在卡在哪一步」——那是 [roadmap.md](roadmap.md) 的職責。

## 願景

HS_LearnEdge 以文檔為中心的學習管線：

```text
收錄 → 登記與保存 → 模板化 → 模塊化／抽邊 → 下游學習產物
（視圖、練習、演講）
```

管理、草案登記、版本化交接與 canonical 規範分層運作；執行層產物（`docs/specs`、`docs/plans`、`tools/`、`DOC/`）獨立於治理決策。

## 目標樣貌

### 文檔登記與保存層（對應 INI-001）

在模板化前插入窄責任的登記與保存層，與語意層分離：

| 記錄 | 擁有 |
|---|---|
| `BatchReceipt` | 一批何時、從何處收到哪些文檔 |
| `DocumentManifest` | 文檔身份、來源、指紋、修訂與保存參照 |
| `PreservationEvent` | 保存／封存行為、目標與理由 |
| `TemplateInstance` | 某修訂採用的模板與產出參照 |

「是否已保存」與「是否進入模板化」分開判斷；既有 `DOC/Stocks`、`DOC/Archive`、`DOC/Review` 維持「語意處理完成後」出口語意。

### 模塊篩選（對應 INI-002）

模塊級內容裁決（主動不要／被動忽略），在 Review 與下游產物生成前過濾內容；不取代 `DOC/INDEX.md` 查找語意，不建立全域 selection 真值索引。

### 收錄後處置註記（對應 INI-003）

模板後／Review 側可回放的人工註記；不擁有文檔身份、模塊、邊或技能登記真值，不可升格為保存層。

### 技能登記半自動（對應 INI-004）

以工具鏈半自動對齊模塊與技能節點，支援 shadow 與可重建 embedding；正式真值仍由人工 Gate 控制。

### 知識視覺化（對應 INI-005）

- Phase 0：inline Mermaid／Markdown 投影至 `views/`，服務 Review 與交接快查。
- Phase 1：React 儀表板，支援即時篩選、聚光與多來源 UI。

## 預期工程（不含現況）

| 線 | 預期階段（藍圖順序） | 主文件 |
|---|---|---|
| 收錄管線 | P0 裁決 → P1–P3 shadow → P4 驗收 → P5 canonical／遷移 | [proposal](../specs/2026-07-14-document-centered-intake-pipeline-proposal.md)、[overview](../specs/2026-07-14-document-centered-intake-pipeline-overview.md) |
| 模塊篩選 | 設計裁決 → `tools/selection/` → 實際來源驗證 → 視結果升格 | [design](../specs/2026-07-14-module-selection-design.md)、[plan](../plans/2026-07-14-module-selection-implementation.md) |
| 收錄後處置 | shadow 試行 → 累積資料 → 評估是否納入正式流程（不升格為身份層） | [spec](../specs/2026-07-14-post-intake-disposition-trial.md) |
| 技能登記 | 工具鏈 → Gate B（基準與 R10）→ 正式真值策略 | [plan](../plans/2026-07-14-skill-registry-automation.md) |
| 知識視覺化 | Phase 0 inline → Phase 1 React → 與篩選／登記整合 | [design](../specs/2026-07-13-knowledge-visualizer-design.md) |

各線「目前走到哪、卡什麼」見 [roadmap.md](roadmap.md)。

## 已併入基線的樣貌

| 能力 | 樣貌 |
|---|---|
| DOC 文檔儲存與索引 | `DOC/Stocks`、`DOC/Archive`、`DOC/Review` + 人工查找索引（canonical v0.3 r2） |
| Inline 模塊可視化 | `tools/viz/` 投影至文檔 `views/` |
| AI-Native 三視圖內聯 | Dynamic View 產物，不回寫真值 |
