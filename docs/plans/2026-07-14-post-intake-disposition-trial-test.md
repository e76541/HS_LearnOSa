# 收錄後處置 Shadow 試行測試

日期：2026-07-14
狀態：已裁決-試行
裁決來源：AOI 2026-07-14
實作參照：`tools/post-intake-disposition-trial/test/`
後繼：無

本測試只檢驗註記的安全邊界，不測試或改寫收錄、模塊化、抽邊、對齊與技能登記。

| 案例 | 輸入／試點 | 預期結果 | 證據 |
|---|---|---|---|
| T1 | 試行記錄欄位 | 新增狀態欄位時拒絕；只允許既有 Review 身份鏡像 | 單元測試 |
| T2 | 關聯候選表格 | 分隔列或列數非四欄時拒絕 | 單元測試 |
| T3 | 關聯候選過多 | 超過五筆時拒絕，禁止全庫掃描 | 單元測試 |
| T4 | 疑似秘密值 | 常見 key／token 指派字串 fail closed；測試不保存真實秘密 | 單元測試 |
| T5 | Loop and Harness ↔ SRC-002 | 僅記比較候選；不合併、不改邊 | Review sidecar + 目錄驗證 |
| T6 | Quant Trading ↔ Wall Street | 保持兩個獨立來源；只記平行文檔候選 | Review sidecar + 目錄驗證 |
| T7 | AI-Native／Making Fable | 身份裁決與資料缺口僅是人工註記 | Review sidecar + 目錄驗證 |
| T8 | 封存或停止請求 | 只交由人工決定；不執行移動、刪除或寫入新狀態 | 人工檢查 |

## 驗收指令

```powershell
node --test tools/post-intake-disposition-trial/test/*.test.mjs
node tools/post-intake-disposition-trial/validate-disposition.mjs DOC/Review
node --test tools/registry/test/*.test.mjs
git diff --check
```

## 人工檢查

1. `DOC/INDEX.md`、`Library/規範/` 與 `.agents/skills/ingest-text/` 未被本試行改動。
2. 四個試點的 `source.md`、`modules.md`、`edges.md` 未被改動。
3. 所有候選關係都只存在於 sidecar，未被寫成結構邊或登記層關係。
