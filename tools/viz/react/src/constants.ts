import type { ArgumentLayer, CanonicalEdgeType } from './types';

export const CANONICAL_EDGE_TYPES: CanonicalEdgeType[] = [
  'depends_on',
  'exemplifies',
  'elaborates',
  'equivalent_to',
  'contrasts',
  'motivates',
  'solves',
];

export const EDGE_TYPE_META: Record<CanonicalEdgeType, { label: string; color: string }> = {
  depends_on: { label: '依賴', color: '#7aa2f7' },
  exemplifies: { label: '例證', color: '#9ece6a' },
  elaborates: { label: '詳述', color: '#73daca' },
  equivalent_to: { label: '等價', color: '#bb9af7' },
  contrasts: { label: '對比', color: '#f7768e' },
  motivates: { label: '動機', color: '#e0af68' },
  solves: { label: '解決', color: '#ff9e64' },
};

export const ARGUMENT_LAYER_META: Record<ArgumentLayer, { label: string; order: number }> = {
  core: { label: '核心主張', order: 0 },
  method: { label: '方法與機制', order: 1 },
  evidence: { label: '例證與證據', order: 2 },
  other: { label: '其他', order: 3 },
};

/** 管線階段的靜態規範說明（輸入／輸出／規範限制），依階段 id 對應 */
export const STAGE_SPEC: Record<string, { inputs: string; outputs: string; constraints: string }> = {
  ingest: {
    inputs: '原文（使用者貼上文章或既有文本）',
    outputs: '收錄記錄、source_id、DOC 目錄',
    constraints: '收錄前須完成文本分類；source_id 帶 PENDING- 前綴表示待覆核，不進正式知識庫。',
  },
  modularize: {
    inputs: '原文全文',
    outputs: 'modules.md（ModuleRecord 列表）',
    constraints: '每個模塊須附 char_span 證據、module_type 與 semantic_roles；background 模塊須明確標記。',
  },
  extract_edges: {
    inputs: 'modules.md',
    outputs: 'edges.md（EdgeRecord 列表）',
    constraints:
      '僅接受 canonical 七類模塊層邊（depends_on／exemplifies／elaborates／equivalent_to／contrasts／motivates／solves）；方向為來源模塊 → 被支撐模塊；排除登記層 broader_than。',
  },
  skill_align: {
    inputs: 'modules.md、技能登記簿',
    outputs: '技能對齊記錄',
    constraints: 'background 模塊不作為技能節點、圖式主體或考點；未接入登記簿時階段保持 pending。',
  },
  dynamic_view: {
    inputs: 'modules.md、edges.md',
    outputs: 'views/ 唯讀投影（Mermaid／Markdown／_data.json）',
    constraints: '投影唯讀，不回寫 modules.md、edges.md、登記簿或原文。',
  },
};

export const STAGE_STATUS_LABEL: Record<string, string> = {
  done: '完成',
  pending: '待處理',
};
