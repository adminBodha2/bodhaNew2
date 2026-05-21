import type { PageLoad } from './$types';
import { edges, getDomains, nodes } from '$lib/wiki-graph';

export const load: PageLoad = () => {
	return {
		nodes,
		edges,
		domains: getDomains()
	};
};
