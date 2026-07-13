import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { align, node_id, pending } from '../index.mjs';
import { loadStore } from '../core/store.mjs';
import { reviewQueue } from '../review/context.mjs';
import { decideReview } from '../review/decide.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const at = '2026-07-14T00:00:00Z';
const human = {type:'human',id:'AOI'};
const temp = () => mkdtemp(path.join(os.tmpdir(), 'hs-registry-review-'));

async function cases() {
  return JSON.parse(await readFile(path.join(here, 'fixtures', 'alignment-cases.json'), 'utf8'));
}

async function createNode(root, preferred_label, display_name = preferred_label) {
  return node_id(root, {action:'create',preferred_label,display_name,actor:human,reason:'fixture seed',now:at});
}

test('review queue exposes ModuleCore, top candidates, aliases, relations, and risks', async () => {
  const root = await temp();
  await createNode(root, 'baseline_measurement');
  const [same] = await cases();
  await align(root, same.module, {judge:async ({candidates}) => ({decision:'same',candidate_node_id:candidates[0].node_id,reason:'fixture match',confidence:0.9}),now:at});
  const queue = await reviewQueue(root);
  assert.equal(queue.length, 1);
  assert.equal(queue[0].module.module_id, 'M02');
  assert.equal(queue[0].candidates.length, 1);
  assert.deepEqual(queue[0].candidates[0].broader_than_outgoing, []);
  assert.ok(Array.isArray(queue[0].risk_flags));
});

test('accept same creates approved alignment and only then absorbs alias', async () => {
  const root = await temp();
  const candidate = await createNode(root, 'baseline_measurement');
  const [same] = await cases();
  const shadow = await align(root, same.module, {judge:async () => ({decision:'same',candidate_node_id:candidate,reason:'fixture match',confidence:0.9}),now:at});
  const result = await decideReview(root, {review_id:shadow.review_id,action:'accept_same',candidate_node_id:candidate,actor:human,reason:'same skill confirmed',now:at});
  const replay = await decideReview(root, {review_id:shadow.review_id,action:'accept_same',candidate_node_id:candidate,actor:human,reason:'same skill confirmed',now:at});
  assert.equal(result.replayed, false);
  assert.equal(replay.replayed, true);
  const store = await loadStore(root);
  assert.equal(store.alignments[0].decision, 'same');
  assert.equal(store.alignments[0].status, 'approved');
  assert.deepEqual(store.nodes[0].aliases, ['ai_adoption_baseline']);
  assert.equal(store.reviews[0].decision.action, 'accept_same');
});

test('human reject creates pending and approved reject alignment without creating a node', async () => {
  const root = await temp();
  await createNode(root, 'unrelated_seed');
  const all = await cases();
  const rejected = all[2];
  const shadow = await align(root, rejected.module, {judge:async () => ({decision:'reject',reason:'no equivalent skill',confidence:0.8}),now:at});
  await decideReview(root, {review_id:shadow.review_id,action:'reject',actor:human,reason:'confirmed new-skill signal',now:at});
  const slot = await pending(root, rejected.module);
  const store = await loadStore(root);
  assert.equal(slot.status, 'open');
  assert.equal(store.pending.length, 1);
  assert.equal(store.alignments[0].pending_id, slot.pending_id);
  assert.equal(store.nodes.length, 1);
});

test('pending similarity only suggests a group and never promotes it', async () => {
  const root = await temp();
  await createNode(root, 'unrelated_seed');
  const all = await cases();
  const firstModule = all[2].module;
  const secondModule = {...firstModule,module_id:'M00B',char_span:[1306,1500]};
  for (const module of [firstModule, secondModule]) {
    const shadow = await align(root, module, {judge:async () => ({decision:'reject',reason:'no equivalent skill',confidence:0.8}),now:at});
    await decideReview(root, {review_id:shadow.review_id,action:'reject',actor:human,reason:'confirmed reject',now:at});
  }
  const store = await loadStore(root);
  assert.deepEqual(store.pending[1].similar_pending_ids, ['PENDING-000001']);
  assert.deepEqual(store.pending.map((item) => item.status), ['open','open']);
  assert.equal(store.nodes.length, 1);
});

test('accepted related writes broader_than only after direction and both nodes are explicit', async () => {
  const root = await temp();
  const candidate = await createNode(root, 'agent_pipeline_design');
  const moduleNode = await createNode(root, 'deterministic_delivery_gates');
  const all = await cases();
  const related = all[1];
  const shadow = await align(root, related.module, {judge:async () => ({decision:'related',candidate_node_id:candidate,relation_direction:'uncertain',reason:'near relation',confidence:0.6}),now:at});
  await decideReview(root, {review_id:shadow.review_id,action:'accept_relation',candidate_node_id:candidate,module_node_id:moduleNode,direction:'candidate_broader',actor:human,reason:'domain relation confirmed',now:at});
  const store = await loadStore(root);
  assert.equal(store.edges.length, 1);
  assert.deepEqual({source:store.edges[0].source,target:store.edges[0].target,type:store.edges[0].type},{source:candidate,target:moduleNode,type:'broader_than'});
  assert.equal(store.alignments[0].decision, 'related');
});

test('rejected relation preserves decision and writes no formal edge or alignment', async () => {
  const root = await temp();
  const candidate = await createNode(root, 'agent_pipeline_design');
  const all = await cases();
  const shadow = await align(root, all[1].module, {judge:async () => ({decision:'related',candidate_node_id:candidate,relation_direction:'uncertain',reason:'near relation',confidence:0.6}),now:at});
  await decideReview(root, {review_id:shadow.review_id,action:'reject_relation',actor:human,reason:'not a stable taxonomy relation',now:at});
  const store = await loadStore(root);
  assert.equal(store.reviews[0].status, 'rejected');
  assert.equal(store.edges.length, 0);
  assert.equal(store.alignments.length, 0);
});

test('different second decision cannot partially overwrite a completed review', async () => {
  const root = await temp();
  const candidate = await createNode(root, 'baseline_measurement');
  const [same] = await cases();
  const shadow = await align(root, same.module, {judge:async () => ({decision:'same',candidate_node_id:candidate,reason:'fixture match',confidence:0.9}),now:at});
  await decideReview(root, {review_id:shadow.review_id,action:'accept_same',candidate_node_id:candidate,actor:human,reason:'confirmed',now:at});
  await assert.rejects(
    decideReview(root, {review_id:shadow.review_id,action:'reject',actor:human,reason:'changed mind',now:at}),
    (error) => error.code === 'REVIEW_ALREADY_DECIDED'
  );
  const store = await loadStore(root);
  assert.equal(store.alignments.length, 1);
  assert.equal(store.pending.length, 0);
});
