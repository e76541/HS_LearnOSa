# 技能登記簿資料字典

本字典實作 `Library/規範/40-技能登記層.md`；英文欄位和值為儲存真值，中文只供說明。

## 共通約定

- JSONL：每行一個完整 JSON 物件；空行忽略。
- 時間：UTC RFC 3339，例如 `2026-07-14T00:00:00Z`。
- 字元區間：先將 CRLF 正規化為 LF，再以 Unicode 字元零起算半開區間 `[start,end)` 計算。
- ID：無語義、按各類型單調遞增，已配發 ID 不重用。
- 正式真值：`nodes.jsonl`、`edges.jsonl`、已核准的 `alignments.jsonl`。
- 流轉與稽核：`pending.jsonl`、`reviews.jsonl`、`events.jsonl`；不是模塊圖或登記圖。

## 資料表

| 表 | 主鍵 | 用途 | 重要限制 |
|---|---|---|---|
| `nodes` | `node_id` | 技能節點真值 | 熟練度只可由具名人工更新 |
| `edges` | `edge_id` | 已核准登記邊 | 只准 `broader_than`；兩端皆為 SkillNode |
| `alignments` | `alignment_id` | 對齊裁決與回放記錄 | 不是圖邊；背景及非技能訊號不得寫入 |
| `pending` | `pending_id` | 拒絕對齊後的待建槽 | 保存 ModuleCore 投影供聚類；不得自動升格 SkillNode |
| `reviews` | `review_id` | 分開保存 `suggestion`、人工 `decision` 及理由 | 模型信心不等於人工通過 |
| `events` | `event_id` | 追加式稽核事件 | 不存評分證據本體 |

## ID 前綴

| 類型 | 前綴 | 範例 |
|---|---|---|
| SkillNode | `SKILL-` | `SKILL-000001` |
| RegistryEdge | `REGEDGE-` | `REGEDGE-000001` |
| AlignmentRecord | `ALIGN-` | `ALIGN-000001` |
| PendingRecord | `PENDING-` | `PENDING-000001` |
| ReviewRecord | `REVIEW-` | `REVIEW-000001` |
| AuditEvent | `EVENT-` | `EVENT-000001` |

## ModuleCore 投影

`align(module)` 只讀 ModuleCore。`is_skill_signal: false`、`semantic_roles` 含 `background`，或缺少 ModuleCore 必填欄位時 fail closed。型別本體、正文、hooks 與模塊邊不得進入匹配資料。

`module_ref` 僅含 `source_id`、`module_id`、`char_span`。Alignment 另保存 `module_eligibility`（`is_skill_signal`、`semantic_roles`）與投影指紋，供離線驗證背景排除規則；這不是新增 ModuleCore 欄位。

## Fixture 來源

- `alignment-cases.json` 的 `same`、`related`、`reject` 正常樣本取自 `DOC/Review/how-to-make-company-ai-native/modules.md`，預期值為本次人工基準。
- 該文件沒有背景或純填充模塊；`invariant-cases.json` 中這兩類負例為合成資料，並以 `fixture_origin: synthetic` 明標。
