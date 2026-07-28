# 旅程式導航紙上組 — Graph Engineering

> Destination＝本文本。證據層（模塊／邊）只引用、不改寫。  
> 模型：Journey／GATE（預設站＋pass_rule）／STEP＝最小可執行動作。

## Destination

| 欄位 | 值 |
|---|---|
| `destination_kind` | `text` |
| `destination_ref` | `PENDING-graph-engineering-with-claude` |
| 終點意圖 | 能把多步 Agent 工作畫成可並行、可驗證、可收斂的圖，而非單線佇列 |

## GATE 設立（人工，5 站）

| GATE | intent | pass_rule | entry 證據（模塊） |
|---|---|---|---|
| G1 看見真邊 | 能區分「然後」與真依賴 | 完成決策：指出至少一條假箭頭並說明為何無資料流動 | M00, M01, M02 |
| G2 契約可接線 | 節點／邊有可驗證形狀 | 完成決策：為一節點寫 bounded in/out＋說明邊用程式碼做 reduce | M03, M04 |
| G3 會拆會合 | 能畫 diamond 並守 barrier 紀律 | 完成決策：標出 split／work／merge；並判定一處該不該 barrier | M05, M06, M07 |
| G4 信心與隔離 | 放行前能殺假發現、失敗不毒化 | 完成決策：選一種 verifier 模式＋說明 fan-in 容忍缺輸入 | M09, M10 |
| G5 成本與動態 | 拓撲／模型／自畫圖有取捨 | 完成決策：在 pipeline vs barrier、模型分層、是否動態生圖中各給一判準 | M12, M13, M14 |

未寫入 GATE：M08（路由）併入 G3／G5 選配；M11（回圈）作 G4 加嚴選配；M15 為總結不佔站。

## 模擬路徑（含一次 Q2）

起點 → G1…

| 序 | 所在 | 動作 | STEP 型別 | 自上一過站累計 |
|---|---|---|---|---|
| 1 | G1 | 決策：砍掉「摘要→天氣」假邊 | decide | 1 |
| — | **G1 過站** | pass_rule 滿足 | — | **steps_to_arrive(G1)=1** |
| 2 | G2 | 前置閘門：不清楚 schema 何時強制 | （不計） | 0 |
| 3 | G2 | Q2 補：讀 M03 schema／retry 段 | q2_fill | 1 |
| 4 | G2 | 回原牌 | resume_card | 2 |
| 5 | G2 | 寫出 ITEM 契約＋「dedupe 用程式」 | decide | 3 |
| 6 | G2 | 改路：下一站預覽 diamond | reroute | 4 |
| — | **G2 過站** | — | — | **steps_to_arrive(G2)=4** |
| 7 | G3 | decide：標出 fan-out／reduce／synthesize | decide | 1 |
| 8 | G3 | execute_next：寫下「跨源去重才 barrier」 | execute_next | 2 |
| — | **G3 過站** | — | — | **steps_to_arrive(G3)=2** |
| 9 | G4 | decide：選 adversarial majority | decide | 1 |
| — | **G4 過站** | — | — | **steps_to_arrive(G4)=1** |
| 10 | G5 | decide：預設 pipeline；merge 用貴模型 | decide | 1 |
| — | **G5／Destination** | — | — | **steps_to_arrive(G5)=1** |

`steps_total`（本模擬）＝ 1+4+2+1+1 ＝ **9**

## 核對

- STEP=B：補知／回牌／決定／改路／執行各計 1；閘門判定與純閱讀不計。  
- GATE≠決策前置閘門：G2 內閘門卡住不計步，過站靠 pass_rule。  
- 模塊／邊檔未改；本檔只引用 ID。  
- 與 Graph Engineering 對照：GATE≈barrier 站；站內 Q2≈受控回邊；不把 ModuleEdge 當 GATE 邊。
