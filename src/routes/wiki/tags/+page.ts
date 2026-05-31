import type { PageLoad } from './$types';
import { nodes, nodeHref } from '$lib/wiki-graph';
import tagsRaw from '$lib/serving/tags.json';

export type WikiTagItem = {
	id: string;
	type: string;
	title: string;
	description: string;
	href: string;
	isExternal: boolean;
	tags: string[];
};

export const load: PageLoad = (): { tags: string[]; items: WikiTagItem[] } => {
	// Tags come purely from the canonical list in tags.json
	const tags: string[] = tagsRaw.map((t: { tag: string }) => t.tag);

	// Prepare the items that can be filtered (still from wiki graph)
	const items: WikiTagItem[] = nodes.map((node) => {
		const href = nodeHref(node);
		return {
			id: node.id,
			type: node.type,
			title: node.title,
			description: node.description ?? '',
			href,
			isExternal: href.startsWith('http'),
			tags: node.tags ?? []
		};
	});

	return { tags, items };
};
