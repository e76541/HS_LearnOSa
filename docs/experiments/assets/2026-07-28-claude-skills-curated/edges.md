# 候選邊草模（試作）

方向：箭頭指向被支撐者。不建文本順序邊。局部窗口＝2。

## 第一遍（局部）

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| CSC-C01 | `exemplifies` | CSC-C00 | 42 技能圖的錯鏈／根目錄丟棄是「清單不可靠」的具體例。 |
| CSC-C02 | `motivates` | CSC-C03 | ToxicSkills 漏洞與抽憑證動機化「你在裝陌生人代碼」。 |
| CSC-C03 | `motivates` | CSC-C04 | 威脅模型解釋為何要全裝後丟棄、只留精簡集。 |
| CSC-C04 | `solves` | CSC-C00 | 精簡 13＋直達連結，回應爆紅清單錯鏈問題。 |
| CSC-C06 | `exemplifies` | CSC-C05 | Frontend Design 是對抗「生成感」的第一例。 |
| CSC-C07 | `exemplifies` | CSC-C05 | UI UX Pro Max 以查庫代替即興，同打生成感。 |
| CSC-C08 | `exemplifies` | CSC-C05 | Theme Factory 預設主題日用，同塊敵人。 |
| CSC-C09 | `exemplifies` | CSC-C05 | Canvas Design「先哲學再執行」拉開生成感差距。 |
| CSC-C10 | `exemplifies` | CSC-C05 | Algorithmic Art 為 Design 塊末例。 |
| CSC-C12 | `exemplifies` | CSC-C11 | Superpowers 是「改工作方式」主例。 |
| CSC-C13 | `exemplifies` | CSC-C11 | Context7 改準確性工作流，非外觀。 |
| CSC-C14 | `exemplifies` | CSC-C11 | Web Artifacts Builder 改產物組裝方式。 |
| CSC-C12 | `contrasts` | CSC-C06 | 正文：Superpowers 是唯一改「怎麼工作」而非產物長相者（對 Design 塊）。 |
| CSC-C16 | `exemplifies` | CSC-C15 | Webapp Testing 體現 Control「時間花在驗證」。 |
| CSC-C17 | `exemplifies` | CSC-C15 | File Search 同屬不華麗但省時間的控制面。 |
| CSC-C18 | `exemplifies` | CSC-C15 | Context Optimization 解釋「變笨」常在上下文。 |
| CSC-C20 | `elaborates` | CSC-C04 | Skill Creator 把策展／自建技能的方法產品化。 |
| CSC-C21 | `solves` | CSC-C04 | 「只裝四套」把 13 的策展再收斂成最小核心。 |
| CSC-C22 | `elaborates` | CSC-C03 | 讀 SKILL.md 是威脅模型的操作化安全閘。 |
| CSC-C23 | `elaborates` | CSC-C21 | 「不要裝三十」收束四件套的上限理由（搶上下文）。 |

## 第二遍（長程）

| 來源 | 邊 | 目標 | 證據摘要 |
|---|---|---|---|
| CSC-C21 | `depends_on` | CSC-C06 | 四件套第一件點名 Frontend Design。 |
| CSC-C21 | `depends_on` | CSC-C13 | 四件套點名 Context7。 |
| CSC-C21 | `depends_on` | CSC-C12 | 四件套點名 Superpowers。 |
| CSC-C21 | `depends_on` | CSC-C20 | 四件套點名 Skill Creator。 |
| CSC-C22 | `contrasts` | CSC-C02 | 官方可 unread vs ToxicSkills／社群必讀——信任邊界對比。 |
| CSC-C23 | `motivates` | CSC-C18 | 「搶上下文／抓錯 skill」與 Context Optimization「窗口塞垃圾」同族動機。 |
| CSC-C04 | `depends_on` | CSC-C03 | 策展前提是理解 skill＝可執行陌生人代碼。 |
| CSC-B00 | `foreshadows` | CSC-C03 | 開場「跑在 folders」鋪陳後文 skill 資料夾定義。 |

## 召回風險

- Design／Build／Control 各 skill 若再與安裝 URL 細邊全連，易圖爆炸；正式抽邊維持「塊教學 ←例示— 單 skill」粒度。
- Snyk 比例、repo 路徑、安裝指令均 `unverified`；邊綁命題不綁數字事實。
- `CSC-C19` Marketing 與四件套無正文點名依賴，本試作不硬連，避免假長程邊。
