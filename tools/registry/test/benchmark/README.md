# 三十篇技能對齊基準

每篇建立一個 `*.benchmark.json`，人工先填 `expected`，再由 shadow 實跑填 `observed` 與 `review`。不得從模型結果反推 `expected`。

目前只有 `current-one-article.benchmark.json`，代表倉庫現有一篇可用模塊產物；它不是三十篇基準，也沒有觀測值。評估器會明確回 `gate_b_ready: false`。

每個 module case：

- `expected.decision`: `same | related | reject`
- `expected.node_id`: same／related 的人工基準節點
- `expected.relation_direction`: related 的人工方向
- `observed.candidate_node_ids`: shadow 前五排序
- `observed.decision`、`candidate_node_id`、`relation_direction`: 細判輸出
- `observed.created_new_skill`: 是否誤建同義技能
- `observed.auto_accepted`: Gate B 前必須為 `false` 或省略
- `review.correction_type`、`seconds`: 人工修正類型與耗時

執行：

```bash
node tools/registry/internal/evaluate-alignments.mjs tools/registry/test/benchmark
```
