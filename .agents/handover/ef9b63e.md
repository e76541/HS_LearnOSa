# 交接：文檔中心收錄管線提案

- 內容 commit：`ef9b63e`
- 分支：`codex/post-intake-disposition-trial`
- 日期：2026-07-14

## 完成內容

- 將最新管線方向保存為非 canonical 設計提案：`批次收錄 → 文檔 YAML → 文檔保存／封存 → 模板化 → 正規化／模塊化 → 抽邊 → 下游學習產物`。
- 將所需真值明確縮為模板化前的「文檔登記與保存層」，而非全域的收錄後處置狀態機。
- 分開 `BatchReceipt`、`DocumentManifest`、`PreservationEvent`、`TemplateInstance` 與模塊／邊的責任，避免保存位置、模板排程與語意處理互相覆寫。
- 明定保存／封存不等於模板資格；下游以 `document_id` 與內容修訂／指紋參照，不以資料夾路徑作身份。
- 明定現行 `DOC/Stocks`、`DOC/Archive`、`DOC/Review` 仍是處理完成後的出口；模板化前的新保存層不可借用 `DOC/Archive` 的既有語意。

## 關鍵檔案

- 設計提案：[docs/specs/2026-07-14-document-centered-intake-pipeline-proposal.md](../../docs/specs/2026-07-14-document-centered-intake-pipeline-proposal.md)
- 現行 DOC 儲存設計（尚未修改）：[docs/specs/2026-07-13-doc-storage-design.md](../../docs/specs/2026-07-13-doc-storage-design.md)
- 既有 Review 側 shadow：[handover/30c5f58.md](30c5f58.md)

## 驗證

- `git diff --cached --check`（內容 commit 前）：通過。
- `git show --check ef9b63e`：通過。
- 內容 commit 僅新增上述設計提案；未改 canonical、Skill、DOC 索引或任何文檔資產。

## 未完成與邊界

- 此提案尚未變更 `Library/規範/`、`.agents/skills/ingest-text/`、既有 DOC 路徑或真值檔案。
- `post-intake-disposition-trial` 仍是模板後／Review 的 non-canonical 註記試行，不可拿來作新文檔身份與保存層。
- 尚未固定保存或模板的 enum、狀態轉移、實體儲存根與遷移策略；須先有實際批次資料。

## 後續

1. 先裁決「封存」是冷保存還是預設暫停模板排程；建議把兩者分開記錄。
2. 以一個實際批次建立 `BatchReceipt` 與 `DocumentManifest` shadow，驗證重複收錄、內容指紋、修訂與保存參照。
3. 為模板化建立只讀輸入契約，記錄模板 ID／版本與文檔修訂；試行期間不寫入模塊、邊、技能或 `DOC/INDEX.md`。
4. 有基準資料與人工裁決後，才規劃 canonical、`ingest-text` Skill 和現行 DOC 儲存設計的同步修訂。