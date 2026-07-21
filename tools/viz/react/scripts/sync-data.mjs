// 將 repo 內 DOC/{bucket}/{slug}/views/_data.json 複製為唯讀展示投影。
// 唯讀：此腳本只讀取 DOC 產物，不回寫任何正式資料。
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const reactDir = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(reactDir, '..', '..', '..');
const docRoot = path.join(repoRoot, 'DOC');
const outDir = path.join(reactDir, 'public', 'data');

mkdirSync(outDir, { recursive: true });

/** @returns {string[]} 子目錄名稱 */
function subdirs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

const entries = [];
const skipped = [];

for (const bucket of subdirs(docRoot)) {
  for (const slug of subdirs(path.join(docRoot, bucket))) {
    const dataFile = path.join(docRoot, bucket, slug, 'views', '_data.json');
    if (!existsSync(dataFile)) continue;
    try {
      const raw = JSON.parse(readFileSync(dataFile, 'utf8'));
      if (!raw || !raw.source || !Array.isArray(raw.modules) || !Array.isArray(raw.edges)) {
        skipped.push({ bucket, slug, reason: '缺少 source/modules/edges 欄位' });
        continue;
      }
      const id = `${bucket}--${slug}`;
      const file = `${id}.json`;
      cpSync(dataFile, path.join(outDir, file));
      entries.push({
        id,
        bucket,
        slug,
        title: raw.source.title ?? slug,
        source_id: raw.source.source_id ?? '',
        module_count: raw.modules.length,
        edge_count: raw.edges.length,
        file,
      });
    } catch (err) {
      skipped.push({ bucket, slug, reason: `JSON 解析失敗：${String(err)}` });
    }
  }
}

entries.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(
  path.join(outDir, 'index.json'),
  JSON.stringify({ generated_at: new Date().toISOString(), sources: entries, skipped }, null, 2),
);

console.log(`[sync-data] 已同步 ${entries.length} 份來源 → ${path.relative(repoRoot, outDir)}`);
for (const s of skipped) console.warn(`[sync-data] 略過 ${s.bucket}/${s.slug}：${s.reason}`);
