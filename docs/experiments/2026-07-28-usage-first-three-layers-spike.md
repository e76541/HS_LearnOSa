# 使用優先學習迴路實跑｜Agent 三層架構（Harness／Loop／Graph）

## 試作定位

- 日期：2026-07-28
- 相關作業模塊：**F**（站位 F1 收錄／F2 模塊＋邊作**後台**；前台走使用迴路）
- 相關草案：[使用優先學習迴路](../specs/2026-07-27-usage-first-learning-loop.md)（草稿未裁；依 §7 以試作名義跑；含 §2.0 層預覽）
- 輸入：〈practical guide to the three architecture layers people keep mixing together〉（貼文原文；作者／日期未標；已去圖片佔位與社群 CTA）
- 範圍：
  - **前台**：層預覽 → ⓪ 契約（預設深度 2）→ §2 六步①～⑥＋使用卡（含 `角色：主`）
  - **後台**：入口三問、候選分流、模塊切分、兩遍抽邊（不阻塞前台）
- 限制：不建正式來源／文本／模塊／邊 ID；不轉 `DOC/`；不改 canonical／登記表／圖例；文中產品宣稱未外部查核；使用卡不計熟練度點（§7 待裁 b 未裁）。
- Inbox：[`Inbox/agent-architecture-three-layers/`](../../Inbox/agent-architecture-three-layers/)
- 對照正文：[source.txt](assets/2026-07-28-agent-three-layers/source.txt)
- 層預覽：[layer-preview.md](assets/2026-07-28-agent-three-layers/layer-preview.md)
- 使用卡：[usage-card.md](assets/2026-07-28-agent-three-layers/usage-card.md)
- 後台模塊／邊：[modules.md](assets/2026-07-28-agent-three-layers/modules.md)／[edges.md](assets/2026-07-28-agent-three-layers/edges.md)

正文共 15,660 個 Unicode 字元；SHA-256 為 `78a591e6f99bbff92d11182b72779105cb366d5b99eb50ae70560247cabffc9a`。

---

## 前台｜使用迴路走例

### 層預覽

見 [layer-preview.md](assets/2026-07-28-agent-three-layers/layer-preview.md)。三層皆列；未跳過。

### ⓪ 開場契約

- **目的**：用三層架構診斷並整理本專案 Agent 工程邊界。
- **深度契約：2**（無使用者當場指定 → 草案預設）。
- 允許中途升層；本篇未升。

### ① 擷取規則（≤3；契約層 2）

1. 失敗先分層：Harness／Loop／Graph。
2. 環境→回饋→流程；驗證對證據、不對自信。
3. 有分支／並行／審批／多專家才上 Graph；否則先 Harness＋Loop。

### ② 選情境

**HS_LearnEdge 現行治理／使用迴路／流程圖對帳：哪一層該補強、哪一層不該過早形式化。**

- **第②步觀察（驗證 §6.4）**：**未卡**。情境可直接點名，未喚醒 F3a／F3b。

### ③ 定計畫（≤5 行）

1. 把專案既有機制對進三格。
2. 用症狀表挑一個當前最相關症狀。
3. 只落一條可執行決策進使用卡。

### ④ 套用（實際對帳）

| 層 | 文中定義 | 本專案對應 | 判定 |
|---|---|---|---|
| Harness | 模型外的環境／工具／狀態／權限／觀測 | `AGENTS.md`、`agent-ops`、Skills、記憶、交接快照、Inbox／DOC、必做檢查介面 | **已具備**且持續承載跨 session 進度 |
| Loop | 觸發／目標／證據／回饋／停止 | 使用優先學習迴路六步；看板必做檢查作證據終態；有界試作（不轉 DOC） | **主戰場**；第 2 篇實跑中 |
| Graph | 顯式節點邊、分支合流、人審 | `flow-map`、站位 F1～F4／T／R／V、archify workflow；一主一副角色 | **部分形式化**；使用迴路本身仍草案未升圖 |

**當前主症狀（對表）**：`The workflow changes too often for a fixed diagram` → **Simpler harness／延後 graph formalization**。

**決策（一次）**：繼續以使用迴路＋必做檢查當主 Loop；**不**把未裁的使用迴路提前凍成固定 Graph；Harness 沿用交接／看板進度產物；等數篇實跑痕跡穩定後再形式化路徑。

### ⑤ 檢查

**符合。** 與交接「實跑數篇再決定待裁／升格」、反「未觀察先畫圖」貴錯一致；未開新站位、未改 canonical。

### ⑥ 局部修正

**無。**（未命中 §4 下鑽白名單；深度池未展開。）

### 使用卡五欄

見 [usage-card.md](assets/2026-07-28-agent-three-layers/usage-card.md)；`角色：主`；`深度契約：2`；本回合無副圈。

### 按需工具

未開 F3a／F3b／F3c／F4／T2／T3。

---

## 後台｜F1／F2（不阻塞前台）

### 入口三問

1. **有原文主張**：有。三層非同義，並給診斷表與檢查清單。
2. **主張可獨立成立**：可。定義、解剖、症狀→修法自成單元。
3. **是否只供當下斷邊題**：否。

**入口結論：正常來源候選。**

### 候選分流／模塊／邊

- discard 7 段（標題、三小節標題、貴錯標題、SEARCH TERMS、書目）→ 見 modules 表。
- **16** 候選模塊（ATL-C00～C15）；**0** 背景模塊。
- 第一遍 15 邊＋第二遍 8 長程邊 → 見 edges 表。
- 內部邊 > 0 → **非**零散來源。

### 與既有 DOC／Inbox 關係

- 既有 `DOC/Review/loop-and-harness-engineering`、`graph-engineering-with-claude`、Inbox `ai-coding-harness-genes` 各切一角；本篇是**三層合論＋症狀診斷表**，命題簇不同，試作獨立夾，不合併既有 Review。
- 本次**不轉 DOC**。

### 收錄風險（若日後轉 DOC）

1. 作者／日期未標；框架產品細節 `secondary`/`unverified` → 建議 `DOC/Review/`，`review_reason=unattributed-source-unverified-product-claims`。
2. 與既有 loop／harness／graph 來源可能重疊命題 → 升格前做邊對齊／去重覆核。
3. 記憶禁項：社群 CTA 已剔除，不回寫。

---

## §6.4 驗證筆記（本篇）

| 觀察項 | 結果 |
|---|---|
| 第②步是否卡住 | **否** |
| 是否因此需要導航 | **否** |
| 裁1～裁4 是否被喚醒 | **否** |
| 一主一副 | 僅主圈；無副圈 |
| 層預覽／深度契約 | 有預覽；契約 2（預設） |

累計實跑：使用迴路**第 2 篇**真實文本；第②步仍未卡。

---

## 結論（供草案）

- §2.0 層預覽→契約→六步＋使用卡可跑通；後台 16 模塊／23 邊並行不阻塞。
- 第②步連續兩篇未卡 → 暫不支持把導航升為每篇必做。
- 套用決策與文中「流程常變→延後圖式」一致，可作為使用迴路「先痕跡後形式化」的外部佐證。
- 產物止於試作目錄與 Inbox；正式 ID／DOC／canonical **未動**。

---

## 後續｜一層一層深讀（同篇下鑽）

- 觸發：使用者「接下來一層一層來」（2026-07-28）。
- 順序：**Harness → Loop → Graph**（架構三層，非深度契約 1／2／3）。
- 規則：一次只開一層；深度契約維持 2；屬 §4 下鑽白名單「無法判斷是否適用／需對帳」之局部展開，不重跑全圈。
- **已開 Harness**：[layer-walkthrough-harness.md](assets/2026-07-28-agent-three-layers/layer-walkthrough-harness.md)
  - 決策：Harness 已夠；不擴工具堆；不穩／停不對留給 Loop。
- **F3c（Harness）**：使用者喚醒 → [extra-questions.md](assets/2026-07-28-agent-three-layers/extra-questions.md)（6 題 Explain／Diagnose／Apply／Evaluate／單邊；皆 `practice-ready`）。
- Loop／Graph：待使用者喊下一層（含對應出題）。
