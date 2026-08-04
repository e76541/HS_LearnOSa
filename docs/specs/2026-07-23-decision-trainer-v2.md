# 決策訓練器 v2｜文本分流與卡牌整合

日期：2026-07-23
更新：2026-07-23（掛 **F／F3a 策略 V2**；F3 已拆四平行小塊；DOC＝F1 文檔出口；M5 已處理完成）
狀態：已封存
裁決來源：無
實作參照：無（D／E 測試結果僅作敘述證據，未入正式碼）
後繼：無（B-7 封存；現行見 [f3a-navigation-current](2026-08-05-f3a-navigation-current.md)）

> **⚠ 2026-07-27 裁決（B-7 封存）：決策牌層退出導航後，訓練四卡（TextCard／NodeCard／MechanismCard／BlindSpotCard）與四判定**整批封存**，等後續有位置再議；理論候補位＝專案型「無標準答案」（B-6-B）的過關判定，但須另外設計，不得原樣接回。縫 B 共用作答形制同批失效。裁決見 [快照 2026-07-27-01](../../.agents/handover/2026-07-27-01.md)。

> **性質：F3a 策略 V2（決策訓練器）規格。** 導航用 `DecisionCard` 與訓練四卡同屬 **F3a**；與 F3b 九宮／F3c 題目／F3d 演講平行可互調。本稿不修改 canonical ModuleCore、不實作。

關聯：[導航 OSA 決策牌組](2026-07-21-navigation-osa-decision-deck.md)、[管線整合](2026-07-22-pipeline-deck-nine-grid-integration.md)、[趙構 P1](../plans/2026-07-22-zhaogou-decision-deck-p1.md)、[問／邊界整合](2026-07-23-question-boundary-integration.md)。

---

## 0. 與卡牌系統的關係

| 既有物件（導航 OSA） | 本稿角色 |
|---|---|
| `GoalSession`／`Deck`／`DecisionCard` | **導航模式**：真實目的、活棋、重導航 |
| `DecisionRecord`／`DecisionReview` | 對應訓練節點的「凍結作答」骨架；Review 僅管預期 vs 實際落差，歸因走升級口（§3.1；2026-07-23 縫 A） |
| `Guide`／`OptionProfile` | 可被訓練節點引用；不因訓練回寫為證據真值 |
| 模塊／邊 | 仍是證據層；機制卡可跨案例引用，但不得冒充模塊本體 |

**模式分流**

```text
導航模式（既有）  GoalSession → DecisionCard → 選擇改路
訓練模式（本稿）  TextCard(A–E) → NodeCard* → 對照判定 → MechanismCard／BlindSpotCard
```

兩者共用「選擇＋可檢驗機制假設」與「不因結局追認決策品質」；訓練模式多出文本類型分流與機制庫資產化。

---

## 1. 核心三要素（判定引擎基準）

任何輸入文本先掃描三要素：

| 要素 | 定義 |
|---|---|
| **決策點** | 當事人有真實選擇權，且選項間有槓桿差異 |
| **資訊遮蔽** | A 時刻「已知／不可知」能被乾淨切割 |
| **可驗證 B** | 已實現或未來可回填的後續路徑 |

三要素勾稽寫入 `TextCard.triad`（見 §5），不得為填滿模板而補造。`triad` 是分流的**唯一手填真值**；類型字母由它推導（見 §2）。

---

## 2. 五類分流（依三要素缺失組合）

| 類型 | 決策點 | 資訊遮蔽 | B | 處理模式 |
|---|---|---|---|---|
| **A 歷史敘事** | ✓ | ✓ | ✓ | 原協議全跑（階段 0–4） |
| **B 規範建議文** | ✗（改抽主張） | ✗ | ✗（作者預測） | 主張拆解：接受／拒絕＋機制假設；B 換成外部證據對照 |
| **C 進行中案例** | ✓ | ✓ | 未發生 | 決策紀錄凍結＋延遲回填 B |
| **D 狀態報告** | ✗ | ✗ | 未來可得 | **改裝**：以報告截止日為 A 時刻，人工建構前瞻節點 → `handling` 轉 `freeze_pending_b`（`type` 不變） |
| **E 機制綜述** | ✗ | ✗ | ✗（條件式結論） | **不當輸入**；抽取為機制庫（ID、可檢驗訊號、失效條件），供對照層跨案例調用 |

不符合 A–E 任一類 → 走 §6 開放擴充，**不強行套入**。

**類型＝推導投影（2026-07-23 優化裁決）**：

- 上表即**推導表**：`type` 由 `triad` 機械推導，是快取／溝通簡稱，**不是第二份真值**；真值只有 `triad`，兩欄衝突在結構上不可能成立。
- `triad` 任一要素為 `unclear` → 不產生字母，`type: unclassified` 走 §6，不得硬套。
- **性質與處理分離**：`type`（文本性質，推導、不變）與 `handling`（處理配方，可裁、可改裝）各管各的。D 改裝＝`handling` 由 `foresight_from_report` 轉 `freeze_pending_b`，`type` 不變，不再說「轉入 C」——同構於「史實永不動、推導值跟版本走」（整理稿 §5.1）。
- 五字母保留為**溝通簡稱**（「A 類」「E 直入機制庫」照常說）；降級的是儲存地位，不是廢除。

---

## 3. 不變的協議核心（所有類型共用）

1. 作答強制兩項：
   - **選擇**（或 B 類的接受／拒絕主張）
   - **機制假設**：「如果 X，因為 M，導致 Y」；**M 必須可檢驗**
2. 對照層驗證**機制**，不驗證「選擇對不對」；四判定：
   - 成立
   - 被否證
   - 歸因錯位
   - 無據猜中
3. 不因結局追認決策品質；風險以 **A 時刻資訊集**評估（對齊導航 OSA §3.7 霧戰／資訊集）。
4. 輔助驗證：同代對照組＋參考類別；**機制庫是參考類別的正式化**。

### 3.1 與既有 DecisionRecord／Review 對映

```yaml
# 訓練節點凍結作答 ≈ DecisionRecord 擴充
TrainerAnswer:
  choice                 # 對應 DecisionRecord.choice
  mechanism_hypothesis:  # 新增；必填
    if_x
    because_m            # 可檢驗
    then_y
  a_info_set             # A 時刻已知／不可知切割
  frozen_at

# 對照層（歸因真值所在；DecisionReview 不做歸因，經升級口指向此——縫 A）
TrainerContrast:
  b_path_or_placeholder  # 已實現 B，或 C／D 的回填佔位
  mechanism_verdict: established | falsified | misattribution | lucky_guess
  evidence_refs
  blind_spot_one_liner   # → BlindSpotCard
  analog_mechanism_refs  # 可指 MechanismCard（含「合法遷移 vs 表面相似」）
```

**升級口（2026-07-23 縫 A 裁決）**：導航 `DecisionRecord` 需要歸因檢視時，不在 `DecisionReview` 寫歸因（該卡已刪 `what_worked`／`what_failed`，只留「預期 vs 實際落差」，見 OSA §3.6），而是**升級**為 `NodeCard`：補 `mechanism_hypothesis`＋`a_info_set`，歸因交給對照層四判定。升級採**互指引用、不複製欄位**——`DecisionReview.node_card_ref` 指向升級後的 `NodeCard`；`NodeCard` 端經 `decision_card_ref` 回指同一決策的導航牌（§5.2），單一真值。

---

## 4. 已驗證的測試結果（敘述證據，非正式實作）

### 4.1 D 改裝（Trout 報告）

- 產出 3 個前瞻節點：守位配置／配球押注／交易定價
- 各測不同盲區：風險–價值權衡／小樣本紀律／回歸 vs 基率
- 優點：B 未發生＝零後見之明污染

### 4.2 E 機制庫（黃金綜述）

- 抽出 G1–G6 六條機制
- 在異領域歷史節點（1997 泰銖）成功調用 G6 做類比遷移
- 對照層可額外檢驗：「類比是合法遷移還是表面相似」

以上僅支持本稿作為草案依據；不自動升格、不寫入 canonical。

---

## 5. 卡牌系統整合（四種卡）

### 5.1 文本卡 `TextCard`

intake 時打類型標籤（A–E）＋三要素勾稽。

```yaml
TextCard:
  text_card_id
  source_ref                 # Inbox／DOC／試作來源；可追溯
  type: A | B | C | D | E | unclassified   # 推導投影：由 triad 機械推導，非手填真值（§2）
  triad:                     # 唯一手填真值；含 unclear → type: unclassified
    decision_point: present | absent | unclear
    info_fog: clean_cut | absent | unclear
    verifiable_b: present | future | author_prediction | conditional | absent | unclear
  triage_notes               # 缺什麼、有什麼（§6 必填）
  handling                   # 處理配方；詞表同 NodeCard.mode；可改裝（type 不變，§2）
  derived_node_ids           # 產出的 NodeCard
  derived_mechanism_ids      # E 類為主
```

管線掛點（TextCard 掛點 2026-07-23 已裁；示意圖已封存 `docs/archive/html-2026-07-23/specs/assets/2026-07-23-decision-trainer-ftrv-flow.html`；結構真相見 `ops-id-legend`）：

- **TextCard 掛點（2026-07-23 裁決，原整理稿待裁 3）**：掛 **F1 文檔出口之後、F2 拆選之前**的文本層；與候選分流（v0.3 r6）**同站、真值分居**（TextCard＝訓練層物件，候選分流＝canonical 欄位，不合併成一張表）；**非必經閘**——不進訓練／決策入口的文本不需打卡即可入 F2；TextCard 類型可作 soft route `suggested_f3_entries[]` 建議訊號之一（多值、非硬綁）。
- **DOC 分流**：屬 **F1 文檔出口**（語意處理完成後 `Inbox`→`Stocks|Archive|Review`）；**不是**模塊收納。
- **TextCard／DecisionCard／訓練四卡**：屬 **F3a 策略 V2**（作業模塊 **F**）；M5 已處理完成、不登記。
- **F3b／F3c／F3d**：九宮／題目／演講——與 F3a **平行可互調**，見 [ops-id-legend](../management/ops-id-legend.md)。

```text
Inbox 入口三問                         F1
├─ 淘汰 → 棄置
├─ 完成後轉桶 → DOC Stocks|Archive|Review   F1 文檔出口（≠ 模塊）
└─ 收
     ├─ T1 → F2 → R1 ─┬─ F3a 策略 V2（最小一步＋本訓練器）
     │                ├─ F3b 九宮
     │         T2／T3 ├─ F3c 題目
     │                └─ F3d 演講
     └─ A–E TextCard ──→ F3a
```

### 5.2 節點卡 `NodeCard`

一節點一卡：A 資訊集／凍結作答／B（或回填佔位）／對照層判定。

```yaml
NodeCard:
  node_card_id
  text_card_id
  mode: full_protocol | claim_decompose | freeze_pending_b | foresight_from_report   # 詞表同 TextCard.handling（§2 性質／處理分離）
  a_moment                   # 含 D 改裝的「報告截止日」
  a_cutpoint                 # A 時刻在來源文本上的 char_span 切點（模塊化來源必填）
  a_info_set:
    known                    # 模塊化來源：切點之前的 module_id 集合；未模塊化來源：文字列舉
    unknowable_at_a
    extra_module_ids         # 選配：切點外另行納入的模塊（跨源補充），逐一附理由
  answer: TrainerAnswer      # 凍結前可編；凍結後不可改選擇／機制（只許回填 B）
  b:
    status: realized | pending | external_evidence | n_a
    path_or_placeholder      # 模塊化來源：切點之後的 module_id 集合；否則文字／佔位
  contrast: TrainerContrast  # B 可得後才填完整判定
  decision_card_ref          # 選配：若同節點亦服務導航牌，互指；不得合併成一張真值卡
```

與 `DecisionCard` 邊界：

- **DecisionCard**：導航介面（要決定什麼、選項、影響、next_cards）。
- **NodeCard**：訓練／對照容器（A／作答／B／機制判定）。
- 同一歷史決策可同時有兩者；證據回指各自獨立，不互相覆寫。

### 5.3 機制卡 `MechanismCard`

來源：E 類抽取＋對照層中被驗證過的機制；可跨卡引用。

```yaml
MechanismCard:
  mechanism_id
  statement                  # 可檢驗的 M
  testable_signals
  failure_conditions         # 必填：失效條件
  origin: e_extract | contrast_verified
  source_refs                # 模塊化來源：module_id + char_span；機制卡是模塊投影，不自存文本真值
  cross_domain_notes         # 合法遷移條件 vs 禁止表面相似；跨域類比只住此欄，不建模塊邊
  verdict_history            # 各 NodeCard 上的判定摘要（可空）
```

機制卡與模塊層的關係：E 類綜述若 `retention=retain` 照常切模塊（機制＝可檢驗主張，多為 Analysis／Method 型）；機制卡的 `statement`／`testable_signals`／`failure_conditions` 回指該模塊，與 Method 型的條件、失效模式欄位對齊。機制卡因此是**模塊的投影**——引用而不冒充本體（呼應 §8）。

### 5.4 盲區卡 `BlindSpotCard`

每節點對照層結尾的一句話盲區，串成個人推理弱點序列。

```yaml
BlindSpotCard:
  blind_spot_id
  one_liner
  node_card_ids              # 同 pattern 各節點；再現時追加，不另開新卡（§5.6 剎車①）
  pattern_tag                # 選配：小樣本／基率忽略／歸因錯位…
  session_seq                # 個人序列序號
```

**併序列（2026-07-23 縫 A 裁決）**：同 `pattern_tag` 的盲區再次出現時，在既有卡追加 `node_card_ids` 與序號（`one_liner` 可更新為最新表述），**不另開新卡**；無 `pattern_tag` 者先比對語義相近的既有卡，確無歸屬才新開。

### 5.5 模塊+邊掛法（分流吃文本、對照吃模塊）

訓練器與既有證據層的分工：

```text
文本層   TextCard（A–E 分流）           ← 留在文本，模塊化之前；分流先於「值不值得切模塊」
模塊層   模塊+邊（既有，不改）           ← A 資訊集、B 路徑、機制陳述的錨
訓練層   NodeCard.a_info_set → module_id 集合 + char_span 切點
         MechanismCard → 模塊投影（引用，不冒充本體）
         跨域類比 → 只住機制卡欄位，不建模塊邊
```

規則：

1. **分流不建在模塊上。** 三要素勾稽是整篇文本層級的判定；E 類、`unclassified` 可能不進模塊層。先分流，再決定是否切模塊，順序不得顛倒。此順序只約束**要進訓練／決策入口**的文本；分流非全域必經閘（2026-07-23 掛點裁決，見 §5.1）。
2. **A 資訊集以 char_span 切點機械化。** 資訊遮蔽的本質是「A 時刻前／後」的切割；模塊帶 `char_span`，故 `known`＝切點前模塊集合、B＝切點後模塊。此即導航 OSA §3.7 霧戰／資訊集的模塊化落地：牌面可見範圍由切點機械判定，不靠人工列舉。
3. **順序靠 char_span，不靠邊。** 領域規範不建文本順序邊；「A→B 時間線」不得用邊表達。
4. **跨域類比不建模塊邊。** canonical 邊類型（`depends_on` 等八種）無「analogous_to」，且邊須有單篇文本證據、寧缺勿錯；G6→1997 泰銖類的跨案例遷移在任一單篇內無證據，建邊違規。類比關係只住 `MechanismCard.cross_domain_notes`＋對照層「合法遷移 vs 表面相似」判定，由訓練層自行驗證，不靠圖。
5. **BlindSpotCard 無模塊對應。** 個人推理弱點序列非文本產物，維持原狀。

### 5.6 卡片膨脹三剎車（2026-07-23 縫 A 裁決）

卡牌系統只許四種卡型（Text／Node／Mechanism／BlindSpot）；防膨脹三條：

1. **盲區併序列**：同 `pattern_tag` 併入既有 `BlindSpotCard`，追加不新開（見 §5.4）。
2. **升級引用不複製**：升級與互指（`DecisionRecord`→`NodeCard`、機制卡→模塊）一律引用對指，單一真值，不複製欄位成第二份（見 §3.1、§5.3）。
3. **新卡型須裁決**：第五種卡型不得自創；候選需求先記討論結論提案，經裁決才建（呼應 §6 開放擴充「不預建候選類」）。

---

## 6. 開放擴充規則

當文本不符合 A–E 任一類時，系統**不強行套入**，改走：

1. 報告三要素勾稽結果（缺什麼、有什麼）→ 寫入 `TextCard` 且 `type: unclassified`
2. 提議新類型或新處理機制，附：判定特徵、處理模式、與現有類型的邊界
3. **等使用者確認後**才收入 §2 分流表

### 6.1 已知候選缺口（預告，不預先建類）

| 候選 | 為何卡在 A–E | 觸發 |
|---|---|---|
| 對話／談判記錄 | 多決策者交錯；A 資訊集需按角色分拆 | §6 |
| 失敗事後檢討文（post-mortem） | B 已內建但被作者歸因污染；需先剝離敘事再重建 A | §6 |
| 純數據集（無敘事） | 連狀態報告的判讀層都沒有；改裝成本更高 | §6 |

這三種出現時觸發 §6，屆時再定型；**禁止**為方便而先登記偽類型。

---

## 7. 對導航 OSA／管線的待裁掛點

1. ~~是否接受雙模式且共用協議核心 §3~~ → **已裁（2026-07-23，原整理稿待裁 4）**：雙模式正式接受；共用作答形制（選擇＋可檢驗理由／條件，全域最低門檻＝OSA §5）；**四判定訓練專屬**，導航歸因走升級口（§3.1）。
2. ~~TextCard／訓練四卡掛 M5~~ → **已處理**：掛 **F／策略 V2**；M5 不登記。
3. ~~MechanismCard 跨 GoalSession 引用~~ → **已裁（2026-07-23 對話裁決）**：允許跨 GoalSession 引用（機制卡本為跨案例資產，§0）；與技能登記簿（T1／R1）**只互鏈、不合併**（對齊「不合成一套題庫」原則）。
4. ~~D／E 進紙上 P1.5 的前置~~ → **已裁（2026-07-23 對話裁決）**：**須另開試作紀錄**（`docs/experiments/INDEX.md`）；D／E 測試敘述不足以直接進紙上 P1.5，啟動時依籌備期試作慣例登記。
5. ~~與母草案同批裁 M5 啟用~~ → **已處理**：不啟用 M5；內容在 **F3a**。
6. 是否確認 DOC＝F1 文檔出口（完成後轉桶），與 F2 模塊產物分層。
7. 是否確認 §5.5 模塊+邊掛法：分流留文本層、A 資訊集用 char_span 切點機械化、機制卡為模塊投影、跨域類比不建模塊邊。
8. F3a～F3d 互調協議細則（呼叫點、場次宣告）是否另開半頁附錄。

未確認前：本稿維持草稿；不改藍圖、路線、canonical、作業模塊登記表。

---

## 8. 刻意不做

- 不把 E 類綜述硬改成決策節點。
- 不因 B 結局改寫 A 時刻風險評估。
- 不把機制庫升格為模塊真值。
- 不為跨域類比或時間順序建模塊邊；不把分流建在模塊層之上。
- 不預建 §6.1 候選為正式類型。
- 不對股價或市場做預測式結論（訓練對照僅驗證機制，不產出預測建議）。
