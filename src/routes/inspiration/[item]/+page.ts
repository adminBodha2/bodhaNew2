import { allSchools, allThinkers } from '$lib/utils/localpulls';

export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, type, id, description, tags } = post.metadata;
	const content = post.default;
	const schools = await allSchools();
	const thinkers = await allThinkers();
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
