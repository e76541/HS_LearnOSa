# Modules — How to Make a Company AI-Native

> `char_span` 作業約定：對 `source.md` 先將 CRLF 正規化為 LF，再以 Unicode 字元零起算、半開區間 `[start,end)` 計算。此約定僅供本篇復算，不升格為 canonical 規格。

## Source record

```yaml
source_id: PENDING-how-to-make-company-ai-native
title: How to Make a Company AI-Native
source_kind: user_pasted_article
schema_version: v0.3-r1
extractor: codex-gpt-5
source_char_length: 11848
```

## M00 — AI 計畫失敗的共同缺口

```yaml
module_id: M00
source_id: PENDING-how-to-make-company-ai-native
char_span: [609, 1306]
article_type: analysis
semantic_roles: [claim, evidence, motivation]
domain: ai_transformation
operations: [failure_analysis]
problem_type: ai_initiative_failure
input_type: initiative_failure_evidence
output_type: failure_condition_model
cognitive_level: analyze
is_skill_signal: true
confidence: 0.82
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: AI 計畫大量終止，常見結構性原因是缺少 baseline、gates、governance 與 owner。
evidence:
  - 文中列舉三組業界失敗率與取消率資料。
  - 作者明示四項共同缺口。
assumptions:
  - 引用數據可代表文中鎖定的 30–200 人受監管公司。
counterarguments:
  - 文中承認 MIT 95% 數據的方法論有爭議，但未逐一驗證三組資料的可比性。
```

## M01 — 五階 AI 成熟度梯

```yaml
module_id: M01
source_id: PENDING-how-to-make-company-ai-native
char_span: [1306, 3857]
article_type: teaching
semantic_roles: [concept, framework]
domain: ai_transformation
operations: [maturity_assessment]
problem_type: transformation_stage_identification
input_type: organization_delivery_evidence
output_type: ai_maturity_rung
cognitive_level: understand
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: 以可觀察的 Git／交付證據，把組織分成 Adopt、Accelerate、Automate、Scale、AI-Native 五階；每階只在商業差額支持時繼續攀升。
examples:
  - 無法說出 AI adoption rate 的組織位於 Adopt。
  - ticket 可經管線變成 reviewed pull request 的組織位於 Automate。
hooks: []
limitation: 這是作者面向受監管中型公司的實務模型，未提供跨產業效度驗證。
```

## M02 — 先建立基線

```yaml
module_id: M02
source_id: PENDING-how-to-make-company-ai-native
char_span: [3857, 5321]
article_type: method
semantic_roles: [procedure, measurement]
domain: ai_transformation
operations: [baseline_measurement, telemetry_design]
problem_type: unmeasured_ai_adoption
input_type: engineering_delivery_metadata
output_type: ai_adoption_baseline
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 在改變工程系統前量測 velocity、quality、AI adoption 與 cost per developer。
  - 只量測系統，不用資料對人員排名。
  - 將 adoption 定義為通過 review 並進入 main 的 AI-attributable work，而非已購買席位。
  - 使用 metadata-only、read-only、部署於自有雲的 telemetry，建立可供前後比較的 before。
constraints:
  - 不得把 telemetry 變成人員監控或 stack ranking。
  - adoption 必須以存活至 main 的成果計算。
  - telemetry 必須 metadata-only、read-only，並在自有雲執行。
preconditions:
  - 可讀取工程交付 metadata。
failure_modes:
  - 以自我感受或授權席位代替交付 telemetry。
  - 對個人排名造成規避與資料失真。
```

## M03 — 先使人員 AI-native

```yaml
module_id: M03
source_id: PENDING-how-to-make-company-ai-native
char_span: [5321, 6257]
article_type: method
semantic_roles: [procedure, governance]
domain: ai_assisted_software_delivery
operations: [toolchain_standardization, human_review]
problem_type: fragmented_private_ai_workflows
input_type: developer_ai_workflows
output_type: governed_ai_assisted_delivery
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 統一工具鏈與 prompt patterns。
  - 加入 guardrails 與真實 codebase context。
  - 由 senior engineers gate 每一個 AI-assisted pull request。
  - 以 adoption、velocity 與 quality 作 exit test；品質下降時先收緊 gates。
constraints:
  - 受監管程式碼的 AI-assisted pull request 必須由資深工程師把關。
  - 品質不得因採用率與速度提升而下降。
preconditions:
  - 已有可見的 adoption telemetry。
failure_modes:
  - 每位工程師維持私有工作流，導致無法治理或建立共同 agentic system。
  - 只追求使用率，未以品質作升階閘門。
```

## M04 — 以確定性閘門自動化交付

```yaml
module_id: M04
source_id: PENDING-how-to-make-company-ai-native
char_span: [6257, 7991]
article_type: method
semantic_roles: [procedure, governance, risk_control]
domain: agentic_software_delivery
operations: [workflow_selection, agent_pipeline_design, staged_rollout]
problem_type: unsafe_agentic_delivery
input_type: repetitive_daily_workflow
output_type: reviewed_pull_request
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 選一個每日發生、模式明確、跨多系統且成本可量化的工作流。
  - 讓 sandbox 內的 agent 將 ticket 轉成 plan、code、passing tests 與 pull request。
  - 用 tests、schema checks 與 policy checks 作 deterministic gates。
  - agent 只提出變更；pipeline 與人員控制 Git 與處置結果。
  - 依 sandbox、shadow、supervised production 順序上線，記錄輸出、人工修正與 context。
  - 所有 exception path 保留 human handoff，並把資深審查注意力留給判斷。
constraints:
  - agent 不得直接操作 Git。
  - 每一步必須通過可執行的確定性檢查。
  - 例外路徑必須有人類接手。
preconditions:
  - 人員已使用標準化工具鏈與 senior review gate。
  - 可選出成本可量化的高頻工作流。
failure_modes:
  - 以「看起來正確」代替 tests、schema 或 policy checks。
  - 未 shadow 即進 production。
  - 審查成為瓶頸後出現疲勞 rubber-stamping。
```

## M05 — 兩人 pod 的交付收據

```yaml
module_id: M05
source_id: PENDING-how-to-make-company-ai-native
char_span: [7991, 8360]
article_type: case
semantic_roles: [case, evidence]
domain: agentic_software_delivery
operations: [delivery_pipeline_execution]
problem_type: agentic_delivery_value_evidence
input_type: two_person_delivery_pod
output_type: reviewed_merged_pull_requests
cognitive_level: analyze
is_skill_signal: true
confidence: 0.91
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: CaseModule
context: 兩人 pod，以約每位開發者每月 200 美元的 AI 成本運作三個月。
actions:
  - 以 agent pipeline 產生約 90% 的程式碼。
  - 每個 PR 仍通過客戶自己的 senior review。
outcome: 三個月合併 122 個 pull requests，且文中宣稱品質維持穩定。
transferability: PR 數不可單獨當價值指標；需連同 review gate 與品質結果解讀。
```

## M06 — 把 AI 放入產品並計量成本

```yaml
module_id: M06
source_id: PENDING-how-to-make-company-ai-native
char_span: [8360, 9001]
article_type: method
semantic_roles: [procedure, productization, cost_control]
domain: ai_product_development
operations: [ai_feature_productization, model_cost_metering]
problem_type: unscaled_ai_product_value
input_type: governed_agentic_delivery_capability
output_type: metered_customer_ai_feature
cognitive_level: apply
is_skill_signal: true
confidence: 0.94
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 把同一套交付紀律用於客戶付費的 retrieval、classification、document automation 或 agentic features。
  - 為每條 product track 加入 model gateway 與 cost caps。
constraints:
  - 每項產品 AI 功能都必須有成本計量與上限。
preconditions:
  - 交付已具備受治理的 agentic capability。
failure_modes:
  - AI 功能上線後沒有 meter，成本在後續帳單週期失控。
```

## M07 — 建立 AI control plane

```yaml
module_id: M07
source_id: PENDING-how-to-make-company-ai-native
char_span: [9001, 10115]
article_type: method
semantic_roles: [procedure, governance, compliance]
domain: ai_governance
operations: [gateway_control, evaluation, access_control, audit_logging, impact_mapping]
problem_type: unauditable_ai_operations
input_type: organization_wide_ai_calls
output_type: governed_ai_control_plane
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 以單一 model gateway 路由所有 AI calls，按 repo、model 與成本設 policy。
  - prompt change 或 model swap 時像 CI 一樣執行 evals。
  - 以 role-based access 控制誰可對哪些資料執行何種模型。
  - 保存 immutable logs。
  - 用 impact mapping 把 AI 工作連到 shipped features 與 business outcomes。
constraints:
  - 所有 AI calls 必須經同一治理入口。
  - 權限、稽核與成本政策必須可追溯。
preconditions:
  - 組織已有產品化 AI 使用情境與可計量工作流。
failure_modes:
  - 模型與 prompt 變動沒有 evals。
  - 董事會只看 activity，無法判斷 business value。
```

## M08 — 每階都以差額決定是否繼續

```yaml
module_id: M08
source_id: PENDING-how-to-make-company-ai-native
char_span: [10115, 10506]
article_type: method
semantic_roles: [decision_rule, measurement]
domain: ai_transformation
operations: [stage_gate_evaluation]
problem_type: unbounded_ai_transformation
input_type: before_after_delivery_metrics
output_type: climb_stop_decision
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 每次升階後回到 baseline，比較 cycle time、error rate、manual hours 與 cost per workflow unit。
  - 在組織內公開包含負面結果的數據。
  - 差額支持下一階才繼續；否則停止。
constraints:
  - 不得隱藏不利數據。
  - 升階必須由可量測的 business delta 支持。
preconditions:
  - 已建立可重複量測的 baseline。
failure_modes:
  - 只採用 vendor 敘事或 activity 指標。
  - 沒有明確停止規則，讓無價值 pilot 長期延續。
```

## 非技能訊號連續性

| char_span | disposition | 說明 |
|---|---|---|
| `[0,609)` | pure_fill | 標題、受眾定位、導流鋪陳；不進下游。 |
| `[10506,11848)` | pure_fill | 服務銷售、免費 baseline 與 CTA；不進下游。 |
