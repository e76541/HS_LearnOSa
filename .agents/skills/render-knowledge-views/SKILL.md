---
name: render-knowledge-views
description: Use when rendering HS_LearnEdge modules and edges as a concept map, mind map, presentation, slide deck, speaker notes, or other Dynamic View.
---

# 知識視圖渲染

## 規範定位

1. 先讀 `Library/CURRENT.md`，解析 `design-principles`、`module-layer`、`structure-layer`、`practice-layer`。
2. 不讀 archive；不寫死規範實體檔名。

## 核心界線

- 正式儲存物是概念圖：模塊節點加有類型、有方向的模塊層邊。
- 心智圖、講稿、投影片都是 `Dynamic View`，是圖的有損投影；投影永不回灌模塊化管線。
- 使用者編輯投影只改展示物。若要改正式資料，必須提供可溯源的來源證據，重新走收錄、模塊化與抽邊流程。

## 渲染

1. 從合規子圖開始，不從視覺版面反推結構；登記層 `broader_than` 不混入模塊論證圖。
2. 節點文字以中文人話標題顯示，`module_id` 只作溯源。需要原味正文或素材時，回 `char_span` 取材，不以模塊摘要代替。
3. 每段正文記錄來源模塊與字元區間；每句銜接語記錄來源邊。沒有溯源的內容不可當作圖內事實。
4. 心智圖只作瀏覽投影；不得把被省略的方向、類型、機制或順序視為正式資料。
5. 投影片遵守一頁一模塊、換頁一條邊；頁面只放人話標題與素材錨，其他內容置於備忘稿層。
6. 背景模塊只在與鏈端點有邊相連時可供渲染；不可進對齊、當圖式主體或考點，使用情況另記而不計語義分。
7. 產出附溯源清單：視圖元素 → `module_id`／`char_span`／edge ID。視圖丟棄或重做不影響正式圖。

## 驗收

檢查每個節點、正文、素材與銜接均可回到來源；確認投影未新增圖外主張，且沒有任何由投影回寫正式圖的步驟。

## Inline 投影（Phase 0）

1. 對已有 `modules.md` + `edges.md` 的 DOC 目錄執行：
   ```bash
   node tools/viz/generate.mjs <doc-dir>
   ```
2. 產出寫入 `<doc-dir>/views/`（Mermaid + 表格）；不回寫正式資料。
3. 驗收：模塊數、邊數與源檔一致；`_warnings.md` 無未預期警示；每節點可溯 `module_id` / `char_span`。
4. 規劃與 Phase 1 分工見 `docs/specs/2026-07-13-inline-diagram-module-viz-plan.md`。
