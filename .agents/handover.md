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
- 舊版交接內的路徑按該版推送 ID 所在 commit 解析；目錄遷移後不追改歷史交接

## 版本索引

| 推送 ID | 檔案 | 訊息 | 日期 |
|---------|------|------|------|
| `49c78b5` | [handover/49c78b5.md](handover/49c78b5.md) | Ingest an AI trading Article, add shadow alignment reviews, and fix Windows registry sync. | 2026-07-14 |
| `6096dd8` | [handover/6096dd8.md](handover/6096dd8.md) | Migrate Superpowers-era docs, repair active references, and design module-level content selection. | 2026-07-14 |
| `6d3a35e` | [handover/6d3a35e.md](handover/6d3a35e.md) | Add a shadow skill registry, human-readable alignment reporting, and two intake review packages. | 2026-07-14 |
| `c23a676` | [handover/c23a676.md](handover/c23a676.md) | Add a self-contained, accessible AI-native interactive knowledge map. | 2026-07-14 |
| `7830dba` | [handover/7830dba.md](handover/7830dba.md) | Plan a gated, shadow-first skill registry automation route without implementation. | 2026-07-14 |
| `09c4da8` | [handover/09c4da8.md](handover/09c4da8.md) | Add filtering (active reject / passive ignore) and module size handover reference. | 2026-07-13 |
| `e78cb7a` | [handover/e78cb7a.md](handover/e78cb7a.md) | Add DOC storage flow, knowledge visualizer design, and complete handover trigger. | 2026-07-13 |
| `f4c96aa` | [handover/f4c96aa.md](handover/f4c96aa.md) | Migrate Library v0.3 r1 to canonical rules and eight on-demand Skills. | 2026-07-13 |
| `4bcfeb3` | [handover/4bcfeb3.md](handover/4bcfeb3.md) | Add agent guidance modules and entry files. | 2026-07-11 |
| `0349a21` | [handover/0349a21.md](handover/0349a21.md) | Ingest v0.2 norms, wire agent modules, and record Inbox modularization test. | 2026-07-11 |

**最新版**：[handover/49c78b5.md](handover/49c78b5.md)

## 常駐參考

| 主題 | 檔案 |
|---|---|
| 篩選機制（主動不要／被動忽略）、模塊大小設定 | [reference/filtering-and-module-size.md](reference/filtering-and-module-size.md) |

## 資料夾

```
.agents/handover/           # 交接手冊各版本（獨立資料夾）
.agents/handover/reference/ # 常駐參考（跨版本累積）
.agents/handover.md         # 本檔：索引與製作流程
```
