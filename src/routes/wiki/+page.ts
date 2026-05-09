import type { PageLoad } from './$types';
import wikiGraphData from '$lib/data/wiki-graph.json';
import type { GraphEdge, GraphNode } from '$lib/noder/graph';

export const load: PageLoad = () => {
	return {
		nodes: wikiGraphData.nodes as unknown as GraphNode[],
		edges: wikiGraphData.edges as unknown as GraphEdge[],
	};
};
