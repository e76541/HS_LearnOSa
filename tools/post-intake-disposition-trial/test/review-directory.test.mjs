import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validateDirectory } from '../validate-disposition.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const reviewRoot = path.resolve(here, '../../../DOC/Review');

test('四個 Review 試點保留原 canonical 身份並通過 shadow 檢核', async () => {
  const records = await validateDirectory(reviewRoot);
  const sourceIds = records.map((record) => record.source_id).sort();

  assert.deepEqual(sourceIds, [
    'PENDING-how-to-make-company-ai-native',
    'PENDING-loop-and-harness-engineering',
    'PENDING-making-fable-cheaper-than-opus',
    'PENDING-quant-trading-is-not-prediction',
  ]);
  assert.ok(records.every((record) => record.canonical_bucket === 'Review'));
  assert.ok(records.every((record) => record.canonical_status === 'needs_review'));
});
