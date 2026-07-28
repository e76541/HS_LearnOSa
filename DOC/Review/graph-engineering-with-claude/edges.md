# Edges — Graph Engineering with Claude

> 僅使用 canonical 已生效邊型別。方向依「箭頭指向被支撐者」。未建文本順序邊。對齊截圖試作草模並以純文字證據重核。

## 第一遍：局部候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M00 | motivates | M01 | `[0,1392)` | 導言指出直線佇列與「工作形狀是圖」，構成定義節點／邊的動機。 |
| M02 | elaborates | M01 | `[2445,3241)` | 重畫鏈時對每箭問「下一動是否讀上一輸出」，落實 M01 的真邊判準。 |
| M03 | elaborates | M01 | `[3241,4644)` | 節點的單一有界工作被具體化為輸入／輸出／schema 契約。 |
| M04 | elaborates | M01 | `[4644,5712)` | 邊被具體化為資料形狀契約；真邊＝有資料跨過。 |
| M05 | solves | M02 | `[5712,7388)` | 砍假依賴後浮現的獨立工作，以 parallel fan-out 解決串鏈等待。 |
| M06 | depends_on | M05 | `[7388,8557)` | fan-in／barrier 明示以 fan-out 結果集合為前提。 |
| M07 | depends_on | M05 | `[8557,9321)` | diamond 的並行工作層需要 fan-out。 |
| M07 | depends_on | M06 | `[8557,9321)` | diamond 的 merge／reduce 層需要 fan-in。 |
| M08 | elaborates | M04 | `[9321,10742)` | 條件路由把「走哪條邊」變成程式對資料形狀的確定性決策。 |
| M09 | elaborates | M04 | `[10742,11720)` | verifier 把邊契約具體化為下游放行前的殺戮／存活閘門。 |
| M10 | elaborates | M05 | `[11720,12559)` | 並行 fan-out 的失敗與寫檔碰撞，以 null 過濾與 worktree 隔離處理。 |
| M13 | elaborates | M05 | `[15234,16093)` | pipeline／barrier 對比展開並行拓撲的延遲含義。 |
| M13 | elaborates | M06 | `[15234,16093)` | 「是否等待完整集合」是 barrier 成本的核心判準，呼應 M06。 |

## 第二遍：長程候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M12 | depends_on | M03 | `[14318,15234)` | 只有節點工作契約清楚，才能按判斷負荷分層模型。 |
| M14 | depends_on | M03 | `[16093,17539)` | 動態 workflow 仍需可接線的節點契約（非自由文本）。 |
| M14 | depends_on | M04 | `[16093,17539)` | 動態圖仍需明確邊與資料流。 |
| M14 | depends_on | M08 | `[16093,17539)` | self-routing／條件分支依賴執行期路由機制。 |
| M15 | elaborates | M00 | `[19043,19690)` | 結論重述「線性非天花板／架構師畫圖」，收束導言主張。 |
| M11 | elaborates | M09 | `[12559,14318)` | loop-until-dry 示例在確認前套用多視角 verify，展開 verifier 於探索回圈。 |

## 驗收註記

- 存在性：19 條邊均有原文命題支撐；未建章節順序邊。
- 方向：`elaborates` 從具體方法指向被展開概念；`depends_on` 從依賴者指向前提；`solves` 從解法指向被解問題；`motivates` 從問題框架指向被促成定義。
- 類型：M05→M02 用 `solves`（並行解決假鏈問題），不用 `depends_on`。
- 長程：M12／M14 對 M03／M04／M08 為跨段依賴，證據在後段明示「仍需契約／邊／路由」。
- 寧缺：未抽 M11→M05（回圈內用 parallel 屬用法例示，非穩定依賴命題）；未抽 `foreshadows`。
- Six graphs 例束不建獨立端點，避免一例一節點爆炸。
