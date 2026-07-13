---
name: ingest-text
description: Use when Codex needs to intake a new or existing HS_LearnEdge text, classify candidate text, or distinguish entry rejection, normal sources, and one-time broken-edge material.
---

# 文本收錄

## 規範定位

1. 先讀 `Library/CURRENT.md`，解析 `module-layer`、`identity-terminology` 的路徑，再依該兩份規範作業。
2. 不讀 archive；不寫死規範實體檔名。

## 入口與管線

1. 新文字一律先進 Inbox。
2. 先執行 `module-layer` §2.5 的入口三問：
   - 無原文未主張的獨立主張：入口淘汰，棄置。
   - 主張可獨立成立：正常來源，走完整模塊化、抽邊與收錄管線。
   - 主張不可獨立成立但當下有具體斷邊題：作一次性作答素材；答案回填為邊後棄置。
   - 三問均無出口時棄置；不可另存為「零散來源」。
3. 僅在模塊化與抽邊後，才依 `module-layer` §2.5 判定零散來源。
   - 登記簿對齊可用時，僅於命中既有登記節點且人工覆核通過才 attach-only。
   - 未命中：不建模塊，原文回候選池，待登記節點出現後再處理。
   - 對齊不可用時，本條款休眠。
4. 完成收錄後：主要類型由 Inbox 轉 DocStocks；其餘轉 DocToSave。類型不確定時標記待人工覆核，不自行猜測。
5. 依類型記錄 text ID；複合類型取元素較多者，相等時取標題。

## 常見混淆

| 情況 | 處理 |
|---|---|
| 入口淘汰不是零散來源 | 入口三問直接棄置；零散來源只能在模塊化與抽邊後判定。 |
| 背景／純填充不是正常技能模塊 | 依 `module-layer` §2.4、§2.6 處理，不當作正常技能模塊收錄。 |
