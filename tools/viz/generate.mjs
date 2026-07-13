#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocArtifacts } from './parse-doc-artifacts.mjs';
import { renderInlineViews } from './render-inline-views.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

function usage() {
  const scriptPath = path.join(REPO_ROOT, 'tools/viz/generate.mjs');
  console.error(`Usage: node <repo>/tools/viz/generate.mjs <doc-dir> [--out views]

Run from any directory; <doc-dir> is relative to the repo root unless absolute.

Examples:
  node ${scriptPath} DOC/Review/how-to-make-company-ai-native
  cd ${REPO_ROOT} && node tools/viz/generate.mjs DOC/Review/how-to-make-company-ai-native
`);
}

const args = process.argv.slice(2);
if (!args.length || args.includes('-h') || args.includes('--help')) {
  usage();
  process.exit(args.length ? 0 : 1);
}

const docDirArg = args[0];
const outFlagIndex = args.indexOf('--out');
const outSubdir = outFlagIndex >= 0 ? args[outFlagIndex + 1] ?? 'views' : 'views';

const docDir = path.isAbsolute(docDirArg)
  ? docDirArg
  : path.resolve(REPO_ROOT, docDirArg);
const outputDir = path.join(docDir, outSubdir);

if (!fs.existsSync(path.join(REPO_ROOT, 'AGENTS.md'))) {
  console.error(`Error: repo root not found at ${REPO_ROOT}`);
  process.exit(1);
}

try {
  const projection = parseDocArtifacts(docDir);
  const files = renderInlineViews(projection, outputDir);

  console.log(`Parsed ${projection.modules.length} modules, ${projection.edges.length} edges`);
  console.log(`Warnings: ${projection.warnings.length}`);
  console.log(`Wrote ${files.length} files to ${outputDir}:`);
  for (const file of files.sort()) {
    console.log(`  - ${file}`);
  }

  if (projection.modules.length === 0) {
    process.exit(2);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  console.error(`Repo root: ${REPO_ROOT}`);
  console.error(`Doc dir:  ${docDir}`);
  if (error.message.includes('Missing modules.md')) {
    console.error('Hint: pull branch cursor/inline-diagram-viz-plan-2c21 or merge PR #1 first.');
  }
  process.exit(1);
}
