import { useEffect, useMemo } from 'react';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react';
import { CANONICAL_EDGE_TYPES, EDGE_TYPE_META } from '../constants';
import { buildFlow, type LaneNodeData, type ModuleNodeData } from '../graph/buildFlow';
import type { AppAction, AppState } from '../state';
import type { GraphMode, LoadedProjection } from '../types';
import { FlowPanel } from './FlowPanel';
import { LaneNode, ModuleNode } from './ModuleNode';
import { SegmentedControl } from './SegmentedControl';

const nodeTypes = { moduleNode: ModuleNode, laneNode: LaneNode };

const MODE_OPTIONS: { value: GraphMode; label: string; hint: string }[] = [
  { value: 'focus', label: '焦點鄰域', hint: '只看選取模塊的一階上游與下游（按 1）' },
  { value: 'full', label: '全圖聚光鏡', hint: '全部模塊與邊，選取後淡化無關節點（按 2）' },
  { value: 'layers', label: '論證分層', hint: '核心主張／方法與機制／例證與證據分層（按 3）' },
];

interface Props {
  loaded: LoadedProjection;
  graphMode: AppState['graphMode'];
  selectedModuleId: AppState['selectedModuleId'];
  selectedEdgeId: AppState['selectedEdgeId'];
  edgeTypeFilter: AppState['edgeTypeFilter'];
  showBackground: AppState['showBackground'];
  panelCollapsed: AppState['panelCollapsed'];
  dispatch: React.Dispatch<AppAction>;
}

export function GraphTab(props: Props) {
  return (
    <ReactFlowProvider>
      <GraphTabInner {...props} />
    </ReactFlowProvider>
  );
}

function GraphTabInner({
  loaded,
  graphMode,
  selectedModuleId,
  selectedEdgeId,
  edgeTypeFilter,
  showBackground,
  panelCollapsed,
  dispatch,
}: Props) {
  const { graphModules, graphEdges, loadWarnings, projection } = loaded;
  const { fitView } = useReactFlow();

  const flow = useMemo(
    () =>
      buildFlow({
        mode: graphMode,
        modules: graphModules,
        edges: graphEdges,
        selectedModuleId,
        selectedEdgeId,
        edgeTypeFilter,
        showBackground,
      }),
    [graphMode, graphModules, graphEdges, selectedModuleId, selectedEdgeId, edgeTypeFilter, showBackground],
  );

  // 模式或來源變更後重新取景（rAF + 延遲各一次，涵蓋容器量測時差）
  const sourceId = projection.source.source_id;
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      void fitView({ padding: 0.12, duration: 220 });
    });
    const timer = window.setTimeout(() => {
      void fitView({ padding: 0.12, duration: 0 });
    }, 300);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [graphMode, sourceId, fitView]);

  // 鍵盤：1/2/3 切換圖譜模式
  const onWrapperKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, select')) return;
    if (e.key === '1' || e.key === '2' || e.key === '3') {
      const mode = MODE_OPTIONS[Number(e.key) - 1].value;
      dispatch({ kind: 'setGraphMode', mode });
    }
  };

  const onNodeClick = (_: unknown, node: Node) => {
    if (node.type === 'moduleNode') dispatch({ kind: 'selectModule', moduleId: node.id });
  };
  const onEdgeClick = (_: unknown, edge: Edge) => {
    dispatch({ kind: 'selectEdge', edgeId: edge.id });
  };
  const onSelectionChange = ({ nodes, edges: selEdges }: { nodes: Node[]; edges: Edge[] }) => {
    const moduleNode = nodes.find((n) => n.type === 'moduleNode');
    if (moduleNode && moduleNode.id !== selectedModuleId) {
      dispatch({ kind: 'selectModule', moduleId: moduleNode.id });
      return;
    }
    // 鍵盤（Enter）選邊時只有 selection 事件，沒有 click
    if (nodes.length === 0 && selEdges.length === 1 && selEdges[0].id !== selectedEdgeId) {
      dispatch({ kind: 'selectEdge', edgeId: selEdges[0].id });
    }
  };

  return (
    <div className="graph-tab" onKeyDown={onWrapperKeyDown}>
      <div className="graph-toolbar">
        <SegmentedControl
          options={MODE_OPTIONS}
          value={graphMode}
          onChange={(mode) => dispatch({ kind: 'setGraphMode', mode })}
          ariaLabel="圖譜模式"
        />
        <fieldset className="edge-filter">
          <legend>邊類型篩選</legend>
          {CANONICAL_EDGE_TYPES.map((t) => (
            <label key={t} className="edge-filter__item" style={{ borderColor: EDGE_TYPE_META[t].color }}>
              <input
                type="checkbox"
                checked={edgeTypeFilter[t]}
                onChange={() => dispatch({ kind: 'toggleEdgeType', edgeType: t })}
              />
              <span style={{ color: EDGE_TYPE_META[t].color }}>{EDGE_TYPE_META[t].label}</span>
            </label>
          ))}
        </fieldset>
        <label className="bg-toggle">
          <input
            type="checkbox"
            checked={showBackground}
            onChange={(e) => dispatch({ kind: 'setShowBackground', show: e.target.checked })}
          />
          顯示背景模塊
        </label>
        <button
          type="button"
          className="refit-btn"
          onClick={() => void fitView({ padding: 0.12, duration: 220 })}
          title="將圖譜重新取景至可視範圍"
        >
          重新取景
        </button>
      </div>

      {loadWarnings.length > 0 && (
        <details className="graph-warnings">
          <summary>資料警示 {loadWarnings.length} 則（相關項目不進圖）</summary>
          <ul>
            {loadWarnings.map((w, i) => (
              <li key={`${w.code}-${i}`}>
                <code>{w.code}</code> {w.message}
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="graph-canvas-wrap">
        {flow.nodes.length === 0 ? (
          <div className="graph-empty">
            {graphModules.length === 0
              ? '此來源沒有可顯示的模塊（可能全部因資料警示被排除）。'
              : '焦點鄰域需要一個選取模塊，但目前沒有可選模塊。'}
          </div>
        ) : (
          <ReactFlow
            nodes={flow.nodes as Node<ModuleNodeData | LaneNodeData>[]}
            edges={flow.edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onSelectionChange={onSelectionChange}
            onPaneClick={() => undefined}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            nodesFocusable
            edgesFocusable
            elementsSelectable
            selectNodesOnDrag={false}
            deleteKeyCode={null}
            minZoom={0.15}
            maxZoom={1.8}
            colorMode="dark"
            proOptions={{ hideAttribution: false }}
          >
            <Background gap={22} size={1} />
            <Controls showInteractive={false} position="bottom-left" />
            <MiniMap pannable zoomable position="top-right" />
          </ReactFlow>
        )}
      </div>

      <FlowPanel
        modules={flow.visibleModules}
        edges={flow.visibleEdges}
        selectedModuleId={selectedModuleId}
        selectedEdgeId={selectedEdgeId}
        collapsed={panelCollapsed}
        onToggle={() => dispatch({ kind: 'togglePanel' })}
        onSelectModule={(id) => dispatch({ kind: 'selectModule', moduleId: id })}
        onSelectEdge={(id) => dispatch({ kind: 'selectEdge', edgeId: id })}
      />
    </div>
  );
}
