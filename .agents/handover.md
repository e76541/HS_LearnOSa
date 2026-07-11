# 交接

交接手冊全文存放於 `.agents/handover/`；本檔僅索引與製作流程。

## 製作交接手冊

推送時同時撰寫交接手冊，一次完成：

1. 整理本次變更摘要
2. 撰寫 `.agents/handover/<推送ID>.md` 並更新本檔版本索引
3. 與其他變更一併 `git add` → `git commit` → 取得 commit ID
4. 若提交前 ID 未知：以 commit ID 命名交接檔、填入手冊內推送 ID，再 `git commit --amend --no-edit`
5. `git push`

- 交接手冊與程式／規則變更同次推送，不另開第二輪提交
- 每版獨立檔案，不覆寫舊版

## 版本保存

- 每版獨立檔案，檔名 = 推送 ID（如 `4bcfeb3.md`）
- 舊版保留，不刪不改
- 接手讀最新版；查歷史則開對應版本檔

## 版本索引

| 推送 ID | 檔案 | 訊息 | 日期 |
|---------|------|------|------|
| `4bcfeb3` | [handover/4bcfeb3.md](handover/4bcfeb3.md) | Add agent guidance modules and entry files. | 2026-07-11 |
| `0349a21` | [handover/0349a21.md](handover/0349a21.md) | Ingest v0.2 norms, wire agent modules, and record Inbox modularization test. | 2026-07-11 |

**最新版**：[handover/0349a21.md](handover/0349a21.md)

## 資料夾

```
.agents/handover/     # 交接手冊各版本（獨立資料夾）
.agents/handover.md   # 本檔：索引與製作流程
```
