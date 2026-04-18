import { getNodeBySlug, getOutgoing, edgesTo, nodeById } from '$lib/graph';
import { groupByType } from '$lib/graph/group';
import type { Node } from '$lib/types/graph';
import researchPathsData from '$lib/serving/research-paths.json';

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, icon, id, description, tags } = post.metadata;
	const content = post.default;

	// --- Graph: two-hop traversal ---
	// question → HAS_TAG → concepts → HAS_TAG ← articles/texts/thinkers
	const questionNode = getNodeBySlug(params.item);

	let concepts: Node[] = [];
	let relatedReading: ReturnType<typeof groupByType> | null = null;

	if (questionNode) {
		// Concepts this question tags
		const outgoing = getOutgoing(questionNode.id);
		const conceptIds = outgoing.filter(e => e.type === 'HAS_TAG').map(e => e.to);
		concepts = conceptIds.map(id => nodeById.get(id)).filter(Boolean) as Node[];

		// Count how many of this question's concepts each related node appears in
		// (higher = more central to this question)
		const scoreMap = new Map<string, number>();
		const relatedMap = new Map<string, Node>();

		for (const conceptId of conceptIds) {
			const incoming = edgesTo.get(conceptId) || [];
			for (const edge of incoming) {
				const n = nodeById.get(edge.from);
				if (!n || n.type === 'concept' || n.type === 'question') continue;
				relatedMap.set(n.id, n);
				scoreMap.set(n.id, (scoreMap.get(n.id) || 0) + 1);
			}
		}

		// Sort by score (most-connected first), take top 18
		const ranked = Array.from(relatedMap.values())
			.sort((a, b) => (scoreMap.get(b.id) || 0) - (scoreMap.get(a.id) || 0))
			.slice(0, 18);

		relatedReading = groupByType(ranked);
	}

	const researchPathRaw = (researchPathsData as any[]).find(p => p.id === params.item);
	const researchSteps = researchPathRaw
		? researchPathRaw.steps.map((step: { nodeId: string; note: string }) => ({
				node: nodeById.get(step.nodeId) as Node | undefined,
				note: step.note,
				nodeId: step.nodeId
		  }))
		: null;

	return {
		content,
		title,
		image,
		icon,
		id,
		description,
		tags,
		concepts,
		relatedReading,
		researchPath: researchPathRaw ?? null,
		researchSteps
	};
}
