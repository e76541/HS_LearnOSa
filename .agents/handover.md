# 交接

交接手冊全文存放於 `.agents/handover/`；本檔僅索引與製作流程。

## 製作交接手冊

推送時同時撰寫交接手冊：

1. 若本次變更影響進行中事項、開放裁決或推進順序，先更新 [docs/management/roadmap.md](../docs/management/roadmap.md)
2. 若本次變更固化偏好或未升格討論結論，先更新 [docs/management/preferences.md](../docs/management/preferences.md) 與／或 [docs/management/decisions.md](../docs/management/decisions.md)
3. 整理本次變更摘要
4. 先提交內容變更，取得內容 commit ID
5. 撰寫 `.agents/handover/<內容commit短ID>.md` 並更新本檔版本索引；交接正文開頭須連結 [docs/management/overview.md](../docs/management/overview.md) 與相關路線項目
6. 更新 [docs/management/handover.md](../docs/management/handover.md) 為最近工作摘要
7. 另提交交接檔
8. 將內容 commit 與交接 commit 同次 `git push`

- 交接手冊與程式／規則變更同次推送，可分成兩個 commit
- 每版獨立檔案，不覆寫舊版
- 版本化交接是推送當下快照，不重寫管理層全文

## 版本保存

- 每版獨立檔案，檔名 = 推送 ID（如 `4bcfeb3.md`）
- 舊版保留，不刪不改
- 接手讀最新版；查歷史則開對應版本檔
- 舊版交接內的路徑按該版推送 ID 所在 commit 解析；目錄遷移後不追改歷史交接

## 版本索引

| 推送 ID | 檔案 | 訊息 | 日期 |
|---------|------|------|------|
| `a717424` | [handover/a717424.md](handover/a717424.md) | Read referenced management text before responding. | 2026-07-15 |
| `d27c6fa` | [handover/d27c6fa.md](handover/d27c6fa.md) | Draft speaking prep graph with random pick and drag. | 2026-07-15 |
| `fab9e85` | [handover/fab9e85.md](handover/fab9e85.md) | Add modular visualization trial with Archify demos. | 2026-07-15 |
| `329631a` | [handover/329631a.md](handover/329631a.md) | Add management preferences and decisions notes; sharpen overview vs blueprint. | 2026-07-15 |
| `7d8b876` | [handover/7d8b876.md](handover/7d8b876.md) | Restructure project management into overview, blueprint, handover, and roadmap. | 2026-07-14 |
| `99fc142` | [handover/99fc142.md](handover/99fc142.md) | Add doc governance registry and separate management from execution. | 2026-07-14 |
| `ef9b63e` | [handover/ef9b63e.md](handover/ef9b63e.md) | Propose a document-centered intake pipeline before templating. | 2026-07-14 |
| `30c5f58` | [handover/30c5f58.md](handover/30c5f58.md) | Add a non-canonical post-intake disposition shadow trial. | 2026-07-14 |
| `0a75420` | [handover/0a75420.md](handover/0a75420.md) | Add Fable review package and module-selection trial plan. | 2026-07-14 |
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

**最新版**：[handover/a717424.md](handover/a717424.md)

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
