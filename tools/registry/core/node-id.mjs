import { RegistryValidationError, invariant } from './errors.mjs';
import { nextId, parseId } from './ids.mjs';
import { applyTransaction, loadStore } from './store.mjs';

function normalizeAliases(aliases = []) {
  invariant(Array.isArray(aliases), 'INVALID_FIELD', 'aliases must be an array');
  const normalized = aliases.map((alias) => alias.trim()).filter(Boolean);
  invariant(new Set(normalized).size === normalized.length, 'DUPLICATE_VALUE', 'aliases must not contain duplicates');
  return normalized;
}

function findByLabel(nodes, label) {
  return nodes.find((node) => node.preferred_label === label || node.aliases.includes(label));
}

export async function resolveNodeId(root, query) {
  const store = await loadStore(root);
  if (typeof query === 'string' && /^SKILL-/.test(query)) {
    parseId('nodes', query);
    invariant(store.nodes.some((node) => node.node_id === query), 'MISSING_NODE', `${query} does not exist`);
    return query;
  }
  const label = typeof query === 'string' ? query : query?.preferred_label;
  invariant(typeof label === 'string' && label, 'INVALID_NODE_QUERY', 'node_id requires an ID or preferred label');
  const node = findByLabel(store.nodes, label);
  invariant(node, 'MISSING_NODE', `No SkillNode matches ${label}`);
  return node.node_id;
}

export async function createNodeId(root, request) {
  invariant(request?.actor?.type === 'human' && request.actor.id, 'HUMAN_REVIEW_REQUIRED', 'SkillNode creation requires a named human actor');
  invariant(/^[a-z][a-z0-9_]*$/.test(request.preferred_label ?? ''), 'INVALID_LABEL', 'preferred_label must be an English storage identifier');
  invariant(typeof request.display_name === 'string' && request.display_name, 'INVALID_FIELD', 'display_name is required');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const store = await loadStore(root);
    const existing = findByLabel(store.nodes, request.preferred_label);
    if (existing) return existing.node_id;
    const now = request.now ?? new Date().toISOString();
    const record = {
      node_id: nextId('nodes', store.nodes),
      preferred_label: request.preferred_label,
      display_name: request.display_name,
      aliases: normalizeAliases(request.aliases),
      proficiency: 'new',
      proficiency_updated_at: now,
      evidence_refs: []
    };
    try {
      await applyTransaction(root, {changes:[{table:'nodes',mode:'insert',record}],actor:request.actor,reason:request.reason,now});
      return record.node_id;
    } catch (error) {
      if (!['NON_MONOTONIC_ID', 'STORE_LOCKED'].includes(error.code) || attempt === 2) throw error;
    }
  }
  throw new RegistryValidationError('ID_ALLOCATION_FAILED', 'Could not allocate node_id');
}

export async function updateNodeIdentity(root, request) {
  invariant(request?.actor?.type === 'human' && request.actor.id, 'HUMAN_REVIEW_REQUIRED', 'SkillNode identity updates require a named human actor');
  const store = await loadStore(root);
  const current = store.nodes.find((node) => node.node_id === request.node_id);
  invariant(current, 'MISSING_NODE', `${request.node_id} does not exist`);
  invariant(request.aliases === undefined, 'ALIASES_REQUIRE_REVIEW', 'Alias changes must be applied by an approved same review');
  const record = {
    ...current,
    preferred_label: request.preferred_label ?? current.preferred_label,
    display_name: request.display_name ?? current.display_name,
    aliases: current.aliases
  };
  await applyTransaction(root, {changes:[{table:'nodes',mode:'replace',key:request.node_id,record}],actor:request.actor,reason:request.reason,now:request.now});
  return request.node_id;
}
