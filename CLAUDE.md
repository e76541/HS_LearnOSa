# HS_LearnEdge — Claude 入口

- 全程使用中文，簡潔、無鋪墊、無重複問題。
- 規範衝突時，以 `Library/CURRENT.md` 指向的 canonical 規範為準；不讀 archive。
- 依工作選讀 `.agents/skills/` 中的單一 Skill；不要用 `@` 預載全部規範。

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