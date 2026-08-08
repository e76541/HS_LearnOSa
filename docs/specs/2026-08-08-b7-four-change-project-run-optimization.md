# B7 四項變更：Project Run 優化候選

- 短代號：D52
- 狀態：草稿
- 裁決來源：無
- 實作參照：無
- 後繼：以 D51 的 B6／B6.1 作直接 baseline，先做同題紙上 trace，再只在通過 D50 十二項標準後進實跑；本稿不直接修改 canonical、RBF1、D48、D37、D38

- 日期：2026-08-08
- 分支：`REBUILD1`
- 上游比較稿：[D50｜Project-first 流程候選盤點與評價草案](2026-08-08-project-first-flow-candidates-evaluation.md)
- 直接上游：[D51｜D50 同題紙上 Trace 與 B6 優化候選](2026-08-08-d50-paper-trace-and-b6-optimization.md)
- 比較基準：D51 B6，並採本輪延伸的 **Goal-first** 讀法：Project 由 Goal 啟動，Source／Module／Tool／Skill／SOP 都只是可被引用的 Resource

---

## 0. 目的與限制

本稿不重畫整個系統，只允許在 B6/B6.1 上做 **兩個加項＋兩個減項**。

限制：

1. 不新增第二份 Project Path 真值。
2. 不新增 Module↔Project 持久 mapping。
3. 不新增持久 LearnPath。
4. 不 breaking-change ModuleCore／Semantic Edge。
5. 新增項優先使用 Run／Step 既有欄位或 runtime rule，不先新增服務與狀態機。
6. 減項只移除 **runtime 機制**；裁1／裁4的治理語義仍保留作規則來源，不宣告正式撤回治理草案。

本稿只有「候選」資格。若沒有同題試跑資料，不得稱為優於 B6 或 B0。

---

# Part A｜B6.1 baseline

## 1. 起點

本稿把 D51 B6 依本輪討論收斂成：

```text
Goal
↓
Project Run
↓
Minimum Path
↓
Project Step
├─ refs → Source span
├─ refs → Module
├─ refs → Tool / Skill
└─ refs → Existing SOP
↓
Execute
↓
卡點
├─ 外部條件問題 → 原 Project Step 內修復
└─ 人的能力缺口 → Repair Episode
                      ↓
                   最小補足
                      ↓
                   返回原 Step retry
↓
Project acceptance
↓
Run 保存完整事件與輸出

需要正式主張／採用結論時 → VERIFY
```

四種真值仍維持 D51：

- Source：來源／原文真值。
- L2 Module／Semantic Edge：唯讀 semantic evidence。
- Project Run：Goal、execution path、runtime、output、acceptance。
- VERIFY：正式主張的證據與結論權限。

Repair Episode 是 Run 的子事件群，不是第五種長期真值。

---

# Part B｜兩個加項

## 2. 加項 A1｜Project Contract

### 2.1 問題

B6 已有 `goal` 與最後的 `acceptance result`，但「Project 開始前要交付什麼、怎樣算完成、哪些條件不能突破」沒有被收成同一個事前契約。

若只有 Goal：

```text
Goal = 做出趨勢分析
```

可能仍不足以約束：

- 要交付圖、表、程式還是文字判斷。
- 哪個結果算完成。
- 哪些資料／時間／工具限制不可越界。
- Path 是否已做到足夠，還是繼續擴張。

這會影響 D50 的 E7 可追溯性與 E11 錯誤路徑可見性。

### 2.2 做法

不新增 `ProjectContract` 獨立資料表；直接把四個事前欄位放入 Project Run header：

```text
RunHeader
- goal
- deliverable
- acceptance
- constraints
```

語義：

- `goal`：本次要達成什麼。
- `deliverable`：最後必須存在的可觀察輸出。
- `acceptance`：如何判斷本次 Project 完成。
- `constraints`：明確不可突破的時間、資料、工具、風險或範圍限制；沒有就空。

### 2.3 不做

- 不為每個 Step 再複製一份 Project Contract。
- 不自動把 acceptance 升成 VERIFY 結論。
- 不因 Contract 存在就要求所有 Project 事前寫完整規格書。

### 2.4 預期改善的指標

- E7：Run 可以直接回答「原本要交付什麼、最後是否達成」。
- E11：Path 偏離或無限擴張時，有事前邊界可以暴露問題。
- E3：可能減少執行後補定義完成條件的返工；是否真的下降要實跑。

---

## 3. 加項 A2｜Step Resource Resolver（按需引用規則）

### 3.1 問題

B6 允許 Step 存 `source/module/tool/skill/SOP refs`，但還缺一個最小的「先找什麼、何時才新增東西」規則。

沒有規則時可能出現兩個相反問題：

1. 每次 Step 都重新查原文／重新造方法，既有 Module／SOP 變死資產。
2. 為了 reuse，先把整份文本完整模塊化再開工，又把 L2 變成前置 Gate。

### 3.2 做法

新增 **runtime resolution rule**，不是新服務、不是新持久 mapping。

每個 Step 在需要資源時依序：

```text
ResolveRefs(step_need)
↓
1. 查可直接執行的既有資產
   Existing SOP / Tool / Skill
↓ 未命中
2. 查既有 semantic evidence
   Module / Source span
↓ 未命中
3. 查當前可取得的新 Source / 外部資源
↓ 仍未命中
4. 記 resource_gap，留在 Project/WORK 補資源
```

命中後只把實際採用者寫進：

```text
ProjectStep.refs[]
```

沒有命中的候選不建立 mapping 記錄。

### 3.3 重要邊界

- Resolver **不生成 Project Path**。
- Semantic Edge **不等同 execution order**。
- Resolver 只回答：「這個 Step 現在可調什麼」。
- Project Path 仍是唯一 execution truth。
- 若人看不懂已命中的資源，才形成 capability blocker／Repair Episode。

### 3.4 預期改善的指標

- E5：增加 reuse 命中機會，減少重複找法／重造方法。
- E8：卡點時先查已存在資產，可直接定位局部補足材料。
- E10：因不建 mapping service，新增成本限制在查詢規則與 refs 留痕。

---

# Part C｜兩個減項

## 4. 減項 R1｜移除「獨立裁1 Runtime Gate」

### 4.1 要移除的是什麼

B6 紙上流程寫成：

```text
Step 卡住
→ 裁1 分類
→ WORK 或 Repair Episode
```

若實作時把「裁1」做成一個獨立 runtime node／route state／system switch，會新增一個持久或半持久轉換層。

本稿刪掉這個 runtime Gate。

### 4.2 保留什麼

**裁1 的判準不刪。** 它直接成為 BlockerEvent 的分類規則：

```text
BlockerEvent
- blocker_id
- parent_step_id
- observation
- kind: external_condition | human_capability
- evidence_refs[]
```

然後：

```text
kind = external_condition
→ 原 Project Step 內排錯／補資源

kind = human_capability
→ 建 Repair Episode(parent_step_id)
```

因此裁1由「一個要走過的系統站」降為「BlockerEvent 如何分類的規則」。

### 4.3 預期刪除

- 一個 runtime Gate。
- 一個 WORK→LEARN route state（若原本準備持久保存）。
- 一次為了切系統而做的額外狀態同步。

### 4.4 不能因此刪掉

- blocker 的觀察證據。
- 外部條件與人的能力缺口的區分。
- VERIFY 的獨立責任。

---

## 5. 減項 R2｜移除「獨立裁4 Return Gate」

### 5.1 要移除的是什麼

B6 紙上流程寫成：

```text
Repair Episode
→ 裁4：足以重試
→ 返回原 Step
```

若把裁4做成獨立 return node／LEARN→WORK transition，又增加一個路由層。

本稿刪掉這個 runtime Gate。

### 5.2 保留什麼

**裁4 的語義直接成為 Repair Episode 的結束條件：**

```text
RepairEpisode
- repair_id
- parent_step_id
- blocker_id
- refs_used[]
- local_actions[]
- retry_ready: true | false
- return_reason
- retry_result
```

規則：

```text
retry_ready = false
→ Repair Episode 繼續局部補足

retry_ready = true
→ Episode 關閉
→ 直接 retry(parent_step_id)
```

真正成敗仍由 parent Step 的 verification／Project acceptance 判斷，不由 Repair Episode 自稱「已學會」。

### 5.3 預期刪除

- 一個 return Gate。
- 一個 LEARN→WORK route state（若原本準備持久保存）。
- 一套獨立的「學習完成驗收」機制。

### 5.4 不能因此刪掉

- `return_reason`。
- 原 parent Step 指標。
- retry 後的真實結果。

---

# Part D｜B7 流程

## 6. 四項變更後

```text
RunHeader
Goal + Deliverable + Acceptance + Constraints
↓
Project Minimum Path
↓
Step
↓
ResolveRefs(step_need)
├─ SOP / Tool / Skill
├─ Module / Source span
└─ new resource if actually needed
↓
Execute Step
↓
成功？
├─ 是 → 下一 Step
└─ 否 → BlockerEvent（直接依裁1語義分類）
          ├─ external_condition
          │    → 原 Step 內修復
          │    → retry Step
          │
          └─ human_capability
               → RepairEpisode(parent_step)
               → 最小補足
               → retry_ready=true（裁4語義）
               → 關閉 Episode
               → retry parent Step
↓
Project Acceptance
↓
Run 保存完整事件與 refs

正式主張／採用判斷需要時 → VERIFY
```

### 6.1 本版沒有新增

- 新的主系統。
- 新的持久 path。
- 新的 mapping table。
- 新的 route state machine。
- 新的 Learn completion score。

新增只有：

1. Run header 四個 contract 欄位。
2. 一條按需 `ResolveRefs` runtime 規則。

---

# Part E｜加減項對照

## 7. 精確清單

| 類型 | 項目 | 增／減的是什麼 | 主要針對 |
|---|---|---|---|
| 加 | A1 Project Contract | Run header 增 `deliverable / acceptance / constraints`（goal 已有） | E7、E11 |
| 加 | A2 Step Resource Resolver | 增按需 refs 查找順序；不增持久 mapping | E5、E8、E10 |
| 減 | R1 Inline Blocker Classification | 刪獨立裁1 runtime Gate／route state | E3、E4、E8、E10 |
| 減 | R2 Inline Repair Return | 刪獨立裁4 return Gate／route state／Learn completion gate | E3、E4、E8、E10 |

---

# Part F｜十二項自檢

## 8. B7 對 B6.1

| 指標 | 結果 | 判斷 |
|---|---|---|
| E1 單一責任 | **P** | Project仍擁有 execution；L2仍擁有 semantic evidence；兩個新增項都不取得 path owner |
| E2 單一真值 | **P** | Contract 在 Run header；Resolver 只寫 refs；Blocker/Repair 都是 Run event，不新增平行真值 |
| E3 必要步驟 | **R** | 紙上刪兩個 Gate、增加 Resolver；淨必要動作是否下降必須實跑，不能只靠節點數宣稱 |
| E4 分支複雜度 | **P/R** | 系統切換分支減少；Blocker 的二分類仍存在但變成同一 Run 事件；需量測 runtime route count |
| E5 重複處理 | **P/R** | Resolver明確先 reuse，再找新資源；但每 Step 查詢成本與命中率需實跑 |
| E6 回寫衝突 | **P** | Resolver不改 L2；Repair 不回寫 ModuleCore／Semantic Edge；Project只寫 Run |
| E7 可追溯性 | **P** | Contract＋Step refs＋BlockerEvent＋RepairEpisode 可以由單一 Run ID 追回意圖到結果 |
| E8 卡點處理成本 | **P/R** | 紙上從「分類Gate→Repair→ReturnGate」縮成「BlockerEvent→Repair→retry」；實際事件數待測 |
| E9 可刪除性 | **P** | 明確刪兩個 runtime Gate／route state，不用新增替代狀態機 |
| E10 實作增量 | **P/R** | A1只是欄位；A2是規則；但 B6 原本尚未完全落地的 Run/Step/Event schema 成本仍存在 |
| E11 失敗模式 | **P/R** | Contract讓 path 偏離較容易被 acceptance 暴露；Resolver 錯配 refs 仍可能導致錯誤 Step，需靠 verification 發現 |
| E12 驗證方式 | **P** | 可用 D51 T1 同題比較 B6.1→B7，另量 Resolver 命中與兩 Gate 是否真的消失 |

### 8.1 硬衝突檢查

目前沒有發現 E1／E2／E6 的直接硬衝突；E11 仍需試跑驗證 Resolver 錯配是否能被 Step verification 及時暴露。

因此 B7 的資格只能是：

> **可試作候選。**

不得稱為「已優於 B6.1」。

---

# Part G｜試跑時新增的比較指標

## 9. B6.1 → B7 必測

沿用 D51 的 B0→B6 指標，另增加四個只針對本次四項變更的觀察：

1. **Contract drift**：執行中有幾次因 deliverable／acceptance 原本未定清楚而改 Path；B7 是否減少。
2. **Resolver hit rate**：Step 需要資源時，有多少直接命中既有 SOP／Tool／Skill／Module／Source，而不新造資產。
3. **Gate count**：blocker 發生到 parent Step retry 間，是否真的少掉獨立裁1／裁4 route state。
4. **Wrong-ref visibility**：Resolver 引錯資源時，在哪個 Step verification 被發現；是否會靜默寫入 L2（不得發生）。

只有實跑後，若 B7 在預先指定指標改善且不損失追溯／reuse，才能寫：

> B7 在該測試範圍內改善 B6.1 的指定指標。

---

# Part H｜目前結論

## 10. 目前可以下的結論

1. **A1 值得試**：它不新增一個新真值，只補 Run 開始前已缺少的交付／驗收邊界。
2. **A2 值得試**：它讓 Module／SOP／Tool 有明確消費入口，但不恢復「L2完成才准開工」。
3. **R1 可以作為 runtime 減法候選**：裁1保留為分類規則，不需要變成一個獨立站位才能生效。
4. **R2 可以作為 runtime 減法候選**：裁4保留為 Repair Episode 結束條件，不需要第二個 return Gate。

本稿尚未證明四項合併後總成本低於 B6.1；下一步只應做同題 trace／試作，不再先增加第五項變更。
