import { MarkerType, Position, type Edge, type Node } from '@xyflow/react';
import { EDGE_TYPE_META } from '../constants';
import type { CanonicalEdgeType, EdgeRecord, GraphMode, ModuleRecord } from '../types';
import { layoutDagre, layoutFocus, layoutLayers, NODE_H, NODE_W } from './layout';
import { neighborsOf, pathToRoots, spotlightOneHop } from './highlight';

export interface ModuleNodeData extends Record<string, unknown> {
  module: ModuleRecord;
  dimmed: boolean;
  selected: boolean;
  onPath: boolean;
  isRoot: boolean;
}

export interface LaneNodeData extends Record<string, unknown> {
  label: string;
  width: number;
  height: number;
}

export type FlowNode = Node<ModuleNodeData | LaneNodeData>;

export interface BuildArgs {
  mode: GraphMode;
  modules: ModuleRecord[];
  edges: EdgeRecord[];
  selectedModuleId: string | null;
  selectedEdgeId: string | null;
  edgeTypeFilter: Record<CanonicalEdgeType, boolean>;
  showBackground: boolean;
}

export interface BuildResult {
  nodes: FlowNode[];
  edges: Edge[];
  /** 套用篩選與背景開關後、目前模式可見的邊 */
  visibleEdges: EdgeRecord[];
  /** 套用篩選與背景開關後的模塊（不限模式視窗） */
  visibleModules: ModuleRecord[];
}

const EDGE_LABEL_FONT = 11;

function toFlowEdge(
  e: EdgeRecord,
  opts: { dimmed: boolean; selected: boolean; onPath: boolean },
): Edge {
  const meta = EDGE_TYPE_META[e.type];
  const color = meta?.color ?? '#565f89';
  const opacity = opts.dimmed ? 0.12 : 1;
  const width = opts.selected ? 3 : opts.onPath ? 2.4 : 1.4;
  return {
    id: e.edge_id,
    source: e.source,
    target: e.target,
    type: 'default',
    label: meta?.label ?? e.type,
    labelStyle: { fill: opts.dimmed ? '#565f89' : '#c0caf5', fontSize: EDGE_LABEL_FONT },
    labelBgStyle: { fill: '#1a1b26', fillOpacity: 0.85 },
    labelBgPadding: [4, 2] as [number, number],
    labelBgBorderRadius: 3,
    style: { stroke: color, strokeWidth: width, opacity },
    markerEnd: { type: MarkerType.ArrowClosed, color, width: 18, height: 18 },
    zIndex: opts.dimmed ? 0 : 1,
    ariaLabel: `邊 ${e.edge_id}：${e.source} ${meta?.label ?? e.type} ${e.target}`,
  };
}

function toModuleNode(
  m: ModuleRecord,
  pos: { x: number; y: number },
  flags: { dimmed: boolean; selected: boolean; onPath: boolean; isRoot: boolean },
  handles: { source: Position; target: Position },
): FlowNode {
  return {
    id: m.module_id,
    type: 'moduleNode',
    position: pos,
    sourcePosition: handles.source,
    targetPosition: handles.target,
    data: { module: m, ...flags },
    width: NODE_W,
    height: NODE_H,
  } as FlowNode;
}

export function buildFlow(args: BuildArgs): BuildResult {
  const { mode, modules, edges, selectedModuleId, selectedEdgeId, edgeTypeFilter, showBackground } =
    args;

  // 篩選：邊類型 + 背景開關（只隱藏顯示，不改底層資料）
  const hiddenModuleIds = new Set(
    showBackground ? [] : modules.filter((m) => m.is_background).map((m) => m.module_id),
  );
  const visibleModules = modules.filter((m) => !hiddenModuleIds.has(m.module_id));
  const visibleEdges = edges.filter(
    (e) =>
      edgeTypeFilter[e.type] &&
      !hiddenModuleIds.has(e.source) &&
      !hiddenModuleIds.has(e.target),
  );

  const selectedVisible =
    selectedModuleId && visibleModules.some((m) => m.module_id === selectedModuleId)
      ? selectedModuleId
      : null;

  if (mode === 'focus') return buildFocus(selectedVisible, visibleModules, visibleEdges, selectedEdgeId);
  if (mode === 'full') return buildFull(selectedVisible, visibleModules, visibleEdges, selectedEdgeId);
  return buildLayers(selectedVisible, visibleModules, visibleEdges, selectedEdgeId);
}

function buildFocus(
  selectedId: string | null,
  modules: ModuleRecord[],
  edges: EdgeRecord[],
  selectedEdgeId: string | null,
): BuildResult {
  if (!selectedId) return { nodes: [], edges: [], visibleEdges: [], visibleModules: modules };
  const { upstream, downstream } = neighborsOf(edges, selectedId);
  const involvedEdges = [...upstream.map((u) => u.edge), ...downstream.map((d) => d.edge)];
  const involvedIds = new Set<string>([selectedId]);
  for (const e of involvedEdges) {
    involvedIds.add(e.source);
    involvedIds.add(e.target);
  }
  const byId = new Map(modules.map((m) => [m.module_id, m]));
  const positions = layoutFocus(
    selectedId,
    upstream.map((u) => u.moduleId).sort(),
    downstream.map((d) => d.moduleId).sort(),
  );
  const handles = { source: Position.Right, target: Position.Left };
  const nodes: FlowNode[] = [];
  for (const id of involvedIds) {
    const m = byId.get(id);
    const p = positions.get(id);
    if (!m || !p) continue;
    nodes.push(
      toModuleNode(m, p, { dimmed: false, selected: id === selectedId, onPath: true, isRoot: false }, handles),
    );
  }
  return {
    nodes,
    edges: involvedEdges.map((e) =>
      toFlowEdge(e, { dimmed: false, selected: e.edge_id === selectedEdgeId, onPath: true }),
    ),
    visibleEdges: involvedEdges,
    visibleModules: modules,
  };
}

function buildFull(
  selectedId: string | null,
  modules: ModuleRecord[],
  edges: EdgeRecord[],
  selectedEdgeId: string | null,
): BuildResult {
  const positions = layoutDagre(modules, edges, 'LR');
  const spotlight = selectedId ? spotlightOneHop(edges, selectedId) : null;
  const handles = { source: Position.Right, target: Position.Left };
  const nodes: FlowNode[] = modules.map((m) => {
    const dimmed = spotlight ? !spotlight.nodeIds.has(m.module_id) : false;
    return toModuleNode(
      m,
      positions.get(m.module_id) ?? { x: 0, y: 0 },
      { dimmed, selected: m.module_id === selectedId, onPath: spotlight?.nodeIds.has(m.module_id) ?? false, isRoot: false },
      handles,
    );
  });
  return {
    nodes,
    edges: edges.map((e) =>
      toFlowEdge(e, {
        dimmed: spotlight ? !spotlight.edgeIds.has(e.edge_id) : false,
        selected: e.edge_id === selectedEdgeId,
        onPath: spotlight?.edgeIds.has(e.edge_id) ?? false,
      }),
    ),
    visibleEdges: edges,
    visibleModules: modules,
  };
}

function buildLayers(
  selectedId: string | null,
  modules: ModuleRecord[],
  edges: EdgeRecord[],
  selectedEdgeId: string | null,
): BuildResult {
  const { positions, bands } = layoutLayers(modules, edges);
  const path = selectedId ? pathToRoots(edges, selectedId) : null;
  const handles = { source: Position.Bottom, target: Position.Top };

  const laneNodes: FlowNode[] = bands.map((b) => ({
    id: `lane-${b.key}`,
    type: 'laneNode',
    position: { x: b.minX, y: b.y },
    data: { label: b.label, width: b.maxX - b.minX, height: b.height },
    draggable: false,
    selectable: false,
    focusable: false,
    zIndex: -10,
  }) as FlowNode);

  const nodes: FlowNode[] = [
    ...laneNodes,
    ...modules.map((m) => {
      const onPath = path?.nodeIds.has(m.module_id) ?? false;
      const dimmed = path ? !onPath : false;
      return toModuleNode(
        m,
        positions.get(m.module_id) ?? { x: 0, y: 0 },
        {
          dimmed,
          selected: m.module_id === selectedId,
          onPath,
          isRoot: path?.rootIds.has(m.module_id) ?? false,
        },
        handles,
      );
    }),
  ];
  return {
    nodes,
    edges: edges.map((e) =>
      toFlowEdge(e, {
        dimmed: path ? !path.edgeIds.has(e.edge_id) : false,
        selected: e.edge_id === selectedEdgeId,
        onPath: path?.edgeIds.has(e.edge_id) ?? false,
      }),
    ),
    visibleEdges: edges,
    visibleModules: modules,
  };
}
