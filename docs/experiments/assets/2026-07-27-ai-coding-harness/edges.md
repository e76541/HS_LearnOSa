# 候選邊草模（試作）

方向：箭頭指向被支撐者。不建文本順序邊。局部窗口＝2。

## 第一遍（局部）

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| ACH-C01 | `elaborates` | ACH-C00 | 以 Claude 樹狀深度控制展開「四條不同的路」之一。 |
| ACH-C02 | `elaborates` | ACH-C00 | 以 Agent Teams／tasks.md 展開另一條 Claude 拓撲路徑。 |
| ACH-C02 | `contrasts` | ACH-C01 | 正文對比：打破主從回報，轉向點對點網路。 |
| ACH-C03 | `elaborates` | ACH-C00 | Dynamic Workflows 與 ≤15 收束「通信陣列」基因。 |
| ACH-C03 | `elaborates` | ACH-C01 | 在樹狀派生之上加依賴圖動態規劃規模。 |
| ACH-C04 | `elaborates` | ACH-C00 | Codex 實用主義路線對照四條路命題。 |
| ACH-C04 | `contrasts` | ACH-C02 | 正文明示：不追通信拓撲美感，改追算力親和度。 |
| ACH-C05 | `exemplifies` | ACH-C04 | 重構場景 high／low 並行是親和度匹配的具體例。 |
| ACH-C06 | `elaborates` | ACH-C00 | Cursor 作為 IDE 融合第三條路。 |
| ACH-C07 | `elaborates` | ACH-C06 | Merkle 索引與無感預覽展開 IDE 狀態融合。 |
| ACH-C08 | `elaborates` | ACH-C00 | Antigravity 顯式治理為第四條路。 |
| ACH-C08 | `contrasts` | ACH-C06 | 正文對比：Cursor 隱形無感 vs 謀定而後動。 |
| ACH-C09 | `elaborates` | ACH-C08 | brain／transcript 是治理原生產物與可追溯機制。 |
| ACH-C10 | `elaborates` | ACH-C08 | Worktree 隔離支撐規劃先行後的並行確定性。 |
| ACH-C11 | `solves` | ACH-C00 | 選型矩陣回答「四條路怎麼選」。 |
| ACH-C12 | `elaborates` | ACH-C11 | 「無銀彈／看基因」收束選型態度。 |

## 第二遍（長程）

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| ACH-C11 | `depends_on` | ACH-C02 | 矩陣「長鏈動態分工」分支直接點名 Agent Teams／tasks.md。 |
| ACH-C11 | `depends_on` | ACH-C04 | 矩陣「成本／吞吐／算力分配」分支點名 Codex 親和度匹配。 |
| ACH-C11 | `depends_on` | ACH-C07 | 矩陣「編輯器響應／本地索引／預覽」分支點名 SQLite＋Merkle。 |
| ACH-C11 | `depends_on` | ACH-C08 | 矩陣「高風險／審計／顯式規劃」分支點名 Planning＋Proceed Gate。 |
| ACH-C11 | `depends_on` | ACH-C10 | 同分支點名 Worktree 共享隔離。 |
| ACH-C12 | `motivates` | ACH-C00 | 「不被行銷遮眼」的動機來自開篇「表面都叫多 Agent」。 |

## 召回風險

- ACH-C01／C03 與 ACH-C09／C10 細節邊若再細拆參數會圖爆炸；正式抽邊時維持「基因機制」粒度。
- 文中版本號、環境變數名、模型名均 `unverified`；邊只綁機制命題，不綁版本事實。
