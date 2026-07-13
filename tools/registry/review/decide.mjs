import { invariant } from '../core/errors.mjs';
import { nextId } from '../core/ids.mjs';
import { applyTransaction, loadStore } from '../core/store.mjs';
import { similarPending } from './pending.mjs';

const ACTIONS = new Set(['accept_same', 'reject', 'accept_relation', 'reject_relation']);

function moduleRef(module) {
  return {source_id:module.source_id,module_id:module.module_id,char_span:module.char_span};
}

function alignmentBase(store, review, module, decision, now) {
  const candidates = review.suggestion.candidates ?? [];
  const candidateRank = decision.candidate_node_id ? candidates.findIndex((candidate) => candidate.node_id === decision.candidate_node_id) + 1 : null;
  return {
    alignment_id:nextId('alignments', store.alignments),
    module_ref:moduleRef(module),
    module_eligibility:{is_skill_signal:module.is_skill_signal,semantic_roles:module.semantic_roles},
    projection_fingerprint:review.suggestion.projection_fingerprint,
    decision:decision.alignment_decision,
    status:'approved',
    ...(decision.candidate_node_id ? {node_id:decision.candidate_node_id} : {}),
    ...(decision.pending_id ? {pending_id:decision.pending_id} : {}),
    candidate_rank:candidateRank || null,
    review_id:review.review_id,
    engine_version:review.suggestion.engine_version,
    created_at:now
  };
}

function decidedReview(review, request, decision, now, status = 'approved') {
  return {...review,decision,status,operator:request.actor.id,reason:request.reason,decided_at:now};
}

function candidateFromReview(review, nodeId) {
  const candidate = (review.suggestion.candidates ?? []).find((item) => item.node_id === nodeId);
  invariant(candidate, 'INVALID_REVIEW_DECISION', 'Selected node must be one of the reviewed top-five candidates');
  return candidate;
}

export async function decideReview(root, request) {
  invariant(request?.actor?.type === 'human' && request.actor.id, 'HUMAN_REVIEW_REQUIRED', 'Review decisions require a named human actor');
  invariant(typeof request.reason === 'string' && request.reason, 'REVIEW_REASON_REQUIRED', 'Review decisions require a reason');
  invariant(ACTIONS.has(request.action), 'INVALID_REVIEW_DECISION', 'Unsupported review action');
  const store = await loadStore(root);
  const review = store.reviews.find((item) => item.review_id === request.review_id);
  invariant(review, 'MISSING_REVIEW', `${request.review_id} does not exist`);
  if (review.status !== 'pending') {
    const requested = {...request}; delete requested.actor; delete requested.reason; delete requested.now; delete requested.review_id;
    if (Object.entries(requested).every(([field, value]) => review.decision?.[field] === value)) return {review_id:review.review_id,replayed:true,decision:review.decision};
    invariant(false, 'REVIEW_ALREADY_DECIDED', `${review.review_id} already has a different decision`);
  }
  const module = review.suggestion.module;
  invariant(module, 'INVALID_REVIEW', 'Alignment review is missing its ModuleCore projection');
  const now = request.now ?? new Date().toISOString();
  const changes = [];
  let decision;

  if (request.action === 'accept_same') {
    candidateFromReview(review, request.candidate_node_id);
    const node = store.nodes.find((item) => item.node_id === request.candidate_node_id);
    invariant(node, 'MISSING_NODE', `${request.candidate_node_id} does not exist`);
    decision = {action:'accept_same',candidate_node_id:request.candidate_node_id,alignment_decision:'same'};
    changes.push({table:'reviews',mode:'replace',key:review.review_id,record:decidedReview(review, request, decision, now)});
    const alias = module.output_type;
    if (typeof alias === 'string' && alias !== node.preferred_label && !node.aliases.includes(alias)) {
      changes.push({table:'nodes',mode:'replace',key:node.node_id,review_id:review.review_id,record:{...node,aliases:[...node.aliases,alias]}});
    }
    changes.push({table:'alignments',mode:'insert',record:alignmentBase(store, review, module, decision, now)});
  } else if (request.action === 'reject') {
    const pendingId = nextId('pending', store.pending);
    decision = {action:'reject',alignment_decision:'reject',pending_id:pendingId};
    const pending = {pending_id:pendingId,module_ref:moduleRef(module),module_projection:module,projection_fingerprint:review.suggestion.projection_fingerprint,similar_pending_ids:similarPending(module, store.pending),status:'open',created_at:now};
    changes.push({table:'reviews',mode:'replace',key:review.review_id,record:decidedReview(review, request, decision, now)});
    changes.push({table:'pending',mode:'insert',record:pending});
    changes.push({table:'alignments',mode:'insert',record:alignmentBase(store, review, module, decision, now)});
  } else if (request.action === 'accept_relation') {
    candidateFromReview(review, request.candidate_node_id);
    invariant(['candidate_broader','module_broader'].includes(request.direction), 'INVALID_REVIEW_DECISION', 'Accepted relation requires a resolved direction');
    invariant(store.nodes.some((node) => node.node_id === request.module_node_id), 'MISSING_NODE', 'Related module must already have a human-created SkillNode');
    const source = request.direction === 'candidate_broader' ? request.candidate_node_id : request.module_node_id;
    const target = request.direction === 'candidate_broader' ? request.module_node_id : request.candidate_node_id;
    decision = {action:'accept_relation',candidate_node_id:request.candidate_node_id,module_node_id:request.module_node_id,direction:request.direction,source,target,alignment_decision:'related'};
    const edge = {edge_id:nextId('edges', store.edges),source,target,type:'broader_than',review_id:review.review_id,approved_at:now};
    changes.push({table:'reviews',mode:'replace',key:review.review_id,record:decidedReview(review, request, decision, now)});
    changes.push({table:'alignments',mode:'insert',record:alignmentBase(store, review, module, decision, now)});
    changes.push({table:'edges',mode:'insert',record:edge});
  } else {
    decision = {action:'reject_relation'};
    changes.push({table:'reviews',mode:'replace',key:review.review_id,record:decidedReview(review, request, decision, now, 'rejected')});
  }

  await applyTransaction(root, {changes,actor:request.actor,reason:request.reason,now});
  return {review_id:review.review_id,replayed:false,decision};
}
