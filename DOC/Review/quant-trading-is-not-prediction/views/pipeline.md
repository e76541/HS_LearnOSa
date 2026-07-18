# 管線總覽 — Quant Trading Is Not Prediction

## 指標

| 指標 | 數值 |
|---|---|
| 來源數 | 1 |
| 模塊 | 9 |
| 技能模塊 | 9 |
| 背景模塊 | 0 |
| 結構邊 | 10 |

## 階段

| 階段 | 狀態 | 產物數 | 備註 |
|---|---|---|---|
| 收錄 | done | 1 | PENDING-quant-trading-is-not-prediction |
| 模塊化 | done | 9 |  |
| 抽邊 | done | 10 |  |
| 技能對齊 | pending | 9 | Inline 試作未接入登記簿 |
| Dynamic View | done | 5 | Inline 投影（本 views/） |

## 管線圖

```mermaid
flowchart LR
  S0["收錄"]
  S1["模塊化"]
  S2["抽邊"]
  S3["技能對齊"]
  S4["Dynamic View"]
  S0 --> S1
  S1 --> S2
  S2 --> S3
  S3 --> S4
  classDef done fill:#e8f5e9,stroke:#2e7d32
  classDef pending fill:#fff8e1,stroke:#f9a825
  class S0 done
  class S1 done
  class S2 done
  class S3 pending
  class S4 done
```
