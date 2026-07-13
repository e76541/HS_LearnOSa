import { createHash } from 'node:crypto';

const DIMENSIONS = 256;

function tokens(text) {
  const normalized = text.normalize('NFKC').toLowerCase();
  const words = normalized.match(/[a-z0-9_]+|[\p{Script=Han}]/gu) ?? [];
  return words.flatMap((word) => word.length > 2 ? [word, ...Array.from({length:word.length - 2}, (_, index) => word.slice(index, index + 3))] : [word]);
}

export function localHashEmbedding(text) {
  const vector = Array(DIMENSIONS).fill(0);
  for (const token of tokens(text)) {
    const digest = createHash('sha256').update(token).digest();
    const index = digest.readUInt16BE(0) % DIMENSIONS;
    vector[index] += digest[2] % 2 ? 1 : -1;
  }
  const norm = Math.hypot(...vector);
  return norm === 0 ? vector : vector.map((value) => value / norm);
}

export function cosine(left, right) {
  if (left.length !== right.length) throw new Error('Embedding dimensions do not match');
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

export const LOCAL_EMBEDDING_VERSION = 'local-hash-embedding-v1';
