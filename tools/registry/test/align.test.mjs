import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { align, node_id } from '../index.mjs';
import { loadStore } from '../core/store.mjs';
import { createModelJudge } from '../align/model-judge.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const at = '2026-07-14T00:00:00Z';
const human = {type:'human',id:'AOI'};
const temp = () => mkdtemp(path.join(os.tmpdir(), 'hs-registry-align-'));

async function fixture(name) {
  return JSON.parse(await readFile(path.join(here, 'fixtures', name), 'utf8'));
}

async function seed(root, count = 2) {
  const records = await fixture('seed-nodes.json');
  const extras = [
    ['governed_ai_delivery','治理式 AI 交付'],['workflow_selection','工作流選擇'],
    ['quality_gate_design','品質閘門設計'],['cost_metering','成本計量']
  ];
  for (const record of [...records.map((item) => [item.preferred_label,item.display_name]), ...extras].slice(0,count)) {
    await node_id(root, {action:'create',preferred_label:record[0],display_name:record[1],actor:human,reason:'fixture seed',now:at});
  }
}

test('shadow align returns at most five deterministic candidates and writes only review', async () => {
  const root = await temp();
  await seed(root, 6);
  const cases = await fixture('alignment-cases.json');
  let judgeInput;
  const judge = async (input) => {
    judgeInput = input;
    const exact = input.candidates.find((candidate) => candidate.preferred_label === 'ai_adoption_baseline');
    return {decision:'same',candidate_node_id:exact.node_id,reason:'output type exactly matches the preferred label',confidence:0.9};
  };
  const first = await align(root, cases[0].module, {judge,now:at});
  const second = await align(root, cases[0].module, {judge,now:at});
  assert.equal(judgeInput.candidates.length, 5);
  assert.equal(first.review_id, 'REVIEW-000001');
  assert.equal(second.review_id, first.review_id);
  assert.equal(second.replayed, true);
  const store = await loadStore(root);
  assert.equal(store.reviews.length, 1);
  assert.equal(store.alignments.length, 0);
  assert.equal(store.edges.length, 0);
  assert.equal(store.nodes[0].aliases.length, 0);
});

test('same input and registry snapshot replay identical candidate order', async () => {
  const root = await temp();
  await seed(root, 6);
  const cases = await fixture('alignment-cases.json');
  const judge = async ({candidates}) => ({decision:'reject',reason:`none of ${candidates.length} candidates is the same skill`,confidence:0.8});
  const first = await align(root, cases[2].module, {judge,now:at});
  const second = await align(root, cases[2].module, {judge,now:at});
  assert.deepEqual(second.candidates, first.candidates);
  assert.equal(second.suggestion.registry_snapshot, first.suggestion.registry_snapshot);
});

test('malformed judge output fails closed without writing free text', async () => {
  const root = await temp();
  await seed(root);
  const cases = await fixture('alignment-cases.json');
  await assert.rejects(
    align(root, cases[0].module, {judge:async () => 'looks similar',now:at}),
    (error) => error.code === 'INVALID_JUDGE_OUTPUT'
  );
  const store = await loadStore(root);
  assert.equal(store.reviews.length, 0);
});

test('judge cannot select outside the top-five closed set', async () => {
  const root = await temp();
  await seed(root, 6);
  const cases = await fixture('alignment-cases.json');
  await assert.rejects(
    align(root, cases[0].module, {judge:async () => ({decision:'same',candidate_node_id:'SKILL-999999',reason:'invalid candidate',confidence:1}),now:at}),
    (error) => error.code === 'INVALID_JUDGE_OUTPUT'
  );
});

test('related with uncertain direction is queued with both human-review risks', async () => {
  const root = await temp();
  await seed(root);
  const cases = await fixture('alignment-cases.json');
  const result = await align(root, cases[1].module, {judge:async ({candidates}) => ({decision:'related',candidate_node_id:candidates[0].node_id,relation_direction:'uncertain',reason:'nearby but hierarchy direction is unclear',confidence:0.6}),now:at});
  const store = await loadStore(root);
  assert.deepEqual(store.reviews[0].risk_flags, ['broader_than_requires_human_review','relation_direction_uncertain']);
  assert.equal(result.suggestion.decision, 'related');
  assert.equal(store.edges.length, 0);
});

test('background is filtered before retrieval or judge invocation', async () => {
  const root = await temp();
  await seed(root);
  const cases = await fixture('invariant-cases.json');
  let called = false;
  await assert.rejects(
    align(root, cases[0].module, {judge:async () => { called = true; }}),
    (error) => error.code === 'BACKGROUND_NOT_ALIGNABLE'
  );
  assert.equal(called, false);
});

test('missing structured judge fails closed', async () => {
  const root = await temp();
  const cases = await fixture('alignment-cases.json');
  await assert.rejects(align(root, cases[0].module), (error) => error.code === 'JUDGE_REQUIRED');
});

test('model judge adapter receives only ModuleCore and a strict output schema', async () => {
  const root = await temp();
  await seed(root);
  const cases = await fixture('alignment-cases.json');
  let request;
  const judge = createModelJudge(async (value) => {
    request = value;
    return {decision:'reject',reason:'fixture adapter response',confidence:0.7};
  });
  await align(root, {...cases[0].module,hooks:['secret'],body:'secret',module_type:'MethodModule',edges:[{type:'depends_on'}]}, {judge,now:at});
  assert.equal(Object.hasOwn(request.input.module, 'hooks'), false);
  assert.equal(Object.hasOwn(request.input.module, 'body'), false);
  assert.equal(Object.hasOwn(request.input.module, 'edges'), false);
  assert.equal(request.output_schema.additionalProperties, false);
  assert.deepEqual(request.output_schema.properties.decision.enum, ['same','related','reject']);
});
