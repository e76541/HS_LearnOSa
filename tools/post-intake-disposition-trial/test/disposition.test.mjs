import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  DispositionParseError,
  parseDisposition,
} from '../parse-disposition.mjs';
import {
  DispositionValidationError,
  validateDisposition,
} from '../validate-disposition.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(here, 'fixtures');

async function fixture(name) {
  return readFile(path.join(fixtures, name), 'utf8');
}

test('解析並接受完整 Review shadow 註記', async () => {
  const markdown = await fixture('valid-review-note.md');
  const disposition = parseDisposition(markdown);

  assert.equal(disposition.record.source_id, 'PENDING-example');
  assert.equal(disposition.candidates.length, 0);
  assert.doesNotThrow(() => validateDisposition(markdown));
});

test('關聯候選必須是正確的四欄 Markdown 表格', async () => {
  const markdown = await fixture('valid-relation-note.md');
  const malformedDivider = markdown.replace('|---|---|---|---|', '|---|---|---|');
  const malformedContent = markdown.replace(
    '| `SRC-002` |',
    '不可靜默略過的說明文字\n| `SRC-002` |'
  );

  assert.equal(parseDisposition(markdown).candidates.length, 1);
  assert.throws(
    () => parseDisposition(malformedDivider),
    (error) => error instanceof DispositionParseError && error.code === 'INVALID_CANDIDATE_TABLE'
  );
  assert.throws(
    () => parseDisposition(malformedContent),
    (error) => error instanceof DispositionParseError && error.code === 'INVALID_CANDIDATE_TABLE'
  );
});

test('試行記錄不接受新的狀態欄位', async () => {
  const markdown = (await fixture('valid-review-note.md')).replace(
    'canonical_status: needs_review',
    'canonical_status: needs_review\nevidence_state: complete'
  );

  assert.throws(
    () => validateDisposition(markdown),
    (error) =>
      error instanceof DispositionValidationError &&
      error.code === 'UNKNOWN_FIELD'
  );
});

test('關聯候選超過五筆時失敗', async () => {
  const markdown = await fixture('invalid-too-many-candidates.md');

  assert.throws(
    () => validateDisposition(markdown),
    (error) =>
      error instanceof DispositionValidationError && error.code === 'TOO_MANY_CANDIDATES'
  );
});

test('疑似秘密值 fail closed，且測試不保存真實秘密', async () => {
  const markdown = (await fixture('valid-review-note.md')).replace(
    '本篇只保留人工判讀。',
    '本篇只保留 token: synthetic_test_value。'
  );

  assert.throws(
    () => validateDisposition(markdown),
    (error) =>
      error instanceof DispositionValidationError && error.code === 'SENSITIVE_VALUE_DETECTED'
  );
});
