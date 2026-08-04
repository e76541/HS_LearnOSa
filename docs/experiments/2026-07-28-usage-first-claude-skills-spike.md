# 使用優先學習迴路實跑｜Claude Skills 策展文

## 試作定位

- 日期：2026-07-28
- 相關作業模塊：**F**（站位 F1 收錄／F2 模塊＋邊作**後台**；前台走使用迴路）
- 相關草案：[使用優先學習迴路](../specs/2026-07-27-usage-first-learning-loop.md)（草稿未裁；依 §7 以試作名義跑；含 §2.0 層預覽）
- 輸入：社群策展文〈WHY ANOTHER LIST／ToxicSkills／13 skills／四件套／兩規則〉（平台 Premium CTA 與 follow 呼籲已剝除）
- 範圍：
  - **前台**：層預覽 → ⓪（預設深度 2）→ ①～⑥＋使用紀錄（`角色：主`）
  - **後台**：入口三問、候選分流、模塊切分、兩遍抽邊
- 限制：不建正式來源／文本／模塊／邊 ID；不轉 `DOC/`；不改 canonical／登記表／圖例；Snyk 比例與各 repo／安裝指令未外部查核；使用紀錄不計熟練度點（§7 待裁 b 未裁）。
- Inbox：[`Inbox/claude-skills-curated-13/`](../../Inbox/claude-skills-curated-13/)
- 對照正文：[source.txt](assets/2026-07-28-claude-skills-curated/source.txt)
- 層預覽／深度池／使用紀錄：[layer-preview.md](assets/2026-07-28-claude-skills-curated/layer-preview.md)／[depth-pool.md](assets/2026-07-28-claude-skills-curated/depth-pool.md)／[usage-record.md](assets/2026-07-28-claude-skills-curated/usage-record.md)
- 後台模塊／邊：[modules.md](assets/2026-07-28-claude-skills-curated/modules.md)／[edges.md](assets/2026-07-28-claude-skills-curated/edges.md)

正文共 6,358 個 Unicode 字元；SHA-256 為 `48ac724f860ba24b7843911651023bae05cd02318bcd709bc5532882c08904cd`。

---

## 前台｜使用迴路走例

### 層預覽 → ⓪

- 已列三層預覽（見 layer-preview.md）。
- 未指定深度 → **契約 2**（運用＋公式；深度進池）。
- 目的：本專案外來 Claude skill 採納邊界。

### ① 擷取規則（≤3）

1. 爆紅清單≠安裝單（常錯鏈）。
2. 裝前讀 `SKILL.md`＝安全模型；社群必讀。
3. 少裝：四件套骨架＋痛點再加；過量搶上下文。

### ② 選情境

**HS_LearnEdge：外來 skill 要不要進正式工作樹、上限與安全閘。**

- **第②步觀察（驗證 §6.4）**：**未卡**。未喚醒 F3a／F3b。

### ③ 定計畫（≤5 行）

1. 四件套對照本專案既有能力。
2. 用兩規則做一次裝／不裝決策。
3. 只落一條邊界進使用紀錄（不安裝、不改 canonical）。

### ④ 套用（實際對照）

| 四件套 | 文中角色 | 本專案對應 | 判定 |
|---|---|---|---|
| Frontend Design | 品味／反生成感 | 使用者規則前端約束（禁紫漸層／Inter 等） | **已覆蓋**，不安裝外來 |
| Context7 | 現行文件進上下文 | 無對等 skill；偶發 API 幻覺 | **缺口候選**，本次不安裝，等痛點提案 |
| Superpowers | 流程／TDD／子代理 | agent-ops、看板、交接、一主一副、待裁門禁 | **流程已覆蓋**；不安裝整包 |
| Skill Creator | 自建 SKILL.md | `.agents/skills/*` 與領域 Skill 對照表 | **自建路徑已有**，不安裝 |

**決策（一次）**：**不批量安裝**文中 13 套；維持專案自有 skill 集；外來 skill 若再提案，必先讀該份 `SKILL.md`。

### ⑤ 檢查

**符合。** 與記憶禁項（不夾廣告）、agent-ops（不擅自擴作業模塊）、既有 skill 邊界一致。

### ⑥ 局部修正

**無。**（未命中 §4 下鑽白名單；深度數字留在 depth-pool。）

### 使用紀錄五欄

見 [usage-record.md](assets/2026-07-28-claude-skills-curated/usage-record.md)；`角色：主`；本回合無副圈。

### 按需工具

未開 F3a／F3b／F3c／F4／T2／T3。

---

## 後台｜F1／F2（不阻塞前台）

### 入口三問

1. **有原文主張**：有。清單不可靠、ToxicSkills 風險、少裝＋讀 SKILL.md、四件套骨架。
2. **主張可獨立成立**：可。安全模型與選型建議自成單元。
3. **是否只供當下斷邊題**：否。

**入口結論：正常來源候選。**

### 候選分流／模塊／邊

- discard 8 段（純標題／區塊標籤）→ 見 modules 表。
- **24** 候選模塊（CSC-C00～C23）＋ **1** 背景（CSC-B00）。
- 第一遍 20 邊＋第二遍 8 長程邊 → 見 edges 表。
- 內部邊 > 0 → **非**零散來源。

### 收錄風險（若日後轉 DOC）

1. Snyk 比例、各 GitHub 路徑、安裝指令均未核對 → 建議 `DOC/Review/`，`review_reason=unverified-security-stats-and-skill-urls`。
2. 策展建議屬 `advice`；歸因主張（ToxicSkills）屬 `attributed_claim`／`unverified`。
3. 本次**不轉 DOC**。

---

## §6.4 驗證筆記（本篇）

| 觀察項 | 結果 |
|---|---|
| 第②步是否卡住 | **否** |
| 是否因此需要導航 | **否** |
| 裁1～裁4 是否被喚醒 | **否** |
| 一主一副 | 僅主圈；無副圈 |
| 層預覽流程 | 已跑；預設深度 2 可開工 |

累計實跑：使用迴路**第 2 篇**真實文本；第②步連續未卡。

---

## 結論（供草案）

- 含 §2.0 層預覽的使用迴路在本篇可跑通；後台可並行。
- 第②步仍未卡 → 暫不支持把導航升為每篇必做（與第 1 篇同向）。
- 產物止於試作目錄與 Inbox；正式 ID／DOC／canonical **未動**。
- 實務決策：外來 skill **不安裝**；Context7 類文件時效列為未來痛點候選。
