# 候選模塊草模（試作）

`CSC-Cxx` 只供本報告引用，不是正式 `module_id`。`char_span` 對齊同目錄 `source.txt`（零起點、右界不含）。共同核心投影：文章類型＝Agent skill 策展與安全選型；領域＝Claude／Cursor skill 安裝治理；輸入＝爆紅清單／安全風險／工作痛點；輸出＝少裝＋讀 SKILL.md 的採納判準；`schema_version=v0.3-r6`、`extractor=usage-loop-spike-2026-07-28`。列 `is_skill_signal=true` 者不表示文中產品事實、Snyk 數字或連結已核對。

## 候選分流（discard）

| `char_span` | `claim_kind` | `retention` | 原因 |
|---|---|---|---|
| `[123,140)` | `none` | `discard` | 小節標題「WHY ANOTHER LIST」 |
| `[526,552)` | `none` | `discard` | 小節標題「THE PART NOBODY MENTIONS」 |
| `[959,976)` | `none` | `discard` | 「BLOCK 1 - DESIGN 」標籤 |
| `[2796,2812)` | `none` | `discard` | 「BLOCK 2 - BUILD 」標籤 |
| `[3933,3951)` | `none` | `discard` | 「BLOCK 3 - CONTROL 」標籤 |
| `[5025,5052)` | `none` | `discard` | 「BLOCK 4 - EVERYTHING ELSE」標籤，無獨立命題 |
| `[5712,5738)` | `none` | `discard` | 「IF YOU ONLY INSTALL FOUR」標題 |
| `[5897,5908)` | `none` | `discard` | 「TWO RULES」標題 |

記憶禁項：原文末「想要發佈自己的文章嗎？升級到 Premium」與 follow CTA 未納入 `source.txt`。

## 背景模塊

| 候選 | `char_span` | `claim_kind` | 角色 | 命題 |
|---|---:|---|---|---|
| CSC-B00 | `[0,123)` | `interpretation` | background | Claude＋各產品整合「跑在 skill 資料夾上」——為後文「skill＝資料夾」鋪舞台，本身非選型技能。 |

## 模塊表

| 候選 | `char_span` | `claim_kind` | `provenance` | `support_status` | 類型 | 主要命題／型別重點 | 抽取信心 |
|---|---:|---|---|---|---|---|---:|
| CSC-C00 | `[140,304)` | `interpretation` | `primary` | `unverified` | AnalysisModule | 爆紅 Claude skill 清單多為重排；半數連結不達宣稱目標。 | 0.95 |
| CSC-C01 | `[304,526)` | `verifiable_claim` | `secondary` | `unverified` | CaseModule | 現行 42 技能組織圖：6 指錯 repo；4 丟到 anthropics/skills 根目錄讓人猜十七夾。 | 0.92 |
| CSC-C02 | `[552,704)` | `attributed_claim` | `secondary` | `unverified` | AnalysisModule | Snyk ToxicSkills：測試中約 13% critical；有技能試圖抽機器憑證。比例與個案未核對。 | 0.90 |
| CSC-C03 | `[704,834)` | `advice` | `primary` | `provided` | TeachingModule | Skill＝含 SKILL.md（常附腳本）的資料夾；安裝＝把陌生人代碼交給 Agent。 | 0.98 |
| CSC-C04 | `[834,959)` | `advice` | `primary` | `provided` | MethodModule | 策展法：全裝後丟棄多數，留 13；連結直達 skill 夾而非 repo 根。 | 0.96 |
| CSC-C05 | `[976,1044)` | `interpretation` | `primary` | `provided` | TeachingModule | Design 區共同敵人：看起來像 AI 生成的輸出。 | 0.97 |
| CSC-C06 | `[1044,1434)` | `advice` | `secondary` | `unverified` | MethodModule | Frontend Design：先鎖定美學再寫碼，對抗紫漸層／Inter／圓角卡片預設品味。 | 0.94 |
| CSC-C07 | `[1434,1782)` | `advice` | `secondary` | `unverified` | MethodModule | UI UX Pro Max：可搜本地風格／色盤／字對／UX 指引庫，查詢代替即興。安裝指令進深度池。 | 0.91 |
| CSC-C08 | `[1782,2116)` | `advice` | `secondary` | `unverified` | MethodModule | Theme Factory：十套預設主題一鍵套用到投影片／文件／落地頁；作者日用。 | 0.93 |
| CSC-C09 | `[2116,2469)` | `advice` | `secondary` | `unverified` | MethodModule | Canvas Design：先寫具名設計哲學再執行；「先信念再海報」差距一眼可見。 | 0.94 |
| CSC-C10 | `[2469,2796)` | `advice` | `secondary` | `unverified` | MethodModule | Algorithmic Art：p5.js 生成藝術＋互動 HTML 滑桿／隨機鈕調參。 | 0.92 |
| CSC-C11 | `[2812,2871)` | `interpretation` | `primary` | `provided` | TeachingModule | Build 區改「怎麼做工」而非「看起來怎樣」。 | 0.96 |
| CSC-C12 | `[2871,3342)` | `advice` | `secondary` | `unverified` | MethodModule | Superpowers：TDD／規劃／審查／worktree／子代理編排；改工作方式。時數宣稱進深度池。 | 0.94 |
| CSC-C13 | `[3342,3609)` | `advice` | `secondary` | `unverified` | MethodModule | Context7：拉入現行函式庫文件，對抗過期 API 幻覺。 | 0.97 |
| CSC-C14 | `[3609,3933)` | `advice` | `secondary` | `unverified` | MethodModule | Web Artifacts Builder：React／TS／Tailwind／shadcn 打成單 HTML；有路由狀態才值得，計數器可跳過。 | 0.93 |
| CSC-C15 | `[3951,4011)` | `interpretation` | `primary` | `provided` | TeachingModule | Control 區不華麗但佔真實時間。 | 0.95 |
| CSC-C16 | `[4011,4336)` | `advice` | `secondary` | `unverified` | MethodModule | Webapp Testing：Playwright 讓 Agent 自驗 UI，閉合手審迴路。 | 0.94 |
| CSC-C17 | `[4336,4647)` | `advice` | `secondary` | `unverified` | MethodModule | File Search：ripgrep＋ast-grep；語法樹搜尋才是差別價值。 | 0.93 |
| CSC-C18 | `[4647,5025)` | `advice` | `secondary` | `unverified` | MethodModule | Context Optimization：壓縮／遮罩／KV-cache／多代理分割；Agent「變笨」常是上下文垃圾而非模型不夠好。 | 0.96 |
| CSC-C19 | `[5052,5390)` | `advice` | `secondary` | `unverified` | MethodModule | Marketing Skills：CRO／文案／SEO／成長迴路；跨 Claude Code／Codex／Cursor。 | 0.90 |
| CSC-C20 | `[5390,5712)` | `advice` | `secondary` | `unverified` | MethodModule | Skill Creator：描述工作流→寫出帶 eval／測試的 SKILL.md，把私有挫敗變成可遵循技能。 | 0.95 |
| CSC-C21 | `[5738,5897)` | `advice` | `primary` | `provided` | MethodModule | 若只裝四套：Frontend Design、Context7、Superpowers、Skill Creator＝品味／準確／流程／自建；其餘情境再加。 | 0.98 |
| CSC-C22 | `[5908,6190)` | `advice` | `primary` | `provided` | MethodModule | 規則一：裝前讀 SKILL.md＝全部安全模型；官方十七套作者自述可 unread，社群必讀。 | 0.98 |
| CSC-C23 | `[6190,6358)` | `advice` | `primary` | `provided` | MethodModule | 規則二：不要裝三十套；搶上下文會抓錯 skill；先四套，痛點再加。 | 0.98 |

正常模塊 24（C00–C23）＋背景 1（B00）。各 skill 條目皆 `is_skill_signal=true`（方法／選型）；產品與數字 `unverified`。
