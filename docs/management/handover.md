# 近期交接

最近工作的精簡摘要。完整版本化快照見 [.agents/handover.md](../../.agents/handover.md)（目前最新：`fab9e85`）。

- 管理總覽：[overview.md](overview.md)
- 推進路線：[roadmap.md](roadmap.md)
- 討論結論：[decisions.md](decisions.md)

## 前案／主線仍未完成（任何交接均須保留）

| 項目 | 狀態 | 說明 |
|---|---|---|
| **INI-001** 文檔中心收錄管線 | **未完成** | P0 裁決 **ADJ-001～004 未決**；P1–P3 shadow 未開始 |
| 329631a 偏好／討論結論 | 已推送 | `preferences`／`decisions` 已落地；**不代表 INI-001 已推進** |

## 最近一次推送 — 主軸：模塊視覺化試作（Archify）

- **規格（草案）**：[2026-07-15-modular-visualization-trial.md](../specs/2026-07-15-modular-visualization-trial.md)
- **路線**：不開新 INI；關聯 INI-005（方案 3 列草案）
- **分支**：`codex/post-intake-disposition-trial`
- **試作產物**：`docs/archify-demo/`（五種 Archify demo + quant 互動模塊圖）

### 完成內容

- Archify 試作與 quant 模塊圖（方案 1 摘要卡 + 方案 2 點選詳情／流向）
- 草案 spec、INDEX 登記、roadmap／decisions 更新
- 方案 3（`tools/viz` → React Phase 1）列為正式路線草案

### 刻意未完成

- INI-001 裁決與 shadow（主線）
- `tools/viz` Windows CRLF 解析修復
- INI-005 Phase 1 React 實作
- Archify 與 `modules.md` 自動串接、試作 canonical 化

### 下一步

1. **主線**：裁決 INI-001（ADJ-001～004）
2. 修 `tools/viz` CRLF，或啟動 INI-005 Phase 1 最小切片
3. 若續用 Archify：改由 `modules.md` 自動生成 JSON

### 版本快照

完整交接正文見 [.agents/handover/fab9e85.md](../../.agents/handover/fab9e85.md)（內容 commit `fab9e85`）。
