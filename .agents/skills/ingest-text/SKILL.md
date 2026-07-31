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
3. **入口篩選軟建議（非閘門）**：三問判定為「正常來源」或「一次性素材」後，依「通用文本學習工作流」輸出建議（詳見 `docs/specs/2026-07-29-universal-text-learning-workflow.md`）。入口淘汰可省略。
   - 九步各標 `有｜弱｜無`＋一句白話，末附「建議下一步」1～3 條。
   - 九步：Problem → Evidence → Principle → Framework → Boundary → Module → Validation → Teaching → Iteration。
   - **不得**因建議改寫三問出口；**不得**寫入 ModuleCore／`retention`／edges；可選寫入 Inbox `README.md`「學習工作流建議」節，沒有不算缺檔。
   - 與使用迴路「層預覽」可同次回報，但不合併、不互相取代。
4. 僅在模塊化與抽邊後，才依 `module-layer` §2.5 判定零散來源。
   - 登記簿對齊可用時，僅於命中既有登記節點且人工覆核通過才 attach-only。
   - 未命中：不建模塊，原文回候選池，待登記節點出現後再處理。
   - 對齊不可用時，本條款休眠。
5. 未完成必要處理的來源留在 `Inbox/`;入口淘汰與已回填成邊的一次性素材直接棄置,不建立淘汰資料夾。
6. 完成處理後依主要類型分流:主要收錄類型轉 `DOC/Stocks/`;非主要收錄類型轉 `DOC/Archive/`;類型、品質或裁決不確定時轉 `DOC/Review/`,標 `needs_review` 並記錄 `review_reason`,不可自行猜測。
7. 文檔以完整資料夾為移動單位;轉入 DOC 時同步更新 `DOC/INDEX.md`,至少記錄 `text_id`、`title`、`bucket`、`status`、`path`、`review_reason`。移動或索引任一失敗,均不得宣稱轉出完成。
8. 依類型記錄 text ID;複合類型取元素較多者,相等時取標題。正式 ID 未裁決的 Review 文檔使用 `PENDING-*` 暫時鍵。

## 常見混淆

| 情況 | 處理 |
|---|---|
| 入口淘汰不是零散來源 | 入口三問直接棄置；零散來源只能在模塊化與抽邊後判定。 |
| 背景／純填充不是正常技能模塊 | 背景依 `module-layer` §2.4、§2.6 建立受限模塊；純填充依 §2.2a `retention=discard`，不建立模塊。 |
| 學習工作流建議不是入口閘門 | 九步建議只附在通過三問之後；覆蓋「無／弱」不構成淘汰理由，也不得改寫三問出口。 |
