# 模塊碎片化與九宮配合(Module Fragments and Nine-Grid Composition)

- 短代號：D18

日期:2026-07-19(r1 修併:2026-07-20)
狀態:已封存
裁決來源:無
實作參照:無
後繼:無

> **性質:Agent 建議稿(r1)。**  
> 使用者已裁量四點——①組件可跨來源共用;②九宮格位場景優先、不限場景;③組裝觸發雙軌皆可;④同意以實際 PDF 專業課程試作。  
> 本稿其餘條文為討論共識與 Agent 補強,仍待裁決;未寫入 `Library/規範`、路線 INI、Skill／tools／DOC 真值。  
> 舊版凍結:[../archive/2026-07-19-module-fragments-nine-grid-agent-view-r0.md](../archive/2026-07-19-module-fragments-nine-grid-agent-view-r0.md)。

關聯:[2026-07-16-nine-palace-dual-phase.md](2026-07-16-nine-palace-dual-phase.md)、[2026-07-18-module-flow-loop.md](2026-07-18-module-flow-loop.md)、`Library/規範/10-模塊層.md`(2.1、2.1a、2.3、2.6)。涉及作業模塊 M1、M3(均籌備);本稿為試作設計,不實作。

整合流程圖(已封存):[../archive/html-2026-07-23/specs/assets/2026-07-19-module-pipeline-flow.html](../archive/html-2026-07-23/specs/assets/2026-07-19-module-pipeline-flow.html)(來源 JSON 同封存目錄)。

---

## 1. 動機

PDF 等專業課程常見公式、定義、條件、步驟、證據,人事時地物稀薄。現行「模塊 + 九宮」下,切出的單位可以是完整知識,卻未必有「畫面」可入宮。

方向:

```text
專業知識無人事時地物,仍可為完整模塊。
有沒有畫面感,是場景(呈現層)問題,不是模塊完整性問題。
```

因此補子模塊粒度的**組件(fragment)**層,並把「成畫面」從模塊完整性移到呈現層。

---

## 2. 三面切分

| 面 | 內容 | 特徵 |
|---|---|---|
| **儲存層** | 原文證據、Fragment、Module、fragment_reference、module_edge | 可持久化、可回溯、可機械檢查 |
| **呈現層** | Scene、九宮格位、原面快照 | 渲染時計算;原則不落真值;試作可輸出工件 |
| **控制面** | 管線軌、提問軌、測驗軌 | 流程與觸發;本次試作只跑管線軌 |

分層簡式:

```text
原文 → 組件 → 模塊 → 九宮
              ↘ 場景 = 模塊 + 封閉背景素材(渲染視圖,不落庫)
```

---

## 3. 整合管線(權威敘述)

三份草案共用同一條管線;本節為現行敘述。舊寫法「文本 → 模塊層 → 九宮」作廢。

```text
原文
  → 抽組件 Fragment
  → 組裝模塊 Module
      ├─ 建立 fragment_reference
      ├─ 建立 module_edge
      └─ 完整性檢查
  ⇄ 提問站(第二循環起;拆併走版本／引用,不改組件本體)
  → 挑選
  → 成景(渲染時計算)
      ├─ 有背景 → scene
      └─ 無背景 → module_only
  → 九宮(攝入期 → 練習期)
  → 測驗 + 間隔重複
  → 到期≥3 → 回原面(拆併對不上才重排)
```

規則:

- **不跳儲存層**:原文 → 組件 → 模塊不可跳;原文／孤立組件／未完整模塊皆不得入宮。
- **呈現層可省場景**:無背景可配時,完整模塊可以 `module_only` 入宮。
- **雙階段照舊**:攝入期答案版照講;練習期三層隨機;回宮用原面。
- **流程閉環照舊**:提問探邊界、挑選以知帶新、測驗掛模塊;攝入期第一輪提問只輕量探先備。

| 行為 | 合法? |
|---|---|
| 原文直接入九宮 | 否 |
| 跳過組件入九宮 | 否 |
| 跳過模塊入九宮 | 否 |
| 完整模塊不經場景、以 `module_only` 入宮 | 是 |

---

## 4. 組件(fragment)

獨立節點(裁量①可跨用)。建議欄位:

```text
fragment_id / source_id / char_span / kind / text_excerpt / text_hash?
```

kind 閉集(暫定):定義 | 公式 | 條件 | 步驟 | 證據 | 例子 | 背景片段。

定位:

```text
唯讀證據層;
不進邊層;不進對齊;不生成熟練度;不作練習靶點。
```

跨用:

```text
本體錨定原生來源 char_span;
他處以引用使用;
等級記在引用關係上,不記本體。
```

背景片段:

| 層 | 角色 |
|---|---|
| 儲存層 | 仍是 fragment,不進邊層 |
| 模塊層 | 可掛到 context、assumptions、examples 等欄位 |
| 呈現層 | 可作場景背景素材(來源封閉,見 §7) |

---

## 5. 引用關係 fragment_reference

等級制與跨模塊共用的地基。建議獨立表(待裁決):

```yaml
fragment_reference:
  reference_id
  fragment_id
  module_id
  field_name
  role
```

由此可機械判定 L1、追蹤跨模塊引用、衍生 `assembly_level`。

**真值歸屬(待裁決,r1 建議):**

```text
模塊本體(含欄位文字快照)生成後凍結;
fragment_reference 屬可版本化的組裝關係(登記層性質);
事後拆併調整引用 → 產出新版模塊,不改判原模塊。
```

**模塊 char_span(待裁決,r1 建議):**

```text
模塊 char_span 只錨定原生敘述區間;
跨引組件不擴張該區間;
回溯走 fragment_reference。
```

---

## 6. 等級制 assembly_level

屬於「組件 × 組裝」關係,**衍生視圖**,不手設、不存組件本體。可快取於報告,不作真值。

```text
assembly_level = f(fragment_reference, module_completeness, nine_grid_placement)
```

| 等級 | 定義 |
|---|---|
| L0 孤立碎片 | 無任何引用 |
| L1 已掛欄位 | 被至少一個 `module.field` 引用(MVP 不另建 proposition 表) |
| L2 模塊完整 | 所屬模塊通過完整性檢查 |
| L3 可入宮就緒 | 所屬完整模塊已被排入某一九宮面(`intake_ready`) |

- 同一組件在不同組裝可有不同等級。
- L3 **不是**「場景就緒」;含 `scene` 與 `module_only` 兩種入宮。
- L3 **不綁**學習者「已知／未知」狀態;挑選邏輯在控制面,不進等級公式。

---

## 7. 模塊完整性(機械檢查)

完整條件取四型別本體的**入宮子集**(相對 canonical 2.1 為新增判準,不是「不加新規則」;升格時須明示):

| 型別 | 入宮完整條件 |
|---|---|
| TeachingModule | concept_core + examples |
| MethodModule | preconditions + procedure + constraints |
| CaseModule | context + actions + outcome |
| AnalysisModule | claim + evidence + assumptions |

未列入子集的欄位(如 hooks、limitation、failure_modes、transferability、counterarguments)試作期不擋入宮。

欄位視為已填,若:

1. 有至少一筆指向該欄位的 `fragment_reference`,或  
2. `author_not_provided = true`(「作者未給」;Method 的 constraints 另受 2.3 弱策略點限制,不擋入宮)。

未完整 → 不得入宮。試作期對 `author_not_provided` **只統計、不設硬閾值**。

---

## 8. 場景與九宮格位(裁量②)

- 場景 = 模塊 + 封閉背景素材,渲染時計算,**不是儲存層**。
- 人事時地物是場景判準,不是模塊判準。
- 格位 **場景優先**;無背景可配時以完整模塊入宮。

**背景素材封閉集(待裁決,r1 建議)**——只允許:

1. 該模塊自身 `fragment_reference` 掛到 context／examples 等欄位的背景片段;  
2. 與該模塊有邊相連之**背景模塊**所引用的片段。  

兩條之外不得取用(對齊 canonical 2.6「渲染層可讀」的封閉精神)。

**格位 payload(待裁決):**

```text
payload_type = scene | module_only
```

| 情況 | 處理 |
|---|---|
| 有背景 | `scene` |
| 無背景、模塊完整 | `module_only` |
| 未完整模塊／孤立組件／原文片段 | 不得入宮 |
| 背景模塊 | **試作期不單獨佔格**,只作場景素材(與雙階段「背景格」口頭規則的銜接,升格時再對齊) |

每格至少:`payload_type`、`module_id`、`render_script`。

---

## 9. 組裝觸發:雙軌(裁量③)

1. **管線軌**:模塊化時自動抽組件並組裝一次。  
2. **提問站軌**:前沿輪「一半會一半不會」→ 拆到組件粒度再重組。

**拆併與唯讀(待裁決,r1 建議):**

```text
組件本體唯讀,永不改寫;
拆併不在本體上寫 superseded_by;
改走:新增更細 fragment + 調整／版本化 fragment_reference(+必要時新版模塊)。
```

**本次試作**:只跑管線軌。提問站軌、拆併回饋不在成功判準內。

**挑選(試作退化):**首輪陌生材料無「已知模塊」錨點時,不以知帶新;改以邊密度／中心度選格。以知帶新自第二循環起適用(對齊流程閉環攝入期輕量化精神)。

---

## 10. 與現行規範的衝突點

升格時處理;試作期以下列緩衝:

1. **2.1a 附屬不脫勾**:組件獨立節點超出素材標註;試作以「本體錨來源、跨用走引用」緩衝。  
2. ~~管線「文本→模塊→九宮」~~:**已處理**(2026-07-19)——改為本節整合管線。  
3. **hooks × 組件 kind**:與候選 C5 公式雙記未結重疊。**試作建議**:該 PDF 不生成 hooks、全走 fragment;雙軌去留列觀察項。  
4. **入宮完整性子集**:相對 2.1 型別本體為新增規則,升格時寫明。  
5. **模塊唯讀 vs 引用可調**:見 §5 真值歸屬建議。

---

## 11. 試作設計 `module-fragments-nine-grid`(裁量④)

- **材料**:一份實際 PDF 專業課程(待提供,走 `Inbox/`)。建議單章／頁碼範圍,勿整本;公式定義步驟密、人事時地物稀;最好能形成 6～9 個完整模塊,並有同公式／定義被兩模塊引用的可能。  
- **流程**:選材收錄 → PDF 解析 → 抽組件 → 組裝(+reference、邊) → 完整性檢查 → 成景 → 排宮 → 攝入期答案版 → 試作報告。  
- **工件**(只進試作紀錄,不進規範真值):

```text
source.json
fragments.json
fragment_references.json
modules.json
module_edges.json
integrity_report.json
scene_views.json
nine_palace_intake.json
trial_report.md
```

### 成功判準(必要)

1. **可回溯**:隨機抽 5 個 fragment,可回到 `source_id` + `char_span`(或 page_no + text_quote)+ kind + text_excerpt。  
2. **完整性機械可判**:每模塊 `complete = true|false`,不靠主觀。  
3. **可照講九宮**:至少一面攝入答案版;建議 ≥6 格為完整模塊或場景(<6 視為選材不足、換章節);人工可依答案版照講一圈。  
4. **跨模塊引用 ≥1**:同來源內即可(例:同一公式掛 Teaching.concept_core 與 Method.preconditions)。  
5. **module_only 合法**:若有無背景完整模塊,可以 `module_only` 入宮;材料天然皆有背景則記合法結果。

### 刻意不做

```text
不寫進 Library/規範;不開路線 INI;不改 Skill/tools/DOC 真值。
不跑提問站軌、拆併回饋、測驗、間隔重複。
不做跨來源組件共用(留待第二份材料)。
不生成 hooks;組件不進對齊／熟練度／練習靶點。
```

---

## 12. 仍待裁決(試作前建議拍板)

| # | 事項 | r1 預設建議 |
|---|---|---|
| 1 | 引用關係結構 | 獨立 `fragment_reference` 表 |
| 2 | L1「命題」 | = 被至少一個 `module.field` 引用 |
| 3 | L3 定義 | `intake_ready`(已排入九宮面),含 scene／module_only |
| 4 | 格位類型 | `payload_type = scene \| module_only`;背景模塊試作不單獨佔格 |
| 5 | 拆併 | 本體唯讀;版本化／引用調整;`superseded_by` 不寫本體 |
| 6 | hooks | 本次 PDF 不生成,全走 fragment |
| 7 | author_not_provided | 只統計,不硬擋 |
| 8 | 九宮不足 9 格 | ≥6 格可視為可讀試作九宮 |
| 9 | 跨來源共用 | 本次只驗同來源跨模塊引用 |
| 10 | 完整性子集 | 承認是新增入宮判準(上表四型別) |
| 11 | 真值歸屬 | 模塊本體凍結;引用可版本化;拆併→新版模塊 |
| 12 | 模塊 char_span | 不因跨引擴張 |
| 13 | 場景背景封閉集 | 自身欄位背景片段 ∪ 有邊背景模塊之片段 |
| 14 | 首輪挑選 | 邊密度／中心度;不以知帶新 |

---

## 13. 下一步

1. 使用者對 §12 預設拍板(可整批同意或逐條改)。  
2. 提供 PDF 與章節／頁碼範圍。  
3. 裁決本稿 → 執行試作 → 記入試作紀錄。  
4. 口頭驗證後,與雙階段、流程閉環同批議升格。
