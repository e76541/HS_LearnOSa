import { cosine, localHashEmbedding } from '../align/embedding.mjs';
import { projectionFingerprint } from '../core/module-core.mjs';
import { invariant } from '../core/errors.mjs';
import { loadStore } from '../core/store.mjs';

function projectionText(module) {
  return [module.domain, ...(module.operations ?? []), module.problem_type, module.input_type, module.output_type].join('\n');
}

export function similarPending(module, records, limit = 5) {
  const query = localHashEmbedding(projectionText(module));
  return records
    .filter((record) => record.status === 'open')
    .map((record) => ({pending_id:record.pending_id,similarity:cosine(query, localHashEmbedding(projectionText(record.module_projection))) }))
    .filter((item) => item.similarity > 0)
    .sort((left, right) => right.similarity - left.similarity || left.pending_id.localeCompare(right.pending_id))
    .slice(0, limit)
    .map((item) => item.pending_id);
}

export async function findPending(root, module) {
  const fingerprint = projectionFingerprint(module);
  const store = await loadStore(root);
  const record = store.pending.find((item) => item.projection_fingerprint === fingerprint);
  invariant(record, 'PENDING_REQUIRES_REVIEW', 'No reviewed pending slot exists for this module');
  return record;
}
