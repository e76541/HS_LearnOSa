import { EDGE_TYPE_META } from '../constants';
import { neighborsOf } from '../graph/highlight';
import type { EdgeRecord, ModuleRecord } from '../types';

interface Props {
  modules: ModuleRecord[];
  edges: EdgeRecord[];
  selectedModuleId: string | null;
  selectedEdgeId: string | null;
  collapsed: boolean;
  onToggle: () => void;
  onSelectModule: (id: string) => void;
  onSelectEdge: (id: string) => void;
}

function spanText(span: [number, number]): string {
  return `[${span[0]},${span[1]})`;
}

function EdgeTypeChip({ type }: { type: EdgeRecord['type'] }) {
  const meta = EDGE_TYPE_META[type];
  return (
    <span className="edge-chip" style={{ borderColor: meta?.color, color: meta?.color }}>
      {meta?.label ?? type}
    </span>
  );
}

/** 底部固定流向面板：上游輸入 → 目前模塊 → 下游流向，另含邊帳本與來源證據 */
export function FlowPanel({
  modules,
  edges,
  selectedModuleId,
  selectedEdgeId,
  collapsed,
  onToggle,
  onSelectModule,
  onSelectEdge,
}: Props) {
  const byId = new Map(modules.map((m) => [m.module_id, m]));
  const current = selectedModuleId ? byId.get(selectedModuleId) : undefined;
  const selectedEdge = selectedEdgeId ? edges.find((e) => e.edge_id === selectedEdgeId) : undefined;
  const { upstream, downstream } = current
    ? neighborsOf(edges, current.module_id)
    : { upstream: [], downstream: [] };

  const renderFlowEdgeRow = (e: EdgeRecord, otherId: string) => {
    const other = byId.get(otherId);
    return (
      <li key={e.edge_id} className="flow-list__item">
        <button
          type="button"
          className={`flow-list__edge${selectedEdgeId === e.edge_id ? ' is-active' : ''}`}
          onClick={() => onSelectEdge(e.edge_id)}
          title={`查看邊 ${e.edge_id} 證據`}
        >
          <EdgeTypeChip type={e.type} />
          <span className="flow-list__edge-id">{e.edge_id}</span>
        </button>
        <button
          type="button"
          className="flow-list__module"
          onClick={() => onSelectModule(otherId)}
          title={`選取模塊 ${otherId}`}
        >
          <span className="flow-list__module-id">{otherId}</span>
          {other?.title ?? '（不在目前視窗）'}
        </button>
      </li>
    );
  };

  return (
    <section className={`flow-panel${collapsed ? ' is-collapsed' : ''}`} aria-label="流向面板">
      <header className="flow-panel__bar">
        <span className="flow-panel__title">流向面板</span>
        {current && (
          <span className="flow-panel__current">
            {current.module_id}｜{current.title}
          </span>
        )}
        <button
          type="button"
          className="flow-panel__toggle"
          onClick={onToggle}
          aria-expanded={!collapsed}
        >
          {collapsed ? '展開面板 ▴' : '收合面板 ▾'}
        </button>
      </header>
      {!collapsed && (
        <div className="flow-panel__body">
          {!current && <p className="flow-panel__empty">請在圖譜中選取一個模塊（Tab 鍵可逐一聚焦，Enter 選取）。</p>}
          {current && (
            <>
              <div className="flow-panel__columns">
                <div className="flow-col">
                  <h3>上游輸入（{upstream.length}）</h3>
                  <ul className="flow-list">
                    {upstream.map(({ edge, moduleId }) => renderFlowEdgeRow(edge, moduleId))}
                    {upstream.length === 0 && <li className="flow-list__none">無上游支撐</li>}
                  </ul>
                </div>
                <div className="flow-col flow-col--current">
                  <h3>目前模塊</h3>
                  <div className="current-module">
                    <div className="current-module__head">
                      <span className="current-module__id">{current.module_id}</span>
                      <span className="current-module__type">{current.module_type}</span>
                      {current.is_background && <span className="current-module__bg">背景</span>}
                    </div>
                    <div className="current-module__title">{current.title}</div>
                    <p className="current-module__summary">{current.summary}</p>
                    <div className="current-module__facts">
                      <span>定位 {spanText(current.char_span)}</span>
                      <span>信心 {(current.confidence * 100).toFixed(0)}%</span>
                      <span>{current.is_skill_signal ? '技能訊號' : '非技能訊號'}</span>
                    </div>
                    {current.semantic_roles.length > 0 && (
                      <div className="current-module__roles">
                        {current.semantic_roles.map((r) => (
                          <span key={r} className="role-chip">
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flow-col">
                  <h3>下游流向（{downstream.length}）</h3>
                  <ul className="flow-list">
                    {downstream.map(({ edge, moduleId }) => renderFlowEdgeRow(edge, moduleId))}
                    {downstream.length === 0 && <li className="flow-list__none">無下游支撐對象</li>}
                  </ul>
                </div>
              </div>
              <div className="flow-panel__lower">
                <div className="ledger">
                  <h3>邊帳本（{edges.length}）</h3>
                  <ul className="ledger__list">
                    {edges.map((e) => (
                      <li key={e.edge_id}>
                        <button
                          type="button"
                          className={`ledger__row${selectedEdgeId === e.edge_id ? ' is-active' : ''}`}
                          onClick={() => onSelectEdge(e.edge_id)}
                        >
                          <span className="ledger__id">{e.edge_id}</span>
                          <span className="ledger__pair">
                            {e.source} → {e.target}
                          </span>
                          <EdgeTypeChip type={e.type} />
                        </button>
                      </li>
                    ))}
                    {edges.length === 0 && <li className="flow-list__none">目前篩選下無可見邊</li>}
                  </ul>
                </div>
                <div className="evidence">
                  <h3>來源證據</h3>
                  {selectedEdge ? (
                    <div className="evidence__body">
                      <div className="evidence__head">
                        <span className="ledger__id">{selectedEdge.edge_id}</span>
                        <span className="ledger__pair">
                          {selectedEdge.source} → {selectedEdge.target}
                        </span>
                        <EdgeTypeChip type={selectedEdge.type} />
                      </div>
                      <p className="evidence__span">證據定位 {selectedEdge.evidence_char_span}</p>
                      <p className="evidence__summary">{selectedEdge.evidence_summary}</p>
                    </div>
                  ) : (
                    <p className="flow-panel__empty">點選圖譜或帳本中的邊以查看證據。</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
