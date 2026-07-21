import { useState } from 'react';
import { STAGE_SPEC, STAGE_STATUS_LABEL } from '../constants';
import { isPendingSource } from '../data';
import type { DocProjection, SourceManifest, WarningRecord } from '../types';

interface Props {
  manifest: SourceManifest;
  projection: DocProjection;
  loadWarnings: WarningRecord[];
}

interface MetricCard {
  label: string;
  value: number | string;
  hint?: string;
}

/** 分頁一：控制室儀表板 — 指標卡 + 完整管線階段 + 警示 */
export function PipelineTab({ manifest, projection, loadWarnings }: Props) {
  const { stages, metrics } = projection.pipeline;
  const [selectedStageId, setSelectedStageId] = useState<string | null>(stages[0]?.id ?? null);

  const pendingSourceCount = manifest.sources.filter((s) => isPendingSource(s.source_id)).length;
  const cards: MetricCard[] = [
    { label: '來源數', value: manifest.sources.length, hint: '已同步 DOC 投影' },
    { label: '技能模塊', value: metrics.skill_module_count, hint: `共 ${metrics.module_count} 模塊` },
    { label: '背景模塊', value: metrics.background_module_count, hint: '不參與分層與考點' },
    { label: '結構邊', value: metrics.edge_count, hint: 'canonical 七類' },
    {
      label: '待覆核',
      value: pendingSourceCount + stages.filter((s) => s.status === 'pending').length,
      hint: 'PENDING 來源與待處理階段',
    },
  ];

  const allWarnings: WarningRecord[] = [...projection.warnings, ...loadWarnings];
  const selectedStage = stages.find((s) => s.id === selectedStageId);
  const spec = selectedStage ? STAGE_SPEC[selectedStage.id] : undefined;

  return (
    <div className="pipeline-tab">
      <div className="metric-cards" role="list" aria-label="管線指標">
        {cards.map((c) => (
          <div key={c.label} className="metric-card" role="listitem">
            <div className="metric-card__value">{c.value}</div>
            <div className="metric-card__label">{c.label}</div>
            {c.hint && <div className="metric-card__hint">{c.hint}</div>}
          </div>
        ))}
      </div>

      <h2 className="section-title">處理管線</h2>
      <div className="stage-flow" role="list" aria-label="管線階段">
        {stages.map((stage, i) => (
          <div key={stage.id} className="stage-flow__unit" role="listitem">
            {i > 0 && (
              <span className="stage-flow__arrow" aria-hidden="true">
                →
              </span>
            )}
            <button
              type="button"
              className={`stage-card${selectedStageId === stage.id ? ' is-active' : ''}${
                stage.status === 'pending' ? ' is-pending' : ''
              }`}
              onClick={() => setSelectedStageId(stage.id)}
              aria-pressed={selectedStageId === stage.id}
            >
              <span className="stage-card__label">{stage.label}</span>
              <span className={`stage-card__status stage-card__status--${stage.status}`}>
                {STAGE_STATUS_LABEL[stage.status] ?? stage.status}
              </span>
              <span className="stage-card__count">產物 {stage.artifact_count}</span>
              {stage.note && <span className="stage-card__note">{stage.note}</span>}
            </button>
          </div>
        ))}
      </div>

      {selectedStage && (
        <div className="stage-detail" aria-live="polite">
          <h3 className="stage-detail__title">
            {selectedStage.label}
            <span className={`stage-card__status stage-card__status--${selectedStage.status}`}>
              {STAGE_STATUS_LABEL[selectedStage.status] ?? selectedStage.status}
            </span>
          </h3>
          <dl className="stage-detail__grid">
            <div>
              <dt>輸入</dt>
              <dd>{spec?.inputs ?? '（尚無規範說明）'}</dd>
            </div>
            <div>
              <dt>輸出</dt>
              <dd>{spec?.outputs ?? '（尚無規範說明）'}</dd>
            </div>
            <div>
              <dt>規範限制</dt>
              <dd>{spec?.constraints ?? '（尚無規範說明）'}</dd>
            </div>
            <div>
              <dt>產物數</dt>
              <dd>{selectedStage.artifact_count}</dd>
            </div>
            {selectedStage.note && (
              <div>
                <dt>備註</dt>
                <dd>{selectedStage.note}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <h2 className="section-title">
        資料警示<span className="section-title__count">{allWarnings.length}</span>
      </h2>
      {allWarnings.length === 0 ? (
        <p className="pipeline-tab__no-warnings">無警示。缺 char_span、未知邊類型或懸空端點的項目會列於此，且不進圖譜。</p>
      ) : (
        <ul className="warning-list">
          {allWarnings.map((w, i) => (
            <li key={`${w.code}-${i}`} className="warning-list__item">
              <span className="warning-list__code">{w.code}</span>
              <span>{w.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
