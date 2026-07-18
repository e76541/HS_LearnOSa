# 專案管理總覽

專案決策與推進的入口。只管治理導航與當下站位，不管學習內容或 DOC 文檔卡關。

狀態變更當下更新相關真值檔；本檔只維持入口與一句焦點。推送交接引用本層，不重寫全文。

## 現在站在哪

下一步卡在 **INI-001 文檔中心收錄管線** 的 P0 裁決（ADJ-001～004）。其餘事項的階段、阻塞與排序見 [roadmap.md](roadmap.md)。

## 管理文件

| 文件 | 回答的問題 |
|---|---|
| 本檔 [overview.md](overview.md) | 現在站在哪？該先開哪份？ |
| [blueprint.md](blueprint.md) | 往哪走、長什麼樣、預期工程為何？ |
| [handover.md](handover.md) | 最近做了什麼？（可覆寫摘要） |
| [roadmap.md](roadmap.md) | 先做什麼、卡在哪、裁決與待實行計畫？（執行真值） |
| [preferences.md](preferences.md) | 以後請怎麼做？（長期偏好） |
| [decisions.md](decisions.md) | 談過什麼、結論為何？（未升格備忘） |

版本化推送快照（不可變）見 [.agents/handover.md](../../.agents/handover.md)，與上表「近期交接」不同。

## 分層入口

| 入口 | 管轄範圍 |
|---|---|
| 本目錄 `docs/management/` | 專案管理：總覽、藍圖、近期交接、路線、偏好、討論結論 |
| [docs/INDEX.md](../INDEX.md) | 檔案級草案與實作計畫狀態 |
| [Library/CURRENT.md](../../Library/CURRENT.md) | Canonical 規範分檔 |
| [.agents/handover.md](../../.agents/handover.md) | 推送當下快照與交接歷史 |

**分層原則**：管理層管事項與推進；INDEX 管檔案；版本化 handover 管推送快照；`docs/specs`、`docs/plans`、`tools/`、`DOC/` 為執行層產物。

## 更新規則

1. 事項狀態、階段、排序或阻塞 → 改 [roadmap.md](roadmap.md)，並同步 [INDEX.md](../INDEX.md) 對應檔案列；本檔「現在站在哪」僅在主焦點切換時改一句。
2. 願景、目標樣貌、預期工程 → 改 [blueprint.md](blueprint.md)；不在藍圖追蹤逐項阻塞。
3. 推送完成後 → 更新 [handover.md](handover.md) 為最近工作摘要；完整快照寫入 `.agents/handover/<commit>.md`。
4. 使用者拍板偏好 → 改 [preferences.md](preferences.md)；討論結論未升格 → 追加 [decisions.md](decisions.md)。
5. 新增進行中事項 → INDEX 登記主文件，並在 roadmap 新增列。
6. 裁決定案 → 從 roadmap「開放裁決」移除，並更新所屬事項階段或移至「近期已結案」。
7. 撰寫版本化交接前，若影響路線狀態，先更新 roadmap；交接正文連結本總覽與相關路線項目。
