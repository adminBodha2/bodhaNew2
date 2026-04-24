import { fullLab } from '$lib/utils/localpulls';

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, category, excerpt, date } = post.metadata;
	const content = post.default;
	const labitems = await fullLab();

	return {
		content,
		title,
		date,
		excerpt,
		category,
		labitems
	};
}
