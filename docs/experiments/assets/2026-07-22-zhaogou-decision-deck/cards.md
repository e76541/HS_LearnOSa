# 趙構決策牌組｜八張人工 DecisionCard（試作）

- 日期：2026-07-22
- 目的：若你是趙構，在靖康之變中作出會改變路線的必要判斷，並取得可執行的下一步。
- 證據：`ZJG-Cxx` 來自 [趙構文本管線試作](../../2026-07-22-zhaogou-jingkang-text-pipeline-spike.md)；非正式 module_id；多數 `unverified`／ASR 還原風險。
- 限制：紙上投影，不回寫證據層；`DC-xx` 非正式 card_id。

通用 Guide 提示（歷史域細項，非封閉 schema）：正當性｜軍事控制｜情報可信｜時間窗口｜可逆性。

---

## DC01｜是否應命／自願入金營為質

```yaml
DecisionCard:
  card_id: DC01
  decision: 金人索親王為質時，是否前往金營
  why_now: 圍城議和窗口；拒絕可能破局，前往則個人安危與家族政治同時押上
  trigger_conditions: 第一次汴京之圍、需親王為質
  readiness:
    decision_ready: true
    authority: 皇帝／欽宗點派；皇子可請行或被點
    information_sources: 斡離不來書（文稱點趙楷）、朝中議論
    source_conflicts: 點名說 vs 公開選拔自願說（作者偏信自願）
    unknowns: 金營真實意圖、停留多久、是否可換質
    deadline: 議和談判進行中
    can_wait: false（圍城壓力下拖延成本高）
  guide_refs: [G-hostage]
  selected_concerns: [正當性, 可逆性, 情報可信]
  options:
    - option_id: O1-go
      label: 前往為質（自願或應命）
      fit_conditions: 願以人身換議和空間；能承受敵營風險
      impacts:
        - concern_id: 正當性
          direction: +
          explanation: 事後可主張為江山請行，累積政治資本
        - concern_id: 可逆性
          direction: -
          explanation: 人身在敵手，短期難自主脫身
      risks: 被扣留、成為談判籌碼
      reversibility: 低
      next_cards: [DC02]
    - option_id: O1-refuse
      label: 規避／推給其他親王
      fit_conditions: 自認非點名人選、或能運作承辦環節
      impacts:
        - concern_id: 正當性
          direction: -
          explanation: 可能被視為畏縮；錯過唯一翻身窗口
      risks: 其他人質路徑改寫歷史；自身繼續邊緣
      reversibility: 中
      next_cards: []
  assumptions: []
  evidence_refs:
    - ZJG-C02 [723,1540)
  diagnostic_prompts: [能否說明赴營後最低可接受條件]
  minimal_learning_refs: [ZJG-C02]
  completion_rule: 已選並能說出理由與主要風險
```

**Guide G-hostage 考量**：正當性（為誰犧牲）｜情報可信（金人要誰）｜可逆性（換質機制）｜時間窗口（圍城）｜軍事控制（城內勤王是否到位）。

---

## DC02｜離京議和：是否再赴敵營

```yaml
DecisionCard:
  card_id: DC02
  decision: 二圍之下，是否依王雲所報再赴金營議和
  why_now: 欽宗交代議和條件；離京即可能永別汴梁
  trigger_conditions: 王雲帶回「最好康王」要求；構奉命離京
  readiness:
    decision_ready: false
    authority: 欽宗任命出使；康王執行
    information_sources: 王雲口述、宋人記載、後人對金方資料的轉述
    source_conflicts: 王雲稱要康王；金方資料傳為肅／景等王（作者稱王雲說謊）
    unknowns: 金方真實點名人選、國書禮物是否還在、過河後能否全身而退
    deadline: 兩路金兵已渡河，包圍在即
    can_wait: true（可先核對金方原話／暫緩北行，但政治壓力大）
  guide_refs: [G-second-mission]
  selected_concerns: [情報可信, 時間窗口, 可逆性]
  options:
    - option_id: O2-proceed
      label: 依詔赴金營
      fit_conditions: 相信王雲、或寧可履詔
      impacts:
        - concern_id: 情報可信
          direction: -
          explanation: 若王雲說謊，等於自投指定以外的死棋
      risks: 再次為質且無換質紅包條件
      reversibility: 極低
      next_cards: []
    - option_id: O2-verify
      label: 暫緩並查證金方真實要求
      fit_conditions: 能接觸第二資訊源、願承擔違詔嫌疑
      impacts:
        - concern_id: 情報可信
          direction: +
          explanation: 降低被騙入營機率
        - concern_id: 時間窗口
          direction: -
          explanation: 延誤可能被視為抗命
      risks: 朝廷誤會、錯失議和姿態
      reversibility: 中
      next_cards: [DC03]
    - option_id: O2-divert
      label: 改道視察河北／留在前線城池
      fit_conditions: 有地方武將接應、國書任務已實質失敗
      impacts:
        - concern_id: 可逆性
          direction: +
          explanation: 保留人身與河北兵馬選項
      risks: 違出使本旨
      reversibility: 中高
      next_cards: [DC03, DC04]
  assumptions:
    - 若強制前進：假設王雲所報為真（文中並不支持）
  evidence_refs:
    - ZJG-C07 [3196,3664)
  diagnostic_prompts: [你如何驗證王雲沒有說謊]
  minimal_learning_refs: [ZJG-C07]
  completion_rule: 資訊不足時須先選查證／改道，不得直接推薦赴營為唯一解
```

**本牌為 S2「尚不能決定」主案例**：`decision_ready=false`，系統停在查證／改道，不代選赴營。

---

## DC03｜磁州：留磁 vs 繼續北行赴金

```yaml
DecisionCard:
  card_id: DC03
  decision: 國書禮物盡失後，在磁州留下還是繼續北行
  why_now: 出使任務已失敗；敵騎在城下；汪伯彥密報勸勿上金營
  trigger_conditions: 王雲被毆、宗澤勸留、相州有兵馬可迎
  readiness:
    decision_ready: true
    authority: 無完整軍事指揮權，但可決定行止
    information_sources: 宗澤、汪伯彥、城下敵情、輿情
    source_conflicts: 出使本旨 vs 前線武將／幕僚勸留
    unknowns: 汴梁此刻是否已危、汪伯彥兵力是否可靠
    deadline: 敵騎已近，拖延數日風險上升
    can_wait: false
  guide_refs: [G-cizhou]
  selected_concerns: [軍事控制, 情報可信, 可逆性]
  options:
    - option_id: O3-stay
      label: 留磁／轉相州，不上金營
      fit_conditions: 認出使已失敗；接受地方兵馬護身
      impacts:
        - concern_id: 軍事控制
          direction: +
          explanation: 取得從龍兵馬與河北據點
        - concern_id: 可逆性
          direction: +
          explanation: 保留日後大元帥／勸進路徑
      risks: 抗命形象、磁州仍近前線
      reversibility: 中
      next_cards: [DC04]
    - option_id: O3-north
      label: 補辦禮物後繼續赴金
      fit_conditions: 仍以履詔為最高優先
      impacts:
        - concern_id: 正當性
          direction: +
          explanation: 形式上完成出使
        - concern_id: 可逆性
          direction: -
          explanation: 人身再入敵手
      risks: 南宋起點不出現（作者反事實）
      reversibility: 極低
      next_cards: []
  assumptions: []
  evidence_refs:
    - ZJG-C08 [3666,4705)
    - ZJG-C09 [4705,5040)
  diagnostic_prompts: [沒有國書時出使還有沒有意義]
  minimal_learning_refs: [ZJG-C08, ZJG-C09]
  completion_rule: 選定行止並指出下一站（相州／金營）
```

---

## DC04｜密詔大元帥：硬衝勤王 vs 分屯待機

```yaml
DecisionCard:
  card_id: DC04
  decision: 受兵馬大元帥密詔後，立即渡河勤王還是分屯待機
  why_now: 八道密詔到位；黃河未凍／對岸金兵；稍後得知汴梁已破
  trigger_conditions: 大元帥府設立、勤王部隊湧入
  readiness:
    decision_ready: true
    authority: 密詔許便宜處置；但真實城況資訊滯後
    information_sources: 密詔、河北軍情、後續逃出密使
    source_conflicts: 「手提兩京」想像 vs 無法渡河／密詔勿妄動
    unknowns: 汴梁是否已破（收詔時可能已破四日）
    deadline: 冰封前後數日；密詔要求勿耽誤和議
    can_wait: true（分屯待機）／false（若認定城將破須即刻）
  guide_refs: [G-marshal]
  selected_concerns: [軍事控制, 時間窗口, 正當性]
  options:
    - option_id: O4-rush
      label: 找渡口硬衝勤王
      fit_conditions: 有船或冰面、願承受對岸防守
      impacts:
        - concern_id: 正當性
          direction: +
          explanation: 符合勤王期待
        - concern_id: 軍事控制
          direction: -
          explanation: 會議十日無案；草台風險高
      risks: 渡河失敗、主力折損
      reversibility: 低
      next_cards: [DC06]
    - option_id: O4-wait
      label: 分屯周邊、待機而行（順密詔）
      fit_conditions: 優先保兵與和議姿態
      impacts:
        - concern_id: 時間窗口
          direction: -
          explanation: 可能錯過救援窗
        - concern_id: 軍事控制
          direction: +
          explanation: 保全十萬級部隊於東平等
      risks: 被責「不勤王」；正當性動搖
      reversibility: 中
      next_cards: [DC05, DC06, DC07]
  assumptions: []
  evidence_refs:
    - ZJG-C09 [4705,5040)
    - ZJG-C10 [5040,5454)
  diagnostic_prompts: [你掌握的「城還在」證據強度有多高]
  minimal_learning_refs: [ZJG-C09, ZJG-C10]
  completion_rule: 選定勤王節奏並能說出對密詔「勿妄動」的態度
```

---

## DC05｜是否致書斡離不「講理退兵」

```yaml
DecisionCard:
  card_id: DC05
  decision: 是否寫信給斡離不要求退兵
  why_now: 黃潛善投奔後求表現；耿南仲指會暴露行蹤
  trigger_conditions: 大元帥府已有兵力、汴梁危急傳聞
  readiness:
    decision_ready: true
    authority: 大元帥可通信，但暴露座標
    information_sources: 黃潛善建議、耿南仲反論
    source_conflicts: 「有所作為」vs「害死康王」
    unknowns: 金人是否要求構本人回去談判
    deadline: 低；非必須立刻
    can_wait: true
  guide_refs: [G-letter]
  selected_concerns: [情報可信, 可逆性, 軍事控制]
  options:
    - option_id: O5-write
      label: 致書斡離不
      fit_conditions: 相信外交姿態有效
      impacts:
        - concern_id: 軍事控制
          direction: -
          explanation: 暴露行蹤，可能引來追擊
      risks: 被要求回營談判，去／不去皆難
      reversibility: 低
      next_cards: [DC07]
    - option_id: O5-reject
      label: 拒寫並外放提議者
      fit_conditions: 以保命與隱蔽為先
      impacts:
        - concern_id: 可逆性
          direction: +
          explanation: 避免不可逆暴露
      risks: 大元帥府被視為無作為
      reversibility: 高
      next_cards: [DC06, DC07]
  assumptions: []
  evidence_refs:
    - ZJG-C11 [5454,6657)
  diagnostic_prompts: [若對方回信要你本人去談，你的預設答案是什麼]
  minimal_learning_refs: [ZJG-C11]
  completion_rule: 選定寫／不寫並處理提議者人事
```

---

## DC06｜前鋒得勝後：追擊解圍 vs 禁追防伏

```yaml
DecisionCard:
  card_id: DC06
  decision: 濮陽／鄄城一線擊退金兵前隊後，是否追擊
  why_now: 宗澤大勝；主力可能跟進；禁追令與現場衝動衝突
  trigger_conditions: 前鋒接戰得手、大元帥禁追令是否送達
  readiness:
    decision_ready: true
    authority: 大元帥可下令；前線將領可能先動
    information_sources: 戰報、禁追令、汪伯彥事後嘲笑紀錄
    source_conflicts: 乘勝解圍 vs 防伏孤軍
    unknowns: 金兵主力位置、友軍是否協同
    deadline: 追擊窗口以小時／日計
    can_wait: false（現場）
  guide_refs: [G-pursuit]
  selected_concerns: [軍事控制, 時間窗口, 可逆性]
  options:
    - option_id: O6-pursue
      label: 追擊以求解汴
      fit_conditions: 有協同、情報確認非誘敵
      impacts:
        - concern_id: 時間窗口
          direction: +
          explanation: 可能創造解圍機會
        - concern_id: 軍事控制
          direction: -
          explanation: 文中結果為孤軍中伏
      risks: 全軍潰散
      reversibility: 極低
      next_cards: [DC07]
    - option_id: O6-hold
      label: 禁追、收兵防伏
      fit_conditions: 缺協同、疑誘敵
      impacts:
        - concern_id: 可逆性
          direction: +
          explanation: 保全主力
        - concern_id: 正當性
          direction: -
          explanation: 被責怯戰／不勤王
      risks: 士氣與輿論打擊
      reversibility: 中
      next_cards: [DC07]
  assumptions: []
  evidence_refs:
    - ZJG-C11 [5454,6657)
  diagnostic_prompts: [其他部隊是否收到同一道禁追令]
  minimal_learning_refs: [ZJG-C11]
  completion_rule: 下達並確認前線收到的追擊政策
```

---

## DC07｜父兄未歸：是否接受勸進稱帝

```yaml
DecisionCard:
  card_id: DC07
  decision: 二聖北狩、張邦昌勸進時，是否稱帝
  why_now: 偽楚已立；皇族統治正當性瀕崩；元祐太后手詔可補合法性
  trigger_conditions: 金兵退、勸進表上、太后仍在
  readiness:
    decision_ready: true
    authority: 需皇族長輩／手詔背書；否則薄弱
    information_sources: 張邦昌勸進、群僚／宗澤勸進、太后手詔
    source_conflicts: 父兄未歸稱帝的倫理 vs 趙氏政權存續
    unknowns: 二聖生死與回鑾可能
    deadline: 金人扶植偽政權後越拖越被動
    can_wait: true（等手詔）／短期
  guide_refs: [G-enthronement]
  selected_concerns: [正當性, 時間窗口, 可逆性]
  options:
    - option_id: O7-accept
      label: 接受勸進（最好先取太后手詔）
      fit_conditions: 有手詔或等價皇族認可
      impacts:
        - concern_id: 正當性
          direction: +
          explanation: 手詔提供皇族標章
        - concern_id: 可逆性
          direction: -
          explanation: 皇位無下台階
      risks: 被責篡奪；與父兄倫理衝突
      reversibility: 無
      next_cards: [DC08]
    - option_id: O7-defer
      label: 暫拒，繼續以大元帥／藩王身分運作
      fit_conditions: 仍期待二聖回鑾
      impacts:
        - concern_id: 正當性
          direction: +
          explanation: 倫理上較穩
        - concern_id: 時間窗口
          direction: -
          explanation: 偽楚與軍心可能改選他人
      risks: 失去號令天下機會
      reversibility: 中
      next_cards: [DC04]
  assumptions: []
  evidence_refs:
    - ZJG-C12 [6657,7360)
    - ZJG-C11 [5454,6657)
  diagnostic_prompts: [沒有太后手詔時你憑什麼稱帝]
  minimal_learning_refs: [ZJG-C12]
  completion_rule: 選定稱／不稱，並說明合法性來源
```

---

## DC08｜登基後：留用 vs 外放耿南仲等主和派

```yaml
DecisionCard:
  card_id: DC08
  decision: 登基後是否踢掉功高的主和派（耿南仲）並重用潛善／伯彥
  why_now: 年號爭議後人事洗牌；需收攏主戰人心又可能仍主和
  trigger_conditions: 建炎登基完成、決策核心重組
  readiness:
    decision_ready: true
    authority: 新帝可黜陟；代價是寒從龍之功
    information_sources: 《繫年要錄》「上薄南仲之為人」類敘述（未核）
    source_conflicts: 登基禮儀用得上南仲 vs 新政不宜留臭名主和派
    unknowns: 踢掉後主和路線是否仍暗續
    deadline: 上台首波人事
    can_wait: false（信號窗口）
  guide_refs: [G-personnel]
  selected_concerns: [正當性, 可逆性, 軍事控制]
  options:
    - option_id: O8-purge
      label: 外放南仲，重用潛善／伯彥
      fit_conditions: 要向主戰輿論示警／示好
      impacts:
        - concern_id: 正當性
          direction: +
          explanation: 切割前朝主和惡名
        - concern_id: 可逆性
          direction: -
          explanation: 寒從龍者，日後難再用其禮儀班底
      risks: 實際政策仍主和則被譏虛偽
      reversibility: 低
      next_cards: []
    - option_id: O8-keep
      label: 留南仲在決策核心
      fit_conditions: 優先體制熟悉度與議事連續
      impacts:
        - concern_id: 軍事控制
          direction: -
          explanation: 主戰派不服，號召力受损
      risks: 新政被視為主和延續
      reversibility: 中
      next_cards: []
  assumptions: []
  evidence_refs:
    - ZJG-C13 [7360,7810)
  diagnostic_prompts: [你要收攏的是哪一群人的心]
  minimal_learning_refs: [ZJG-C13]
  completion_rule: 選定核心人事並說出對主戰／主和信號的取捨
```

---

## 牌組觸發總表

| 當前牌 | 選 O? | 加入 | 移除／降優先 |
|---|---|---|---|
| DC01 | O1-go | DC02 | — |
| DC01 | O1-refuse | — | 後續河北線大幅降優先 |
| DC02 | O2-verify／divert | DC03、DC04 | 赴金主線 |
| DC02 | O2-proceed | — | DC03～DC08（若入營失敗路徑） |
| DC03 | O3-stay | DC04 | 赴金 |
| DC04 | O4-wait | DC05、DC06、DC07 | 硬衝主線 |
| DC04 | O4-rush | DC06 | DC05 降優先 |
| DC05 | 任一 | DC06／DC07 | — |
| DC06 | 任一 | DC07 | — |
| DC07 | O7-accept | DC08 | 大元帥待機線 |
| DC07 | O7-defer | DC04 | DC08 |
| DC08 | 任一 | — | 本 GoalSession 核心決策結束 |
