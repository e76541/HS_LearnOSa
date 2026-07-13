# Quant Trading Is Not Prediction

來源：使用者貼文<br>
狀態：`DOC/Review` · 已完成入口判定、模塊化與抽邊 · `needs_review`<br>
文本 ID：`PENDING-quant-trading-is-not-prediction`<br>
規範入口：`Library/CURRENT.md` → `module-layer` / `structure-layer` / `identity-terminology`

## 入口三問

| 問 | 判定 |
|---|---|
| 有原文未主張之主張？ | 無 → 不棄 |
| 主張可獨立成立？ | 是 → 正常來源，走完整管線 |
| 有具體斷邊題要一次用？ | 否 |

結論：正常來源；不是入口淘汰或一次性素材。

## 處理結果

- 原文：[`source.md`](source.md)，6,497 個 Unicode 字元（不計檔尾換行）。
- 模塊化：[`modules.md`](modules.md)，共 9 個技能訊號模塊；無背景模塊與獨立純填充模塊。
- 結構：[`edges.md`](edges.md)，共 10 條邊；第一遍 5 條、第二遍長程 5 條。
- 登記對齊：已對 9 個技能訊號模塊執行 shadow `align`；因登記簿目前沒有 SkillNode，均產生 `reject` 建議，進入 `REVIEW-000001` 至 `REVIEW-000009` 等待具名人工覆核。尚未寫入正式對齊或待建槽。
- 練習、演講：未執行。

## 技能詞語對齊列表

> 登記簿目前為空。下列中文詞與英文正名均為待人工覆核的待建草案，尚不是正式 SkillNode。

| 中文技能詞 | 英文正名草案 | 結果 | 命中／候選詞語 | 覆核狀態 | 理由 | 證據模塊 |
|---|---|---|---|---|---|---|
| 資產特定交易優勢隔離 | `asset_specific_edge_isolation` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000001` | 登記簿目前沒有正式詞語 | M01 |
| 重複交易期望值評估 | `repeated_trade_expected_value_evaluation` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000002` | 登記簿目前沒有正式詞語 | M02 |
| 量化交易部位與重複設計 | `quantitative_edge_sizing_and_repetition` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000003` | 登記簿目前沒有正式詞語 | M03 |
| 微小優勢規模化 | `small_edge_scaling` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000004` | 登記簿目前沒有正式詞語 | M04 |
| 市場雜訊訊號偵測 | `market_noise_signal_detection` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000005` | 登記簿目前沒有正式詞語 | M05 |
| 殘差均值回歸套利 | `residual_mean_reversion_arbitrage` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000006` | 登記簿目前沒有正式詞語 | M06 |
| 量化策略過度擬合診斷 | `quantitative_overfitting_diagnosis` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000007` | 登記簿目前沒有正式詞語 | M07 |
| 量化策略營運紀律 | `quantitative_strategy_operational_discipline` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000008` | 登記簿目前沒有正式詞語 | M08 |
| 量化策略部署檢核 | `quantitative_strategy_deployment_validation` | 未命中 | 無既有詞語 | 待覆核 `REVIEW-000009` | 登記簿目前沒有正式詞語 | M09 |

## 人工覆核原因

目前 canonical 規範未提供主要收錄類型清單與正式文本 ID 序號簿，因此不可可靠裁決 `Stocks`／`Archive` 或正式 ID；此外，Renaissance／Medallion 勝率與績效、早期 statistical learning 等歷史性陳述未附來源，後續作為學習證據前需查證。人工須裁決：

1. 本文的主要文章類型與正式文本 ID；
2. 應轉入 `DOC/Stocks` 或 `DOC/Archive`；
3. M04、M05 所含歷史與績效陳述是否可接受，或需補來源／降權。
