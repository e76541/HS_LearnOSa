# 量化投資組合文章文本管線紙上試作

## 試作定位

- 日期：2026-07-22
- 相關作業模塊：M1、M2（籌備）
- 輸入：〈How To Build a Quant Portfolio From Scratch (2026 Edition)〉純文字附件
- 範圍：入口三問、候選分流、候選模塊切分、兩遍式候選邊抽取、收錄風險判斷
- 限制：只作試作，不建立正式來源 ID、文本 ID、模塊 ID 或邊 ID；不寫入 `Inbox/`、`DOC/`、模塊庫或邊庫。

附件共 20,399 個 Unicode 字元；SHA-256 為 `61282ac1da42f677713f5efc09ce59dbda3cb611cae86d443e18a232407368ad`。下列 `char_span` 採零起點、右界不含。

## 入口三問

1. **有原文主張**：有。文章提出分散化、共變異數估計、配置、觀點融合、再平衡與策略停用的一組方法主張。
2. **主張可獨立成立**：可。雖然五章相互承接，各章仍有完整定義、公式、方法或操作判準。
3. **是否只供當下斷邊題使用**：否。文本本身是完整教學來源，不依賴既有斷邊題才有意義。

**入口結論：正常來源候選。** 不屬入口淘汰或一次性作答素材。

## 候選分流

以下區間在建立模塊前排除，不配發候選模塊 ID：

| `char_span` | `claim_kind` | `retention` | 原因 |
|---|---|---|---|
| `[0,199)` | `none` | `discard` | 標題與副標題，只作來源中繼資料。 |
| `[1461,2304)` | `none` | `discard` | 收藏呼籲、作者自介、閱讀成果預告與閱讀順序指示，不構成獨立技能命題。 |
| `[18376,20399)` | `none` | `discard` | 主要重述前文結論，末段為邀請讀者自省的互動題；本次無新增命題簇。 |

`discard` 只代表不建立模塊；原文字串仍由來源完整保存。摘要段若未來被證明含前文未涵蓋的新命題，須另送人工覆核，不得只因位於 Summary 便一律排除。

## 候選模塊草模

下表是試作索引，`QPS-Cxx` 只供本報告引用，不是正式 `module_id`。共同核心投影：文章類型為量化投資組合教學；領域為投資組合建構；輸入以歷史報酬、共變異數、權重、觀點或診斷序列為主；輸出以風險解釋、配置權重或操作決策為主；`schema_version=v0.3-r6`、`extractor=codex-paper-spike-2026-07-22`。所有列 `is_skill_signal=true`，抽取信心不代表主張為真。

| 候選 | `char_span` | `claim_kind` | `provenance` | `support_status` | 類型 | 主要命題／型別重點 | 抽取信心 |
|---|---:|---|---|---|---|---|---:|
| QPS-C00 | `[199,652)` | `interpretation` | `primary` | `missing` | AnalysisModule | 只有「多樣化」口號不足以工程化配置；需用可量測的風險關係建構投資組合。證據為作者觀察，反論未給。 | 0.91 |
| QPS-C01 | `[652,1461)` | `attributed_claim` | `secondary` | `unverified` | TeachingModule | 以 Markowitz 歷史鋪陳「變異數公式精確、實務困難在輸入估計」的主線；人物、年份與學術定位未核對。 | 0.94 |
| QPS-C02 | `[2304,3778)` | `verifiable_claim` | `unknown` | `provided` | TeachingModule | 用二資產變異數公式解釋相關係數為 1、0、負值時的分散化效果；公式為主要 hook，限制是尚未處理估計誤差。 | 0.98 |
| QPS-C03 | `[3778,5070)` | `advice` | `primary` | `provided` | MethodModule | 以 `w'Σw` 與 diversification ratio 衡量新增資產是否帶來真實分散化；前提是共變異數可靠，失效模式是噪音矩陣製造虛假改善。 | 0.96 |
| QPS-C04 | `[5070,6752)` | `verifiable_claim` | `secondary` | `unverified` | AnalysisModule | 共變異數參數量隨資產數快速增加，樣本矩陣會把估計噪音放大成極端且不穩定的配置。數量公式有提供，經驗效果未附來源。 | 0.97 |
| QPS-C05 | `[6752,8553)` | `advice` | `secondary` | `unverified` | MethodModule | 先用 Ledoit–Wolf shrinkage，再檢查 condition number；約束是 target 與 shrinkage 強度須合適，失效模式是近奇異矩陣使反矩陣不穩定。 | 0.96 |
| QPS-C06 | `[8553,9544)` | `interpretation` | `secondary` | `unverified` | AnalysisModule | 樸素 MVO 即使改善共變異數，仍會因預期報酬估計噪音產生極端權重；文中數字例與「幾乎不會無重度約束運行」未附來源。 | 0.95 |
| QPS-C07 | `[9544,10181)` | `verifiable_claim` | `secondary` | `unverified` | TeachingModule | Risk parity 以總風險貢獻相等取代預期報酬最大化；TRC 公式有提供，機構採用敘述未核對。 | 0.95 |
| QPS-C08 | `[10181,11979)` | `verifiable_claim` | `secondary` | `unverified` | MethodModule | HRP 先按相關行為聚類，再沿樹遞迴分配風險，以避免共變異數反矩陣；輔助函式缺失，程式不可直接執行。 | 0.96 |
| QPS-C09 | `[11979,12635)` | `advice` | `primary` | `unverified` | MethodModule | 作者建議以 HRP 為基準配置，理由是其結構上較不放大估計誤差；限制是文中承認樣本外研究結果混合且等權重難以擊敗。 | 0.97 |
| QPS-C10 | `[12635,14977)` | `advice` | `secondary` | `unverified` | MethodModule | 用 Black–Litterman 依觀點信心傾斜風險基準；`P/Q/omega` 提供操作骨架，前提是基準、觀點與不確定度可校準。 | 0.96 |
| QPS-C11 | `[14977,16645)` | `advice` | `secondary` | `unverified` | MethodModule | 以權重偏離閾值而非固定日曆觸發再平衡；需明定 band 與交易成本，過窄增加換手、過寬增加漂移。 | 0.97 |
| QPS-C12 | `[16645,18376)` | `advice` | `primary` | `unverified` | MethodModule | 分離「暫時虧損」與「策略成立理由已退化」，依模型信心水準與趨勢決定正常、減碼或停用；閾值與 60 日窗口缺外部校準。 | 0.97 |

### 公式與程式 hooks

- QPS-C02：二資產變異數公式，`[2610,2645)`。
- QPS-C03：`σ_p² = w'Σw` 與 diversification ratio 程式，位於 `[3853,4476)`。
- QPS-C05：shrinkage 公式與 Ledoit–Wolf 程式，位於 `[6999,7509)`。
- QPS-C07：總風險貢獻公式，位於 `[10069,10181)`。
- QPS-C08：HRP 程式骨架，位於 `[11113,11568)`。
- QPS-C10：Black–Litterman 公式與 posterior 程式，位於 `[13463,14485)`。
- QPS-C11：再平衡觸發程式，位於 `[15881,16088)`。
- QPS-C12：策略狀態程式，位於 `[17474,17917)`。

hooks 附屬宿主候選，不另建節點、不進邊或對齊。部分區間包含公式周邊說明，正式抽取時應再縮至精確行界。

## 候選邊草模

方向遵守「箭頭指向被支撐者」。只保留正文可直接支持的關係；未建立章節順序邊。

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| QPS-C01 | `elaborates` | QPS-C00 | Markowitz 歷史與「公式／估計」落差展開為何投資組合不能只靠口號。 |
| QPS-C02 | `solves` | QPS-C00 | 二資產變異數公式把「分散有效多少」轉成可計算關係。 |
| QPS-C03 | `depends_on` | QPS-C02 | diversification ratio 以多資產變異數與個別波動為前提。 |
| QPS-C04 | `elaborates` | QPS-C03 | 共變異數估計噪音具體說明 ratio 何時會失真。 |
| QPS-C05 | `solves` | QPS-C04 | shrinkage 與 condition number 檢查用來降低樣本共變異數不穩定。 |
| QPS-C06 | `depends_on` | QPS-C05 | MVO 討論明示先假設共變異數已妥善估計，再暴露預期報酬噪音。 |
| QPS-C07 | `contrasts` | QPS-C06 | Risk parity 拿掉預期報酬最大化，改以等風險貢獻配置。 |
| QPS-C08 | `contrasts` | QPS-C06 | HRP 用聚類與遞迴配置對照 MVO 的反矩陣式配置。 |
| QPS-C08 | `contrasts` | QPS-C07 | HRP 避開作者認為標準 risk parity 仍暴露的結構問題。 |
| QPS-C08 | `solves` | QPS-C04 | HRP 被提出為避免矩陣反演放大估計誤差的方法。 |
| QPS-C09 | `depends_on` | QPS-C08 | 採 HRP 為基準的建議依賴前段對 HRP 結構的說明。 |
| QPS-C10 | `depends_on` | QPS-C09 | Black–Litterman 傾斜以風險基準配置為起點。 |
| QPS-C10 | `depends_on` | QPS-C05 | posterior 公式仍使用共變異數，因此承接先穩定估計 Σ 的要求。 |
| QPS-C11 | `depends_on` | QPS-C09 | 再平衡要先有可交易的目標權重；文中基準方案為 HRP。 |
| QPS-C12 | `contrasts` | QPS-C11 | 再平衡是把既有來源拉回目標權重；策略停用則判定該來源是否仍應存在。 |

第二遍長程掃描抓到 QPS-C08 → QPS-C04、QPS-C10 → QPS-C05、QPS-C11 → QPS-C09 三組跨章關係。未替 QPS-C12 製造「總結章」父節點；其模型退化判準可獨立成立。

## 人工覆核點

1. **來源鏈缺失**：大量使用「研究顯示」「截至 2025／2026」「機構正在使用」等說法，但未附論文、資料或連結；正式收錄前只能標 `unverified`。
2. **公式呈現缺口**：正文介紹 diversification ratio 的分子與分母，但純文字中沒有獨立顯示 ratio 公式；只有程式碼可回推出定義。
3. **HRP 程式不完整**：`get_quasi_diag`、`recursive_bisection` 未定義，所謂可從套件取得也未給版本或 API。
4. **Risk parity 技術邊界**：文章把 MVO 與標準 risk parity 一併描述為必須反演共變異數；此敘述需由領域人工覆核，不能直接升格為客觀機制。
5. **Black–Litterman 基準轉換**：從 HRP 權重反推均衡報酬，以及「無觀點時精確回到風險權重」的條件未完整交代。
6. **操作閾值未校準**：5% 再平衡 band、`cut_below=0.30`、`trend_below=-0.005` 與 60 日窗口都是作者示例，不能當成通用規則或直接生成應用題。

## 試作結論

1. 來源通過入口三問，可形成 13 個技能候選模塊與 15 條有文本證據的候選邊，不是零散來源。
2. v0.3 r6 能把促銷、閱讀指示、重複總結與互動收尾在建模塊前排除，未產生假模塊。
3. `claim_kind` 與 `support_status` 能保留作者建議及未核對研究敘述，而不把它們冒充已證實真值。
4. 四種現行模塊本體足以容納本篇；未出現必須新增型別或第七種 `claim_kind` 的證據。
5. 正式收錄前應取得來源 URL、作者與發表資訊，補核主要研究主張並人工裁定技術覆核點；在 M1／M2 啟用前不得把本報告候選物件併入正式資料。

