import { allQuestions } from '$lib/utils/localpulls';
import { getNodeByRoute, getConceptsForNode } from '$lib/graph';

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, icon, id, description, tags } = post.metadata;
	const content = post.default;
	const questions = await allQuestions();
	const graphRoute = `/big-questions/${params.item}`;
	const graphNode = getNodeByRoute(graphRoute);
	const concepts = graphNode
		? getConceptsForNode(graphNode.id)
  		: [];

	return {
		content,
		title,
		image,
		icon,
		id,
		description,
		tags,
		questions,
		concepts
	};
}
