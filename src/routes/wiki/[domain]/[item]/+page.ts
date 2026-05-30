import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import {
	getDomainBySlug,
	getDomainsForNode,
	getIncoming,
	getNodeByRoute,
	getOutgoing,
	nodeById,
	nodes,
	type WikiGraphNode
} from '$lib/wiki-graph';

export const load: PageLoad = ({ params }) => {
	const domain = getDomainBySlug(params.domain);
	if (!domain) {
		error(404, 'Wiki domain not found');
	}

	// Resolve the wiki item — prefer the new nested route, fall back to legacy flat route + direct lookup
	const nestedRoute = `/wiki/${params.domain}/${params.item}`;
	let wikiNode = getNodeByRoute(nestedRoute);

	if (!wikiNode || wikiNode.type !== 'wiki') {
		// legacy flat route stored in the data
		wikiNode = getNodeByRoute(`/wiki/${params.item}`);
	}

	if (!wikiNode || wikiNode.type !== 'wiki') {
		// final fallback by slug (then we still validate domain membership below)
		wikiNode = nodes.find((n) => n.type === 'wiki' && n.slug === params.item);
	}

	if (!wikiNode) {
		error(404, 'Wiki page not found');
	}

	// Ensure this wiki item actually belongs to the requested domain (via meta or edges)
	const primaryDomain = wikiNode.meta?.domain;
	const viaEdges = getDomainsForNode(wikiNode.id).some((d) => d.slug === params.domain);
	const belongsHere = primaryDomain === params.domain || viaEdges;

	if (!belongsHere) {
		error(404, 'Wiki page not found under this domain');
	}

	// Collect graph relations (exclude domain assignments)
	const relatedMap = new Map<string, WikiGraphNode>();
	const referencedByMap = new Map<string, WikiGraphNode>();

	for (const edge of getOutgoing(wikiNode.id)) {
		if (edge.meta?.semantic === 'domain_assignment') continue;
		const target = nodeById.get(edge.to);
		if (target && target.type !== 'domain') {
			relatedMap.set(target.id, target);
		}
	}

	for (const edge of getIncoming(wikiNode.id)) {
		if (edge.meta?.semantic === 'domain_assignment') continue;
		const source = nodeById.get(edge.from);
		if (source && source.type !== 'domain') {
			referencedByMap.set(source.id, source);
		}
	}

	return {
		domain: {
			id: domain.id,
			title: domain.title,
			slug: domain.slug
		},
		node: wikiNode,
		related: Array.from(relatedMap.values()),
		referencedBy: Array.from(referencedByMap.values())
	};
};
