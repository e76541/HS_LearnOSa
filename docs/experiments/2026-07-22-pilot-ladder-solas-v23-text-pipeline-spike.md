# IMO／SOLAS V/23 引水梯新規文本管線紙上試作

## 試作定位

- 日期：2026-07-22
- 相關作業模塊：M1（籌備）、M2（視圖投影）
- 輸入：使用者貼文——DNV 2026 年第 23 號技術監管通告對 IMO MSC 110／SOLAS V/23 與「引水人登離船裝置強制性能標準」的解讀摘要；標 `#PILOTLADDER`
- 範圍：入口三問、候選分流、候選模塊切分、兩遍式候選邊抽取、收錄風險判斷、Dynamic View 出圖
- 限制：只作試作，不建立正式來源 ID、文本 ID、模塊 ID 或邊 ID；不轉 `DOC/`、不寫模塊庫或邊庫；不對 IMO／DNV 原文作外部查核。
- Inbox 候選夾：`Inbox/pilot-ladder-solas-v23/`（尚未完成必要處理；非正式庫）
- 對照正文：[source.txt](assets/2026-07-22-pilot-ladder-solas/source.txt)
- 動態視圖：[視圖索引](assets/2026-07-22-pilot-ladder-solas/views/README.md)（模塊總覽 1 + 單邊 17 + 整體路線 1）；有損投影，不回寫候選模塊或邊。

正文共 1,112 個 Unicode 字元；SHA-256 為 `60fc2ec94bd13a18a9dc5cfc4581084f22d8446f2e2a1a3a9b8c5052d1934e80`。下列 `char_span` 採零起點、右界不含，對齊上述正文。

## 入口三問

1. **有原文主張**：有。主張 2028-01-01 起新裝裝置須符合性能標準 A–C、全船 D–E 立即適用；既有裝置須於 2029／2030 首次檢驗完成合規；並給出強點、立柱、絞車、組合裝置、側門／陷阱門等加嚴參數。
2. **主張可獨立成立**：可。時程、證書與技術條款自成合規知識單元，不依賴既有斷邊題。
3. **是否只供當下斷邊題使用**：否。文本本身是完整法規／技術更新來源。

**入口結論：正常來源候選。** 不屬入口淘汰或一次性作答素材。

## 候選分流

以下區間在建立模塊前排除，不配發候選模塊 ID：

| `char_span` | `claim_kind` | `retention` | 原因 |
|---|---|---|---|
| `[0,53)` | `none` | `discard` | 標題／新聞頭條，只作來源中繼資料。 |
| `[535,549)` | `none` | `discard` | 「核心技術變更要點如下」導航句，非獨立命題。 |
| `[1099,1112)` | `none` | `discard` | `#PILOTLADDER` 標籤，不支撐技能命題。 |

本篇無廣告、個人故事或笑話段；記憶禁項未觸發額外丟棄。

## 候選模塊草模

下表是試作索引，`PL-Cxx` 只供本報告引用，不是正式 `module_id`。共同核心投影：文章類型為海事法規／技術通告解讀；領域為引水人登離船裝置合規；輸入為船型（SOLAS／非 SOLAS）、裝置安裝日與現況；輸出為適用時程、證書處置與改造檢查點；`schema_version=v0.3-r6`、`extractor=codex-paper-spike-2026-07-22`。所有列 `is_skill_signal=true`；抽取信心不表示法規條文已核對。

| 候選 | `char_span` | `claim_kind` | `provenance` | `support_status` | 類型 | 主要命題／型別重點 | 抽取信心 |
|---|---:|---|---|---|---|---|---:|
| PL-C00 | `[53,147)` | `attributed_claim` | `secondary` | `unverified` | AnalysisModule | DNV 通告解讀 MSC 110 通過的 SOLAS V/23 修正與全新強制性能標準；歸因 DNV，未附通告原文。 | 0.97 |
| PL-C01 | `[147,250)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 2028-01-01 後新裝須符合性能標準 A–C；無論安裝年限，存放／維護／檢查／操作均執行 D–E，無過渡期。 | 0.99 |
| PL-C02 | `[250,298)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 安全證書設備記錄附表改版，新增引水梯及扶手繩、備用梯、中間長度固定裝置三類登記項。 | 0.98 |
| PL-C03 | `[298,404)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 2028 前已裝裝置：SOLAS 船於 2029-01-01 後首次法定檢驗完成全維度合規；非 SOLAS 延後至 2030 後首次檢驗。 | 0.99 |
| PL-C04 | `[404,460)` | `verifiable_claim` | `secondary` | `unverified` | MethodModule | 新版設備記錄正式換發前，船級社可出《合規聲明》作過渡臨時證明，效力至 2029 首次檢驗完成。 | 0.97 |
| PL-C05 | `[460,535)` | `interpretation` | `primary` | `unverified` | AnalysisModule | 多數在役船需實體改造，部分涉熱工與結構施工；屬解讀結論，未附船隊統計。 | 0.95 |
| PL-C06 | `[549,681)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 甲板強點：距舷緣 ≥915mm（寬度受限取最大可行）；MBL ≥48kN 並標註／存證；引水梯與扶手繩禁止共用強點。 | 0.99 |
| PL-C07 | `[681,786)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 立柱／握柄直徑 32–36mm；向內距舷緣 ≤0.12m；上部設內徑 ≥60mm 圓環／眼環穿扶手繩。 | 0.99 |
| PL-C08 | `[786,850)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 絞車捲筒直徑 ≥0.16m，並設凹陷式固定位固定索套端頭。 | 0.98 |
| PL-C09 | `[850,953)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 組合裝置：舷梯傾角 ≤45°（新增強制）；≥4m 雙色視覺標識；引水梯下端高出舷梯下平台 ≥2m，踏步緊貼外板。 | 0.99 |
| PL-C10 | `[953,1099)` | `verifiable_claim` | `primary` | `unverified` | MethodModule | 無平台側門：強點在開口處最低甲板；有平台側門：標 SWL 並留載荷試驗證書；陷阱門：梯高出平台 ≥2m，下平台距水面 ≥5m 且水平。 | 0.99 |

本次無背景模塊：開頭通告定位與後段技術條款皆直接支撐合規技能；標題與標籤已 discard。

## 候選邊草模

方向遵守「箭頭指向被支撐者」。只保留正文可直接支持的關係；不建立編號清單順序邊。

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| PL-C01 | `depends_on` | PL-C00 | A–C／D–E 適用以 MSC 110／性能標準存在為前提。 |
| PL-C02 | `elaborates` | PL-C01 | 設備記錄三類登記項展開新規下的證書面要求。 |
| PL-C03 | `elaborates` | PL-C01 | 既有裝置的 2029／2030 檢驗路徑是新裝／全船 D–E 框架的既有船分支。 |
| PL-C04 | `condition` | PL-C02 | 《合規聲明》是新版設備記錄換發前的臨時證明條件。 |
| PL-C04 | `condition` | PL-C03 | 聲明效力綁定至 2029 首次檢驗完成。 |
| PL-C05 | `motivates` | PL-C06 | 「多數需實體改造」的動機來自強點加嚴。 |
| PL-C05 | `motivates` | PL-C07 | 同理指向立柱／扶手尺寸與位置改造。 |
| PL-C05 | `motivates` | PL-C09 | 組合裝置傾角與視覺標識屬新增強制，支撐改造判斷。 |
| PL-C05 | `motivates` | PL-C10 | 側門／陷阱門固定與平台要求支撐結構施工判斷。 |
| PL-C06 | `elaborates` | PL-C05 | 強點參數是改造範圍的具體展開。 |
| PL-C07 | `elaborates` | PL-C05 | 立柱參數是改造範圍的具體展開。 |
| PL-C08 | `elaborates` | PL-C05 | 捲筒要求是配備絞車時的改造展開。 |
| PL-C09 | `elaborates` | PL-C05 | 組合裝置條款展開改造與檢查點。 |
| PL-C10 | `elaborates` | PL-C05 | 側門／陷阱門條款展開改造與檢查點。 |
| PL-C06 | `depends_on` | PL-C01 | 強點設計／固定屬 A–C 安裝合規細節。 |
| PL-C07 | `depends_on` | PL-C01 | 立柱／扶手屬安裝合規細節。 |
| PL-C09 | `depends_on` | PL-C01 | 組合裝置傾角等屬安裝合規細節。 |

第二遍長程掃描抓到 PL-C04 → PL-C02／C03、PL-C06–C10 → PL-C01、PL-C05 → PL-C09／C10。未為「1.–5.」清單製造順序邊；未把新聞標題連入圖。

## 人工覆核點

1. **二手通告風險**：正文是 DNV 解讀摘要，非正式 IMO／SOLAS 合併文本；正式收錄須對 MSC 110 決議、性能標準全文與 DNV 通告原文。
2. **日期與適用面**：2028／2029／2030、SOLAS／非 SOLAS 分流、D–E「無過渡期」均屬可外部查核主張，現標 `unverified`。
3. **用字歧義**：「換髮」疑為「換發」；「幹舷甲板」應核對是否為「乾舷甲板」。正式抽樣前應校正或保留原文並註疑。
4. **參數單位與門檻**：915mm、48kN、32–36mm、0.12m、60mm、0.16m、45°、4m、2m、5m 必須與官方性能標準逐項比對。
5. **《合規聲明》效力**：屬船級社過渡安排，可能因船旗／船級而異；不宜在未核前寫成全球統一法定效力。
6. **收錄分流建議**：即使 M1 啟用，本篇應優先 `DOC/Review/`，`review_reason=secondary-digest-unverified-against-IMO-primary`。

## 試作結論

1. 來源通過入口三問，可形成 **11** 個候選模塊與 **17** 條有文本證據的候選邊，不是零散來源。
2. 本體以 MethodModule（時程／證書／技術參數）為主，AnalysisModule 僅兩塊（通告定位、改造影響詮釋）；現行四類型足夠，無需新本體。
3. v0.3 r6 候選分流可乾淨丟掉標題、導航句與 hashtag，不污染模塊庫。
4. 主風險是**二手法規摘要未核**。M1 啟用後的正式路徑應：對一級文本 → Review → 再 Stocks；在此之前候選物件不得併入正式資料。
5. Inbox 夾僅表「尚未完成必要處理」；與本報告、assets 對照正文三者內容一致（同 SHA-256），但皆非正式收錄完成。

## 視圖驗收

- [模塊總覽](assets/2026-07-22-pilot-ladder-solas/views/00-modules.html)：11 候選模塊全數顯示，附試作 ID 與 `char_span`；本圖不含邊。
- [單邊圖 E01–E17](assets/2026-07-22-pilot-ladder-solas/views/README.md)：一頁一邊，標邊類型中英、來源／被支撐者與證據摘要。
- [整體合規路線](assets/2026-07-22-pilot-ladder-solas/views/99-route.html)：時程／證書／改造三帶投影；技術檢查點在底列合併，完整邊仍以單邊圖為準。
- 未新增圖外主張；無任何由視圖回寫候選模塊或邊的步驟。
