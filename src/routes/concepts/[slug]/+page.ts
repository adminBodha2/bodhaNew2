import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { nodes, getIncoming, nodeById } from '$lib/graph';
import type { GraphNode } from '$lib/noder/graph';
import { getNodeScore } from '$lib/graph';

export const load: PageLoad = ({ params }) => {
  const concept = nodes.find(
    (node) => node.type === 'concept' && node.slug === params.slug
  );

  if (!concept) {
    throw error(404, 'Concept not found');
  }

const map = new Map<string, GraphNode>();
const akVargaMap = new Map<string, GraphNode>();

for (const edge of getIncoming(concept.id)) {
  const source = nodeById.get(edge.from);
  if (!source) continue;

  if (source.type === 'concept') continue;

  if (source.type === 'ak-varga') {
    akVargaMap.set(source.id, source);
  } else {
    map.set(source.id, source);
  }
}

const relatedNodes = Array.from(map.values())
  .map(n => ({ node: n, score: getNodeScore(n.id) }))
  .sort((a, b) => b.score - a.score)
  .map(x => x.node);

const akVargas = Array.from(akVargaMap.values())
  .sort((a, b) => a.title.localeCompare(b.title));

  const grouped = {
    blogs: relatedNodes.filter((n) => n.type === 'blog'),
    books: relatedNodes.filter((n) => n.type === 'book'),
    questions: relatedNodes.filter((n) => n.type === 'question'),
    projects: relatedNodes.filter((n) => n.type === 'project'),
    thinkers: relatedNodes.filter((n) => n.type === 'thinker'),
    schools: relatedNodes.filter((n) => n.type === 'school'),
    labs: relatedNodes.filter((n) => n.type === 'lab'),
    externalArticles: relatedNodes.filter((n) => n.type === 'external-article')
  };

return {
  concept,
  grouped,
  akVargas,
  count: relatedNodes.length
};
};