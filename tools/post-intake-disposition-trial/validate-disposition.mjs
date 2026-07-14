import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDisposition } from './parse-disposition.mjs';

const REQUIRED_FIELDS = [
  'source_id',
  'trial_version',
  'canonical_bucket',
  'canonical_status',
];
const ALLOWED_FIELDS = new Set(REQUIRED_FIELDS);

export class DispositionValidationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'DispositionValidationError';
    this.code = code;
  }
}

export function validateDisposition(markdown) {
  rejectSensitiveValue(markdown);
  const disposition = parseDisposition(markdown);
  const { record, candidates } = disposition;

  for (const field of REQUIRED_FIELDS) {
    invariant(field in record, 'MISSING_FIELD', `試行記錄缺少 ${field}`);
  }
  for (const field of Object.keys(record)) {
    invariant(ALLOWED_FIELDS.has(field), 'UNKNOWN_FIELD', `試行記錄含未知欄位 ${field}`);
  }

  invariant(
    typeof record.source_id === 'string' && /^(PENDING|SRC)-[a-z0-9-]+$/i.test(record.source_id),
    'INVALID_SOURCE_ID',
    'source_id 必須是 PENDING-* 或 SRC-*'
  );
  invariant(record.trial_version === 1, 'INVALID_TRIAL_VERSION', 'trial_version 必須是 1');
  invariant(
    record.canonical_bucket === 'Review' && record.canonical_status === 'needs_review',
    'CANONICAL_STATE_MISMATCH',
    '本試行只可附著在 DOC/Review 的 needs_review 文檔'
  );

  validateCandidates(candidates);

  return disposition;
}

export async function validateDirectory(reviewRoot) {
  const root = path.resolve(reviewRoot);
  const files = await findDispositionFiles(root);
  invariant(files.length > 0, 'NO_TRIAL_RECORDS', '找不到 post-intake-disposition.md');

  const repoRoot = path.resolve(root, '..', '..');
  const records = [];

  for (const file of files) {
    const markdown = await readFile(file, 'utf8');
    const disposition = validateDisposition(markdown);
    const documentRoot = path.dirname(file);
    const readmePath = path.join(documentRoot, 'README.md');
    const readme = await readFile(readmePath, 'utf8').catch(() => null);

    invariant(readme, 'MISSING_README', `${file} 同層缺少 README.md`);
    invariant(
      readme.includes(disposition.record.source_id),
      'SOURCE_ID_NOT_IN_README',
      `${file} 的 source_id 未見於 README.md`
    );

    for (const candidate of disposition.candidates) {
      const candidatePath = resolveRepoPath(repoRoot, candidate.candidate_path);
      const candidateStat = await stat(candidatePath).catch(() => null);
      invariant(
        candidateStat,
        'MISSING_CANDIDATE_PATH',
        `${file} 的候選路徑不存在：${candidate.candidate_path}`
      );
    }

    records.push({ file, ...disposition.record, candidate_count: disposition.candidates.length });
  }

  return records;
}

function validateCandidates(candidates) {
  invariant(candidates.length <= 5, 'TOO_MANY_CANDIDATES', '關聯候選最多五筆');

  const references = new Set();
  for (const candidate of candidates) {
    for (const [field, value] of Object.entries(candidate)) {
      invariant(
        typeof value === 'string' && value.trim(),
        'INVALID_CANDIDATE',
        `關聯候選的 ${field} 不可為空`
      );
    }
    invariant(
      !references.has(candidate.candidate_ref),
      'DUPLICATE_CANDIDATE',
      `關聯候選重複：${candidate.candidate_ref}`
    );
    references.add(candidate.candidate_ref);
  }
}

function rejectSensitiveValue(markdown) {
  const assignment = markdown.match(
    /\b(?:api[_-]?key|token|password|secret|authorization|private[_-]?key)\b\s*[:=]\s*([^\r\n|]+)/i
  );
  const knownKey = markdown.match(/\b(?:sk|ghp|xoxb)-?[A-Za-z0-9_-]{12,}\b|\bAKIA[A-Z0-9]{16}\b/);

  invariant(!assignment && !knownKey, 'SENSITIVE_VALUE_DETECTED', '試行註記不可保存秘密值');
}

function resolveRepoPath(repoRoot, relativePath) {
  invariant(!path.isAbsolute(relativePath), 'CANDIDATE_PATH_OUTSIDE_REPO', '候選路徑必須相對於 repo 根目錄');
  const resolved = path.resolve(repoRoot, relativePath);
  const relative = path.relative(repoRoot, resolved);
  invariant(
    relative && !relative.startsWith('..') && !path.isAbsolute(relative),
    'CANDIDATE_PATH_OUTSIDE_REPO',
    '候選路徑不可離開 repo 根目錄'
  );
  return resolved;
}

async function findDispositionFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findDispositionFiles(entryPath)));
    } else if (entry.isFile() && entry.name === 'post-intake-disposition.md') {
      files.push(entryPath);
    }
  }
  return files;
}

function invariant(condition, code, message) {
  if (!condition) throw new DispositionValidationError(code, message);
}

async function main() {
  const reviewRoot = process.argv[2];
  if (!reviewRoot) {
    throw new Error('Usage: node validate-disposition.mjs DOC/Review');
  }

  const records = await validateDirectory(reviewRoot);
  console.log(`PASS ${records.length} 個收錄後處置 shadow 註記`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`${error.code ?? error.name}: ${error.message}`);
    process.exitCode = 1;
  });
}
