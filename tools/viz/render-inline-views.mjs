import fs from 'node:fs';
import path from 'node:path';
import { ARGUMENT_LAYERS, LAYER_ORDER } from './lib/constants.mjs';

export function renderInlineViews(projection, outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });

  const defaultModule = projection.modules.find((m) => m.is_skill_signal && !m.is_background);
  const files = {
    'index.md': renderIndex(projection, defaultModule),
    'pipeline.md': renderPipeline(projection),
    'full-graph.md': renderFullGraph(projection),
    'argument-layers.md': renderArgumentLayers(projection),
    '_warnings.md': renderWarnings(projection.warnings),
    '_data.json': JSON.stringify(projection, null, 2) + '\n',
  };

  if (defaultModule) {
    files[`focus-${defaultModule.module_id}.md`] = renderFocusGraph(
      projection,
      defaultModule.module_id,
    );
    files[`flow-panel-${defaultModule.module_id}.md`] = renderFlowPanel(
      projection,
      defaultModule.module_id,
    );
  }

  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(outputDir, name), content, 'utf8');
  }

  return Object.keys(files);
}

function renderIndex(projection, defaultModule) {
  const { source, pipeline } = projection;
  const metrics = pipeline.metrics;

  return `# 視圖索引 — ${source.title}

> 自動生成；唯讀投影。不回寫 \`modules.md\` / \`edges.md\`。

| 指標 | 數值 |
|---|---|
| 來源 | \`${source.source_id}\` |
| 模塊 | ${metrics.module_count} |
| 技能模塊 | ${metrics.skill_module_count} |
| 結構邊 | ${metrics.edge_count} |

## 視圖

| 檔案 | 說明 |
|---|---|
| [pipeline.md](./pipeline.md) | 管線階段與產物摘要 |
| [full-graph.md](./full-graph.md) | 全模塊全邊 |
| [argument-layers.md](./argument-layers.md) | 論證分層 |
${defaultModule ? `| [focus-${defaultModule.module_id}.md](./focus-${defaultModule.module_id}.md) | 預設焦點鄰域（${defaultModule.module_id}） |\n| [flow-panel-${defaultModule.module_id}.md](./flow-panel-${defaultModule.module_id}.md) | 流向面板（${defaultModule.module_id}） |` : ''}
| [_warnings.md](./_warnings.md) | 解析警示 |
| [_data.json](./_data.json) | 中間 JSON（Phase 1 草案） |
`;
}

function renderPipeline(projection) {
  const { source, pipeline } = projection;
  const metrics = pipeline.metrics;

  const stageRows = pipeline.stages
    .map(
      (stage) =>
        `| ${stage.label} | ${stage.status} | ${stage.artifact_count} | ${stage.note ?? ''} |`,
    )
    .join('\n');

  const mermaidStages = pipeline.stages
    .map((stage, index) => {
      const nodeId = `S${index}`;
      const next = pipeline.stages[index + 1];
      const line = next ? `  ${nodeId} --> S${index + 1}` : '';
      return { nodeId, label: stage.label, line };
    });

  const mermaid = [
    'flowchart LR',
    ...mermaidStages.map((s) => `  ${s.nodeId}["${escapeMermaid(s.label)}"]`),
    ...mermaidStages.map((s) => s.line).filter(Boolean),
    '  classDef done fill:#e8f5e9,stroke:#2e7d32',
    '  classDef pending fill:#fff8e1,stroke:#f9a825',
    ...pipeline.stages.map((stage, index) => {
      const cls = stage.status === 'done' ? 'done' : 'pending';
      return `  class S${index} ${cls}`;
    }),
  ].join('\n');

  return `# 管線總覽 — ${source.title}

## 指標

| 指標 | 數值 |
|---|---|
| 來源數 | ${metrics.source_count} |
| 模塊 | ${metrics.module_count} |
| 技能模塊 | ${metrics.skill_module_count} |
| 背景模塊 | ${metrics.background_module_count} |
| 結構邊 | ${metrics.edge_count} |

## 階段

| 階段 | 狀態 | 產物數 | 備註 |
|---|---|---|---|
${stageRows}

## 管線圖

\`\`\`mermaid
${mermaid}
\`\`\`
`;
}

function renderFullGraph(projection) {
  const { edges, modules } = projection;
  const moduleMap = new Map(modules.map((m) => [m.module_id, m]));
  const lines = ['flowchart LR'];

  for (const mod of modules) {
    if (!mod.is_skill_signal && mod.is_background) continue;
    lines.push(`  ${mod.module_id}["${nodeLabel(mod)}"]`);
  }

  for (const edge of edges) {
    lines.push(
      `  ${edge.source} -->|${edge.type}| ${edge.target}`,
    );
  }

  lines.push('  classDef background stroke:#f9a825,stroke-width:2px,stroke-dasharray:5 5,fill:#fffde7');
  for (const mod of modules) {
    if (mod.is_background) {
      lines.push(`  class ${mod.module_id} background`);
    }
  }

  const edgeTable = edges
    .map(
      (edge) =>
        `| ${edge.edge_id} | ${edge.source} | ${edge.type} | ${edge.target} | ${edge.evidence_char_span} | ${edge.evidence_summary} |`,
    )
    .join('\n');

  return `# 全圖 — ${projection.source.title}

\`\`\`mermaid
${lines.join('\n')}
\`\`\`

## 邊帳本

| ID | 來源 | 類型 | 目標 | 證據 span | 摘要 |
|---|---|---|---|---|---|
${edgeTable}

## 模塊溯源

${modules
  .map(
    (mod) =>
      `- **${mod.module_id}** ${mod.title} — \`char_span: [${mod.char_span?.join(', ') ?? '?'}]\` — ${mod.summary}`,
  )
  .join('\n')}
`;
}

function renderArgumentLayers(projection) {
  const { modules, edges } = projection;
  const grouped = Object.fromEntries(LAYER_ORDER.map((id) => [id, []]));

  for (const mod of modules) {
    if (mod.argument_layer === 'other') continue;
    grouped[mod.argument_layer]?.push(mod);
  }

  const lines = ['flowchart TB'];

  for (const layerId of LAYER_ORDER) {
    const layer = ARGUMENT_LAYERS[layerId];
    const mods = grouped[layerId];
    if (!mods.length) continue;
    lines.push(`  subgraph ${layerId}["${layer.label}"]`);
    lines.push('    direction LR');
    for (const mod of mods) {
      lines.push(`    ${mod.module_id}["${nodeLabel(mod)}"]`);
    }
    lines.push('  end');
  }

  for (const edge of edges) {
    lines.push(`  ${edge.source} -->|${edge.type}| ${edge.target}`);
  }

  lines.push('  classDef background stroke:#f9a825,stroke-width:2px,stroke-dasharray:5 5,fill:#fffde7');
  for (const mod of modules) {
    if (mod.is_background) {
      lines.push(`  class ${mod.module_id} background`);
    }
  }

  const layerTable = modules
    .map(
      (mod) =>
        `| ${mod.module_id} | ${mod.title} | ${mod.semantic_roles.join(', ')} | ${ARGUMENT_LAYERS[mod.argument_layer]?.label ?? '其他'} |`,
    )
    .join('\n');

  return `# 論證分層 — ${projection.source.title}

\`\`\`mermaid
${lines.join('\n')}
\`\`\`

## 分層對照

| 模塊 | 標題 | semantic_roles | 分層 |
|---|---|---|---|
${layerTable}
`;
}

function renderFocusGraph(projection, moduleId) {
  const { edges, modules } = projection;
  const focus = modules.find((m) => m.module_id === moduleId);
  if (!focus) throw new Error(`Module ${moduleId} not found`);

  const upstream = new Set(
    edges.filter((e) => e.target === moduleId).map((e) => e.source),
  );
  const downstream = new Set(
    edges.filter((e) => e.source === moduleId).map((e) => e.target),
  );
  const visible = new Set([moduleId, ...upstream, ...downstream]);

  const visibleEdges = edges.filter(
    (e) => visible.has(e.source) && visible.has(e.target),
  );

  const lines = ['flowchart LR'];
  for (const mod of modules) {
    if (!visible.has(mod.module_id)) continue;
    lines.push(`  ${mod.module_id}["${nodeLabel(mod)}"]`);
  }
  for (const edge of visibleEdges) {
    lines.push(`  ${edge.source} -->|${edge.type}| ${edge.target}`);
  }
  lines.push('  classDef focus fill:#e3f2fd,stroke:#1565c0,stroke-width:2px');
  lines.push(`  class ${moduleId} focus`);

  return `# 焦點鄰域 — ${focus.title} (${moduleId})

一階上游 ${upstream.size}、下游 ${downstream.size}。

\`\`\`mermaid
${lines.join('\n')}
\`\`\`

${renderFlowPanelBody(projection, moduleId)}
`;
}

function renderFlowPanel(projection, moduleId) {
  const mod = projection.modules.find((m) => m.module_id === moduleId);
  if (!mod) throw new Error(`Module ${moduleId} not found`);

  return `# 流向面板 — ${mod.title} (${moduleId})

${renderFlowPanelBody(projection, moduleId)}
`;
}

function renderFlowPanelBody(projection, moduleId) {
  const { edges, modules } = projection;
  const moduleMap = new Map(modules.map((m) => [m.module_id, m]));
  const focus = moduleMap.get(moduleId);

  const upstreamEdges = edges.filter((e) => e.target === moduleId);
  const downstreamEdges = edges.filter((e) => e.source === moduleId);

  const upstreamRows = upstreamEdges
    .map((edge) => {
      const mod = moduleMap.get(edge.source);
      return `| ${edge.source} | ${mod?.title ?? '?'} | ${edge.type} | ${edge.evidence_char_span} |`;
    })
    .join('\n');

  const downstreamRows = downstreamEdges
    .map((edge) => {
      const mod = moduleMap.get(edge.target);
      return `| ${edge.target} | ${mod?.title ?? '?'} | ${edge.type} | ${edge.evidence_char_span} |`;
    })
    .join('\n');

  const allEdgeRows = [...upstreamEdges, ...downstreamEdges]
    .map(
      (edge) =>
        `| ${edge.edge_id} | ${edge.source} | ${edge.type} | ${edge.target} | ${edge.evidence_char_span} | ${edge.evidence_summary} |`,
    )
    .join('\n');

  return `## 目前模塊

| 欄位 | 值 |
|---|---|
| module_id | ${focus.module_id} |
| 標題 | ${focus.title} |
| char_span | \`[${focus.char_span.join(', ')}]\` |
| module_type | ${focus.module_type} |
| semantic_roles | ${focus.semantic_roles.join(', ')} |
| 摘要 | ${focus.summary} |

## 上游輸入

| 來源 | 標題 | 邊類型 | 證據 span |
|---|---|---|---|
${upstreamRows || '| — | — | — | — |'}

## 下游流向

| 目標 | 標題 | 邊類型 | 證據 span |
|---|---|---|---|
${downstreamRows || '| — | — | — | — |'}

## 關聯邊帳本

| ID | 來源 | 類型 | 目標 | 證據 span | 摘要 |
|---|---|---|---|---|---|
${allEdgeRows || '| — | — | — | — | — |'}
`;
}

function renderWarnings(warnings) {
  if (!warnings.length) {
    return `# 解析警示

無警示。所有模塊與邊均已納入投影。
`;
  }

  const rows = warnings
    .map(
      (w) =>
        `| ${w.code} | ${w.module_id ?? ''} | ${w.edge_id ?? ''} | ${w.message} |`,
    )
    .join('\n');

  return `# 解析警示

| code | module_id | edge_id | 訊息 |
|---|---|---|---|
${rows}
`;
}

function nodeLabel(mod) {
  const title = mod.title.replace(/"/g, "'");
  return escapeMermaid(`${title}｜${mod.module_id}`);
}

function escapeMermaid(text) {
  return text.replace(/"/g, "'").replace(/[[\]{}#;|]/g, ' ');
}
