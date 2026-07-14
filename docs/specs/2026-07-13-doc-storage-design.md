# DOC 文檔儲存與索引設計

日期：2026-07-13
狀態：已併入 canonical
裁決來源：AOI 2026-07-13 v0.3 r2
實作參照：`DOC/`
後繼：`Library/規範/70-版本與裁決.md` §v0.3 r2

## 目的

建立可閉環的文檔轉出位置，取代未落地的 `DocStocks`／`DocToSave` 名稱；將完成文檔、待覆核文檔與未完成文檔分開，並以單一索引提供查找入口。

## 目錄模型

```text
Inbox/          未完成、仍在收錄管線處理
DOC/
├─ Stocks/      已完成、主要收錄類型
├─ Archive/     已完成、非主要收錄類型
├─ Review/      已完成處理，但類型或品質待人工覆核
└─ INDEX.md     DOC 內全部文檔的索引
```

入口淘汰文檔依 canonical 規範直接棄置，不建立 `Rejected/`，也不把原文存入其他目錄。未來若有稽核需求，應另案設計只存 metadata 的 rejection ledger。

## 狀態與流向

| 管線結果 | 儲存位置 | 索引 |
|---|---|---|
| 尚未完成模塊化、抽邊或其他必要處理 | `Inbox/` | 不進 `DOC/INDEX.md` |
| 已完成且屬主要收錄類型 | `DOC/Stocks/` | 必須登記 |
| 已完成且屬非主要收錄類型 | `DOC/Archive/` | 必須登記 |
| 處理已完成，但類型、品質或裁決待人工覆核 | `DOC/Review/` | 必須登記並寫明覆核原因 |
| 入口三問判定淘汰 | 不保存 | 不登記 |
| 一次性斷邊素材已回填為邊 | 原文棄置 | 不登記原文；邊保留自身溯源 |

文檔從 `Review` 完成裁決後，移至 `Stocks` 或 `Archive`，並在同一次變更更新索引。文檔不得同時存在兩個 DOC 子目錄。

## 索引格式

`DOC/INDEX.md` 是人工可讀的 canonical 查找入口，按 `text_id` 排序；`text_id` 未裁決的 Review 文檔排在正式 ID 之後，再按標題排序。

索引至少包含：

| 欄位 | 說明 |
|---|---|
| `text_id` | 正式文本 ID；未裁決時使用既有 `PENDING-*` 暫時鍵 |
| `title` | 文檔標題 |
| `bucket` | `Stocks`、`Archive` 或 `Review` |
| `status` | `complete` 或 `needs_review` |
| `path` | 指向 DOC 內文檔入口檔的相對連結 |
| `review_reason` | `Review` 必填；其他目錄填 `—` |

每個文檔以自己的資料夾為單位保存；索引的 `path` 指向該資料夾的 `README.md`。原文、模塊與邊等伴隨檔一併移動，避免拆散證據鏈。

## 規範修改範圍

1. `Library/規範/60-文本身份與術語.md`
   - 新增文檔儲存位置與狀態流向表。
   - 明定 `Inbox`、`DOC/Stocks`、`DOC/Archive`、`DOC/Review` 與入口淘汰的語義。
   - 明定 `DOC/INDEX.md` 為查找入口，不是證據層或登記層狀態來源。
2. `Library/規範/10-模塊層.md`
   - 在入口／零散來源條款銜接上述儲存規則，維持淘汰即棄置。
3. `.agents/skills/ingest-text/SKILL.md`
   - 將 `DocStocks`／`DocToSave` 改為新路徑。
   - 加入 Review 分流與同步更新 `DOC/INDEX.md` 的作業要求。
4. `Library/Agent技能化運作流程.md` 與非歷史入口文件
   - 若存在現行流程描述，同步更新新路徑。
5. `.agents/handover/` 舊版
   - 歷史記錄不修改；搜尋結果允許保留舊名稱。

## 首次遷移

- 建立三個 DOC 子目錄及 `DOC/INDEX.md`。
- 目前 `Inbox/how-to-make-company-ai-native/` 已完成入口判定、模塊化與抽邊，但主要類型與正式 ID 待裁決，因此整個資料夾移至 `DOC/Review/how-to-make-company-ai-native/`。
- 索引使用 `PENDING-how-to-make-company-ai-native`，`review_reason` 記錄「主要文章類型與正式文本 ID 待人工覆核」。
- 其他仍未完成的 Inbox 文檔不遷移。

## 一致性與錯誤處理

- 移動文檔與更新索引必須同次完成；任一失敗則不宣稱轉出完成。
- 索引路徑不存在、同一 `text_id` 重複、同一文檔跨 bucket 重複，均視為驗證失敗。
- `Review` 項目缺 `review_reason` 時不得通過驗證。
- 規範與 Skill 中不得再出現生效中的 `DocStocks`／`DocToSave`；歷史 handover 與 archive 不在修改範圍。

## 驗證

1. 三個子目錄及 `DOC/INDEX.md` 均存在。
2. 索引中的每個相對連結可解析，且 bucket 與實際父目錄一致。
3. DOC 中每個文檔資料夾恰有一筆索引。
4. 非歷史、生效文件搜尋不到 `DocStocks`／`DocToSave`。
5. `how-to-make-company-ai-native` 只存在於 `DOC/Review`，其索引狀態為 `needs_review`。
6. `git diff --check` 通過。

## 非目標

- 本次不建立正式文本 ID 序號簿。
- 本次不裁決文章主要類型。
- 本次不建立淘汰原文庫或 rejection ledger。
- 本次不設計機器可讀資料庫；`DOC/INDEX.md` 先作人工可讀索引。
