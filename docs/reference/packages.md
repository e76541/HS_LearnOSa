# 常用套件／Skill 索引

本文件登記名稱、用途、**來源網址**與檢測／安裝指令。不內嵌 Skill 正文、不安裝檔、不鎖版本。

需要使用時，再依網址拉取（clone／下載 Skill／開文件站）。列於本索引不代表目標專案已安裝。

| 名稱 | 功能 | 來源網址 |
|---|---|---|
| archify | 產生架構／流程圖（深淺色切換，可匯出 PNG／JPEG／WebP／SVG） | https://github.com/tt-a1i/archify |
| mattpocock-skills | 工程工作流 Skill 包（grill／TDD／domain modeling／code-review 等） | https://github.com/mattpocock/skills |

Skill 入口（需要時再拉）：
- archify：https://github.com/tt-a1i/archify/blob/main/archify/SKILL.md  
  說明站：https://tt-a1i.github.io/archify/
- mattpocock-skills：https://github.com/mattpocock/skills（安裝後先跑 `/setup-matt-pocock-skills`）

## Agent 缺件自檢流程

需要使用本索引套件時，依序執行；只有安裝失敗才回報使用者，不得因缺件直接放棄任務：

1. **檢測**：跑該套件的檢測指令；通過即直接使用。
2. **缺件**：依該套件的安裝指令自行安裝，裝完重跑檢測。
3. **失敗**：回報失敗原因與已嘗試步驟，改用最小可行替代（如 Mermaid 純文字圖）。

### archify

| 項目 | 指令 |
|---|---|
| 檢測 | `node ~/.agents/skills/archify/bin/archify.mjs doctor` |
| 安裝 | `npx -y skills add tt-a1i/archify -g` |
| 渲染 | `node ~/.agents/skills/archify/bin/archify.mjs render <type> <input>.json <output>.html` |

安裝落點為 `~/.agents/skills/archify`（各家 agent 以符號連結共用，Claude Code 見 `~/.claude/skills/archify`）。渲染輸出為自包含 HTML，**看圖零依賴**；只有重渲染需要本套件與 Node.js。

指令中的 `~` 為使用者家目錄，僅 POSIX shell 會自動展開；PowerShell／cmd 下改用 `$HOME`（如 `node $HOME/.agents/skills/archify/bin/archify.mjs doctor`）。檢測失敗時先確認路徑展開正確，再判定缺件。

### mattpocock-skills

| 項目 | 指令 |
|---|---|
| 檢測 | `test -d ~/.agents/skills/setup-matt-pocock-skills`（PowerShell：`Test-Path "$HOME/.agents/skills/setup-matt-pocock-skills"`） |
| 安裝 | `npx -y skills add mattpocock/skills -g -s '*'` |
| 首次設定 | 目標專案內執行 `/setup-matt-pocock-skills`（選 issue tracker、triage labels、文件落點） |

安裝落點為 `~/.agents/skills/<skill-name>`（各家 agent 以符號連結共用）。本套為多個 Skill 的集合，缺任一常用 skill 時重跑安裝指令即可；正式工程流程前須完成「首次設定」。

## 登記原則

- 每個名稱只保留一筆主要索引。
- 功能欄只寫最主要用途。
- 只存官方 Repo／Skill／文件站連結；不把 Skill 全文拷進本庫或本包。
- 需要時再從來源網址拉取；本索引不維護本機安裝狀態。
- 已不再建議使用的項目從現行索引移除，必要時留在 `records/` 歷史存檔。
