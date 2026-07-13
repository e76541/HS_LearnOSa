import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { applyTransaction, loadStore, recoverTransaction } from '../core/store.mjs';
import { validateRecord, validateStore } from '../core/validate.mjs';

const at = '2026-07-14T00:00:00Z';
const node = (id, label) => ({node_id:id,preferred_label:label,display_name:label,aliases:[],proficiency:'new',proficiency_updated_at:at,evidence_refs:[]});
const human = {type:'human', id:'AOI'};

async function temporaryStore() {
  return mkdtemp(path.join(os.tmpdir(), 'hs-registry-'));
}

async function seedNodes(root) {
  await applyTransaction(root, {
    actor: human, reason: 'test seed', now: at,
    changes: [
      {table:'nodes', mode:'insert', record:node('SKILL-000001', 'first_skill')},
      {table:'nodes', mode:'insert', record:node('SKILL-000002', 'second_skill')}
    ]
  });
}

test('data and audit events commit in the same transaction', async () => {
  const root = await temporaryStore();
  await seedNodes(root);
  const store = await loadStore(root);
  assert.equal(store.nodes.length, 2);
  assert.equal(store.events.length, 2);
  assert.deepEqual(store.events.map((event) => event.entity_id), ['SKILL-000001', 'SKILL-000002']);
  assert.doesNotThrow(() => validateStore(store));
});

test('ID allocation is monotonic and stable IDs cannot be rewritten', async () => {
  const root = await temporaryStore();
  await seedNodes(root);
  await assert.rejects(
    applyTransaction(root, {actor:human,reason:'bad id',now:at,changes:[{table:'nodes',mode:'insert',record:node('SKILL-000004','skipped') }]}),
    (error) => error.code === 'NON_MONOTONIC_ID'
  );
  await assert.rejects(
    applyTransaction(root, {actor:human,reason:'rewrite id',now:at,changes:[{table:'nodes',mode:'replace',key:'SKILL-000001',record:node('SKILL-000003','renamed') }]}),
    (error) => error.code === 'STABLE_ID_VIOLATION'
  );
});

test('system cannot create formal nodes or write proficiency', async () => {
  const root = await temporaryStore();
  await assert.rejects(
    applyTransaction(root, {actor:{type:'system',id:'model'},reason:'auto create',now:at,changes:[{table:'nodes',mode:'insert',record:node('SKILL-000001','auto') }]}),
    (error) => error.code === 'HUMAN_REVIEW_REQUIRED'
  );
  await seedNodes(root);
  const changed = {...node('SKILL-000001','first_skill'), proficiency:'mastered', evidence_refs:['SESSION-001']};
  await assert.rejects(
    applyTransaction(root, {actor:{type:'system',id:'model'},reason:'auto proficiency',now:at,changes:[{table:'nodes',mode:'replace',key:'SKILL-000001',record:changed}]}),
    (error) => error.code === 'SYSTEM_PROFICIENCY_WRITE'
  );
});

test('low-level human write cannot change aliases without approved same review', async () => {
  const root = await temporaryStore();
  await seedNodes(root);
  const changed = {...node('SKILL-000001','first_skill'),aliases:['unreviewed_alias']};
  await assert.rejects(
    applyTransaction(root, {actor:human,reason:'manual alias bypass',now:at,changes:[{table:'nodes',mode:'replace',key:'SKILL-000001',record:changed}]}),
    (error) => error.code === 'ALIASES_REQUIRE_REVIEW'
  );
});

test('human proficiency write requires evidence and keeps old value in event', async () => {
  const root = await temporaryStore();
  await seedNodes(root);
  const withoutEvidence = {...node('SKILL-000001','first_skill'), proficiency:'learning'};
  await assert.rejects(
    applyTransaction(root, {actor:human,reason:'manual assessment',now:at,changes:[{table:'nodes',mode:'replace',key:'SKILL-000001',record:withoutEvidence}]}),
    (error) => error.code === 'EVIDENCE_REF_REQUIRED'
  );
  const changed = {...withoutEvidence, evidence_refs:['SESSION-001']};
  await applyTransaction(root, {actor:human,reason:'manual assessment',now:at,changes:[{table:'nodes',mode:'replace',key:'SKILL-000001',record:changed}]});
  const store = await loadStore(root);
  const event = store.events.at(-1);
  assert.equal(event.event_type, 'proficiency_change');
  assert.equal(event.before.proficiency, 'new');
  assert.equal(event.after.proficiency, 'learning');
});

test('formal edges reject cross-layer endpoints and unapproved reviews', async () => {
  const root = await temporaryStore();
  await seedNodes(root);
  const pendingReview = {review_id:'REVIEW-000001',kind:'broader_than',subject_id:'SKILL-000001>SKILL-000002',suggestion:{source:'SKILL-000001',target:'SKILL-000002'},status:'pending',created_at:at};
  const edge = {edge_id:'REGEDGE-000001',source:'SKILL-000001',target:'SKILL-000002',type:'broader_than',review_id:'REVIEW-000001',approved_at:at};
  assert.throws(
    () => validateRecord('edges', {...edge, source:'M02'}),
    (error) => error.code === 'INVALID_ID'
  );
  await assert.rejects(
    applyTransaction(root, {actor:human,reason:'unreviewed edge',now:at,changes:[{table:'reviews',mode:'insert',record:pendingReview},{table:'edges',mode:'insert',record:edge}]}),
    (error) => error.code === 'UNAPPROVED_EDGE'
  );
  const crossLayer = {...edge, source:'SKILL-999999'};
  const approvedReview = {...pendingReview,status:'approved',decision:{action:'accept_relation',source:'SKILL-000001',target:'SKILL-000002'},operator:'AOI',reason:'fixture decision',decided_at:at};
  await assert.rejects(
    applyTransaction(root, {actor:human,reason:'cross layer edge',now:at,changes:[{table:'reviews',mode:'insert',record:approvedReview},{table:'edges',mode:'insert',record:crossLayer}]}),
    (error) => error.code === 'CROSS_LAYER_EDGE'
  );
});

test('alignment records independently reject background and non-skill modules', () => {
  const base = {alignment_id:'ALIGN-000001',module_ref:{source_id:'SRC',module_id:'M01',char_span:[0,1]},module_eligibility:{is_skill_signal:true,semantic_roles:['procedure']},projection_fingerprint:`sha256:${'a'.repeat(64)}`,decision:'same',status:'suggested',node_id:'SKILL-000001',candidate_rank:1,review_id:'REVIEW-000001',engine_version:'fixture',created_at:at};
  assert.throws(
    () => validateRecord('alignments', {...base,module_eligibility:{is_skill_signal:true,semantic_roles:['background']}}),
    (error) => error.code === 'BACKGROUND_NOT_ALIGNABLE'
  );
  assert.throws(
    () => validateRecord('alignments', {...base,module_eligibility:{is_skill_signal:false,semantic_roles:['procedure']}}),
    (error) => error.code === 'NO_SKILL_SIGNAL'
  );
});

test('approved broader_than is idempotent on rerun', async () => {
  const root = await temporaryStore();
  await seedNodes(root);
  const review = {review_id:'REVIEW-000001',kind:'broader_than',subject_id:'SKILL-000001>SKILL-000002',suggestion:{source:'SKILL-000001',target:'SKILL-000002'},decision:{action:'accept_relation',source:'SKILL-000001',target:'SKILL-000002'},status:'approved',operator:'AOI',reason:'fixture decision',created_at:at,decided_at:at};
  const edge = {edge_id:'REGEDGE-000001',source:'SKILL-000001',target:'SKILL-000002',type:'broader_than',review_id:'REVIEW-000001',approved_at:at};
  await applyTransaction(root, {actor:human,reason:'approved edge',now:at,changes:[{table:'reviews',mode:'insert',record:review},{table:'edges',mode:'insert',record:edge}]});
  const result = await applyTransaction(root, {actor:human,reason:'approved edge rerun',now:at,changes:[{table:'reviews',mode:'insert',record:review},{table:'edges',mode:'insert',record:edge}]});
  assert.equal(result.applied, false);
  const store = await loadStore(root);
  assert.equal(store.edges.length, 1);
});

test('pending cannot be promoted without approved promotion review', async () => {
  const root = await temporaryStore();
  const pending = {pending_id:'PENDING-000001',module_ref:{source_id:'SRC',module_id:'M01',char_span:[0,1]},module_projection:{module_id:'M01'},projection_fingerprint:`sha256:${'a'.repeat(64)}`,similar_pending_ids:[],status:'promoted',promotion_review_id:'REVIEW-000001',created_at:at};
  await assert.rejects(
    applyTransaction(root, {actor:human,reason:'direct promotion',now:at,changes:[{table:'pending',mode:'insert',record:pending}]}),
    (error) => error.code === 'UNAPPROVED_PROMOTION'
  );
});

test('recovery journal completes every staged snapshot', async () => {
  const root = await temporaryStore();
  await seedNodes(root);
  const originalEvents = await readFile(path.join(root, 'events.jsonl'), 'utf8');
  await writeFile(path.join(root, '.nodes.recovery.tmp'), `${JSON.stringify(node('SKILL-000001','recovered_skill'))}\n${JSON.stringify(node('SKILL-000002','second_skill'))}\n`);
  await writeFile(path.join(root, '.events.recovery.tmp'), originalEvents);
  await writeFile(path.join(root, '.registry-transaction.json'), `${JSON.stringify({version:1,files:[{temporary:'.nodes.recovery.tmp',final:'nodes.jsonl'},{temporary:'.events.recovery.tmp',final:'events.jsonl'}]})}\n`);
  assert.equal(await recoverTransaction(root), true);
  const store = await loadStore(root);
  assert.equal(store.nodes[0].preferred_label, 'recovered_skill');
  assert.equal(store.events.length, 2);
  assert.doesNotThrow(() => validateStore(store));
});
