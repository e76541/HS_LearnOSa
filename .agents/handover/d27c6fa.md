# 交接：演講備課圖譜互動（隨機選取 × 自由移動）— 草案

- 管理總覽：[docs/management/overview.md](../../docs/management/overview.md)
- 路線（關聯）：[roadmap.md](../../docs/management/roadmap.md) **INI-005**；**INI-001 仍未完成**（見下）
- **本案主文件**：[docs/specs/2026-07-15-speaking-module-graph-design.md](../../docs/specs/2026-07-15-speaking-module-graph-design.md)
- 前案試作：[modular-visualization-trial.md](../../docs/specs/2026-07-15-modular-visualization-trial.md)（`fab9e85`）
- 內容 commit：`d27c6fa`
- 分支：`codex/post-intake-disposition-trial`
- 日期：2026-07-15

## 前案／主線仍未完成（優先於本案）

| 項目 | 狀態 | 說明 |
|---|---|---|
| **INI-001** 文檔中心收錄管線 | **未完成** | P0 裁決 **ADJ-001～004 未決**；P1–P3 shadow 未開始 |
| fab9e85 Archify 試作 | 已推送 | `docs/archify-demo/`；**本案未實作程式**，僅列互動草案 |
| 329631a 偏好／討論結論 | 已推送 | 與本案無衝突 |

## 本案為何做

學習管線含演講場次；使用者提出模塊圖需 **(1) 隨機選取模塊 (2) 自由移動模塊**。需對齊 `run-speaking-session` 與練習層 4.2a（合規鏈、P8 禁隨機走圖），並併入 INI-005 路線。**不開新路線 INI、本輪無程式實作。**

## 完成內容（本案）

- 新增草案 spec：`docs/specs/2026-07-15-speaking-module-graph-design.md`
- 雙模式草案：**備課／探索**（隨機選、拖曳）vs **演講**（鎖合規鏈、一頁一模塊）
- INDEX 登記；`decisions.md`、`roadmap.md`（INI-005）、`knowledge-visualizer-design.md` 交叉引用

## 規範要點（接手必讀）

- 正式「講」：**不得**隨機走圖；隨機僅用於備課探索、或問題池依規則抽取
- 拖曳：只改投影座標（session／localStorage），**不回寫** `modules.md`／`edges.md`
- 長期載體：**React Flow（INI-005）**；Archify 試作最多做「隨機跳詳情」小原型

## 刻意不做

- 本輪 **無** HTML／React 實作
- 未推進 INI-001、未修 `tools/viz` CRLF
- 未做合規鏈選擇器與投影片匯出

## 建議後續

1. **主線**：INI-001 裁決（ADJ-001～004）
2. 原型：`quant-modules.html` 加隨機模塊按鈕（可選）
3. INI-005 最小切片：React Flow + 拖曳 + 隨機選 + 流向底欄
4. 演講整合：鎖鏈模式對接 `run-speaking-session`

## 驗證

- INDEX 已登記 speaking-graph spec
- roadmap INI-005 列已連結本案
- 交接正文保留 INI-001 未完成與 fab9e85 前案狀態
