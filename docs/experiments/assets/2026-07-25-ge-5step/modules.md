# 試作模塊 — Graph Engineering（5-step 版）

> **試作專用切分**。ID 前綴 `N`，與 `DOC/Review/graph-engineering-with-claude/`（14-step 版，M00–M15）**不同文本、不同命名空間**，不得互相引用或合併。
> `char_span` 以同目錄 `source.txt` 的 Unicode 字元零起算、半開區間 `[start,end)`。
> 目的：為 F3a 缺口驅動導航試跑提供**驗收素材**（邊），非正式收錄。

```yaml
source_id: SPIKE-ge-5step-2026-07-25
title: "Graph Engineering: build 1000+ agent loops in one window, from one prompt (full 5-step course)"
source_kind: user_pasted_article
source_char_length: 10742
status: spike_only          # 不進 Inbox／DOC，不建 PENDING ID
schema_version: v0.3-r6（僅取欄位形制，未跑完整收錄檢查）
```

| ID | 標題 | char_span | module_type | concept／procedure 摘要 |
|---|---|---|---|---|
| N00 | 直線是被畫出來的，不是工作本來的形狀 | `[0,897)` | TeachingModule | 多步 Agent 被寫成單線佇列；慢不是模型弱，是把圖畫成了線；本文承諾扇出＋自查的圖 |
| N01 | 單迴圈的已知失敗（Goodhart） | `[897,1695)` | TeachingModule | 迴圈＝試→查→調→再來的原子；單迴圈只看得見自己的指標，客服工單解決率上升而滿意度下降 |
| N02 | 答案是迴圈之圖：工作形狀 | `[1695,2119)` | TeachingModule | 不是更好的迴圈，是迴圈之網——彼此監看與糾正；設計工作形狀（誰先／誰同時／誰等待）；節點思考、邊搬運結果 |
| N03 | 真邊測試：「然後」不是邊 | `[2119,3084)` | MethodModule | 節點＝一 Agent 一輸入一輸出；邊＝上游輸出餵入下游輸入；對每個「然後」問下一步是否讀上一步輸出；否＝無邊，等待是浪費 |
| N04 | 建第一張圖（可執行程序） | `[3084,4435)` | MethodModule | 版本／方案前置；一句提示要求每檔一 Agent＋獨立 verifier；批准編排腳本；艦隊並行；中間結果留在腳本變數，回一份報告 |
| N05 | 「零 token」的邊界與存檔重跑 | `[4435,4998)` | MethodModule | 省的是協調不是工作，workflow 比一般 session 貴；先縮範圍再放大；好跑按 s 存檔、換任務保形狀 |
| N06 | 規模上限與波次 | `[4998,5613)` | TeachingModule | 一次可扇出 1,000 Agent、同時最多 16；16 上限使艦隊以波次推進；先跑 20 觀察行為與成本 |
| N07 | 失敗一：圖對自己點頭（verifier 需乾淨 context） | `[5613,6454)` | MethodModule | 模型偏好自己的輸出；verifier 坐在邊上、獨立節點、乾淨 context；共用 context 的圖是換字體的單迴圈；驗真實訊號（測試真的過）而非「說完成了」 |
| N08 | 失敗二：並行寫入互踩（隔離與三問） | `[6454,7091)` | MethodModule | Bun 團隊共用工作區互相覆寫；修法是結構性的：禁不安全指令＋各自 worktree；扇出前先答三問（在哪工作／怎麼合／衝突怎麼辦） |
| N09 | 同一形狀換任務：六種圖 | `[7091,7950)` | TeachingModule | 方法＝找真邊→扇出→獨立 context 驗證→隔離工人；安全掃描／引用報告／移植／對抗式 diff／排程掃描／未知規模探索 |
| N10 | 天花板的樣子：代價與監督 | `[7950,8419)` | AnalysisModule | 約 50 個 workflow、峰值 64 並行、53.5 萬行→百萬行、11 天；約 16.5 萬美元用量、需人監督、招致可審查性批評 |
| N11 | 錨：不能被爭辯的節點 | `[8419,8985)` | MethodModule | 只有拓撲買不到真；三種錨：真的跑過的測試、驗證據而非氛圍、凍結不許調的規則；圖只誠實到「拒絕移動的東西」為止 |
| N12 | 何時不該用圖 | `[8985,10105)` | MethodModule | 四條 skip：任務小而孤立／需逐步審批／還不知道在找什麼／步步真依賴；判準回到 Step 1——找不到兩個沒有箭頭的框就沒有圖 |
| N13 | 結論：架構師畫圖 | `[10105,10742)` | AnalysisModule | 直線不是天花板只是第一個形狀；獨立處扇出、信心處設閘、真值處凍結 |

## 不建節點的區間

| 區間 | 處置 |
|---|---|
| `[110,180)` 訂閱／後繼作宣稱 | `retention=discard`（純填充，含於 N00 區間內忽略） |

## 統計

- 模塊：14（N00–N13）
- 與 14-step 版重疊主題：真邊測試、diamond／扇出、verifier、隔離、成本；本版**新增**：Goodhart 迴圈失敗、規模上限與波次、Bun 代價、錨、何時不該用圖
- 未做：`semantic_roles`／`operations` 等完整欄位、A–E 判定、練習生成（試作不需要）
