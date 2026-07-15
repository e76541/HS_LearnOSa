# HS_LearnEdge — Agent 入口

- 全程使用中文，簡潔、無鋪墊、無重複問題。
- 規範衝突時，以 `Library/CURRENT.md` 指向的 canonical 規範為準；不讀 archive。
- 草案狀態查 `docs/INDEX.md`。
- 整體事項查 `docs/management/overview.md`；推進順序與阻塞查 `docs/management/roadmap.md`。
- 協作偏好查 `docs/management/preferences.md`；未升格討論結論查 `docs/management/decisions.md`。
- 使用者單獨輸入下列詞時，只顯示可在 Codex 直接點開的對應本機文檔連結，不摘要、不改寫、不延伸；不得以反引號或純文字路徑呈現。
- 下列詞彙出現時，優先讀取對應本機文檔；後續回覆與追問均須以該文本內容為依據，不得僅憑檔名、索引或推測回答。

| 詞彙 | 文檔路徑 |
|---|---|
| 總覽 | `docs/management/overview.md` |
| 藍圖 | `docs/management/blueprint.md` |
| 近期交接 | `docs/management/handover.md` |
| 路線 | `docs/management/roadmap.md` |
| 偏好 | `docs/management/preferences.md` |
| 討論結論 | `docs/management/decisions.md` |

- 只讀本次工作需要的 Skill，不要一次載入全部 Library。
- 使用者說「交接」時，視為完整交付指令：完成並驗證本次範圍、提交內容、依 `.agents/handover.md` 建立版本化交接與索引、提交交接、推送目前分支。
- 除非使用者明說「只產生臨時交接摘要」，不得以通用 handoff Skill 的臨時檔流程取代專案交接。

| 工作 | Skill |
|---|---|
| 收錄與文本 ID | `.agents/skills/ingest-text/SKILL.md` |
| 模塊化 | `.agents/skills/modularize-text/SKILL.md` |
| 結構與邊 | `.agents/skills/extract-structure/SKILL.md` |
| 知識視圖 | `.agents/skills/render-knowledge-views/SKILL.md` |
| 練習生成 | `.agents/skills/generate-practice/SKILL.md` |
| 演講場次 | `.agents/skills/run-speaking-session/SKILL.md` |
| 技能登記 | `.agents/skills/manage-skill-registry/SKILL.md` |
| 管線驗證 | `.agents/skills/validate-learning-pipeline/SKILL.md` |

接手或推送時讀 `.agents/handover.md`。完整運作方式見 `Library/Agent技能化運作流程.md`。