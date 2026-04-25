import type { PageLoad } from './$types';
import { nodes, getIncoming, getOutgoing, nodeById } from '$lib/graph';
import type { GraphNode } from '$lib/noder/graph';

type ConceptWithCount = GraphNode & {
	count: number;
};

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
		.filter((concept) => !childIds.has(concept.id))
		.map((concept) => ({
			...concept,
			count: getIncoming(concept.id).filter((edge) => {
				const source = nodeById.get(edge.from);
				return source && source.type !== 'concept';
			}).length
		}))
		.sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));

	const conceptChildren: Record<string, ConceptWithCount[]> = {};
	for (const concept of allConcepts) {
		const children: ConceptWithCount[] = [];

		for (const edge of getOutgoing(concept.id)) {
			if (edge.type !== 'BROADER_THAN') continue;

			const child = nodeById.get(edge.to);
			if (!child || child.type !== 'concept') continue;

			children.push({
				...child,
				count: getIncoming(child.id).filter((incomingEdge) => {
					const source = nodeById.get(incomingEdge.from);
					return source && source.type !== 'concept';
				}).length
			});
		}

		conceptChildren[concept.id] = children.sort(
			(a, b) => b.count - a.count || a.title.localeCompare(b.title)
		);
	}
	return {
		topLevelConcepts,
		conceptChildren,
  allConcepts: allConcepts
    .map((concept) => ({
      ...concept,
      count: getIncoming(concept.id).filter((edge) => {
        const source = nodeById.get(edge.from);
        return source && source.type !== 'concept';
      }).length
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
	};
};