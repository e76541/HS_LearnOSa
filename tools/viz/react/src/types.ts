// HS LearnEdge DOC 投影型別（對應 tools/viz/schema/doc-projection.schema.json）
// 注意：產生器目前把 char_span 輸出為字串，載入時統一 coerce 為 number。

export type CanonicalEdgeType =
  | 'depends_on'
  | 'exemplifies'
  | 'elaborates'
  | 'equivalent_to'
  | 'contrasts'
  | 'motivates'
  | 'solves';

export type ArgumentLayer = 'core' | 'method' | 'evidence' | 'other';

export interface SourceRecord {
  source_id: string;
  title: string;
  source_kind: string;
  schema_version: string;
  source_char_length: number;
  doc_dir: string;
}

export interface ModuleRecord {
  module_id: string;
  title: string;
  summary: string;
  char_span: [number, number];
  module_type: string;
  semantic_roles: string[];
  is_skill_signal: boolean;
  is_background: boolean;
  confidence: number;
  argument_layer: ArgumentLayer;
}

export interface EdgeRecord {
  edge_id: string;
  source: string; // module_id（支撐方）
  target: string; // module_id（被支撐方）
  type: CanonicalEdgeType;
  evidence_char_span: string;
  evidence_summary: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  status: 'done' | 'pending' | string;
  artifact_count: number;
  note?: string;
}

export interface PipelineSummary {
  stages: PipelineStage[];
  metrics: {
    source_count: number;
    module_count: number;
    skill_module_count: number;
    background_module_count: number;
    edge_count: number;
  };
}

export interface WarningRecord {
  code: string;
  message: string;
  edge_id?: string;
  module_id?: string;
}

export interface DocProjection {
  source: SourceRecord;
  modules: ModuleRecord[];
  edges: EdgeRecord[];
  pipeline: PipelineSummary;
  warnings: WarningRecord[];
}

/** sync-data 產生的來源清單項目 */
export interface SourceManifestEntry {
  id: string;
  bucket: string;
  slug: string;
  title: string;
  source_id: string;
  module_count: number;
  edge_count: number;
  file: string;
}

export interface SourceManifest {
  generated_at: string;
  sources: SourceManifestEntry[];
  skipped: { bucket: string; slug: string; reason: string }[];
}

export type GraphMode = 'focus' | 'full' | 'layers';
export type MainTab = 'pipeline' | 'graph';

/** 載入並驗證後的投影：graphModules/graphEdges 已剔除警示項 */
export interface LoadedProjection {
  projection: DocProjection;
  graphModules: ModuleRecord[];
  graphEdges: EdgeRecord[];
  loadWarnings: WarningRecord[];
}
