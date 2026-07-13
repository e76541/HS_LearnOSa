import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { align, node_id } from '../index.mjs';
import { setProficiency } from '../core/proficiency.mjs';
import { loadStore } from '../core/store.mjs';
import { decideReview } from '../review/decide.mjs';
import { approvedAttachment } from '../pipeline/attach-only.mjs';
import { approvedProficiencyForModule, practiceEligibility, speakingScaffoldStart } from '../pipeline/approved-state.mjs';
import { batchShadowAlign } from '../pipeline/batch-align.mjs';
import { CANONICAL_EDGE_TYPES } from '../../viz/lib/constants.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const at = '2026-07-14T00:00:00Z';
const human = {type:'human',id:'AOI'};
const temp = () => mkdtemp(path.join(os.tmpdir(), 'hs-registry-pipeline-'));
const fixture = (name) => readFile(path.join(here, 'fixtures', name), 'utf8').then(JSON.parse);

async function createNode(root, label) {
  return node_id(root, {action:'create',preferred_label:label,display_name:label,actor:human,reason:'fixture seed',now:at});
}

test('batch shadow alignment skips background and filler before downstream work', async () => {
  const root = await temp();
  const candidate = await createNode(root, 'seed_skill');
  const alignmentCases = await fixture('alignment-cases.json');
  const invariantCases = await fixture('invariant-cases.json');
  const judge = async ({candidates}) => candidates.length
    ? {decision:'same',candidate_node_id:candidate,reason:'fixture',confidence:0.5}
    : {decision:'reject',reason:'empty registry',confidence:1};
  const results = await batchShadowAlign(root, [...alignmentCases.map((item) => item.module), invariantCases[0].module, invariantCases[1].module], {judge,now:at});
  assert.deepEqual(results.map((item) => item.status), ['shadow_review','shadow_review','shadow_review','skipped','skipped']);
  assert.deepEqual(results.slice(-2).map((item) => item.reason), ['BACKGROUND_NOT_ALIGNABLE','NO_SKILL_SIGNAL']);
  const store = await loadStore(root);
  assert.equal(store.reviews.length, 3);
});

test('practice and speaking consumers ignore shadow suggestions until human approval', async () => {
  const root = await temp();
  const candidate = await createNode(root, 'baseline_measurement');
  const [same] = await fixture('alignment-cases.json');
  const moduleRef = {source_id:same.module.source_id,module_id:same.module.module_id,char_span:same.module.char_span};
  const shadow = await align(root, same.module, {judge:async () => ({decision:'same',candidate_node_id:candidate,reason:'fixture',confidence:0.9}),now:at});
  assert.equal(await approvedProficiencyForModule(root, moduleRef), null);
  await decideReview(root, {review_id:shadow.review_id,action:'accept_same',candidate_node_id:candidate,actor:human,reason:'confirmed',now:at});
  await setProficiency(root, {node_id:candidate,value:'mastered',actor:human,reason:'assessment',evidence_refs:['SESSION-001'],now:at});
  assert.equal(await approvedProficiencyForModule(root, moduleRef), 'mastered');
  assert.equal((await practiceEligibility(root, moduleRef)).single_module_practice, false);
  assert.equal((await speakingScaffoldStart(root, [moduleRef])).level, 2);
  assert.equal((await speakingScaffoldStart(root, [moduleRef,{source_id:'SRC',module_id:'M98'},{source_id:'SRC',module_id:'M99'}])).level, 1);
});

test('attach-only remains dormant for a very small registry and reads only approved truth', async () => {
  const root = await temp();
  const candidate = await createNode(root, 'baseline_measurement');
  const [same] = await fixture('alignment-cases.json');
  const moduleRef = {source_id:same.module.source_id,module_id:same.module.module_id};
  const shadow = await align(root, same.module, {judge:async () => ({decision:'same',candidate_node_id:candidate,reason:'fixture',confidence:0.9}),now:at});
  await decideReview(root, {review_id:shadow.review_id,action:'accept_same',candidate_node_id:candidate,actor:human,reason:'confirmed',now:at});
  assert.equal((await approvedAttachment(root, moduleRef)).status, 'dormant');
  for (const label of ['second_skill','third_skill','fourth_skill','fifth_skill']) await createNode(root, label);
  const attached = await approvedAttachment(root, moduleRef);
  assert.equal(attached.status, 'attached');
  assert.equal(attached.node_id, candidate);
});

test('module graph edge vocabulary and viz imports remain isolated from registry edges', async () => {
  assert.equal(CANONICAL_EDGE_TYPES.has('broader_than'), false);
  const vizSources = await Promise.all(['generate.mjs','parse-doc-artifacts.mjs','render-inline-views.mjs'].map((file) => readFile(path.resolve(here, '../../viz', file), 'utf8')));
  for (const source of vizSources) {
    assert.doesNotMatch(source, /registry\/edges\.jsonl/);
    assert.doesNotMatch(source, /tools\/registry/);
  }
});
