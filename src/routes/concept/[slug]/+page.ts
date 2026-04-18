import type { PageLoad } from './$types';
import { getNodeBySlug, getIncoming, getOutgoing, nodeById } from '$lib/graph';
import { groupByType } from '$lib/graph/group';
import type { Node } from '$lib/types/graph';

export const load: PageLoad = ({ params }) => {
  const concept = getNodeBySlug(params.slug);

  if (!concept) throw new Error('Concept not found');

  const incoming = getIncoming(concept.id);
  const outgoing = getOutgoing(concept.id);

  const contentMap = new Map<string, Node>();
  const relatedConceptMap = new Map<string, Node>();

  // incoming → content nodes that tag this concept
  for (const edge of incoming) {
    const n = nodeById.get(edge.from);
    if (!n) continue;
    if (n.type === 'concept') {
      relatedConceptMap.set(n.id, n);
    } else {
      contentMap.set(n.id, n);
    }
  }

  // outgoing → related concepts (e.g. RELATED_TO edges to AK vargas)
  for (const edge of outgoing) {
    if (edge.type === 'RELATED_TO') {
      const n = nodeById.get(edge.to);
      if (n && n.type === 'concept') relatedConceptMap.set(n.id, n);
    }
  }

  return {
    concept,
    grouped: groupByType(Array.from(contentMap.values())),
    relatedConcepts: Array.from(relatedConceptMap.values())
  };
};
