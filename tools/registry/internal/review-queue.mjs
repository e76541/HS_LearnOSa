#!/usr/bin/env node
import path from 'node:path';
import { reviewQueue } from '../review/context.mjs';

const root = path.resolve(process.argv[2] ?? 'registry');
process.stdout.write(`${JSON.stringify(await reviewQueue(root), null, 2)}\n`);
