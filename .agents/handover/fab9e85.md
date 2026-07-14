# 交接：模塊視覺化試作（Archify）— 方案 3 列草案

- 管理總覽：[docs/management/overview.md](../../docs/management/overview.md)
- 路線（關聯）：[roadmap.md](../../docs/management/roadmap.md) **INI-005**（Phase 1 草案）；**INI-001 仍未完成**（見下）
- **本案主文件**：[docs/specs/2026-07-15-modular-visualization-trial.md](../../docs/specs/2026-07-15-modular-visualization-trial.md)
- **試作產物**：`docs/archify-demo/`
- 內容 commit：`fab9e85`
- 分支：`codex/post-intake-disposition-trial`
- 日期：2026-07-15

## 前案／主線仍未完成（優先於本案）

| 項目 | 狀態 | 說明 |
|---|---|---|
| **INI-001** 文檔中心收錄管線 | **未完成** | P0 裁決 **ADJ-001～004 未決**；P1–P3 shadow 未開始。overview 主焦點不變。 |
| 329631a 偏好／討論結論 | 已推送 | `preferences`／`decisions` 已落地；與本案無衝突，**不代表 INI-001 已推進**。 |

接手時請先讀 [overview.md](../../docs/management/overview.md) 與 roadmap「開放裁決」，再處理視覺化試作。

## 本案為何做

Review 桶已有 `modules.md` + `edges.md`，需比較模塊視覺化路線。試作 Archify（方案 1+2），並將 **方案 3**（`tools/viz` Phase 0 → React Phase 1）列為草案，供後續 INI-005 承接。**不開新路線 INI。**

## 完成內容（本案）

- 新增草案 spec 並登記 INDEX：`docs/specs/2026-07-15-modular-visualization-trial.md`
- 新增 `docs/archify-demo/`：
  - Archify 五種圖型官方 demo（architecture／workflow／sequence／dataflow／lifecycle）
  - LearnEdge 管線 architecture 圖
  - quant 模塊互動圖：`quant-modules.html`（方案 1 摘要卡 + 方案 2 `enhance-quant-modules.mjs` 錨點詳情／流向）
- 更新 `decisions.md`（三方案試作結論）、`roadmap.md`（INI-005 連結 trial spec）、`knowledge-visualizer-design.md`（Phase 1 標草案 + 試作對照）

## 三方案結論（摘要）

| 方案 | 狀態 | 定位 |
|---|---|---|
| 1+2 Archify 靜態／半互動 | 試作完成 | Review 快查、簡報匯出；**非 canonical** |
| 3a `tools/viz` Phase 0 | 既有；待修 CRLF | 一鍵從 `modules.md` 生成 `views/` |
| 3b React Phase 1（INI-005） | **草案，未實作** | 正式互動儀表板 |

長期走方案 3；Archify 資料應改由 `modules.md` 自動生成，禁止手抄 `quant-modules-data.json`。

## 刻意不做

- **未**推進 INI-001 裁決或 shadow
- **未**實作 INI-005 Phase 1 React
- **未**修 `tools/viz` Windows CRLF 解析
- **未**將試作升格 canonical 或寫入 `Library/`／`DOC/` 真值

## 驗證

- `node <archify-skill>/bin/archify.mjs doctor` 通過（本機 skill 路徑依安裝而定）
- `quant-modules.html` 經 `archify render` + `enhance-quant-modules.mjs` 產生；節點可點選至詳情區
- INDEX 已登記 trial spec；roadmap INI-005 列已更新

## 後續

1. **主線**：裁決 INI-001（ADJ-001～004）
2. 修 `tools/viz/parse-doc-artifacts.mjs` CRLF，對 quant 目錄跑 `generate.mjs`
3. 資源允許時啟動 INI-005 Phase 1 最小切片
4. 若續用 Archify：從 `modules.md` 自動餵料，重跑 render + enhance
