import { invariant } from './errors.mjs';

export const ID_SPECS = Object.freeze({
  nodes: {field: 'node_id', prefix: 'SKILL-'},
  edges: {field: 'edge_id', prefix: 'REGEDGE-'},
  alignments: {field: 'alignment_id', prefix: 'ALIGN-'},
  pending: {field: 'pending_id', prefix: 'PENDING-'},
  reviews: {field: 'review_id', prefix: 'REVIEW-'},
  events: {field: 'event_id', prefix: 'EVENT-'}
});

export function parseId(table, value) {
  const spec = ID_SPECS[table];
  invariant(spec, 'UNKNOWN_TABLE', `Unknown registry table: ${table}`);
  const match = new RegExp(`^${spec.prefix}([0-9]{6})$`).exec(value ?? '');
  invariant(match, 'INVALID_ID', `${spec.field} must use ${spec.prefix} plus six digits`, {table, value});
  return Number(match[1]);
}

export function nextId(table, records) {
  const spec = ID_SPECS[table];
  invariant(spec, 'UNKNOWN_TABLE', `Unknown registry table: ${table}`);
  const highest = records.reduce((max, record) => Math.max(max, parseId(table, record[spec.field])), 0);
  invariant(highest < 999999, 'ID_EXHAUSTED', `No IDs remain for ${table}`);
  return `${spec.prefix}${String(highest + 1).padStart(6, '0')}`;
}
