# Graph Engineering 多模態圖片切分試作

## 試作定位

- 日期：2026-07-21
- 相關作業模塊：M1、M2（籌備）
- 輸入：X 長截圖〈Graph Engineering with Claude: 14-Step roadmap from 0 to graph architect (Full Course)〉
- 範圍：入口分類、圖片版面切割、圖文宿主對齊、候選模塊切分、候選邊草模
- 限制：只作試作，不建立正式來源 ID，不寫入 `Inbox/`、`DOC/`、模塊庫或邊庫。

## 多模態切分輸出

原圖為 1728×29515 像素的 X 長截圖。本次先取正文中央欄 `x=500..1139`，再依導言、14 個編號章節、跨模塊案例束與結論切成 17 個區域：

- `C00`～`C14`：15 個候選模塊的圖文面板。
- `R15`：文末「Six graphs」案例束，附屬多個宿主，不獨立當知識節點。
- `R16`：結論對導言的詳述區；底部互動介面標記為尾隨噪音。
- 排除：左側導覽、右側推薦欄、正文後留言、截圖黑色尾段。

實體裁切位於 [`assets/2026-07-21-graph-engineering-multimodal/`](assets/2026-07-21-graph-engineering-multimodal/)，像素座標、宿主與媒體成分見 [`manifest.json`](assets/2026-07-21-graph-engineering-multimodal/manifest.json)。章節交界保留約 50px 防漏重疊。

`bbox_px`、`region_role`、`media_components`、`host_candidate` 均為本次試作欄位，**不是現行 ModuleCore 或 canonical schema**。正式規範仍要求文字 `char_span`；本試作只驗證圖片證據可否用座標回指並附屬宿主模塊。

## 入口三問

1. **有原文主張**：有。正文主張多步 Agent 不應預設排成直線；工作依賴、並行、匯聚、路由與回圈應顯式建成圖。
2. **主張可獨立成立**：可。各節均提出可獨立判讀的方法或設計判準，並附圖例、程式片段或失效模式。
3. **是否只供當下斷邊題使用**：否。內容本身是完整教學來源，不依賴某個既有斷邊題才有意義。

**入口結論：正常來源候選。** 不屬入口淘汰或一次性作答素材。

## 候選模塊草模

下表是試作索引，不是正式模塊。每列可回指同名圖片區域與 `bbox_px`，但截圖仍缺可靠的純文字字元座標，因此全部保留 `needs_review`；不可拿圖片座標取代正式 `char_span`。

| 候選 | 證據錨點 | 類型 | 主要命題 |
|---|---|---|---|
| C00 | 導言 | TeachingModule | 多步 Agent 的工作形狀應由依賴關係決定；直線只是圖的退化形態。 |
| C01 | 01 | TeachingModule | 節點代表單一工作；邊只在下游確實消費上游輸出時存在。 |
| C02 | 02 | MethodModule | 逐一質問每個「然後」是否真的傳遞資料，據此重畫線性鏈並刪除假依賴。 |
| C03 | 03 | MethodModule | 每個節點應有有界輸入、有界且驗證過的輸出，以及單一工作契約。 |
| C04 | 04 | MethodModule | 邊是資料形狀契約；純資料轉換應以程式碼完成，不必浪費模型呼叫。 |
| C05 | 05 | MethodModule | 對互不依賴的同型工作使用並行 fan-out，並驗證、過濾失敗結果。 |
| C06 | 06 | MethodModule | 只有下游確實需要完整集合時才設 barrier；單純轉換可用 pipeline。 |
| C07 | 07 | TeachingModule | diamond 是 split → parallel work → reduce → synthesize 的可重用拓撲。 |
| C08 | 08 | MethodModule | 讓節點判讀結果，但用確定性的程式碼選擇條件邊。 |
| C09 | 09 | MethodModule | 在邊上設 verifier，以下游放行條件包住不確定模型輸出。 |
| C10 | 10 | MethodModule | 並行節點的失敗與寫入空間要隔離；共享檔案工作以 worktree／sandbox 分開。 |
| C11 | 11 | MethodModule | 未知規模探索可用受控回圈；以連續乾跑輪次收斂，且對所有已見項目去重。 |
| C12 | 12 | MethodModule | 依節點判斷負荷分配模型，把高成本模型留給真正需要判斷的節點。 |
| C13 | 13 | MethodModule | 拓撲直接決定成本與延遲；預設 pipeline，只有完整集合依賴才使用 barrier。 |
| C14 | 14 | MethodModule | 對無法預先規劃的工作，讓 Claude 依目標動態產生並保存本次 workflow 圖。 |

補充判斷：文末六個應用例切為獨立圖片區域 `R15`，但主要是上述方法的 `examples`，不另切成六個案例模塊；留言、X 導覽與推薦欄是純填充，不進下游。

## 候選邊草模

方向遵守「箭頭指向被支撐者」。只保留正文有直接支持、信心較高的關係。

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| C02 | `elaborates` | C01 | 以「檢查每個 then 是否讀取前一步輸出」落實邊的存在判準。 |
| C03 | `elaborates` | C01 | 節點的單一工作被具體化為輸入／輸出契約。 |
| C04 | `elaborates` | C01 | 邊被具體化為可驗證的資料形狀契約。 |
| C05 | `solves` | C02 | fan-out 解決重畫線性鏈後浮現的獨立工作並行問題。 |
| C06 | `depends_on` | C05 | fan-in／barrier 以先有 fan-out 的結果集合為前提。 |
| C07 | `depends_on` | C05 | diamond 的工作層需要 fan-out。 |
| C07 | `depends_on` | C06 | diamond 的 merge 層需要 fan-in／reduce。 |
| C08 | `elaborates` | C04 | 條件路由把「通過哪條邊」具體化為可重現的程式決策。 |
| C09 | `elaborates` | C04 | verifier 把邊契約具體化為放行閘門。 |
| C10 | `elaborates` | C05 | 並行 fan-out 的檔案碰撞失效模式，以隔離工作區處理。 |
| C12 | `depends_on` | C03 | 只有節點工作契約清楚，才可按節點判斷負荷分配模型。 |
| C13 | `elaborates` | C05 | pipeline／barrier 的延遲差異展開並行拓撲的成本含義。 |
| C13 | `elaborates` | C06 | 是否等待完整集合是 barrier 成本的核心判準。 |
| C14 | `depends_on` | C03 | 動態 workflow 仍需可執行的節點契約。 |
| C14 | `depends_on` | C04 | 動態 workflow 仍需明確的邊與資料流。 |
| C14 | `depends_on` | C08 | 自路由需要條件分支機制。 |

長程掃描結果：C12 → C03、C14 → C03/C04/C08 是較明確的遠距關係。未建立單純章節順序邊；C11 與其他節的關係不足以在本次截圖證據下穩定定型，寧缺勿錯。

## 品質與風險

- 截圖可讀，14 節、導言、結論與程式片段大致完整。
- 圖片區域現在可用 `bbox_px` 回指，但圖片仍不是穩定的文字證據面，無法可靠產生正式 `char_span`，也不適合直接做逐字搜尋與重跑抽取。
- 章節交界使用小幅重疊防止切掉標題或尾句；後續消費時不得把重疊文字重複計算。
- 頁面顯示 X 帳號 Codez，但長截圖檔名、轉貼者與正文作者的身份鏈仍需核對；正式收錄前應取得原始貼文 URL 或純文字匯出。
- 內容含 Claude Code／動態 workflow 的產品敘述；正式收錄時應把可遷移的圖工程方法與可能隨版本變動的產品細節分開標註。

## 試作結論

1. 來源通過入口三問，值得進 M1 正常來源管線。
2. 已產出 17 個可回指的圖文區域；15 個對齊候選命題簇，2 個作跨模塊例證／結論，不強迫一圖一節點。
3. 章節結構能形成非線性的高信心關係；值得進 M2 抽邊。
4. 目前不能宣稱正式模塊化完成，主因是缺純文字與可靠 `char_span`，且圖片區域欄位尚未成為正式 schema，不是內容品質不足。
5. 若要轉正式處理，下一步是取得原始 URL／純文字，放入 `Inbox/`，再重跑模塊化與兩遍式抽邊；正式 ID 與儲存 bucket 屆時裁決。
