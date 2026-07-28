# 候選邊草模（試作）

方向：箭頭指向被支撐者。不建文本順序邊。局部窗口＝2。

## 第一遍（局部）

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| ATL-C01 | `elaborates` | ATL-C00 | 以「堆疊成形」展開三層為何突然重要。 |
| ATL-C02 | `elaborates` | ATL-C00 | 標籤未統一→更要用實務區分，避免 buzzword。 |
| ATL-C04 | `elaborates` | ATL-C03 | 在 LangChain／OpenAI 定義上展開 harness 組件與「去模型崇拜」。 |
| ATL-C05 | `elaborates` | ATL-C04 | 長任務／跨 session 場景說明 harness 何時賺回成本。 |
| ATL-C05 | `exemplifies` | ATL-C04 | Anthropic initializer／progress／git 為 harness 持久化實例（敘述例）。 |
| ATL-C07 | `elaborates` | ATL-C06 | 七解剖與「對證據循環」具體化 loop stack。 |
| ATL-C08 | `contrasts` | ATL-C06 | 正文對比：prompt 管呼叫內 vs loop 管呼叫後系統行為。 |
| ATL-C08 | `elaborates` | ATL-C07 | 成本／最簡架構建議支撐「為何要證據終態與有界重試」。 |
| ATL-C10 | `elaborates` | ATL-C09 | 何時值得儀式化／勿過早畫圖，收束 graph 決策。 |
| ATL-C10 | `contrasts` | ATL-C09 | 明示工作流圖≠知識圖（同段對照）。 |
| ATL-C11 | `elaborates` | ATL-C00 | 巢狀關係展開三層如何同系統共存。 |
| ATL-C12 | `solves` | ATL-C00 | 症狀表回答「混用之後怎麼下手修」。 |
| ATL-C13 | `elaborates` | ATL-C12 | 五貴錯是症狀表的反面操作手冊。 |
| ATL-C14 | `elaborates` | ATL-C12 | 上線清單把診斷轉成可勾稽問題。 |
| ATL-C15 | `elaborates` | ATL-C11 | 「互不頂替」收束巢狀與合設計主張。 |

## 第二遍（長程）

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| ATL-C12 | `depends_on` | ATL-C05 | 症狀「丟狀態／缺能力／過權」分支指向 harness 修法。 |
| ATL-C12 | `depends_on` | ATL-C07 | 症狀「不穩／終態錯」分支指向證據與 stop rule。 |
| ATL-C12 | `depends_on` | ATL-C09 | 症狀「多專家順序／難定位」分支指向顯式節點邊。 |
| ATL-C12 | `depends_on` | ATL-C10 | 「流程常變→延後圖式」直接依賴「何時值得儀式」。 |
| ATL-C13 | `motivates` | ATL-C07 | 「keep trying」貴錯動機來自缺 measurable objective／stop。 |
| ATL-C13 | `motivates` | ATL-C10 | 「未觀察先畫圖」動機來自過早 graph 變脆。 |
| ATL-C15 | `depends_on` | ATL-C04 | 「圖再美也救不了丟狀態」回指 harness 持久化。 |
| ATL-C15 | `depends_on` | ATL-C07 | 「無證據終態＝燒錢」回指 loop 終態規則。 |

## 召回風險

- ATL-C03／C06／C09 的產品名與版本屬 `unverified`；邊只綁機制命題。
- 若把 harness 六組件、loop 七解剖、graph 六決策拆成獨立節點會圖爆炸；正式抽邊維持本粒度。
- 文中研究－發布 Agent 僅一句情境，無獨立案例模塊；未建 exemplifies 到虛構系統。
