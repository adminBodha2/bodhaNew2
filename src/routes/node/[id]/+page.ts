import type { PageLoad } from './$types';
import {
  getNode,
  getOutgoing,
  getIncoming,
  nodeById
} from '$lib/graph';
import type { Node } from '$lib/types/graph';

export const load: PageLoad = ({ params }) => {
  const node = getNode(params.id);

  if (!node) throw new Error('Node not found');

  const outgoing = getOutgoing(node.id);
  const incoming = getIncoming(node.id);

  const conceptSet = new Map<string, Node>();
  const relatedSet = new Map<string, Node>();

  // outgoing → concepts / related
  for (const edge of outgoing) {
    const target = nodeById.get(edge.to);
    if (!target) continue;

    if (target.type === 'concept') {
      conceptSet.set(target.id, target);
    } else {
      relatedSet.set(target.id, target);
    }
  }

  const related: {
    concepts: Node[];
    related: Node[];
  } = {
    concepts: Array.from(conceptSet.values()),
    related: Array.from(relatedSet.values())
  };

  // incoming → references (also dedupe for safety)
  const referencedMap = new Map<string, Node>();

  for (const edge of incoming) {
    const n = nodeById.get(edge.from);
    if (n) referencedMap.set(n.id, n);
  }

  const referencedBy = Array.from(referencedMap.values());

  return {
    node,
    related,
    referencedBy
  };
};