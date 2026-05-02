import type { PageLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getNode, getOutgoing, getIncoming, nodeById } from '$lib/graph';
import type { GraphNode } from '$lib/noder/graph';

export const load: PageLoad = ({ params }) => {
  const id = params.id;
  const node = getNode(id);

  if (!node) {
    throw error(404, 'Node not found');
  }

  if (node.meta.route) {
    throw redirect(302, node.meta.route);
  }

  const conceptMap = new Map<string, GraphNode>();
  const relatedMap = new Map<string, GraphNode>();
  const referencedByMap = new Map<string, GraphNode>();
const akVargaMap = new Map<string, GraphNode>();

  for (const edge of getOutgoing(node.id)) {
    const target = nodeById.get(edge.to);
    if (!target) continue;

if (target.type === 'concept') {
  conceptMap.set(target.id, target);
} else if (target.type === 'ak-varga') {
  akVargaMap.set(target.id, target);
} else {
  relatedMap.set(target.id, target);
}
  }

  for (const edge of getIncoming(node.id)) {
    const source = nodeById.get(edge.from);
    if (!source) continue;
    referencedByMap.set(source.id, source);
  }
	let contentFromConcepts: GraphNode[] = [];
if (node.type === 'ak-varga') {
  const contentMap = new Map<string, GraphNode>();

  for (const concept of conceptMap.values()) {
    for (const edge of getIncoming(concept.id)) {
      const source = nodeById.get(edge.from);
      if (!source) continue;
      if (source.type === 'concept') continue;

      contentMap.set(source.id, source);
    }
  }

  contentFromConcepts = Array.from(contentMap.values());
}

return {
  node,
  concepts: Array.from(conceptMap.values()),
  akVargas: Array.from(akVargaMap.values()),
  related: Array.from(relatedMap.values()),
  referencedBy: Array.from(referencedByMap.values()),
  contentFromConcepts
};
};
