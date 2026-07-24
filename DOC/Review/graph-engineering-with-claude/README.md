# Graph Engineering with Claude

來源：使用者貼全文（對齊既有截圖試作）<br>
狀態：`DOC/Review` · 已完成入口判定、模塊化與抽邊 · `needs_review`<br>
文本 ID：`PENDING-graph-engineering-with-claude`<br>
規範入口：`Library/CURRENT.md` → `module-layer` / `structure-layer` / `identity-terminology`

## 入口三問

| 問 | 判定 |
|---|---|
| 有原文未主張之主張？ | 無 → 不棄 |
| 主張可獨立成立？ | 是 → 正常來源，走完整管線 |
| 有具體斷邊題要一次用？ | 否 |

結論：正常來源；不是入口淘汰或一次性素材。

## 處理結果

- 原文：[`source.md`](source.md)，19,690 個 Unicode 字元。
- 模塊化：[`modules.md`](modules.md)，共 16 個模塊（M00–M15）；M15 `is_skill_signal=false`。
- 結構：[`edges.md`](edges.md)，共 19 條邊；第一遍 13、第二遍長程 6。
- 純填充：Substack 訂閱呼籲 `retention=discard`，不建模塊。
- 例證束：「Six graphs…」不獨立建模塊，附屬方法宿主。
- 前作：[`docs/experiments/2026-07-21-graph-engineering-ingest-spike.md`](../../docs/experiments/2026-07-21-graph-engineering-ingest-spike.md)（截圖切圖；缺可靠 char_span）。本次以純文字補完正式模塊／邊。
- 對齊、練習、演講：未執行；範圍＝收錄＋模塊＋邊。導航見同包 [`navigation-journey.md`](navigation-journey.md)。

## 人工覆核原因

1. 正式 `text_id` 未裁決（暫用 `PENDING-*`）。
2. 內容含 Claude Code／dynamic workflows 產品細節；可遷移「圖工程方法」與產品 API 名應否分欄待裁。
3. 與截圖試作為同一課程全文；是否註銷／掛接試作資產待裁。
