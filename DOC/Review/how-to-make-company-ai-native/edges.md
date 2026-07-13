# Edges — How to Make a Company AI-Native

> 僅使用 `depends_on`、`exemplifies`、`elaborates`、`motivates`、`solves`。方向依 canonical 規範：箭頭指向被支撐者。<br>
> 證據區間沿用 `modules.md` 的 LF 正規化、零起算半開區間約定。

## 第一遍：局部候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M00 | motivates | M01 | `[1196,1305)` | 作者把缺 baseline、gates、governance、owner 指為方法存在的原因。 |
| M02 | elaborates | M01 | `[3857,5321)` | 「Climb to 00」把 Adopt 階段具體化為先建立 telemetry baseline。 |
| M03 | elaborates | M01 | `[5321,6257)` | 「00 to 01」把 Accelerate 階段具體化為標準工具鏈與 senior gate。 |
| M03 | depends_on | M02 | `[5290,5320)` | 前段明示其他工作都依賴 baseline；後段的 exit test 也需要 telemetry。 |
| M04 | elaborates | M01 | `[6257,7991)` | 「01 to 02」把 Automate 階段具體化為 sandbox agent、deterministic gates 與 staged rollout。 |
| M04 | depends_on | M03 | `[5553,5614)` | 文中明示無法在多套私有工作流上建立 agentic systems。 |
| M05 | exemplifies | M04 | `[7991,8360)` | 兩人 pod、122 個 merged PR 與 senior review 是前述 agent pipeline 的具體個案。 |
| M06 | elaborates | M01 | `[8360,9001)` | 「02 to 03」把 Scale 階段具體化為客戶付費功能與 model cost meter。 |
| M06 | depends_on | M04 | `[8418,8487)` | 文中以「Once delivery is agentic」明示產品化承接 agentic delivery。 |
| M07 | elaborates | M01 | `[9001,10115)` | 「03 to 04」把 AI-Native 階段具體化為 gateway、evals、RBAC、audit logs 與 impact mapping。 |
| M08 | elaborates | M01 | `[10115,10506)` | 全梯總規則以每階 delta 決定繼續或停止。 |

## 第二遍：長程候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M02 | solves | M00 | `[3857,5321)` | baseline 與 telemetry 直接補上 M00 所列的「no baseline」。 |
| M04 | solves | M00 | `[6257,7991)` | deterministic gates、shadow 與 human exception path 直接補上「no gates」。 |
| M07 | solves | M00 | `[9183,10115)` | gateway、evals、RBAC 與 immutable logs 直接補上「no governance」。 |
| M08 | depends_on | M02 | `[10155,10216)` | 總規則要求每階回到 baseline 讀 delta，因此 stop/go 判定依賴 M02 建立的量測基礎。 |
| M03 | depends_on | M08 | `[10155,10506)` | Accelerate 階的 adoption、velocity、quality exit test 受全梯 stop/go 規則約束。 |
| M04 | depends_on | M08 | `[10155,10506)` | Automate 階需以 error、manual hours 與 unit cost 的差額決定是否續行。 |
| M06 | depends_on | M08 | `[10155,10506)` | Scale 階需以產品價值與成本差額決定是否續行。 |
| M07 | depends_on | M08 | `[10155,10506)` | AI-Native 控制面仍須由 business outcomes 而非 activity 支持。 |

## 驗收註記

- 存在性：以上每條均有原文命題支撐；未建立純文本順序邊。
- 類型：各 climb 對梯子使用 `elaborates`，不用 `exemplifies`；只有具體 pod 收據使用 `exemplifies`。
- 方向：逐邊依「子指向被支撐者」檢查；其中 M08 的差額判定依賴 M02 建立的 baseline。
- 長程召回風險：M00 將四種缺口聚為一模塊，可能隱藏 owner 對應的長程關係；本文沒有獨立 owner 方法模塊，不強建邊。
- 伏筆穩定性：未抽取 `foreshadows`；原文以章節明示回收，沒有必要用不穩定的敘事伏筆邊。
