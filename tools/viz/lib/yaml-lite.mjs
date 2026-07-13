/**
 * Minimal YAML parser for HS LearnEdge module blocks (scalars, inline arrays, block lists).
 */
export function parseYamlLite(text) {
  const result = {};
  let currentKey = null;
  let listMode = false;

  for (const rawLine of text.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMode && currentKey && listMatch) {
      result[currentKey].push(unquote(listMatch[1].trim()));
      continue;
    }

    const kvMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!kvMatch) continue;

    const [, key, rawValue] = kvMatch;
    currentKey = key;
    listMode = false;

    if (rawValue === '') {
      result[key] = [];
      listMode = true;
      continue;
    }

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      const inner = rawValue.slice(1, -1).trim();
      result[key] = inner
        ? inner.split(',').map((part) => unquote(part.trim()))
        : [];
      continue;
    }

    result[key] = coerceScalar(unquote(rawValue.trim()));
  }

  return result;
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function coerceScalar(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}
