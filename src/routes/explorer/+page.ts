import type { PageLoad } from './$types';
import { nodes } from '$lib/graph';
import type { Node } from '$lib/types/graph';

export const load: PageLoad = () => {
	return {
		articles: nodes.filter((n: Node) => n.type === 'article'),
		texts: nodes.filter((n: Node) => n.type === 'text'),
		thinkers: nodes.filter((n: Node) => n.type === 'thinker'),
		schools: nodes.filter((n: Node) => n.type === 'school'),
		questions: nodes.filter((n: Node) => n.type === 'question')
	};
};