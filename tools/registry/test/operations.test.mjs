import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import * as registry from '../index.mjs';
import { loadStore } from '../core/store.mjs';
import { setProficiency } from '../core/proficiency.mjs';

const human = {type:'human',id:'AOI'};
const at = '2026-07-14T00:00:00Z';
const temp = () => mkdtemp(path.join(os.tmpdir(), 'hs-registry-ops-'));

test('public entry exposes only the four frozen operations', () => {
  assert.deepEqual(Object.keys(registry).sort(), ['align','node_id','pending','proficiency']);
});

test('human node allocation is monotonic and repeated label resolves existing ID', async () => {
  const root = await temp();
  const first = await registry.node_id(root, {action:'create',preferred_label:'baseline_measurement',display_name:'基線量測',actor:human,reason:'manual seed',now:at});
  const repeated = await registry.node_id(root, {action:'create',preferred_label:'baseline_measurement',display_name:'不同顯示不覆寫',actor:human,reason:'manual seed',now:at});
  const second = await registry.node_id(root, {action:'create',preferred_label:'agent_pipeline_design',display_name:'代理管線設計',actor:human,reason:'manual seed',now:at});
  assert.equal(first, 'SKILL-000001');
  assert.equal(repeated, first);
  assert.equal(second, 'SKILL-000002');
});

test('rename and display changes preserve node_id', async () => {
  const root = await temp();
  const id = await registry.node_id(root, {action:'create',preferred_label:'old_label',display_name:'舊名',actor:human,reason:'manual seed',now:at});
  const updated = await registry.node_id(root, {action:'update',node_id:id,preferred_label:'new_label',display_name:'新名',actor:human,reason:'manual rename',now:at});
  assert.equal(updated, id);
  assert.equal(await registry.node_id(root, {preferred_label:'new_label'}), id);
  const store = await loadStore(root);
  assert.equal(store.nodes[0].node_id, id);
});

test('identity update cannot bypass same review to add aliases', async () => {
  const root = await temp();
  const id = await registry.node_id(root, {action:'create',preferred_label:'old_label',display_name:'舊名',actor:human,reason:'manual seed',now:at});
  await assert.rejects(
    registry.node_id(root, {action:'update',node_id:id,aliases:['unreviewed_alias'],actor:human,reason:'manual alias',now:at}),
    (error) => error.code === 'ALIASES_REQUIRE_REVIEW'
  );
});

test('system path cannot allocate a formal SkillNode', async () => {
  const root = await temp();
  await assert.rejects(
    registry.node_id(root, {action:'create',preferred_label:'auto_node',display_name:'自動',actor:{type:'system',id:'model'},reason:'model suggestion',now:at}),
    (error) => error.code === 'HUMAN_REVIEW_REQUIRED'
  );
});

test('public proficiency is read-only and human management records evidence', async () => {
  const root = await temp();
  const id = await registry.node_id(root, {action:'create',preferred_label:'practice_skill',display_name:'練習技能',actor:human,reason:'manual seed',now:at});
  assert.equal(await registry.proficiency(root, id), 'new');
  assert.equal(await setProficiency(root, {node_id:id,value:'learning',actor:human,reason:'speaking assessment',evidence_refs:['SESSION-001'],now:at}), 'learning');
  assert.equal(await registry.proficiency(root, id), 'learning');
  const store = await loadStore(root);
  assert.equal(store.events.at(-1).before.proficiency, 'new');
  assert.deepEqual(store.nodes[0].evidence_refs, ['SESSION-001']);
});

test('anonymous proficiency management fails', async () => {
  const root = await temp();
  await assert.rejects(
    setProficiency(root, {node_id:'SKILL-000001',value:'mastered',actor:{type:'system',id:'model'},reason:'auto',evidence_refs:['MODEL-001'],now:at}),
    (error) => error.code === 'HUMAN_REVIEW_REQUIRED'
  );
});
