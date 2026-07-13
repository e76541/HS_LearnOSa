# Loop and Harness Engineering

來源：使用者貼文<br>
狀態：`DOC/Review` · 已完成入口判定、模塊化與抽邊 · `needs_review`<br>
文本 ID：`PENDING-loop-and-harness-engineering`<br>
規範入口：`Library/CURRENT.md` → `module-layer` / `identity-terminology`

## 入口三問

| 問 | 判定 |
|---|---|
| 有原文未主張之主張？ | 無 → 不棄 |
| 主張可獨立成立？ | 是 → 正常來源，走完整管線 |
| 有具體斷邊題要一次用？ | 否 |

結論：正常來源；不是入口淘汰或一次性素材。

## 處理結果

- 原文：[`source.md`](source.md)，17,006 個 Unicode 字元。
- 模塊化：[`modules.md`](modules.md)，共 16 個模塊；其中 M00 為背景模塊，其餘 15 個為技能訊號模塊。
- 結構：[`edges.md`](edges.md)，共 14 條邊；第一遍 11 條、第二遍長程 3 條。
- 純填充：未另建節點；文末「open the matching repo ... clone it」保留在 M15 的證據區間，但不提升為獨立命題。
- 對齊、練習、演講：未執行；本次範圍止於正常來源完成模塊化、抽邊與 DOC 分流。

## 人工覆核原因

canonical 規範已使用 `SRC-002（迴圈工程）`，但其中描述 M14「作者三年軌跡」與 M08「連接器排序」；本附件沒有這兩項內容。為避免把不同文本錯併為同一來源，本包使用暫時鍵並進入 Review。人工須裁決：

1. 本文是否就是 canonical 所稱 `SRC-002` 的不同版本；
2. 若是，應保留版本關係還是取代既有描述；
3. 若否，應依正式序號簿另配新 ID。
