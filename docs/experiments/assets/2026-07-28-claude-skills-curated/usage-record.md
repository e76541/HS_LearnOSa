---
type: usage-record
id: csc-u1
slot: usage
depth_cap: 2
source: claude-skills-curated-13
related: ["[[csc-lp]]", "[[csc-dp]]"]
module_ref: ""
status: seeded
tags: [usage-loop]
---

# 使用紀錄｜Claude Skills 策展精簡

- 角色：主
- 深度契約：2（層預覽後未指定 → 預設；自主代理不阻塞開跑）
- 草案：`docs/specs/2026-07-27-usage-first-learning-loop.md`（未裁；試作）
- 來源試作夾：`Inbox/claude-skills-curated-13/`
- 日期：2026-07-28

```text
目的：為 HS_LearnEdge 判定外來 Claude skill 的採納邊界（安全閘、數量上限、是否對齊既有 .agents/skills）。
規則：
  - [運用] 被社群「N 大 skill」清單吸引時，先當安全與注意力問題，不要當安裝清單照抄。
  - [公式] 裝前讀該 skill 的 SKILL.md；社群來源預設不信任 unread。
  - [公式] 少裝：先壓到少數核心（品味／文件準確／流程／自建），其餘等具體痛點再加；多 skill 會搶上下文並誤觸發。
情境：本專案已有 F／T／R／V 對應 skills 與 agent-ops；評估文中十三套／四件套要不要進正式工作樹。
計畫：
1. 對照四件套與本專案既有能力落格。
2. 用兩規則做一次「裝／不裝」決策（不批量安裝）。
3. 只落一條可執行邊界進結果欄（不改 canonical、不新開作業模塊）。
結果：符合。不批量安裝文中十三套；正式工作維持專案自有 `.agents/skills/*`。四件套對照：品味已由使用者規則／前端約束覆蓋；流程由 agent-ops＋看板／交接覆蓋；自建 skill 走專案 Skill 目錄而非外掛 Skill Creator。唯一可列「情境缺口候選」＝文件時效（Context7 類），但本次不安裝，等具體 API 幻覺痛點再提案。安全閘採納：外來 skill 必讀 SKILL.md（與記憶／規範一致：不執行未審腳本）。
修正：無。
```

## ① 擷取規則（契約 2；公式 ≤3）

1. **清單≠安裝單**：爆紅重排清單常有錯鏈；用途是篩選與安全意識，不是一鍵全裝。
2. **SKILL.md 即安全模型**：裝＝把陌生人代碼交給 Agent；社群來源必讀後再決定。
3. **少而準**：核心少數（品味／準確／流程／自建）＋痛點再加；過量搶上下文、抓錯 skill。

## ② 選情境觀察

- 本篇第②步：**未卡**。情境可直接點名（本專案 skill 採納邊界）。
- 未喚醒 F3a／F3b。
