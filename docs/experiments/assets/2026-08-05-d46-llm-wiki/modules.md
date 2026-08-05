# D46 試作模塊草模（LLM Wiki 文）

試作 ID；非正式 `module_id`。來源 [`source.txt`](source.txt)。

| 候選 | `char_span` | chars | gold_unit | gold_note | 類型 | 命題一句 |
|---|---|---:|---|---|---|---|
| LW-C01 | `[352,851)` | 499 | token | 重複讀檔＝重複付 token | Teaching | 遺忘是架構問題 |
| LW-C02 | `[851,1286)` | 435 | concept-page | 編譯一次 | Teaching | raw＝源碼；wiki＝編譯產物 |
| LW-C03 | `[1401,1557)` | 156 | concept-page | 三資料夾 | Method | raw／wiki／instructions |
| LW-C04 | `[1557,1785)` | 228 | concept-page | raw 唯讀 | Method | 永不改 raw |
| LW-C05 | `[1785,1967)`∪`[2051,2270)` | 399 | concept-page | 一概念一頁；index／hot | Method | wiki 頁結構＋雙特殊檔 |
| LW-C06 | `[2270,2443)` | 173 | concept-page | 編譯設定 | Method | instructions 約束處理 |
| LW-C07 | `[2443,3067)` | 624 | concept-page | PROCESSING 規則 | Method | 建頁／連結／矛盾／陳舊 |
| LW-C08 | `[3067,3794)` | 727 | concept-page | 30–50 concepts | Method | 攝入五步 |
| LW-C09 | `[3794,4036)` | 242 | token | 70–90% 節省宣稱 | Analysis | 8–15 頁乾淨層 |
| LW-C10 | `[4036,4387)` | 351 | concept-page | MCP vault | Method | 安裝與連線 |
| LW-C11 | `[4387,4948)` | 561 | concept-page | 初始化提示 | Method | 建庫＋CLAUDE.md 訪談 |
| LW-C12 | `[5040,5368)` | 328 | concept-page | 批次攝入提示 | Method | 掃 raw 建 wiki |
| LW-C13 | `[5368,5631)` | 263 | token | 只讀 wiki 省 token | Method | 深查詢禁用訓練充數 |
| LW-C14 | `[5631,5862)` | 231 | concept-page | 日維運 | Method | 晨間三行簡報 |
| LW-C15 | `[5862,6149)` | 287 | concept-page | 週健康分 | Method | 全庫稽核 |
| LW-C16 | `[6149,6367)` | 218 | concept-page | 三輪研究 | Method | autoresearch |
| LW-C17 | `[6367,6710)` | 343 | concept-page | 六指令 | Method | 日常指令表 |
| LW-C18 | `[6818,7256)` | 438 | token | 250K／50K／日詢量級 | Analysis | token 算術對照 |
| LW-C19 | `[7643,7817)` | 174 | concept-page | 權限唯讀 | Method | 控制刪除權 |
