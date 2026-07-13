# 交接

交接手冊全文存放於 `.agents/handover/`；本檔僅索引與製作流程。

## 製作交接手冊

推送時同時撰寫交接手冊：

1. 整理本次變更摘要
2. 先提交內容變更，取得內容 commit ID
3. 撰寫 `.agents/handover/<內容commit短ID>.md` 並更新本檔版本索引
4. 另提交交接檔
5. 將內容 commit 與交接 commit 同次 `git push`

- 交接手冊與程式／規則變更同次推送，可分成兩個 commit
- 每版獨立檔案，不覆寫舊版

## 版本保存

- 每版獨立檔案，檔名 = 推送 ID（如 `4bcfeb3.md`）
- 舊版保留，不刪不改
- 接手讀最新版；查歷史則開對應版本檔

## 版本索引

| 推送 ID | 檔案 | 訊息 | 日期 |
|---------|------|------|------|
| `f4c96aa` | [handover/f4c96aa.md](handover/f4c96aa.md) | Migrate Library v0.3 r1 to canonical rules and eight on-demand Skills. | 2026-07-13 |
| `4bcfeb3` | [handover/4bcfeb3.md](handover/4bcfeb3.md) | Add agent guidance modules and entry files. | 2026-07-11 |
| `0349a21` | [handover/0349a21.md](handover/0349a21.md) | Ingest v0.2 norms, wire agent modules, and record Inbox modularization test. | 2026-07-11 |

**最新版**：[handover/f4c96aa.md](handover/f4c96aa.md)

## 資料夾

```
.agents/handover/     # 交接手冊各版本（獨立資料夾）
.agents/handover.md   # 本檔：索引與製作流程
```
