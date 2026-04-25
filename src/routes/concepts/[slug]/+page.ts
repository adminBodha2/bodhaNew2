import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import {
  nodes,
  getIncoming,
  getOutgoing,
  nodeById,
  getNodeScore
} from '$lib/graph';
import type { GraphNode } from '$lib/noder/graph';

export const load: PageLoad = ({ params }) => {
  const concept = nodes.find(
    (node) => node.type === 'concept' && node.slug === params.slug
  );

  if (!concept) {
    throw error(404, 'Concept not found');
  }

  const parentMap = new Map<string, GraphNode>();
  const childMap = new Map<string, GraphNode>();

  // parent / child concepts
  for (const edge of getOutgoing(concept.id)) {
    const target = nodeById.get(edge.to);
    if (!target) continue;

    if (edge.type === 'NARROWER_THAN' && target.type === 'concept') {
      parentMap.set(target.id, target);
    }

    if (edge.type === 'BROADER_THAN' && target.type === 'concept') {
      childMap.set(target.id, target);
    }
  }

  const contentMap = new Map<string, GraphNode>();
  const akVargaMap = new Map<string, GraphNode>();
  // content and Amarakosha vargas connected to this concept
  for (const edge of getIncoming(concept.id)) {
    const source = nodeById.get(edge.from);
    if (!source) continue;
    if (source.type === 'concept') continue;

    if (source.type === 'ak-varga') {
      akVargaMap.set(source.id, source);
    } else {
      contentMap.set(source.id, source);
    }
  }

  const relatedNodes = Array.from(contentMap.values())
    .map((n) => ({ node: n, score: getNodeScore(n.id) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.node);

const relatedConceptMap = new Map<string, GraphNode>();

for (const relatedNode of relatedNodes) {
  for (const edge of getOutgoing(relatedNode.id)) {
    const target = nodeById.get(edge.to);
    if (!target) continue;

    if (target.type === 'concept' && target.id !== concept.id) {
      relatedConceptMap.set(target.id, target);
    }
  }
}

const relatedConcepts = Array.from(relatedConceptMap.values())
  .map((n) => ({ node: n, score: getNodeScore(n.id) }))
  .sort((a, b) => b.score - a.score)
  .map((x) => x.node);

  const akVargas = Array.from(akVargaMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title)
  );

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
    parents: Array.from(parentMap.values()),
    children: Array.from(childMap.values()),
    grouped,
    akVargas,
	relatedConcepts,
    count: relatedNodes.length,
  };
};