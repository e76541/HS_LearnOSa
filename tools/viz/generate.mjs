#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocArtifacts } from './parse-doc-artifacts.mjs';
import { renderInlineViews } from './render-inline-views.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function usage() {
  console.error(`Usage: node tools/viz/generate.mjs <doc-dir> [--out views]

Examples:
  node tools/viz/generate.mjs DOC/Review/how-to-make-company-ai-native
  node tools/viz/generate.mjs DOC/Review/how-to-make-company-ai-native --out views
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

const docDir = path.resolve(process.cwd(), docDirArg);
const outputDir = path.join(docDir, outSubdir);

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
  process.exit(1);
}
