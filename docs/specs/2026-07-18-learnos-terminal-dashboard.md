# LearnOS TERMINAL:報價牆式學習儀表板

日期:2026-07-18
狀態:已封存
裁決來源:無
實作參照:無(原型已封存 [../archive/html-2026-07-23/specs/assets/2026-07-18-learnos-terminal.html](../archive/html-2026-07-23/specs/assets/2026-07-18-learnos-terminal.html),假資料,未接管線)
後繼:無

關聯:[2026-07-13-knowledge-visualizer-design.md](2026-07-13-knowledge-visualizer-design.md)、[2026-07-15-speaking-module-graph-design.md](2026-07-15-speaking-module-graph-design.md)、[2026-07-16-nine-palace-dual-phase.md](2026-07-16-nine-palace-dual-phase.md);涉及作業模塊 M2(視圖)、M3(練習),均籌備中,本草案不實作。

## 定位

以「金融終端行情牆」隱喻呈現文本模塊熟練度:模塊 = 標的,熟練度 = 價格,七日增減 = 漲跌。三層漸進揭露:**行情牆 → 路線圖 → 九宮**。

## 原型已含的機制

1. **報價牆**:每模塊一列(中文名/ID/熟練度/Δ7d/上次練習),狀態徽章 `DORMANT`(休眠)、`TRIAL`(試用)。
2. **待練習佇列**:SRS 到期排序,逾期標紅,每列附練習類型(口述/公式/九宮)與直達按鈕。
3. **警示面板**:紅(休眠超期、練習逾期)/ 琥珀(trial 待轉正、技能組整體下滑)。
4. **路線圖**:錨點 + 一階鄰居輻射佈局;邊型四種對齊 LearnOS 邊詞彙——`prereq`(實線藍)、`broader_than`(實線黃)、`related`(實線紫)、`background`(虛線灰,「舞台非演員」);點鄰居節點換錨重繪(漸進揭露)。
5. **九宮**:中宮為模塊本體,外八格為子區域各帶熟練度;可多選區域啟動練習(練習 session 為佔位 alert)。無資料時以固定八名(定義/公式/案例/邊界/反例/連結/口述/應用)退階生成。
6. 面板開關列、footer 統計(模塊數/到期數/休眠數/連續天數)。

## 待決事項

- **資料來源**:原型全為寫死假資料;正式化需由 M2 管線(`tools/viz/`、render-knowledge-views)供給模塊、邊、熟練度與 SRS 排程,熟練度與 Δ7d 的計算定義尚不存在於任何規範。
- **九宮子區域來源**:外八格應由攝入期九宮(見九宮雙階段草案)產出,而非儀表板自行退階生成。
- **與 React 儀表板(INI-005)的關係**:本原型為單檔 HTML,與 `tools/viz/react/` 方向是否合流待議。
- 練習啟動後的 session 流程(接 run-speaking-session / generate-practice)未定義。
