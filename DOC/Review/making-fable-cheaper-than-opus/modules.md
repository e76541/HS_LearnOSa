# Modules — Making Fable Cheaper Than Opus

> `char_span` 作業約定：對 `source.md` 先將 CRLF 正規化為 LF，再以 Unicode 字元零起算、半開區間 `[start,end)` 計算。此約定僅供本篇復算，不升格為 canonical 規格。

## Source record

```yaml
source_id: PENDING-making-fable-cheaper-than-opus
title: Making Fable Cheaper Than Opus
source_kind: web_article
source_url: https://x.com/joon_h_lee/status/2076714221837173097
mirror_url: https://cognition.ai/blog/making-fable-cheaper-than-opus
author: Joon Lee / Cognition
schema_version: v0.3-r1
extractor: cursor-grok
source_char_length: 9595
```

## M00 — 單位價溢價不是代理成本的正確指標

```yaml
module_id: M00
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [34, 2089]
article_type: analysis
semantic_roles: [claim, evidence, motivation]
domain: agentic_coding_cost
operations: [cost_metric_critique, comparative_evaluation]
problem_type: mistaking_token_price_for_agent_cost
input_type: frontiercode_eval_configs
output_type: effective_agent_cost_ordering
cognitive_level: analyze
is_skill_signal: true
confidence: 0.93
schema_version: v0.3-r1
extractor: cursor-grok
module_type: AnalysisModule
claim: 在相同 Fusion sidekick 下，Fable 5 雖單位價約為 Opus 4.8 的兩倍，但每輪成本更低且分數更高；代理成本由 lead 回合數、拖曳的 context，以及 lead 決定不做什麼主導，而非單位價。
evidence:
  - 純跑：Fable 60.8／$4.03，Opus 55.4／$3.06（更強更貴）。
  - 同 sidekick：Fable+$1.86／60.7 低於 Opus+$2.04／54.6；相對純 Fable 成本降約 54% 且分數幾乎不變。
  - 作者以「Opus 像管實習生的微觀管理者；Fable 像帶能幹工程師的管理者」總結差異。
assumptions:
  - FrontierCode 1.1 與四組配置可代表文中所稱的 agentic coding 成本結構。
  - 兩組使用「相同便宜 sidekick」的比較成立。
counterarguments:
  - 文中承認直覺上 Fable-led 應更貴；若任務無可委派成分，此成本反轉不成立（見後文限制）。
```

## M01 — Fusion lead／sidekick 交接架構

```yaml
module_id: M01
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [2089, 2538]
article_type: method
semantic_roles: [procedure, architecture]
domain: agent_harness
operations: [lead_sidekick_delegation]
problem_type: frontier_model_overspend_on_delegable_work
input_type: user_task_session
output_type: reviewed_committed_result
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: cursor-grok
module_type: MethodModule
procedure:
  - lead 擁有整個 session：對使用者對話、規劃、審查與 commit。
  - lead 以白話撰寫 handoff brief，交給較便宜模型驅動的持久 sidekick subagent。
  - sidekick 在自己的 context 執行並回報；lead 審查結果後決定下一步。
constraints:
  - sidekick 使用明顯更便宜的模型。
  - handoff 以 plain language brief 傳遞，而非預設由 lead 親自動手。
preconditions:
  - 存在可委派的子任務與可持久的 sidekick 通道。
failure_modes:
  - 作者未給：無 sidekick 或 brief 不可執行時的降級路徑細節。
```

## M02 — 以全量 call 日誌與對照軌跡歸因成本

```yaml
module_id: M02
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [2538, 3066]
article_type: method
semantic_roles: [procedure, measurement]
domain: agent_eval_instrumentation
operations: [llm_call_cost_attribution, trajectory_contrast]
problem_type: opaque_agent_spend
input_type: evaluation_session_logs
output_type: lead_vs_sidekick_cost_breakdown
cognitive_level: apply
is_skill_signal: true
confidence: 0.92
schema_version: v0.3-r1
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 解析全部 3,000 場 session 的每次 LLM call：模型、工具、讀寫 token、費用。
  - 另抽 40 題深挖：Fable 明顯更便宜、Opus 更便宜、以及中段隨機樣本。
  - 對同一題並排比較 Fable-led 與 Opus-led 軌跡，觀察錢花在何處。
constraints:
  - 作者未給：40 題抽樣的嚴格抽樣協議與統計區間。
preconditions:
  - 可取得逐 call 的模型與 token 計量。
failure_modes:
  - 只有總帳單而無 per-call 歸因時，無法區分 lead 與 sidekick 花費。
```

## M03 — Lead 少做事比單位價更能決定帳單

```yaml
module_id: M03
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [3066, 4029]
article_type: analysis
semantic_roles: [claim, evidence]
domain: agentic_coding_cost
operations: [cost_decomposition]
problem_type: lead_token_bloat
input_type: lead_sidekick_cost_table
output_type: turn_and_edit_avoidance_explanation
cognitive_level: analyze
is_skill_signal: true
confidence: 0.94
schema_version: v0.3-r1
extractor: cursor-grok
module_type: AnalysisModule
claim: Fable 在 sidekick 上多花約 $0.27／run，但在自身少花約 $0.45；憑較少回合與較少 context／輸出 token 勝過單位價劣勢，且常藉「根本不做」省 token。
evidence:
  - Fable+SK：lead $1.28、SK $0.58、共 $1.86、11.5 turns、545k lead input。
  - Opus+SK：lead $1.73、SK $0.31、共 $2.04、26.5 turns、1,679k lead input。
  - Fable-led 有 81% run lead 從未改碼（Opus 僅 24%）；13% 的 Fable-led run lead 甚至不讀 repo 檔。
assumptions:
  - 表列均值可代表實驗配置下的典型行為。
counterarguments:
  - 若任務迫使 lead 必須親自動手，避免改碼的比例優勢會消失。
```

## M04 — 管理風格：早委派正確工作，而非委派更多次

```yaml
module_id: M04
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [4029, 5751]
article_type: teaching
semantic_roles: [concept, contrast]
domain: agent_delegation_judgment
operations: [delegation_timing, trust_calibration]
problem_type: late_delegation_after_expensive_solo_work
input_type: same_task_same_sidekick_trajectories
output_type: early_spec_quality_handoff_pattern
cognitive_level: understand
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r1
extractor: cursor-grok
module_type: TeachingModule
concept_core: 兩邊約同樣委派約 3 次；差距在「何時、委派什麼」。Fable 早交偵察與實作迴圈；Opus 常先獨自探索／設計／實作，晚才把機械尾巴交出。強迫 Opus 多委派探索會降表現——判斷何時可交才是能力本身。
examples:
  - 典型 Fable：少量偵察 → 一份規格級 brief 交出 implement+test+lint → git show 審查 → commit。
  - 典型 Opus：20–45 回合獨自工作後，才晚交機械尾巴。
  - 同題開場：Fable 第一動即 handoff 探 OIDC；Opus 收到 sidekick 摘要後仍重讀約 12 個檔自己做設計決策。
hooks:
  - kind: quote
    char_span: [5100, 5413]
    note: Fable 開場 handoff 與 Opus「讓我自己再讀關鍵檔」對照。
limitation: 觀測來自選定軌跡對照；「約 3 次 handoff」是實驗均值敘事，非對所有任務的保證。
```

## M05 — 用約束與完成定義寫 brief，不要口述實作

```yaml
module_id: M05
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [5751, 7152]
article_type: method
semantic_roles: [procedure, quality]
domain: agent_handoff_briefing
operations: [constraint_brief_writing]
problem_type: dictated_implementation_handoffs
input_type: implementation_subtask
output_type: constraint_rich_sidekick_brief
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 委派實作時寫設計文件式 brief：列約束、邊界情況與「完成」定義。
  - 要求 sidekick 在 commit 前回報完整 diff 與測試結果。
  - 不要把完整檔案內容與逐步程式碼口述進 brief。
constraints:
  - brief 應保存關鍵正確性約束（文中例：hash 必須對 pointer 長度 O(1)，禁止全 token 掃描）。
preconditions:
  - 任務可分解，且約束可在不寫滿實作的情況下陳述。
failure_modes:
  - 口述實作導致約束未被寫下，lead 親手實作時遺忘約束（文中 hashing：Opus 線性實作得分 25；Fable 約束委派得分 94）。
```

## M06 — 審查後再交一次便宜 handoff，不要用 lead 價重寫

```yaml
module_id: M06
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [7152, 8129]
article_type: method
semantic_roles: [procedure, review]
domain: agent_review_loop
operations: [cheap_diff_review, corrective_redelegation]
problem_type: lead_priced_rewrites_after_sidekick_work
input_type: sidekick_diff
output_type: accepted_or_redelegated_change
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 先做便宜檢查：兩三次 git diff／git show。
  - 若結果過度設計或有錯，下達第二次 handoff 讓 sidekick 修正。
  - 避免把 sidekick 檔案大量拉回 lead context，並以 lead 價大改或整段重寫。
constraints:
  - 不信任 sidekick 並不自動提高正確性；文中指出 Opus 更常拉回 context（約 2x）與 corrective edits（約 4x）。
preconditions:
  - sidekick 已交付可審查的 diff。
failure_modes:
  - 還原 sidekick 成果後由 lead 重寫，成本回到 frontier 價且未證明更正確。
```

## M07 — 無可委派成分時，委派槓桿消失

```yaml
module_id: M07
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [8129, 8981]
article_type: method
semantic_roles: [procedure, limitation]
domain: agent_delegation_judgment
operations: [non_delegation_recognition, routing_vs_delegation]
problem_type: undecomposable_agent_tasks
input_type: short_or_serial_judgment_tasks
output_type: keep_work_on_lead_or_route_elsewhere
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.93
schema_version: v0.3-r1
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 辨識難分解任務：極短「決策即出貨」、以及根因追查為一長串判斷且累積 context 即工作本身的序列除錯。
  - 此類任務上 Fable 幾乎不委派；會寫好 brief 的判斷也包括何時不寫 brief。
  - 生產上另層處理：delegation 決定昂貴模型做哪些工作；routing 決定昂貴模型是否介入。
constraints:
  - 當任務沒有值得交出的部分時，委派對成本沒有槓桿。
preconditions:
  - 作者未給：可操作的自動偵測「無可委派」特徵清單。
failure_modes:
  - 對不可分解任務仍強制委派，可能同時傷害成本與品質。
```

## M08 — 前沿價最終買的是判斷

```yaml
module_id: M08
source_id: PENDING-making-fable-cheaper-than-opus
char_span: [8981, 9595]
article_type: analysis
semantic_roles: [claim, implication]
domain: agentic_coding_cost
operations: [pricing_implication]
problem_type: what_remains_worth_frontier_prices
input_type: effective_delegation_habits
output_type: judgment_centered_frontier_pricing
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.9
schema_version: v0.3-r1
extractor: cursor-grok
module_type: AnalysisModule
claim: 有效委派（約束與結果、回饋而非親自動手、多數情況不碰程式碼）可使更貴單位價的 lead 整體更便宜；隨 sidekick 變便宜變強，仍值得付前沿價的是判斷——做什麼、約束什麼、誰來寫。
evidence:
  - 實驗起初預期量測 2x 溢價如何抬高成本，結果發現有效委派反而降低總成本。
  - 結語將「好管理者習慣」對應到 agent lead 行為。
assumptions:
  - sidekick 模型會持續變便宜且足夠能幹。
counterarguments:
  - 若法規或產品要求 lead 必須親讀／親改多數變更，判斷定價論仍成立但成本節省空間縮小。
```

## 非技能訊號連續性

| char_span | disposition | 說明 |
|---|---|---|
| `[0,34)` | pure_fill | 標題行；不進下游。 |
