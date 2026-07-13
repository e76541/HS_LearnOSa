# 模塊篩選機制設計

日期：2026-07-14
狀態：設計草案；尚未實作、尚未升格為 canonical

## 目的

讓使用者能明確選擇來源中的部分內容不進指定下游，同時保留原文、模塊與邊的證據真值及可追查裁決。

本機制處理的是「使用者選擇如何消費內容」，不是重新判定內容是否為技能訊號。使用者不想要的內容不得因此改標為 `pure_fill`、`background` 或其他模塊層身份。

## 設計邊界

- 不修改凍結的 `ModuleCore`。
- 不回寫 `source.md`、`modules.md` 或 `edges.md`。
- 不新增模塊型別、邊型別或登記層狀態。
- 原文與模塊仍是證據；篩選裁決是獨立的消費控制。
- 本設計先經實際來源驗證，再決定是否升格 canonical，遵守 P6「證據先於規格」。

### 適用層級

- 本設計只處理已完成收錄、已有模塊的來源內部選擇。
- 使用者明示整篇來源不要，仍走既有來源級拒絕規則，不進正式 DOC。
- 模塊級選擇不移除來源資料夾，也不改變正式 `modules.md`、`edges.md`；它只限制指定下游能否消費該模塊。

## 三層機制

| 層級 | 發起者 | 性質 | 正式資料待遇 |
|---|---|---|---|
| 硬性排除 | 使用者 | 明確不要，必須留理由 | 證據保留；指定下游不得消費 |
| 軟性降權 | 系統 | 建議略過，等待使用者裁決 | 未確認前不構成正式排除 |
| 動態忽略 | 視圖或任務 | 當次不顯示、不計分 | 只改投影，不建立持久裁決 |

第一版只實作硬性排除；軟性降權與動態忽略保留為後續能力。

## 文檔路徑

### 設計與計畫

```text
docs/
├─ specs/
│  └─ 2026-07-14-module-selection-design.md
└─ plans/
   └─ 2026-07-14-module-selection-implementation.md  # 核准實作後才建立
```

新文檔不再使用已移除的 Superpowers 專屬目錄。

### 單一來源的裁決

```text
DOC/{Stocks|Archive|Review}/{document-slug}/
├─ README.md
├─ source.md
├─ modules.md
├─ edges.md
└─ selection.md
```

`selection.md` 與來源共置，並隨整個來源資料夾在 `Review`、`Stocks`、`Archive` 間移動。不得把同一來源的裁決集中到另一個全域目錄，避免來源移動後產生第二套索引。

### 未來規範與 Skill

實際來源驗證通過後，才考慮新增：

```text
Library/規範/15-內容篩選.md
.agents/skills/manage-content-selection/SKILL.md
```

若升格 canonical，須同步：

1. 在 `Library/CURRENT.md` 增加穩定 ID `content-selection`。
2. 在 `Library/規範/70-版本與裁決.md` 記錄版本與裁決。
3. 在根目錄 `AGENTS.md` 的工作對照表登記新 Skill。

## `selection.md` 定位

`selection.md` 是該來源篩選裁決的權威紀錄，不是證據真值，也不是 Dynamic View。第一版使用 Markdown，讓人工可直接覆核；欄位識別符使用英文，說明使用中文。

建議結構：

```markdown
# Content Selection

source_id: SRC-000
selection_version: 1
updated_at: 2026-07-14T00:00:00+08:00

## Active Decisions

| decision_id | target_type | target_ref | action | scope | reason_code | reason |
|---|---|---|---|---|---|---|

## Revoked Decisions

| decision_id | target_ref | previous_action | revoked_at | reason |
|---|---|---|---|---|
```

### 必要欄位

| 欄位 | 用途 |
|---|---|
| `decision_id` | 來源內穩定裁決編號，例如 `S001` |
| `target_type` | 第一版只允許 `module` |
| `target_ref` | `module_id` |
| `action` | `exclude`、`defer`；恢復以撤銷原裁決表達 |
| `scope` | 排除作用的單一下游；多個下游分列記錄 |
| `reason_code` | 可統計的固定理由碼 |
| `reason` | 人工可讀的具體理由，必填 |

第一版 `scope` 允許：

- `alignment`
- `views`
- `practice`
- `speaking`
- `all_downstream`

`views` 只表示 Dynamic View 的消費資格，不表示刪除正式圖。`all_downstream` 等於同時限制 `alignment`、`views`、`practice`、`speaking`；正式 `edges.md` 中的證據邊一律不刪除。

每筆裁決只允許一個 `scope`。同一模塊需要限制多個但非全部下游時，建立多筆裁決，避免在 Markdown 表格內引入未定義的集合序列化格式。

## 第一版操作

### 支援

1. 以完整模塊為單位選擇。
2. 建立 `exclude` 或 `defer` 裁決。
3. 撤銷既有裁決，移入 `Revoked Decisions`。
4. 在確認前顯示受影響的邊、對齊、練習與演講鏈。
5. 下游先讀 `selection.md`，再決定可消費模塊集合。

`exclude` 表示持續生效，直到人工撤銷；`defer` 表示暫不消費，但第一版同樣只靠人工撤銷恢復，不設定自動到期。

### 暫不支援

- 任意原文字元塗選。
- 直接排除單一邊。
- 系統自動建立正式排除。
- 跨來源共用的個人偏好設定。
- 因篩選裁決而重寫模塊或邊。

## 局部內容的處理

使用者只想排除模塊內一部分時，第一版不直接寫入裁決：

1. 若目標是已有 `char_span` 的 hook，後續可設計素材級排除。
2. 若目標切到核心命題，不執行篩選裁決，要求改選完整模塊。
3. 若確實需要重切命題簇，另走模塊化覆核流程；不由篩選機制修改既有模塊。

在支援字元區間前，不得以自由文字描述假裝已精確排除模塊內片段。

## 消費順序

```text
讀取 source／modules／edges 證據
→ 讀取 selection.md 持久裁決
→ 依當次視圖或任務加入動態忽略
→ 產生對齊、Dynamic View、練習或演講投影
```

硬性排除優先於動態視圖設定；被排除內容不得因視圖切換重新進入其受限 scope。

## 索引規則

- `DOC/INDEX.md` 維持一來源一列，不逐筆登記篩選裁決。
- 來源 `README.md` 可標示是否存在有效裁決，但不是裁決真值。
- 不建立全域 `SELECTION-INDEX.md`。
- 入口三問淘汰的來源仍依 canonical 規範不保存，不建立 `selection.md`。

## 驗證條件

升格 canonical 前，至少用實際來源驗證：

1. 模塊級排除不改變 `modules.md` 與 `edges.md`。
2. 相同裁決可穩定重放出相同可消費模塊集合。
3. 撤銷後可恢復原本下游資格。
4. 排除相依鏈中間節點時，系統會揭露斷鏈影響。
5. `pure_fill`、`background` 與使用者排除能被清楚區分。
6. 來源資料夾跨 bucket 移動後，裁決路徑仍有效。

## 待裁決事項

- `defer` 是否在後續版本增加期限與自動到期。
- 素材級排除是否以 hook ID 或 `char_span` 定位。
- 是否需要獨立事件格式支援大量裁決歷史。
