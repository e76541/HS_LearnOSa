# Content Selection

source_id: PENDING-how-to-make-company-ai-native
selection_version: 1
updated_at: 2026-07-14T07:45:00+08:00
status: draft_trial
design_ref: docs/specs/2026-07-14-module-selection-design.md

> 試點裁決：依設計草案手寫，尚未有解析工具、尚未 canonical。
> 不改寫 `source.md`／`modules.md`／`edges.md`。
> `pure_fill` 區間本就不在模塊集合，不進本表。

## Active Decisions

| decision_id | target_type | target_ref | action | scope | reason_code | reason |
|---|---|---|---|---|---|---|
| S001 | module | M05 | exclude | practice | not_for_practice | 兩人 pod 收據是個案證據，不宜當考點；練習應考 M04 的閘門與上線步驟。 |
| S002 | module | M05 | exclude | speaking | not_for_speaking | 演講主鏈走梯子與方法模塊；個案數字可口述引用，但不列為必講模塊。 |
| S003 | module | M08 | defer | views | deferred_review | 試點：暫不投影全梯 stop/go，觀察斷鏈揭露是否足夠；證據與邊保留。 |

## Revoked Decisions

| decision_id | target_ref | previous_action | revoked_at | reason |
|---|---|---|---|---|

## Impact Preview（手算，寫入時）

### 與既有被動忽略的區分

| 類型 | 對象 | 機制 | 本表？ |
|---|---|---|---|
| pure_fill | `[0,609)`、`[10506,11848)` | modules 非技能訊號表 | 否 |
| background | 無 | 本篇九模塊皆 `is_skill_signal: true` | — |
| 使用者排除 | M05 | S001／S002 | 是 |
| 使用者暫緩 | M08 | S003 | 是 |

### 各 scope 可消費模塊（草案語義）

| scope | 阻擋 | 可消費 |
|---|---|---|
| `alignment` | （無） | M00–M08 |
| `views` | M08（defer） | M00–M07 |
| `practice` | M05 | M00–M04、M06–M08 |
| `speaking` | M05 | M00–M04、M06–M08 |
| `all_downstream` | （無此裁決） | M00–M08 |

### 斷鏈揭露（端點含被擋模塊；只揭露，不刪 `edges.md`）

**views × M08 deferred 時受影響邊：**

| source | type | target |
|---|---|---|
| M08 | elaborates | M01 |
| M08 | depends_on | M02 |
| M03 | depends_on | M08 |
| M04 | depends_on | M08 |
| M06 | depends_on | M08 |
| M07 | depends_on | M08 |

→ 投影若濾掉 M08，梯子各階與 stop/go 的依賴邊會斷；M01 仍在，但少了總規則節點。

**practice／speaking × M05 excluded 時受影響邊：**

| source | type | target |
|---|---|---|
| M05 | exemplifies | M04 |

→ M04 方法鏈仍完整；只少個案 exemplifies 邊。
