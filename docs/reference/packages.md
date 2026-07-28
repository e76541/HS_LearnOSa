# 常用套件／Skill 索引

本文件登記名稱、用途、**來源網址**與檢測／安裝指令。不內嵌 Skill 正文、不安裝檔、不鎖版本。

需要使用時，再依網址拉取（clone／下載 Skill／開文件站）。列於本索引不代表目標專案已安裝。

| 名稱 | 功能 | 來源網址 |
|---|---|---|
| archify | 產生架構／流程圖（深淺色切換，可匯出 PNG／JPEG／WebP／SVG） | https://github.com/tt-a1i/archify |
| mattpocock-skills | 工程工作流 Skill 包（grill／TDD／domain modeling／code-review 等） | https://github.com/mattpocock/skills |
| fireworks-tech-graph | 自然語言產出技術圖（SVG／PNG／GIF／離線 HTML；多風格、UML、Agent 流程） | https://github.com/yizhiyanhua-ai/fireworks-tech-graph |
| ECC | Agent harness 作業系統（skills／hooks／rules／記憶／安全；跨 Claude Code／Codex／Cursor 等） | https://github.com/affaan-m/ECC |
| graphify | 將程式碼／文件／PDF／圖片轉成可查詢知識圖譜（本地 AST、邊可稽核；觸發 `/graphify`） | https://github.com/Graphify-Labs/graphify |
| awesome-design-skills | 設計系統 Skill 登錄庫（SKILL.md／DESIGN.md；依風格拉取給 Cursor／Claude／Codex 等） | https://github.com/bergside/awesome-design-skills |
| i-have-adhd | ADHD-friendly 輸出風格（先動作、步驟編號、無鋪墊／收尾廢話） | https://github.com/ayghri/i-have-adhd |

Skill 入口（需要時再拉）：
- archify：https://github.com/tt-a1i/archify/blob/main/archify/SKILL.md  
  說明站：https://tt-a1i.github.io/archify/
- mattpocock-skills：https://github.com/mattpocock/skills（安裝後先跑 `/setup-matt-pocock-skills`）
- fireworks-tech-graph：https://github.com/yizhiyanhua-ai/fireworks-tech-graph/blob/main/SKILL.md  
  說明站：https://yizhiyanhua-ai.github.io/fireworks-tech-graph/
- ECC：https://github.com/affaan-m/ECC（插件識別 `ecc@ecc`；npm 包名 `ecc-universal`）  
  說明站：https://ecc.tools
- graphify：https://github.com/Graphify-Labs/graphify/blob/main/skills/graphify/skill.md  
  PyPI：`graphifyy`（CLI／Skill 指令仍為 `graphify`）
- awesome-design-skills：https://github.com/bergside/awesome-design-skills（索引 `skills/index.json`；各風格在 `skills/<slug>/`）  
  預覽站：https://typeui.sh/design-skills
- i-have-adhd：https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md  
  安裝說明：https://github.com/ayghri/i-have-adhd/blob/main/INSTALL.md（插件識別 `i-have-adhd@i-have-adhd`）

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

### fireworks-tech-graph

| 項目 | 指令 |
|---|---|
| 檢測 | `python3 "$HOME/.agents/skills/fireworks-tech-graph/scripts/fireworks.py" doctor` |
| 安裝 | `npx -y skills@1.5.17 add yizhiyanhua-ai/fireworks-tech-graph/skills/fireworks-tech-graph --agent codex claude-code -g -y --copy` |
| 渲染依賴（PNG） | `python3 -m pip install cairosvg` |

必須用嵌套路徑 `.../skills/fireworks-tech-graph`；裸倉庫路徑可能只裝到根目錄 `SKILL.md`。安裝落點為 `~/.agents/skills/fireworks-tech-graph`（Claude Code 另有 `~/.claude/skills/fireworks-tech-graph`）。需 Python 3.9+；GIF 動效另需 FFmpeg 與 puppeteer-core（見上游 README）。

### ECC

| 項目 | 指令 |
|---|---|
| 檢測 | `npx -y ecc doctor`（或 clone 後 `node scripts/ecc.js doctor`） |
| 安裝（推薦） | Claude Code：`/plugin marketplace add https://github.com/affaan-m/ECC` → `/plugin install ecc@ecc` |
| 安裝（手動） | `npx -y ecc-install --profile minimal --target claude`（完整面改 `--profile full`） |

**只選一條安裝路徑**，勿把 `/plugin install` 與 `ecc-install`／`install.sh --profile full` 疊加（會重複 skills／hooks）。插件裝好後若要 rules，只手動拷 `rules/` 需要的語言目錄到 `~/.claude/rules/ecc/`。不確定裝什麼時可先跑 `npx -y ecc consult "<需求>" --target claude`。

### graphify

| 項目 | 指令 |
|---|---|
| 檢測 | `python3 -c "import graphify"` |
| 安裝 | `pip install graphifyy && graphify install` |
| 替代安裝 | `pipx install graphifyy`（macOS externally-managed 或 Windows PATH 問題時）後再跑 `graphify install` |

需 Python 3.10+。PyPI 暫名 `graphifyy`，CLI／Skill 指令仍為 `graphify`。`graphify install` 會把 Skill 裝到 `~/.claude/skills/graphify/SKILL.md`；觸發指令為 `/graphify`。輸出落在目標目錄的 `graphify-out/`（`graph.html`、`graph.json`、`GRAPH_REPORT.md` 等）。

### awesome-design-skills

| 項目 | 指令 |
|---|---|
| 檢測 | `npx typeui.sh list` |
| 安裝（拉取單一風格） | `npx typeui.sh pull <slug>`（例：`npx typeui.sh pull glassmorphism`） |
| 指定目標 | `npx typeui.sh pull <slug> -p cursor,claude` |
| 預覽不寫檔 | `npx typeui.sh pull <slug> --dry-run` |

本庫是登錄庫，不整包安裝；依風格 slug 按需拉取 `SKILL.md` 到專案的 provider 路徑（如 `.cursor/skills/`、`.claude/`）。`DESIGN.md` 留在上游 repo 供人讀。瀏覽清單與預覽見 https://typeui.sh/design-skills；CLI 來源 https://github.com/bergside/typeui.sh。

### i-have-adhd

| 項目 | 指令 |
|---|---|
| 檢測（Cursor 等） | `npx skills list`（全域：`npx skills ls -g`） |
| 安裝（Cursor 等） | `npx skills add ayghri/i-have-adhd -g`（單 agent：`npx skills add ayghri/i-have-adhd -a cursor -y`） |
| 安裝（Claude Code） | `claude plugin marketplace add ayghri/i-have-adhd` → `claude plugin install i-have-adhd@i-have-adhd` |
| 安裝（Codex） | `codex plugin marketplace add ayghri/i-have-adhd --ref main` → `codex plugin add i-have-adhd@i-have-adhd` |

預設 `disable-model-invocation: true`，裝了不會自動生效；需輸入 `/i-have-adhd`（Codex：`$i-have-adhd`）才套用。其他 agent 見上游 [INSTALL.md](https://github.com/ayghri/i-have-adhd/blob/main/INSTALL.md)。

## 登記原則

- 每個名稱只保留一筆主要索引。
- 功能欄只寫最主要用途。
- 只存官方 Repo／Skill／文件站連結；不把 Skill 全文拷進本庫或本包。
- 需要時再從來源網址拉取；本索引不維護本機安裝狀態。
- 已不再建議使用的項目從現行索引移除，必要時留在 `records/` 歷史存檔。
