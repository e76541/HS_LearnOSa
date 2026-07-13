#!/usr/bin/env node
import path from 'node:path';
import { loadStore } from '../core/store.mjs';
import { validateStore } from '../core/validate.mjs';

const root = path.resolve(process.argv[2] ?? 'registry');
try {
  const store = await loadStore(root);
  validateStore(store);
  const counts = Object.fromEntries(Object.entries(store).map(([table, records]) => [table, records.length]));
  process.stdout.write(`${JSON.stringify({ok: true, root, counts})}\n`);
} catch (error) {
  process.stderr.write(`${JSON.stringify({ok: false, code: error.code ?? 'ERROR', message: error.message})}\n`);
  process.exitCode = 1;
}
