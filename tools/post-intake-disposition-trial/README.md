# 收錄後處置 Shadow 試行工具

本工具只讀取與檢查 `DOC/Review/<slug>/post-intake-disposition.md`，不讀寫 `DOC/INDEX.md`、模塊、邊、canonical 規範或技能登記簿。

## 檢查範圍

- 試行記錄只鏡像既有 `Review`／`needs_review` 身份，不保存新的處置狀態或轉移規則。
- 關聯候選必須是四欄表格、最多五筆，且候選路徑必須留在 repo 內並存在。
- 偵測常見秘密值指派與已知 key 格式時 fail closed；這是人工保護的輔助，不取代人工判讀。
- 關聯候選不是 `edges.md` 的結構邊，任何內容都不會被工具回寫。

## 指令

```powershell
node --test tools/post-intake-disposition-trial/test/*.test.mjs
node tools/post-intake-disposition-trial/validate-disposition.mjs DOC/Review
```
