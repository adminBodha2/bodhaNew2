import paths from '$lib/data/paths.json';
import nodes from '$lib/data/nodes.json';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const pathId = params.path;

	const pathData = paths.find((p) => p.id === pathId);
	if (!pathData) {
		throw error(404, 'Path not found');
	}

	// Build a quick lookup map for nodes (faster than repeated find)
	const nodeMap = new Map(nodes.map((n) => [n.id, n]));

	// Attach full node data to each step
	const stepsWithNodes = pathData.steps.map((step) => {
		const node = nodeMap.get(step.nodeId);

		return {
			...step,
			node // may be undefined if missing
		};
	});

	return {
		path: {
			...pathData,
			steps: stepsWithNodes
		}
	};
}