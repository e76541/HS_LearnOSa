# 論證分層 — How to Make a Company AI-Native

```mermaid
flowchart TB
  subgraph core["核心主張"]
    direction LR
    M00["AI 計畫失敗的共同缺口｜M00"]
    M01["五階 AI 成熟度梯｜M01"]
    M08["每階都以差額決定是否繼續｜M08"]
  end
  subgraph method["方法與機制"]
    direction LR
    M02["先建立基線｜M02"]
    M03["先使人員 AI-native｜M03"]
    M04["以確定性閘門自動化交付｜M04"]
    M06["把 AI 放入產品並計量成本｜M06"]
    M07["建立 AI control plane｜M07"]
  end
  subgraph evidence["例證與證據"]
    direction LR
    M05["兩人 pod 的交付收據｜M05"]
  end
  M00 -->|motivates| M01
  M02 -->|elaborates| M01
  M03 -->|elaborates| M01
  M03 -->|depends_on| M02
  M04 -->|elaborates| M01
  M04 -->|depends_on| M03
  M05 -->|exemplifies| M04
  M06 -->|elaborates| M01
  M06 -->|depends_on| M04
  M07 -->|elaborates| M01
  M08 -->|elaborates| M01
  M02 -->|solves| M00
  M04 -->|solves| M00
  M07 -->|solves| M00
  M08 -->|depends_on| M02
  M03 -->|depends_on| M08
  M04 -->|depends_on| M08
  M06 -->|depends_on| M08
  M07 -->|depends_on| M08
  classDef background stroke:#f9a825,stroke-width:2px,stroke-dasharray:5 5,fill:#fffde7
```

## 分層對照

| 模塊 | 標題 | semantic_roles | 分層 |
|---|---|---|---|
| M00 | AI 計畫失敗的共同缺口 | claim, evidence, motivation | 核心主張 |
| M01 | 五階 AI 成熟度梯 | concept, framework | 核心主張 |
| M02 | 先建立基線 | procedure, measurement | 方法與機制 |
| M03 | 先使人員 AI-native | procedure, governance | 方法與機制 |
| M04 | 以確定性閘門自動化交付 | procedure, governance, risk_control | 方法與機制 |
| M05 | 兩人 pod 的交付收據 | case, evidence | 例證與證據 |
| M06 | 把 AI 放入產品並計量成本 | procedure, productization, cost_control | 方法與機制 |
| M07 | 建立 AI control plane | procedure, governance, compliance | 方法與機制 |
| M08 | 每階都以差額決定是否繼續 | decision_rule, measurement | 核心主張 |
