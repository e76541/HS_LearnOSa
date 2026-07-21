import { CANONICAL_EDGE_TYPES } from './constants';
import type {
  CanonicalEdgeType,
  DocProjection,
  EdgeRecord,
  LoadedProjection,
  ModuleRecord,
  SourceManifest,
  WarningRecord,
} from './types';

const DATA_BASE = 'data/';

export async function loadManifest(): Promise<SourceManifest> {
  const res = await fetch(`${DATA_BASE}index.json`);
  if (!res.ok) throw new Error(`無法載入來源清單（HTTP ${res.status}），請先執行 npm run sync-data`);
  return (await res.json()) as SourceManifest;
}

export async function loadProjection(file: string): Promise<LoadedProjection> {
  const res = await fetch(`${DATA_BASE}${file}`);
  if (!res.ok) throw new Error(`無法載入投影檔 ${file}（HTTP ${res.status}）`);
  const raw = (await res.json()) as DocProjection;
  if (!raw || !raw.source || !Array.isArray(raw.modules) || !Array.isArray(raw.edges)) {
    throw new Error(`投影檔 ${file} 格式錯誤：缺少 source/modules/edges`);
  }
  return validateProjection(raw);
}

function coerceSpan(value: unknown): [number, number] | null {
  if (!Array.isArray(value) || value.length !== 2) return null;
  const a = Number(value[0]);
  const b = Number(value[1]);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  return [a, b];
}

/**
 * 驗證投影並產生載入警示：
 * - 缺少 char_span 的模塊不進圖
 * - 未知邊類型或懸空端點的邊不進圖
 * 不推測修補任何資料。
 */
export function validateProjection(raw: DocProjection): LoadedProjection {
  const loadWarnings: WarningRecord[] = [];
  const graphModules: ModuleRecord[] = [];
  const seenModuleIds = new Set<string>();

  for (const m of raw.modules) {
    const span = coerceSpan(m.char_span);
    if (!m.module_id || !m.title) {
      loadWarnings.push({
        code: 'module_missing_identity',
        message: '模塊缺少 module_id 或 title，已排除於圖譜',
        module_id: m.module_id ?? '(未知)',
      });
      continue;
    }
    if (seenModuleIds.has(m.module_id)) {
      loadWarnings.push({
        code: 'module_duplicate_id',
        message: `模塊 ${m.module_id} 重複定義，僅保留第一筆`,
        module_id: m.module_id,
      });
      continue;
    }
    if (!span) {
      loadWarnings.push({
        code: 'module_missing_char_span',
        message: `模塊 ${m.module_id} 缺少有效 char_span，已排除於圖譜`,
        module_id: m.module_id,
      });
      continue;
    }
    seenModuleIds.add(m.module_id);
    graphModules.push({ ...m, char_span: span });
  }

  const graphEdges: EdgeRecord[] = [];
  const seenEdgeIds = new Set<string>();
  for (const e of raw.edges) {
    const typeOk = (CANONICAL_EDGE_TYPES as string[]).includes(e.type);
    if (!typeOk) {
      loadWarnings.push({
        code: 'edge_unknown_type',
        message: `邊 ${e.edge_id} 類型「${e.type}」非 canonical，已排除於圖譜`,
        edge_id: e.edge_id,
      });
      continue;
    }
    if (!seenModuleIds.has(e.source) || !seenModuleIds.has(e.target)) {
      loadWarnings.push({
        code: 'edge_dangling_endpoint',
        message: `邊 ${e.edge_id} 端點（${e.source} → ${e.target}）不在模塊清單內，已排除於圖譜`,
        edge_id: e.edge_id,
      });
      continue;
    }
    if (seenEdgeIds.has(e.edge_id)) {
      loadWarnings.push({
        code: 'edge_duplicate_id',
        message: `邊 ${e.edge_id} 重複定義，僅保留第一筆`,
        edge_id: e.edge_id,
      });
      continue;
    }
    seenEdgeIds.add(e.edge_id);
    graphEdges.push({ ...e, type: e.type as CanonicalEdgeType });
  }

  return { projection: raw, graphModules, graphEdges, loadWarnings };
}

export function isPendingSource(sourceId: string): boolean {
  return sourceId.startsWith('PENDING-');
}
