export async function load({ params }: { params: { issue: string } }) {
	const post = await import(`../${params.issue}.md`);
	const { title, type, tags } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		type,
		tags
	};
}
