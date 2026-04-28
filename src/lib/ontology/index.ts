import nodeVargaMap from '$lib/ontology/node-varga-map.json';
import { getNode, getOutgoing, nodeById, nodes } from '$lib/graph';
import type { GraphNode, NodeType } from '$lib/noder/graph';

type NodeVargaMap = {
	byVarga: Record<string, string[]>;
	mappings: Array<{
		nodeId: string;
		vargas: Array<{
			slug: string;
			confidence: number;
			reason: string;
		}>;
	}>;
};

const explicitVargaMap = nodeVargaMap as NodeVargaMap;

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

export interface OntologyNode {
	node: GraphNode;
	href: string;
	isExternal: boolean;
	classification: {
		confidence: number;
		reason: string;
	};
}

export interface OntologyVarga {
	varga: GraphNode;
	concepts: GraphNode[];
	content: OntologyNode[];
	counts: Record<string, number>;
}

export function nodeHref(node: GraphNode) {
	return node.meta.route || `/explorer/${encodeURIComponent(node.id)}`;
}

export function isExternalNode(node: GraphNode) {
	return nodeHref(node).startsWith('http');
}

function sortByTitle<T extends { title: string }>(items: T[]) {
	return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

function sortOntologyNodes(items: OntologyNode[]) {
	return [...items].sort((a, b) => {
		const typeCompare = a.node.type.localeCompare(b.node.type);
		if (typeCompare !== 0) return typeCompare;

		return a.node.title.localeCompare(b.node.title);
	});
}

export function getAkVargas() {
	return sortByTitle(nodes.filter((node) => node.type === 'ak-varga'));
}

export function getOntologyVarga(slug: string): OntologyVarga | undefined {
	const varga = getNode(`ak-varga:${slug}`);
	if (!varga || varga.type !== 'ak-varga') return undefined;

	const concepts = getOutgoing(varga.id)
		.map((edge) => nodeById.get(edge.to))
		.filter((node): node is GraphNode => !!node && node.type === 'concept');
	const content = sortOntologyNodes(
		(explicitVargaMap.byVarga[slug] || [])
			.map((nodeId: string) => {
				const node = getNode(nodeId);
				if (!node || !contentTypes.has(node.type)) return null;

				const mapping = explicitVargaMap.mappings.find((item) => item.nodeId === node.id);
				const classification = mapping?.vargas.find((entry) => entry.slug === slug);
				if (!classification) return null;

				return {
					node,
					href: nodeHref(node),
					isExternal: isExternalNode(node),
					classification: {
						confidence: classification.confidence,
						reason: classification.reason
					}
				};
			})
			.filter((item): item is OntologyNode => !!item)
	);
	const counts = content.reduce<Record<string, number>>((acc, item) => {
		acc[item.node.type] = (acc[item.node.type] ?? 0) + 1;
		return acc;
	}, {});

	return {
		varga,
		concepts: sortByTitle(concepts),
		content,
		counts
	};
}

export function getOntologyIndex() {
	return getAkVargas()
		.map((varga) => getOntologyVarga(varga.slug))
		.filter((entry): entry is OntologyVarga => !!entry);
}
