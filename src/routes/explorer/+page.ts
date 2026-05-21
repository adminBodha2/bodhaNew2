import type { PageLoad } from './$types';
import { getExplorerGroupedNodes } from '$lib/wiki-graph';

export const load: PageLoad = () => {
	return {
		grouped: getExplorerGroupedNodes()
	};
};
