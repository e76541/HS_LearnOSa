import { randomUUID } from 'node:crypto';
import { access, mkdir, open, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { invariant, RegistryValidationError } from './errors.mjs';
import { ID_SPECS, nextId } from './ids.mjs';
import { TABLE_FILES, validateRecord, validateStore } from './validate.mjs';

const JOURNAL = '.registry-transaction.json';
const LOCK = '.registry.lock';

function clone(value) {
  return structuredClone(value);
}

function equal(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function serialize(records) {
  return records.length ? `${records.map((record) => JSON.stringify(record)).join('\n')}\n` : '';
}

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

export async function readJsonl(file) {
  let text;
  try { text = await readFile(file, 'utf8'); }
  catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  const records = [];
  for (const [index, line] of text.split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    try { records.push(JSON.parse(line)); }
    catch (error) { throw new RegistryValidationError('INVALID_JSONL', `${file}:${index + 1}: ${error.message}`); }
  }
  return records;
}

export async function loadStore(root) {
  const entries = await Promise.all(Object.entries(TABLE_FILES).map(async ([table, file]) => [table, await readJsonl(path.join(root, file))]));
  return Object.fromEntries(entries);
}

async function syncFile(file) {
  const handle = await open(file, 'r');
  try { await handle.sync(); } finally { await handle.close(); }
}

export async function recoverTransaction(root) {
  const journalPath = path.join(root, JOURNAL);
  if (!(await exists(journalPath))) return false;
  const journal = JSON.parse(await readFile(journalPath, 'utf8'));
  invariant(Array.isArray(journal.files), 'INVALID_JOURNAL', 'Transaction journal is malformed');
  for (const entry of journal.files) {
    const temporary = path.join(root, entry.temporary);
    const final = path.join(root, entry.final);
    if (await exists(temporary)) await rename(temporary, final);
  }
  await rm(journalPath, {force: true});
  return true;
}

async function commitSnapshots(root, snapshots) {
  const token = `${process.pid}-${randomUUID()}`;
  const files = [];
  for (const [table, records] of Object.entries(snapshots)) {
    const final = TABLE_FILES[table];
    const temporary = `.${final}.${token}.tmp`;
    const temporaryPath = path.join(root, temporary);
    await writeFile(temporaryPath, serialize(records), 'utf8');
    await syncFile(temporaryPath);
    files.push({temporary, final});
  }
  const journalPath = path.join(root, JOURNAL);
  await writeFile(journalPath, `${JSON.stringify({version: 1, files})}\n`, 'utf8');
  await syncFile(journalPath);
  for (const entry of files) await rename(path.join(root, entry.temporary), path.join(root, entry.final));
  await rm(journalPath, {force: true});
}

async function acquireLock(root) {
  try {
    const handle = await open(path.join(root, LOCK), 'wx');
    await handle.writeFile(`${process.pid}\n`);
    return handle;
  } catch (error) {
    if (error.code === 'EEXIST') throw new RegistryValidationError('STORE_LOCKED', 'Registry store is already being modified');
    throw error;
  }
}

function assertActor(actor, reason) {
  invariant(actor && ['human', 'system'].includes(actor.type), 'INVALID_ACTOR', 'actor.type must be human or system');
  invariant(typeof actor.id === 'string' && actor.id, 'INVALID_ACTOR', 'actor.id is required');
  invariant(typeof reason === 'string' && reason, 'EVENT_REASON_REQUIRED', 'A transaction reason is required');
}

function eventType(change, before, after) {
  if (change.table === 'nodes' && before && before.proficiency !== after.proficiency) return 'proficiency_change';
  if (change.table === 'reviews' && before?.status === 'pending' && after.status !== 'pending') return 'review_decision';
  return change.mode;
}

function applyChange(store, change, actor) {
  invariant(change && Object.hasOwn(TABLE_FILES, change.table) && change.table !== 'events', 'INVALID_CHANGE', 'Changes must target a non-event registry table');
  invariant(['insert', 'replace'].includes(change.mode), 'INVALID_CHANGE', 'Change mode must be insert or replace');
  validateRecord(change.table, change.record);
  const spec = ID_SPECS[change.table];
  const id = change.record[spec.field];
  const records = store[change.table];
  const index = records.findIndex((record) => record[spec.field] === (change.key ?? id));

  if (change.mode === 'insert') {
    if (index >= 0 && equal(records[index], change.record)) return {noop: true};
    invariant(index < 0, 'DUPLICATE_ID', `${id} already exists`);
    invariant(id === nextId(change.table, records), 'NON_MONOTONIC_ID', `${id} is not the next ${change.table} ID`);
    if (change.table === 'nodes') invariant(actor.type === 'human', 'HUMAN_REVIEW_REQUIRED', 'Formal SkillNode creation requires a human actor');
    records.push(clone(change.record));
    return {before: undefined, after: clone(change.record)};
  }

  invariant(typeof change.key === 'string' && change.key, 'MISSING_KEY', 'replace requires the existing stable ID as key');
  invariant(index >= 0, 'MISSING_RECORD', `${change.key} does not exist`);
  invariant(id === change.key, 'STABLE_ID_VIOLATION', `${spec.field} cannot be rewritten`);
  const before = records[index];
  if (equal(before, change.record)) return {noop: true};
  if (change.table === 'nodes' && before.proficiency !== change.record.proficiency) {
    invariant(actor.type === 'human', 'SYSTEM_PROFICIENCY_WRITE', 'System actors cannot change proficiency');
    invariant(change.record.evidence_refs.length > 0, 'EVIDENCE_REF_REQUIRED', 'Human proficiency changes require evidence_refs');
  }
  if (change.table === 'nodes' && !equal(before.aliases, change.record.aliases)) {
    const review = store.reviews.find((item) => item.review_id === change.review_id);
    invariant(review?.status === 'approved' && review.decision?.action === 'accept_same' && review.decision?.candidate_node_id === change.key, 'ALIASES_REQUIRE_REVIEW', 'Alias changes require an approved same review for this node');
  }
  records[index] = clone(change.record);
  return {before: clone(before), after: clone(change.record)};
}

export async function applyTransaction(root, {changes, actor, reason, now = new Date().toISOString()}) {
  assertActor(actor, reason);
  invariant(Array.isArray(changes) && changes.length > 0, 'EMPTY_TRANSACTION', 'Transaction requires at least one change');
  await mkdir(root, {recursive: true});
  const lock = await acquireLock(root);
  try {
    await recoverTransaction(root);
    const store = await loadStore(root);
    validateStore(store);
    const changedTables = new Set();
    const applied = [];
    for (const change of changes) {
      const result = applyChange(store, change, actor);
      if (result.noop) continue;
      changedTables.add(change.table);
      applied.push({change, ...result});
    }
    if (!applied.length) return {applied: false, events: []};

    const events = [];
    for (const item of applied) {
      const spec = ID_SPECS[item.change.table];
      const event = {
        event_id: nextId('events', store.events),
        event_type: eventType(item.change, item.before, item.after),
        entity_type: item.change.table.replace(/s$/, ''),
        entity_id: item.after[spec.field],
        actor_type: actor.type,
        actor_id: actor.id,
        reason,
        ...(item.before ? {before: item.before} : {}),
        after: item.after,
        created_at: now
      };
      validateRecord('events', event);
      store.events.push(event); events.push(event);
    }
    changedTables.add('events');
    validateStore(store);
    const snapshots = Object.fromEntries([...changedTables].map((table) => [table, store[table]]));
    await commitSnapshots(root, snapshots);
    return {applied: true, events};
  } finally {
    await lock.close();
    await rm(path.join(root, LOCK), {force: true});
  }
}
