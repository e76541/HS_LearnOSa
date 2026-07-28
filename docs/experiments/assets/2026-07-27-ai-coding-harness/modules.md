# 候選模塊草模（試作）

`ACH-Cxx` 只供本報告引用，不是正式 `module_id`。`char_span` 對齊同目錄 `source.txt`（零起點、右界不含）。共同核心投影：文章類型＝AI 編程工具架構對照；領域＝Agent Harness 選型；輸入＝場景痛點／風險／成本／協作形態；輸出＝基因對齊的選型判準；`schema_version=v0.3-r6`、`extractor=usage-loop-spike-2026-07-27`。列 `is_skill_signal=true` 者不表示文中產品事實已核對。

## 候選分流（discard）

| `char_span` | `claim_kind` | `retention` | 原因 |
|---|---|---|---|
| `[0,66)` | `none` | `discard` | 標題＋發布日，來源中繼資料 |
| `[375,474)` | `none` | `discard` | Claude 小節標題＋導入句骨架，無獨立命題 |
| `[3358,3449)` | `none` | `discard` | 「總結」導航句，非獨立命題 |
| `[3971,3987)` | `none` | `discard` | 「本文 100% 由 AI 生成」元說明，不支撐技能命題 |

記憶禁項：原文貼文中的訂閱表單／社群 CTA 未納入 `source.txt`。

## 模塊表

| 候選 | `char_span` | `claim_kind` | `provenance` | `support_status` | 類型 | 主要命題／型別重點 | 抽取信心 |
|---|---:|---|---|---|---|---|---:|
| ACH-C00 | `[66,375)` | `interpretation` | `primary` | `unverified` | AnalysisModule | 表面都是多 Agent 函數呼叫循環，生產落地卻是四條路：工程路徑、狀態同步與未來假設各異，背後是產品基因與設計信仰。 | 0.97 |
| ACH-C01 | `[474,743)` | `verifiable_claim` | `secondary` | `unverified` | MethodModule | Claude Code 樹狀派生：預設深度 3（可至 5）；`--forward-subagent-text` 按 tool_use ID 上回傳，隔離＋可追蹤。版本與參數名未核對。 | 0.90 |
| ACH-C02 | `[743,977)` | `advice` | `secondary` | `unverified` | MethodModule | Agent Teams（實驗開關）改點對點；`tasks.md` 共享帳本承載狀態／領取／依賴，供搶佔與交接。 | 0.94 |
| ACH-C03 | `[977,1219)` | `advice` | `secondary` | `unverified` | MethodModule | Dynamic Workflows 依依賴圖規劃規模與順序；建議單次協同 ≤15，可覆寫。基因＝樹／網之間的通信陣列。 | 0.93 |
| ACH-C04 | `[1219,1687)` | `advice` | `secondary` | `unverified` | MethodModule | Codex Multi-Agent V2：任務與推理親和度匹配；子 Agent 可指定模型與 low／medium／high，並限並發。對比「全繼承主模型」的浪費。 | 0.95 |
| ACH-C05 | `[1687,1919)` | `advice` | `secondary` | `unverified` | CaseModule | 大範圍重構：high 做跨模塊架構／型別；low 批量改 import／測試；`/import` 灌入規範與記憶。結果為作者敘述，無量測。 | 0.92 |
| ACH-C06 | `[1919,2449)` | `advice` | `secondary` | `unverified` | MethodModule | Cursor：Composer＋Agent Mode；模型無偏見（體驗與底層模型解耦）；執行循環綁定編輯區、未存分頁、`.cursor/rules`、`state.vscdb`。 | 0.94 |
| ACH-C07 | `[2449,2659)` | `advice` | `secondary` | `unverified` | MethodModule | Merkle Tree 倉庫索引支撐多 Agent 局部改檔與預覽；追求無感流暢，調度細節隱於 IDE。 | 0.91 |
| ACH-C08 | `[2659,2979)` | `advice` | `secondary` | `unverified` | MethodModule | Antigravity 基因＝謀定而後動；Planning Mode 先產結構化 Plan，經 Proceed Gate 批准才改碼。 | 0.96 |
| ACH-C09 | `[2979,3118)` | `advice` | `secondary` | `unverified` | MethodModule | 一等產物引擎寫入 `brain/`；完整 `transcript.jsonl` 保留思考／工具／報錯。 | 0.93 |
| ACH-C10 | `[3118,3358)` | `advice` | `secondary` | `unverified` | MethodModule | `invoke_subagent`＋Git Worktree（share）：獨立工作目錄、共享倉庫，降磁碟與並發衝突。 | 0.94 |
| ACH-C11 | `[3449,3861)` | `advice` | `primary` | `provided` | MethodModule | 選型矩陣：長鏈動態分工→Claude；成本吞吐→Codex；編輯器無感→Cursor；高風險審計／顯式規劃→Antigravity。 | 0.98 |
| ACH-C12 | `[3861,3971)` | `advice` | `primary` | `provided` | TeachingModule | 無銀彈；看清基因與信仰，才不被 Multi-Agent 行銷遮眼，選出匹配代碼庫與團隊習慣的解法。 | 0.97 |

無背景模塊：各節皆直接支撐選型技能；標題／總結導航／AI 生成聲明已 discard。
