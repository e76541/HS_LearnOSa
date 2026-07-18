# 路線圖可視化（route-map）— 套用說明

定位:**投影,不是真相源**。圖上所有資料由下列文檔生成;路線、交接、看板與圖不一致時,以文檔為準,圖視為過期。

## 資料對照(本體系 → 規格資料模型)

| 規格欄位 | 資料來源 | 說明 |
|---|---|---|
| `NODES` / `MAIN_ORDER` | 路線 `docs/management/roadmap.md` | 主線站 = 路線的推進站點(引用模塊 ID 或里程碑) |
| `CURRENT_ID` | 交接紀錄 → 最新交接快照 | 目前位置,單一來源 |
| `PRS` | 看板簡易變更表的未結案列 + 近期完成列 | 一列 = 一條支線 |
| `PRS.status` | 變更表狀態欄 | `進行中`→`open`、`阻塞`→`draft`、`完成`→`merged` |
| `PRS.forkAt` / `mergeAt` | 該列主模塊對應的主線站 | 波及模塊不畫線,寫進 title 附註 |
| `PRS.steps` | 該模塊必做檢查 | 檢查即支線工作站 |
| `PRS.meta` | 變更表列號 + 日期 + 檢查結果 | 如 `#7 · 07-18 · 必做通過` |

## 與流程圖(flow-map)的分工

本體系有兩張圖,不是同一張的兩個版本,不得互相取代:

| | 流程圖 flow-map | 路線圖 route-map |
|---|---|---|
| 回答 | 標準流程長怎樣(規則怎麼運作) | 這個專案現在走到哪(狀態投影) |
| 性質 | 靜態,每個專案相同 | 動態,隨路線/交接/變更表變化 |
| 來源 | `flow-map.workflow.json`(archify 渲染) | 路線 + 最新交接快照 + 簡易變更表 |
| 更新 | 流程規則變更時才改 | 使用者要求或交接時重生成 |

## 使用規則

- 產出位置:目標專案 `docs/management/route-map.html`,單檔、無外部依賴(依規格第 7 節)。
- **選配**:不進最小必備檔集合;不存在不視為錯誤。
- 生成/更新時機:使用者要求時,或交接時順帶重生成;Agent 不得為畫圖新增或改動任何真相檔內容。
- 已歸檔的變更列不畫;merged 支線依規格灰化。
- 管理類變更列(模塊欄「—」)不畫支線。

以下為規格原文(v3,原樣保存):

---

# Route-Map Spec v3（工作流路線圖 · PR 支線版）

> 用途：單檔 HTML 工作流視覺化。給任何 AI / 開發者此文件即可重現。
> 設計目標：(1) 易理解 (2) 隨機點位進入可在 3 秒內定位「現在在哪、往哪去」。
> 核心隱喻：捷運路線圖（拓撲可讀性優先於幾何精確）＋ git graph（PR 為臨時支線）。

---

## 1. 資料模型（canonical: English identifiers）

```js
// 主線節點
NODES = [{ id, name, ico, desc, x, y }]
MAIN_ORDER = [id...]        // 主線順序，單一事實來源
CURRENT_ID = id             // 目前位置，所有狀態由此推導

// PR / 功能支線
PRS = [{
  id, title,
  status: "open" | "draft" | "merged",
  forkAt: nodeId,           // 從主線哪站分出
  mergeAt: nodeId,          // 匯回哪站
  steps: [string...],       // PR 自己的工作站
  meta: string              // 如 "#12 · 3 commits"
}]
```

狀態推導規則（不手動標記）：
- `statusOf(id)`：index < CURRENT → done；= CURRENT → current；> → future
- prev/next 由 MAIN_ORDER 相鄰關係取得

## 2. 視覺 Token

| Token | 值 | 用途 |
|---|---|---|
| --bg / --bg2 | #0a0f1a / #0e1524 | 冷冽漸變背景 160deg |
| --ink / --dim / --faint | #dce7f5 / #5b6b84 / #2a3750 | 文字三階 |
| --line-main | #39c2ff | 主線冰藍 |
| --now | #7df3ff | 當前站高亮 |
| --done | #3a4a63 | 已完成灰 |
| --pr-open | #2dd4bf | PR 審查中（青綠實線）|
| --pr-draft | #5b6b84 | PR 草稿（灰虛線 8/7）|
| --pr-merged | #3a4a63 | PR 已合併（灰化）|
| --card / --edge | #111a2c / #1d2b45 | 卡片與邊框 |

字體：Noto Sans TC 系。圓角：卡 14px、徽章 99px。毛玻璃：backdrop-filter blur(6px)。

## 3. 三態視覺編碼（主線）

| 狀態 | 軌道 | 站點 | 標籤 |
|---|---|---|---|
| done | 灰 --done, opacity .7 | 灰圈暗底 | --dim |
| current | 亮 + 白色流動虛線動畫（dasharray 2/14, 1.6s linear infinite）| --now 圈 + pulse 擴散環（r 11→26, 1.8s）| --now 粗體 |
| future | opacity .32 + 段中方向箭頭 ▷ | opacity .45 | 淡化 |

## 4. 元件清單（8 + PR 層）

1. **主畫布**：SVG，#mapWrap 用 CSS transform 做平移縮放（transition .55s cubic-bezier(.22,.9,.3,1)）
2. **迷你地圖**（右上，固定）：同一份座標、viewBox 縮放；當前站 pulse；merged PR 不顯示；點擊回全覽
3. **狀態圖例**（左上，固定）：done / current / future / pr-open / pr-draft / pr-merged 六態
4. **節點資訊卡**（下方，固定）：三欄「◂ 從哪來（灰）｜● 現在位置（亮）｜往哪去 ▸（含 → 箭頭）」；欄內：ico+name / desc / lineTag；相關 PR 以 chip 顯示（點擊可展開該 PR）
5. **麵包屑**（資訊卡頂）：全線站名以 › 串接；當前站 ▶ 高亮、已過站 --faint
6. **進度里程尺**（v2 有、v3 可選）：站名縮寫刻度 + 「第 n/N 站 x%」
7. **方向暈影**（聚焦時）：左緣暗漸層＝來向，右緣藍漸層＝去向
8. **Spotlight**（聚焦時）：非「當前+前後站+相連軌道」降至 opacity .28 + saturate(.2)

### PR 支線層
9. **收折徽章**（HTML overlay 掛 #badgeLayer，隨地圖 transform）：位於 forkAt 站上方；`狀態圓點 + 標題 + ▾`；同站多 PR 垂直堆疊（間距 30px）；展開時 ▾ 旋轉 180°
10. **PR lane**：每條 PR 一條水平 lane，`laneY(i) = mainY - 110 - i*95`；路徑 = fork 貝茲曲線 → 水平段（步驟站 r6.5 + 小字標籤）→ merge 貝茲曲線 + 三角箭頭指入 mergeAt 站；預設 `.hidden`（opacity 0 + pointer-events none, transition .45s）
11. **變更清單抽屜**（right側，可整體收折）：標頭「▾ 變更清單 + N 進行中」點擊收折（max-height 動畫）；每項：狀態點 + 標題 + 狀態章 + `meta · forkAt → mergeAt`

## 5. 互動規則

| 動作 | 行為 |
|---|---|
| 點主線站 | 聚焦：scale 1.3、站置中偏上（y 42%）；觸發 spotlight + 暈影 + 資訊卡更新 |
| 點迷你圖 | 回全覽 fitAll()、資訊卡回到 CURRENT_ID |
| 點 PR 徽章 / 抽屜項 / 卡片 chip | togglePR(id)：三處入口共享同一 expanded Set，狀態同步 |
| resize | 重算 focusNode 或 fitAll |
| 預設 | 全覽 + 展開一條 open PR 作示範 |

同步原則：**單一狀態源**（`expanded: Set`），所有入口只呼叫 togglePR → syncPR 統一刷新。

## 6. 收折哲學（漸進揭露）

- 預設收折：主線閱讀零干擾，PR 只以徽章存在
- merged PR：灰化、不進迷你圖（語意＝已被主線吸收），徽章保留作歷史
- 密度上限（待驗證）：同時展開 >2 條時建議自動收掉最舊的；PR 總數 >5 時 lane 堆疊過高需改版

## 7. 品質底線

- 響應式：<640px → 資訊卡直排、圖例隱藏、迷你圖縮小、抽屜移位
- `prefers-reduced-motion` → 全動畫關閉
- 無外部依賴：單檔 HTML，禁 localStorage

## 8. 演進紀錄

- v1：捷運圖骨架 + 三層定位（迷你圖／聚焦／三欄卡）
- v2：+8 項（里程尺、麵包屑、暈影、圖標、支線降級、圖例、spotlight、視窗框）
- v3：+PR 支線層（徽章收折、lane 展開、抽屜、三入口同步）
