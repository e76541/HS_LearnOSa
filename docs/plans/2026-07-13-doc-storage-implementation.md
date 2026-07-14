# DOC Storage and Index Implementation Plan

日期：2026-07-13
狀態：已實作
裁決來源：AOI 2026-07-13 v0.3 r2
實作參照：`DOC/`
後繼：無

> 依工作清單逐項執行與驗證；核取方塊（`- [ ]`）用於追蹤完成狀態。

**Goal:** 建立 `DOC/Stocks`、`DOC/Archive`、`DOC/Review` 與 `DOC/INDEX.md`，同步更新 canonical 規範和收錄 Skill，並將已處理但待裁決的 AI-native 文章轉入 Review。

**Architecture:** `Inbox` 只承載未完成工作；`DOC` 只承載已完成處理的文檔，依主要收錄、非主要收錄、待人工覆核分桶。`DOC/INDEX.md` 是人工查找入口，不承載證據真值或流程狀態；移動文檔與更新索引必須同次完成。

**Tech Stack:** Markdown、PowerShell 7、Git、現有 HS_LearnEdge canonical 規範與 Skills。

## Global Constraints

- 全程使用中文；儲存鍵值與 canonical 識別符維持英文。
- 以 `Library/CURRENT.md` 指向的 canonical 規範為準；不讀、不改 `Library/archive/`。
- 入口淘汰文檔不保存；一次性素材回填成邊後棄置原文。
- `Inbox/` 保存未完成文檔；`DOC/Stocks/`、`DOC/Archive/`、`DOC/Review/` 只保存已完成處理的文檔。
- `DOC/Review/` 項目必須有 `review_reason`；裁決後移至 Stocks 或 Archive。
- 每個 DOC 文檔資料夾在 `DOC/INDEX.md` 恰有一筆索引，且不得跨 bucket 重複。
- 本次 canonical 版本為非破壞性 `v0.3 r2`；不開 `v0.4`，不改 ModuleCore。
- 不建立正式文本 ID 序號簿、不裁決本文主要類型、不建立 rejection ledger。

---

## File Map

| 路徑 | 責任 |
|---|---|
| `Library/CURRENT.md` | 將目前 canonical 版本標示為 `v0.3 r2`。 |
| `Library/規範/10-模塊層.md` | 從入口與零散來源條款銜接正式儲存流向。 |
| `Library/規範/60-文本身份與術語.md` | 定義 Inbox、三個 DOC bucket 與索引語義。 |
| `Library/規範/70-版本與裁決.md` | 記錄 v0.3 r2 非破壞性修訂。 |
| `.agents/skills/ingest-text/SKILL.md` | 落實轉出、Review 分流、索引同步與棄置規則。 |
| `DOC/INDEX.md` | DOC 全域人工查找入口。 |
| `DOC/Stocks/README.md` | 說明主要收錄桶。 |
| `DOC/Archive/README.md` | 說明非主要收錄桶。 |
| `DOC/Review/README.md` | 說明待人工覆核桶。 |
| `DOC/Review/how-to-make-company-ai-native/*` | 從 Inbox 整體移入的現有來源、模塊、邊與說明。 |

---

### Task 1: Canonical 儲存規則與版本修訂

**Files:**
- Modify: `Library/CURRENT.md:3`
- Modify: `Library/規範/10-模塊層.md:66-76`
- Modify: `Library/規範/60-文本身份與術語.md:5-16`
- Modify: `Library/規範/70-版本與裁決.md:32-39`

**Interfaces:**
- Consumes: `identity-terminology` 穩定 ID、既有入口三問與 v0.4 凍結條款。
- Produces: `v0.3 r2` 的 canonical 儲存流向，供 `ingest-text` Skill 使用。

- [ ] **Step 1: 執行前置失敗檢查**

```powershell
$targets = @(
  'Library/CURRENT.md',
  'Library/規範/10-模塊層.md',
  'Library/規範/60-文本身份與術語.md',
  'Library/規範/70-版本與裁決.md'
)
$matches = Select-String -LiteralPath $targets -Pattern 'v0\.3 r2|DOC/Stocks|DOC/Review'
if ($matches) { throw 'Precondition failed: storage revision already exists' }
throw 'EXPECTED FAIL: v0.3 r2 storage rules are absent'
```

Expected: FAIL，訊息為 `EXPECTED FAIL: v0.3 r2 storage rules are absent`。

- [ ] **Step 2: 更新 CURRENT 版本**

將 `Library/CURRENT.md` 的目前版本改為：

```markdown
- 目前版本：v0.3 r2
```

保留來源快照 `Library/archive/模塊層結構層練習層規範_v0_3_r1.md` 不變。

- [ ] **Step 3: 在模塊層銜接儲存規則**

在 `Library/規範/10-模塊層.md` §2.5 的入口三問後加入：

```markdown
**收錄位置**:未完成處理之來源留在 `Inbox/`;完成處理後依第七章儲存流向轉入 `DOC/Stocks/`、`DOC/Archive/` 或 `DOC/Review/`,並同步更新 `DOC/INDEX.md`。入口淘汰與已完成回填的一次性素材仍依本節直接棄置,不得因設有 Archive 而保存。
```

- [ ] **Step 4: 在文本身份規範加入儲存流向與索引**

在 `Library/規範/60-文本身份與術語.md` 的文本身份總表後、附錄 C 前加入：

```markdown
### 7.1 文檔儲存流向(v0.3 r2 新增)

| 處理結果 | 儲存位置 | 索引待遇 |
|---|---|---|
| 尚未完成必要處理 | `Inbox/` | 不進 `DOC/INDEX.md` |
| 已完成且屬主要收錄類型 | `DOC/Stocks/` | 必須登記 |
| 已完成且屬非主要收錄類型 | `DOC/Archive/` | 必須登記 |
| 已完成處理,但類型或品質待人工覆核 | `DOC/Review/` | 必須登記並填 `review_reason` |
| 入口三問淘汰 | 不保存 | 不登記 |
| 一次性素材已回填為邊 | 原文棄置 | 不登記原文 |

`DOC/INDEX.md` 為人工可讀的查找入口,不是證據層、登記層或流轉狀態的真值來源。索引至少記錄 `text_id`、`title`、`bucket`、`status`、`path`、`review_reason`;未裁決 ID 可用 `PENDING-*` 暫時鍵。每個文檔以資料夾為移動單位,索引路徑指向其 `README.md`;移動與索引更新須同次完成,不得跨 bucket 重複。

`DOC/Archive/` 保存已完成但非主要收錄類型的文檔,與 `Library/archive/` 的唯讀規範快照語義不同,不可混用。待覆核項完成裁決後移至 `DOC/Stocks/` 或 `DOC/Archive/`;未完成項仍留 `Inbox/`。
```

- [ ] **Step 5: 記錄 v0.3 r2 修訂**

在 `Library/規範/70-版本與裁決.md` 修訂記錄末端加入：

```markdown
- 2026-07-13 **v0.3 r2**:新增文檔儲存流向:未完成來源留 `Inbox/`,完成來源分流至 `DOC/Stocks/`、`DOC/Archive/`、`DOC/Review/`,並以 `DOC/INDEX.md` 作人工查找入口;入口淘汰與已回填的一次性素材仍不保存。此為非破壞性操作規則修訂,不改 ModuleCore,不開 v0.4。來源:AOI 目錄與索引裁決。
```

- [ ] **Step 6: 驗證 canonical 修改**

```powershell
$current = Get-Content -Raw 'Library/CURRENT.md'
$module = Get-Content -Raw 'Library/規範/10-模塊層.md'
$identity = Get-Content -Raw 'Library/規範/60-文本身份與術語.md'
$versions = Get-Content -Raw 'Library/規範/70-版本與裁決.md'
if ($current -notmatch '目前版本：v0\.3 r2') { throw 'CURRENT version missing' }
if ($module -notmatch 'DOC/Stocks/' -or $module -notmatch '入口淘汰') { throw 'module storage bridge missing' }
foreach ($value in @('DOC/Stocks/','DOC/Archive/','DOC/Review/','DOC/INDEX.md','review_reason')) {
  if ($identity -notmatch [regex]::Escape($value)) { throw "identity rule missing $value" }
}
if ($versions -notmatch '2026-07-13 \*\*v0\.3 r2\*\*') { throw 'revision record missing' }
'PASS canonical storage revision'
```

Expected: `PASS canonical storage revision`。

- [ ] **Step 7: 檢查格式並提交**

```powershell
git diff --check
git add -- 'Library/CURRENT.md' 'Library/規範/10-模塊層.md' 'Library/規範/60-文本身份與術語.md' 'Library/規範/70-版本與裁決.md'
git commit -m "docs: define DOC storage lifecycle"
```

Expected: `git diff --check` 無輸出；commit 僅含四個 canonical 檔案。

---

### Task 2: 更新收錄 Skill 的可執行流程

**Files:**
- Modify: `.agents/skills/ingest-text/SKILL.md:13-27`
- Inspect only: `Library/Agent技能化運作流程.md:54-67`（現有穩定 ID 引用已足夠，不需修改）

**Interfaces:**
- Consumes: Task 1 的 §7.1 儲存流向與索引欄位。
- Produces: Agent 可執行的 Inbox → DOC 分流與索引同步步驟。

- [ ] **Step 1: 確認舊名稱仍會使測試失敗**

```powershell
$active = @('.agents/skills/ingest-text/SKILL.md')
$matches = Select-String -LiteralPath $active -Pattern 'DocStocks|DocToSave'
if (-not $matches) { throw 'EXPECTED FAIL did not occur: old names already absent' }
$matches | ForEach-Object { "$($_.Path):$($_.LineNumber):$($_.Line.Trim())" }
throw 'EXPECTED FAIL: active Skill still uses old storage names'
```

Expected: FAIL，且列出目前第 25 行的 `DocStocks`／`DocToSave`。

- [ ] **Step 2: 以新分流規則取代舊步驟 4–5**

將 `.agents/skills/ingest-text/SKILL.md`「入口與管線」第 4、5 點改為以下第 4–7 點：

```markdown
4. 未完成必要處理的來源留在 `Inbox/`;入口淘汰與已回填成邊的一次性素材直接棄置,不建立淘汰資料夾。
5. 完成處理後依主要類型分流:主要收錄類型轉 `DOC/Stocks/`;非主要收錄類型轉 `DOC/Archive/`;類型、品質或裁決不確定時轉 `DOC/Review/`,標 `needs_review` 並記錄 `review_reason`,不可自行猜測。
6. 文檔以完整資料夾為移動單位;轉入 DOC 時同步更新 `DOC/INDEX.md`,至少記錄 `text_id`、`title`、`bucket`、`status`、`path`、`review_reason`。移動或索引任一失敗,均不得宣稱轉出完成。
7. 依類型記錄 text ID;複合類型取元素較多者,相等時取標題。正式 ID 未裁決的 Review 文檔使用 `PENDING-*` 暫時鍵。
```

- [ ] **Step 3: 驗證 Skill 與 canonical 對齊**

```powershell
$skill = Get-Content -Raw '.agents/skills/ingest-text/SKILL.md'
if ($skill -match 'DocStocks|DocToSave') { throw 'old storage names remain' }
foreach ($value in @('Inbox/','DOC/Stocks/','DOC/Archive/','DOC/Review/','DOC/INDEX.md','review_reason','PENDING-*')) {
  if (-not $skill.Contains($value)) { throw "Skill missing $value" }
}
'PASS ingest Skill storage flow'
```

Expected: `PASS ingest Skill storage flow`。

- [ ] **Step 4: 檢查格式並提交**

```powershell
git diff --check
git add -- '.agents/skills/ingest-text/SKILL.md'
git commit -m "docs: align ingest skill with DOC buckets"
```

Expected: commit 僅含 `ingest-text/SKILL.md`。

---

### Task 3: 建立 DOC、索引並遷移首篇 Review 文檔

**Files:**
- Create: `DOC/INDEX.md`
- Create: `DOC/Stocks/README.md`
- Create: `DOC/Archive/README.md`
- Create: `DOC/Review/README.md`
- Move: `Inbox/how-to-make-company-ai-native/` → `DOC/Review/how-to-make-company-ai-native/`
- Modify after move: `DOC/Review/how-to-make-company-ai-native/README.md`
- Modify after move: `DOC/Review/how-to-make-company-ai-native/PROCESS-FINDINGS.md`

**Interfaces:**
- Consumes: Task 1 的 bucket 與索引 schema、Task 2 的移動作業規則。
- Produces: 可查找的 DOC 目錄和第一筆 `needs_review` 文檔。

- [ ] **Step 1: 執行目錄與索引的前置失敗檢查**

```powershell
$required = @('DOC/Stocks','DOC/Archive','DOC/Review','DOC/INDEX.md')
$existing = $required | Where-Object { Test-Path -LiteralPath $_ }
if ($existing) { throw "Precondition failed; paths already exist: $($existing -join ', ')" }
throw 'EXPECTED FAIL: DOC structure is absent'
```

Expected: FAIL，訊息為 `EXPECTED FAIL: DOC structure is absent`。

- [ ] **Step 2: 建立三個 bucket 說明檔**

建立 `DOC/Stocks/README.md`：

```markdown
# Stocks

保存已完成處理且屬主要收錄類型的文檔。每個文檔以獨立資料夾保存，並在 `../INDEX.md` 登記。
```

建立 `DOC/Archive/README.md`：

```markdown
# Archive

保存已完成處理但不屬主要收錄類型的文檔。此處是文檔資產，不等同 `Library/archive/` 的唯讀規範快照。
```

建立 `DOC/Review/README.md`：

```markdown
# Review

保存已完成必要處理、但類型、品質或其他裁決待人工覆核的文檔。每筆索引必須標記 `needs_review` 並填寫 `review_reason`；裁決後移至 Stocks 或 Archive。
```

- [ ] **Step 3: 建立 DOC 索引**

建立 `DOC/INDEX.md`：

```markdown
# DOC Index

本檔是 DOC 文檔的人工查找入口，不是證據層、技能登記簿或流轉狀態真值來源。

| text_id | title | bucket | status | path | review_reason |
|---|---|---|---|---|---|
| `PENDING-how-to-make-company-ai-native` | How to Make a Company AI-Native | `Review` | `needs_review` | [README](Review/how-to-make-company-ai-native/README.md) | 主要文章類型與正式文本 ID 待人工覆核 |
```

- [ ] **Step 4: 驗證路徑後整體移動文檔資料夾**

```powershell
$root = (Resolve-Path '.').Path
$source = (Resolve-Path 'Inbox/how-to-make-company-ai-native').Path
$reviewRoot = Join-Path $root 'DOC/Review'
$target = Join-Path $reviewRoot 'how-to-make-company-ai-native'
if (-not $source.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'Source escaped workspace' }
if (-not $reviewRoot.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'Target escaped workspace' }
if (Test-Path -LiteralPath $target) { throw 'Target already exists' }
Move-Item -LiteralPath $source -Destination $target
```

Expected: `Inbox/how-to-make-company-ai-native` 不存在；`DOC/Review/how-to-make-company-ai-native` 包含 `README.md`、`source.md`、`modules.md`、`edges.md`、`PROCESS-FINDINGS.md`。

- [ ] **Step 5: 更新遷移文檔的狀態說明**

在移動後的 `README.md` 將狀態與執行結果改為：

```markdown
狀態：`DOC/Review` · 已完成入口判定、模塊化與抽邊 · `needs_review`
```

並將原「轉 DocStocks 不可跑」條目改為：

```markdown
- DOC 轉出：**已完成**；因主要文章類型與正式文本 ID 未裁決，轉入 `DOC/Review/` 並登記於 `DOC/INDEX.md`。
```

在 `PROCESS-FINDINGS.md` 頂端加入：

```markdown
> 2026-07-13 更新：DOC 轉出目錄與索引已建立；本篇已移入 `DOC/Review/`。下列目錄缺口為本次冒煙時的歷史發現，現已解決。
```

將其中所有生效敘述的 `DocStocks`／`DocToSave` 改為 `DOC/Stocks`／`DOC/Archive`，並把「建立 DocStocks 並轉出」改為「裁決主要文章類型與正式文本 ID 後移至 Stocks 或 Archive」。

- [ ] **Step 6: 驗證 DOC 結構、索引與唯一位置**

```powershell
$required = @(
  'DOC/Stocks/README.md',
  'DOC/Archive/README.md',
  'DOC/Review/README.md',
  'DOC/INDEX.md',
  'DOC/Review/how-to-make-company-ai-native/README.md',
  'DOC/Review/how-to-make-company-ai-native/source.md',
  'DOC/Review/how-to-make-company-ai-native/modules.md',
  'DOC/Review/how-to-make-company-ai-native/edges.md'
)
$missing = $required | Where-Object { -not (Test-Path -LiteralPath $_) }
if ($missing) { throw "Missing: $($missing -join ', ')" }
if (Test-Path -LiteralPath 'Inbox/how-to-make-company-ai-native') { throw 'Source remains in Inbox' }
$index = Get-Content -Raw 'DOC/INDEX.md'
if ($index -notmatch 'PENDING-how-to-make-company-ai-native') { throw 'Index ID missing' }
if ($index -notmatch 'Review/how-to-make-company-ai-native/README\.md') { throw 'Index path missing' }
if ($index -notmatch 'needs_review' -or $index -notmatch '主要文章類型與正式文本 ID 待人工覆核') { throw 'Review metadata missing' }
'PASS DOC structure and migration'
```

Expected: `PASS DOC structure and migration`。

- [ ] **Step 7: 檢查格式並提交**

```powershell
git diff --check
git add -- 'DOC'
git commit -m "feat: add DOC buckets and review index"
```

Expected: Git 將原 Inbox 文檔辨識為移動或刪除／新增；commit 包含 DOC 結構、索引、首篇 Review 文檔及其狀態更新。

---

### Task 4: 全域一致性驗證

**Files:**
- Verify only: `Library/CURRENT.md`
- Verify only: `Library/規範/*.md`
- Verify only: `.agents/skills/ingest-text/SKILL.md`
- Verify only: `DOC/**`
- Verify only: `Inbox/**`

**Interfaces:**
- Consumes: Tasks 1–3 的全部產物。
- Produces: 可交付的驗證證據；不新增規格或資料格式。

- [ ] **Step 1: 確認生效文件沒有舊路徑名稱**

```powershell
$matches = rg -n 'DocStocks|DocToSave' 'Library/規範' '.agents/skills' 'Library/Agent技能化運作流程.md'
if ($LASTEXITCODE -eq 0) { $matches; throw 'Old active storage names remain' }
if ($LASTEXITCODE -ne 1) { throw "rg failed with $LASTEXITCODE" }
'PASS no old active storage names'
```

Expected: `PASS no old active storage names`。`.agents/handover/` 與設計／計畫文件中的歷史名稱不在此檢查範圍。

- [ ] **Step 2: 驗證索引連結、bucket 與唯一性**

```powershell
$docRoot = (Resolve-Path 'DOC').Path
$indexPath = Join-Path $docRoot 'INDEX.md'
$index = Get-Content -Raw $indexPath
$rows = [regex]::Matches($index, '(?m)^\| `(?<id>[^`]+)` \| (?<title>[^|]+) \| `(?<bucket>Stocks|Archive|Review)` \| `(?<status>complete|needs_review)` \| \[README\]\((?<path>[^)]+)\) \| (?<reason>[^|]+) \|$')
if ($rows.Count -ne 1) { throw "Expected 1 document row, got $($rows.Count)" }
$seen = @{}
foreach ($row in $rows) {
  $id = $row.Groups['id'].Value
  if ($seen.ContainsKey($id)) { throw "Duplicate text_id: $id" }
  $seen[$id] = $true
  $relative = $row.Groups['path'].Value
  $resolved = [IO.Path]::GetFullPath((Join-Path $docRoot $relative))
  if (-not $resolved.StartsWith($docRoot, [System.StringComparison]::OrdinalIgnoreCase)) { throw "Index path escaped DOC: $relative" }
  if (-not (Test-Path -LiteralPath $resolved)) { throw "Broken index link: $relative" }
  $bucket = $row.Groups['bucket'].Value
  if (-not $relative.StartsWith("$bucket/", [System.StringComparison]::Ordinal)) { throw "Bucket/path mismatch: $id" }
  if ($bucket -eq 'Review' -and $row.Groups['reason'].Value.Trim() -eq '—') { throw "Review reason missing: $id" }
}
$documentDirs = Get-ChildItem 'DOC/Stocks','DOC/Archive','DOC/Review' -Directory
if ($documentDirs.Count -ne $rows.Count) { throw "Index/document count mismatch: $($rows.Count)/$($documentDirs.Count)" }
'PASS index links, buckets, reasons, and uniqueness'
```

Expected: `PASS index links, buckets, reasons, and uniqueness`。

- [ ] **Step 3: 驗證版本、目錄與工作樹格式**

```powershell
if ((Get-Content -Raw 'Library/CURRENT.md') -notmatch '目前版本：v0\.3 r2') { throw 'Wrong CURRENT version' }
foreach ($path in @('DOC/Stocks','DOC/Archive','DOC/Review','DOC/INDEX.md')) {
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing $path" }
}
git diff --check HEAD~3..HEAD
git status --short
```

Expected: `git diff --check` 無輸出；`git status --short` 不出現本次實作檔案。若仍有使用者原有的無關修改，只報告、不處理。

- [ ] **Step 4: 記錄驗證結果**

不新增 commit。交付訊息需逐項報告：canonical `v0.3 r2`、三個 DOC bucket、索引第一筆 Review 文檔、舊生效名稱清除、三組驗證命令均通過。
