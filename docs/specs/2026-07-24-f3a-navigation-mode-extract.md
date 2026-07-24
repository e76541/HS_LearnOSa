# F3a 導航模式｜抽出專頁

日期：2026-07-24
更新：2026-07-24（旅程式 GATE／STEP 模型）
狀態：草稿（導航測試分支抽出；非正式升格）
來源真值：[導航 OSA](2026-07-21-navigation-osa-decision-deck.md)、[ops-id-legend](../management/ops-id-legend.md)、[問／邊界整合](2026-07-23-question-boundary-integration.md)
展示：[assets/2026-07-24-f3a-navigation-mode.html](assets/2026-07-24-f3a-navigation-mode.html)

> **範圍**：只取 **F3a 導航模式**（Journey／GATE／STEP／DecisionCard／閘門／動態牌組／Q2 補知）。  
> **刻意不含**：訓練模式四卡（TextCard／NodeCard／MechanismCard／BlindSpotCard）、四判定、A–E 分流。

---

## 1. 一句話

以**終點**（一篇文本或一個專案）為導向，串起有序 **GATE**；站內走**最小決策循環**；不會就補**最小知識**；每個最小可執行動作計 **STEP**，抵達每站時累計 `steps_to_arrive`。

## 2. 站位

| 代號 | 名稱 | 本抽出 |
|---|---|---|
| **F3a** | 策略 V2／最小一步 | **導航模式**（另有訓練模式，本稿不展） |
| 作業模塊 | **F** | 不另開 M5 |

## 3. 名詞對照（避免撞車）

| 詞 | 意思 | 與舊詞關係 |
|---|---|---|
| **Journey** | 一次以終點為導向的場次 | 擴充／包裝既有 `GoalSession` |
| **Destination** | 終點：一篇文本或一個專案（多源） | 對齊 `single_source`／`multi_source` |
| **GATE** | 旅程**預設站**＋**過站條件**（驗收） | **≠**「決策前置閘門」 |
| **STEP** | 最小可執行動作計數單位 | 新量測；不取代 DecisionCard |
| **決策前置閘門** | 單牌就緒檢查（三出口） | 保留；可作為過某 GATE 的條件之一 |

## 4. 旅程模型（首版）

### 4.1 Journey

| 欄位 | 說明 |
|---|---|
| `destination_kind` | `text` \| `project` |
| `destination_ref` | 文本 ID 或專案／課群 ID |
| `gates[]` | 有序預設站（3～7 個子目的；過密則合併） |
| `step_log[]` | 追加 only（時間、動作型別、關聯牌／GATE） |
| `steps_total` | 由 log 推導 |

**邊界**：Journey 只消費證據層（模塊／邊）；**不回寫**模塊／邊真值。

### 4.2 GATE（= 預設站 + 過站條件）

| 欄位 | 說明 |
|---|---|
| `gate_id`／`title`／`intent` | 此站要達成的子目的 |
| `pass_rule` | 過站條件（可檢驗；未寫不得當 GATE） |
| `entry_deck` | 進站時的最小決策子圖（動態組牌，非固定課綱） |
| `steps_to_arrive` | 自上一 GATE（或起點）到**本站通過**為止的 STEP 數 |
| `evidence_refs[]` | 過站所用模塊／邊 ID（只引用） |

**GATE 設立（人工為主）**：

1. 宣告 Destination（文本或專案）。
2. 從目的拆 **3～7 個有序子目的**＝GATE。
3. 每站寫 `pass_rule`（可判定通過／未過）。
4. 進站才組 `entry_deck`；站間用既有邊當**證據線索**——**邊 ≠ GATE 邊**、**邊 ≠ STEP**。
5. **禁止**：把模塊樹直接當 GATE 樹；禁止自動「一模塊一 GATE」。

### 4.3 STEP（= 最小可執行動作）

| 動作型別 | 計 1 STEP | 說明 |
|---|---|---|
| `decide` | ✓ | 完成一張決策牌（選項＋理由＋成立條件） |
| `q2_fill` | ✓ | Q2 補最小知識 |
| `reroute` | ✓ | 改路／增刪牌 |
| `resume_card` | ✓ | 補知後回到原牌（與 `decide` 分開計） |
| `execute_next` | ✓ | 執行已選的下一步 |
| 純翻牌／重讀／瀏覽 | ✗ | 不計 |

**合併規則**：同一回合「Q2 補知 → 回原牌 → 完成決定」＝ `q2_fill` + `resume_card` + `decide`（誠實反映成本，不灌水）。

## 5. GATE 內循環（原「最小一步」）

GATE 內仍走決策循環；旅程只是把多個循環串成**有終點的路**：

```text
進站（entry_deck）
→ 決策牌＋前置閘門
→ 能選：使用者選擇（decide）
→ 不能：Q2 補知（q2_fill）→ 回原牌（resume_card）→ 再 decide
→ 改路再定位（reroute）
→ 執行下一步（execute_next）
→ pass_rule 滿足 → 過站（記 steps_to_arrive）→ 下一 GATE
→ … → Destination
```

## 6. 三層（導航視角）

| 層 | 物件 | 責任 |
|---|---|---|
| 證據層 | 模塊／邊／字元區間 | 真值；牌的依據；**本模型不修改** |
| 決策投影層 | DecisionReadiness、Guide、OptionProfile、DecisionCard | 能否決定、考量、方案、影響 |
| 導航控制層 | Journey、GATE、STEP log、Deck、RouteState、DecisionRecord | 組牌、站序、計步、分支、結果 |

邊界：**模塊不是牌**；牌是導航介面；牌組是情境生成的路徑；**GATE 不是模塊**。

## 7. 入口門檻

文本進導航＝**活棋**（選項來自原文支撐）＋**決策前置閘門**通過。  
TextCard A–E **不是**導航入口條件。

### 前置閘門三出口（單牌層；≠ GATE 過站）

1. 資訊與權限足夠 → 展開考量與方案比較  
2. 資訊不足但可等待 → 先查證  
3. 資訊不足且不能等待 → 強制風險決策（明示假設、監測、退路）

可作為某 GATE 的 `pass_rule` 子條件（例：「DC02 完成且前置閘門出口 ≠ 只能查證卡住」）。

## 8. 決策牌（正面／翻牌）

**正面**：要決定什麼；為何現在；尚缺事實／能否決定；可能漏想的考量；確認後才出選項與主要影響。  
**翻牌**：條件、風險、可逆性、完整影響、課程依據、「不會選」診斷入口。

**全域最低作答**：選項＋理由＋成立條件（`completion_rule` 只可加嚴）。  
系統可建議，但**高影響／不可逆不得代選**。

## 9. 卡住時（Q2）

無法完成某張牌 → 診斷該決策的**最小知識前沿** → 只補對應模塊 → **必須回到原牌**再選。  
診斷前不先給建議答案。計 STEP：`q2_fill` + `resume_card` + 後續 `decide`。

## 10. 與訓練模式的分界（只標界，不展訓練）

| | 導航 | 訓練（不含於本頁） |
|---|---|---|
| 主物件 | Journey／GATE／DecisionCard | TextCard→NodeCard→對照 |
| 作答 | 選項＋理由＋成立條件 | 選擇＋可檢驗機制假設 |
| 量測 | STEP／steps_to_arrive | 四判定 |
| 歸因 | Review 只管預期 vs 實際；需歸因走升級口 | 四判定專屬 |

## 11. 紙上驗收例（趙構 P1 · 含 Q2）

**Destination**：`project`／趙構靖康決策（試作素材；模塊／邊不動）。

| GATE | intent | pass_rule（摘要） |
|---|---|---|
| G1 圍城為質 | 第一次圍城是否赴金營 | DC01 完成（decide） |
| G2 磁州改道 | 二圍前避開資訊衝突赴營 | DC02 經 Q2 查證後改道決策完成 |
| G3 大元帥節奏 | 勤王節奏與留駐取捨 | DC04 完成 + execute_next 可陳述 |

**模擬路徑 G1→G2（含 Q2）**：

| 序 | 動作 | STEP 型別 | 累計（自 G1 起） |
|---|---|---|---|
| 1 | DC01 完成赴質 | decide | 1 |
| — | **G1 過站** | — | **steps_to_arrive(G1)=1** |
| 2 | DC02 前置閘門：資訊不足 | （不計；閘門判定） | 1 |
| 3 | Q2 補：金方點名／國書狀態 | q2_fill | 2 |
| 4 | 回原牌 DC02 | resume_card | 3 |
| 5 | 選 O2-divert 改道 | decide | 4 |
| 6 | 牌組改寫、升 DC03 | reroute | 5 |
| — | **G2 過站** | — | **steps_to_arrive(G2)=4**（自 G1 通過後） |

核對：STEP=B 成立——補知、回原牌、決定、改路各計 1；純閘門判定不計。模塊／邊檔未改動。

## 12. 刻意不做

- 不要求先學完才開始任務  
- 不把固定課綱改名為牌組或 GATE 樹  
- 不代選高影響決定  
- 不把一次情境路徑回寫成通用知識真值  
- 不自動「一模塊一 GATE」  
- 本抽出不修改 canonical、不開路線 INI、不實作 Runtime／CLI  
