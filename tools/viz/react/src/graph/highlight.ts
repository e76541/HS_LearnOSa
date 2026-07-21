import type { EdgeRecord } from '../types';

export interface Neighbors {
  /** 上游：指向本模塊的邊（target === id），其 source 為支撐方 */
  upstream: { edge: EdgeRecord; moduleId: string }[];
  /** 下游：本模塊指出的邊（source === id），其 target 為被支撐方 */
  downstream: { edge: EdgeRecord; moduleId: string }[];
}

export function neighborsOf(edges: EdgeRecord[], moduleId: string): Neighbors {
  const upstream: Neighbors['upstream'] = [];
  const downstream: Neighbors['downstream'] = [];
  for (const e of edges) {
    if (e.target === moduleId) upstream.push({ edge: e, moduleId: e.source });
    if (e.source === moduleId) downstream.push({ edge: e, moduleId: e.target });
  }
  return { upstream, downstream };
}

/** 全圖聚光鏡：選取模塊的一階相連節點與邊 */
export function spotlightOneHop(
  edges: EdgeRecord[],
  selectedId: string,
): { nodeIds: Set<string>; edgeIds: Set<string> } {
  const nodeIds = new Set<string>([selectedId]);
  const edgeIds = new Set<string>();
  for (const e of edges) {
    if (e.source === selectedId || e.target === selectedId) {
      edgeIds.add(e.edge_id);
      nodeIds.add(e.source);
      nodeIds.add(e.target);
    }
  }
  return { nodeIds, edgeIds };
}

/**
 * 論證分層：從選取模塊沿指出方向（source → target）追蹤通往概念根的完整有向路徑。
 * 回傳路徑上的節點與邊，以及根節點（無出邊者）。
 */
export function pathToRoots(
  edges: EdgeRecord[],
  selectedId: string,
): { nodeIds: Set<string>; edgeIds: Set<string>; rootIds: Set<string> } {
  const nodeIds = new Set<string>([selectedId]);
  const edgeIds = new Set<string>();
  const visited = new Set<string>([selectedId]);
  const stack = [selectedId];
  while (stack.length > 0) {
    const current = stack.pop()!;
    for (const e of edges) {
      if (e.source !== current) continue;
      edgeIds.add(e.edge_id);
      nodeIds.add(e.target);
      if (!visited.has(e.target)) {
        visited.add(e.target);
        stack.push(e.target);
      }
    }
  }
  const rootIds = new Set<string>();
  for (const id of nodeIds) {
    if (!edges.some((e) => e.source === id)) rootIds.add(id);
  }
  return { nodeIds, edgeIds, rootIds };
}
