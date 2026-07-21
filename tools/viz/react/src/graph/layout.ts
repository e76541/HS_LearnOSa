import dagre from '@dagrejs/dagre';
import type { ArgumentLayer, EdgeRecord, ModuleRecord } from '../types';
import { ARGUMENT_LAYER_META } from '../constants';

export const NODE_W = 232;
export const NODE_H = 96;

export interface XY {
  x: number;
  y: number;
}

/** dagre 自動佈局（全圖聚光鏡）。回傳 top-left 座標。 */
export function layoutDagre(
  modules: ModuleRecord[],
  edges: EdgeRecord[],
  rankdir: 'TB' | 'LR' = 'TB',
): Map<string, XY> {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir, nodesep: 42, ranksep: 96, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));
  for (const m of modules) g.setNode(m.module_id, { width: NODE_W, height: NODE_H });
  for (const e of edges) g.setEdge(e.source, e.target);
  dagre.layout(g);
  const pos = new Map<string, XY>();
  for (const m of modules) {
    const n = g.node(m.module_id);
    pos.set(m.module_id, { x: n.x - NODE_W / 2, y: n.y - NODE_H / 2 });
  }
  return pos;
}

/** 焦點鄰域：上游在左、本模塊置中、下游在右。 */
export function layoutFocus(
  currentId: string,
  upstreamIds: string[],
  downstreamIds: string[],
): Map<string, XY> {
  const pos = new Map<string, XY>();
  const colGap = 330;
  const rowGap = NODE_H + 34;
  const stack = (ids: string[], cx: number) => {
    const total = ids.length;
    ids.forEach((id, i) => {
      pos.set(id, { x: cx - NODE_W / 2, y: (i - (total - 1) / 2) * rowGap - NODE_H / 2 });
    });
  };
  stack(upstreamIds, -colGap);
  pos.set(currentId, { x: -NODE_W / 2, y: -NODE_H / 2 });
  stack(downstreamIds, colGap);
  return pos;
}

export interface LayerBand {
  key: ArgumentLayer | 'background';
  label: string;
  y: number;
  height: number;
  minX: number;
  maxX: number;
}

const BAND_GAP_Y = 64;
const BAND_PAD_Y = 44;
const BAND_PAD_X = 48;
const NODE_GAP_X = 56;

/**
 * 論證分層：核心主張 → 方法與機制 → 例證與證據 → 其他，背景模塊獨立一帶、
 * 不參與核心層排列。層內以 barycenter 排序減少跨層交叉。
 */
export function layoutLayers(
  modules: ModuleRecord[],
  edges: EdgeRecord[],
): { positions: Map<string, XY>; bands: LayerBand[] } {
  const foreground = modules.filter((m) => !m.is_background);
  const background = modules.filter((m) => m.is_background);

  const groups = new Map<ArgumentLayer, ModuleRecord[]>();
  for (const m of foreground) {
    const layer = m.argument_layer in ARGUMENT_LAYER_META ? m.argument_layer : 'other';
    if (!groups.has(layer)) groups.set(layer, []);
    groups.get(layer)!.push(m);
  }
  const orderedLayers = (Object.keys(ARGUMENT_LAYER_META) as ArgumentLayer[])
    .filter((l) => groups.has(l))
    .sort((a, b) => ARGUMENT_LAYER_META[a].order - ARGUMENT_LAYER_META[b].order);

  // 初始排序：模塊 id；接著以「指向上一層的邊」做 barycenter 排序
  for (const list of groups.values()) list.sort((a, b) => a.module_id.localeCompare(b.module_id));

  const positions = new Map<string, XY>();
  const bands: LayerBand[] = [];

  const layerLists: { key: ArgumentLayer | 'background'; label: string; list: ModuleRecord[] }[] =
    orderedLayers.map((l) => ({ key: l, label: ARGUMENT_LAYER_META[l].label, list: groups.get(l)! }));
  if (background.length > 0) {
    const bg = [...background].sort((a, b) => a.module_id.localeCompare(b.module_id));
    layerLists.push({ key: 'background', label: '背景（不參與分層）', list: bg });
  }

  let y = 0;
  let prevLayerIds: string[] | null = null;
  for (const { key, label, list } of layerLists) {
    if (prevLayerIds) {
      const prevIndex = new Map(prevLayerIds.map((id, i) => [id, i]));
      const bary = new Map<string, number>();
      for (const m of list) {
        // 以指出邊（source === m）落在上一層的 target 位置求重心
        const ups = edges.filter((e) => e.source === m.module_id && prevIndex.has(e.target));
        bary.set(
          m.module_id,
          ups.length > 0
            ? ups.reduce((sum, e) => sum + (prevIndex.get(e.target) ?? 0), 0) / ups.length
            : Number.POSITIVE_INFINITY,
        );
      }
      list.sort((a, b) => {
        const da = bary.get(a.module_id)!;
        const db = bary.get(b.module_id)!;
        if (da !== db) return da - db;
        return a.module_id.localeCompare(b.module_id);
      });
    }
    const bandWidth =
      list.length * NODE_W + Math.max(0, list.length - 1) * NODE_GAP_X + BAND_PAD_X * 2;
    const left = -bandWidth / 2;
    list.forEach((m, i) => {
      const x = left + BAND_PAD_X + i * (NODE_W + NODE_GAP_X);
      positions.set(m.module_id, { x, y: y + BAND_PAD_Y });
    });
    bands.push({ key, label, y, height: NODE_H + BAND_PAD_Y * 2, minX: left, maxX: left + bandWidth });
    y += NODE_H + BAND_PAD_Y * 2 + BAND_GAP_Y;
    prevLayerIds = list.map((m) => m.module_id);
  }

  return { positions, bands };
}
