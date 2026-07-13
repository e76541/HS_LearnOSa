# 管線適配器

- `batch-align.mjs`：正常模塊化完成後，以 ModuleCore 批次呼叫公開 `align`；背景與純填充只回原因碼。
- `attach-only.mjs`：零散來源只讀已人工核准的 `same` alignment；登記節點少於前五候選窗口時休眠。
- `approved-state.mjs`：練習與演講只由已核准 `same` alignment 經公開 `proficiency` 讀狀態，不讀 shadow suggestion、pending、review 或 event。

這些檔案是四操作的消費端適配器，不是新增公開操作。模塊圖與 `tools/viz` 不依賴本目錄，也不載入 `registry/edges.jsonl`。
