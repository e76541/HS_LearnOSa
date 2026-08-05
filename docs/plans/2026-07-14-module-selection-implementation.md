# Module Selection Implementation Plan

- 短代號：D42

日期：2026-07-14
狀態：草稿
裁決來源：無
實作參照：無
後繼：無

> 依工作清單逐項執行與驗證；核取方塊（`- [ ]`）用於追蹤完成狀態。
> 設計依據：`docs/specs/2026-07-14-module-selection-design.md`（草案，尚未 canonical）。

**Goal:** 在不改寫證據檔的前提下，為已收錄來源建立可稽核的模塊級消費裁決（`selection.md`）、可重放的可消費集合計算，以及至少一條下游（views）的讀取適配；用實際 DOC 來源驗證後，才裁決是否升格 canonical。

**Architecture:** `selection.md` 與來源共置，隨 bucket 移動。解析與裁決驗證落在 `tools/selection/`；下游先讀證據再讀有效裁決，產出投影用可消費集合。第一版只實作硬性 `exclude`／`defer` 與人工撤銷；軟性降權與動態忽略不進本計畫。

**Tech Stack:** Markdown 表格、Node.js（既有 `tools/viz` 解析慣例）、`node --test`、Git。

## Global Constraints

- 篩選設計尚未 canonical；本計畫產物不得被當成已啟用規範。
- 不修改 `source.md`、`modules.md`、`edges.md`，不改 ModuleCore，不新增模塊／邊型別。
- 不得因使用者排除而把模塊改標為 `pure_fill` 或 `background`。
- 不建立全域 `SELECTION-INDEX.md`；`DOC/INDEX.md` 不逐筆登記裁決。
- 每筆裁決只允許單一 `scope`；`target_type` 第一版只允許 `module`。
- `exclude` 與 `defer` 第一版皆靠人工撤銷恢復；不設自動到期。
- 入口三問淘汰的來源不建 `selection.md`。
- 升格 `Library/規範/15-內容篩選.md`、穩定 ID `content-selection`、Skill `manage-content-selection` 必須通過 **Gate B**，不得在實證前寫入。

## Gates

### Gate A：允許試點寫入（本計畫開始即視為通過前提）

- 設計草案已存在且邊界清楚。
- 實作可建立工具、fixture、單一試點來源的 `selection.md`。
- 仍禁止改寫證據檔與 canonical。

### Gate B：允許升格 canonical（須 AOI 另行裁決）

- Phase 0–3 全部核取通過。
- 設計「驗證條件」六項均有實跑證據。
- 至少一篇實際來源完成排除、撤銷、斷鏈揭露、跨 bucket 路徑穩定性。
- AOI 明確批准後，才可新增規範／CURRENT／Skill。

---

## File Map

| 路徑 | 責任 | 階段 |
|---|---|---|
| `docs/specs/2026-07-14-module-selection-design.md` | 設計真值（只讀；本計畫不改） | — |
| `tools/selection/schema.md` | 欄位、枚舉、不變量說明 | Phase 0 |
| `tools/selection/parse-selection.mjs` | 解析 Active／Revoked 表 | Phase 0 |
| `tools/selection/consumable.mjs` | 依 scope 計算可消費模塊集合與斷鏈影響 | Phase 0 |
| `tools/selection/validate-selection.mjs` | 裁決合法性（scope、理由、目標存在） | Phase 0 |
| `tools/selection/impact.mjs` | 確認前影響預覽（邊／下游提示） | Phase 1 |
| `tools/selection/test/*.test.mjs` | 單元與回歸 | Phase 0–3 |
| `tools/selection/test/fixtures/*` | 合法／非法／撤銷／斷鏈樣本 | Phase 0 |
| `DOC/Review/how-to-make-company-ai-native/selection.md` | 試點裁決（可與來源同移） | Phase 1 |
| `tools/viz/parse-doc-artifacts.mjs` | 可選讀取 `selection.md`，不強制缺檔失敗 | Phase 2 |
| `tools/viz/generate.mjs` / `render-inline-views.mjs` | views scope 過濾投影 | Phase 2 |
| `.agents/skills/render-knowledge-views/SKILL.md` | 註明先讀 selection 再投影 | Phase 2 |
| `.agents/handover/reference/filtering-and-module-size.md` | 標示試點狀態與工具路徑 | Phase 3 |
| `Library/規範/15-內容篩選.md` 等 | **僅 Gate B 後** | Phase 4 |

---

### Task 0: Phase 0 — schema、解析與可消費集合

**Files:**
- Create: `tools/selection/schema.md`
- Create: `tools/selection/parse-selection.mjs`
- Create: `tools/selection/validate-selection.mjs`
- Create: `tools/selection/consumable.mjs`
- Create: `tools/selection/test/fixtures/`
- Create: `tools/selection/test/*.test.mjs`

**Interfaces:**
- Consumes: 設計草案欄位契約；可選 `modules.md`／`edges.md` 僅作存在性與斷鏈檢查。
- Produces: `parseSelection`、`validateSelection`、`getConsumableModules(scope)`、`getBrokenEdges(scope)`。

- [ ] **Step 1: 固定 `selection.md` 契約於 schema.md**

寫明：

```text
必要 front matter 鍵：source_id, selection_version, updated_at
Active Decisions 欄：decision_id, target_type, target_ref, action, scope, reason_code, reason
Revoked Decisions 欄：decision_id, target_ref, previous_action, revoked_at, reason

枚舉：
  target_type: module
  action: exclude | defer
  scope: alignment | views | practice | speaking | all_downstream
  reason_code（第一版固定）：
    off_topic | redundant | too_narrow | too_broad |
    not_for_practice | not_for_speaking | deferred_review | other
```

不變量至少包含：

1. `decision_id` 來源內唯一（Active ∪ Revoked）。
2. Active 列 `reason` 非空。
3. 同一 `(target_ref, scope, action)` 不得有兩筆 Active。
4. `all_downstream` 展開為四個下游 scope 的聯集限制。
5. 缺檔 = 無有效裁決（全部模塊可消費），不是錯誤。

- [ ] **Step 2: 建立 fixture**

至少四組：

| fixture | 用途 |
|---|---|
| `valid-exclude-views.md` | 單模塊 `exclude` + `views` |
| `valid-multi-scope.md` | 同模塊兩筆不同 scope |
| `valid-revoked.md` | 撤銷後恢復資格 |
| `invalid-*.md` | 缺 reason、非法 scope、重複 Active、`target_type≠module` |

- [ ] **Step 3: 實作解析與驗證**

- 表格解析容忍 Markdown 對齊空白；識別符嚴格英文枚舉。
- `validateSelection({ selection, moduleIds })`：未知 `target_ref` 必須失敗。
- 不讀、不寫證據檔內容。

- [ ] **Step 4: 實作可消費集合與斷鏈**

```js
// 契約示意（實作可調整函式名，不可改語義）
getConsumableModules({ modules, selection, scope })
// → { allowed: ModuleId[], excluded: ModuleId[], deferred: ModuleId[] }

getBrokenEdges({ edges, excludedOrDeferredIds })
// → 端點任一不在可消費集合的邊清單（只揭露，不刪 edges.md）
```

規則：

- `exclude`／`defer` 對指定 scope 同等阻擋消費。
- `all_downstream` 對四個具體 scope 皆阻擋。
- 背景／`pure_fill` 仍依既有層規則處理；與 selection 分開回報。

- [ ] **Step 5: 跑測試**

```bash
node --test tools/selection/test/*.test.mjs
```

Expected: 全部通過；非法 fixture 全部被拒絕。

---

### Task 1: Phase 1 — 試點來源與影響預覽

**試點來源：** `DOC/Review/how-to-make-company-ai-native/`
（9 模塊、已有 edges／views；含 `pure_fill` 區間，便於區分使用者排除）

**Files:**
- Create: `tools/selection/impact.mjs`
- Create: `DOC/Review/how-to-make-company-ai-native/selection.md`
- Modify（可選一行提示）: `DOC/Review/how-to-make-company-ai-native/README.md` — 僅標示「存在 selection.md」，不複製裁決表

**Interfaces:**
- Consumes: Phase 0 API + 試點 `modules.md`／`edges.md`。
- Produces: 確認前影響報告；試點 Active 裁決。

- [ ] **Step 1: 實作影響預覽 CLI／函式**

輸入：`docDir`、`target_ref`、`action`、`scope`。
輸出至少：

1. 將被阻擋的模塊。
2. 受影響邊（斷鏈清單）。
3. 提示：alignment／practice／speaking／views 何者受 `scope` 影響。
4. 明確區分：該模塊是否本已為 background；pure_fill 區間是否本來就不在模塊集合。

- [ ] **Step 2: 選定試點裁決（建議組合）**

在寫入前先跑影響預覽，再寫入 `selection.md`：

| decision_id | target_ref | action | scope | reason_code | 意圖 |
|---|---|---|---|---|---|
| S001 | M05 | exclude | practice | not_for_practice | 個案收據不當考點 |
| S002 | M05 | exclude | speaking | not_for_speaking | 同模塊非演講主鏈 |
| S003 | M08 | defer | views | deferred_review | 暫不投影總規則，驗證 defer |

禁止用單一列塞多個 scope；禁止改 `modules.md` 的 `is_skill_signal`。

- [ ] **Step 3: 寫入 selection.md**

結構必須符合設計草案與 Phase 0 schema；`source_id` 與 modules 的 Source record 一致（`PENDING-how-to-make-company-ai-native`）。

- [ ] **Step 4: 重放穩定性檢查**

```bash
node -e "/* 兩次呼叫 getConsumableModules(views) 結果 JSON.stringify 相等 */"
```

Expected: 相同輸入 → 相同 `allowed`／`excluded`／`deferred`。

- [ ] **Step 5: 證據未變檢查**

```bash
git diff -- DOC/Review/how-to-make-company-ai-native/modules.md DOC/Review/how-to-make-company-ai-native/edges.md DOC/Review/how-to-make-company-ai-native/source.md
```

Expected: 無 diff。

---

### Task 2: Phase 2 — views 下游適配

**Files:**
- Modify: `tools/viz/parse-doc-artifacts.mjs`
- Modify: `tools/viz/generate.mjs` 與／或 `tools/viz/render-inline-views.mjs`
- Modify: `.agents/skills/render-knowledge-views/SKILL.md`
- Create: `tools/selection/test/viz-integration.test.mjs`（或等效）

**Interfaces:**
- Consumes: 可選 `selection.md`；scope 固定為 `views`（含 `all_downstream` 展開）。
- Produces: 投影節點／邊集合 ⊆ 可消費集合；斷鏈寫入 `_warnings.md` 或同等警示。

- [ ] **Step 1: parseDocArtifacts 可選載入 selection**

- 有檔則解析並 `validateSelection`；失敗則 fail-closed（中止 generate，不靜默忽略非法裁決）。
- 無檔則 `selection: null`，行為與現況完全一致。

- [ ] **Step 2: 渲染前過濾**

- 節點：去掉 `views` scope 下 excluded／deferred 模塊。
- 邊：任一端被擋則不進投影，並記錄斷鏈警告。
- **不得**刪除或改寫 `edges.md`。

- [ ] **Step 3: 更新 Skill 消費順序**

在 `render-knowledge-views` 寫明：

```text
讀取 modules／edges
→ 讀取 selection.md（若存在）
→ 依 views scope 過濾
→ 產生 Dynamic View
```

- [ ] **Step 4: 回歸**

```bash
node tools/viz/generate.mjs DOC/Review/how-to-make-company-ai-native
node --test tools/selection/test/*.test.mjs
node --test tools/registry/test/*.test.mjs
```

Expected:

- 試點來源投影不含 S003 所 defer 的 M08（views）。
- `modules.md`／`edges.md` 仍含 M08 與相關邊。
- registry 既有測試不退步。

- [ ] **Step 5: 撤銷回合**

1. 將 S003 移入 Revoked Decisions，填 `revoked_at` 與理由。
2. 重跑 generate。
3. Expected: M08 重新出現在 views 投影；Active 表不再含 S003。

---

### Task 3: Phase 3 — 設計驗證條件與路徑穩定性

對照設計「驗證條件」逐項留證（命令輸出或測試名寫入本節核取旁註）：

- [ ] **V1** 模塊級排除不改變 `modules.md` 與 `edges.md`（`git diff` 空）。
- [ ] **V2** 相同裁決重放 → 相同可消費集合（測試鎖定）。
- [ ] **V3** 撤銷後恢復下游資格（Phase 2 Step 5）。
- [ ] **V4** 排除相依鏈中間節點時揭露斷鏈（對 M03 或 M04 做臨時 exclude 預覽，確認後可撤銷不提交，或用 fixture）。
- [ ] **V5** `pure_fill`／`background`／使用者 exclude 在影響報告中分欄或分碼顯示。
- [ ] **V6** 跨 bucket 路徑：將試點資料夾**複製或 git mv 演練**至暫時路徑（或演練 Stocks 再移回），確認只靠相對共置的 `selection.md`，無需改全域索引。

另外：

- [ ] 更新 `.agents/handover/reference/filtering-and-module-size.md`：標示「試點工具已存在／尚未 canonical」，並連結本計畫與 `tools/selection/`。
- [ ] 不新增 `Library/規範/15-*`、不改 `CURRENT.md`。

**完成條件：** V1–V6 皆有可重跑證據；參考檔已更新試點狀態。

---

### Task 4: Phase 4 — Gate B 候選（預設不做）

> 僅在 AOI 明確批准 Gate B 後執行。未批准則保持核取方塊全空，並停止。

- [ ] 起草 `Library/規範/15-內容篩選.md`（內容對齊已驗證行為，不發明新 scope）。
- [ ] `Library/CURRENT.md` 增加穩定 ID `content-selection`。
- [ ] `Library/規範/70-版本與裁決.md` 記錄非破壞性修訂。
- [ ] 新增 `.agents/skills/manage-content-selection/SKILL.md`。
- [ ] 更新根目錄 `AGENTS.md`／`CLAUDE.md` 工作對照表。
- [ ] 對齊 `alignment`／`practice`／`speaking` 的 Skill 消費順序說明（可先文件、後工具）。

**仍留待後續版本（本 Phase 也不實作）：**

- `defer` 自動期限
- 素材級排除（hook ID 或 `char_span`）
- 大量裁決事件格式
- 軟性降權、跨來源偏好

---

## 建議執行順序

```text
Phase 0（工具＋測試）
  → Phase 1（試點 selection.md＋影響預覽）
  → Phase 2（views 適配＋撤銷）
  → Phase 3（V1–V6 實證＋參考檔）
  → 停：請 AOI 裁決 Gate B
  →（可選）Phase 4
```

## 可重跑命令（全階段結束時）

```bash
node --test tools/selection/test/*.test.mjs
node --test tools/registry/test/*.test.mjs
node --check tools/selection/parse-selection.mjs
node --check tools/selection/consumable.mjs
node --check tools/viz/generate.mjs
node tools/viz/generate.mjs DOC/Review/how-to-make-company-ai-native
git diff --check
git diff -- DOC/Review/how-to-make-company-ai-native/modules.md \
  DOC/Review/how-to-make-company-ai-native/edges.md \
  DOC/Review/how-to-make-company-ai-native/source.md
```

Expected: 測試全過；三個證據檔無 diff；views 產出反映 Active 裁決。
