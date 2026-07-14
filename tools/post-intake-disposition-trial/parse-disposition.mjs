import { parseYamlLite } from '../viz/lib/yaml-lite.mjs';

const CANDIDATE_COLUMNS = [
  'candidate_ref',
  'candidate_path',
  'proposed_relation',
  'why_compare',
];

export class DispositionParseError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'DispositionParseError';
    this.code = code;
  }
}

export function parseDisposition(markdown) {
  const recordMatch = markdown.match(/## 試行記錄\s*\r?\n```yaml\r?\n([\s\S]*?)```/);
  if (!recordMatch) {
    throw new DispositionParseError('MISSING_TRIAL_RECORD', '找不到「試行記錄」YAML 區塊');
  }

  const candidateMatch = markdown.match(
    /## 關聯候選\s*\r?\n([\s\S]*?)(?=\r?\n## |$)/
  );
  if (!candidateMatch) {
    throw new DispositionParseError('MISSING_RELATION_CANDIDATES', '找不到「關聯候選」表格');
  }

  return {
    record: parseYamlLite(recordMatch[1]),
    candidates: parseCandidateTable(candidateMatch[1]),
  };
}

function parseCandidateTable(section) {
  const lines = section
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.some((line) => !line.startsWith('|'))) {
    throw new DispositionParseError(
      'INVALID_CANDIDATE_TABLE',
      '關聯候選區塊只可包含四欄 Markdown 表格'
    );
  }

  if (lines.length < 2) {
    throw new DispositionParseError('INVALID_CANDIDATE_TABLE', '關聯候選需要表頭與分隔列');
  }

  const header = tableCells(lines[0]);
  const divider = tableCells(lines[1]);
  if (
    header.length !== CANDIDATE_COLUMNS.length ||
    !header.every((cell, index) => cell === CANDIDATE_COLUMNS[index]) ||
    divider.length !== CANDIDATE_COLUMNS.length ||
    !divider.every((cell) => /^-+$/.test(cell))
  ) {
    throw new DispositionParseError(
      'INVALID_CANDIDATE_TABLE',
      '關聯候選表格必須有四欄正確表頭與分隔列'
    );
  }

  return lines.slice(2).map((line) => {
    const cells = tableCells(line);
    if (cells.length !== CANDIDATE_COLUMNS.length) {
      throw new DispositionParseError(
        'INVALID_CANDIDATE_ROW',
        '關聯候選每列必須剛好有四欄'
      );
    }

    return Object.fromEntries(
      CANDIDATE_COLUMNS.map((column, index) => [column, cleanCell(cells[index])])
    );
  });
}

function tableCells(line) {
  return line
    .slice(1, line.endsWith('|') ? -1 : undefined)
    .split('|')
    .map((cell) => cell.trim());
}

function cleanCell(value) {
  return value.replace(/^`|`$/g, '');
}
