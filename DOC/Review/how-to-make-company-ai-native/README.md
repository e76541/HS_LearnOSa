# How to Make a Company AI-Native

來源：使用者貼文（Limestone Digital / limestonedigital.com）<br>
狀態：`DOC/Review` · 已完成入口判定、模塊化與抽邊 · `needs_review`<br>
文本 ID：`PENDING-how-to-make-company-ai-native`（暫時來源鍵；缺落地規則／序號簿，`needs_review`）<br>
規範入口：`Library/CURRENT.md` → `module-layer` / `identity-terminology`

## 入口三問（`module-layer` §2.5）

| 問 | 判定 |
|---|---|
| 有原文未主張之主張？ | 無 → 不棄 |
| 主張可獨立成立？ | 是 → **正常來源**，走完整管線 |
| 有具體斷邊題要一次用？ | 否 |

結論：正常來源。非入口淘汰、非一次性素材。

## 已完成粗切（遵守 P3，避免再犯 13 切過細）

| 序 | 命題簇 | 型別 | 技能訊號 | 備註 |
|---|---|---|---|---|
| M00 | 三警告：失敗因缺 baseline／gates／governance／owner | Analysis | 是 | 邊界 `needs_review` |
| M01 | 五階梯子 00–04（Git history 分級） | Teaching | 是 | 概念框架 |
| M02 | Climb→00：先量測（系統非人；adoption=進 main） | Method | 是 | |
| M03 | 00→01：標準工具鏈 + senior gate | Method | 是 | exit test 明確 |
| M04 | 01→02：單工作流 agentic + deterministic gates | Method | 是 | |
| M05 | 兩人 pod 的交付收據 | Case | 是 | `exemplifies` M04 |
| M06 | 02→03：產品化 AI + cost meter | Method | 是 | |
| M07 | 03→04：control plane 四件 | Method | 是 | |
| M08 | 每階讀 delta；不正當則停 | Method | 是 | 全梯總規則 |
| FILL | 開頭導流、What we sell、P.S. CTA | — | 否、非背景 | 純填充，不進下游 |

強制拆分依據：各 climb 外部依賴不同（telemetry ≠ toolchain ≠ workflow agent ≠ product meter ≠ control plane）；具體 pod 收據另成 CaseModule。

## 本篇執行結果

- 收錄入口：**已跑**（三問有出口）。
- 模塊化：**已跑**；見 [`modules.md`](modules.md)，但 schema 與來源 ID 仍待人工裁決。
- 模塊判定待覆核：警告數據與四缺口是否應拆成背景模塊加分析模塊；目前保留為同一動機命題簇。
- 抽邊：**已跑**；見 [`edges.md`](edges.md)，共 19 條有原文證據的邊。
- 對齊／練習／演講：**未跑**（登記簿與下游產物格式皆缺）。
- 模塊篩選試點：見 [`selection.md`](selection.md)（設計草案手寫；尚未 canonical、下游尚未自動讀取）。
- DOC 轉出：**已完成**；因主要文章類型與正式文本 ID 未裁決，轉入 `DOC/Review/` 並登記於 `DOC/INDEX.md`。

## 流程問題清單（對專案）

見同目錄 [`PROCESS-FINDINGS.md`](PROCESS-FINDINGS.md)。
