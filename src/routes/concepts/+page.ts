import type { PageLoad } from './$types';
import { nodes, getIncoming } from '$lib/graph';
import type { Node } from '$lib/types/graph';

export const load: PageLoad = () => {
  const concepts = nodes.filter((n: Node) => n.type === 'concept');

  // rank by number of connections
  const ranked = concepts
    .map((c: Node) => ({
      ...c,
      count: getIncoming(c.id).length
    }))
    .sort((a, b) => b.count - a.count)

  return {
    concepts: ranked
  };
};