# Skill registry store

六個 JSONL 檔為技能登記工作流資料。欄位與真值邊界見 `tools/registry/DATA_DICTIONARY.md`；schema 位於 `tools/registry/schema/`。

`embeddings/` 是可重建快取，不是真值。正式資料修改必須經 `tools/registry/core/store.mjs` 的交易與 invariant 驗證，不直接手改 JSONL。
