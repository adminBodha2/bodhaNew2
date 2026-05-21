import { allResearch } from "$lib/utils/localpulls";
import projectPaths from '$lib/serving/project-paths.json';
import { getNode, getNodeByRoute, nodeHref } from '$lib/wiki-graph';

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, type, description, tags } = post.metadata;
	const content = post.default;
	const research = await allResearch();
	const graphRoute = `/research/${params.item}`;
	const graphNode = getNodeByRoute(graphRoute);
	const projectPath = projectPaths.find((path) => {
		return path.id === params.item || path.projectNodeId === graphNode?.id;
	});
	const linkedNodes = projectPath?.steps
		.map((step) => {
			const node = getNode(step.nodeId);

			if (!node) return null;

			return {
				nodeId: step.nodeId,
				note: step.note,
				href: nodeHref(node),
				isExternal: nodeHref(node).startsWith('http'),
				node
			};
		})
		.filter((step) => step !== null) ?? [];

	return {
		content,
		title,
		type,
		image,
		description,
		tags,
		research,
		projectPath,
		linkedNodes
	};
}
