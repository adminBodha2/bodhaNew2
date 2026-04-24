import { allQuestions } from '$lib/utils/localpulls';

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, icon, id, description, tags } = post.metadata;
	const content = post.default;
	const questions = await allQuestions();

	return {
		content,
		title,
		image,
		icon,
		id,
		description,
		tags,
		questions
	};
}
