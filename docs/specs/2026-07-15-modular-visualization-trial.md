# 模塊視覺化路線試作（Archify × tools/viz）

- 短代號：D10

日期：2026-07-15
狀態：已封存
裁決來源：使用者 2026-08-07 REBUILD1：舊框架硬套無效，批次封存
實作參照：`docs/archive/html-2026-07-23/archify-demo/`（試作已封存）；`tools/viz/`（Phase 0，既有）
後繼：../rebuild/REBUILD1-framework.md（現行框）；歷史參照

## 問題

Review 桶已有 `modules.md` + `edges.md`，需要可讀的模塊關係視圖。候選路線有三條，需記錄試作結論與後續交接站位，且**不得**因本試作而掩蓋主線 INI-001 仍未完成。

## 三條路線（試作結論）

| 方案 | 做法 | 試作狀態 | 復現成本 | Token／維護 |
|---|---|---|---|---|
| 1 | Archify 靜態圖 + 摘要 cards | 已完成（quant 範例） | 中：手寫 JSON + layout 調整 | 每篇 Agent 中高；`data.json` 易與 `modules.md` 漂移 |
| 2 | 方案 1 + `enhance-quant-modules.mjs` 錨點詳情 | 已完成 | 中高：render 後再跑 enhance | 同上 + 後處理腳本 |
| **3** | **`tools/viz` Phase 0 → React Phase 1（INI-005）** | **列為草案；未啟動 Phase 1** | Phase 0：一條指令；Phase 1：一次性工程 | Phase 0 近零 token；Phase 1 建好後每篇低 |

### 方案 3 細分（草案）

- **3a Phase 0（既有）**：`node tools/viz/generate.mjs <doc-dir>` → `<doc-dir>/views/`（Mermaid、流向面板、焦點鄰域）。資料源為正式 `modules.md` / `edges.md`，不回寫真值。
- **3b Phase 1（草案）**：React + React Flow 儀表板，規格見 [knowledge-visualizer-design.md](./2026-07-13-knowledge-visualizer-design.md)。**尚未實作**；待 INI-005 資源就緒後啟動。

## 試作產物（方案 1+2，非 canonical）

路徑：`docs/archive/html-2026-07-23/archify-demo/`（2026-07-23 封存）

| 檔案 | 說明 |
|---|---|
| `quant-modules.architecture.json` | Archify 輸入（手排布局） |
| `quant-modules-data.json` | 詳情／流向資料（**試作副本**，非真值） |
| `enhance-quant-modules.mjs` | 點擊節點 → 錨點詳情後處理 |
| `quant-modules.html` | 可互動試作頁（節點點選、流向面板、詳情區） |
| 其餘 `*.html` | Archify 五種圖型官方 demo |

資料來源試作：`DOC/Review/quant-trading-is-not-prediction/`（9 模塊、10 邊）。

## 已知阻塞（Phase 0）

`tools/viz/parse-doc-artifacts.mjs` 在 Windows CRLF 下未能匹配 `## Source record`（regex 與 `\s*` 吞掉換行）。**修復前** Phase 0 一鍵生成在部分環境失敗；不影響本試作 HTML，但影響方案 3a 復現。

## 決策（草案，待後續交接升格或關閉）

1. **方案 1+2 定位為 Review 快查／簡報匯出試作**，不取代 `tools/viz` 與 INI-005。
2. **方案 3（3a+3b）列為正式路線草案**：長期以 `modules.md` 為源；Phase 0 服務 inline／交接；Phase 1 服務完整互動。
3. **若續用 Archify**：應由 `modules.md` 自動生成 JSON，禁止手抄 `*-data.json`。
4. **主線優先序不變**：INI-001（ADJ-001～004）仍為 P0；本試作不得寫成「視覺化已完成」。

## 後續交接應帶上的未完成項

推送版本化交接時，正文須**同時**列出：

| 項目 | 狀態 | 說明 |
|---|---|---|
| INI-001 文檔中心收錄管線 | **未完成** | P0 裁決 ADJ-001～004 未決 |
| INI-005 Phase 1 React | **草案** | 本文件方案 3b；規格已有、實作未開 |
| Archify 試作（本 spec） | **試作未收斂** | demo 已封存 `docs/archive/html-2026-07-23/archify-demo/`；未接 `tools/viz`、未 canonical |
| `tools/viz` CRLF 解析 | **待修** | 阻礙方案 3a 一鍵復現 |

## 驗收（本試作範圍）

- [x] Archify skill `doctor` / `demo` / 五種圖型渲染
- [x] quant 模塊圖 + cards 摘要 + 點選詳情（方案 2）
- [ ] `tools/viz generate` 於 quant 目錄通過（待 CRLF 修復）
- [ ] Phase 1 React 最小切片（屬 INI-005，不在本試作範圍）
