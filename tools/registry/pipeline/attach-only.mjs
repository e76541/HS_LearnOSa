import { loadStore } from '../core/store.mjs';

export async function approvedAttachment(root, moduleRef, {minimumRegistrySize = 5} = {}) {
  const store = await loadStore(root);
  if (store.nodes.length < minimumRegistrySize) return {status:'dormant',reason:'REGISTRY_TOO_SMALL'};
  const alignment = store.alignments.find((record) =>
    record.status === 'approved' && record.decision === 'same' &&
    record.module_ref.source_id === moduleRef.source_id && record.module_ref.module_id === moduleRef.module_id
  );
  return alignment ? {status:'attached',node_id:alignment.node_id,alignment_id:alignment.alignment_id} : {status:'unmatched'};
}
