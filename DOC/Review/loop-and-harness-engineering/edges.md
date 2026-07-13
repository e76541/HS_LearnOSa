# Edges — Loop and Harness Engineering

> 僅使用 canonical 已生效邊型別。方向依「箭頭指向被支撐者」；背景模塊 M00 可作端點，但不進對齊或圖式主體。

## 第一遍：局部候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M00 | motivates | M01 | `[0,786)` | 開頭描述只配置一兩個 harness 檔案後迴圈停滯，構成分層與先建底座的動機。 |
| M02 | elaborates | M01 | `[2241,3353)` | CLAUDE.md 將 M01 的不變 harness 具體化為常駐專案上下文。 |
| M03 | elaborates | M01 | `[3353,4245)` | settings.json 將 harness 具體化為權限、環境與 hook 註冊。 |
| M04 | elaborates | M01 | `[4245,4960)` | hooks 將 harness 具體化為每次工具事件都會執行的確定性政策底線。 |
| M05 | elaborates | M01 | `[4960,5846)` | verifier subagent 將 harness 具體化為 fresh-context 的製作／檢查分離。 |
| M06 | elaborates | M01 | `[5846,6906)` | skills 將 harness 具體化為按觸發漸進載入的專門流程。 |
| M07 | elaborates | M01 | `[6906,7815)` | MCP 將 harness 具體化為最小化、可稽核的外部工具連接。 |
| M08 | elaborates | M01 | `[7815,8876)` | memory 與 vault 將 harness 具體化為跨 session 的可變狀態與穩定 canon。 |
| M10 | depends_on | M09 | `[9901,11104)` | Plan–Act–Verify 每輪先重讀 goal spec 與 implementation plan，故迭代依賴 M09 的落盤契約。 |
| M11 | elaborates | M10 | `[11104,12127)` | fan-out 說明 Plan–Act–Verify 面對多個獨立子工作時如何以 worker 並行並由 orchestrator 收斂。 |
| M15 | depends_on | M14 | `[16132,17006)` | 「今晚做什麼」先盤點完整接線所缺的元件，再依缺口選唯一下一步。 |

## 第二遍：長程候選

| source | type | target | evidence_char_span | 文本證據 |
|---|---|---|---|---|
| M12 | depends_on | M08 | `[12127,13069)` | 排程喚醒後必須從落盤進度繼續；原文明說 persistence 是 scheduler 的另一半。 |
| M13 | motivates | M10 | `[13069,14151)` | confident garbage、context rot 與重複迭代三類失敗，直接構成 fresh-context Plan–Act–Verify 與狀態回寫的動機。 |
| M14 | elaborates | M01 | `[14151,16132)` | 完整目錄與單輪執行追蹤，把前文 harness／loop 兩層關係整合成單向接線。 |

## 驗收註記

- 存在性：14 條邊均有原文命題支撐；未建立文本順序邊。
- 方向：`elaborates` 的具體元件指向 M01 的總體概念；`depends_on` 的使用者指向其前置條件；`motivates` 的問題或失敗證據指向被促成的方法。
- 類型：七個 harness 元件是抽象設計的具體展開，不是單一案例，故用 `elaborates` 而非 `exemplifies`。
- 長程召回風險：M09 goal spec 與 M08 state/memory 可能共同支撐 M12 persistence，但原文對 M08 的跨 session 記憶與 M12 的每輪狀態檔分工不夠精確，因此只保留證據較直接的 M12 → M08。
- 伏筆穩定性：未抽取 `foreshadows`；文章以明示章節與回顧接線，不需使用穩定性較低的伏筆邊。
