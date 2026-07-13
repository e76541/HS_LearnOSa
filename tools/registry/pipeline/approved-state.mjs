import { proficiency } from '../index.mjs';
import { loadStore } from '../core/store.mjs';

function sameModuleRef(record, moduleRef) {
  return record.module_ref.source_id === moduleRef.source_id && record.module_ref.module_id === moduleRef.module_id &&
    (!moduleRef.char_span || JSON.stringify(record.module_ref.char_span) === JSON.stringify(moduleRef.char_span));
}

export async function approvedNodeForModule(root, moduleRef) {
  const store = await loadStore(root);
  const alignment = store.alignments.find((record) => record.status === 'approved' && record.decision === 'same' && sameModuleRef(record, moduleRef));
  return alignment?.node_id ?? null;
}

export async function approvedProficiencyForModule(root, moduleRef) {
  const nodeId = await approvedNodeForModule(root, moduleRef);
  return nodeId ? proficiency(root, nodeId) : null;
}

export async function practiceEligibility(root, moduleRef) {
  const state = await approvedProficiencyForModule(root, moduleRef);
  return {node_id:await approvedNodeForModule(root, moduleRef),proficiency:state,single_module_practice:state !== 'mastered'};
}

export async function speakingScaffoldStart(root, moduleRefs) {
  const states = await Promise.all(moduleRefs.map((moduleRef) => approvedProficiencyForModule(root, moduleRef)));
  const mastered = states.filter((state) => state === 'mastered').length;
  return {level:moduleRefs.length > 0 && mastered > moduleRefs.length / 2 ? 2 : 1,states};
}
