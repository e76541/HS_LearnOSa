# Modules — Quant Trading Is Not Prediction

> `char_span` 以 `source.md` 的 Unicode 字元零起算、半開區間 `[start,end)` 計算。模塊是索引面；下游取材須依區間回原文。

## Source record

```yaml
source_id: PENDING-quant-trading-is-not-prediction
title: "Quant Trading Is Not Prediction"
source_kind: user_pasted_article
schema_version: v0.3-r1
extractor: codex-gpt-5
source_char_length: 6497
```

## M01 — 量化交易隔離可交易的微小偏差

```yaml
module_id: M01
source_id: PENDING-quant-trading-is-not-prediction
char_span: [0, 900]
article_type: teaching
semantic_roles: [concept, problem_framing, contrast]
domain: quantitative_trading
operations: [return_decomposition, edge_isolation]
problem_type: whole_market_prediction_framing
input_type: asset_return_components
output_type: isolated_asset_specific_edge
cognitive_level: understand
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: 量化交易不是預測整體市場方向，而是剝除市場、產業、因子、流動性與暫時壓力後，隔離略低於隨機的資產特定偏差。
examples:
  - 散戶交易整段價格變動；量化基金拆解變動並判斷哪一部分可交易。
hooks:
  - kind: quote
    char_span: [32, 135]
    note: 微小優勢、正確部位與大量重複的全文主旨。
limitation: 文中未提供偏差隔離的估計模型、統計顯著性門檻或可交易性驗證方法。
```

## M02 — 微小優勢靠期望值與大量重複形成業務

```yaml
module_id: M02
source_id: PENDING-quant-trading-is-not-prediction
char_span: [900, 1401]
article_type: teaching
semantic_roles: [concept, mechanism, contrast]
domain: quantitative_trading
operations: [expected_value_reasoning, repeated_sampling]
problem_type: single_trade_outcome_focus
input_type: small_statistical_edge
output_type: repeated_positive_average_outcome
cognitive_level: understand
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: 單筆交易近乎無意義的微小優勢，只要平均結果為正，經大量重複即可形成可持續的業務；問題應從「這筆會不會成功」改為「重複一萬次後平均是否獲利」。
examples:
  - 51% 或 50.75% 的勝率。
  - 幾分錢的期望值，或偏離後傾向回歸的殘差。
hooks:
  - kind: quote
    char_span: [1268, 1310]
    note: 散戶以單筆成敗提問。
  - kind: quote
    char_span: [1313, 1400]
    note: 量化交易以大量重複後的平均結果提問。
limitation: 勝率本身不足以判定期望值；文中此處未同時給出賠率、尾部損失與交易成本。
```

## M03 — EV、Kelly 與大數法則構成量化交易機器

```yaml
module_id: M03
source_id: PENDING-quant-trading-is-not-prediction
char_span: [1401, 2003]
article_type: teaching
semantic_roles: [concept, mechanism, risk_management]
domain: quantitative_trading
operations: [edge_evaluation, position_sizing, repetition_planning]
problem_type: incomplete_edge_deployment
input_type: candidate_trade_distribution
output_type: sized_repeatable_trade_process
cognitive_level: analyze
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: 期望值判定交易是否值得存在，Kelly Criterion 決定資本風險，大數法則解釋需要多少重複才能讓優勢與運氣區分；缺少任一環節都會破壞系統。
examples:
  - 正期望值配上錯誤部位仍可能爆倉。
  - 沒有優勢的良好部位管理仍會緩慢虧損。
  - 沒有足夠重複的真實優勢看起來仍像雜訊。
hooks:
  - kind: formula
    char_span: [1742, 1809]
    note: EV 是引擎、Kelly 是傳動、頻率是燃料的機器類比。
limitation: 文中沒有給出三者的公式、估計誤差、Kelly 分數化或非獨立樣本的處理方式。
```

## M04 — Renaissance 作為微小優勢規模化的案例

```yaml
module_id: M04
source_id: PENDING-quant-trading-is-not-prediction
char_span: [2003, 2747]
article_type: case
semantic_roles: [example, historical_context]
domain: quantitative_trading
operations: [edge_scaling]
problem_type: apparent_impossibility_of_small_edge_returns
input_type: claimed_renaissance_track_record
output_type: small_edge_scaling_example
cognitive_level: understand
is_skill_signal: true
confidence: 0.76
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: CaseModule
context: 作者以 Renaissance Technologies 與 Medallion Fund 說明略高於擲硬幣的正確率如何產生卓越績效。
actions:
  - 精確量測微小優勢。
  - 正確配置部位。
  - 將大量小型市場瑕疵重複數百萬次。
outcome: 作者主張規模化的小優勢形成 discretionary trader 難以競爭的績效。
transferability: 可遷移的是「微小優勢、部位與規模」的機制，不是對特定基金績效或方法的直接複製。
```

## M05 — AI 模型是雜訊中的模式偵測器

```yaml
module_id: M05
source_id: PENDING-quant-trading-is-not-prediction
char_span: [2747, 3450]
article_type: teaching
semantic_roles: [concept, historical_context, analogy]
domain: machine_learning_for_trading
operations: [signal_detection, expected_outcome_estimation]
problem_type: crystal_ball_model_framing
input_type: noisy_market_data
output_type: estimated_conditional_outcome
cognitive_level: understand
is_skill_signal: true
confidence: 0.94
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: 交易模型不是水晶球，而是在雜亂價格資料中偵測模式，嘗試估計恐慌、趨勢、流動性失衡或暫時錯價等隱藏狀態下的期望結果。
examples:
  - 作者以密碼分析者從雜訊找訊號類比量化交易。
hooks:
  - kind: quote
    char_span: [3048, 3151]
    note: 密碼分析者不問感覺，而問雜訊中藏著什麼訊號。
limitation: 歷史敘述與 Renaissance 的技術使用情況未附來源；隱藏狀態也未給出可操作定義。
```

## M06 — 以殘差均值回歸建立統計套利

```yaml
module_id: M06
source_id: PENDING-quant-trading-is-not-prediction
char_span: [3450, 4181]
article_type: method
semantic_roles: [procedure, example, mechanism]
domain: statistical_arbitrage
operations: [factor_neutralization, residual_estimation, mean_reversion_trading]
problem_type: asset_specific_mispricing_detection
input_type: stock_returns_and_factor_exposures
output_type: hedged_residual_trade_signal
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 從股票報酬移除市場、產業與共同因子曝險，取得殘差。
  - 將殘差與正常水準比較。
  - 殘差過高時視為相對避險價值偏貴，過低時視為偏便宜。
  - 只在殘差具有可量測均值回歸傾向時交易。
constraints:
  - 訊號針對避險後的相對錯價，不是公司品質或整體市場方向。
  - 殘差必須有可量測的均值回歸傾向。
preconditions:
  - 可估計市場、產業與共同因子曝險及殘差正常水準。
failure_modes:
  - 未完整中和共同曝險時，把系統性變動誤認為資產特定錯價。
  - 殘差偏離沒有均值回歸時，反向交易可能持續虧損。
```

## M07 — 過度擬合使回測模式在實盤消失

```yaml
module_id: M07
source_id: PENDING-quant-trading-is-not-prediction
char_span: [4181, 4798]
article_type: analysis
semantic_roles: [claim, diagnosis, validation]
domain: quantitative_strategy_validation
operations: [overfitting_diagnosis, out_of_sample_testing, cost_adjustment]
problem_type: backtest_live_performance_gap
input_type: machine_learning_strategy_and_backtest
output_type: validation_risk_assessment
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: 模型會找到不存在的模式並記住歷史；真正的優勢在測試流程，而不是漂亮的回測模型。
evidence:
  - 作者描述回測完美、權益曲線平滑，但實盤後效果消失的典型過度擬合症狀。
  - 作者列出樣本外測試、滑價、費用、容量、制度轉換、訊號衰退、資料洩漏、相關性與執行等檢查面向。
assumptions:
  - 回測與實盤落差主要可由過度擬合或清單中的實務因素解釋。
counterarguments:
  - 文中沒有提供具體資料切分、統計檢定、多重比較修正或實盤對照結果。
hooks:
  - kind: quote
    char_span: [4561, 4624]
    note: 模型不是優勢，測試流程才是優勢。
```

## M08 — 真正護城河是資料、執行與淘汰紀律

```yaml
module_id: M08
source_id: PENDING-quant-trading-is-not-prediction
char_span: [4798, 5347]
article_type: analysis
semantic_roles: [claim, operational_discipline]
domain: quantitative_trading_operations
operations: [data_quality_control, execution_management, variance_survival, strategy_retirement]
problem_type: commoditized_model_tools
input_type: accessible_models_compute_and_research
output_type: durable_operational_process
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: 模型、算力、論文與公式普及後，量化交易的護城河主要是乾淨資料、執行、辨識假訊號、承受變異的部位、無情緒重複與及時淘汰衰退策略。
evidence:
  - 作者以可免費取得的工具對比難以複製的操作紀律。
assumptions:
  - 工具取得成本已不再是多數量化策略的主要差異來源。
counterarguments:
  - 某些專有資料、低延遲基礎設施、人才與資本門檻仍可能構成技術或資源護城河。
```

## M09 — 量化流程須驗證、定倉、重複並持續刷新

```yaml
module_id: M09
source_id: PENDING-quant-trading-is-not-prediction
char_span: [5347, 6497]
article_type: method
semantic_roles: [synthesis, checklist, procedure]
domain: quantitative_trading
operations: [edge_validation, risk_sizing, repetition_assessment, cost_adjustment, crowding_monitoring]
problem_type: unsafe_or_unrepeatable_edge_deployment
input_type: candidate_quantitative_signal
output_type: validated_sized_monitored_strategy
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 判定訊號是否有正期望值且不是過度擬合。
  - 決定可承受變異的風險部位。
  - 確認有足夠且盡量獨立的重複機會。
  - 納入成本並監測擁擠。
  - 在市場參與者消滅優勢前刷新或淘汰策略。
constraints:
  - 只部署經驗證為真實、成本後仍為正的微小優勢。
  - 部位必須小到足以存活於隨機變異。
preconditions:
  - 已定義訊號、報酬分布、成本、執行方式與失效監測。
failure_modes:
  - 把預測正確率當成全部業務，而忽略報酬幅度、相關性與尾部風險。
  - 優勢衰退或擁擠後仍繼續重複。
hooks:
  - kind: quote
    char_span: [6317, 6380]
    note: 小優勢由數學保護，再由重複放大。
```
