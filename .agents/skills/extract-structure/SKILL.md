---
name: extract-structure
description: Use when identifying relationships between HS_LearnEdge modules, assigning edge types or directions, finding long-range links, or reviewing stale edges.
---

# 結構邊抽取

## 規範定位

1. 先讀 `Library/CURRENT.md`，解析 `design-principles`、`module-layer`、`structure-layer`、`identity-terminology`。
2. 不讀 archive；不寫死規範實體檔名。模塊層邊與登記層 `broader_than` 永不混用。

## 作業

1. 只以文本證據判定模塊間論證關係；輸出來源模塊、目標模塊、canonical 邊類型與證據。信心不足時不建邊；寧缺勿錯。
2. 只用 `structure-layer` 已生效詞彙：`depends_on`、`exemplifies`、`elaborates`、`equivalent_to`、`contrasts`、`motivates`、`solves`、`foreshadows`。預留類型未轉正前不可使用。
3. 依規範方向：箭頭指向被支撐者；`equivalent_to` 無方向。逐對檢查易混淆組：詳述／例示、依賴／動機。只有具體實例可標 `exemplifies`；概括機制或一般說明應檢查 `elaborates`，不可因句中有具體動詞便當成案例。
4. 第一遍局部逐對判斷：相鄰模塊、序號距離不超過 `local_window`，以及同一小節內全部模塊。不要先設計脊柱或樞紐。
5. 第二遍一次掃描全部模塊摘要，只找不在第一遍候選集的長程關係。
6. 不建文本順序邊；順序由 `char_span` 保存。細粒度機制留在模塊內，不為補資訊而製造過細節點或圖爆炸。
7. 背景模塊可作邊端點；是否進圖式由練習層決定。新證據與既有邊矛盾時，不刪舊邊，標 `stale` 並記觸發來源；失效邊不供圖式或練習。
8. 入邊數只能作重要性代理；資產提升必須人工覆核。

## 驗收

逐邊檢查存在性、方向、類型與文本證據；另報長程邊召回風險與伏筆邊穩定性。無證據的邊不通過。