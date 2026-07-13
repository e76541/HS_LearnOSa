import { createHash } from 'node:crypto';
import { invariant } from './errors.mjs';

export const MODULE_CORE_FIELDS = Object.freeze([
  'module_id', 'source_id', 'char_span', 'article_type', 'semantic_roles',
  'domain', 'operations', 'problem_type', 'input_type', 'output_type',
  'cognitive_level', 'is_skill_signal', 'confidence', 'schema_version', 'extractor'
]);

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

export function validateModuleCore(module) {
  invariant(module && typeof module === 'object' && !Array.isArray(module), 'INVALID_MODULE_CORE', 'ModuleCore must be an object');
  for (const field of MODULE_CORE_FIELDS) {
    invariant(Object.hasOwn(module, field), 'INVALID_MODULE_CORE', `ModuleCore missing ${field}`, {field});
  }
  for (const field of ['module_id','source_id','article_type','domain','problem_type','input_type','output_type','cognitive_level','schema_version','extractor']) {
    invariant(typeof module[field] === 'string' && module[field], 'INVALID_MODULE_CORE', `${field} must be a non-empty string`, {field});
  }
  invariant(Array.isArray(module.char_span) && module.char_span.length === 2 && module.char_span.every(Number.isInteger), 'INVALID_MODULE_CORE', 'char_span must contain two integers');
  invariant(module.char_span[0] >= 0 && module.char_span[1] > module.char_span[0], 'INVALID_MODULE_CORE', 'char_span must be a non-empty [start,end) range');
  invariant(Array.isArray(module.semantic_roles) && module.semantic_roles.length > 0 && module.semantic_roles.every((value) => typeof value === 'string' && value), 'INVALID_MODULE_CORE', 'semantic_roles must contain non-empty strings');
  invariant(Array.isArray(module.operations) && module.operations.every((value) => typeof value === 'string' && value), 'INVALID_MODULE_CORE', 'operations must contain strings');
  invariant(typeof module.is_skill_signal === 'boolean', 'INVALID_MODULE_CORE', 'is_skill_signal must be boolean');
  invariant(typeof module.confidence === 'number' && module.confidence >= 0 && module.confidence <= 1, 'INVALID_MODULE_CORE', 'confidence must be between 0 and 1');
  return module;
}

export function assertAlignableModule(module) {
  validateModuleCore(module);
  invariant(!module.semantic_roles.includes('background'), 'BACKGROUND_NOT_ALIGNABLE', 'Background modules cannot be aligned');
  invariant(module.is_skill_signal, 'NO_SKILL_SIGNAL', 'Non-skill-signal modules cannot be aligned');
  return module;
}

export function projectModuleCore(module) {
  assertAlignableModule(module);
  return Object.fromEntries(MODULE_CORE_FIELDS.map((field) => [field, module[field]]));
}

export function projectionFingerprint(module) {
  const projection = projectModuleCore(module);
  const digest = createHash('sha256').update(JSON.stringify(stable(projection))).digest('hex');
  return `sha256:${digest}`;
}
