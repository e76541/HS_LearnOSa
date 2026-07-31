# Edges — 我是如何用 Orca 做 Graph Engineering

> 僅使用 canonical 已生效邊型別。方向依「箭頭指向被支撐者」。未建文本順序邊。

## 第一遍：局部候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M00 | exemplifies | M02 | `[1031,1311)` | 開頭案例被明示為「三者結合」：圖拆活、真機攔假前提、orchestrator 補節點重連。 |
| M01 | motivates | M02 | `[752,1031)` | 地圖／疆域與 unknown unknowns 構成「為何不能只靠事前圖」的動機，通向三件套。 |
| M03 | elaborates | M02 | `[1311,1643)` | 四條共識展開 triad 中的 graph 維：先讓圖跑得遠；並聲明問題在這之後。 |
| M04 | elaborates | M02 | `[1643,2102)` | 「圖是長出來的」展開 graph 維在新需求上的含義，對比可編譯 SOP。 |
| M05 | exemplifies | M04 | `[2102,2681)` | 41 任務／33 創建時間點／非水平線，例示圖在運行中增長。 |
| M06 | elaborates | M04 | `[2681,3195)` | wayfinder＋依回執 task-create 把「長出來」落成可操作編排。 |
| M07 | elaborates | M02 | `[3195,3773)` | 假成功定義展開 triad 的 eval 維：graph 不驗前提；模型互評≠接觸現實。 |
| M08 | solves | M07 | `[3773,4189)` | 前提驗成事實＋三類證據＋不派發，直接對治假成功。 |
| M09 | exemplifies | M08 | `[4189,4457)` | 真機連掛三次催生計劃外修正，例示擋下游與機器證據。 |
| M10 | elaborates | M08 | `[4457,4749)` | 把可單獨驗步驟拆獨立節點，補齊「漏做無痕」這一假成功變體。 |
| M11 | elaborates | M02 | `[4749,5435)` | 改圖權缺口與「閉環無法質疑目標」展開 triad 第三維。 |
| M12 | elaborates | M11 | `[5435,5918)` | gate／裁決／三層上浮把「權在誰」落成操作政策。 |
| M13 | depends_on | M08 | `[5918,6612)` | 診斷－修－再驗與熔斷明確使用同一套機器證據閘門。 |
| M13 | depends_on | M12 | `[5918,6612)` | 三輪後上報 orchestrator 裁定，依賴放行權不在 worker。 |
| M14 | elaborates | M13 | `[6612,7191)` | 「何時改圖」把失敗策略細化成可觸發條件與裁定分工。 |

## 第二遍：長程候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M00 | exemplifies | M08 | `[3773,4189)` | 013 被回溯為「前提驗成事實」的補點，與開場案例同構。 |
| M01 | motivates | M06 | `[2681,3195)` | wayfinder 明示要提前摸地圖與疆域之差。 |
| M09 | exemplifies | M13 | `[5918,6612)` | 連掛三次若只重跑會掛第四次；失敗換回「缺了什麼」。 |
| M14 | depends_on | M02 | `[6612,7191)` | 結語式綜合重申 graph／eval／權三者結合；eval 位置靠前。 |
| M15 | elaborates | M02 | `[7191,7827)` | 結語重述跑得遠≠跑得對，並把 eval 拆成錨點／約束／阻塞範圍。 |
| M15 | contrasts | M07 | `[7191,7827)` | 明確「agent-device 本身不是 eval」，對比把接觸環境誤當評測。 |

## 驗收註記

- 存在性：21 條邊均有原文命題支撐；未建章節順序邊；引用清單未作端點。
- 方向：`exemplifies` 從案例指向被例示主張；`elaborates` 從展開段指向被展開論旨／機制；`solves` 從方法指向問題；`depends_on` 從依賴者指向前提；`motivates` 從落差框架指向被促成做法；`contrasts` 互為對照（工具≠eval）。
- 寧缺：未抽 M05→M02（統計直接支撐 M04 增長命題，對 triad 僅間接）；未抽 `foreshadows`；未把 Orca 產品推薦建成獨立方法邊。
- 長程：M00↔M08、M01→M06、M09→M13、M15→M02／M07 跨段，證據在後段明示回溯或對照。
