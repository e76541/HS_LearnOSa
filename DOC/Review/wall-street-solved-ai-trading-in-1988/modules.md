# Modules — Wall Street Solved AI Trading in 1988. You're 37 Years Late.

> `char_span` 以 `source.md` 的 Unicode 字元零起算、半開區間 `[start,end)` 計算。模塊是索引面；下游取材須依區間回原文。

## Source record

```yaml
source_id: PENDING-wall-street-solved-ai-trading-in-1988
title: "Wall Street Solved AI Trading in 1988. You're 37 Years Late."
source_kind: x_article
source_url: https://x.com/i/article/2072222205597888512
schema_version: v0.3-r1
extractor: codex-gpt-5
source_char_length: 10741
```

## M01 — Renaissance 歷史敘事作為 AI 交易非新穎性的背景

```yaml
module_id: M01
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [0, 2209]
article_type: case
semantic_roles: [background, historical_context, motivation]
domain: quantitative_trading_history
operations: [historical_reframing]
problem_type: novelty_framing_of_ai_trading
input_type: author_claimed_historical_account
output_type: historical_context_for_current_ai_trading
cognitive_level: understand
is_skill_signal: false
confidence: 0.72
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: CaseModule
context: 作者以 Jim Simons、Renaissance Technologies 與 Medallion Fund 的 1988 年敘事，挑戰「AI 交易是全新前沿」的讀者框架。
actions:
  - 作者稱 Simons 以密碼分析者從雜訊取訊號的視角看待市場。
  - 作者稱 Medallion 以早期機器學習與大量微弱重複訊號取得卓越績效。
outcome: 此歷史故事被用作後文「模型不是護城河」與「AI 交易不是新鮮事」的鋪陳。
transferability: 僅可作理解後續概念的歷史背景；基金績效、年代與所用模型均須以外部一手證據覆核，不能作可複製方法。
```

## M02 — 由雜訊觀測推估隱藏狀態

```yaml
module_id: M02
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [2211, 3499]
article_type: teaching
semantic_roles: [concept, mechanism, analogy]
domain: hidden_markov_models
operations: [latent_state_inference, noisy_observation_analysis]
problem_type: hidden_state_inference_from_noisy_observations
input_type: observable_sequence
output_type: latent_state_estimate
cognitive_level: understand
is_skill_signal: true
confidence: 0.91
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: 本文以 HMM 說明：可見的雜訊輸出不等於系統本身；模型嘗試由觀測證據推估未直接看見的狀態。作者以 Baum–Welch、語音與價格資料作為此思路的連結。
examples:
  - 作者以 calm／panic、trend／chop 作為可能的市場隱藏狀態。
  - 作者對比「聲音底下的字詞」與「價格底下的狀態」。
hooks:
  - kind: quote
    char_span: [2368, 2918]
    note: 以「由雜訊回推隱藏狀態」把 HMM 直覺化的長段落。
limitation: 文中未區分 Baum–Welch 的參數估計與具體狀態解碼，也未給出觀測分布、狀態數、可辨識性或市場資料是否符合模型假設。
```

## M03 — 統計 NLP 與量化交易交會的歷史背景

```yaml
module_id: M03
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [3501, 4919]
article_type: case
semantic_roles: [background, historical_context, analogy]
domain: statistical_natural_language_processing_history
operations: [cross_domain_method_transfer]
problem_type: perceived_separation_of_nlp_and_quantitative_trading
input_type: author_claimed_employment_and_research_history
output_type: historical_analogy_for_statistical_learning
cognitive_level: understand
is_skill_signal: false
confidence: 0.73
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: CaseModule
context: 作者敘述 Simons 於 1993 年自 IBM 延攬 Robert Mercer 與 Peter Brown，並把其統計機器翻譯背景連到量化交易。
actions:
  - 作者將 Mercer、Brown 在 IBM 的統計式語言處理研究描述為現代 AI 的技術祖先。
  - 作者以「同一套機器、不同資料」概括語音／語言處理與市場資料建模的遷移。
outcome: 此故事被用來支持統計學習並非只屬於語言 AI、且可應用到市場資料的論點。
transferability: 作為跨領域類比可輔助理解，但不能據此推出 HMM、統計機器翻譯與現代 LLM 之間存在單一路徑或等同關係；年代與技術沿革待覆核。
```

## M04 — 交易模型聚合微弱訊號以估計條件結果

```yaml
module_id: M04
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [4921, 5469]
article_type: teaching
semantic_roles: [concept, mechanism, contrast]
domain: machine_learning_for_trading
operations: [feature_aggregation, conditional_outcome_estimation]
problem_type: crystal_ball_model_framing
input_type: many_weak_market_signals
output_type: slightly_better_than_random_conditional_estimate
cognitive_level: understand
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: 本文將交易模型定位為：同時衡量大量輸入、尋找模式並聚合個別很弱的訊號，以估計條件下的結果；它不是必然正確的未來預言。
examples:
  - 作者把交易模型與垃圾郵件過濾器、語音辨識器並列。
  - 每個訊號僅略優於隨機，聚合後才形成略優於隨機的猜測。
hooks:
  - kind: quote
    char_span: [5036, 5469]
    note: 將 AI 交易模型從「水晶球」改框為條件式、微弱訊號聚合器的段落。
limitation: 「預期結果」缺少預測標的、時間尺度、損失函數、成本與校準方式；略優於隨機不等於扣除成本後可交易。
```

## M05 — Renaissance 作為微弱訊號規模化的背景案例

```yaml
module_id: M05
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [5471, 5927]
article_type: case
semantic_roles: [background, historical_context, example]
domain: quantitative_trading_history
operations: [small_signal_scaling]
problem_type: perceived_need_for_single_golden_signal
input_type: author_claimed_renaissance_practice
output_type: historical_example_of_signal_aggregation
cognitive_level: understand
is_skill_signal: false
confidence: 0.69
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: CaseModule
context: 作者以 Renaissance 找到大量微小訊號並藉紀律與規模放大為例，說明模型的工作不是找到單一黃金訊號。
actions:
  - 作者稱基金把各自僅略優於擲硬幣的許多小訊號合併。
  - 作者把 Baum 的隱藏狀態與 Mercer、Brown 的統計學習都放入該歷史敘事。
outcome: 此案例被用來讓 M04 的訊號聚合模型觀顯得具體。
transferability: 可作「多個弱訊號」的背景例子，但不能視為對 Medallion 模型、勝率、訊號數量或因果機制的已驗證描述。
```

## M06 — 模型普及後仍須評估資料、執行與操作紀律

```yaml
module_id: M06
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [5929, 7050]
article_type: analysis
semantic_roles: [claim, operational_discipline, moat_assessment]
domain: quantitative_trading_operations
operations: [data_advantage_assessment, execution_capability_assessment, process_discipline_assessment]
problem_type: model_access_as_sufficient_advantage
input_type: accessible_models_compute_and_research
output_type: operational_moat_hypothesis
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.90
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: 當演算法、函式庫與算力的取得門檻下降時，策略優勢不能只以模型有無判定；本文主張資料品質、執行速度與跨多次交易遵守系統的紀律更應被評估。
evidence:
  - 作者將可免費取得的機器學習函式庫與當年 Renaissance 的資源作對比。
  - 作者列出乾淨資料、短暫訊號的執行速度與不動搖的紀律三項差距。
assumptions:
  - 相關市場的模型、資料與算力已足夠普及，且三項操作能力是績效主因。
counterarguments:
  - 專有資料、低延遲基礎設施、人才、資本與市場進入權仍可能是不可輕忽的技術或資源護城河。
```

## M07 — 以驗證流程識別過度擬合與虛假訊號

```yaml
module_id: M07
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [7052, 8350]
article_type: analysis
semantic_roles: [claim, diagnosis, validation]
domain: quantitative_strategy_validation
operations: [overfitting_diagnosis, out_of_sample_validation, implementation_cost_review]
problem_type: backtest_live_performance_gap
input_type: model_backtest_and_live_trading_evidence
output_type: signal_credibility_assessment
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: 模型可能把歷史巧合誤作可重複模式；判斷訊號是否可信應優先檢查樣本外表現、成本與執行等流程，而不是只看漂亮回測。
evidence:
  - 作者描述模型記住歷史、回測曲線亮眼、實盤後效果消失的典型落差。
  - 作者列舉樣本外測試、滑價、費用、容量、制度轉換、訊號衰退、資料洩漏、相關性與執行等檢查面向。
assumptions:
  - 回測與實盤落差可由過度擬合或上述實作問題有效識別與部分歸因。
counterarguments:
  - 文章未提供資料切分、多重比較校正、統計檢定、資本配置或任何實盤對照；「99%」並非已證實的普遍比例。
```

## M08 — 新模型能力不免除樣本外與交易摩擦驗證

```yaml
module_id: M08
source_id: PENDING-wall-street-solved-ai-trading-in-1988
char_span: [8352, 9334]
article_type: analysis
semantic_roles: [claim, method_boundary, validation]
domain: machine_learning_for_trading
operations: [text_signal_research, execution_policy_learning, out_of_sample_validation]
problem_type: novelty_claims_for_new_trading_models
input_type: llm_or_reinforcement_learning_candidate_strategy
output_type: bounded_method_assessment
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.88
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: LLM 對文字資料的處理與 RL 對執行策略的學習可帶來新能力，但本文仍把其有效性繫於訓練資料之外是否保有優勢及交易摩擦下的驗證。
evidence:
  - 作者以大量財報電話會議、申報文件與新聞轉為可交易訊號說明 LLM 的潛在用途。
  - 作者以在不衝擊市場下執行大單說明 RL 的潛在用途，並重申資料外存活是共同限制。
assumptions:
  - 所述模型已有足夠可交易的資料、目標定義與部署條件，且其效益能和既有方法區分。
counterarguments:
  - 文章未提供實驗、成本、容量、基準模型或實盤證據；LLM、RL 與早期統計 NLP 的技術關係不應簡化為直接祖先鏈。
```

## 覆蓋註記

- M01、M03、M05 是有邊相連的背景模塊，僅供渲染或論證脈絡，不進技能對齊、圖式主體或考點。
- `[9336,10741)` 是對前述主張的修辭性回顧與反問，沒有新增可獨立成立的程序、概念或分析命題；依 2.4 作純填充保留於原文，不建下游節點。
