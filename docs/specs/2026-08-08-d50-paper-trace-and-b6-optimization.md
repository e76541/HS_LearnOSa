# D50 同題紙上 Trace 與 B6 優化候選

- 短代號：D51
- 狀態：草稿
- 裁決來源：無
- 實作參照：無
- 後繼：以本稿固定案例先實跑 B0，再實跑 B6；若 B6 未在事前指定指標改善，維持 B0／回 D50 重評；本稿不直接修改 canonical、RBF1、D48、D37、D38

- 日期：2026-08-08
- 分支：`REBUILD1`
- 上游比較稿：[D50｜Project-first 流程候選盤點與評價草案](2026-08-08-project-first-flow-candidates-evaluation.md)
- canonical 依據：`Library/規範/10-模塊層.md`、`20-結構層.md`

## 0. 目的

D50 已把 B0～B5 分開保存並建立 12 項評判標準。本稿繼續下一步：

1. 用一個固定案例做**紙上逐步 trace**，先看 B0，再看 B1～B5。
2. 利用 canonical 真值重新判斷哪些候選其實是假合併或責任重疊。
3. 只針對 trace 暴露的成本提出 B6；不因 B6 敘事較短就稱其優於 B0。
4. B6 若要取得「優於 baseline」資格，仍必須跑同一案例取得實際資料。

本稿的「步驟數」是**結構步驟**，不是實測耗時；不得拿紙上 trace 冒充效能 benchmark。

---

# Part A｜先補 canonical 約束

## 1. Module 與 Edge 現行真值

### 1.1 Module 不是 Project runtime node

canonical `ModuleCore` 已凍結，核心含 `source_id / char_span / operations / input_type / output_type / problem_type` 等欄位；更重要的是：

> **模塊為唯讀證據層，生成後不變，不承載任何流轉狀態。**

因此 Module 可以被 Project／Learn **引用**，但不能直接兼任：

- Project 目前走到哪一步。
- 某一步完成／失敗。
- 本次 Run 的 retry count。
- 本次卡點展開出的暫時子步驟。

這些都不是 ModuleCore 的責任。

### 1.2 Edge 不是 Project 執行順序

canonical Edge 是語義關係：

`depends_on / exemplifies / elaborates / equivalent_to / contrasts / motivates / solves / foreshadows ...`

且現行規範明確寫：

> **文本順序由 char_span 線性層承接，禁設順序邊。**

因此不能把現行 L2 Graph 直接解讀成：

```text
Step1 → Step2 → Step3
```

Project Path 的「執行順序／前置／完成條件」與 L2 Edge 的「語義支撐／例示／解決」是不同語義。

### 1.3 對 D50 候選的直接影響

- B2 若把 L2 Edge 直接拿來「組 Project 路線」，需要降級：Module 可供 Project 選材，但 semantic edge 不能自動等同 execution edge。
- B4 保留兩種結構不一定是雙真值；若一個是 semantic graph、一個是 execution path，它們本來就是不同真值。
- B5 `Module=Node、Project Path=Graph 子圖` 在現行 canonical 下是**假統一**：Node 的靜態證據語義和 Project runtime node 的狀態語義不同；Edge 語義也不同。

所以優化不能靠「把名字合併」完成。

---

# Part B｜固定紙上案例

## 2. 控制案例 T1

所有方案使用同一個合成案例，目的是比較結構，不測模型能力。

### 2.1 Source

`S1` 是一篇資料處理教學文本，假設可保留的語義命題簇共 **12 個**。

本次 Project 只需要其中 5 類資訊：

1. 載入 CSV。
2. 正規化日期欄。
3. 計算 7 日移動平均。
4. 畫趨勢圖。
5. 核對輸出是否符合完成條件。

另外 7 個命題與本次 Goal 無直接關係，但對其他未來任務可能有用。

### 2.2 Project Goal

> 由指定 CSV 產出一張含 7 日移動平均的趨勢圖，並完成最小核對。

### 2.3 Runtime blocker

執行到「7 日移動平均」時，假設：

- 工具／資料都正常。
- 使用者不知道 rolling window 與缺失值處理方式。
- 因此依裁1=A，分類為人的操作／判斷能力缺口。
- 局部補足後依裁4=A，回原節點重試。

本案例不要求形成對外採用／研究主張，所以不呼叫 VERIFY。

### 2.4 觀察欄

紙上 trace 只記：

- `PRE`：第一次真正執行前的必要處理階段數。
- `PATH`：存在幾套能改變執行順序的 path owner。
- `SEM`：是否需要處理全部 12 個語義模塊才能開跑。
- `ROUTE`：本案例 runtime 必須經過的路由／返回判斷。
- `WRITE`：主要持久資料族。
- `REPAIR`：卡點修復是否另造一套持久 path。
- `TRACE`：能否直接追回 Goal→Step→Blocker→Repair→Retry→Output。

這些欄位仍是結構觀察，不是效能分數。

---

# Part C｜先 Trace B0

## 3. B0｜現行 baseline trace

### 3.1 紙上路徑

在「文本驅動學習／專案」的現行敘事下：

```text
S1 收錄／保留
→ L2 候選分流＋模塊化
→ L2 semantic edge 抽取
→ L1 形成流程／卡點
→ L1-03 最小可行
→ 開始執行
→ rolling mean 卡點
→ 裁1 最小診斷：人的能力缺口
→ L1-02 定位
→ L3-01 查 L2
→ L3-02 組材料
→ L1-04 局部路徑
→ 裁4：足以重試
→ L1-05 返回
→ 原節點重試
→ 任務驗收
→ 另以開發日誌／使用紀錄承接摘要
```

### 3.2 結構觀察

| 欄 | B0 |
|---|---|
| PRE | 至少存在「收錄／L2 結構化／L1 流程化」三類前置；是否全為本次 Project 必要尚未證明 |
| PATH | WORK／Project 的執行路線與 L1 流程目前沒有單一明確 ProjectPath 真值；屬 D50 E1/E2 的 R |
| SEM | RBF1 主幹先做 L2 備料；T1 的 12 模塊中只有 5 類被本 Project 需要，是否屬浪費需實跑量測 |
| ROUTE | 至少有 WORK→LEARN 分類＋LEARN→呼叫方返回；本案例合理 |
| WRITE | Source、Module、Semantic Edge、既有登記／事件、開發日誌等分散 |
| REPAIR | L1-04 是局部學習路徑；現行 D38 已限制為場次投影，但與 Project Run 的關係尚未成一條記錄 |
| TRACE | 可以從多份資料追回，但沒有單一 Project Run 將全部串在一起 |

### 3.3 B0 真正需要優化的不是什麼

目前沒有證據顯示以下本身有錯：

- Module 作唯讀證據層。
- Semantic Edge 作語義結構。
- 卡點局部 Learn 後返回。
- VERIFY 與任務驗收分流。

所以不能為了「少層」就砍它們。

B0 真正待改善的是：

1. **Project execution truth 不夠明確。**
2. **Project Run trace 不集中。**
3. **L2 備料是否必須阻塞第一個 Project step 未證明。**
4. **局部 Learn 的記錄與 Project 原節點沒有一級父子關係。**

---

# Part D｜依序重評 B1～B5

## 4. B1｜Project-first 六步版

```text
文本處理
→ Project／Minimum Path
→ 卡點
→ Learn
→ 返回
→ 完整紀錄
```

### T1 Trace

- `PRE`：可降為「文本可讀＋產生 Project Path」；但「文本處理」內是否仍要求完整 L2 未定。
- `PATH`：Project 可成為唯一 execution path owner。
- `SEM`：未定，因此 Module 可能被閒置，也可能仍全量前置。
- `REPAIR`：若 Learn 另存一套 path，仍可能多一個 runtime 結構。
- `TRACE`：Run Record 明確，是 B1 對 B0 最直接的新能力。

### 更新判斷

B1 的問題不是 Project-first，而是**沒有定義 Module／Edge 如何被消費**。仍是候選。

---

## 5. B2｜Module 三出口版

原意：Module 同時供 Project 組裝、Learn 補給、完成後沉澱。

### canonical 校正

保留：

- Project 可查 ModuleCore 的 `operations / input_type / output_type / problem_type` 等欄位。
- Learn 可查 Module 正文／型別本體作材料。
- Run 完成後可依證據提出新的收錄／模塊候選。

撤回原本過強的一句：

> 「L2 Edge 直接組成 Project Path」。

原因：semantic edge 不是 execution order。

### 更新判斷

B2 可作**資源消費策略**，不能單獨作 Project 路線模型。

---

## 6. B3｜雙軌兩個 Path generator

原版仍不進試作。

原因不變：前台 parser 與後台 L2 都能產生／修改 Project 路線時，E1／E2／E5／E6／E11 直接衝突。

注意：**平行處理本身不是問題；兩個 path owner 才是問題。**

若 L2 只產 semantic evidence、永不產 Project Path，則已不是原 B3，而接近 B4/B6。

---

## 7. B4｜Project execution truth + L2 resource

canonical 檢查後，B4 比 D50 初稿更合理：

```text
Project
→ 唯一擁有 execution path／runtime state

L2
→ 唯讀 semantic evidence
→ 被 Step／Learn 引用
→ 不直接寫 Project runtime
```

### 原 B4 多餘處

D50 原本假設可能需要：

- 一套持久的 Module↔Project Node mapping。
- Route Suggestion 接受／拒絕協議。

這兩件事未必需要成為系統。

如果 Project Step 本身直接保存：

```text
refs:
- source_id + char_span
- module_id
- tool / skill id
```

就不需要另建 mapping 真值。

L2 發現的候選改善也可以只是普通事件／建議，不必升成有狀態機的 `RouteSuggestion`。

因此 B4 可以進一步減法，形成 B6。

---

## 8. B5｜Unified Graph

### 8.1 依 canonical 重評

B5 原本希望：

```text
Module = Node
Project Path = Graph 子圖
Learn = 卡點 Node 展開
```

在現行 canonical 下有兩個直接衝突：

1. **ModuleCore 唯讀、不承載流轉狀態**，而 Project runtime node 必須承載當前狀態／執行結果／retry 等 Run 資訊。
2. **Semantic Edge 明確不等同順序邊**，而 Project Path 必須表達執行順序／前置／完成關係。

因此 B5 不是「把兩份相同資料合併」，而是把**不同語義資料硬塞成一份**。

### 8.2 更新資格

**在不 breaking-change canonical 的前提下，不進試作。**

若未來真的要試 B5，必須先證明：

- 現行 Module／Edge 語義本身應被重寫；
- 重寫後仍能保留 provenance、char_span、semantic relation 與既有消費者；
- 收益足以支付 breaking migration。

目前沒有這份證據。

---

# Part E｜B6 優化候選

## 9. B6｜Project Path + Evidence Refs + Repair Episode

B6 不是新造第五個主系統，而是從 B4 刪掉目前看不出必要性的中間機制。

### 9.1 四個真值

只保留四種不同語義的真值：

| 真值 | 擁有什麼 | 不擁有什麼 |
|---|---|---|
| **Source** | 原文、來源、char span | Project 狀態 |
| **L2 Module／Semantic Edge** | 可複用知識、方法、主張、語義關係；唯讀證據 | execution order、Run 狀態 |
| **Project Run** | Goal、Execution Path、目前 Step、事件、輸出、任務驗收 | 通用知識真值 |
| **VERIFY** | 正式主張的證據／結論權限 | Project 任務完成狀態 |

`LEARN` 不再需要一份新的持久真值；它是 Project／VERIFY 在卡點時產生的 **Repair Episode**。

### 9.2 Project Step 最小資料

不建立 Module↔Project mapping table。每個 Step 自己持有引用：

```text
ProjectStep
- step_id
- input
- process / action
- output
- verification
- refs[]
    - source_id + char_span
    - module_id
    - tool / skill id
```

其中：

- `execution order` 只住 Project Path。
- `semantic relation` 只住 L2 Edge。
- `refs` 只是引用，不形成第三套結構真值。

### 9.3 文本進來時

Project 不必等待「全文 L2 完整」才能取得第一條可執行路徑。

```text
Source + Project Goal
→ 產生最小 Project Path
→ 每個 Step 先解析可用 refs
   ├─ 已有 Module → 引用
   ├─ 尚無 Module 但原文可直接支援 → 先引用 source span
   └─ 真的需要 Learn／reuse → 依 canonical 對相關來源做模塊候選處理
→ Execute
```

重點：

> **Module 是可複用 evidence cache，不是 Project 開工許可證。**

這並不表示停止模塊化；只是「是否完成全量 L2」不再阻塞本次 Project 第一步。

### 9.4 卡點

```text
Project Step S3 卡住
→ 裁1 分類
   ├─ 工具／來源／整合問題 → Project/WORK 修
   └─ 人的能力缺口 → 建 Repair Episode
                         ↓
                     查既有 Module／Source refs
                         ↓
                     組最小材料／練習
                         ↓
                     裁4：足以重試
                         ↓
                     回 S3 重試
```

`RepairEpisode` 只需要作為 Run event 群存在：

```text
repair_id
parent_step_id
blocker
refs_used
local_actions
return_reason
retry_result
```

不另建一份長期 `LearnPath` 真值。

### 9.5 學習結果如何沉澱

禁止：

```text
Repair Episode
→ 直接修改既有 ModuleCore／Semantic Edge
```

若學習時取得新外部來源：

```text
新 Source
→ 正常收錄／候選分流
→ Module／Edge
```

若只是本次 Run 產生的推論／心得：

```text
Run Event／Summary
→ 若值得長期保留，先形成可追溯的新 authored source/note
→ 再走正常候選分流
```

因此 B5 的 write-back 污染問題被拿掉，且不需要新「升格 Graph」規則。

### 9.6 完整紀錄不另造第四種日誌

**Project Run 本身就是完整紀錄的資料真值。**

最小 Run：

```text
Run
- goal
- path / path_version
- source/module/tool refs
- events
- blockers
- repair episodes
- outputs
- acceptance result
- next action
```

人要閱讀時才 render 成「本次完整紀錄」。

若要發布成內容，可再投影成 D32 開發日誌；若只是系統內部執行，不強迫每個 Run 都成為 D32 內容產物。

這避免：

- Project Run Record 一份。
- 開發日誌又一份。
- 作業日誌再一份。

三份資料各自重抄同一過程。

---

# Part F｜B6 十二項自檢

## 10. 自檢表

| 指標 | 結果 | B6 判斷 |
|---|---|---|
| E1 單一責任 | **P** | Project 擁有 execution；L2 擁有 semantic evidence；VERIFY 擁有 conclusion authority；Repair 不成為新 owner |
| E2 單一真值 | **P** | execution order、semantic edge、Run state 分開且各一份；refs 不複製真值 |
| E3 必要步驟 | **P/R** | 移除「完整 L2 才能開跑」前置；但 ProjectPath 生成本身仍需實跑證明足夠 |
| E4 分支複雜度 | **P** | 本案例只需裁1 blocker 分類與裁4 return；不新增 RouteSuggestion／Graph promotion Gate |
| E5 重複處理 | **P/R** | 移除 mapping table 與第二 LearnPath；同一 Source 仍可能被 Project path extraction 與 semantic modularization各讀一次，但產物語義不同，需實測成本 |
| E6 回寫衝突 | **P** | L2 唯讀；Repair 不直接回寫 Module/Edge；Project 只寫 Run |
| E7 可追溯性 | **P** | Run 可直接串 Goal→Step→refs→Blocker→Repair→Retry→Output |
| E8 卡點成本 | **P** | Repair 掛 parent_step，不需要跨到另一個持久路徑系統 |
| E9 可刪除性 | **P** | 可刪持久 Module↔Project mapping、正式 RouteSuggestion 狀態機、持久 LearnPath 真值、每 Run 強制重抄 D32 日誌 |
| E10 實作增量 | **R** | 仍需 ProjectStep／Run／Event 最小 schema；需查現有資產是否已有可重用結構 |
| E11 失敗模式 | **P/R** | 不產生雙真值／Graph 污染；仍可能產生錯的 ProjectPath，但可由 Step verification／Run event 暴露，需試跑 |
| E12 驗證方式 | **P** | T1 已固定；可直接 B0→B6 同題實跑 |

### 10.1 資格

依 D50 門檻：B6 目前沒有 E1／E2／E6／E11 的**已知硬衝突**，且 E12 已可設計。

因此目前資格是：

> **可試作候選。**

不是「優於 B0」。

---

# Part G｜T1 紙上比較

## 11. B0 vs B6

| 觀察 | B0 | B6 | 紙上可下結論？ |
|---|---|---|---|
| execution path owner | 不夠明確，WORK／L1 敘事交疊 | Project Run 唯一 | **可以**：B6責任定義較少歧義；未代表 runtime 效率較高 |
| semantic graph | L2 canonical | L2 canonical | 無差 |
| 全量 L2 是否阻塞第一步 | RBF1 主幹偏前置 | 明定不阻塞 | **規則差異成立**；實際收益待測 |
| Module dead zone | 可能全量建、未必被本 Project 用 | 既有可引用；缺時 source span 可先用，真正 Learn/reuse 才要求模塊 | 只能說消費政策不同，不能說利用率一定改善 |
| Learn path | L1-04 場次路徑 | Repair Episode event 群 | B6 少一個持久真值；是否犧牲導航體驗待測 |
| Module↔Project mapping | 未定 | 不另建；Step refs 即可 | **可以**：B6少一個資料模型 |
| write-back | D38已限制導航不回寫 L2 | Repair 也不回寫 L2 | 無本質衝突 |
| 完整紀錄 | 分散，可另寫開發日誌 | Run 本身為真值，日誌是投影 | **可以**：B6明確單一 Run trace；實作成本待測 |
| VERIFY | 選配 | 選配 | 無差 |

### 11.1 紙上已能淘汰／降級的方案

- **B3**：淘汰進試作資格；雙 path owner 是已知硬衝突。
- **B5**：在現行 canonical 下淘汰進試作資格；屬 false unification，除非另案 breaking change。
- **B2**：降為「Module 消費策略」，不再作完整架構候選。

### 11.2 仍值得實跑的方案

實際試跑不需要 B0～B6 全跑一次。

經過 canonical 檢查後：

```text
B0 baseline
→ B6
```

即可先回答目前最重要的問題。

原因：

- B1 的 Project-first 已被 B6 保留。
- B2 的 Module reuse 已被 B6 保留，但拿掉 semantic edge＝execution path 的歧義。
- B3 有硬衝突。
- B4 的單一路線 owner 被 B6 保留，並刪掉 mapping／RouteSuggestion 額外機制。
- B5 與 canonical 直接衝突。

如果 B6 實跑沒有改善，再回頭拆出 B1／B4 individually 測，不預先增加試驗數。

---

# Part H｜真正的實跑判定

## 12. B0→B6 必測指標

T1 真實試跑前先固定以下比較，不得看結果後改指標：

1. **首次可執行時間／步驟**：從 Source+Goal 到第一個真正可執行 Step。
2. **前置語義處理量**：第一次執行前建立了多少 Module／Edge；其中多少本 Run 最終被引用。
3. **Run 路由數**：不含普通 Step，只算系統切換／Gate。
4. **卡點往返長度**：從 blocker 被記錄到原 Step retry 的事件／系統跳轉數。
5. **持久資料族數**：為完成本 Run 新增幾種 persistent artifact/state。
6. **重複記錄量**：同一 blocker／處理／結果是否要在人為不同日誌重寫。
7. **可追溯查詢**：能否用單一 Run ID 回答 Goal→Path→refs→Blocker→Repair→Output。
8. **reuse**：第二個相似 Project 是否直接命中前一 Run 使用過的 Module／方法，而不重做相同處理。
9. **錯誤路徑可見性**：Project Path 錯時，在哪個 Step／verification 被發現，是否會靜默污染 L2。
10. **人工裁量點**：除了任務本身的必要判斷，系統額外要求使用者決定幾次「用哪份真值／是否同步／是否升格」。

## 13. B6 才有資格稱為改善的最低條件

B6 不需要所有數字都勝出，但至少必須同時滿足：

1. 不增加 E1／E2／E6／E11 硬衝突。
2. `首次可執行` 或 `前置語義處理量` 至少一項明確下降。
3. `可追溯查詢` 不弱於 B0。
4. `卡點往返` 不比 B0 多出新的持久系統切換。
5. 第二個相似 Project 仍能 reuse Module；不能用「不模塊化」換取第一次比較好看。
6. 不要求 breaking-change ModuleCore／Semantic Edge。

只有達到這些，才能說：

> **B6 在這個測試範圍內改善了 B0 的某些指標。**

若只有紙上步驟比較少，仍只能叫「B6 可試作候選」。

---

## 14. 當前結論

現在可以比 D50 多下四個結論：

1. **B5 在現行 canonical 下屬 false unification，不應直接實作。** Module 是唯讀 evidence；Semantic Edge 不是 execution order。
2. **B4 不需要正式 mapping service 才能連 L2。** Project Step 直接持有 source/module/tool refs 即可。
3. **Learn 最小路徑不一定需要成為另一份持久真值。** 對 Project-first 場景，可先以 parent Step 下的 Repair Episode 表達；導航畫面可由 episode 動態投影。
4. **目前最值得與 B0 正面比較的是 B6，而不是繼續增加 B7。** B6 的資格只有「可試作」，下一步應取得實際 trace。

一句話：

> **這輪優化不是把 Module、Project、Learn 合成一個東西，而是保留它們真正不同的語義，只刪除沒有必要的第二份路線真值、mapping 真值與重複日誌真值。**
