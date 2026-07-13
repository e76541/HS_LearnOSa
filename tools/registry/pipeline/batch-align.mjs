import { align } from '../index.mjs';
import { validateModuleCore } from '../core/module-core.mjs';

export async function batchShadowAlign(root, modules, options = {}) {
  if (!Array.isArray(modules)) throw new TypeError('modules must be an array of ModuleCore records');
  const results = [];
  for (const module of modules) {
    validateModuleCore(module);
    if (module.semantic_roles.includes('background')) {
      results.push({module_id:module.module_id,status:'skipped',reason:'BACKGROUND_NOT_ALIGNABLE'});
      continue;
    }
    if (!module.is_skill_signal) {
      results.push({module_id:module.module_id,status:'skipped',reason:'NO_SKILL_SIGNAL'});
      continue;
    }
    const judge = options.judgeForModule ? options.judgeForModule(module) : options.judge;
    const result = await align(root, module, {...options, judge});
    results.push({module_id:module.module_id,status:'shadow_review',review_id:result.review_id,replayed:result.replayed});
  }
  return results;
}
