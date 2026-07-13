# 流向面板 — AI 計畫失敗的共同缺口 (M00)

## 目前模塊

| 欄位 | 值 |
|---|---|
| module_id | M00 |
| 標題 | AI 計畫失敗的共同缺口 |
| char_span | `[609, 1306]` |
| module_type | AnalysisModule |
| semantic_roles | claim, evidence, motivation |
| 摘要 | AI 計畫大量終止，常見結構性原因是缺少 baseline、gates、governance 與 owner。 |

## 上游輸入

| 來源 | 標題 | 邊類型 | 證據 span |
|---|---|---|---|
| M02 | 先建立基線 | solves | `[3857,5321)` |
| M04 | 以確定性閘門自動化交付 | solves | `[6257,7991)` |
| M07 | 建立 AI control plane | solves | `[9183,10115)` |

## 下游流向

| 目標 | 標題 | 邊類型 | 證據 span |
|---|---|---|---|
| M01 | 五階 AI 成熟度梯 | motivates | `[1196,1305)` |

## 關聯邊帳本

| ID | 來源 | 類型 | 目標 | 證據 span | 摘要 |
|---|---|---|---|---|---|
| E11 | M02 | solves | M00 | `[3857,5321)` | baseline 與 telemetry 直接補上 M00 所列的「no baseline」。 |
| E12 | M04 | solves | M00 | `[6257,7991)` | deterministic gates、shadow 與 human exception path 直接補上「no gates」。 |
| E13 | M07 | solves | M00 | `[9183,10115)` | gateway、evals、RBAC 與 immutable logs 直接補上「no governance」。 |
| E00 | M00 | motivates | M01 | `[1196,1305)` | 作者把缺 baseline、gates、governance、owner 指為方法存在的原因。 |

