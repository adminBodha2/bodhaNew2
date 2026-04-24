import { allSchools, allThinkers } from '$lib/utils/localpulls';

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, type, id, description, tags } = post.metadata;
	const content = post.default;

	const [schools, thinkers] = await Promise.all([
		allSchools(),
		allThinkers()
	]);

	return {
		content,
		title,
		type,
		image,
		id,
		description,
		tags,
		schools,
		thinkers
	};
}
