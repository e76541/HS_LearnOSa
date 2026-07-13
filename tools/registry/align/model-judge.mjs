import { invariant } from '../core/errors.mjs';

export const JUDGE_OUTPUT_SCHEMA = Object.freeze({
  type:'object',
  additionalProperties:false,
  required:['decision','reason','confidence'],
  properties:{
    decision:{enum:['same','related','reject']},
    candidate_node_id:{type:'string',pattern:'^SKILL-[0-9]{6}$'},
    reason:{type:'string',minLength:1},
    confidence:{type:'number',minimum:0,maximum:1},
    relation_direction:{enum:['candidate_broader','module_broader','uncertain']}
  }
});

export function createModelJudge(invoke) {
  invariant(typeof invoke === 'function', 'INVALID_MODEL_ADAPTER', 'Model judge requires an invoke function');
  return async ({module,candidates,registry_snapshot,engine_version}) => invoke({
    system:[
      'Classify one ModuleCore projection against a closed candidate set.',
      'Return JSON only. decision must be same, related, or reject.',
      'same/related must select candidate_node_id from candidates.',
      'related must set relation_direction; reject must not select a candidate.',
      'Do not infer from type ontology, body text, hooks, or graph edges.'
    ].join(' '),
    input:{module,candidates,registry_snapshot,engine_version},
    output_schema:JUDGE_OUTPUT_SCHEMA
  });
}
