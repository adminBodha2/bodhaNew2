export async function load({ params }: { params: { item: string } }) {
	const post = await import(`../${params.item}.md`);
	const { title } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		item: params.item
	};
}
