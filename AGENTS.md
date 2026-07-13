# HS_LearnEdge — Agent 入口

- 全程使用中文，簡潔、無鋪墊、無重複問題。
- 規範衝突時，以 `Library/CURRENT.md` 指向的 canonical 規範為準；不讀 archive。
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