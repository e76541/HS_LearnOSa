#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { decideReview } from '../review/decide.mjs';

const root = path.resolve(process.argv[2] ?? 'registry');
const decisionFile = process.argv[3];
if (!decisionFile) throw new Error('Usage: decide-review.mjs <registry-root> <decision.json>');
const request = JSON.parse(await readFile(path.resolve(decisionFile), 'utf8'));
process.stdout.write(`${JSON.stringify(await decideReview(root, request))}\n`);
