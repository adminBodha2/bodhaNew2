import type { PageLoad } from './$types';
import { edges, getExplorerGroupedNodes, nodes } from '$lib/wiki-graph';

export const load: PageLoad = () => {
	return {
		grouped: getExplorerGroupedNodes(),
		graph: {
			nodes,
			edges
		}
	};
};
