# 技能登記簿半自動化實作路線

日期：2026-07-14
狀態：已實作
裁決來源：AOI 2026-07-14 Gate A（v0.3 r3）
實作參照：`tools/registry/`
後繼：無

**目標：** 在不改動 v0.3 凍結介面的前提下，建立可稽核、可回放、先 shadow mode 後漸進啟用的技能登記工作流；自動化候選檢索、結構化判定、覆核排隊與規則驗證，保留節點升格、`broader_than`、降級命中與熟練度寫入的人工裁決。

**目前狀態（2026-07-14）：** Gate A 已由 AOI 裁決；Phase 0–5 已實作，包含登記簿實體、六種 schema、交易儲存與 invariant、穩定 ID／人工熟練度、shadow-mode 對齊、人工覆核／pending，以及只讀管線適配器。Phase 6 評估器已完成，但倉庫目前只有一篇基準標籤、尚無 shadow 觀測；R10 與自動接受條件仍未裁決，因此 Gate B 未通過，正式真值維持人工寫入。

**架構原則：** 模塊層維持唯讀證據；登記層保存抽象技能狀態；兩層只由 `align(module)` 的裁決記錄縫合，不建立跨層圖邊。對外只暴露 `align`、`pending`、`node_id`、`proficiency` 四操作；驗證器、索引器、覆核佇列與稽核事件都是內部實作，不得成為其他層依賴的新介面。

## 一、不可跨越的門檻

### Gate A：實作範圍裁決（2026-07-14 已通過）

- AOI 已裁決：凍結規格變更與正式真值自動寫入；不禁止在既有四操作內建立 schema、驗證器、人工覆核流程、可回放儲存層與 shadow-mode 建議工具。
- 本路線不變更 ModuleCore，不新增公開操作，不建立新熟練度狀態，不裁決 R10。
- Phase 0–5 可依序實作，但所有建議均不得直接改寫正式節點、別名、`broader_than`、pending 升格或熟練度。

### Gate B：允許自動寫入前

- 完成三十篇基準標註及每篇「應對齊技能」。
- 量測前五召回、錯誤自動對齊率、父子誤判率、同義誤建率與人工覆核成本。
- AOI 另行裁決可自動接受的 `same` 條件，以及 R10 待建升格閾值。
- Gate B 前一律採 shadow mode：系統可產生建議，但正式節點、別名、關係與熟練度皆不由模型直接寫入。

## 二、建議目錄與責任

實作時新增下列結構；名稱可於 Gate A 後微調，但責任不可混用：

```text
registry/
├─ nodes.jsonl          # SkillNode 真值
├─ edges.jsonl          # 僅含已人工通過的 broader_than
├─ alignments.jsonl     # 模塊對齊裁決記錄；不是圖邊
├─ pending.jsonl        # REJECT 後的待建槽
├─ reviews.jsonl        # 待人工覆核項與裁決結果
├─ events.jsonl         # 追加式稽核事件，不存證據本體
└─ embeddings/          # 可重建的節點向量快取，不是真值

tools/registry/
├─ index.mjs            # 四操作唯一公開匯出點
├─ core/                # 儲存、鎖定、ID、事件與 invariant
├─ align/               # ModuleCore 投影、向量粗篩、三分類細判
├─ review/              # 內部覆核工作流，不供其他層依賴
├─ schema/              # JSON Schema
└─ test/                # fixture、單元、整合與回歸測試
```

`DOC/INDEX.md` 不得作為登記簿真值或流轉狀態來源；`registry/embeddings/` 可隨時由 `nodes.jsonl` 重建。

## 三、資料契約

### 3.1 SkillNode

最小欄位固定為：

```yaml
node_id: SKILL-000001
preferred_label: ai_adoption_baseline
display_name: AI 採用基線
aliases: []
proficiency: new
proficiency_updated_at: 2026-07-14T00:00:00Z
evidence_refs: []
```

- `node_id` 採不含語義的單調 ID；改名、吸收別名或重排關係不得換 ID。
- `preferred_label`、欄位名、狀態值與邊型別以英文儲存；中文只用於顯示。
- `evidence_refs` 只放外部場次或評分記錄引用，不複製證據內容。
- `aliases` 只有在 `same` 經人工通過後才更新。

### 3.2 RegistryEdge

```yaml
edge_id: REGEDGE-000001
source: SKILL-000001
target: SKILL-000002
type: broader_than
review_id: REVIEW-000001
approved_at: 2026-07-14T00:00:00Z
```

- `edges.jsonl` 只保存已通過的 `broader_than`。
- 候選關係留在 `reviews.jsonl`，不得提前混入正式圖。
- 允許多父、孤節點；驗證器不得強迫形成單根樹。

### 3.3 AlignmentRecord

```yaml
alignment_id: ALIGN-000001
module_ref:
  source_id: PENDING-example
  module_id: M02
  char_span: [100, 240]
decision: same
node_id: SKILL-000001
status: approved
candidate_rank: 1
review_id: REVIEW-000002
engine_version: registry-align-v1
created_at: 2026-07-14T00:00:00Z
```

- 這是 `align` 的裁決與溯源記錄，不是模塊層或登記層的圖邊。
- `reject` 不得帶正式 `node_id`，而是引用 `pending_id`。
- 每次重跑都保留引擎版本與候選排序，確保可回放、可比較。

### 3.4 PendingRecord 與 ReviewRecord

- `pending` 保存拒絕對齊的模塊引用、核心投影指紋、相似待建群與狀態。
- 聚類只能提示「同向訊號群」，不得自動建立 SkillNode。
- `review` 保存建議、人工裁決、操作者、時間與理由；不得把模型信心當作人工通過。

## 四、實作階段

### 實作進度（2026-07-14）

| 階段 | 狀態 | 證據 |
|---|---|---|
| Phase 0 | 完成 | `tools/registry/DATA_DICTIONARY.md`、`tools/registry/test/fixtures/` |
| Phase 1 | 完成 | 六種 schema、`core/store.mjs`、`core/validate.mjs`、交易與反例測試 |
| Phase 2 | 完成 | 公開 `node_id`／`proficiency`、人工管理路徑與事件 |
| Phase 3 | 完成 | 可重建向量索引、結構化 model judge adapter、shadow review queue |
| Phase 4 | 完成 | 覆核佇列、裁決套用器、pending 聚類與內部 CLI |
| Phase 5 | 完成 | batch shadow、attach-only、練習／演講只讀適配器、視圖隔離測試 |
| Phase 6 | 評估基建完成；資料未滿 | `evaluate-alignments.mjs` 可量測全部 Gate B 指標；目前 `1/30` 篇、`0/3` case 有觀測 |

所有完成狀態均以本計畫第六節命令實跑為準；Phase 6 不得因評估器存在而宣稱 Gate B 通過。

### Phase 0：裁決與固定測試樣本

**產物：** Gate A 裁決記錄、資料字典、三類對齊 fixture、非法資料 fixture。

1. 以 `Library/規範/70-版本與裁決.md` 的 v0.3 r3 記錄作為 Gate A 通過證據。
2. 從現有 `modules.md` 選取正常技能訊號、背景模塊、純填充或缺欄位樣本。
3. 人工建立 `same`、`related`、`reject` 的預期結果；不從模型輸出反推基準真值。
4. 固定 `[start,end)` 的 `char_span` 解析方式，但不藉此修改 ModuleCore canonical。

**完成條件：** Gate A 有明確裁決；fixture 能覆蓋背景排除、穩定 ID、非法跨層邊、未覆核關係及熟練度禁寫。

### Phase 1：schema、儲存與 invariant 驗證

**產物：** 六種 JSONL schema、追加式寫入層、原子更新、內部驗證器。

1. 建立節點、正式邊、對齊、待建、覆核、事件 schema。
2. 先驗證後寫入；正式資料與事件記錄同一交易邊界完成。
3. 實作單調 ID 配發與重複執行保護，同一裁決不得產生重複別名或重複邊。
4. 內部驗證器至少拒絕：
   - SkillNode 缺必要欄位；
   - `node_id` 被改寫或重用；
   - 非 `broader_than` 的登記邊；
   - 模塊 ID 被當成登記邊端點；
   - 未通過 review 的候選邊進入正式表；
   - 背景或非技能訊號模塊產生對齊；
   - 系統自行改寫 `proficiency`；
   - pending 未經裁決直接升格。

**測試：** 使用 Node 內建測試執行器，先寫失敗案例，再完成最小實作；每個 invariant 至少一個反例。

### Phase 2：`node_id` 與人工 `proficiency`

**產物：** 四操作中的穩定 ID 與熟練度存取。

1. `node_id` 只負責配發或解析穩定識別符，不從標籤生成雜湊 ID。
2. `proficiency(node)` 的系統路徑只讀。
3. 人工管理路徑必須要求操作者、理由與 `evidence_refs`；模型不得呼叫寫入。
4. 任何熟練度變更都寫入事件記錄，並保留舊值。

**完成條件：** 改正名、顯示名與別名後 ID 不變；未帶人工身分的熟練度寫入必定失敗。

### Phase 3：shadow-mode `align(module)`

**產物：** 合規過濾、節點向量索引、前五候選、結構化三分類判定。

1. 將輸入正規化為 ModuleCore；型別本體、正文、hooks 與模塊邊不可進入匹配提示。
2. 在檢索前排除 `is_skill_signal: false`、背景與純填充。
3. 以 `preferred_label + display_name + aliases` 建立節點描述與向量快取。
4. 全簿向量粗篩，固定回傳前五候選及相似度；登記簿很小時仍走同一介面。
5. 模型細判只允許 `same | related | reject`，並輸出候選、理由、信心與引擎版本。
6. 無論信心高低都寫入 review queue，不直接更新正式資料。
7. `related` 只產生候選 `broader_than`；方向不確定時必須標記待人工確認。
8. 可能觸發去重降級效果的 `same` 強制標記高風險覆核。

**完成條件：** 同一輸入與同一登記快照可回放出相同候選集合；模型格式錯誤時 fail closed，不降級成自由文字寫入。

### Phase 4：覆核工作流與 `pending(module)`

**產物：** 可操作的人工佇列、pending 聚類建議、裁決套用器。

1. 覆核畫面並列 ModuleCore、前五候選、既有別名、既有上下位關係、建議與風險旗標。
2. 人工操作只允許：接受同一、改選候選、拒絕、接受或拒絕候選關係。
3. `same` 通過後才建立 alignment，並以去重方式吸收新說法。
4. `reject` 寫入 pending；以相似度聚類並顯示來源數，但不提供「自動升格」動作。
5. `related` 通過後才把 `broader_than` 寫入正式邊；拒絕則保留裁決記錄。

**完成條件：** 每個正式變更都能追到一個人工 review；取消或重跑不產生半套寫入。

### Phase 5：管線接線但不擴張介面

**產物：** 模塊化後的批次 shadow 對齊與供消費端讀取的四操作適配器。

1. 正常模塊化完成後，以 ModuleCore 批次呼叫 `align`。
2. 零散來源的 attach-only 邏輯只讀已人工通過的對齊；登記簿空置或極小時維持休眠。
3. 練習生成與演講只經 `proficiency(node)` 讀狀態，不讀事件或模型建議。
4. 模塊圖、知識視圖與既有 `tools/viz` 永遠不載入 `registry/edges.jsonl`。
5. 不在此階段實作候選 C8 增量模塊化、C9 熟練度衰減或 pending 自動升格。

**完成條件：** 下游只看已核准真值；shadow 建議、pending 與 review 不影響收錄、練習或熟練度。

### Phase 6：三十篇評估與 Gate B 裁決

**產物：** 基準報告、錯誤分析、人工成本報告、Gate B 決策。

逐篇記錄：

- 前五候選是否含基準節點；
- 第一名是否正確；
- `same / related / reject` 是否正確；
- 父子方向是否正確；
- 是否誤建同義技能；
- 人工修正類型與耗時；
- 對前序節點的命中數及累積重疊率曲線。

不得預先寫死自動接受閾值。三十篇完成後，AOI 才能依錯誤代價裁決：

1. 是否允許部分低風險 `same` 自動寫入；
2. 哪些情況仍須全人工；
3. R10 待建升格門檻；
4. 是否具備進入 v0.4 熟練度模型試驗的證據。

## 五、測試矩陣

| 類別 | 必測行為 |
|---|---|
| Schema | 必填欄位、英文儲存值、合法熟練度、合法唯一邊型別 |
| 邊界 | 背景不對齊、非技能訊號不對齊、型別本體不進匹配 |
| 身分 | 改名不換 ID、別名去重、ID 不重用 |
| 對齊 | 前五候選、三分類封閉集合、格式錯誤 fail closed |
| 人工閘門 | `related` 未覆核不寫邊、pending 不升格、降級命中強制覆核 |
| 熟練度 | 系統只讀、人工變更留事件、證據只存引用 |
| 層隔離 | 模塊邊不進登記簿、`broader_than` 不進模塊圖、alignment 不作圖邊 |
| 重跑 | 同一裁決不重複寫入、索引可重建、事件可回放 |

## 六、每階段驗證命令約定

實作後統一提供以下命令；實際腳本名稱在 Phase 1 固定：

```bash
node --test tools/registry/test/*.test.mjs
node tools/registry/internal/validate-store.mjs registry
node tools/registry/internal/evaluate-alignments.mjs tools/registry/test/benchmark
git diff --check
```

驗證器與評估器是內部維護工具，不得由模塊、練習、演講或視圖層直接依賴。

## 七、明確不在本輪實作範圍

- 自動建立正式 SkillNode。
- 自動通過 `broader_than`。
- 自動升格 pending。
- 自動升降 `proficiency` 或實作遺忘衰減。
- 修改 ModuleCore、邊類型、熟練度狀態或四操作簽名。
- 從講稿、投影片、心智圖或口述逐字稿回灌登記簿。
- 將 `DOC/INDEX.md`、向量快取、review queue 或 pending 當作正式登記真值。

## 八、建議第一個可交付里程碑

Gate A 通過後，第一個 PR 只做 Phase 0–1：schema、fixture、儲存 invariant 與測試，不接模型、不接下游。這能先固定層界、人工閘門與穩定 ID，再以第二個 PR 實作 shadow-mode `align`，把模型品質風險與資料完整性風險分開驗收。
