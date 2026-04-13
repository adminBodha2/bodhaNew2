export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title, image, type, description, tags } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		type,
		image,
		description,
		tags
	};
}
