#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { evaluateBenchmark } from '../evaluate/metrics.mjs';

async function load(target) {
  const info = await stat(target);
  if (info.isFile()) return JSON.parse(await readFile(target, 'utf8'));
  const files = (await readdir(target)).filter((file) => file.endsWith('.benchmark.json')).sort();
  const documents = await Promise.all(files.map((file) => readFile(path.join(target,file),'utf8').then(JSON.parse)));
  return {benchmark_version:1,articles:documents.flatMap((document) => document.articles ?? [])};
}

const target = path.resolve(process.argv[2] ?? 'tools/registry/test/benchmark');
try {
  process.stdout.write(`${JSON.stringify(evaluateBenchmark(await load(target)), null, 2)}\n`);
} catch (error) {
  process.stderr.write(`${JSON.stringify({ok:false,code:error.code ?? 'ERROR',message:error.message})}\n`);
  process.exitCode = 1;
}
