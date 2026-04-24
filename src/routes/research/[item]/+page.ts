import { allResearch } from "$lib/utils/localpulls";

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, type, description, tags } = post.metadata;
	const content = post.default;
	const research = await allResearch();

	return {
		content,
		title,
		type,
		image,
		description,
		tags,
		research
	};
}
