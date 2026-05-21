import type { LayoutLoad } from './$types';
import { edges, getDomains, nodes } from '$lib/wiki-graph';

export const load: LayoutLoad = () => {
	return {
		domains: getDomains(),
		nodes,
		edges
	};
};
