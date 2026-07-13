# 交接：Library SKILL 化

- 內容 commit：`f4c96aa`
- 分支：`codex/library-skill-migration`
- 日期：2026-07-13

## 完成內容

- 以 Library v0.3 r1 為準，建立 `Library/CURRENT.md`、八個 canonical 規範分檔與唯讀 archive 快照。
- 建立完整備查文件 `Library/Agent技能化運作流程.md`。
- 建立八個按需讀取 Skill：收錄、模塊化、結構、知識視圖、練習、演講、技能登記、管線驗證。
- `AGENTS.md`、`CLAUDE.md` 改為短入口；舊 `.agents` 專題規範改為 Skill 導向。
- 移除根目錄 v0.2 規範；衝突時以 `CURRENT.md` 指向的 canonical 新規範為準。

## 改名規則

- canonical 規範檔改名：只更新 `Library/CURRENT.md` 的映射。
- `Library/` 與 `CURRENT.md` 是固定入口；若改名，必須同步更新所有 Agent／Skill 並跑完整驗證。

## 驗證

- 八個 Skill 均通過 `quick_validate.py`。
- frontmatter 僅含 `name`、`description`。
- 每個 Skill 均引用 `Library/CURRENT.md`，且不寫死 `Library/規範` 實體路徑。
- `CURRENT.md` 八個映射皆可解析；Agent 入口含八個 Skill；`git diff --check` 通過。

## 後續

- 新規則只改 canonical 分檔，同步更新 `CURRENT.md` 版本資訊。
- 達成三十篇基準與至少兩篇演講試跑前，不開 v0.4。
