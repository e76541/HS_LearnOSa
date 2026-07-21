import { useEffect, useReducer } from 'react';
import { GraphTab } from './components/GraphTab';
import { PipelineTab } from './components/PipelineTab';
import { isPendingSource, loadManifest, loadProjection } from './data';
import { createInitialState, reducer } from './state';
import type { MainTab } from './types';

const TABS: { id: MainTab; label: string }[] = [
  { id: 'pipeline', label: '管線總覽' },
  { id: 'graph', label: '模塊與連線' },
];

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  // 載入來源清單
  useEffect(() => {
    let cancelled = false;
    loadManifest()
      .then((manifest) => {
        if (!cancelled) dispatch({ kind: 'manifestLoaded', manifest });
      })
      .catch((err: unknown) => {
        if (!cancelled) dispatch({ kind: 'manifestFailed', error: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 依選取來源載入投影
  const selectedEntry = state.manifest?.sources.find((s) => s.id === state.selectedSourceId);
  useEffect(() => {
    if (!selectedEntry) return;
    let cancelled = false;
    loadProjection(selectedEntry.file)
      .then((loaded) => {
        if (!cancelled) dispatch({ kind: 'projectionLoaded', loaded });
      })
      .catch((err: unknown) => {
        if (!cancelled) dispatch({ kind: 'projectionFailed', error: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [selectedEntry]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__title">HS LearnEdge 知識視覺化</span>
          <span className="app-header__badge">唯讀</span>
        </div>
        <nav className="app-header__tabs" role="tablist" aria-label="主分頁">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={state.tab === t.id}
              className={`app-header__tab${state.tab === t.id ? ' is-active' : ''}`}
              onClick={() => dispatch({ kind: 'setTab', tab: t.id })}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="app-header__source">
          <label htmlFor="source-select">來源</label>
          <select
            id="source-select"
            value={state.selectedSourceId ?? ''}
            onChange={(e) => dispatch({ kind: 'selectSource', sourceId: e.target.value })}
            disabled={!state.manifest || state.manifest.sources.length === 0}
          >
            {state.manifest?.sources.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}（{s.bucket}/{s.slug}）
              </option>
            ))}
          </select>
          {selectedEntry && isPendingSource(selectedEntry.source_id) && (
            <span className="app-header__pending" title="source_id 帶 PENDING- 前綴，尚未正式收錄">
              待覆核
            </span>
          )}
        </div>
      </header>

      <main className="app-main">
        {state.manifestError && (
          <div className="app-message app-message--error" role="alert">
            <h2>無法載入來源清單</h2>
            <p>{state.manifestError}</p>
            <p>
              請確認已執行 <code>npm run sync-data</code>（dev／build 前會自動執行）。
            </p>
          </div>
        )}
        {!state.manifestError && state.manifest && state.manifest.sources.length === 0 && (
          <div className="app-message">
            <h2>沒有可用的來源</h2>
            <p>
              請先執行 <code>node tools/viz/generate.mjs DOC/&lt;bucket&gt;/&lt;slug&gt;</code> 產生
              <code>views/_data.json</code>，再重新同步。
            </p>
          </div>
        )}
        {state.projectionError && (
          <div className="app-message app-message--error" role="alert">
            <h2>來源投影載入失敗</h2>
            <p>{state.projectionError}</p>
          </div>
        )}
        {!state.manifestError && !state.projectionError && state.projectionLoading && (
          <div className="app-message" aria-live="polite">
            載入中…
          </div>
        )}
        {state.loaded && state.manifest && (
          <>
            {state.tab === 'pipeline' ? (
              <div className="app-main__scroll">
                <PipelineTab
                  manifest={state.manifest}
                  projection={state.loaded.projection}
                  loadWarnings={state.loaded.loadWarnings}
                />
              </div>
            ) : (
              <GraphTab
                loaded={state.loaded}
                graphMode={state.graphMode}
                selectedModuleId={state.selectedModuleId}
                selectedEdgeId={state.selectedEdgeId}
                edgeTypeFilter={state.edgeTypeFilter}
                showBackground={state.showBackground}
                panelCollapsed={state.panelCollapsed}
                dispatch={dispatch}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
