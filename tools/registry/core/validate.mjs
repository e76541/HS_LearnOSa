import { ID_SPECS, parseId } from './ids.mjs';
import { invariant } from './errors.mjs';

export const TABLE_FILES = Object.freeze({
  nodes: 'nodes.jsonl', edges: 'edges.jsonl', alignments: 'alignments.jsonl',
  pending: 'pending.jsonl', reviews: 'reviews.jsonl', events: 'events.jsonl'
});

const PROFICIENCIES = new Set(['new', 'learning', 'mastered']);
const DECISIONS = new Set(['same', 'related', 'reject']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
const ALLOWED_FIELDS = Object.freeze({
  nodes: ['node_id', 'preferred_label', 'display_name', 'aliases', 'proficiency', 'proficiency_updated_at', 'evidence_refs'],
  edges: ['edge_id', 'source', 'target', 'type', 'review_id', 'approved_at'],
  alignments: ['alignment_id', 'module_ref', 'module_eligibility', 'projection_fingerprint', 'decision', 'status', 'node_id', 'pending_id', 'candidate_rank', 'review_id', 'engine_version', 'created_at'],
  pending: ['pending_id', 'module_ref', 'module_projection', 'projection_fingerprint', 'similar_pending_ids', 'status', 'promotion_review_id', 'created_at'],
  reviews: ['review_id', 'kind', 'subject_id', 'suggestion', 'decision', 'risk_flags', 'status', 'operator', 'reason', 'created_at', 'decided_at'],
  events: ['event_id', 'event_type', 'entity_type', 'entity_id', 'actor_type', 'actor_id', 'reason', 'before', 'after', 'created_at']
});

function object(value, code = 'INVALID_RECORD') {
  invariant(value && typeof value === 'object' && !Array.isArray(value), code, 'Record must be an object');
}

function required(record, fields) {
  for (const field of fields) invariant(Object.hasOwn(record, field), 'MISSING_FIELD', `Missing required field: ${field}`, {field});
}

function closed(record, allowed, label) {
  const extras = Object.keys(record).filter((field) => !allowed.includes(field));
  invariant(extras.length === 0, 'UNKNOWN_FIELD', `${label} contains unknown fields: ${extras.join(', ')}`, {extras});
}

function timestamp(value, field) {
  invariant(typeof value === 'string' && ISO_DATE.test(value) && !Number.isNaN(Date.parse(value)), 'INVALID_TIMESTAMP', `${field} must be a UTC RFC 3339 timestamp`);
}

function strings(value, field, {unique = false} = {}) {
  invariant(Array.isArray(value) && value.every((item) => typeof item === 'string' && item.length > 0), 'INVALID_FIELD', `${field} must be an array of non-empty strings`);
  if (unique) invariant(new Set(value).size === value.length, 'DUPLICATE_VALUE', `${field} must not contain duplicates`);
}

function moduleRef(value) {
  object(value);
  closed(value, ['source_id', 'module_id', 'char_span'], 'module_ref');
  required(value, ['source_id', 'module_id', 'char_span']);
  invariant(typeof value.source_id === 'string' && value.source_id, 'INVALID_MODULE_REF', 'module_ref.source_id is required');
  invariant(typeof value.module_id === 'string' && value.module_id, 'INVALID_MODULE_REF', 'module_ref.module_id is required');
  invariant(Array.isArray(value.char_span) && value.char_span.length === 2 && value.char_span.every(Number.isInteger) && value.char_span[0] >= 0 && value.char_span[1] > value.char_span[0], 'INVALID_MODULE_REF', 'module_ref.char_span must be a non-empty [start,end) range');
}

export function validateRecord(table, record) {
  object(record);
  const spec = ID_SPECS[table];
  invariant(spec, 'UNKNOWN_TABLE', `Unknown registry table: ${table}`);
  required(record, [spec.field]);
  closed(record, ALLOWED_FIELDS[table], table);
  parseId(table, record[spec.field]);

  if (table === 'nodes') {
    required(record, ['preferred_label', 'display_name', 'aliases', 'proficiency', 'proficiency_updated_at', 'evidence_refs']);
    invariant(/^[a-z][a-z0-9_]*$/.test(record.preferred_label), 'INVALID_LABEL', 'preferred_label must be an English storage identifier');
    invariant(typeof record.display_name === 'string' && record.display_name, 'INVALID_FIELD', 'display_name is required');
    strings(record.aliases, 'aliases', {unique: true});
    invariant(PROFICIENCIES.has(record.proficiency), 'INVALID_PROFICIENCY', 'proficiency must be new, learning, or mastered');
    timestamp(record.proficiency_updated_at, 'proficiency_updated_at');
    strings(record.evidence_refs, 'evidence_refs', {unique: true});
  } else if (table === 'edges') {
    required(record, ['source', 'target', 'type', 'review_id', 'approved_at']);
    parseId('nodes', record.source); parseId('nodes', record.target); parseId('reviews', record.review_id);
    invariant(record.source !== record.target, 'SELF_EDGE', 'Registry edges cannot be self edges');
    invariant(record.type === 'broader_than', 'INVALID_EDGE_TYPE', 'Only broader_than registry edges are allowed');
    timestamp(record.approved_at, 'approved_at');
  } else if (table === 'alignments') {
    required(record, ['module_ref', 'module_eligibility', 'projection_fingerprint', 'decision', 'status', 'candidate_rank', 'review_id', 'engine_version', 'created_at']);
    moduleRef(record.module_ref);
    object(record.module_eligibility);
    closed(record.module_eligibility, ['is_skill_signal', 'semantic_roles'], 'module_eligibility');
    required(record.module_eligibility, ['is_skill_signal', 'semantic_roles']);
    invariant(record.module_eligibility.is_skill_signal === true, 'NO_SKILL_SIGNAL', 'Alignment cannot record a non-skill signal');
    strings(record.module_eligibility.semantic_roles, 'semantic_roles');
    invariant(!record.module_eligibility.semantic_roles.includes('background'), 'BACKGROUND_NOT_ALIGNABLE', 'Alignment cannot record a background module');
    invariant(/^sha256:[a-f0-9]{64}$/.test(record.projection_fingerprint), 'INVALID_FINGERPRINT', 'projection_fingerprint must be sha256');
    invariant(DECISIONS.has(record.decision), 'INVALID_DECISION', 'decision must be same, related, or reject');
    invariant(['suggested', 'approved', 'rejected'].includes(record.status), 'INVALID_STATUS', 'Invalid alignment status');
    parseId('reviews', record.review_id);
    invariant(typeof record.engine_version === 'string' && record.engine_version, 'INVALID_FIELD', 'engine_version is required');
    timestamp(record.created_at, 'created_at');
    if (record.decision === 'reject') {
      required(record, ['pending_id']); parseId('pending', record.pending_id);
      invariant(!Object.hasOwn(record, 'node_id'), 'REJECT_HAS_NODE', 'reject alignment cannot carry node_id');
      invariant(record.candidate_rank === null, 'INVALID_CANDIDATE_RANK', 'reject alignment candidate_rank must be null');
    } else {
      required(record, ['node_id']); parseId('nodes', record.node_id);
      invariant(!Object.hasOwn(record, 'pending_id'), 'MATCH_HAS_PENDING', 'same/related alignment cannot carry pending_id');
      invariant(Number.isInteger(record.candidate_rank) && record.candidate_rank >= 1 && record.candidate_rank <= 5, 'INVALID_CANDIDATE_RANK', 'candidate_rank must be 1..5');
    }
  } else if (table === 'pending') {
    required(record, ['module_ref', 'module_projection', 'projection_fingerprint', 'similar_pending_ids', 'status', 'created_at']);
    moduleRef(record.module_ref);
    object(record.module_projection);
    invariant(/^sha256:[a-f0-9]{64}$/.test(record.projection_fingerprint), 'INVALID_FINGERPRINT', 'projection_fingerprint must be sha256');
    strings(record.similar_pending_ids, 'similar_pending_ids', {unique: true});
    record.similar_pending_ids.forEach((id) => parseId('pending', id));
    invariant(['open', 'reviewed', 'promoted', 'rejected'].includes(record.status), 'INVALID_STATUS', 'Invalid pending status');
    timestamp(record.created_at, 'created_at');
    if (record.status === 'promoted') { required(record, ['promotion_review_id']); parseId('reviews', record.promotion_review_id); }
  } else if (table === 'reviews') {
    required(record, ['kind', 'subject_id', 'suggestion', 'status', 'created_at']);
    invariant(['alignment', 'broader_than', 'pending_promotion', 'proficiency'].includes(record.kind), 'INVALID_REVIEW_KIND', 'Invalid review kind');
    invariant(typeof record.subject_id === 'string' && record.subject_id, 'INVALID_FIELD', 'subject_id is required');
    object(record.suggestion);
    invariant(['pending', 'approved', 'rejected'].includes(record.status), 'INVALID_STATUS', 'Invalid review status');
    timestamp(record.created_at, 'created_at');
    if (record.status !== 'pending') {
      required(record, ['decision', 'operator', 'reason', 'decided_at']);
      object(record.decision);
      invariant(typeof record.operator === 'string' && record.operator, 'HUMAN_REVIEW_REQUIRED', 'Decided review requires operator');
      invariant(typeof record.reason === 'string' && record.reason, 'REVIEW_REASON_REQUIRED', 'Decided review requires reason');
      timestamp(record.decided_at, 'decided_at');
    }
  } else if (table === 'events') {
    required(record, ['event_type', 'entity_type', 'entity_id', 'actor_type', 'actor_id', 'reason', 'created_at']);
    invariant(['insert', 'replace', 'review_decision', 'proficiency_change'].includes(record.event_type), 'INVALID_EVENT_TYPE', 'Invalid event type');
    invariant(['node', 'edge', 'alignment', 'pending', 'review'].includes(record.entity_type), 'INVALID_ENTITY_TYPE', 'Invalid event entity_type');
    invariant(['system', 'human'].includes(record.actor_type), 'INVALID_ACTOR', 'Invalid actor_type');
    invariant(typeof record.actor_id === 'string' && record.actor_id, 'INVALID_ACTOR', 'actor_id is required');
    invariant(typeof record.reason === 'string' && record.reason, 'EVENT_REASON_REQUIRED', 'event reason is required');
    timestamp(record.created_at, 'created_at');
  }
  return record;
}

export function validateStore(store) {
  for (const table of Object.keys(TABLE_FILES)) {
    invariant(Array.isArray(store[table]), 'MISSING_TABLE', `Store missing ${table}`);
    const spec = ID_SPECS[table];
    let previous = 0;
    const ids = new Set();
    for (const record of store[table]) {
      validateRecord(table, record);
      const id = record[spec.field];
      invariant(!ids.has(id), 'DUPLICATE_ID', `Duplicate ${id}`);
      ids.add(id);
      const numeric = parseId(table, id);
      invariant(numeric > previous, 'NON_MONOTONIC_ID', `${table} IDs must be stored in increasing order`);
      previous = numeric;
    }
  }

  const nodeIds = new Set(store.nodes.map((item) => item.node_id));
  const reviews = new Map(store.reviews.map((item) => [item.review_id, item]));
  const alignmentReviewKeys = new Set();
  for (const review of store.reviews) {
    if (review.kind !== 'alignment') continue;
    const key = `${review.subject_id}\0${review.suggestion?.engine_version}\0${review.suggestion?.registry_snapshot}`;
    invariant(!alignmentReviewKeys.has(key), 'DUPLICATE_REVIEW', 'Identical shadow alignment review already exists');
    alignmentReviewKeys.add(key);
  }
  const pendingIds = new Set(store.pending.map((item) => item.pending_id));
  const edgeKeys = new Set();
  for (const edge of store.edges) {
    invariant(nodeIds.has(edge.source) && nodeIds.has(edge.target), 'CROSS_LAYER_EDGE', 'Registry edge endpoints must be existing SkillNodes', edge);
    const review = reviews.get(edge.review_id);
    invariant(['broader_than', 'alignment'].includes(review?.kind) && review.status === 'approved' && review.decision?.action === 'accept_relation', 'UNAPPROVED_EDGE', 'Formal broader_than requires an approved relation review', edge);
    invariant(review.decision.source === edge.source && review.decision.target === edge.target, 'REVIEW_MISMATCH', 'Formal edge must exactly match its approved review decision', edge);
    const key = `${edge.source}\0${edge.target}\0${edge.type}`;
    invariant(!edgeKeys.has(key), 'DUPLICATE_EDGE', 'Duplicate registry edge'); edgeKeys.add(key);
  }
  const alignmentKeys = new Set();
  for (const alignment of store.alignments) {
    const review = reviews.get(alignment.review_id);
    invariant(review, 'MISSING_REVIEW', 'Alignment requires a review record');
    if (alignment.status === 'approved') {
      invariant(review.status === 'approved', 'UNAPPROVED_ALIGNMENT', 'Formal alignment requires an approved human review');
      const action = alignment.decision === 'same' ? 'accept_same' : alignment.decision === 'related' ? 'accept_relation' : 'reject';
      invariant(review.decision?.action === action, 'REVIEW_MISMATCH', 'Formal alignment decision must match its approved review');
      if (alignment.node_id) invariant(review.decision.candidate_node_id === alignment.node_id, 'REVIEW_MISMATCH', 'Alignment node must match its approved review');
      if (alignment.pending_id) invariant(review.decision.pending_id === alignment.pending_id, 'REVIEW_MISMATCH', 'Alignment pending slot must match its approved review');
    }
    if (alignment.decision === 'reject') invariant(pendingIds.has(alignment.pending_id), 'MISSING_PENDING', 'Reject alignment requires pending record');
    else invariant(nodeIds.has(alignment.node_id), 'MISSING_NODE', 'Alignment candidate must be an existing SkillNode');
    const target = alignment.node_id ?? alignment.pending_id;
    const key = `${alignment.module_ref.source_id}\0${alignment.module_ref.module_id}\0${alignment.projection_fingerprint}\0${alignment.engine_version}\0${alignment.decision}\0${target}`;
    invariant(!alignmentKeys.has(key), 'DUPLICATE_ALIGNMENT', 'Repeated run cannot duplicate an identical alignment'); alignmentKeys.add(key);
  }
  for (const pending of store.pending) {
    if (pending.status === 'promoted') {
      const review = reviews.get(pending.promotion_review_id);
      invariant(review?.kind === 'pending_promotion' && review.status === 'approved' && review.decision?.action === 'promote', 'UNAPPROVED_PROMOTION', 'Pending cannot be promoted without approved human review');
    }
  }
  return store;
}
