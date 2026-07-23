# 演講路線圖:九宮導覽場控件

日期:2026-07-18
狀態:草稿
裁決來源:無
實作參照:無(原型已封存 [../archive/html-2026-07-23/specs/assets/2026-07-18-talk-roadmap.html](../archive/html-2026-07-23/specs/assets/2026-07-18-talk-roadmap.html),可獨立操作)
後繼:無

關聯:[2026-07-16-nine-palace-dual-phase.md](2026-07-16-nine-palace-dual-phase.md)(練習期/演講的消費側)、[2026-07-15-speaking-module-graph-design.md](2026-07-15-speaking-module-graph-design.md)、[2026-07-16-gpt-live-cyclic-thinking.md](2026-07-16-gpt-live-cyclic-thinking.md);涉及作業模塊 M3(run-speaking-session),籌備中,本草案不實作。

## 定位

演講進行中的**場控/提詞面板**:九宮呈現演講模塊,講者(或場控)即時標記進度,邊線點亮當前模塊的關係脈絡。與 LearnOS TERMINAL 是同一九宮容器的另一消費場景——前者管練習排程,本件管單場演講的走位。

## 原型已含的機制

1. **九宮佈局**:中宮為主題命題(含進度條 n/8),外八格為演講模塊,格上有遍歷序號;支援缺格(隱藏)。
2. **三態機**:未講 → 進行中 → 已完成,點格循環;**同時僅一格進行中**,新格轉 live 時原 live 自動轉 done(已完成加刪除線)。
3. **邊與點亮**:邊連接模塊,連到進行中模塊的邊高亮;邊標籤點擊可循環關係類型(`依賴/對比/舉例/推論/背景`)。
4. **鍵盤場控**:數字 1–8 直達、N 下一個未講、R 重設、M 切 mini-map。
5. **Mini-map 模式**:整面縮至右下角,供錄影/直播疊圖。
6. **編輯模式**:格名與中宮標題 contenteditable,現場改詞不動代碼。

## 待決事項

- **邊詞彙不一致**:本件用中文五型(依賴/對比/舉例/推論/背景),LearnOS TERMINAL 與領域邊詞彙用 `prereq/broader_than/related/background`;兩套是否統一、如何對映,須先裁決再正式化。
- **資料載入**:模塊與邊寫死在腳本常量;正式化應由演講場次(run-speaking-session)或九宮產出餵入,並考慮進度狀態的持久化(現無存檔,重整即失)。
- 與九宮雙階段草案的「回中心四級規則」等練習規則無關聯——本件只管演講播放,不做骰隨機;是否需要合併為單一九宮容器規格待議。
