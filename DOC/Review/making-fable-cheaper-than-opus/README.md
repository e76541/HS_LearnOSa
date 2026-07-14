# Making Fable Cheaper Than Opus

來源：https://x.com/joon_h_lee/status/2076714221837173097<br>
鏡像：https://cognition.ai/blog/making-fable-cheaper-than-opus<br>
作者：Joon Lee（Cognition）<br>
狀態：`DOC/Review` · 已完成入口判定、模塊化與抽邊 · `needs_review`<br>
文本 ID：`PENDING-making-fable-cheaper-than-opus`<br>
規範入口：`Library/CURRENT.md` → `module-layer` / `identity-terminology`

## 入口三問（`module-layer` §2.5）

| 問 | 判定 |
|---|---|
| 有原文未主張之主張？ | 無 → 不棄 |
| 主張可獨立成立？ | 是 → **正常來源**，走完整管線 |
| 有具體斷邊題要一次用？ | 否 |

結論：正常來源。非入口淘汰、非一次性素材。

## 已完成粗切

| 序 | 命題簇 | 型別 | 技能訊號 |
|---|---|---|---|
| M00 | 單位價不是代理成本正確指標；同 SK 下 Fable 更便宜更高分 | Analysis | 是 |
| M01 | Fusion lead／sidekick 交接架構 | Method | 是 |
| M02 | 全量 call 日誌 + 40 題對照歸因 | Method | 是 |
| M03 | Lead 少做事主導帳單 | Analysis | 是 |
| M04 | 早委派正確工作，非委派次數 | Teaching | 是 |
| M05 | 約束式 brief，非口述實作 | Method | 是 |
| M06 | 審查後再交便宜 handoff | Method | 是 |
| M07 | 無可委派時無槓桿；delegation ≠ routing | Method | 是 |
| M08 | 前沿價買判斷 | Analysis | 是 |
| FILL | 標題行 `[0,34)` | — | 否 |

## 本篇執行結果

- 原文：[`source.md`](source.md)，9595 個 Unicode 字元。
- 模塊：[`modules.md`](modules.md)，9 個技能模塊。
- 結構：[`edges.md`](edges.md)，13 條邊。
- 對齊／練習／演講：未跑。
- 模塊篩選：未建 `selection.md`（等你指定要排除的下游）。

## 人工覆核原因

1. 正式文本 ID 未裁決（暫用 `PENDING-*`）。
2. 主要文章類型偏分析＋方法混合；是否進 Stocks 主要收錄待裁。
3. 實驗數字與 FrontierCode 設定未附可復現原始數據連結；品質覆核保留。
