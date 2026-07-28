# 候選模塊草模（試作）

`ATL-Cxx` 只供本報告引用，不是正式 `module_id`。`char_span` 對齊同目錄 `source.txt`（零起點、右界不含）。共同核心投影：文章類型＝Agent 架構分層實用指南；領域＝Agent 編排／可靠性工程；輸入＝失敗症狀／工作流複雜度；輸出＝分層診斷與設計檢查；`schema_version=v0.3-r6`、`extractor=usage-loop-spike-2026-07-28`。列 `is_skill_signal=true` 者不表示文中產品事實已核對。

## 候選分流（discard）

| `char_span` | `claim_kind` | `retention` | 原因 |
|---|---|---|---|
| `[0,78)` | `none` | `discard` | 標題列，來源中繼資料 |
| `[1844,1871)` | `none` | `discard` | 「Agent Harness Engineering」小節標題，無獨立命題 |
| `[4440,4458)` | `none` | `discard` | 「Loop Engineering」小節標題 |
| `[6898,6917)` | `none` | `discard` | 「Graph Engineering」小節標題 |
| `[10641,10697)` | `none` | `discard` | 「Expensive Mistakes」小節標題 |
| `[13303,13525)` | `none` | `discard` | SEARCH TERMS SEO 清單，不支撐技能命題 |
| `[13525,15660)` | `none` | `discard` | 延伸閱讀書目；無本篇可遷移主張（記憶禁項：訂閱／社群 CTA 已自原文剔除） |

## 模塊表

| 候選 | `char_span` | `claim_kind` | `provenance` | `support_status` | 類型 | 主要命題／型別重點 | 抽取信心 |
|---|---:|---|---|---|---|---|---:|
| ATL-C00 | `[78,750)` | `interpretation` | `primary` | `provided` | TeachingModule | 三概念易混但非同義；30 秒答案＝Harness 建環境、Loop 設計回饋循環、Graph 明示拓撲；心智模型 environment→feedback→flow。 | 0.98 |
| ATL-C01 | `[750,1318)` | `interpretation` | `primary` | `provided` | TeachingModule | 裸模型缺環境能力；成熟堆疊＝底層 harness、其上 loops、最上 graphs。 | 0.96 |
| ATL-C02 | `[1318,1844)` | `advice` | `primary` | `provided` | TeachingModule | 標籤未統一；實務區分避免 buzzword 掩蓋真設計問題。 | 0.94 |
| ATL-C03 | `[1871,2449)` | `attributed_claim` | `secondary` | `unverified` | MethodModule | LangChain：agent＝model＋harness；OpenAI runner：呼叫／工具／handoff／狀態，遇真終態才停。產品細節未核。 | 0.91 |
| ATL-C04 | `[2449,3771)` | `advice` | `primary` | `provided` | MethodModule | Harness 把注意力從模型崇拜移開；含 context／action／persistence／control／safety／observability；圖上去掉模型後剩餘即 harness。 | 0.97 |
| ATL-C05 | `[3771,4440)` | `advice` | `secondary` | `unverified` | MethodModule | 長任務靠 harness（initializer、progress、git、增量紀律）；缺能力／回不來／丟狀態／過權／難審計／環境不一致時優先修 harness。Anthropic 案例未核。 | 0.93 |
| ATL-C06 | `[4458,5282)` | `advice` | `secondary` | `unverified` | MethodModule | 內建工具迴圈之上可疊驗證／事件／改進迴圈；LangChain 2026 稱 loop stack，非單一 while。 | 0.95 |
| ATL-C07 | `[5282,6174)` | `advice` | `primary` | `provided` | MethodModule | 好迴圈七件：trigger／goal／state／action policy／evidence／feedback／stopping；對證據循環，不對自信；「我說做完」不是終態。 | 0.98 |
| ATL-C08 | `[6174,6898)` | `advice` | `secondary` | `unverified` | AnalysisModule | Loop≠prompt：prompt 管呼叫內，loop 管呼叫後觀測／回饋／繼續／持久／終止；代價是成本延遲；失敗成本＞驗證成本才加迴圈。 | 0.96 |
| ATL-C09 | `[6917,8425)` | `advice` | `secondary` | `unverified` | MethodModule | Graph 問「誰可下一步」；節點＋允許邊承載分支／並行／合流／循環／人審；工程決策含邊界／狀態 schema／路由／並發／循環出口／耐久。 | 0.95 |
| ATL-C10 | `[8425,9224)` | `advice` | `primary` | `provided` | TeachingModule | 工作流圖≠知識圖；有分支／並行／審批／恢復／多專家才值得儀式；路徑未穩時過早畫圖會變脆。 | 0.97 |
| ATL-C11 | `[9224,9681)` | `interpretation` | `primary` | `provided` | TeachingModule | 巢狀：graph 跑在 harness 內；loops 住在 graph 內；harness 供給狀態／工具／評測。重疊但槓桿不同。 | 0.96 |
| ATL-C12 | `[9681,10641)` | `advice` | `primary` | `provided` | MethodModule | 依症狀選層：工具／狀態→Harness；不穩／終態錯→Loop；多專家順序→Graph；難定位→Graph+Harness；流程常變→簡化 harness、延後圖式。 | 0.98 |
| ATL-C13 | `[10697,11796)` | `advice` | `primary` | `provided` | MethodModule | 五貴錯：未觀察先畫圖；同模型自寫自評無防護；「一直試」無界；harness 當垃圾場；把編排失敗怪模型。 | 0.97 |
| ATL-C14 | `[11796,12520)` | `advice` | `primary` | `provided` | MethodModule | 上線檢查清單：Harness／Loop／Graph／Evaluation／Operations 各組問題。 | 0.94 |
| ATL-C15 | `[12520,13303)` | `advice` | `primary` | `provided` | TeachingModule | 三層互不頂替；丟狀態的圖無用、無證據終態的 harness 燒錢、分支塞進 ad-hoc 碼的 loop 難運維；合設計才可靠。 | 0.97 |

無背景模塊：書目與 SEO 已 discard；其餘段落皆直接支撐分層診斷技能。
