# D46 試作：LLM Wiki 導覽文（含金量切模塊）

## 試作定位

- 日期：2026-08-05
- 相關作業模塊：F（F2；試作，不建正式 ID）
- 相關草案：**D46**
- 輸入：使用者提供之 Karpathy／LLM Wiki 工程導覽文（已清重複圖說一行）
- 範圍：寫清當下含金量定義 → 候選分流 → 模塊草模 → 同分組表；**優化 D46** 的回饋見報告末與草案 §6
- 限制：不建正式 `source_id`／`module_id`；不寫 `DOC/`；不升格；廣告／星數／成長故事依記憶與規範丟棄

正文：[`source.txt`](assets/2026-08-05-d46-llm-wiki/source.txt)  
Unicode 字元 **8543**；SHA-256 `6935f2b2de99bc64a2c5ac97a056967b715ddbd4259d8096dbfaa20b937c6171`  
`char_span`：零起點、右界不含。

## 1. 當下含金量定義（本篇自訂）

本篇**明示**的計量語言不是「任意字元數」，而是：

| 優先 | 單位 | 文本依據 |
|---|---|---|
| 1 | **token** | raw 5,000／檔、查詢 50–100K vs wiki 5–15K、節省 70–90% |
| 2 | **概念頁** | 「One concept per page」；一文 → 8–15 wiki 頁；20 頁 PDF → 30–50 concepts |
| 3 | **字元（回退）** | 僅作 `char_span` 證據與過大／過小輔助；本篇未以字元當成本單位 |

**試作切塊規則**：對齊「一概念／一資料夾職責／一可執行程序」成塊；用字元長輔助——過短純圖說／行銷不立塊；過長程序可保留為單一 Method（本篇 ingest 五步未再切）。

## 2. 候選分流（建立模塊前丟棄）

| `char_span` | `claim_kind` | `retention` | 原因 |
|---|---|---|---|
| `[0,352)` | `none` | `discard` | 標題＋「41,000／5%／沒人寫過」行銷導語 |
| `[1286,1401)` | `none` | `discard` | gist 星數＋ vault 圖說，無獨立可遷移命題 |
| `[1967,2051)` | `none` | `discard` | Obsidian UI 圖說 |
| `[4948,5040)` | `none` | `discard` | CLAUDE.md 宣傳圖說 |
| `[6710,6818)` | `none` | `discard` | 架構口號複述，前文已有 |
| `[7256,7643)` | `none` | `discard` | Starter repos＋星數，偏產品安利 |
| `[7817,8543)` | `none` | `discard` | Week1–Month6 故事＋結尾動員句 |

## 3. 候選模塊草模

試作 ID `LW-Cxx` ≠ 正式 `module_id`。共同：`schema_version=v0.3-r7`（欄位對齊現行模塊層；本報告不寫死升格）、`extractor=d46-paper-spike-2026-08-05`、`is_skill_signal=true`（除非另註）。  
**含金量**：`gold_unit`＝本篇定義；`gold_note`＝對該塊有意義的 token／概念頁訊號；`chars`＝span 長度。

| 候選 | `char_span` | chars | gold_note | `claim_kind` | 類型 | 主要命題 |
|---|---|---:|---|---|---|---|
| LW-C01 | `[352,851)` | 499 | 問題＝重複付 token | `interpretation` | TeachingModule | AI 工具忘上下文；根因是架構不是模型；症狀＝同一 PDF 重複讀、重複計費 |
| LW-C02 | `[851,1286)` | 435 | 編譯一次、查詢永久 | `advice` | TeachingModule | raw＝原始碼、wiki＝編譯產物；只查 wiki、不再每會話重編譯 raw |
| LW-C03 | `[1401,1557)` | 156 | 三資料夾無外部 DB | `advice` | MethodModule | 全系統＝`raw/`＋`wiki/`＋`instructions/`，無另購資料庫 |
| LW-C04 | `[1557,1785)` | 228 | 原文唯讀 | `advice` | MethodModule | `raw/` 真相源；可丟入多格式；**永不改** raw |
| LW-C05 | `[1785,1967)`∪`[2051,2270)` | 399 | 一概念一頁＋index／hot | `advice` | MethodModule | wiki 頁必含 Summary／Key Points／Connections／Sources／Metadata；`index.md` 總目錄、`hot.md` 近況快取（span 中空為已丟圖說） |
| LW-C06 | `[2270,2443)` | 173 | 編譯設定 | `advice` | MethodModule | `instructions/` 約束處理；無此則模型自決 |
| LW-C07 | `[2443,3067)` | 624 | 一概念一頁規則集 | `advice` | MethodModule | PROCESSING：建頁／`[[wikilinks]]`／多源合併／矛盾不靜默覆蓋／90 日陳舊 |
| LW-C08 | `[3067,3794)` | 727 | 30–50 concepts／文 | `advice` | MethodModule | 攝入五步：解析→對 index 判新舊矛盾→建或合併→建連線→更新 index／hot |
| LW-C09 | `[3794,4036)` | 242 | 8–15 頁；省 70–90% token | `verifiable_claim` | AnalysisModule | 一文編譯成 8–15 互鏈短頁；之後查詢只讀乾淨層→號稱 70–90% token 節省（未附獨立量測） |
| LW-C10 | `[4036,4387)` | 351 | MCP 連 vault | `advice` | MethodModule | Claude＋Obsidian；`mcpvault` 掛 vault 路徑（含訂閱價作 hooks，非正式要件） |
| LW-C11 | `[4387,4948)` | 561 | 初始化結構＋CLAUDE.md 訪談 | `advice` | MethodModule | 建三資料夾與 PROCESSING／根 CLAUDE.md（一問一答建檔） |
| LW-C12 | `[5040,5368)` | 328 | 批次攝入提示 | `advice` | MethodModule | 掃未對應 wiki 的 raw；按 PROCESSING 建頁與連線；回報處理量 |
| LW-C13 | `[5368,5631)` | 263 | 只准 wiki 作答 | `advice` | MethodModule | 深查詢：hot→index→相關頁；**只用 wiki**；不足則指缺 raw；禁用訓練記憶充數 |
| LW-C14 | `[5631,5862)` | 231 | 日維運 | `advice` | MethodModule | 晨間：攝入新 raw、標陳舊／矛盾／孤兒、更新 hot、三行簡報 |
| LW-C15 | `[5862,6149)` | 287 | 週稽核健康分 | `advice` | MethodModule | 全頁核來源、列矛盾對、找斷叢、合併候選、健康分寫入 audits |
| LW-C16 | `[6149,6367)` | 218 | 三輪自動研究 | `advice` | MethodModule | 網搜三輪→raw/research→按 PROCESSING 建 wiki→更新索引 |
| LW-C17 | `[6367,6710)` | 343 | 六日常指令 | `advice` | MethodModule | ingest／ingest all／what do you know／save／autoresearch／lint |
| LW-C18 | `[6818,7256)` | 438 | 250K→50K wiki；日查詢量級 | `verifiable_claim` | AnalysisModule | 50×5K token raw；傳統日詢 500K–1M vs wiki 層 50–150K（作者算術，未獨立複驗） |
| LW-C19 | `[7643,7817)` | 174 | 權限級唯讀 | `advice` | MethodModule | 唯讀授權；口頭「別刪」無效；能刪終會刪 |

**未建背景模塊**：開頭行銷已 discard；無「只鋪陳無程序」且仍支撐技能的獨立舞台段。

詳表另見 [`modules.md`](assets/2026-08-05-d46-llm-wiki/modules.md)、[`group-tables.md`](assets/2026-08-05-d46-llm-wiki/group-tables.md)。

## 4. 同分組表（同定義×同背景×分狀況）

- **同定義**：§1 本篇含金量（token 優先＋概念頁＋字元回證）  
- **同背景**：LLM Wiki／raw→wiki 編譯架構  
- **狀況**不同 → **三張表**（不合併）

見 [`group-tables.md`](assets/2026-08-05-d46-llm-wiki/group-tables.md)：

1. **狀況＝架構定義**（C01–C07）  
2. **狀況＝攝入編譯**（C08–C12、C16）  
3. **狀況＝查詢維運與成本**（C13–C15、C17–C19）

## 5. 效果與對 D46 的優化點

| 觀察 | 對草案影響 |
|---|---|
| 文本自訂單位是 **token／概念頁**，硬用「字元上下限」會與原文語言打架 | §2.1 改為：**明示計量單位優先**；字元主要服務 `char_span` 與過大／過小輔助 |
| 「一概念一頁」已是切塊契約 | 含金量切塊應對齊文本自訂的**概念／程序粒度**，非固定 N 字 |
| 星數、成長故事、安利 repo 大量 | 分流必先跑；與記憶「不要廣告」一致，寫進 §2.1 禁則例 |
| 同分組「狀況」用 架構／攝入／維運 三分表可讀 | §2.3 補**預設狀況軸**示例；欄位最小集定案建議（待裁 b 收斂） |
| 非連續 span（圖說挖空） | 試作允許∪；正式規範仍偏好連續 span——待裁 f |

## 6. 下一步

- 已回寫 **D46** §2.1／§2.3／§5／§6  
- 若再測：換「無 token 語言」的文本，驗回退字元預設  
- 不升格、不進 DOC，除非使用者另裁
