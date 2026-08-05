# LLM Wiki 模式 × HS_LearnEdge 對照

- 短代號：D47
- 狀態：草稿
- 裁決來源：無
- 實作參照：[D46 LLM Wiki 文試作](../experiments/2026-08-05-d46-llm-wiki-spike.md)（同文作切塊試材，非本對照）
- 後繼：無（自外部 LLM Wiki 工程導覽抽出**模式對照**；與 [D46](2026-08-05-char-gold-module-tables.md) 分工；不進最優先表）

## 0. 定位

把「raw 編譯成 wiki、之後只查 wiki」這套**外部模式**對照到本專案既有管線與治理，供採納／拒絕決策。

- **不是** 在本庫建 `raw/`／`wiki/`／Obsidian vault。
- **不是** 新作業模塊提案；不改 `agent-ops` 登記表。
- **不是** D46：D46 用該導覽文當**含金量切塊試材**；本稿處理**模式本身**與 LearnEdge 的映射。
- **不是** 升格／啟用；未裁前僅草案。

## 1. 一句話

LLM Wiki：原文＝原始碼、wiki＝編譯產物、只對編譯層查詢。  
HS_LearnEdge：來源保存＝原文層、文本模塊＋邊＝編譯索引層、練習／演講／視圖＝查詢與使用層——**已經是同一類架構**，差別在證據、ID、站位與封閉世界約束更硬。

## 2. 三資料夾 ↔ 本專案落點

| LLM Wiki | 本專案近義 | 對準規則 | 禁混 |
|---|---|---|---|
| `raw/`（永不改） | `Inbox/` 入口＋`DOC/` 來源保存／指紋 | 原文唯讀；身份在 Document／來源層 | 不得用 wiki 頁覆寫 raw |
| `wiki/` 概念頁 | **文本模塊**（＋邊） | 一命題簇一模塊；`char_span` 證據；非正式「一概念一頁」口號 | wiki 頁 ≠ 作業模塊；≠ D39 知識塊 |
| `wiki/index.md` | `DOC/INDEX`／模塊索引／技能登記簿入口 | 先讀目錄再深讀 | 不得拿治理看板當知識 index |
| `wiki/hot.md` | 交接快照一句話＋近期變更／使用紀錄近況 | session 快取；可丟、可重建 | 不得當 canonical 真值 |
| `instructions/PROCESSING.md` | `Library/CURRENT`＋領域 Skills＋記憶禁項 | 編譯規則外置；禁止模型自決覆寫規範 | 不得用 PROCESSING 口吻改 agent-ops |
| Obsidian 圖視圖 | T2／T3 Dynamic View、`tools/viz/` | **投影**；不回寫模塊／邊真值 | 視圖 ≠ 真值庫 |

## 3. 攝入五步 ↔ 站位

| LLM Wiki 步 | LearnEdge | 備註 |
|---|---|---|
| 1 讀 raw、抽概念 | F1 收錄＋CandidateDisposition | 行銷／星數／成長故事 → `discard`（記憶＋D46 禁則） |
| 2 對 index 判新／舊／更新／矛盾 | F2 模塊＋既有庫比對；矛盾不靜默覆蓋 | 對齊 PROCESSING「[!contradiction]」精神 → 標 `needs_review` 或矛盾註記，不覆寫 |
| 3 建頁或合併 | F2 建模塊／合併命題簇 | 正式須 `module_id`／`source_id`；試作可用暫 ID |
| 4 建連線 | F2 `extract-structure` 邊 | 邊有型別／方向；非僅 `[[wikilinks]]` |
| 5 更新 index／hot | DOC INDEX、登記層、交接／hot 類快取 | hot 可選；真值不靠 hot |

## 4. 查詢與維運 ↔ 既有約束

| LLM Wiki | LearnEdge | 採納建議 |
|---|---|---|
| 深查詢只用 wiki、禁用訓練記憶充數 | 練習／演講封閉世界；證據須回模塊／邊 | **採**：答題與導航只引用編譯層＋可追溯來源 |
| 不足則指缺 raw | 回報缺來源／缺模塊，不瞎補 | **採** |
| 晨間攝入＋陳舊／孤兒 | 來源排程（D36）、選模塊、邊陳舊複審 | **對照**；不另造「晨間」儀式除非排程裁入 |
| 週稽核健康分 | V1 抽查；試作審計報告 | **對照**；健康分不進 canonical 除非另裁 |
| autoresearch 三輪入 raw | 可作試作；正式仍走 F1 | **試作可**；正式須收錄閘 |
| 權限級唯讀（能刪終會刪） | Agent 工具權限；禁擅自刪 DOC／canonical | **採**（治理已近） |

## 5. Token 算術：對本專案的含義

導覽文宣稱：raw 一次編譯 → 之後查詢 70–90% token 節省（作者算術，未獨立複驗）。

對 LearnEdge：

| 主張 | 本專案解讀 |
|---|---|
| 不要每 session 重餵全文 | 已由「模塊＝索引、非閱讀面」＋視圖投影支撐 |
| 查詢讀乾淨短頁 | 對齊「讀模塊／邊／視圖，不重讀整份 raw」 |
| 成本單位＝token | 領域切塊時若文本明示 token／概念頁 → 跟 D46 計量優先序；否則字元回退 |

**不採**：把「星數／41,000 開發者／訂閱價」當架構證據。

## 6. 明確不採（防漂移）

1. 在倉庫根另立平行 `raw/`／`wiki/` 雙軌，取代 `DOC/`／模塊層。  
2. 用 Obsidian 當正式真值庫，繞過 `module_id`／`char_span`／登記層。  
3. 新開作業模塊「Wiki」——能力落在既有 **F**（編譯）／**T**（投影）／**V**（抽查）。  
4. 把 LLM Wiki 的「一概念一頁」覆寫 canonical 模塊粒度（命題簇／不可分機制）。  
5. 未裁即將導覽文 Starter repo／MCP 安裝寫進套件索引（套件索引只收已核可來源）。

## 7. 可選後續（須另裁）

| # | 題 | 說明 |
|---|---|---|
| a | hot 層要不要正式化 | 交接一句話 vs 獨立 `hot.md`；預設維持交接／看板，不新建 |
| b | 矛盾 callout 格式 | 是否在模塊／Review 註記對齊 `[!contradiction]` 語義 |
| c | 查詢提示詞模板 | 「只准 wiki／模塊層作答」是否收進某 Skill 附錄 |
| d | 與 D36 排程銜接 | 晨間／陳舊是否併入來源學習排程事件 |
| e | 第二篇無 token 語言文本 | 繼續 D46 回退字元預設（與本稿無關，掛 D46） |

## 8. 與他稿邊界

| 既有 | 關係 |
|---|---|
| [D46](2026-08-05-char-gold-module-tables.md) | 同文試材；本稿不重切 LW-Cxx |
| [D34 bridge](2026-08-04-learnosa-hs-learnedge-bridge.md) | 內容／領域／治理三層分流；本稿加**外部模式**第四參照面，不覆寫 D34 |
| [D35 runnable-flow](2026-08-04-learnosa-learnedge-runnable-flow-reference.md) | 可跑通參考；本稿不改流程步驟 |
| [D36 排程](2026-08-05-source-learning-schedule.md) | 維運節奏可對照；不改排程正文 |
| canonical 模塊層 | §2～§3 映射必須服從；衝突→停並回報 |

## 代號對照表

| 代號 | 白話 |
|---|---|
| **D47** | 本稿：LLM Wiki 模式對照 LearnEdge |
| **D46** | 含金量切塊草案；同文首跑試作 |
| LLM Wiki | 外部模式：raw→wiki 編譯後只查 wiki |
| raw／wiki／instructions | 對照用外詞；本庫落點見 §2 |
| LW-Cxx | D46 試作候選 ID；非正式模塊 |
