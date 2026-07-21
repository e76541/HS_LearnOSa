# AI 模型路由文章文本管線紙上試作

## 試作定位

- 日期：2026-07-22
- 相關作業模塊：M1、M2（籌備）
- 輸入：〈How to Decide Between Kimi K3, Claude Fable 5, and GPT-5.6 for Every Type of Task〉純文字附件
- 範圍：入口三問、候選分流、候選模塊切分、兩遍式候選邊抽取、收錄風險判斷
- 限制：只作試作，不建立正式來源 ID、文本 ID、模塊 ID 或邊 ID；不寫入 `Inbox/`、`DOC/`、模塊庫或邊庫；不對文中 2026 年模型資料作外部查核。
- 動態視圖：[AI 模型路由 SVG](assets/2026-07-22-ai-model-routing/model-routing.svg)；有損投影，只顯示決策脊柱與主要跨切關係，不回寫候選模塊或邊。

附件共 24,355 個 Unicode 字元；SHA-256 為 `ba06fe85b10711533e737e5dfbf561b33249702772d1a85e47b083a12c48d70a`。下列 `char_span` 採零起點、右界不含。

## 入口三問

1. **有原文主張**：有。文章提出「不存在單一最佳模型」，應依任務、成本、時程、資料形態、合規與供應商風險動態路由。
2. **主張可獨立成立**：可。各任務類型有明確推薦、理由、限制與失效條件，後段另給清單、成本算法與 SaaS 案例。
3. **是否只供當下斷邊題使用**：否。文本本身是完整決策教學來源，不依賴既有斷邊題才有意義。

**入口結論：正常來源候選。** 不屬入口淘汰或一次性作答素材。

## 候選分流

以下區間在建立模塊前排除，不配發候選模塊 ID：

| `char_span` | `claim_kind` | `retention` | 原因 |
|---|---|---|---|
| `[0,83)` | `none` | `discard` | 標題，只作來源中繼資料。 |
| `[949,988)` | `none` | `discard` | 章節標題，不是獨立命題。 |
| `[2398,2602)` | `none` | `discard` | 由模型簡介轉入任務比較的導航文字與章節標題。 |
| `[24229,24355)` | `none` | `discard` | 社群追蹤呼籲，不支撐技能命題。 |

文末「路由能力比永久最愛更耐久」不是純重複，因其加入時間失效與定期重評條件，保留為候選模塊。中段 checklist 雖壓縮前文，但把敘述改造成可執行判斷程序，也保留。

## 候選模塊草模

下表是試作索引，`AMR-Cxx` 只供本報告引用，不是正式 `module_id`。共同核心投影：文章類型為 AI 模型選擇教學；領域為模型路由與 AI 工作流；輸入為任務特徵、成本、時程、資料形態及部署限制；輸出為模型／部署路徑與驗證策略；`schema_version=v0.3-r6`、`extractor=codex-paper-spike-2026-07-22`。所有列 `is_skill_signal=true`；抽取信心不表示文中事實已核對。

| 候選 | `char_span` | `claim_kind` | `provenance` | `support_status` | 類型 | 主要命題／型別重點 | 抽取信心 |
|---|---:|---|---|---|---|---|---:|
| AMR-C00 | `[83,949)` | `interpretation` | `primary` | `unverified` | AnalysisModule | 作者主張 2026 年不存在單一最佳模型；品質接近但價格、授權與任務強項分歧，故固定單模型會造成溢價或品質損失。 | 0.96 |
| AMR-C01 | `[988,1475)` | `verifiable_claim` | `secondary` | `unverified` | AnalysisModule | Kimi K3 的發布日、參數、上下文、價格與前端基準定位；未附官方頁或基準連結。 | 0.99 |
| AMR-C02 | `[1475,1941)` | `verifiable_claim` | `secondary` | `unverified` | AnalysisModule | Claude Fable 5 的 SWE-Bench Pro、長時代理定位與價格；未附官方頁或基準連結。 | 0.99 |
| AMR-C03 | `[1941,2398)` | `attributed_claim` | `secondary` | `unverified` | AnalysisModule | GPT-5.6 三層級、編碼表現、價格相對位置及系統卡所述 goal-gaming 風險；歸因有指向但無可核對引用。 | 0.99 |
| AMR-C04 | `[2602,3904)` | `advice` | `secondary` | `unverified` | MethodModule | 前端／UI／視覺品質優先時選 Kimi K3；例外是遊戲類，約束是推薦依賴當期 benchmark 與直接比較。 | 0.98 |
| AMR-C05 | `[3904,5434)` | `advice` | `secondary` | `unverified` | MethodModule | 困難後端與架構決策在預算允許時選 Fable 5；例行 CRUD／API 不值得付溢價，應把昂貴模型留給高後果問題。 | 0.98 |
| AMR-C06 | `[5434,6728)` | `advice` | `secondary` | `unverified` | MethodModule | 除錯選 GPT-5.6 Sol，但必須先定義可測成功條件並以實際測試獨立驗證，避免只滿足模糊目標。 | 0.99 |
| AMR-C07 | `[6728,8307)` | `advice` | `secondary` | `unverified` | MethodModule | 長時間、低監督代理工作選 Fable 5，並加入進度驗證與禁止未請求行動的邊界。 | 0.99 |
| AMR-C08 | `[8307,9678)` | `advice` | `secondary` | `unverified` | MethodModule | 高量、例行、低風險工作先用 Kimi K3，必要時降至開放權重模型；前提是任務未逼近便宜模型能力邊界。 | 0.98 |
| AMR-C09 | `[9678,10530)` | `advice` | `secondary` | `unverified` | MethodModule | 圖片、影片與前端參考重建選 Kimi K3，理由是原生多模態與前端能力可在同一工作流結合。 | 0.98 |
| AMR-C10 | `[10530,11646)` | `advice` | `secondary` | `unverified` | MethodModule | 研究路由依上下文長度、推理難度、風險與處理量決定：高風險複雜綜合偏 Fable 5，高量初篩偏 K3／開放模型。 | 0.99 |
| AMR-C11 | `[11646,13232)` | `advice` | `primary` | `provided` | TeachingModule | 核心技能是按任務路由而非選永久最愛；文章提供兩種失敗模式：昂貴模型做例行工作、便宜模型做高後果難題。 | 0.99 |
| AMR-C12 | `[13232,14732)` | `advice` | `primary` | `provided` | MethodModule | 依前端、長時無人值守、工作量／風險、除錯可驗證性、後端難度與成本約束依序判斷模型。約束是推薦資料必須仍有效。 | 0.99 |
| AMR-C13 | `[14732,17082)` | `advice` | `primary` | `unverified` | MethodModule | 比較每完成任務成本，而非只比 token 單價；將重試、人工修訂、測試批次與 prompt caching 納入。數值例及 90% 快取節省未核對。 | 0.99 |
| AMR-C14 | `[17082,19910)` | `verifiable_claim` | `primary` | `missing` | CaseModule | 小型 SaaS 案例把架構、前端、例行後端、除錯與過夜驗收分流給不同模型；結果為作者預期，未提供實際量測。 | 0.98 |
| AMR-C15 | `[19910,21425)` | `advice` | `secondary` | `unverified` | MethodModule | 受監管或本地部署情境先按資料駐留、合規與自架能力篩選，不能只看 benchmark；具體供應商與授權判斷未核對。 | 0.99 |
| AMR-C16 | `[21425,22842)` | `advice` | `primary` | `unverified` | MethodModule | 以薄路由抽象層降低供應商鎖定，保存切換、議價與故障韌性；出口管制停用 18 日的案例未附來源。 | 0.99 |
| AMR-C17 | `[22842,24229)` | `prediction` | `primary` | `unverified` | AnalysisModule | 作者預測具體排名與推薦會快速失效，建議每數週重評；耐久能力是可更新的路由制度，而非永久預設模型。 | 0.99 |

本次沒有背景模塊：開頭與結尾均直接支撐核心技能；社群追蹤呼籲則無支撐作用，直接丟棄。

## 候選邊草模

方向遵守「箭頭指向被支撐者」。只保留正文可直接支持的關係；不建立章節順序邊。

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| AMR-C01 | `elaborates` | AMR-C00 | K3 的價格、上下文與前端定位展開模型差異。 |
| AMR-C02 | `elaborates` | AMR-C00 | Fable 5 的長時代理、編碼與價格定位展開模型差異。 |
| AMR-C03 | `elaborates` | AMR-C00 | GPT-5.6 的層級、能力與行為風險展開模型差異。 |
| AMR-C04 | `depends_on` | AMR-C01 | 前端推薦直接使用 K3 的前端 benchmark 與價格敘述。 |
| AMR-C05 | `depends_on` | AMR-C02 | 困難後端推薦依賴 Fable 5 的編碼與長程推理定位。 |
| AMR-C06 | `depends_on` | AMR-C03 | 除錯推薦與額外驗證規則依賴 Sol 能力及 goal-gaming 風險。 |
| AMR-C07 | `depends_on` | AMR-C02 | 無人值守推薦依賴 Fable 5 的長時代理定位。 |
| AMR-C08 | `depends_on` | AMR-C01 | 高量工作優先 K3 的理由包含其相對價格與一般能力。 |
| AMR-C08 | `contrasts` | AMR-C02 | 成本敏感工作不採 Fable 5 的昂貴高難度定位。 |
| AMR-C09 | `depends_on` | AMR-C01 | 多模態推薦承接 K3 的影像／影片與前端定位。 |
| AMR-C10 | `depends_on` | AMR-C01 | 高量研究路徑承接 K3 的長上下文與成本敘述。 |
| AMR-C10 | `depends_on` | AMR-C02 | 高風險複雜研究路徑承接 Fable 5 的推理定位。 |
| AMR-C11 | `elaborates` | AMR-C00 | 將「沒有單一最佳模型」提升為可遷移的路由技能。 |
| AMR-C12 | `elaborates` | AMR-C11 | Checklist 把路由理念改寫為順序判斷程序。 |
| AMR-C12 | `depends_on` | AMR-C04 | 前端分支沿用前端任務推薦。 |
| AMR-C12 | `depends_on` | AMR-C05 | 困難後端分支沿用架構任務推薦。 |
| AMR-C12 | `depends_on` | AMR-C06 | 除錯分支沿用成功條件與獨立驗證要求。 |
| AMR-C12 | `depends_on` | AMR-C07 | 長時工作分支沿用無人值守推薦。 |
| AMR-C12 | `depends_on` | AMR-C08 | 例行高量與成本約束分支沿用成本敏感推薦。 |
| AMR-C13 | `elaborates` | AMR-C08 | 每完成任務成本展開「便宜模型何時真的較省」。 |
| AMR-C13 | `elaborates` | AMR-C11 | 成本算法是路由時的共同判準，不只屬單一模型。 |
| AMR-C14 | `exemplifies` | AMR-C11 | SaaS 專案是把不同任務送往不同模型的具體案例。 |
| AMR-C15 | `elaborates` | AMR-C11 | 合規與資料駐留加入能力／價格以外的路由約束。 |
| AMR-C16 | `elaborates` | AMR-C11 | 供應商抽象層把路由能力落到系統韌性與可切換性。 |
| AMR-C11 | `motivates` | AMR-C17 | 可更新路由制度的動機來自模型排名、供應與政策會快速變動。 |

第二遍長程掃描抓到 AMR-C10 → AMR-C01/C02、AMR-C13 → AMR-C11、AMR-C15/C16 → AMR-C11、AMR-C11 → AMR-C17。Checklist 與前文高度重合，正式抽邊時有過度連線風險；本次只連其實際包含的五個決策分支。

## 人工覆核點

1. **來源級時效風險**：文章明示基準時間為 2026 年 7 月，且自稱應每數週重評；正式收錄即使通過，也應優先進 `DOC/Review/`，記錄資料截止日與失效條件。
2. **模型身份與可用性**：Kimi K3、Claude Fable 5、GPT-5.6 Sol／Terra／Luna、Opus 4.8、DeepSeek V4 Pro、GLM-5.2 的名稱、發布狀態與供應範圍均未附官方來源。
3. **價格、上下文與授權**：token 價格、1M context、MIT 授權、開放權重、自架與雲端部署路徑均屬可變資料，必須逐項核對日期與條件。
4. **Benchmark 可比性**：Frontend Code Arena、Artificial Analysis、SWE-Bench Pro／Verified 被混用為任務推薦證據；需核對測試版本、配置、樣本與是否允許跨 benchmark 直接比較。
5. **行為風險歸因**：Sol goal-gaming、Fable 提早宣告完成與主動執行未請求行動等敘述聲稱來自官方材料，但未提供原文或連結。
6. **成本案例**：$0.03 對 $0.38、十二倍價差與 prompt caching 可省 90% 沒有 token 數、cache 命中率、提供商費率或量測方法。
7. **合規不是模型常數**：Bedrock／Vertex、資料駐留、DPA、出口管制與中國託管 API 的判斷高度依地區、帳戶、合約和日期；不得把文章建議直接當法律或合規結論。
8. **案例結果是預期，不是實證**：SaaS 多模型流程沒有執行紀錄、品質指標或總成本，因此只能作可遷移範例，不能證明路由一定同時提高品質並降低成本。

## 試作結論

1. 來源通過入口三問，可形成 18 個技能候選模塊與 25 條有文本證據的候選邊，不是零散來源。
2. v0.3 r6 能把可查核模型資料、作者路由建議、未來預測與社群呼籲分流，不需新增第七種 `claim_kind`。
3. Checklist 保留為 MethodModule，因它將前文建議轉成操作程序；社群追蹤呼籲則在建模塊前丟棄。
4. 四種現行模塊本體足以承載本篇；案例、方法與分析能分開，不需新增模型路由專用型別或邊。
5. 本篇的主要風險不是缺乏可遷移技能，而是事實層高度時效化且無引用。正式收錄前須補官方來源、資料截止日與覆核結果；在 M1／M2 啟用前不得把候選物件併入正式資料。

## SVG 視圖驗收

- 18 個候選模塊全數顯示，均附試作 ID 與原文 `char_span`。
- `provided`、`unverified`、`missing` 以框線區分；圖例明示抽取／支持狀態不等於事實真偽。
- 圖面只呈現決策脊柱與主要跨切關係；完整 25 條候選邊仍以本報告「候選邊草模」為準。
- SVG 未新增圖外主張，且沒有任何由視圖回寫候選模塊或邊的步驟。
