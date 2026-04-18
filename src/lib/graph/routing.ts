import type { Node } from '$lib/types/graph';

/**
 * Returns the canonical content URL for a node.
 * Falls back to the graph node page if no content route is available.
 */
export function getContentHref(node: Node): string {
	const route = node.meta?.route;
	if (!route) return `/node/${node.id}`;
	if (route.startsWith('http')) return route;
	return `${route}/${node.slug}`;
}
