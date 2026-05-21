import nodeVargaMap from '$lib/ontology/node-varga-map.json';
import { getNode, nodeHref, type WikiGraphNode } from '$lib/wiki-graph';

type NodeVargaMap = {
	vargas: Array<{
		slug: string;
		label: string;
		devanagari?: string;
		iast?: string;
		description: string;
	}>;
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

export interface OntologyNode {
	node: WikiGraphNode;
	href: string;
	isExternal: boolean;
	classification: {
		confidence: number;
		reason: string;
	};
}

export interface OntologyVarga {
	varga: WikiGraphNode;
	concepts: WikiGraphNode[];
	content: OntologyNode[];
	counts: Record<string, number>;
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

function vargaNode(varga: NodeVargaMap['vargas'][number]): WikiGraphNode {
	return {
		id: `ak-varga:${varga.slug}`,
		type: 'wiki',
		title: varga.label,
		slug: varga.slug,
		description: varga.description,
		tags: [],
		meta: {
			source: 'node-varga-map',
			route: `/ontology/${varga.slug}`
		}
	};
}

export function getAkVargas() {
	return sortByTitle(explicitVargaMap.vargas.map(vargaNode));
}

export function getOntologyVarga(slug: string): OntologyVarga | undefined {
	const varga = explicitVargaMap.vargas.find((item) => item.slug === slug);
	if (!varga) return undefined;

	const content = sortOntologyNodes(
		(explicitVargaMap.byVarga[slug] || [])
			.map((nodeId: string) => {
				const node = getNode(nodeId);
				if (!node) return null;

				const mapping = explicitVargaMap.mappings.find((item) => item.nodeId === node.id);
				const classification = mapping?.vargas.find((entry) => entry.slug === slug);
				if (!classification) return null;

				const href = nodeHref(node);
				return {
					node,
					href,
					isExternal: href.startsWith('http'),
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
		varga: vargaNode(varga),
		concepts: [],
		content,
		counts
	};
}

export function getOntologyIndex() {
	return getAkVargas()
		.map((varga) => getOntologyVarga(varga.slug))
		.filter((entry): entry is OntologyVarga => !!entry);
}
