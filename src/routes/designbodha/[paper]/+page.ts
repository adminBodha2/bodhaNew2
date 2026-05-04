export async function load({ params }: { params: { paper: string } }) {
	const post = await import(`../${params.paper}.md`);
	const { title, image, description, id } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		image,
		description,
		id
	};
}
