import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import pathsData from '$lib/data/paths.json';
import { nodeById, getOutgoing, edgesTo } from '$lib/graph';
import { groupByType } from '$lib/graph/group';
import type { Node } from '$lib/types/graph';

export const load: PageLoad = ({ params }) => {
	const path = (pathsData as any[]).find(p => p.id === params.id);

	if (!path) throw error(404, { message: `Path "${params.id}" not found` });

	const steps = path.steps.map((step: { nodeId: string; note: string }) => {
		const node = nodeById.get(step.nodeId) as Node | undefined;
		return { node, note: step.note, nodeId: step.nodeId };
	});

	// --- Related knowledge ---
	// Collect all step node IDs to exclude them from related
	const stepNodeIds = new Set(path.steps.map((s: any) => s.nodeId));

	// Collect concepts (HAS_TAG) from each step node
	const conceptIds = new Set<string>();
	for (const step of steps) {
		if (!step.node) continue;
		const outgoing = getOutgoing(step.node.id);
		for (const edge of outgoing) {
			if (edge.type === 'HAS_TAG') conceptIds.add(edge.to);
		}
	}

	// Collect concept nodes themselves
	const conceptNodes: Node[] = [];
	for (const cid of conceptIds) {
		const n = nodeById.get(cid);
		if (n) conceptNodes.push(n);
	}

	// Collect all nodes linked to those concepts
	const relatedMap = new Map<string, Node>();
	for (const cid of conceptIds) {
		const incoming = edgesTo.get(cid) || [];
		for (const edge of incoming) {
			if (stepNodeIds.has(edge.from)) continue;
			const n = nodeById.get(edge.from);
			if (!n || n.type === 'concept' || n.type === 'question') continue;
			relatedMap.set(n.id, n);
		}
	}

	const relatedGrouped = groupByType(Array.from(relatedMap.values()));

	return { path, steps, conceptNodes, relatedGrouped };
};
