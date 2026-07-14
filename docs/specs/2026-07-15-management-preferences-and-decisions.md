# 管理層偏好與討論結論備忘

日期：2026-07-15
狀態：已實作
裁決來源：AOI 對話 2026-07-15（草案＋交接；不開路線 INI）
實作參照：`docs/management/preferences.md`、`docs/management/decisions.md`
後繼：無

## 問題

版本化交接能完整記錄「某次推送做了什麼」，但不足以承載：

- 使用者長期偏好（協作方式、文件寫法）
- 討論結論與理由（已有共識、尚未升格為 ADJ／canonical）

導致下輪 Agent 只靠交接，容易遺失偏好與討論脈絡。

## 決策

在 `docs/management/` 新增兩份**非執行真值**文件，不開路線 INI：

| 檔案 | 回答 | 壽命 |
|---|---|---|
| [preferences.md](../management/preferences.md) | 以後請怎麼做？ | 長期、少改 |
| [decisions.md](../management/decisions.md) | 談過什麼、結論為何？ | 中期；升格後標記或移出 |

與既有四層分工：

| 檔案 | 不承擔 |
|---|---|
| overview | 不存偏好／討論全文 |
| blueprint | 不寫協作習慣 |
| roadmap | 不做對話備忘；開放裁決仍只在此 |
| handover（近期／版本化） | 不做長期偏好庫 |

## 更新時機

1. 使用者明確說「記住」或拍板偏好 → 更新 `preferences.md`
2. 討論產出可複用結論、且尚未成為 ADJ → 追加 `decisions.md`
3. 結論已寫入 roadmap ADJ／blueprint／canonical → 在 `decisions.md` 標「已反映」或移出
4. 推送執行概況 → 仍只走版本化交接；不為純對話硬開交接

## 不變條件

1. 不建完整對話逐字稿。
2. `decisions.md` 不得變成第三份進度表。
3. 事項級現況仍以 `roadmap.md` 為唯一執行真值。
4. 本設計不進 canonical，除非日後另行裁決。
