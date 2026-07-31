# 我是如何用 Orca 做 Graph Engineering

來源：使用者貼全文（Aiden／@wohsj110，約 2026-07-27）<br>
狀態：`DOC/Review` · 已完成入口判定、模塊化與抽邊 · `needs_review`<br>
文本 ID：`PENDING-orca-graph-engineering-aiden`<br>
規範入口：`Library/CURRENT.md` → `module-layer` / `structure-layer` / `identity-terminology`

## 入口三問

| 問 | 判定 |
|---|---|
| 有原文未主張之主張？ | 無 → 不棄 |
| 主張可獨立成立？ | 是 → 正常來源，走完整管線 |
| 有具體斷邊題要一次用？ | 否 |

結論：正常來源；不是入口淘汰或一次性素材。

## 處理結果

- 原文：[`source.md`](source.md)，8,024 個 Unicode 字元（已去掉鍵盤提示／Premium 等介面雜訊）。
- 模塊化：[`modules.md`](modules.md)，共 16 個模塊（M00–M15）。
- 結構：[`edges.md`](edges.md)，共 21 條邊；第一遍 15、第二遍長程 6。
- 純填充：文末引用清單 `retention=discard`，不建模塊。
- 相關既有 Review：[`graph-engineering-with-claude`](../graph-engineering-with-claude/README.md)（社群 Graph Engineering 教程）；本文為 Orca 實務編排案例，主題相鄰、來源不同。
- 對齊、練習、演講、導航旅程：未執行；範圍＝收錄＋模塊＋邊。

## 人工覆核原因

1. 正式 `text_id` 未裁決（暫用 `PENDING-*`）。
2. 運行數字（570／41／連掛時間戳）與產品細節（Orca／agent-device／wayfinder）未外部查核；應否與可遷移「三件套／閘門」分欄待裁。
3. 與既有 `PENDING-graph-engineering-with-claude` 是否交叉掛邊／合併主題簇待裁。
4. 原文簡繁與術語混用（作者簡體）；是否需正規化副本待裁。
