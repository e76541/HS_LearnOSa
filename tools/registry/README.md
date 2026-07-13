# 技能登記工作流

## 公開操作

`index.mjs` 只匯出凍結的四操作：`align`、`pending`、`node_id`、`proficiency`。

- `node_id`：具名人工建立／改名，或解析穩定 ID；改名不換 ID。
- `proficiency`：公開路徑只讀；人工更新使用 `core/proficiency.mjs` 的管理函式。
- `align`：只產生 shadow 建議與 pending review；需傳入 `judge`。
- `pending`：只查找已經人工拒絕後建立的待建槽，不會自動升格。

模型呼叫端可用 `align/model-judge.mjs` 的 `createModelJudge(invoke)` 建立結構化 judge；`invoke` 由部署環境提供。格式錯誤、候選越界、背景或非技能訊號都 fail closed。

## 人工覆核

```bash
node tools/registry/internal/review-queue.mjs registry
node tools/registry/internal/decide-review.mjs registry decision.json
```

`decision.json` 必須包含具名 `actor`、`reason`、`review_id` 與以下其一：

- `action: accept_same` + `candidate_node_id`
- `action: reject`
- `action: accept_relation` + `candidate_node_id` + `module_node_id` + 已確定的 `direction`
- `action: reject_relation`

## 驗證

```bash
node --test tools/registry/test/*.test.mjs
node tools/registry/internal/validate-store.mjs registry
node tools/registry/internal/evaluate-alignments.mjs tools/registry/test/benchmark
git diff --check
```

評估器回 `gate_b_ready: false` 是目前預期狀態；三十篇人工基準與觀測完成前不得設定自動接受閾值或裁決 R10。
