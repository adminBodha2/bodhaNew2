import type { PageLoad } from './$types';
import { nodes, getIncoming, getOutgoing, nodeById } from '$lib/graph';
import type { GraphEdge, GraphNode, NodeType } from '$lib/noder/graph';

type ConceptWithCount = GraphNode & {
	count: number;
	childCount: number;
};

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

	return Array.from(conceptMap.values());
}

function countContentForConcept(concept: GraphNode) {
	const contentIds = new Set<string>();

	for (const treeConcept of collectConceptTree(concept)) {
		for (const edge of getIncoming(treeConcept.id)) {
			const source = nodeById.get(edge.from);
			if (!source || !contentTypes.has(source.type)) continue;

			contentIds.add(source.id);
		}
	}

	return contentIds.size;
}

function nodeHref(node: GraphNode) {
	return node.meta.route || `/explorer/${encodeURIComponent(node.id)}`;
}

function conceptRouteNode(concept: ConceptWithCount): GraphNode {
	return {
		...concept,
		description:
			concept.description ||
			`${concept.count} knowledge-base nodes gathered under this top-level domain.`,
		meta: {
			...concept.meta,
			route: `/concepts/${concept.slug}`
		}
	};
}

function buildTopLevelConceptGraph(topLevelConcepts: ConceptWithCount[]) {
	const graphNodes = new Map<string, GraphNode>();
	const graphEdges = new Map<string, GraphEdge>();

	for (const concept of topLevelConcepts) {
		const topConcept = conceptRouteNode(concept);
		graphNodes.set(topConcept.id, topConcept);

		const contentIds = new Set<string>();
		for (const treeConcept of collectConceptTree(concept)) {
			for (const edge of getIncoming(treeConcept.id)) {
				const source = nodeById.get(edge.from);
				if (!source || !contentTypes.has(source.type)) continue;

				contentIds.add(source.id);
			}
		}

		for (const contentId of contentIds) {
			const contentNode = nodeById.get(contentId);
			if (!contentNode) continue;

			graphNodes.set(contentNode.id, {
				...contentNode,
				meta: {
					...contentNode.meta,
					route: nodeHref(contentNode)
				}
			});

			graphEdges.set(`${topConcept.id}->${contentNode.id}`, {
				id: `top-concept:${topConcept.slug}:${contentNode.id}`,
				from: topConcept.id,
				to: contentNode.id,
				type: 'HAS_TAG',
				meta: {
					source: 'manual',
					weight: 1
				}
			});
		}
	}

	return {
		nodes: Array.from(graphNodes.values()),
		edges: Array.from(graphEdges.values())
	};
}

export const load: PageLoad = () => {
	const allConcepts = nodes.filter((n) => n.type === 'concept');
	const childIds = new Set<string>();
	for (const concept of allConcepts) {
		for (const edge of getOutgoing(concept.id)) {
			if (edge.type === 'BROADER_THAN') {
				childIds.add(edge.to);
			}
		}
	}
	const topLevelConcepts: ConceptWithCount[] = allConcepts
		.filter((concept) => !childIds.has(concept.id) && concept.title !== 'Tags')
		.map((concept) => ({
			...concept,
			count: countContentForConcept(concept),
			childCount: getChildConcepts(concept.id).length
		}))
		.sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
	const conceptGraph = buildTopLevelConceptGraph(topLevelConcepts);

	return {
		topLevelConcepts,
		conceptGraph
	};
};
