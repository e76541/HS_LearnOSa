# 篩選機制與模塊大小設定

常駐參考；版本化交接見 `.agents/handover/` 各版。規範衝突時以 `Library/CURRENT.md` 指向的 canonical 為準。

## 篩選機制

管線與視圖對內容有兩種排除方式：**主動不要**（明示裁決、留痕）與**被動忽略**（保留證據、特定下游預設不讀或不顯）。

| | 主動不要 | 被動忽略 |
|---|---|---|
| 性質 | 明示排除或暫停 | 資料在，但某層／某視圖預設不消費 |
| 是否留痕 | 必須（理由、disposition、或索引狀態） | 依層規則隱含；視圖篩選不改正式資料 |
| 能否回復 | 需重新收錄或人工裁決 | 切換視圖／層即可看見 |

### 主動不要

下列情況依各自規則不得進對應下游；其中來源級淘汰或整篇拒絕不得進正式 DOC。須留下可追查紀錄：

| 情境 | 紀錄方式 | 規範／Skill |
|---|---|---|
| 入口三問判定淘汰 | 不保存原文 | `10-模塊層` §2.5 入口三問 |
| 純填充區間 | `modules.md` 非技能訊號表：`disposition: pure_fill` | `10-模塊層` §2.4 |
| 零散來源 attach-only 未命中 | 退回候選池，不建模塊 | `10-模塊層` §2.5 |
| 類型／品質／裁決不確定 | `DOC/Review` + `needs_review` + `review_reason` | `ingest-text` |
| 簇或依賴無法確定 | 模塊標 `needs_review`，不自動切分 | `modularize-text` |
| 邊信心不足 | 不建邊（寧缺勿錯） | `extract-structure` |
| 使用者／Agent 明示整篇來源「不要／排除」 | 記錄排除理由；不進正式圖或 DOC | 專案操作約定 |

**原則**：主動不要 = 有決策、有理由；不可 silent delete。

已收錄來源內的模塊級排除尚未啟用；其候選路徑與資料邊界見 `docs/specs/2026-07-14-module-selection-design.md`。設計升格前，不得把模塊級偏好改標為 `pure_fill`，也不得直接改寫 `modules.md` 或 `edges.md`。

### 被動忽略

下列情況**保留**於 `modules.md`／`edges.md` 或原文，但特定層或視圖預設不讀、不顯、不計分：

| 情境 | 忽略範圍 | 規範／Skill |
|---|---|---|
| 背景模塊 | 不進對齊、不當圖式主體、不當考點；可作邊端點 | `10-模塊層` §2.6 |
| 素材 hooks | 不獨立成節點、不進邊層 | `10-模塊層` §2.1a |
| 細粒度推理鏈 | 留在模塊內，不上邊層 | `20-結構層`、`extract-structure` |
| 登記層 `broader_than` | 不進模塊論證圖 | P5a、`render-knowledge-views` |
| 匹配引擎 | 只讀 ModuleCore 核心投影 | P5 |
| 知識視圖篩選（Phase 1） | 隱藏背景、邊類型篩選——只改投影 | `knowledge-visualizer-design` |
| Inline 視圖 | 無執行期篩選；預生成固定投影 | `inline-diagram-module-viz-plan` Phase 0 |

**原則**：被動忽略 = 證據真值不變；只是該層／該視圖的預設消費範圍較窄。

### 判斷速查

```text
有無明示裁決或 needs_review／disposition？
  ├─ 是 → 主動不要（查理由是否已寫）
  └─ 否 → 被動忽略（查該層消費規則）
```

## 模塊大小設定

模塊「大小」指 **`char_span` 所覆蓋的命題範圍**，不是視圖節點字數。

### 不可違反（canonical）

| 規則 | 來源 |
|---|---|
| 模塊是索引面，不是閱讀面 | P1 |
| 禁止以縮小節點粒度（心智圖式短標籤）換結構 | P3 |
| 主要命題須屬同一命題簇 | `10-模塊層` §2.2 |
| 不同簇、不同外部依賴目標 → **強制拆分** | §2.2 |
| 細粒度機制留模塊內，不為補資訊造過細節點 | `extract-structure` |

### 拆分／合併判準

**留在同一模塊**（至少符合一項）：

- 一者詳述另一者
- 一者例示另一者
- 兩者構成不可分割的機制
- 移除任一者使另一者語義不完整

**必須拆分**：

- 不同命題簇
- 各自依賴不同外部目標（例：SRC-002 各 climb 段）

**不可僅因**主題相同、段落相鄰、或視圖太擠而拆／併。

### 操作參數

| 參數 | 用途 | 預設／備註 |
|---|---|---|
| `char_span` | 模塊證據區間；LF 正規化、零起算半開 `[start,end)` | 每模塊必填；缺則不進圖 |
| `local_window` | 邊抽取第一遍：模塊序號最大距離 | 術語見 `60-文本身份與術語`；實際值記於來源 `edges.md` 或處理註記 |
| 視圖節點標籤 | Mermaid 顯示用 | `title｜module_id`；可截斷顯示，**不**改模塊定義 |
| 焦點鄰域跳數 | Inline／Phase 1 圖譜 | **1**（只顯示一階上下游） |

### 參考尺度（非硬上限）

Review 範例 `how-to-make-company-ai-native`（9 模塊、11848 字）：

| 模塊 | char_span 長度 | 類型 |
|---|---|---|
| M00 | 697 | Analysis |
| M01 | 2551 | Teaching |
| M02–M08 | 約 864–1734 | Method / Case |

僅供感受「一簇一命題」的實際尺度；**不得**機械套用字數切分。

### 常見錯誤

| 錯誤 | 正確做法 |
|---|---|
| 為讓圖好看而拆短句模塊 | 維持命題簇；用邊補關係（P3） |
| 把 pure_fill 建成技能模塊 | 只記 disposition 表，不進下游 |
| 把 background 當正常模塊對齊 | 被動忽略對齊；渲染時可選讀 |
| 視圖截斷標籤當成模塊摘要 | 回 `char_span` 取原文 |

## 關聯檔案

- `Library/規範/10-模塊層.md` — 拆分、背景、純填充
- `Library/規範/20-結構層.md` — 邊粒度
- `Library/規範/00-設計原則.md` — P1、P3
- `.agents/skills/modularize-text/SKILL.md`
- `.agents/skills/extract-structure/SKILL.md`
- `.agents/skills/render-knowledge-views/SKILL.md`
- `docs/specs/2026-07-13-knowledge-visualizer-design.md` — 視圖篩選（Phase 1）
- `docs/specs/2026-07-14-module-selection-design.md` — 模塊級主動排除候選設計
