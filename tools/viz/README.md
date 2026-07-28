# Inline 模塊視圖生成

由 `modules.md` + `edges.md` 產生 Mermaid / Markdown 唯讀投影。

## 用法

**方式 A**（任意目錄，用腳本絕對路徑）：

```bash
node ~/path/to/HS_LearnEdge/tools/viz/generate.mjs DOC/Review/how-to-make-company-ai-native
```

**方式 B**（先進 repo）：

```bash
cd ~/path/to/HS_LearnEdge
node tools/viz/generate.mjs DOC/Review/how-to-make-company-ai-native
```

`<doc-dir>` 相對路徑一律相對 **repo 根目錄**，不是當前 shell 目錄。

若本機尚無 `tools/viz/`，請先拉取分支 `cursor/inline-diagram-viz-plan-2c21` 或合併 PR #1。

產出寫入 `<doc-dir>/views/`：

| 檔案 | 說明 |
|---|---|
| `index.md` | 視圖索引 |
| `pipeline.md` | 管線總覽 |
| `full-graph.md` | 全圖 |
| `argument-layers.md` | 論證分層 |
| `focus-<id>.md` | 預設焦點鄰域 |
| `flow-panel-<id>.md` | 流向面板 |
| `_warnings.md` | 解析警示 |
| `_data.json` | 中間 JSON（Phase 1 草案） |

## 規則

- 只載入 canonical 模塊層邊；排除 `broader_than`
- 箭頭：來源模塊 → 被支撐模塊
- 不回寫 `modules.md` / `edges.md`

規劃：`docs/specs/2026-07-13-inline-diagram-module-viz-plan.md`

## HTML 管理中心

統一索引 `docs/` 內的 HTML 輸出；預設略過 `docs/archive/`，且不修改既有 HTML。

即時模式（推薦）：

```bash
python3 tools/viz/html-hub.py serve
```

開啟 `http://127.0.0.1:8765/docs/html-hub.html`。頁面每 2 秒同步一次，新 HTML
寫入 `docs/` 後會自動出現在清單。

純靜態模式：

```bash
python3 tools/viz/html-hub.py build
```

完成後可直接開啟 `docs/html-hub.html`；再次新增 HTML 時需重跑 `build` 更新內嵌索引。

驗證：

```bash
python3 tools/viz/test-html-hub.py
```
