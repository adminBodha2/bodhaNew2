export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, type, id, description, tags } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		type,
		image,
		id,
		description,
		tags
	};
}
