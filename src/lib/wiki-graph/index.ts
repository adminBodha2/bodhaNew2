import wikiGraphData from '$lib/data/wiki-graph.json';

export type WikiNodeType =
	| 'domain'
	| 'wiki'
	| 'thinker'
	| 'school'
	| 'question'
	| 'project'
	| 'blog'
	| 'book'
	| 'external-article'
	| 'lab';

export type WikiGraphNode = {
	id: string;
	type: WikiNodeType;
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

export type WikiGraphEdge = {
	id: string;
	from: string;
	to: string;
	type: string;
	meta?: {
		semantic?: string;
		source?: string;
		weight?: number;
		notes?: string;
	};
};

export type ListedWikiNode = {
	id: string;
	type: WikiNodeType;
	title: string;
	slug: string;
	description: string;
	href: string | null;
	isExternal: boolean;
	authors: string[];
	lens: string | null;
	route: string | null;
	source: string | null;
	tags: string[];
};

export type WikiSection = {
	key: string;
	title: string;
	items: ListedWikiNode[];
};

const sectionOrder = [
	{ key: 'thinker', title: 'Thinkers' },
	{ key: 'school', title: 'Schools' },
	{ key: 'question', title: 'Questions' },
	{ key: 'project', title: 'Research' },
	{ key: 'blog', title: 'Essays' },
	{ key: 'book', title: 'Books' },
	{ key: 'lab', title: 'Labs' }
] as const;

export const nodes = wikiGraphData.nodes as WikiGraphNode[];
export const edges = wikiGraphData.edges as WikiGraphEdge[];

export const nodeById = new Map(nodes.map((node) => [node.id, node]));
export const edgesFrom = new Map<string, WikiGraphEdge[]>();
export const edgesTo = new Map<string, WikiGraphEdge[]>();

for (const edge of edges) {
	if (!edgesFrom.has(edge.from)) edgesFrom.set(edge.from, []);
	edgesFrom.get(edge.from)?.push(edge);

	if (!edgesTo.has(edge.to)) edgesTo.set(edge.to, []);
	edgesTo.get(edge.to)?.push(edge);
}

export function getNode(id: string) {
	return nodeById.get(id);
}

export function getOutgoing(id: string) {
	return edgesFrom.get(id) ?? [];
}

export function getIncoming(id: string) {
	return edgesTo.get(id) ?? [];
}

export function routeFor(node: WikiGraphNode) {
	return typeof node.meta?.route === 'string' && node.meta.route.length > 0 ? node.meta.route : null;
}

export function nodeHref(node: WikiGraphNode) {
	return routeFor(node) ?? `/explorer/${encodeURIComponent(node.id)}`;
}

export function getNodeByRoute(route: string) {
	return nodes.find((node) => node.meta?.route === route);
}

export function getNodeScore(nodeId: string) {
	return (edgesTo.get(nodeId) ?? []).length;
}

export function getDomains() {
	return nodes
		.filter((node) => node.type === 'domain')
		.map((node) => ({
			id: node.id,
			title: node.title,
			slug: node.slug,
			description: node.description ?? '',
			tags: node.tags ?? [],
			color: node.meta?.color ?? '#d3633a',
			count: getDomainConnectedNodes(node.id).length,
			childCount: 0
		}))
		.sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
}

export function getDomainBySlug(slug: string) {
	return nodes.find((node) => node.type === 'domain' && node.slug === slug);
}

export function getDomainConnectedNodes(domainId: string) {
	const connectedIds = new Set<string>();

	for (const edge of edges) {
		if (edge.meta?.semantic !== 'domain_assignment') continue;
		if (edge.from === domainId) connectedIds.add(edge.to);
		if (edge.to === domainId) connectedIds.add(edge.from);
	}

	return Array.from(connectedIds)
		.map((id) => nodeById.get(id))
		.filter((node): node is WikiGraphNode => node !== undefined && node.id !== domainId)
		.sort((a, b) => a.title.localeCompare(b.title));
}

export function getDomainsForNode(nodeId: string) {
	const domainIds = new Set<string>();

	for (const edge of [...getIncoming(nodeId), ...getOutgoing(nodeId)]) {
		if (edge.meta?.semantic !== 'domain_assignment') continue;
		const otherId = edge.from === nodeId ? edge.to : edge.from;
		const other = nodeById.get(otherId);
		if (other?.type === 'domain') domainIds.add(other.id);
	}

	return Array.from(domainIds)
		.map((id) => nodeById.get(id))
		.filter((node): node is WikiGraphNode => node !== undefined && node.type === 'domain')
		.sort((a, b) => a.title.localeCompare(b.title));
}

export function listedNode(node: WikiGraphNode): ListedWikiNode {
	const href = routeFor(node);

	return {
		id: node.id,
		type: node.type,
		title: node.title,
		slug: node.slug,
		description: node.description ?? '',
		href,
		isExternal: href?.startsWith('http') ?? false,
		authors: node.meta?.author ?? [],
		lens: node.meta?.lens || null,
		route: node.meta?.route || null,
		source: node.meta?.source || null,
		tags: node.tags ?? []
	};
}

export function getDomainSections(domainId: string): WikiSection[] {
	const connected = getDomainConnectedNodes(domainId);

	return sectionOrder
		.map(({ key, title }) => ({
			key,
			title,
			items: connected.filter((node) => node.type === key).map(listedNode)
		}))
		.filter((section) => section.items.length > 0);
}

export function getExplorerGroupedNodes() {
	const contentNodes = nodes.filter((node) => node.type !== 'domain' && node.type !== 'wiki');

	return {
		blogs: contentNodes.filter((node) => node.type === 'blog'),
		books: contentNodes.filter((node) => node.type === 'book'),
		questions: contentNodes.filter((node) => node.type === 'question'),
		projects: contentNodes.filter((node) => node.type === 'project'),
		thinkers: contentNodes.filter((node) => node.type === 'thinker'),
		schools: contentNodes.filter((node) => node.type === 'school'),
		labs: contentNodes.filter((node) => node.type === 'lab'),
		externalArticles: contentNodes.filter((node) => node.type === 'external-article')
	};
}
