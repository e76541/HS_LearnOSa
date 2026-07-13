import { loadStore } from '../core/store.mjs';

export async function reviewQueue(root) {
  const store = await loadStore(root);
  return store.reviews.filter((review) => review.status === 'pending').map((review) => {
    const candidates = (review.suggestion.candidates ?? []).map((candidate) => {
      const node = store.nodes.find((item) => item.node_id === candidate.node_id);
      return {
        ...candidate,
        aliases: node?.aliases ?? candidate.aliases ?? [],
        broader_than_outgoing: store.edges.filter((edge) => edge.source === candidate.node_id),
        broader_than_incoming: store.edges.filter((edge) => edge.target === candidate.node_id)
      };
    });
    return {
      review_id: review.review_id,
      kind: review.kind,
      module: review.suggestion.module,
      candidates,
      suggestion: {...review.suggestion, candidates:undefined, module:undefined},
      risk_flags: review.risk_flags ?? []
    };
  });
}
