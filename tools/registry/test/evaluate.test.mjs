import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateBenchmark } from '../evaluate/metrics.mjs';

function perfectArticle(index) {
  const source = `SRC-${String(index).padStart(3,'0')}`;
  return {
    source_id:source,
    modules:[
      {module_id:'M01',expected:{decision:'same',node_id:'SKILL-000001'},observed:{candidate_node_ids:['SKILL-000001'],decision:'same',candidate_node_id:'SKILL-000001',created_new_skill:false,auto_accepted:false},review:{correction_type:'none',seconds:10}},
      {module_id:'M02',expected:{decision:'related',node_id:'SKILL-000002',relation_direction:'candidate_broader'},observed:{candidate_node_ids:['SKILL-000002'],decision:'related',candidate_node_id:'SKILL-000002',relation_direction:'candidate_broader',created_new_skill:false,auto_accepted:false},review:{correction_type:'none',seconds:20}},
      {module_id:'M03',expected:{decision:'reject'},observed:{candidate_node_ids:['SKILL-000001'],decision:'reject',created_new_skill:false,auto_accepted:false},review:{correction_type:'none',seconds:30}}
    ],
    overlap:{prior_node_hits:index === 1 ? 0 : 1,skill_module_count:3}
  };
}

test('incomplete benchmark reports exact Gate B deficit without inventing metrics', () => {
  const report = evaluateBenchmark({benchmark_version:1,articles:[{source_id:'SRC-001',modules:[{module_id:'M01',expected:{decision:'reject'}}],overlap:{prior_node_hits:0,skill_module_count:1}}]});
  assert.equal(report.gate_b_ready, false);
  assert.equal(report.readiness.article_count, 1);
  assert.equal(report.readiness.missing_observations, 1);
  assert.equal(report.metrics.decision_accuracy, null);
  assert.equal(report.readiness.auto_accept_threshold, 'UNSET');
});

test('thirty fully observed articles satisfy measurement readiness but do not decide thresholds', () => {
  const report = evaluateBenchmark({benchmark_version:1,articles:Array.from({length:30},(_,index) => perfectArticle(index + 1))});
  assert.equal(report.gate_b_ready, true);
  assert.equal(report.metrics.top5_recall, 1);
  assert.equal(report.metrics.top1_accuracy, 1);
  assert.equal(report.metrics.decision_accuracy, 1);
  assert.equal(report.metrics.parent_child_error_rate, 0);
  assert.equal(report.metrics.synonym_miscreation_rate, 0);
  assert.equal(report.metrics.average_human_review_seconds, 20);
  assert.equal(report.readiness.auto_accept_threshold, 'UNSET');
  assert.equal(report.readiness.r10, 'UNDECIDED');
  assert.equal(report.metrics.cumulative_overlap_curve.length, 30);
});

test('error metrics count auto alignment, direction, and synonym mistakes separately', () => {
  const article = perfectArticle(1);
  article.modules[0].observed = {...article.modules[0].observed,candidate_node_id:'SKILL-999999',created_new_skill:true,auto_accepted:true};
  article.modules[1].observed = {...article.modules[1].observed,relation_direction:'module_broader'};
  const report = evaluateBenchmark({benchmark_version:1,articles:[article]});
  assert.equal(report.metrics.incorrect_auto_alignment_rate, 1);
  assert.equal(report.metrics.parent_child_error_rate, 1);
  assert.equal(report.metrics.synonym_miscreation_rate, 1);
});
