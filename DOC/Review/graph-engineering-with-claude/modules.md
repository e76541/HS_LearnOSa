# Modules — Graph Engineering with Claude

> `char_span` 以 `source.md` 的 Unicode 字元零起算、半開區間 `[start,end)` 計算。模塊是索引面；下游取材須依區間回原文。
> 對齊先前截圖試作候選 C00–C14（見 `docs/experiments/2026-07-21-graph-engineering-ingest-spike.md`）；本次以純文字重跑正式模塊化。

## Source record

```yaml
source_id: PENDING-graph-engineering-with-claude
title: "Graph Engineering with Claude: 14-Step roadmap from 0 to graph architect (Full Course)"
source_kind: user_pasted_article
schema_version: v0.3-r6
extractor: cursor-grok
source_char_length: 19690
prior_spike: docs/experiments/2026-07-21-graph-engineering-ingest-spike.md
```

## CandidateDisposition（建立前）

| 區間／簇 | claim_nature | source_tier | support | retention | 結果 |
|---|---|---|---|---|---|
| 訂閱呼籲 `Follow my Substack…` | 純填充 | 作者行銷 | — | discard | 不建模塊；原文仍在 M00 區間內可忽略 |
| 導言＋14 步＋結論 | 可遷移方法／概念 | 教學貼文 | 正文＋程式例 | retain | 建 M00–M15 |
| 「Six graphs…」例束 | 跨宿主例示 | 同文 | 例示上文方法 | retain（附屬） | **不獨立建模塊**；作例證區間，見文末 |

---

## M00 — 工作形狀是圖，不是直線

```yaml
module_id: M00
source_id: PENDING-graph-engineering-with-claude
char_span: [0, 1392]
article_type: teaching
semantic_roles: [background, motivation, concept]
domain: agent_graph_engineering
operations: [problem_framing, shape_distinction]
problem_type: linear_multi_step_agents
input_type: multi_step_agent_attempts
output_type: graph_shape_framing
cognitive_level: understand
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r6
extractor: cursor-grok
module_type: TeachingModule
concept_core: 多步 Agent 常被建成單線佇列；真正決定規模的是工作形狀——誰先誰後、誰可並行、誰必須等待——亦即圖。節點負責思考，邊搬運結果；編排可用程式（dynamic workflow）而非對話輪次，協調本身可不耗模型 token。
examples:
  - 直線：一步等一步，半數步驟其實無資料依賴。
  - Claude Code dynamic workflows：JS 編排腳本＋子 Agent 艦隊。
hooks:
  - kind: formula
    char_span: [900, 980]
    note: "A prompt is a sentence. A loop is a cycle. A harness is the floor."
limitation: 產品細節（Claude Code／dynamic workflows）可能隨版本變動；可遷移主張是「工作形狀＝圖」。
```

## M01 — 節點是工作；邊只在資料流動時存在

```yaml
module_id: M01
source_id: PENDING-graph-engineering-with-claude
char_span: [1392, 2445]
article_type: teaching
semantic_roles: [concept, criterion]
domain: agent_graph_engineering
operations: [define_node, define_edge, test_dependency]
problem_type: false_sequential_edges
input_type: agent_step_sequence
output_type: real_vs_fake_dependency
cognitive_level: analyze
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r6
extractor: cursor-grok
module_type: TeachingModule
concept_core: 圖只有兩物：節點＝有界單一工作（一 Agent、一輸入、一輸出）；邊＝依賴，表示上游輸出餵入下游輸入。把「然後」當邊是錯誤；下一動若不讀上一動輸出，就沒有邊，等待是浪費。
examples:
  - 「摘要檔案然後查天氣」兩節點無邊，不應串成鏈。
  - 畫方框與箭頭：箭頭＝變數從回傳進入下一 prompt；畫不出箭頭＝可獨立並行。
hooks: []
limitation: 未定義「隱式共享狀態」是否算資料流動；契約化見 M03。
```

## M02 — 線性腳本是退化圖；重畫並砍假箭頭

```yaml
module_id: M02
source_id: PENDING-graph-engineering-with-claude
char_span: [2445, 3241]
article_type: method
semantic_roles: [procedure, diagnosis]
domain: agent_graph_engineering
operations: [redraw_chain, cut_false_edges]
problem_type: fragile_linear_agent
input_type: linear_agent_script
output_type: wider_independent_fan_in_graph
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 把「A then B then C then D」視為單鏈退化圖。
  - 對每條箭頭問 M01：下一動是否讀上一動輸出。
  - 砍掉不傳資料的假箭頭，讓獨立節點可並行，再餵入真正需要全集的節點。
constraints:
  - 鏈正確但慢且脆：中間卡住則下游永不跑、上游成果被困。
limitation: 作者未給量化閾值（假箭頭占比）；重畫後並行細節見 M05。
```

## M03 — 每個節點要有契約

```yaml
module_id: M03
source_id: PENDING-graph-engineering-with-claude
char_span: [3241, 4644]
article_type: method
semantic_roles: [procedure, contract]
domain: agent_graph_engineering
operations: [bound_io, schema_validate]
problem_type: unreasoned_nodes_block_parallelism
input_type: agent_job_spec
output_type: validated_structured_result
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 契約＝有界輸入、有界輸出、恰好一項工作。
  - 輸入顯式傳入，不從共享 window 假設。
  - 輸出用 schema 驗證（工具層重試），供下游消費而非人工讀自由文本。
constraints:
  - 無法推理的節點無法並行化。
  - 僅人類可讀的輸出不能穩接進圖。
limitation: schema 粒度與領域詞表未給通用範本。
```

## M04 — 邊是資料契約；純轉換用程式碼

```yaml
module_id: M04
source_id: PENDING-graph-engineering-with-claude
char_span: [4644, 5712]
article_type: method
semantic_roles: [procedure, cost_discipline]
domain: agent_graph_engineering
operations: [name_edge_by_shape, reduce_in_code]
problem_type: agent_used_as_plumbing
input_type: node_output_shapes
output_type: free_deterministic_edge_transform
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 邊命名依資料形狀，不依順序；形狀不變則可替換兩端節點。
  - flatten／dedupe／filter 等 reduce 用純 JS／程式碼，不呼叫 Agent。
  - 把 Agent 留給判斷，不留給接管線。
constraints:
  - 每條邊都是 Agent＝為接線付租金。
limitation: 何時「合併」升格為需要判斷的合成節點，界限靠嗅覺；見 M06／M07。
```

## M05 — 以 parallel() 做 fan-out

```yaml
module_id: M05
source_id: PENDING-graph-engineering-with-claude
char_span: [5712, 7388]
article_type: method
semantic_roles: [procedure, parallelism]
domain: agent_graph_engineering
operations: [fan_out, filter_nulls]
problem_type: independent_work_chained
input_type: N_independent_jobs
output_type: concurrent_result_array
cognitive_level: apply
is_skill_signal: true
confidence: 0.98
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 對 N 個獨立節點用 parallel() 一次 fan-out，而非串鏈。
  - parallel 是 barrier：全部 thunk 結束才回傳完整集合。
  - 失敗 thunk → null；一律 .filter(Boolean)；超量佇列仍會跑完。
  - 編排在程式碼，母上下文不裝下全部來源。
constraints:
  - 僅適用互不依賴的節點。
  - 並發有上限，多餘排隊。
limitation: 產品 API 名 parallel() 綁 Claude Code；原則可遷移。
```

## M06 — 在 barrier 做 fan-in

```yaml
module_id: M06
source_id: PENDING-graph-engineering-with-claude
char_span: [7388, 8557]
article_type: method
semantic_roles: [procedure, barrier_discipline]
domain: agent_graph_engineering
operations: [fan_in, decide_barrier]
problem_type: unnecessary_global_waits
input_type: fan_out_results
output_type: whole_set_judgment_or_inline_edge
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - fan-out 後必須有收斂點才有用。
  - 僅當階段真需要「全部先前結果一起」時用 barrier（跨源去重、排序、空集早退）。
  - 無跨項依賴的 transform 應 inline 當邊，或改 pipeline，勿多此一關。
constraints:
  - parallel → transform → parallel 且中間無跨項依賴＝應跳過 barrier。
limitation: 與 M13 pipeline 判準重疊，應合併閱讀。
```

## M07 — diamond：split → work → merge

```yaml
module_id: M07
source_id: PENDING-graph-engineering-with-claude
char_span: [8557, 9321]
article_type: teaching
semantic_roles: [concept, topology]
domain: agent_graph_engineering
operations: [recognize_diamond, fanout_reduce_synthesize]
problem_type: scaling_by_adding_steps
input_type: serious_multi_agent_jobs
output_type: reusable_diamond_skeleton
cognitive_level: understand
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r6
extractor: cursor-grok
module_type: TeachingModule
concept_core: 嚴肅 Agent 圖的主力拓撲是 diamond：一點拆分、多點並行、一點合併。標準口訣 fan out → reduce → synthesize；換來源與 prompt 即可複用。問題從「怎麼多加步驟」變成「拆在哪、合在哪」。
examples:
  - 市場掃描、依賴審計、code review、研究報告。
  - 文末六例多為此骨架的變體（見例證區間，非獨立模塊）。
hooks: []
limitation: reduce 與 synthesize 的責任切分依任務；細節見 M04／M06。
```

## M08 — 執行期條件路由

```yaml
module_id: M08
source_id: PENDING-graph-engineering-with-claude
char_span: [9321, 10742]
article_type: method
semantic_roles: [procedure, control_flow]
domain: agent_graph_engineering
operations: [classify_then_branch, code_owned_routing]
problem_type: emergent_skipped_paths
input_type: validated_node_output
output_type: deterministic_downstream_path
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - router 節點檢視結果，決定下游路徑（如 diff 風險高低）。
  - 判斷可用 Agent；選邊必須是腳本 if／switch（控制流在程式碼）。
  - 同一分類每次走同一路徑，避免「模型偷偷跳過審計」。
constraints:
  - 跳過某路徑必須寫進圖，不能靠對話湧現。
limitation: 分類錯誤會穩定走錯邊；需搭配 M09 驗證。
```

## M09 — 邊上放 verifier

```yaml
module_id: M09
source_id: PENDING-graph-engineering-with-claude
char_span: [10742, 11720]
article_type: method
semantic_roles: [procedure, confidence]
domain: agent_graph_engineering
operations: [adversarial_verify, diverse_lens_verify, judge_panel]
problem_type: unverified_findings_downstream
input_type: candidate_finding
output_type: surviving_finding_or_drop
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - verifier 坐在邊上下游放行前，任務是嘗試殺死發現；活下來才通過。
  - 三種模式：多數對抗 skeptic；多視角（正確性／安全／可重現）；評審團多草稿再合成。
constraints:
  - 圖的槓桿是結構帶來的信心，不是堆更多 Agent。
limitation: N 與門檻未給通用數值；成本見 M12。
```

## M10 — 隔離節點以免失敗毒化圖

```yaml
module_id: M10
source_id: PENDING-graph-engineering-with-claude
char_span: [11720, 12559]
article_type: method
semantic_roles: [procedure, isolation]
domain: agent_graph_engineering
operations: [contain_failure, worktree_sandbox]
problem_type: cascade_and_write_collision
input_type: parallel_writing_agents
output_type: contained_partial_success
cognitive_level: apply
is_skill_signal: true
confidence: 0.95
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 鏈中失敗會級聯；圖中失敗應困在節點（null + filter）。
  - fan-in 容忍缺輸入，不假設全集。
  - 並行寫檔用 git worktree／sandbox；僅在真並行寫入時使用，不當預設稅。
constraints:
  - 隔離是安全帶，不是每趟預設成本。
limitation: 合併衝突解決流程未展開。
```

## M11 — 受控回圈並收斂

```yaml
module_id: M11
source_id: PENDING-graph-engineering-with-claude
char_span: [12559, 14318]
article_type: method
semantic_roles: [procedure, convergence]
domain: agent_graph_engineering
operations: [loop_until_dry, dedupe_against_seen]
problem_type: unknown_size_discovery
input_type: open_ended_finder_jobs
output_type: converged_confirmed_set
cognitive_level: apply
is_skill_signal: true
confidence: 0.96
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 未知規模探索用受控回邊；loop-until-dry：連續 K 輪無新發現則停。
  - 去重對照 everything seen，不只 confirmed；否則被拒項每輪重現、永不乾。
  - 新發現可再套多視角 verify 後才進 confirmed。
constraints:
  - 不收斂的回圈會燒光預算。
limitation: K 的選擇依領域；示例用 dry<2。
```

## M12 — 跨節點分層模型

```yaml
module_id: M12
source_id: PENDING-graph-engineering-with-claude
char_span: [14318, 15234]
article_type: method
semantic_roles: [procedure, cost]
domain: agent_graph_engineering
operations: [tier_models_by_judgment]
problem_type: uniform_expensive_billing
input_type: heterogeneous_node_graph
output_type: economical_model_routing
cognitive_level: apply
is_skill_signal: true
confidence: 0.94
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 重複有界節點用便宜模型；判斷／合成節點用貴模型。
  - 預設子 Agent 繼承 session 模型；單呼叫可覆寫。
  - 大跑前檢查／路由 fan-out 向下、merge 向上。
constraints:
  - 形狀不變也能降成本。
limitation: 產品指令（/model）綁 Claude Code。
```

## M13 — 拓撲決定成本與延遲

```yaml
module_id: M13
source_id: PENDING-graph-engineering-with-claude
char_span: [15234, 16093]
article_type: method
semantic_roles: [procedure, latency]
domain: agent_graph_engineering
operations: [choose_pipeline_vs_barrier]
problem_type: barrier_latency_waste
input_type: multi_stage_item_flows
output_type: lower_wall_clock_topology
cognitive_level: apply
is_skill_signal: true
confidence: 0.97
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 圖形狀是 wall-clock 最大槓桿。
  - parallel() barrier 等最慢者；pipeline() 讓快項先走完各階段。
  - 預設 pipeline；僅真需全集時用 barrier。「程式較乾淨」不是理由。
constraints:
  - Separate ≠ synchronized。
limitation: 與 M06 判準應交叉使用。
```

## M14 — 讓 Claude 自畫圖（self-routing）

```yaml
module_id: M14
source_id: PENDING-graph-engineering-with-claude
char_span: [16093, 17539]
article_type: method
semantic_roles: [procedure, dynamic_orchestration]
domain: agent_graph_engineering
operations: [dynamic_workflow, save_rerun]
problem_type: unplannable_upfront_jobs
input_type: objective_description
output_type: run_specific_orchestration_graph
cognitive_level: apply
is_skill_signal: true
confidence: 0.93
schema_version: v0.3-r6
extractor: cursor-grok
module_type: MethodModule
procedure:
  - 無法預先規劃時，描述目標讓 Claude 寫編排腳本並派出艦隊。
  - 入口：提示含 workflow；跑內建／已存圖（如 /deep-research）；或 ultracode 自動規劃。
  - 好跑可存進 .claude/workflows/ 版本控管、按名重跑。
constraints:
  - 仍需節點契約與邊資料流（見依賴邊）。
limitation: 高度產品綁定；可遷移點是「動態生成本次圖」。
```

## M15 — 結論：架構師畫圖

```yaml
module_id: M15
source_id: PENDING-graph-engineering-with-claude
char_span: [19043, 19690]
article_type: analysis
semantic_roles: [summary, motivation]
domain: agent_graph_engineering
operations: [restate_thesis]
problem_type: linear_ceiling_misread
input_type: graph_engineering_lessons
output_type: architect_vs_prompter_framing
cognitive_level: understand
is_skill_signal: false
confidence: 0.90
schema_version: v0.3-r6
extractor: cursor-grok
module_type: AnalysisModule
claim: 線性 Agent 不是天花板，只是第一個形狀；看見節點與邊之後，應讓圖在獨立處扇出、在信心處閘門、在非判斷處降模型，而不是逼單一 Agent 多做步驟。
evidence:
  - 結論重述導言論點並收束 fan-out／gate／tier 三槓桿。
assumptions:
  - 讀者已吸收 M01–M14 的方法簇。
counterarguments:
  - 未比較「小任務維持直線」的合理性門檻。
```

---

## 不獨立建節點的區間

| 區間 | 處置 |
|---|---|
| `[519, 579)` Substack 呼籲 | `retention=discard` 純填充 |
| `[17539, 19043)` Six graphs | 例證束：附屬 M07／M05／M09／M08／M11 等，不另切六個 Case 模塊 |

## 統計

- 已建立模塊：16（M00–M15）
- 技能訊號：M00–M14 為 true；M15 為 false（總結／動機）
- 背景：無單獨 background-only；M00 含 motivation＋concept
