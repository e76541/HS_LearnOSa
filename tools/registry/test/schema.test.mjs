import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validateRecord } from '../core/validate.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const schemaRoot = path.resolve(here, '../schema');

test('six JSON schemas are parseable and closed objects', async () => {
  const files = ['node', 'edge', 'alignment', 'pending', 'review', 'event'];
  for (const name of files) {
    const schema = JSON.parse(await readFile(path.join(schemaRoot, `${name}.schema.json`), 'utf8'));
    assert.equal(schema.type, 'object');
    assert.equal(schema.additionalProperties, false);
    assert.ok(schema.required.length > 0);
  }
});

test('SkillNode requires all frozen minimum fields', () => {
  assert.throws(
    () => validateRecord('nodes', {node_id: 'SKILL-000001'}),
    (error) => error.code === 'MISSING_FIELD'
  );
});

test('unknown storage fields fail closed', () => {
  const node = {node_id:'SKILL-000001',preferred_label:'baseline',display_name:'基線',aliases:[],proficiency:'new',proficiency_updated_at:'2026-07-14T00:00:00Z',evidence_refs:[],model_confidence:1};
  assert.throws(() => validateRecord('nodes', node), (error) => error.code === 'UNKNOWN_FIELD');
});

test('aliases cannot be duplicated', () => {
  const node = {node_id:'SKILL-000001',preferred_label:'baseline',display_name:'基線',aliases:['adoption baseline','adoption baseline'],proficiency:'new',proficiency_updated_at:'2026-07-14T00:00:00Z',evidence_refs:[]};
  assert.throws(() => validateRecord('nodes', node), (error) => error.code === 'DUPLICATE_VALUE');
});

test('only English proficiency values are accepted', () => {
  const node = {node_id:'SKILL-000001',preferred_label:'baseline',display_name:'基線',aliases:[],proficiency:'已掌握',proficiency_updated_at:'2026-07-14T00:00:00Z',evidence_refs:[]};
  assert.throws(() => validateRecord('nodes', node), (error) => error.code === 'INVALID_PROFICIENCY');
});

test('registry edge type is closed to broader_than', () => {
  const edge = {edge_id:'REGEDGE-000001',source:'SKILL-000001',target:'SKILL-000002',type:'depends_on',review_id:'REVIEW-000001',approved_at:'2026-07-14T00:00:00Z'};
  assert.throws(() => validateRecord('edges', edge), (error) => error.code === 'INVALID_EDGE_TYPE');
});
