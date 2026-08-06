# REBUILD1 — 全草案框架重建（忽略細節）

短代號: RBF1  
分支: `REBUILD1`  
日期: 2026-08-07（L／SK／產物分表；框定稿推送）  
目的: 框架流程與工作流優化；細節、裁決、試作證據暫不搬。

本檔不升格、不改 canonical、不改 INDEX。此處為 **REBUILD1 現行框架投影**。  
舊 `D*` 草案多屬舊框架思維，**禁止硬套**本框當仍生效；盤點見 [遷移矩陣](REBUILD1-migration-matrix.md)。舊稿封存／活線改寫另輪。

---

## 0. 核心結論

**保留模塊化，但把它降為 AI／L2 後台資源；真正學的是流程、卡點與判斷，不再把每個模塊都當成必須重度學習與複習的單位。**

---

## 1. 目標主幹

```
文本
→ AI 拆解、模塊化、重組          （L2 備料；SK-02／03）
→ 產生大／中／小流程與策略卡點  （L1）
→ 先跑最小可行流程
→ 遇到卡點才調用相關模塊        （L3-01；缺庫才補跑 SK-02／03）
→ 組成局部最小學習路徑          （L3-02 → L1-04；可選 SK-06）
→ 通過後立即返回原流程          （L1-05）
```

流程圖：
- 新主幹＋草案：[REBUILD1-flow-new.html](REBUILD1-flow-new.html)
- 舊主幹＋草案：[REBUILD1-flow-old.html](REBUILD1-flow-old.html)
- 簡圖：[REBUILD1-flow.html](REBUILD1-flow.html)
- **遷移矩陣**：[REBUILD1-migration-matrix.md](REBUILD1-migration-matrix.md)

### 1.1 層級 LOOP 與降層

- 中級卡住：先**同層**局部 LOOP（卡點 → L3 → 局部路徑 → 返回）。
- 降回最小可行：僅**前置不足**且**局部修補無效**。

### 1.2 名詞與重度學習

- 專業名詞：延後到需要精確判斷時。
- 重度＋間隔複習：僅高頻／核心／反覆錯（L1-06／D36）。

### 1.3 L 層一覽

| 層 | 職責 |
|---|---|
| L0 | 收錄（收入／標籤／分發／封存） |
| L1 | 流程學習（層級／卡點／最小可行／局部／返回／複習收窄） |
| L2 | 結構資源（模塊／邊／含金量／重組） |
| L3 | 資源按需（L3-01 調用、L3-02 材料）；**無畫圖** |

主鍵 `L{n}-{nn}`；前後端只是別名（見矩陣 §6）。

### 1.4 Skill 橫切（執行／投影）

Skill＝既有 `SKILL.md`（AGENTS 表）；SK-* 是框架投影代號。

| SK | 類型 | 路徑 | 掛 |
|---|---|---|---|
| SK-01 | 執行 | `.agents/skills/ingest-text/SKILL.md` | L0 |
| SK-02 | 執行 | `.agents/skills/modularize-text/SKILL.md` | L2-01（切點） |
| SK-03 | 執行 | `.agents/skills/extract-structure/SKILL.md` | L2-02（連線） |
| SK-04 | 投影 | `.agents/skills/render-knowledge-views/SKILL.md` | T2；不回寫 L2 |
| SK-05 | 投影 | `~/.claude/skills/journey-playback/SKILL.md` | T3；試跑逐步重播頁 |
| SK-06 | 執行 | `.agents/skills/generate-practice/SKILL.md` | L1-04；≠ L3-02 |
| SK-07 | 執行 | `.agents/skills/run-speaking-session/SKILL.md` | L1-04 旁路 |

### 1.5 產物（≠ Skill）

C1-(T3) hub、C2 總圖、INI-005 React 等＝**產物託管**；SK-04／05 產出可入 hub，hub 不是 Skill。

### 1.6 R／V 橫切（不編 SK）

- `manage-skill-registry` → R1（平面登記簿；**≠ D29 技能樹**）
- `validate-learning-pipeline` → V1

### 1.7 L3 vs SK（判斷四則）

1. L＝協議位置；SKILL.md＝怎麼做。  
2. L3 多數只**查庫組包**；缺結構才 SK-02／03。  
3. L3-02＝材料；SK-06＝出題。  
4. SK-04／05 永不寫回 L2。

詳見矩陣 §0.6。

---

## 2. 相對舊骨架

| 舊 | 新 |
|---|---|
| 前端 ∥ 後端 A／B → F模塊必學 | L1 流程＋L3 按需；L2／SK-02·03 備料 |
| 畫圖當後端消費 | SK-04 投影＋C* 產物 |
| 含金量佔主幹半邊 | L2-03 後台細節 |

---

## 3. 全草案 → 框架槽（摘要）

完整表見矩陣 §2。要點：

- 視圖類 D2／D4／D10／D41 → **SK-04＋產物**（不掛 L3）
- D3／INI-005 → **產物**（非 Skill）
- D9 → L1-04＋SK-07；D17 → L1-04＋SK-06
- D29、九宮系 → **不遷**
- D37／D38／D30 → **L1**；D46／D47 → **L2**

---

## 4. 主幹對應

| 主幹節點 | L／SK | 草案框 |
|---|---|---|
| 文本 | L0、SK-01 | D6、D7、D31、D32、D8、D1 |
| AI 拆解·模塊·重組 | L2、SK-02／03 | D5、D39、D46、D47、D16（結構半） |
| 大中小流程＋卡點 | L1-01／02 | D37、D38、D23、D30、D35 |
| 最小可行 | L1-03 | D30、D38 |
| 卡點→調模塊 | L3-01 | D23、D38 |
| 局部路徑 | L3-02、L1-04、可選 SK-06 | D17、D38 |
| 返回 | L1-05 | D30、D38 |
| 複習收窄 | L1-06 | D36 |
| 視圖／試跑頁 | SK-04／05＋產物 | D2、D10、D38 試跑 |
| 演講 | SK-07 | D9 |

---

## 5. 未掛主幹

見 [REBUILD1-unused-frames.md](REBUILD1-unused-frames.md)。

---

## 6. 工作流優化（框層）

1. 學的單位＝流程與卡點。  
2. 模塊預設 L2 後台；未卡不強制調用、不進重度複習。  
3. 先最小可行；過卡點回原流程。  
4. 同層 LOOP 優先於降層。  
5. 名詞延後、複習收窄。  
6. 畫圖＝Skill 投影，≠ L3。

---

## 7. 本分支不做

- 不改草案正文細節、不批 ADJ、不啟用作業模塊、不呼叫 archify。  
- REBUILD2 凍結只讀（見矩陣 §10）。
