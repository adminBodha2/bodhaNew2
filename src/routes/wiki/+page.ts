import type { PageLoad } from './$types';
import wikiGraphData from '$lib/data/wiki-graph.json';
import type { GraphEdge, GraphNode } from '$lib/noder/graph';

export const load: PageLoad = () => {
	const domains = wikiGraphData.nodes
		.filter((node) => node.type === 'domain')
		.map((node) => ({
			title: node.title,
			slug: node.slug,
			description: node.description,
			color: (node.meta as { color?: string })?.color
		}))
		.sort((a, b) => a.title.localeCompare(b.title));

	return {
		nodes: wikiGraphData.nodes as unknown as GraphNode[],
		edges: wikiGraphData.edges as unknown as GraphEdge[],
		domains
	};
};
