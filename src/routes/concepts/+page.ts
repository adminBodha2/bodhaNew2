import type { PageLoad } from './$types';
import { nodes, getIncoming } from '$lib/graph';

export const load: PageLoad = () => {
  const concepts = nodes
    .filter((n) => n.type === 'concept')
    .map((concept) => ({
      ...concept,
      count: getIncoming(concept.id).length
    }))
    .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));

  return {
    concepts
  };
};