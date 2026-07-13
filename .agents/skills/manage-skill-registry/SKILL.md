---
name: manage-skill-registry
description: Use when aligning modules to HS_LearnEdge skill nodes, managing aliases, pending skills, broader relations, or proficiency state.
---

# 技能登記管理

## 規範定位

先讀 `Library/CURRENT.md`，解析 `module-layer`、`skill-registry`、`identity-terminology`；再按本次操作讀取解析結果指向的 canonical 規範。不讀 archive，不寫死實體檔名。

## 邊界

登記層是平面詞表，不是樹。只允許 `broader_than`；多父、孤節點合法。模塊圖與登記圖同構但不同物，禁止混用節點或邊。

`SkillNode` 最少包含 `node_id`、英文正名、中文顯示名、別名集、`proficiency`、更新時間與外部證據引用。登記簿存狀態，不存評分證據本體。

## 凍結的四操作

1. `align(module)`：向量粗篩全簿後，細判「同一／子項或近親／都不是」。回傳命中、前五候選或拒絕。
2. `pending(module)`：拒絕項進待建槽；升格閾值未裁決，不自行轉正。
3. `node_id`：維持穩定識別符，改名或吸收別名不得換 ID。
4. `proficiency(node)`：值為 `new | learning | mastered`。v0.3 只讀系統狀態，由人工設定；不得由本 Skill 自動升降級。

## 人工覆核

- 「子項或近親」只產候選 `broader_than`，人工通過後才能寫入。
- 任何可能觸發熟練度降級效果的命中必須人工覆核。
- 背景模塊不對齊；證據與量測留在外部場次或評分紀錄。
- 新說法只有在確認同一技能後才吸收到別名集。

## 驗收

檢查四操作以外未新增介面、無強迫樹化、無跨層邊、穩定 ID 未變、候選關係已人工覆核、背景未對齊、待建未擅自升格、熟練度未被系統寫入。
