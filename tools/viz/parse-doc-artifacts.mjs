import fs from 'node:fs';
import path from 'node:path';
import { CANONICAL_EDGE_TYPES, ARGUMENT_LAYERS, LAYER_ORDER } from './lib/constants.mjs';
import { parseYamlLite } from './lib/yaml-lite.mjs';

export function parseDocArtifacts(docDir) {
  const modulesPath = path.join(docDir, 'modules.md');
  const edgesPath = path.join(docDir, 'edges.md');

  if (!fs.existsSync(modulesPath)) {
    throw new Error(`Missing modules.md in ${docDir}`);
  }
  if (!fs.existsSync(edgesPath)) {
    throw new Error(`Missing edges.md in ${docDir}`);
  }

  const modulesText = fs.readFileSync(modulesPath, 'utf8').replace(/\r\n/g, '\n');
  const edgesText = fs.readFileSync(edgesPath, 'utf8').replace(/\r\n/g, '\n');
  const warnings = [];

  const source = parseSourceRecord(modulesText, docDir);
  const modules = parseModules(modulesText, warnings);
  const edges = parseEdges(edgesText, modules, warnings);
  const pipeline = buildPipelineSummary(source, modules, edges);

  return { source, modules, edges, pipeline, warnings };
}

function parseSourceRecord(text, docDir) {
  const match = text.match(/## Source record\s*\n+```yaml\n([\s\S]*?)```/);
  if (!match) {
    throw new Error('Source record block not found in modules.md');
  }
  const yaml = parseYamlLite(match[1]);
  return {
    source_id: yaml.source_id,
    title: yaml.title,
    source_kind: yaml.source_kind,
    schema_version: yaml.schema_version,
    source_char_length: yaml.source_char_length,
    doc_dir: docDir,
  };
}

function parseModules(text, warnings) {
  const modules = [];
  const sectionRegex = /^## (M\d+)\s+—\s+(.+)\n+```yaml\n([\s\S]*?)```/gm;
  let match;

  while ((match = sectionRegex.exec(text)) !== null) {
    const [, moduleId, title, yamlText] = match;
    const yaml = parseYamlLite(yamlText);

    if (!yaml.char_span || yaml.char_span.length !== 2) {
      warnings.push({
        code: 'missing_char_span',
        message: `模塊 ${moduleId} 缺少 char_span，不進圖。`,
        module_id: moduleId,
      });
    }

    const semanticRoles = Array.isArray(yaml.semantic_roles) ? yaml.semantic_roles : [];
    const isBackground =
      yaml.is_skill_signal === false ||
      semanticRoles.includes('background') ||
      yaml.module_type === 'BackgroundModule';

    const summary = pickSummary(yaml);
    const moduleRecord = {
      module_id: yaml.module_id || moduleId,
      title: title.trim(),
      summary,
      char_span: yaml.char_span,
      module_type: yaml.module_type,
      semantic_roles: semanticRoles,
      is_skill_signal: yaml.is_skill_signal !== false,
      is_background: isBackground,
      confidence: yaml.confidence,
      argument_layer: pickArgumentLayer(semanticRoles),
    };

    modules.push(moduleRecord);
  }

  return modules;
}

function pickSummary(yaml) {
  if (yaml.claim) return yaml.claim;
  if (yaml.concept_core) return yaml.concept_core;
  if (Array.isArray(yaml.procedure) && yaml.procedure[0]) return yaml.procedure[0];
  if (yaml.outcome) return yaml.outcome;
  return '';
}

function pickArgumentLayer(roles) {
  for (const layerId of LAYER_ORDER) {
    const layer = ARGUMENT_LAYERS[layerId];
    if (roles.some((role) => layer.roles.has(role))) return layerId;
  }
  return 'other';
}

function parseEdges(text, modules, warnings) {
  const moduleIds = new Set(modules.map((m) => m.module_id));
  const edges = [];
  let edgeIndex = 0;

  for (const line of text.split('\n')) {
    if (!line.trim().startsWith('|')) continue;
    if (line.includes('source') && line.includes('type') && line.includes('target')) continue;
    if (/^\|\s*-+\s*\|/.test(line)) continue;

    const cells = line
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean);

    if (cells.length < 4) continue;
    const [source, type, target, evidenceSpan, evidenceSummary = ''] = cells;
    if (!/^M\d+$/.test(source) || !/^M\d+$/.test(target)) continue;

    const edgeId = `E${String(edgeIndex).padStart(2, '0')}`;
    edgeIndex += 1;

    if (!CANONICAL_EDGE_TYPES.has(type)) {
      warnings.push({
        code: 'unknown_edge_type',
        message: `邊 ${edgeId} 類型 "${type}" 非 canonical 模塊層邊，不進圖。`,
        edge_id: edgeId,
      });
      continue;
    }

    if (!moduleIds.has(source) || !moduleIds.has(target)) {
      warnings.push({
        code: 'dangling_endpoint',
        message: `邊 ${edgeId} (${source} → ${target}) 端點不存在，不進圖。`,
        edge_id: edgeId,
      });
      continue;
    }

    edges.push({
      edge_id: edgeId,
      source,
      target,
      type,
      evidence_char_span: evidenceSpan,
      evidence_summary: evidenceSummary,
    });
  }

  return edges;
}

function buildPipelineSummary(source, modules, edges) {
  const skillModules = modules.filter((m) => m.is_skill_signal && !m.is_background);
  const backgroundModules = modules.filter((m) => m.is_background);

  return {
    stages: [
      {
        id: 'ingest',
        label: '收錄',
        status: 'done',
        artifact_count: 1,
        note: source.source_id,
      },
      {
        id: 'modularize',
        label: '模塊化',
        status: 'done',
        artifact_count: modules.length,
      },
      {
        id: 'extract_edges',
        label: '抽邊',
        status: 'done',
        artifact_count: edges.length,
      },
      {
        id: 'skill_align',
        label: '技能對齊',
        status: 'pending',
        artifact_count: skillModules.length,
        note: 'Inline 試作未接入登記簿',
      },
      {
        id: 'dynamic_view',
        label: 'Dynamic View',
        status: 'done',
        artifact_count: 5,
        note: 'Inline 投影（本 views/）',
      },
    ],
    metrics: {
      source_count: 1,
      module_count: modules.length,
      skill_module_count: skillModules.length,
      background_module_count: backgroundModules.length,
      edge_count: edges.length,
    },
  };
}
