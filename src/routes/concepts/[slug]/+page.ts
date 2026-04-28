import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import {
  nodes,
  getIncoming,
  getOutgoing,
  nodeById,
  getNodeScore
} from '$lib/graph';
import type { GraphNode, NodeType } from '$lib/noder/graph';

const contentTypes = new Set<NodeType>([
  'blog',
  'question',
  'project',
  'thinker',
  'school',
  'lab',
  'external-article',
  'book'
]);

type RelatedNode = {
  node: GraphNode;
  href: string;
  isExternal: boolean;
  matchedConcepts: GraphNode[];
};

function nodeHref(node: GraphNode) {
  return node.meta.route || `/explorer/${encodeURIComponent(node.id)}`;
}

function getChildConcepts(conceptId: string) {
  return getOutgoing(conceptId)
    .filter((edge) => edge.type === 'BROADER_THAN')
    .map((edge) => nodeById.get(edge.to))
    .filter((node): node is GraphNode => !!node && node.type === 'concept');
}

function collectConceptTree(concept: GraphNode) {
  const conceptMap = new Map<string, GraphNode>();
  const visit = (node: GraphNode) => {
    if (conceptMap.has(node.id)) return;
    conceptMap.set(node.id, node);

    for (const child of getChildConcepts(node.id)) {
      visit(child);
    }
  };

  visit(concept);

  return Array.from(conceptMap.values()).sort((a, b) => a.title.localeCompare(b.title));
}

export const load: PageLoad = ({ params }) => {
  const concept = nodes.find(
    (node) => node.type === 'concept' && node.slug === params.slug
  );

  if (!concept) {
    throw error(404, 'Concept not found');
  }

  const parentMap = new Map<string, GraphNode>();

  // parent concepts
  for (const edge of getOutgoing(concept.id)) {
    const target = nodeById.get(edge.to);
    if (!target) continue;

    if (edge.type === 'NARROWER_THAN' && target.type === 'concept') {
      parentMap.set(target.id, target);
    }
  }

  const conceptTree = collectConceptTree(concept);
  const contentMap = new Map<string, RelatedNode>();
  const akVargaMap = new Map<string, GraphNode>();

  for (const treeConcept of conceptTree) {
    for (const edge of getIncoming(treeConcept.id)) {
      const source = nodeById.get(edge.from);
      if (!source) continue;

      if (source.type === 'ak-varga') {
        akVargaMap.set(source.id, source);
        continue;
      }

      if (!contentTypes.has(source.type)) continue;

      const current = contentMap.get(source.id);
      if (current) {
        current.matchedConcepts.push(treeConcept);
      } else {
        contentMap.set(source.id, {
          node: source,
          href: nodeHref(source),
          isExternal: nodeHref(source).startsWith('http'),
          matchedConcepts: [treeConcept]
        });
      }
    }
  }

  const relatedNodes = Array.from(contentMap.values())
    .map((item) => ({ item, score: getNodeScore(item.node.id) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => ({
      ...x.item,
      matchedConcepts: x.item.matchedConcepts.sort((a, b) => a.title.localeCompare(b.title))
    }));

const relatedConceptMap = new Map<string, GraphNode>();

for (const relatedNode of relatedNodes) {
  for (const edge of getOutgoing(relatedNode.node.id)) {
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
    blogs: relatedNodes.filter((item) => item.node.type === 'blog'),
    books: relatedNodes.filter((item) => item.node.type === 'book'),
    questions: relatedNodes.filter((item) => item.node.type === 'question'),
    projects: relatedNodes.filter((item) => item.node.type === 'project'),
    thinkers: relatedNodes.filter((item) => item.node.type === 'thinker'),
    schools: relatedNodes.filter((item) => item.node.type === 'school'),
    labs: relatedNodes.filter((item) => item.node.type === 'lab'),
    externalArticles: relatedNodes.filter((item) => item.node.type === 'external-article')
  };

  return {
    concept,
    parents: Array.from(parentMap.values()),
    conceptTree: conceptTree.filter((item) => item.id !== concept.id),
    grouped,
    relatedNodes,
    akVargas,
	relatedConcepts,
    count: relatedNodes.length,
  };
};
