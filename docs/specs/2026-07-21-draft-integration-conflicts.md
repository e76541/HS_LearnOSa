# 草案整合總綱 × 衝突裁決

日期:2026-07-21
更新:2026-07-24（脊柱收束至 F3 前；六衝突仍待裁）
狀態:草稿
裁決來源:無
實作參照:無(互動原型已封存 [../archive/html-2026-07-23/specs/assets/2026-07-21-draft-integration-conflicts.html](../archive/html-2026-07-23/specs/assets/2026-07-21-draft-integration-conflicts.html);勾選進度僅本機 localStorage)
後繼:[2026-07-22-pipeline-deck-nine-grid-integration.md](2026-07-22-pipeline-deck-nine-grid-integration.md)（已對齊 F3 四平行；**六衝突仍待裁**）

> **性質:整合提案。** 把現行草案按層歸位、標出真衝突與建議方向;不具規範效力。作業模塊已為 M0＋F／T／R／V（F3＝a～d）；本稿不實作。

關聯:[2026-07-19-module-fragments-nine-grid-agent-view.md](2026-07-19-module-fragments-nine-grid-agent-view.md)、[2026-07-18-module-flow-loop.md](2026-07-18-module-flow-loop.md)、[2026-07-16-nine-palace-dual-phase.md](2026-07-16-nine-palace-dual-phase.md)、[2026-07-18-explain-this-conversion.md](2026-07-18-explain-this-conversion.md)、[2026-07-21-navigation-osa-decision-deck.md](2026-07-21-navigation-osa-decision-deck.md)、[2026-07-22-pipeline-deck-nine-grid-integration.md](2026-07-22-pipeline-deck-nine-grid-integration.md)、[2026-07-18-learnos-terminal-dashboard.md](2026-07-18-learnos-terminal-dashboard.md)、[2026-07-18-talk-roadmap-nine-palace.md](2026-07-18-talk-roadmap-nine-palace.md)、`Library/規範/10-模塊層.md`、`Library/規範/20-結構層.md`(邊型)。

---

## 1. 定位

把專案約 10 份草案整合進**唯一權威管線**敘述,逐層歸位,並抓出 **6 處真衝突**提出整合建議。裁決經確認後才落檔;互動頁可篩選全景、展開衝突、勾選裁決進度。

## 2. 唯一權威管線

三份草案(雙階段／流程閉環／組件化)已同批改寫為此管線;舊寫法「文本→模塊層→九宮」作廢。

| 站 | 層 | 要點 |
|---|---|---|
| 原文 | 儲存層 | 證據層;外部連結類來源需快照 |
| 抽組件 Fragment | 儲存層 | 唯讀;kind 閉集;組件層尚未裁決(衝突 3) |
| 組裝模塊 Module(+邊) | 儲存層 | fragment_reference、module_edge、完整性;衍生旗標(衝突 4、5) |
| 提問站(前沿輪) | 控制面 | 探邊界、校粒度;拆併回饋走版本／引用 |
| 挑選(以知帶新) | 控制面 | 已知模塊先入宮作錨 |
| 成景 | 呈現層 | 渲染時計算;`scene`／`module_only` |
| 九宮 | 呈現層 | 攝入期／練習期;定義三份不一致(衝突 2) |
| 測驗 + 間隔重複 | 控制面 | SM-2 模塊粒度;到期≥3 回原面 |

**2026-07-22 改掛 → 2026-07-23 已裁 → 2026-07-24 修訂**:產品主敘述＝「文本 → 模塊(拆／選) → 進入 F3 四平行（可互調）」,見 [管線整合](2026-07-22-pipeline-deck-nine-grid-integration.md)。舊線性「固定牌 → 九宮｜隨機牌」降歷史（練習出口二選一語意仍保留為 F3 內選配）。上表九宮獨占中段的敘述降為舊試行參照。六衝突不因改掛自動解消。

## 3. 草案全景(10 份)

| 層 | 草案 | 狀態 | 一句話職責 |
|---|---|---|---|
| 儲存層 | [組件化九宮(07-19)](2026-07-19-module-fragments-nine-grid-agent-view.md) | 草稿·§12 待裁 | 原文→組件→模塊;fragment／reference／等級／完整性 |
| 控制面 | [流程閉環(07-18)](2026-07-18-module-flow-loop.md) | 已裁決-試行 | 提問站＋挑選站＋測驗循環 |
| 控制面 | [explain-this 轉換(07-18)](2026-07-18-explain-this-conversion.md) | 已裁決-試行 | 測驗站:題出原文、禁自評、SM-2 模塊粒度 |
| 呈現層 | [九宮雙階段(07-16)](2026-07-16-nine-palace-dual-phase.md) | 已裁決-試行 | 九宮容器:攝入期／練習期 |
| 呈現層 | [演講路線圖(07-18)](2026-07-18-talk-roadmap-nine-palace.md) | 草稿 | 九宮＝單場演講場控 |
| 呈現層 | [TERMINAL 儀表板(07-18)](2026-07-18-learnos-terminal-dashboard.md) | 草稿 | 九宮＝熟練度儀表板 |
| 呈現層 | [演講備課圖譜(07-15)](2026-07-15-speaking-module-graph-design.md) | 草案 | 模塊圖隨機選＋拖曳(INI-005) |
| 行為 | [GPT-LIVE 循環思考(07-16)](2026-07-16-gpt-live-cyclic-thinking.md) | 草稿 | 除演講外進循環思考(內容待補) |
| 工具 | [post-intake-disposition(07-14)](2026-07-14-post-intake-disposition-trial.md) | 已裁決-試行 | 收錄後處置(獨立工具線) |
| 儲存層 | [doc-storage(07-13)](2026-07-13-doc-storage-design.md) | 已併入 canonical | DOC 儲存流向(列此供參) |

## 4. 六處真衝突 × 整合建議

### 衝突 1 · 邊詞彙三套並存(高)

| 來源 | 邊詞彙 |
|---|---|
| canonical 結構層 | `depends_on`／`exemplifies`／`elaborates`／`equivalent_to`／`contrasts`／`motivates`／`solves`／`foreshadows`／`condition`／`broader_than`(10 型) |
| 演講路線圖 | 依賴／對比／舉例／推論／背景(5 型,中文) |
| TERMINAL | `prereq`／`broader_than`／`related`／`background`(4 型) |

**建議**:canonical 10 型為唯一儲存真值;呈現層各建「顯示名→canonical」對映;`推論`／`related` 無對應者標待裁,不得自創儲存值。

### 衝突 2 · 「九宮」三種格位語義(高)

| 草案 | 中宮 | 外八格 |
|---|---|---|
| 九宮雙階段 | 核心命題 | 8 個模塊 |
| 演講路線圖 | 主題命題(n/8) | 8 個演講模塊 |
| TERMINAL | 模塊本體 | 8 個子區域 |

**建議**:明定「九宮＝模塊組成的面」;TERMINAL 改稱「模塊細化視圖」或「子區域九宮」。

### 衝突 3 · 組件層被上游引用但自身未裁決(中)

流程閉環、雙階段管線已寫「原文→組件→模塊」,但組件化仍草稿、§12 有 14 項待裁。

**建議**:§12 列為口頭驗證前置裁決;或上游試行暫依 r1 預設、裁決後回校。

### 衝突 4 · hooks × fragment kind 雙軌未結(中)

canonical `hooks` 與組件化 `fragment kind` 功能重疊。

**建議**:裁單一機制(建議 fragment 取代 hooks,走 breaking change 評估),並結候選 C5。

### 衝突 5 · 入宮完整性 vs 弱策略點無交會旗標(低)

Method `constraints=作者未給` 能入宮但不能出應用題;交會點無旗標。

**建議**:衍生旗標 `weak_policy_point`,練習層與九宮共讀。

### 衝突 6 · 試作材料需求互斥(低)

三份試行可用 Black-Scholes;組件化試作要 PDF 專業課程。

**建議**:兩軌並行——先用文章驗三份試行;PDF 另驗組件化。

## 5. 待裁決清單(6 項)

1. 邊詞彙:canonical 10 型為唯一真值
2. 九宮定義:九宮＝模塊組成的面;TERMINAL 改名
3. 組件層前置:§12 列為口頭驗證前置(或暫依 r1)
4. hooks／fragment:裁單一機制
5. 加 `weak_policy_point` 衍生旗標
6. 試作雙軌:文章驗試行、PDF 驗組件化

正式裁決仍須於對話確認後落檔;互動頁勾選僅本機暫存。
