import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertAlignableModule, MODULE_CORE_FIELDS, projectModuleCore, projectionFingerprint } from '../core/module-core.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(here, 'fixtures');

test('alignment fixtures contain human same, related, and reject truth', async () => {
  const cases = JSON.parse(await readFile(path.join(fixtures, 'alignment-cases.json'), 'utf8'));
  assert.deepEqual(cases.map((item) => item.expected.decision), ['same', 'related', 'reject']);
  for (const item of cases) assert.doesNotThrow(() => assertAlignableModule(item.module));
});

test('background, non-skill signal, and incomplete ModuleCore fail closed', async () => {
  const cases = JSON.parse(await readFile(path.join(fixtures, 'invariant-cases.json'), 'utf8'));
  for (const item of cases) {
    assert.throws(() => assertAlignableModule(item.module), (error) => error.code === item.error, item.name);
  }
});

test('projection excludes type ontology, body, hooks, and edges', () => {
  const module = Object.fromEntries(MODULE_CORE_FIELDS.map((field) => [field, field]));
  Object.assign(module, {char_span:[0,1], semantic_roles:['procedure'], operations:[], is_skill_signal:true, confidence:1, hooks:['secret'], body:'secret', module_type:'MethodModule', edges:[]});
  const projection = projectModuleCore(module);
  assert.deepEqual(Object.keys(projection), [...MODULE_CORE_FIELDS]);
  assert.equal(Object.hasOwn(projection, 'hooks'), false);
  assert.match(projectionFingerprint(module), /^sha256:[a-f0-9]{64}$/);
});
