# D46 同分組表（LLM Wiki 試作）

**同定義**：token 優先＋概念頁＋字元回證（見試作報告 §1）  
**同背景**：LLM Wiki（raw→wiki 編譯）  
**狀況**不同 → 三表並列，不合併。

欄位：候選｜chars｜gold_note｜類型｜命題一句

---

## 表 A｜狀況＝架構定義

| 候選 | chars | gold_note | 類型 | 命題一句 |
|---|---:|---|---|---|
| LW-C01 | 499 | 重複讀檔＝重複付 token | Teaching | 遺忘是架構問題 |
| LW-C02 | 435 | 編譯一次 | Teaching | raw＝源碼；wiki＝編譯產物 |
| LW-C03 | 156 | 三資料夾 | Method | raw／wiki／instructions |
| LW-C04 | 228 | raw 唯讀 | Method | 永不改 raw |
| LW-C05 | 399 | 一概念一頁；index／hot | Method | wiki 頁結構＋雙特殊檔 |
| LW-C06 | 173 | 編譯設定 | Method | instructions 約束處理 |
| LW-C07 | 624 | PROCESSING 規則 | Method | 建頁／連結／矛盾／陳舊 |

---

## 表 B｜狀況＝攝入編譯

| 候選 | chars | gold_note | 類型 | 命題一句 |
|---|---:|---|---|---|
| LW-C08 | 727 | 30–50 concepts | Method | 攝入五步 |
| LW-C09 | 242 | 70–90% 節省宣稱 | Analysis | 8–15 頁乾淨層 |
| LW-C10 | 351 | MCP vault | Method | 安裝與連線 |
| LW-C11 | 561 | 初始化提示 | Method | 建庫＋CLAUDE.md 訪談 |
| LW-C12 | 328 | 批次攝入提示 | Method | 掃 raw 建 wiki |
| LW-C16 | 218 | 三輪研究 | Method | autoresearch |

---

## 表 C｜狀況＝查詢維運與成本

| 候選 | chars | gold_note | 類型 | 命題一句 |
|---|---:|---|---|---|
| LW-C13 | 263 | 只讀 wiki 省 token | Method | 深查詢禁用訓練充數 |
| LW-C14 | 231 | 日維運 | Method | 晨間三行簡報 |
| LW-C15 | 287 | 週健康分 | Method | 全庫稽核 |
| LW-C17 | 343 | 六指令 | Method | 日常指令表 |
| LW-C18 | 438 | 250K／50K／日詢量級 | Analysis | token 算術對照 |
| LW-C19 | 174 | 權限唯讀 | Method | 控制刪除權 |
