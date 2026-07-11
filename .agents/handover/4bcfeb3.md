# 交接（4bcfeb3）

供接手人員與 Agent 快速進入專案。規則細節以其他模塊為準，本檔不重複全文。

## 專案概要

| 項目 | 內容 |
|------|------|
| 名稱 | HS_LearnEdge |
| 用途 | Learning Edge 的 Agent 指引與文本規則模塊 |
| 倉庫 | https://github.com/e76541/HS_LearnEdge |
| 預設分支 | `master` |
| 本機路徑 | `C:\Users\User\Documents\HS_LearnEdge` |

## 推送 ID

| 項目 | 值 |
|------|-----|
| 推送 ID | `4bcfeb3` |
| 訊息 | Add agent guidance modules and entry files. |
| 說明 | 製作本版交接手冊前的基線推送 |

## 目錄結構

```
HS_LearnEdge/
├── AGENTS.md          # Cursor / Codex 入口
├── CLAUDE.md          # Claude Code 入口
├── HANDOVER.md        # 指向交接模塊
└── .agents/
    ├── communication.md
    ├── text-intake.md
    ├── text-id.md
    ├── modularity.md
    ├── edges.md
    ├── drawing.md
    ├── handover.md    # 交接索引（版本表、製作流程）
    └── handover/      # 交接手冊各版本（檔名 = 推送 ID）
        └── 4bcfeb3.md
```

## 入口檔差異

| 檔案 | 讀者 | 引用方式 |
|------|------|----------|
| `AGENTS.md` | Cursor、Codex 等 | Markdown 連結 |
| `CLAUDE.md` | Claude Code | `@.agents/...` 語法 |

兩者共用同一套 `.agents/` 模塊；**勿在入口檔重複模塊全文**，只保留索引與必讀摘要。

## 核心流程

### 文本收錄

```
Inbox（暫存）
  ├─ 主要收錄類型 → DocStocks
  └─ 其餘類型     → DocToSave
```

- 收錄完成後才轉出 Inbox
- 主要收錄類型清單：待自 Learning OS v0.2 變更清單補齊（見下方待辦）

### 文本 ID

- 各類型分別記錄 ID
- 複合類型：元素較多者優先；相等則以標題為準

### 模塊化

- 一模塊一事；模塊末尾附文本 ID
- 內容相近且可替換時：ID 轉至較佳模組
- 子規則：**邊**（RST 關係）、**繪圖**（文本類型影響）

## 模塊索引

| 模塊 | 路徑 | 職責 |
|------|------|------|
| 溝通 | `.agents/communication.md` | 回覆語言、簡潔度、解釋時機 |
| 文本收錄 | `.agents/text-intake.md` | Inbox → DocStocks / DocToSave |
| 文本 ID | `.agents/text-id.md` | ID 記錄與複合類型判定 |
| 模塊化 | `.agents/modularity.md` | 拆分原則、ID 附掛、子規則索引 |
| 邊 | `.agents/edges.md` | RST 關係清單 |
| 繪圖 | `.agents/drawing.md` | 文本類型對繪圖的影響 |
| 交接 | `.agents/handover.md` | 版本索引、製作流程 |

## 溝通要點（Agent 必讀）

- 繁體中文；簡潔；無鋪墊／後綴／重複問題
- 要點與短句；避免模稜兩可
- 僅在詢問或選項不明時解釋原因

## 待辦（接手優先）

以下內容尚未寫入 repo，需參照 **Learning OS — 結構層與練習層 v0.2 變更清單** 後與專案負責人確認：

| 項目 | 應寫入模塊 | 狀態 |
|------|------------|------|
| 主要收錄類型清單 | `.agents/text-intake.md` | 待補 |
| RST 關係清單 | `.agents/edges.md` | 待補 |
| 繪圖規則細節 | `.agents/drawing.md` | 待補 |
| v0.2 變更清單本體 | 建議 `.agents/learning-os-v0.2-changelog.md` | 待收錄 |

不確定時：**先查 v0.2 清單 → 與使用者討論 → 再更新模塊**。

## 維護慣例

### 新增或修改規則

1. 編輯對應 `.agents/*.md`（不寫進入口檔全文）
2. 若影響必讀摘要，同步更新 `AGENTS.md` 與 `CLAUDE.md` 摘要區
3. 提交訊息簡述「為何」而非僅「改了什麼」

### 模塊命名

- 檔名英文、標題中文
- 一檔一事；跨工具共用

## Git 與推送

```powershell
cd C:\Users\User\Documents\HS_LearnEdge
git status
git add .
git commit -m "說明變更原因"
git push
```

| 項目 | 說明 |
|------|------|
| 遠端 | `https://github.com/e76541/HS_LearnEdge.git` |
| 協定 | 本機已改 HTTPS（SSH 曾 `Permission denied`） |
| 帳號 | GitHub `e76541`；推送前確認 `gh auth status` |

初次 clone：

```powershell
git clone https://github.com/e76541/HS_LearnEdge.git
```

## 已完成項目（截至交接）

- [x] Agent 入口檔 `AGENTS.md`、`CLAUDE.md`
- [x] 規則模塊（`.agents/`）
- [x] Git 初始化與首次推送至 GitHub
- [x] 交接模塊與版本資料夾

## 建議接手順序

1. 讀 `AGENTS.md` 必讀摘要與交接模塊
2. 讀本版交接手冊（`.agents/handover/4bcfeb3.md`）
3. 依序讀 `.agents/` 各模塊
4. 取得 Learning OS v0.2 變更清單，補齊待辦三項
5. 依實際 Inbox / DocStocks / DocToSave 路徑驗證收錄流程
6. 補 RST 關係與繪圖規則後，再擴充其他模塊

## 聯絡與決策

- 規則歧義、類型邊界、ID 衝突：與專案負責人討論後才改模塊
- 勿在模塊未更新前自行假設主要收錄類型或 RST 關係
