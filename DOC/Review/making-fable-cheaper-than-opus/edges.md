# Edges — Making Fable Cheaper Than Opus

> 僅使用 `depends_on`、`exemplifies`、`elaborates`、`motivates`、`solves`、`contrasts`。方向：箭頭指向被支撐者。<br>
> 證據區間沿用 `modules.md` 的 LF 正規化、零起算半開區間約定。

## 第一遍：局部候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M00 | depends_on | M01 | `[483,679)` | 成本比較建立在 Fusion lead／sidekick 架構上。 |
| M03 | depends_on | M02 | `[2538,3066)` | 成本拆分來自全量 call 解析與對照軌跡。 |
| M03 | elaborates | M00 | `[3412,4029)` | lead／sidekick 花費與「從不改碼」比例解釋為何單位價溢價不是正確指標。 |
| M04 | elaborates | M00 | `[4093,4565)` | 同樣約 3 次 handoff，差異在何時與委派什麼，對應管理風格主張。 |
| M05 | elaborates | M04 | `[5751,5910)` | brief 寫法（設計文件 vs 口述實作）是管理風格的具體機制。 |
| M06 | elaborates | M04 | `[7152,7450)` | 交接後的審查／再委派是管理風格的另一半。 |
| M06 | depends_on | M01 | `[7152,7320)` | 審查假設存在 sidekick 回傳的工作與 diff。 |
| M07 | contrasts | M05 | `[8129,8450)` | 無可委派成分時，約束 brief 策略對成本無槓桿。 |
| M08 | elaborates | M00 | `[8981,9401)` | 收束：有效委派可讓更貴 lead 更便宜，並指向判斷定價。 |

## 第二遍：長程候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M05 | solves | M00 | `[6321,6914)` | 約束式委派同時移動成本並提高品質（hashing 25 vs 94），支撐「單位價不是正確指標」。 |
| M04 | motivates | M05 | `[5413,5751)` | 強迫多委派無效；需要的是判斷——寫 brief 的方式成為下游方法。 |
| M07 | elaborates | M08 | `[8574,8981)` | 「何時不寫 brief」與 routing／delegation 分層，支撐「前沿價買判斷」。 |
| M03 | motivates | M06 | `[3765,4029)` | lead 靠避免親自動手省 token，動機於審查後再交便宜 handoff 而非 lead 價重寫。 |

## 驗收註記

- 存在性：各邊均有原文命題支撐；未建純文本順序邊。
- 類型：M05 對 M00 用 `solves`（約束委派直接回應錯誤成本指標問題）；軌跡對照用 `elaborates`／`contrasts`，不用無證據的 `exemplifies` 邊（hashing 留在 M05 模塊內）。
- 方向：子指向被支撐者；M00→M01、M03→M02 為依賴架構與計量。
- 長程召回風險：圖表／Replay UI 未進正文，可能遺漏視覺對照中的額外機制邊。
- 伏筆：未抽取 `foreshadows`。
