import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { cosine, localHashEmbedding, LOCAL_EMBEDDING_VERSION } from './embedding.mjs';

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  return value;
}

export function nodeDescription(node) {
  return [node.preferred_label, node.display_name, ...node.aliases].join('\n');
}

export function registrySnapshot(nodes) {
  const identity = nodes.map(({node_id, preferred_label, display_name, aliases}) => ({node_id, preferred_label, display_name, aliases}));
  return `sha256:${createHash('sha256').update(JSON.stringify(stable(identity))).digest('hex')}`;
}

async function readCache(file) {
  try { return JSON.parse(await readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT' || error instanceof SyntaxError) return null; throw error; }
}

export async function loadOrBuildIndex(root, nodes, {embed = localHashEmbedding, embeddingVersion = LOCAL_EMBEDDING_VERSION} = {}) {
  const snapshot = registrySnapshot(nodes);
  const directory = path.join(root, 'embeddings');
  const file = path.join(directory, 'index.json');
  const cached = await readCache(file);
  if (cached?.snapshot === snapshot && cached?.embedding_version === embeddingVersion && cached.nodes?.length === nodes.length) return cached;
  const built = {
    format_version: 1,
    embedding_version: embeddingVersion,
    snapshot,
    nodes: await Promise.all(nodes.map(async (node) => ({node_id:node.node_id, vector:await embed(nodeDescription(node))})))
  };
  await mkdir(directory, {recursive:true});
  const temporary = path.join(directory, `.index-${randomUUID()}.tmp`);
  await writeFile(temporary, `${JSON.stringify(built)}\n`, 'utf8');
  await rename(temporary, file);
  return built;
}

export async function retrieveCandidates(moduleProjection, nodes, index, {embed = localHashEmbedding, limit = 5} = {}) {
  const queryText = [moduleProjection.domain, ...moduleProjection.operations, moduleProjection.problem_type, moduleProjection.input_type, moduleProjection.output_type].join('\n');
  const query = await embed(queryText);
  const byId = new Map(nodes.map((node) => [node.node_id, node]));
  return index.nodes
    .map(({node_id, vector}) => ({node_id, similarity:cosine(query, vector), node:byId.get(node_id)}))
    .sort((left, right) => right.similarity - left.similarity || left.node_id.localeCompare(right.node_id))
    .slice(0, Math.min(limit, index.nodes.length))
    .map(({node_id, similarity, node}) => ({node_id, similarity, preferred_label:node.preferred_label, display_name:node.display_name, aliases:node.aliases}));
}
