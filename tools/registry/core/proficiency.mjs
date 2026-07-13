import { invariant } from './errors.mjs';
import { applyTransaction, loadStore } from './store.mjs';

export async function readProficiency(root, nodeId) {
  const store = await loadStore(root);
  const node = store.nodes.find((item) => item.node_id === nodeId);
  invariant(node, 'MISSING_NODE', `${nodeId} does not exist`);
  return node.proficiency;
}

export async function setProficiency(root, request) {
  invariant(request?.actor?.type === 'human' && request.actor.id, 'HUMAN_REVIEW_REQUIRED', 'Proficiency changes require a named human actor');
  invariant(typeof request.reason === 'string' && request.reason, 'REVIEW_REASON_REQUIRED', 'Proficiency changes require a reason');
  invariant(Array.isArray(request.evidence_refs) && request.evidence_refs.length > 0, 'EVIDENCE_REF_REQUIRED', 'Proficiency changes require external evidence_refs');
  const store = await loadStore(root);
  const current = store.nodes.find((node) => node.node_id === request.node_id);
  invariant(current, 'MISSING_NODE', `${request.node_id} does not exist`);
  const now = request.now ?? new Date().toISOString();
  const record = {...current, proficiency:request.value, proficiency_updated_at:now, evidence_refs:[...new Set(request.evidence_refs)]};
  await applyTransaction(root, {changes:[{table:'nodes',mode:'replace',key:request.node_id,record}],actor:request.actor,reason:request.reason,now});
  return record.proficiency;
}
