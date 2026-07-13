# Modules — Loop and Harness Engineering

> `char_span` 以 `source.md` 的 Unicode 字元零起算、半開區間 `[start,end)` 計算。模塊是索引面；下游取材須依區間回原文。

## Source record

```yaml
source_id: PENDING-loop-and-harness-engineering
title: "Loop and Harness engineering: 7 files, 5 steps. Every config inside"
source_kind: user_pasted_article
schema_version: v0.3-r1
extractor: codex-gpt-5
source_char_length: 17006
```

## M00 — 迴圈失敗的常見表象

```yaml
module_id: M00
source_id: PENDING-loop-and-harness-engineering
char_span: [0, 786]
article_type: analysis
semantic_roles: [background, motivation]
domain: agent_harness_engineering
operations: [problem_framing]
problem_type: stalled_agent_loops
input_type: builder_failure_observations
output_type: harness_gap_context
cognitive_level: understand
is_skill_signal: false
confidence: 0.90
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: 多數建置者只配置一兩個代理檔案，迴圈因底層 harness 不完整而在後續迭代停滯。
evidence:
  - 作者列出七類實際承擔工作的配置，並描述第三輪後停滯的常見現象。
assumptions:
  - 觀察來自作者經驗，未提供樣本與量測方法。
counterarguments:
  - 文中未比較模型、任務難度或程式庫品質等其他失敗因素。
```

## M01 — Harness 與 loop 是兩個相依層

```yaml
module_id: M01
source_id: PENDING-loop-and-harness-engineering
char_span: [786, 2241]
article_type: teaching
semantic_roles: [concept, mechanism, diagnosis]
domain: agent_harness_engineering
operations: [layer_separation, failure_diagnosis]
problem_type: conflated_agent_setup
input_type: agent_loop_failure
output_type: layer_specific_diagnosis
cognitive_level: analyze
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: Harness 是跨執行維持不變的權限、工具與上下文底座；loop 是在其上反覆執行目標、行動、驗證、記憶與停止決策。應先固定 harness，再建立 loop。
examples:
  - token 膨脹、提示疲勞與權限遺失屬 harness 問題。
  - 不收斂、弱驗證與排程漂移屬 loop 問題。
hooks:
  - kind: formula
    char_span: [1004, 1055]
    note: "The harness is the kitchen. The loop is the recipe."
  - kind: story
    char_span: [1569, 1676]
    note: 作者原先以為應先做 loop，後來反轉決策。
limitation: 作者未界定何種小型任務可安全省略部分 harness 元件。
```

## M02 — 用 CLAUDE.md 固定專案常駐上下文

```yaml
module_id: M02
source_id: PENDING-loop-and-harness-engineering
char_span: [2241, 3353]
article_type: method
semantic_roles: [procedure, context_management]
domain: agent_harness_engineering
operations: [standing_context_design, context_pruning]
problem_type: repeated_project_rediscovery
input_type: project_structure_and_rules
output_type: concise_standing_context
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 在 repo root 的 CLAUDE.md 記錄目錄、技術棧、可用命令、慣例與禁止事項。
  - 控制在 300 行內並每週刪除過時內容。
constraints:
  - 必須位於 repo root。
  - 不得把文件膨脹成全面說明書。
preconditions:
  - 已知可實際運作的專案命令與邊界。
failure_modes:
  - 過大 standing context 對每次執行持續課稅。
```

## M03 — 用 settings.json 固定權限與環境

```yaml
module_id: M03
source_id: PENDING-loop-and-harness-engineering
char_span: [3353, 4245]
article_type: method
semantic_roles: [procedure, permissions, security]
domain: agent_harness_engineering
operations: [permission_scoping, secret_separation]
problem_type: repeated_permission_blocking
input_type: tool_permission_requirements
output_type: scoped_agent_permissions
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 在專案 settings.json 允許必要的唯讀 Bash 與 Read 操作。
  - 明確拒絕破壞性命令。
  - 將秘密放入已忽略版控的本機設定。
constraints:
  - destructive operations 仍須設 gate。
  - secrets 不得提交至 repo。
preconditions:
  - 已盤點每輪必要工具。
failure_modes:
  - 權限過窄造成每個唯讀操作停等。
  - 權限過寬使破壞性操作無人把關。
```

## M04 — 用 hooks 建立確定性政策底線

```yaml
module_id: M04
source_id: PENDING-loop-and-harness-engineering
char_span: [4245, 4960]
article_type: method
semantic_roles: [procedure, deterministic_policy]
domain: agent_harness_engineering
operations: [tool_event_hooking, automatic_formatting]
problem_type: inconsistent_post_edit_state
input_type: tool_events
output_type: policy_checked_edits
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 在 settings.json 註冊工具事件 hook。
  - 先以 Edit 或 Write 後自動格式化作為最小政策底線。
  - 成功時保持安靜，失敗時明確輸出。
constraints:
  - hook 必須由可重現命令執行。
  - 失敗不得靜默吞掉。
preconditions:
  - 專案已有 formatter 或其他確定性檢查器。
failure_modes:
  - 無 hook 時，每輪編輯後狀態依賴代理自行記得規則。
```

## M05 — 用獨立 subagent 分離製作與驗證

```yaml
module_id: M05
source_id: PENDING-loop-and-harness-engineering
char_span: [4960, 5846]
article_type: method
semantic_roles: [procedure, verification, context_isolation]
domain: agent_harness_engineering
operations: [verifier_design, maker_checker_separation]
problem_type: self_confirming_review
input_type: goal_spec_and_diff
output_type: structured_verdict
cognitive_level: apply
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 在 agents 目錄建立只讀 verifier。
  - 讓 verifier 在全新 context 比對 goal spec 與 diff。
  - 回傳可機讀的通過與失敗項，不提出修法。
constraints:
  - verifier 不得修改內容。
  - verifier 不得與 maker 共用造成自我認同的上下文。
preconditions:
  - goal spec 已落盤且 diff 可讀。
failure_modes:
  - maker 在自身 context 內審查，傾向同意自己的產出。
```

## M06 — 將高頻專門流程蒸餾為 skill

```yaml
module_id: M06
source_id: PENDING-loop-and-harness-engineering
char_span: [5846, 6906]
article_type: method
semantic_roles: [procedure, specialization, context_management]
domain: agent_harness_engineering
operations: [skill_extraction, progressive_loading]
problem_type: repeated_specialized_prompting
input_type: recurring_task_pattern
output_type: progressively_loaded_skill
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 當同一專門任務至少重複三次，將其觸發條件、步驟、限制與驗證寫成 SKILL.md。
  - 啟動時只載入名稱與描述，命中後才載入完整技能。
constraints:
  - 不得為尚未反覆出現的任務投機建立大量技能。
  - 技能需明列不可違反的專案限制。
preconditions:
  - 已觀察到可重複且穩定的任務形狀。
failure_modes:
  - 一次載入整套技能造成 standing context 膨脹。
  - 教學後一次建立大量未經使用驗證的技能。
```

## M07 — 只啟用當前工作需要的 MCP server

```yaml
module_id: M07
source_id: PENDING-loop-and-harness-engineering
char_span: [6906, 7815]
article_type: method
semantic_roles: [procedure, tool_integration, security]
domain: agent_harness_engineering
operations: [mcp_selection, credential_scoping]
problem_type: uncontrolled_external_tooling
input_type: external_tool_requirements
output_type: minimal_mcp_configuration
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 在 repo root 的 .mcp.json 只宣告當前工作會用到的 server。
  - 有憑證的工具優先採官方 server。
  - write scope 啟用前先建立每次呼叫的記錄 hook。
constraints:
  - 不得為備用而一次啟用多個 server。
  - write scope 必須可稽核。
preconditions:
  - 已明確辨認外部工具需求與認證來源。
failure_modes:
  - 不必要 server 增加工具選擇噪音與權限面。
  - write scope 未留呼叫紀錄。
```

## M08 — 分離可變記憶與穩定 canon

```yaml
module_id: M08
source_id: PENDING-loop-and-harness-engineering
char_span: [7815, 8876]
article_type: method
semantic_roles: [procedure, state_management, context_management]
domain: agent_harness_engineering
operations: [memory_indexing, canon_separation, memory_pruning]
problem_type: cross_session_forgetting_and_rot
input_type: session_learnings_and_project_canon
output_type: indexed_pruned_state
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 用 MEMORY.md 作索引，連到偏好、決策與近期回饋等主題檔。
  - 將跨 session 會變動的內容放 memory，穩定專案 canon 放 vault。
  - 每次 session 刪除失效或重複記憶。
constraints:
  - memory 不得只增不減。
  - 穩定 canon 不得與短期回饋混放。
preconditions:
  - 已知哪些資訊會跨 session 改變。
failure_modes:
  - append-only memory 自身變成 context rot。
```

## M09 — 把完成契約寫成每輪重讀的 goal spec

```yaml
module_id: M09
source_id: PENDING-loop-and-harness-engineering
char_span: [8876, 9901]
article_type: method
semantic_roles: [procedure, goal_control]
domain: iterative_agent_loops
operations: [goal_specification, stop_condition_design]
problem_type: iteration_goal_drift
input_type: desired_change_and_boundaries
output_type: persistent_goal_spec
cognitive_level: apply
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 在磁碟寫明 goal、done when、never touch 與 stop if。
  - 每次迭代重新讀取該契約。
constraints:
  - 完成條件必須可驗證。
  - 禁止範圍與停止條件必須明列。
preconditions:
  - 使用者目標已可轉成外部契約。
failure_modes:
  - 規格只留在 context，數輪後產生目標漂移。
```

## M10 — 以新鮮 context 執行 Plan–Act–Verify

```yaml
module_id: M10
source_id: PENDING-loop-and-harness-engineering
char_span: [9901, 11104]
article_type: method
semantic_roles: [procedure, iteration_control, verification]
domain: iterative_agent_loops
operations: [planning, execution, independent_verification]
problem_type: compounding_agent_errors
input_type: goal_spec_and_iteration_state
output_type: verified_iteration
cognitive_level: apply
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 每輪以 fresh context 讀 goal spec 與 implementation plan。
  - 執行下一步後，由另一個 fresh context 驗證。
  - 將結果寫回磁碟；只有狀態為 done 才停止。
constraints:
  - verify 不得省略或由同一製作 context 取代。
  - 每輪必須序列化進度。
preconditions:
  - 已有 goal spec、狀態檔與 verifier。
failure_modes:
  - 錯誤輸出未經驗證，成為下一輪輸入並持續放大。
```

## M11 — 獨立子工作用 subagent fan-out

```yaml
module_id: M11
source_id: PENDING-loop-and-harness-engineering
char_span: [11104, 12127]
article_type: method
semantic_roles: [procedure, parallelization, orchestration]
domain: iterative_agent_loops
operations: [task_decomposition, parallel_execution, synthesis]
problem_type: orchestrator_context_overload
input_type: independent_subjobs
output_type: synthesized_worker_results
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 將可獨立的多來源或多檔工作拆給小 context worker 並行執行。
  - 由 orchestrator 收斂 worker 結果。
constraints:
  - 只有相互獨立的子工作才 fan-out。
  - orchestrator 必須負責整合，不把全部來源塞進單一 context。
preconditions:
  - 任務可清楚分割，且 worker 輸出可合併。
failure_modes:
  - 單一 context 同時載入多份工作材料而觸發 context rot。
```

## M12 — 排程器只負責喚醒，狀態負責持續

```yaml
module_id: M12
source_id: PENDING-loop-and-harness-engineering
char_span: [12127, 13069]
article_type: method
semantic_roles: [procedure, scheduling, persistence]
domain: iterative_agent_loops
operations: [scheduled_triggering, state_serialization, logging]
problem_type: unattended_loop_drift
input_type: loop_runner_and_schedule
output_type: persisted_scheduled_runs
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 以 cron、launchctl、systemd 或 queue runner 定時呼叫 loop runner。
  - 每輪記錄做過、試過與下一步，並將日誌寫入磁碟。
constraints:
  - scheduler 不得承擔狀態分支或是否跳過的推理。
  - 每輪必須先序列化進度再退出。
preconditions:
  - loop runner 可非互動執行，且狀態檔位置固定。
failure_modes:
  - scheduler 嘗試思考而靜默漂移。
  - 下一次喚醒時沒有前輪進度。
```

## M13 — 三種典型失敗模式

```yaml
module_id: M13
source_id: PENDING-loop-and-harness-engineering
char_span: [13069, 14151]
article_type: analysis
semantic_roles: [diagnosis, evidence]
domain: iterative_agent_loops
operations: [failure_classification]
problem_type: nonconvergent_agent_loops
input_type: loop_run_symptoms
output_type: failure_mode_diagnosis
cognitive_level: analyze
is_skill_signal: true
confidence: 0.94
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: AnalysisModule
claim: 初次建置常死於三類問題：弱驗證造成 confident garbage、長 context 造成 context rot、狀態未落盤造成同輪重複。
evidence:
  - 文中引用完成率與 token 用量對照，並列出代理假裝完成的捷徑。
assumptions:
  - 引用研究與工具數據可外推到讀者的 loop。
counterarguments:
  - 原文沒有交代評測任務、樣本與統計不確定性。
```

## M14 — 七個 harness 元件與五段 loop 的單向接線

```yaml
module_id: M14
source_id: PENDING-loop-and-harness-engineering
char_span: [14151, 16132]
article_type: teaching
semantic_roles: [concept, integration, mechanism]
domain: agent_harness_engineering
operations: [system_integration, execution_tracing]
problem_type: disconnected_harness_components
input_type: harness_files_and_loop_steps
output_type: one_directional_working_loop
cognitive_level: analyze
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: TeachingModule
concept_core: Harness 定義規則，loop 在規則內執行，狀態檔把第 N 輪接到第 N+1 輪；一次執行依序經過排程、常駐上下文、權限、hook、goal、行動、獨立驗證、狀態與記憶。
examples:
  - 缺 CLAUDE.md 時，每輪重新推導專案形狀。
  - 缺 verifier 時，驗證退回 maker context 並傾向自行通過。
  - 缺 MEMORY.md 時，相同修正跨週重做。
hooks:
  - kind: formula
    char_span: [15021, 15163]
    note: Harness 定義規則、loop 執行、state 連接相鄰迭代。
limitation: 「缺任一檔都會退化」是設計主張，未提供各元件移除實驗。
```

## M15 — 依目前缺口選擇下一個最小建置

```yaml
module_id: M15
source_id: PENDING-loop-and-harness-engineering
char_span: [16132, 17006]
article_type: method
semantic_roles: [procedure, prioritization]
domain: agent_harness_engineering
operations: [gap_audit, next_step_selection]
problem_type: uncertain_harness_starting_point
input_type: current_harness_inventory
output_type: one_next_build_action
cognitive_level: apply
is_skill_signal: true
confidence: 0.94
schema_version: v0.3-r1
extractor: codex-gpt-5
module_type: MethodModule
procedure:
  - 列出 .claude 目前內容。
  - 若缺 standing context，先建立精簡 CLAUDE.md。
  - 若已有設定但缺 agents，先建立 verifier。
  - 若已有 agents 但缺 skills，將一項重複三次的工作升格為 skill。
  - 若 harness 完整但沒有 loop，為一項重複工作建立 goal spec 與 Plan–Act–Verify。
constraints:
  - 每次只選一個符合當前缺口的下一步。
  - skill 必須來自已反覆發生的任務。
preconditions:
  - 可檢視專案 harness 現況。
failure_modes:
  - 未盤點缺口就一次加入整套框架與工具。
```
