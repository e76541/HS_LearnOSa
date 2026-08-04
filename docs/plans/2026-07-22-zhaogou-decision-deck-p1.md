# 趙構決策牌 P1 紙上試跑計畫

日期：2026-07-22
狀態：已封存
裁決來源：無
實作參照：`docs/experiments/2026-07-22-zhaogou-decision-deck-p1-spike.md`
後繼：無（決策牌已退出；母稿已封存）

> **性質：導航 OSA 決策牌組的領域紙上試跑計畫。** 不修改 `Library/規範`、不登記作業模塊、不開路線 INI。網站 MVP 仍為母草案預設；本計畫以趙構／靖康之變作並行驗證。

母草案：[Navigation OSA：決策牌組](../specs/2026-07-21-navigation-osa-decision-deck.md)  
證據層試作：[趙構／靖康之變文本管線](../experiments/2026-07-22-zhaogou-jingkang-text-pipeline-spike.md)（`ZJG-Cxx`，非正式 module_id）

---

## 1. 目的

GoalSession：

> 若你是趙構，在靖康之變中作出會改變路線的必要判斷，並取得可執行的下一步。

驗證母草案 P1 判準：決策牌能否縮短路徑、前置閘門能否阻擋過早推薦、選擇後牌組能否增刪改排；證據可回指候選模塊與 `char_span`。

## 2. 三情境

| ID | 名稱 | 起點已知 | 預期首牌 |
|---|---|---|---|
| S1 | 第一次圍城 | 金兵圍汴、需親王為質 | DC01 |
| S2 | 磁州／大元帥 | 已離京、國書盡失、收密詔；王雲情報可信度不明 | DC02→DC03；含尚不能決定 |
| S3 | 勸進前後 | 父兄北狩、張邦昌勸進 | DC07→DC08 |

## 3. 八張決策牌索引

| 牌 | 決策 | 主要證據 |
|---|---|---|
| DC01 | 是否應命／自願入金營為質 | ZJG-C02 |
| DC02 | 離京議和：是否再赴敵營 | ZJG-C07 |
| DC03 | 磁州：留磁 vs 繼續北行赴金 | ZJG-C08 |
| DC04 | 密詔大元帥：硬衝勤王 vs 分屯待機 | ZJG-C09、ZJG-C10 |
| DC05 | 是否致書斡離不「講理退兵」 | ZJG-C11 |
| DC06 | 前鋒得勝後：追擊解圍 vs 禁追防伏 | ZJG-C11 |
| DC07 | 父兄未歸：是否接受勸進稱帝 | ZJG-C12 |
| DC08 | 登基後：留用 vs 外放耿南仲等主和派 | ZJG-C13 |

背景模塊 ZJG-C01 只作 Guide／舞台，不獨立成牌。完整欄位見 [cards.md](../experiments/assets/2026-07-22-zhaogou-decision-deck/cards.md)。

## 4. 與母草案邊界

| 沿用 | 本計畫不做 |
|---|---|
| 三層模型：模塊≠牌 | 不裁母草案 §11 |
| DecisionReadiness／Guide／OptionProfile | 不啟用 M5、不開 INI |
| P1 驗收指標（§8.3） | 不進 P2 Schema／Runtime／GRILLME 實作 |
| 投影不回寫證據層 | 不把趙構牌組升成通用歷史模板 |
| 網站 MVP 仍為母草案預設領域 | 不寫入 Inbox／DOC／正式 ID |

## 5. 驗收對照（母草案 §8.3）

| 指標 | 本計畫判準 |
|---|---|
| 路徑相關性 | 三情境不加入無關主支線（如太原戰術細節） |
| 必要判斷召回 | 八牌覆蓋人質→登基人事主線 |
| 影響可解釋 | 每選項主要影響回指 ZJG-Cxx＋char_span |
| 決策就緒 | S2 至少一案例 `decision_ready=false`，不代選 |
| 盲點展開 | Guide 用歷史域細項：正當性、軍事控制、情報可信、時間窗口、可逆性 |
| 最小補知 | 紙上只標 `minimal_learning_refs`，不實作 GRILLME |
| 使用者決策權 | 走牌紀錄保留人工選擇，系統不無聲代選 |
| 可重導航 | 每情境選擇後記錄牌組增刪／改排 |
| 任務推進 | 每情境結束有可執行下一步 |

## 6. 產出清單

- 本計畫（草稿）
- 試作報告與資產：`docs/experiments/2026-07-22-zhaogou-decision-deck-p1-spike.md`、`assets/2026-07-22-zhaogou-decision-deck/`
- INDEX／討論結論／看板變更列同步
