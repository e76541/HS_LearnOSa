# Modules — 我是如何用 Orca 做 Graph Engineering

> `char_span` 以 `source.md` 的 Unicode 字元零起算、半開區間 `[start,end)` 計算。模塊是索引面；下游取材須依區間回原文。

## Source record

```yaml
source_id: PENDING-orca-graph-engineering-aiden
title: "我是如何用 Orca 做 Graph Engineering"
source_kind: user_pasted_article
author: Aiden (@wohsj110)
schema_version: v0.3-r6
extractor: cursor-grok
source_char_length: 8024
related_review: DOC/Review/graph-engineering-with-claude
```

## CandidateDisposition（建立前）

| 區間／簇 | claim_kind | provenance | support_status | retention | 結果 |
|---|---|---|---|---|---|
| 標題／作者行 `[0,57)` | none | primary | missing | retain（併入 M00 情境） | 不獨立建模塊 |
| 開場假前提案例 `[57,752)` | verifiable_claim + interpretation | primary | unverified | retain | 建 M00 |
| 地圖≠疆域／工種名 `[752,1031)` | attributed_claim | secondary | unverified | retain | 建 M01 |
| 三件套論旨 `[1031,1311)` | interpretation + advice | primary | provided（文內案例） | retain | 建 M02 |
| 拆圖四條共識 `[1311,1643)` | advice + attributed_claim | secondary | unverified | retain | 建 M03 |
| 圖是長出來的 `[1643,2102)` | interpretation | primary | provided | retain | 建 M04 |
| 570／41 運行快照 `[2102,2681)` | verifiable_claim | primary | unverified | retain | 建 M05 |
| wayfinder 編排用法 `[2681,3195)` | advice | primary | provided | retain | 建 M06 |
| 假成功機制 `[3195,3773)` | interpretation + attributed_claim | mixed | unverified | retain | 建 M07 |
| 前提→證據→擋下游 `[3773,4189)` | advice | primary | provided | retain | 建 M08 |
| 連掛三次案例 `[4189,4457)` | verifiable_claim | primary | unverified | retain | 建 M09 |
| 漏做無痕與節點粒度 `[4457,4749)` | interpretation + advice | primary | provided | retain | 建 M10 |
| 改圖權／閉環目標 `[4749,5435)` | interpretation + attributed_claim | mixed | unverified | retain | 建 M11 |
| gate 與三層上浮 `[5435,5918)` | advice | primary | provided | retain | 建 M12 |
| 診斷熔斷與 superseded `[5918,6612)` | advice | primary | provided | retain | 建 M13 |
| 何時改圖判據 `[6612,7191)` | advice + interpretation | primary | provided | retain | 建 M14 |
| 結語：eval 三角＋Orca `[7191,7827)` | interpretation + advice | primary | provided | retain | 建 M15 |
| 文末引用清單 `[7827,8024)` | none | secondary | missing | discard | 不建模塊；原文保留 |

---

## M00 — 假前提被真機攔下，orchestrator 補節點 013

```yaml
module_id: M00
source_id: PENDING-orca-graph-engineering-aiden
char_span: [0, 752]
article_type: case
semantic_roles: [example, motivation]
domain: agent_graph_engineering
operations: [detect_false_precondition, insert_task, rewire_deps]
problem_type: plan_built_on_false_readiness
input_type: task_graph_with_device_eval
output_type: patched_graph_with_upstream_task
cognitive_level: analyze
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r6
extractor: cursor-grok
module_type: CaseModule
context: 移動端新功能開工前拆成 12 任務；跑到第 5 任務時 agent-device 真機驗收失敗。
actions:
  - 診斷指向計劃前提「後端和 Runner 已就緒」，而非實作本身。
  - 真機顯示 runner／scheduler 不認新類型。
  - orchestrator 補 P0 任務 013（後端服務），並把 010／011 依賴改為等待 013。
outcome: 作者未插手；機器證據觸發補節點與重連依賴。編號晚建但依賴位在上游。
transferability: 可遷移點是「真機／外部錨點可推翻計劃前提，並觸發改圖」；產品名 Orca／agent-device 為手段。
hooks:
  - kind: quote
    char_span: [640, 690]
    note: "task-005 真机暴露：后端/Runner『已就绪』是假前提"
```

## M01 — 地圖不是疆域；unknown unknowns 最麻煩

```yaml
module_id: M01
source_id: PENDING-orca-graph-engineering-aiden
char_span: [752, 1031]
article_type: teaching
semantic_roles: [concept, attributed]
domain: agent_graph_engineering
operations: [distinguish_map_territory, name_unknowns]
problem_type: plan_reality_gap
input_type: prompts_skills_specs_cases
output_type: map_vs_territory_framing
cognitive_level: understand
is_skill_signal: true
confidence: 0.94
schema_version: v0.3-r6
extractor: cursor-grok
module_type: TeachingModule
concept_core: prompt／skill／spec／case 是地圖；真實代碼庫、線上約束、未寫下的規矩是疆域。兩者之差為 unknowns；最難的是連漏了什麼都不知道的 unknown unknowns。後續「loops→graphs」工種名討論是時間線背景。
examples:
  - 「以為就緒、其實不是」對應地圖與疆域落差。
hooks:
  - kind: quote
    char_span: [790, 800]
    note: "地图不是疆域"
limitation: 歸因於 @trq212／@steipete；原文未附可核對全文，僅保留作者轉述。
```

## M02 — 長任務要 graph、eval、改圖權三件同時成立

```yaml
module_id: M02
source_id: PENDING-orca-graph-engineering-aiden
char_span: [1031, 1311]
article_type: analysis
semantic_roles: [thesis, criterion]
domain: agent_graph_engineering
operations: [state_triad, counterfactual]
problem_type: long_running_agent_fragility
input_type: long_task_orchestration
output_type: triad_requirement
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r6
extractor: cursor-grok
module_type: AnalysisModule
claim: graph 只解決長活怎麼拆、怎麼接；對不對靠 eval；跑偏能否拐回靠改圖權。三樣同時成立，長任務才立得住。
evidence:
  - 開頭案例＝圖拆活＋agent-device 攔假前提＋orchestrator 補節點重連。
  - 少 eval → 假成功（步步綠、建在空氣上）。
  - 少改圖權 → 發現了也只能整單推倒。
assumptions:
  - 預先設計的驗收允許攔下游。
counterarguments:
  - 作者未證明三件是完備集合；只主張三者缺一則長任務站不住。
```

## M03 — 拆圖四條共識：要不要圖、砍假邊、執核分離、按難選模

```yaml
module_id: M03
source_id: PENDING-orca-graph-engineering-aiden
char_span: [1311, 1643]
article_type: method
semantic_roles: [procedure, attributed]
domain: agent_graph_engineering
operations: [decide_graph_need, cut_non_data_edges, separate_exec_review, route_by_difficulty]
problem_type: graph_design_baseline
input_type: candidate_work_decomposition
output_type: runnable_far_graph
cognitive_level: apply
is_skill_signal: true
confidence: 0.9
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 先判斷這活要不要 graph（rails／motor 判準，歸因 @ericosiu）。
  - 砍掉不傳資料的邊。
  - 把執行和複核分開（作者另做三角色拆分與三輪複核；原話只支持執核分離，歸因 @rohit4verse）。
  - 按節點難度選模型。
constraints:
  - 寬並行會按頂配計費；成本常在帳單上才發現（歸因 @humzaakhalid）。
  - 這四條只換「跑得遠」；作者問題都在這之後。
preconditions:
  - 讀者已接觸社群對拆圖的既有討論；本文不重講細節。
failure_modes:
  - 把共識當終點，忽略後續 eval 與改圖權。
```

## M04 — 圖是長出來的，不是開工前畫完的

```yaml
module_id: M04
source_id: PENDING-orca-graph-engineering-aiden
char_span: [1643, 2102]
article_type: teaching
semantic_roles: [concept, contrast]
domain: agent_graph_engineering
operations: [contrast_known_sop_vs_novel_work, grow_graph]
problem_type: premature_complete_graph
input_type: novel_feature_or_sop
output_type: growing_vs_compiled_graph_choice
cognitive_level: analyze
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r6
extractor: cursor-grok
module_type: TeachingModule
concept_core: 疆域已知、形狀穩定的 SOP 可先畫圖再編譯成腳本；新需求／未做過的功能無法保證開工前的圖正確——缺漏、牽動、未寫約束往往做到那一步才露。運行中四態（完成／執行／就緒／未輪到）並存是常態。
examples:
  - @alex_frantic：畫 graph → Codex 生成並跑腳本；疆域已知時成立。
  - 定時掃描、模板報告、批量遷移、發版流程可編譯。
hooks: []
limitation: 未給「何時疆域已知」的操作型判準；靠作者經驗對比。
```

## M05 — 運行快照：41 任務圖在 33 個時間點長出來

```yaml
module_id: M05
source_id: PENDING-orca-graph-engineering-aiden
char_span: [2102, 2681]
article_type: analysis
semantic_roles: [evidence]
domain: agent_graph_engineering
operations: [report_runtime_growth, qualify_counts]
problem_type: static_graph_assumption
input_type: local_orca_snapshot
output_type: growth_timeline_evidence
cognitive_level: analyze
is_skill_signal: true
confidence: 0.88
schema_version: v0.3-r6
extractor: cursor-grok
module_type: AnalysisModule
claim: 若「開工前畫完」成立，最大圖應是從 41 起的水平線；實際持續增長 5h10m，且 41 任務落在 33 個創建時間點——圖是長出來的。
evidence:
  - 一個月 570 任務／31 天跨度／15 天動手；作者聲明含試錯重做，不可直接當產能。
  - 成規模依賴編排 4 組共 76 任務（41、15、13、7）；數據 2026-06-26～07-26 本機快照。
  - 開工僅 2 任務；recovery／reverify／correction 類任務可識別為跑後暴露問題才出現。
assumptions:
  - 時間戳證明增長，但不能證明每次增長都對應一次人工判斷。
counterarguments:
  - 晚創建也可能是懶得預寫或例行複驗，不全是 unknown unknowns。
```

## M06 — 開工兩任務：wayfinder 探路，再依回執長圖

```yaml
module_id: M06
source_id: PENDING-orca-graph-engineering-aiden
char_span: [2681, 3195]
article_type: method
semantic_roles: [procedure]
domain: agent_graph_engineering
operations: [wayfind, dispatch_workers, task_create, rewire_deps, escalate]
problem_type: unknown_boundary_at_start
input_type: new_work_request
output_type: iteratively_grown_task_graph
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 開工只寫兩任務：wayfinder（不寫碼，摸邊界與未寫約束，交回「原來不知道的東西」清單）＋第一塊實作。
  - 各派 worker；回 worker_done／結果給 orchestrator。
  - orchestrator 補任務、改依賴、答 ask；多數是 task-create 加兩三個新任務，deps 指向剛完成者。
  - 裁不了才升人類；一輪輪加到沒有新任務。
  - 改圖走介面，變更入庫，供事後查數。
constraints:
  - 時間戳只能證增長，不能證每次增長都是判斷。
  - 編排存本地；非手編靜態圖。
preconditions:
  - 有可改圖的編排介面（作者用 Orca）。
failure_modes:
  - 跳過探路直接大圖開工，重演假前提。
```

## M07 — 假成功：步步綠，前提卻沒人驗

```yaml
module_id: M07
source_id: PENDING-orca-graph-engineering-aiden
char_span: [3195, 3773]
article_type: analysis
semantic_roles: [problem, criterion]
domain: agent_graph_engineering
operations: [define_false_success, contrast_model_review_vs_anchor]
problem_type: false_success_on_unchecked_premise
input_type: task_graph_with_implicit_assumptions
output_type: false_success_diagnosis
cognitive_level: analyze
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: AnalysisModule
claim: graph 只規定先後，不驗前提真假；模型互評（adversarial／多視角／judge panel）仍判模型輸出。假成功＝每步執行與報告為真，但結論建在沒人驗過的前提上。需要與世界接觸的 anchor，以及「哪些節點必須 anchor 放行」的切換判據。
evidence:
  - 「後端和 Runner 已就緒」默認為真、無專責節點。
  - @humzaakhalid：graph 需要 anchor（到帳營收、真執行測試）。
  - @IntuitMachine：量測脫離世界的排程 loop 是「上座率很好的劇場」。
assumptions:
  - 開頭案例因驗收攔住而未變成假成功。
counterarguments:
  - 作者承認既有討論點到「互評≠現實」，但未給切換判據；本文後續才給自己的接法。
```

## M08 — 先驗前提成事實，再看三類證據；沒過就不派發

```yaml
module_id: M08
source_id: PENDING-orca-graph-engineering-aiden
char_span: [3773, 4189]
article_type: method
semantic_roles: [procedure, gate]
domain: agent_graph_engineering
operations: [verify_precondition, collect_evidence, block_downstream]
problem_type: warning_ignored_false_success
input_type: feature_dependencies_and_checks
output_type: gated_dispatch_policy
cognitive_level: apply
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 第一道：把依賴的後端／Runner／配置驗成「真跑過的證據」，不是計劃裡寫了它在；對不上直接停。
  - 再看三類證據：單元測試（資料／方法）、agent-device（端上行為）、系統日誌（時序／權限；日誌鏈本身可靠才算）。
  - 沒過 → 依賴它的任務不派發。
constraints:
  - 只寫報告、等人決定＝警告會被習慣性忽略。
  - 擋下游後只剩兩路：修到過，或明確改判據。
preconditions:
  - 驗收設計允許攔下游（呼應 M00）。
failure_modes:
  - 日誌缺失被誤讀為事件未發生（埋點掛了）。
```

## M09 — 真機連掛三次，催生計劃外修正任務

```yaml
module_id: M09
source_id: PENDING-orca-graph-engineering-aiden
char_span: [4189, 4457]
article_type: case
semantic_roles: [example]
domain: agent_graph_engineering
operations: [device_fail, insert_recovery, reverify]
problem_type: repeated_gate_failure
input_type: agent_device_acceptance_chain
output_type: unplanned_correction_tasks
cognitive_level: analyze
is_skill_signal: true
confidence: 0.92
schema_version: v0.3-r6
extractor: cursor-grok
module_type: CaseModule
context: agent-device 驗收鏈在 03:32／03:39 一帶連掛三次。
actions:
  - 前兩次失敗之間無新任務。
  - 其後診斷插入 P0 恢復實作與交互確認修正（開工時不存在）。
  - 期間另有模塊重實作／複驗；04:41 最終放行。
outcome: 失敗催生原計劃外修正；卡住下游的是設備沒過，不是 reviewer 觀感。
transferability: 說明擋下游＋診斷可把失敗轉成圖上新節點；時間戳為作者本機敘述，未外部核對。
hooks: []
```

## M10 — 漏做無痕：能單獨驗的步驟要拆成獨立節點

```yaml
module_id: M10
source_id: PENDING-orca-graph-engineering-aiden
char_span: [4457, 4749]
article_type: method
semantic_roles: [procedure, diagnosis]
domain: agent_graph_engineering
operations: [detect_silent_omission, split_verifiable_nodes]
problem_type: completed_without_full_checklist
input_type: multi_check_node
output_type: independently_gated_nodes
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 辨識「漏做卻交完成」：未進視野的項不會報錯。
  - 把能單獨驗收的步驟拆成獨立節點，漏一項亮一紅。
  - 任務粒度經驗值約十幾分鐘（作者聲明非定律）。
constraints:
  - 最難漏項是執行者與驗收者都沒檢查到的那一項。
  - 「後端已就緒」類前提若無專責檢查，就會無痕漏掉。
preconditions:
  - 門禁能逐項核驗，否則拆了仍可能無痕。
failure_modes:
  - 切太碎導致協調開銷；作者未給下限，只給經驗尺度。
```

## M11 — 光有 eval 不夠；閉環無法質疑自己的目標

```yaml
module_id: M11
source_id: PENDING-orca-graph-engineering-aiden
char_span: [4749, 5435]
article_type: analysis
semantic_roles: [problem, attributed]
domain: agent_graph_engineering
operations: [locate_rewrite_authority, externalize_goal_check]
problem_type: missing_runtime_graph_authority
input_type: graph_engineering_discourse
output_type: authority_gap_framing
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.93
schema_version: v0.3-r6
extractor: cursor-grok
module_type: AnalysisModule
claim: 既有 Graph Engineering 討論多未說清「運行中誰能增刪任務、改依賴」。預置 approval 節點≠運行時改圖權。控制回路可遷移判斷：loop 無法質疑自己的 reference，錯目標會被更徹底地達成。
evidence:
  - 列舉 Hamza／Carlos／Mike／LangGraph 等文未談運行中改圖權。
  - @IntuitMachine 控制回路引文。
assumptions:
  - 「權」包含下游停／加節點／拍板，不只是知道不對。
counterarguments:
  - 作者對他文的概括未附逐文引證頁；屬閱讀筆記級歸因。
```

## M12 — 放行權不在幹活的 agent；三層才浮到人

```yaml
module_id: M12
source_id: PENDING-orca-graph-engineering-aiden
char_span: [5435, 5918]
article_type: method
semantic_roles: [procedure, gate]
domain: agent_graph_engineering
operations: [gate_release, adjudicate_proposal, escalate_to_human]
problem_type: self_approved_work
input_type: worker_outputs_and_proposals
output_type: layered_authority_policy
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - gate：條件不滿足就卡住，依賴任務不得開始；放行權不在執行 agent，判據也不是「它自己覺得可以」。
  - 提案裁決可改推薦（例：局部新建驗收流程 → 改公共流程庫；A→A′）。
  - 提交前須出示三輪獨立複核結果再申請放行。
  - 上浮：worker → orchestrator → 人類；人類只盯需要裁決的一欄。
constraints:
  - 改對一次不代表次次對。
  - 人類介入應是例外，不是每步審。
preconditions:
  - 有獨立於 worker 的裁決端（orchestrator／人類）。
failure_modes:
  - 預畫 approval 節點卻無運行時改圖權，仍解決不了 M11 的缺口。
```

## M13 — 失敗先診斷；三輪熔斷；錯前置就整段 superseded

```yaml
module_id: M13
source_id: PENDING-orca-graph-engineering-aiden
char_span: [5918, 6612]
article_type: method
semantic_roles: [procedure, failure_policy]
domain: agent_graph_engineering
operations: [diagnose, repair, reverify, circuit_break, supersede]
problem_type: blind_rerun_after_failure
input_type: failed_verification
output_type: local_fix_or_segment_rewrite
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 失敗後先搞清楚為什麼，不要原地重跑（失敗資訊＝地圖與疆域對不上處）。
  - 診斷→修→再 verify，同一套機器證據；最多三輪，再不過上報 orchestrator。
  - 與 Orca dispatch 熔斷區分：後者數同一任務連續派發失敗。
  - 多數局部調整：改實作或改判據。
  - 若前置任務本身錯：整段作廢，按新理解重起圖；superseded 須留記錄。
constraints:
  - 作者聲明本月未觸發自己設的三輪上限；該段是流程設定非已發生結果。
preconditions:
  - 有可復用的機器證據鏈（呼應 M08／M09）。
failure_modes:
  - 只重跑會第四次掛，因為缺的是上游恢復步驟。
```

## M14 — 何時改圖：機器證據觸發，orchestrator 裁定

```yaml
module_id: M14
source_id: PENDING-orca-graph-engineering-aiden
char_span: [6612, 7191]
article_type: method
semantic_roles: [procedure, synthesis]
domain: agent_graph_engineering
operations: [decide_graph_edit, use_machine_evidence]
problem_type: knowing_when_to_rewrite
input_type: gate_failures_and_diagnostics
output_type: graph_edit_or_hold
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 前提無人驗、真機撞破 → 補前置 gate。
  - 同一 gate 連敗 → 先診斷；僅證據指向上游才動圖。
  - 診斷指向上游 → 重新接線。
  - spec 禁止項命中 → 不再走舊路。
  - 機器證據產生「該不該改」的判斷材料；改哪條邊仍由 orchestrator 裁定。
constraints:
  - 少了 eval，能改圖只會讓錯改得更快。
  - 「依賴須先驗證成事實」可沉澱為每單第一道 gate；作者無跨月數據證明問題變少。
preconditions:
  - graph／eval／權三件已接上（M02）。
failure_modes:
  - 把「圖會自己長」誤認成自我修復，忽略 eval 位置靠前。
```

## M15 — 跑得遠≠跑得對；agent-device 不是 eval

```yaml
module_id: M15
source_id: PENDING-orca-graph-engineering-aiden
char_span: [7191, 7827]
article_type: analysis
semantic_roles: [conclusion, boundary]
domain: agent_graph_engineering
operations: [restate_triad, define_eval_components, bound_statemachine_vs_live_graph]
problem_type: mistaking_tooling_for_evaluation
input_type: long_task_system_design
output_type: eval_definition_and_tool_boundary
cognitive_level: evaluate
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: AnalysisModule
claim: graph 讓 agent 跑得遠（並行可更快），但不等於跑得對。長任務還需 eval 與明確改圖權；最易被看輕的是 eval。agent-device／computer-use 只是接觸真環境的手段；真正的 eval＝可驗證架構錨點＋任務約束＋判據與阻塞範圍——皆需人寫。穩定步驟可寫死狀態機；未定任務／依賴應留活口。
evidence:
  - 結語重述三件套。
  - 作者自述花在 eval 約束上的工夫多於編排。
  - 與 @PawelHuryn 狀態機主張的分歧邊界。
  - Orca：運行中改圖／提問寫回；worktree 隔離並行。
assumptions:
  - 「人寫約束」是現階段必要條件，非永遠不可半自動。
counterarguments:
  - Orca 推薦屬工具選擇，非通用必然；可遷移的是改圖介面與隔離執行，而非品牌。
```
