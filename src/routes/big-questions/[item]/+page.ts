import { allQuestions } from '$lib/utils/localpulls';
import researchPaths from '$lib/serving/research-paths.json';
import projectsQuestions from '$lib/serving/projects-questions.json';
import { getNode, getNodeByRoute, nodeHref } from '$lib/wiki-graph';

const uniqueTags = (tags: string[] = []) => [...new Set(tags.filter((tag) => tag.length > 0))];

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, icon, id, description, tags } = post.metadata;
	const content = post.default;
	const questions = await allQuestions();
	const graphRoute = `/big-questions/${params.item}`;
	const graphNode = getNodeByRoute(graphRoute);
	const researchPath = researchPaths.find((path) => {
		return path.id === params.item || path.questionNodeId === graphNode?.id;
	});
	const linkedNodes = researchPath?.steps
		.map((step) => {
			const node = getNode(step.nodeId);

			if (!node) return null;

			return {
				nodeId: step.nodeId,
				note: step.note,
				href: nodeHref(node),
				isExternal: nodeHref(node).startsWith('http'),
				node: {
					...node,
					tags: uniqueTags(node.tags)
				}
			};
		})
		.filter((step) => step !== null) ?? [];

	const matrixItems = (projectsQuestions as any[]).filter(
		(entry) => entry[params.item] === true
	);

	return {
		content,
		title,
		image,
		icon,
		id,
		item: params.item,
		description,
		tags: uniqueTags(tags),
		questions,
		researchPath,
		linkedNodes,
		matrixItems
	};
}
