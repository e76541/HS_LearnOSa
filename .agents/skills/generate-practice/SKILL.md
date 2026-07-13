---
name: generate-practice
description: Use when generating HS_LearnEdge questions, exercises, assessments, quizzes, or practice from modules, edges, motifs, proficiency state, or multiple sources.
---

# 練習生成

## 規範定位

1. 先讀 `Library/CURRENT.md`，解析 `design-principles`、`module-layer`、`structure-layer`、`practice-layer`、`skill-registry`。
2. 不讀 archive；不寫死規範實體檔名。

## 封閉世界

問題只能由模塊欄位、模塊層邊、合法圖式實例與跨來源候選邊組合。圖外實體不得入題；若答案帶入圖外證據，只能經回填成為圖的生長。需要原味題幹時回 `char_span`，不可只用模塊摘要。

## 單模塊題

| 證據 | 題型 |
|---|---|
| 概念核心 | 回憶、解釋 |
| 機制 | 解釋、診斷 |
| 失效模式 | 診斷 |
| 有約束條件的決策規則 | 應用 |
| 約束為「作者未給」的決策規則 | 評估／邊界獵取；禁止應用 |
| 案例的情境、行動、結果 | 遷移 |
| 主張加證據 | 評估 |

- 全文無技能訊號時允許零題，記 `NO_SKILL_SIGNAL`。
- 對齊節點已 `mastered`：不出單模塊題，只保留跨來源斷邊題與約束補強。下位新節點不視為重複，改出與已掌握兄弟節點的對比題。
- 背景模塊只作題幹語境，不作考點；可考它指向的主張或邊，不考故事細節。

## 跨模塊圖式

1. 鏈：只串同一種 `depends_on`、`motivates` 或 `solves`；`exemplifies` 不居中；背景不入鏈。
2. 星：樞紐至少三條入邊，來源須跨領域或角色；背景不當樞紐。
3. 反事實：拔除至少有一條入射依賴邊的節點；背景不可被拔。
4. 斷邊：不同來源模塊須對齊同一登記節點，用於同構或矛盾遷移。
5. 隨機性只用於選圖式與合規子圖，禁止隨機走圖。

## 產出與回填

1. 每題記錄題型、題幹、難度、模塊／邊／圖式實例溯源；無溯源不出題。
2. 先驗證組合約束，再回 `char_span` 組題；不得由投影或摘要反推新事實。
3. 斷邊答案可回填 `equivalent_to` 或 `contrasts`。與既有邊矛盾時，依結構層標舊邊 `stale`，不刪證據鏈。
4. 使用者既有文稿只能作當次斷邊題素材；答案回填後即棄，不建立零散收錄類別。

## 驗收

檢查題型與證據角色相符、弱策略點未產應用題、mastered 未產單模塊題、背景未成考點、每題可溯源且圖式約束完整。