> 2026-07-13 更新：DOC 轉出目錄與索引已建立；本篇已移入 `DOC/Review/`。下列目錄缺口為本次冒煙時的歷史發現，現已解決。

# 流程冒煙：問題清單

測試文：`how-to-make-company-ai-native`<br>
當時對照：`Library/CURRENT.md` v0.3 r1 + `ingest-text`、`modularize-text`、`extract-structure`<br>
日期：2026-07-13

## 總判

Skill 與 canonical 規範入口對齊，**前半段（Inbox → 入口三問 → 模塊化 → 抽邊）已人工跑通**；**後半段（正式 ID → 轉庫 → 對齊 → 練習／演講 → 驗收）尚未落地**，本篇不能用來宣稱整條管線有效。

## 已暴露問題

1. **轉出目錄缺失**<br>
   `ingest-text` 要求完成後轉 `DOC/Stocks`／`DOC/Archive`，repo 無此目錄，收錄無法閉環。

2. **產物 schema 落差**<br>
   本篇已用 Markdown + YAML 區塊產出 `modules.md` 與 `edges.md`，但 repo 尚無 canonical schema、JSON Schema 或 validator；目前只能人工驗收，不能宣稱機器可驗。

3. **文本 ID 未落地**<br>
   規範要求依類型記錄 text ID；實務來源皆無序號簿／命名規則。本篇只使用 `PENDING-*` 暫時鍵，避免擅占 `SRC-003`。

4. **舊 Inbox 卡住且規範過期**<br>
   `quant-desk-four-agents` 仍連已刪的 v0.2，並自承 13 切違反 P3，未粗化也未轉出——示範「流程中斷態」會殘留。

5. **基準樣本不在庫**<br>
   規範寫 SRC-001／SRC-002 實測，repo 無對應標註產物；三十篇基準曲線無法累積。

6. **登記簿空 → 後半條款休眠**<br>
   零散來源 attach-only、對齊驗收皆依賴登記層；目前無法測對齊／錯誤自動對齊率。

7. **驗證門檻與現況落差**<br>
   `validate-learning-pipeline`／`version-decisions`：v0.4 需三十篇標註 + 至少兩場演講。本篇僅冒煙，不可開新規格、不可宣稱有效。

8. **抽邊只有單篇候選慣例，仍無練習產物慣例**<br>
   本篇已依 `extract-structure` 產出邊清單，但它只是待裁決候選格式；repo 仍無圖式、練習項範例或機器驗證器可對齊。

## 本篇可繼續的下一步（若要閉環）

1. 定 text ID 規則並給本篇 ID。
2. 人工覆核 M00 的模塊邊界。
3. 裁決 `modules.md`／`edges.md` 是否成為 canonical 產物格式。
4. 裁決主要文章類型與正式文本 ID 後移至 Stocks 或 Archive。

在 1–4 完成前，流程問題屬**基礎設施缺口**，不是這篇文章本身不合格。
