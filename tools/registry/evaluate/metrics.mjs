import { invariant } from '../core/errors.mjs';

function ratio(numerator, denominator) {
  return denominator ? numerator / denominator : null;
}

function correct(caseRecord) {
  const {expected, observed} = caseRecord;
  if (!observed || observed.decision !== expected.decision) return false;
  if (expected.node_id && observed.candidate_node_id !== expected.node_id) return false;
  if (expected.relation_direction && observed.relation_direction !== expected.relation_direction) return false;
  return true;
}

export function evaluateBenchmark(benchmark) {
  invariant(benchmark?.benchmark_version === 1 && Array.isArray(benchmark.articles), 'INVALID_BENCHMARK', 'Benchmark must contain benchmark_version 1 and articles');
  const articleIds = new Set();
  const cases = [];
  const overlapCurve = [];
  let cumulativeHits = 0;
  let cumulativeSkillModules = 0;
  for (const article of benchmark.articles) {
    invariant(typeof article.source_id === 'string' && article.source_id, 'INVALID_BENCHMARK', 'Every article requires source_id');
    invariant(!articleIds.has(article.source_id), 'INVALID_BENCHMARK', `Duplicate article ${article.source_id}`);
    articleIds.add(article.source_id);
    invariant(Array.isArray(article.modules) && article.modules.length > 0, 'INVALID_BENCHMARK', `${article.source_id} requires module alignment labels`);
    for (const module of article.modules) {
      invariant(module.expected && ['same','related','reject'].includes(module.expected.decision), 'INVALID_BENCHMARK', `${article.source_id}/${module.module_id} has invalid expected decision`);
      cases.push({...module,source_id:article.source_id});
    }
    const hits = article.overlap?.prior_node_hits ?? 0;
    const total = article.overlap?.skill_module_count ?? article.modules.length;
    invariant(Number.isInteger(hits) && Number.isInteger(total) && hits >= 0 && total >= hits, 'INVALID_BENCHMARK', `${article.source_id} has invalid overlap counts`);
    cumulativeHits += hits; cumulativeSkillModules += total;
    overlapCurve.push({source_id:article.source_id,cumulative_prior_node_hits:cumulativeHits,cumulative_skill_modules:cumulativeSkillModules,cumulative_overlap_rate:ratio(cumulativeHits,cumulativeSkillModules)});
  }

  const observed = cases.filter((item) => item.observed);
  const expectedNode = observed.filter((item) => item.expected.node_id);
  const related = observed.filter((item) => item.expected.decision === 'related');
  const same = observed.filter((item) => item.expected.decision === 'same');
  const autoAccepted = observed.filter((item) => item.observed.auto_accepted === true);
  const reviews = observed.filter((item) => item.review && Number.isFinite(item.review.seconds));
  const corrections = {};
  for (const item of reviews) {
    const kind = item.review.correction_type ?? 'none';
    corrections[kind] = (corrections[kind] ?? 0) + 1;
  }
  const top5Hits = expectedNode.filter((item) => item.observed.candidate_node_ids?.includes(item.expected.node_id)).length;
  const top1Hits = expectedNode.filter((item) => item.observed.candidate_node_ids?.[0] === item.expected.node_id).length;
  const decisionHits = observed.filter((item) => item.observed.decision === item.expected.decision).length;
  const directionErrors = related.filter((item) => item.observed.relation_direction !== item.expected.relation_direction).length;
  const synonymMiscreation = same.filter((item) => item.observed.created_new_skill === true).length;
  const autoErrors = autoAccepted.filter((item) => !correct(item)).length;

  return {
    benchmark_version: 1,
    gate_b_ready: benchmark.articles.length >= 30 && observed.length === cases.length,
    readiness: {
      required_articles:30,
      article_count:benchmark.articles.length,
      module_case_count:cases.length,
      observed_case_count:observed.length,
      missing_observations:cases.length - observed.length,
      auto_accept_threshold:'UNSET',
      r10:'UNDECIDED'
    },
    metrics: {
      top5_recall:ratio(top5Hits, expectedNode.length),
      top1_accuracy:ratio(top1Hits, expectedNode.length),
      decision_accuracy:ratio(decisionHits, observed.length),
      incorrect_auto_alignment_rate:ratio(autoErrors, autoAccepted.length),
      parent_child_error_rate:ratio(directionErrors, related.length),
      synonym_miscreation_rate:ratio(synonymMiscreation, same.length),
      average_human_review_seconds:reviews.length ? reviews.reduce((sum,item) => sum + item.review.seconds,0) / reviews.length : null,
      correction_types:corrections,
      cumulative_overlap_curve:overlapCurve
    }
  };
}
