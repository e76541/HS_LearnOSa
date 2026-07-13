import { invariant } from '../core/errors.mjs';
import { nextId } from '../core/ids.mjs';
import { projectModuleCore, projectionFingerprint } from '../core/module-core.mjs';
import { applyTransaction, loadStore } from '../core/store.mjs';
import { loadOrBuildIndex, retrieveCandidates } from './index-cache.mjs';
import { validateJudgeResult } from './judge.mjs';

function subjectId(module, fingerprint) {
  return `${module.source_id}#${module.module_id}@${fingerprint}`;
}

function existingReview(store, subject, engineVersion, snapshot) {
  return store.reviews.find((review) => review.kind === 'alignment' && review.subject_id === subject && review.suggestion?.engine_version === engineVersion && review.suggestion?.registry_snapshot === snapshot);
}

export async function shadowAlign(root, module, options = {}) {
  invariant(typeof options.judge === 'function', 'JUDGE_REQUIRED', 'Shadow align requires a structured fine judge');
  const projection = projectModuleCore(module);
  const fingerprint = projectionFingerprint(module);
  let store = await loadStore(root);
  const index = await loadOrBuildIndex(root, store.nodes, options);
  const candidates = await retrieveCandidates(projection, store.nodes, index, options);
  const engineVersion = options.engineVersion ?? 'registry-align-v1';
  const subject = subjectId(projection, fingerprint);
  const prior = existingReview(store, subject, engineVersion, index.snapshot);
  if (prior) return {review_id:prior.review_id, candidates:prior.suggestion.candidates, suggestion:prior.suggestion, replayed:true};

  const raw = await options.judge({module:projection,candidates,registry_snapshot:index.snapshot,engine_version:engineVersion});
  const decision = validateJudgeResult(raw, candidates);
  const chosen = candidates.find((candidate) => candidate.node_id === decision.candidate_node_id);
  const riskFlags = [];
  if (decision.decision === 'related') riskFlags.push('broader_than_requires_human_review');
  if (decision.decision === 'related' && decision.relation_direction === 'uncertain') riskFlags.push('relation_direction_uncertain');
  if (decision.decision === 'same') {
    const node = store.nodes.find((item) => item.node_id === decision.candidate_node_id);
    if (node?.proficiency !== 'new') riskFlags.push('dedup_downgrade_requires_human_review');
  }
  const suggestion = {
    decision:decision.decision,
    ...(decision.candidate_node_id ? {candidate_node_id:decision.candidate_node_id} : {}),
    ...(decision.relation_direction ? {relation_direction:decision.relation_direction} : {}),
    reason:decision.reason,
    confidence:decision.confidence,
    candidates,
    engine_version:engineVersion,
    embedding_version:index.embedding_version,
    registry_snapshot:index.snapshot,
    projection_fingerprint:fingerprint,
    module:projection,
    ...(chosen ? {candidate_rank:candidates.indexOf(chosen) + 1} : {})
  };
  const now = options.now ?? new Date().toISOString();
  for (let attempt = 0; attempt < 3; attempt += 1) {
    store = await loadStore(root);
    const concurrent = existingReview(store, subject, engineVersion, index.snapshot);
    if (concurrent) return {review_id:concurrent.review_id,candidates:concurrent.suggestion.candidates,suggestion:concurrent.suggestion,replayed:true};
    const review = {review_id:nextId('reviews', store.reviews),kind:'alignment',subject_id:subject,suggestion,risk_flags:riskFlags,status:'pending',created_at:now};
    try {
      await applyTransaction(root, {changes:[{table:'reviews',mode:'insert',record:review}],actor:{type:'system',id:engineVersion},reason:'shadow alignment suggestion',now});
      return {review_id:review.review_id,candidates,suggestion,replayed:false};
    } catch (error) {
      if (!['NON_MONOTONIC_ID', 'STORE_LOCKED'].includes(error.code) || attempt === 2) throw error;
    }
  }
}
