import { invariant } from '../core/errors.mjs';

const DECISIONS = new Set(['same', 'related', 'reject']);
const DIRECTIONS = new Set(['candidate_broader', 'module_broader', 'uncertain']);
const FIELDS = new Set(['decision', 'candidate_node_id', 'reason', 'confidence', 'relation_direction']);

export function validateJudgeResult(result, candidates) {
  invariant(result && typeof result === 'object' && !Array.isArray(result), 'INVALID_JUDGE_OUTPUT', 'Judge output must be a structured object');
  invariant(Object.keys(result).every((field) => FIELDS.has(field)), 'INVALID_JUDGE_OUTPUT', 'Judge output contains unknown fields');
  invariant(DECISIONS.has(result.decision), 'INVALID_JUDGE_OUTPUT', 'Judge decision must be same, related, or reject');
  invariant(typeof result.reason === 'string' && result.reason.trim(), 'INVALID_JUDGE_OUTPUT', 'Judge reason is required');
  invariant(typeof result.confidence === 'number' && result.confidence >= 0 && result.confidence <= 1, 'INVALID_JUDGE_OUTPUT', 'Judge confidence must be between 0 and 1');
  const candidateIds = new Set(candidates.map((candidate) => candidate.node_id));
  if (result.decision === 'reject') {
    invariant(!Object.hasOwn(result, 'candidate_node_id'), 'INVALID_JUDGE_OUTPUT', 'reject cannot carry candidate_node_id');
    invariant(!Object.hasOwn(result, 'relation_direction'), 'INVALID_JUDGE_OUTPUT', 'reject cannot carry relation_direction');
  } else {
    invariant(candidateIds.has(result.candidate_node_id), 'INVALID_JUDGE_OUTPUT', 'Judge candidate must come from the top-five set');
    if (result.decision === 'related') invariant(DIRECTIONS.has(result.relation_direction), 'INVALID_JUDGE_OUTPUT', 'related requires a closed relation_direction');
    else invariant(!Object.hasOwn(result, 'relation_direction'), 'INVALID_JUDGE_OUTPUT', 'same cannot carry relation_direction');
  }
  return result;
}
