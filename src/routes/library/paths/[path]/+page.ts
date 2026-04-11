export async function load({ params }: { params: { path: string } }) {
	const post = await import(`../${params.path}.md`)
	const { title, description } = post.metadata
	const content = post.default

	return {
		content,
		title,
		description
	}
}