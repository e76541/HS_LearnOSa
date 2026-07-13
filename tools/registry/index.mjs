import { createNodeId, resolveNodeId, updateNodeIdentity } from './core/node-id.mjs';
import { readProficiency } from './core/proficiency.mjs';
import { shadowAlign } from './align/operation.mjs';
import { findPending } from './review/pending.mjs';

export async function node_id(root, request) {
  if (request?.action === 'create') return createNodeId(root, request);
  if (request?.action === 'update') return updateNodeIdentity(root, request);
  return resolveNodeId(root, request?.node_id ?? request?.preferred_label ?? request);
}

export async function proficiency(root, nodeId) {
  return readProficiency(root, nodeId);
}

export async function align(root, module, options) {
  return shadowAlign(root, module, options);
}

export async function pending(root, module) {
  return findPending(root, module);
}
