/** Canonical module-layer edge types (excludes registry-layer broader_than). */
export const CANONICAL_EDGE_TYPES = new Set([
  'depends_on',
  'exemplifies',
  'elaborates',
  'equivalent_to',
  'contrasts',
  'motivates',
  'solves',
]);

export const ARGUMENT_LAYERS = {
  core: {
    label: '核心主張',
    roles: new Set(['claim', 'concept', 'framework', 'motivation', 'decision_rule']),
  },
  method: {
    label: '方法與機制',
    roles: new Set([
      'procedure',
      'governance',
      'measurement',
      'productization',
      'cost_control',
      'risk_control',
      'compliance',
    ]),
  },
  evidence: {
    label: '例證與證據',
    roles: new Set(['evidence', 'case']),
  },
};

export const LAYER_ORDER = ['core', 'method', 'evidence'];
