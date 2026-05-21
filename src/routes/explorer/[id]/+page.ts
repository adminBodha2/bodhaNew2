import type { PageLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getDomainsForNode, getIncoming, getNode, getOutgoing, nodeById, nodeHref, type WikiGraphNode } from '$lib/wiki-graph';

export const load: PageLoad = ({ params }) => {
	const node = getNode(params.id);

	if (!node) {
		throw error(404, 'Node not found');
	}

	const href = nodeHref(node);
	if (href !== `/explorer/${encodeURIComponent(node.id)}`) {
		throw redirect(302, href);
	}

	const relatedMap = new Map<string, WikiGraphNode>();
	const referencedByMap = new Map<string, WikiGraphNode>();

	for (const edge of getOutgoing(node.id)) {
		const target = nodeById.get(edge.to);
		if (!target || target.type === 'domain') continue;
		relatedMap.set(target.id, target);
	}

	for (const edge of getIncoming(node.id)) {
		const source = nodeById.get(edge.from);
		if (!source || source.type === 'domain') continue;
		referencedByMap.set(source.id, source);
	}

	return {
		node,
		concepts: getDomainsForNode(node.id),
		akVargas: [] as WikiGraphNode[],
		related: Array.from(relatedMap.values()),
		referencedBy: Array.from(referencedByMap.values()),
		contentFromConcepts: [] as WikiGraphNode[]
	};
};
