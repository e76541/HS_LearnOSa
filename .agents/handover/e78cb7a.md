# 交接：DOC 儲存流向與知識視覺化設計

- 內容 commit：`e78cb7a`
- 分支：`codex/library-skill-migration`
- 日期：2026-07-13

## 完成內容

- 定義未完成來源留在 `Inbox/`，完成後依裁決轉入 `DOC/Stocks/`、`DOC/Archive/` 或 `DOC/Review/`，並以 `DOC/INDEX.md` 作人工查找入口。
- 更新 ingest Skill，使移動資料夾與索引更新同次完成；不確定項以 `needs_review` 與 `review_reason` 保留。
- 建立 `How to Make a Company AI-Native` 的 Review 範例，包含來源、模塊、結構邊與處理發現。
- 完成 React 知識視覺化設計：管線儀表板，以及焦點鄰域、全圖聚光鏡、論證分層三種共享狀態的圖譜模式。
- 在 `AGENTS.md` 明定「交接」為完成、驗證、內容提交、版本化交接、交接提交與推送的完整指令；臨時 handoff 不得取代專案交接。

## 關鍵檔案

- `docs/superpowers/specs/2026-07-13-knowledge-visualizer-design.md`
- `DOC/INDEX.md`
- `DOC/Review/how-to-make-company-ai-native/`
- `Library/規範/60-文本身份與術語.md`
- `.agents/skills/ingest-text/SKILL.md`

## 驗證

- `git diff --check` 通過。
- `AGENTS.md` 僅新增兩條交接觸發規則。
- 知識視覺化目前只有已提交設計規格，尚未建立 React 前端。

## 後續

- 先請使用者確認知識視覺化書面規格。
- 規格獲准後使用 writing-plans 產生實作計畫，再建立 React + TypeScript + Vite + React Flow 前端。
- SRC-002 尚無正式 repo 標註產物；不得把對話乾跑結果當正式資料。
