import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import wikiGraphData from '$lib/data/wiki-graph.json';

type WikiNode = {
	id: string;
	type: string;
	title: string;
	slug: string;
	description?: string;
	tags?: string[];
	meta?: {
		author?: string[];
		color?: string;
		domain?: string;
		lens?: string;
		route?: string | null;
		source?: string;
	};
};

type WikiEdge = {
	id: string;
	from: string;
	to: string;
	type: string;
	meta?: {
		semantic?: string;
		source?: string;
		weight?: number;
	};
};

type ListedNode = {
	id: string;
	type: string;
	title: string;
	slug: string;
	description: string;
	href: string | null;
	authors: string[];
	lens: string | null;
};

type Section = {
	key: string;
	title: string;
	items: ListedNode[];
};

const nodes = wikiGraphData.nodes as WikiNode[];
const edges = wikiGraphData.edges as WikiEdge[];
const nodeById = new Map(nodes.map((node) => [node.id, node]));

const sectionOrder = [
	{ key: 'thinker', title: 'Thinkers' },
	{ key: 'school', title: 'Schools' },
	{ key: 'question', title: 'Questions' },
	{ key: 'project', title: 'Research' },
	{ key: 'blog', title: 'Essays' },
	{ key: 'book', title: 'Books' },
	{ key: 'wiki', title: 'Knowledge Pages' }
];

function routeFor(node: WikiNode) {
	return typeof node.meta?.route === 'string' && node.meta.route.length > 0 ? node.meta.route : null;
}

function listedNode(node: WikiNode): ListedNode {
	return {
		id: node.id,
		type: node.type,
		title: node.title,
		slug: node.slug,
		description: node.description ?? '',
		href: routeFor(node),
		authors: node.meta?.author ?? [],
		lens: node.meta?.lens || null
	};
}

export const load: PageLoad = ({ params }) => {
	const domain = nodes.find((node) => node.type === 'domain' && node.slug === params.domain);

	if (!domain) {
		error(404, 'Wiki domain not found');
	}

	const domainId = domain.id;
	const connectedIds = new Set<string>();
	for (const edge of edges) {
		if (edge.meta?.semantic !== 'domain_assignment') continue;
		if (edge.from === domainId) connectedIds.add(edge.to);
		if (edge.to === domainId) connectedIds.add(edge.from);
	}

	const connected = Array.from(connectedIds)
		.map((id) => nodeById.get(id))
		.filter((node): node is WikiNode => node !== undefined && node.id !== domainId)
		.sort((a, b) => a.title.localeCompare(b.title));

	const sections: Section[] = sectionOrder.map(({ key, title }) => ({
		key,
		title,
		items: connected.filter((node) => node.type === key).map(listedNode)
	}));

	const domains = nodes
		.filter((node) => node.type === 'domain')
		.map((node) => ({
			title: node.title,
			slug: node.slug,
			active: node.slug === domain.slug
		}))
		.sort((a, b) => a.title.localeCompare(b.title));

	return {
		domain: {
			id: domain.id,
			title: domain.title,
			slug: domain.slug,
			description: domain.description ?? '',
			tags: domain.tags ?? [],
			color: domain.meta?.color ?? '#d3633a'
		},
		sections,
		domains,
		totalConnected: connected.length
	};
};
