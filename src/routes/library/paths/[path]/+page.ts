import pathItems from '$lib/serving/path-books-map.json'

export async function load({ params }: { params: { path: string } }) {
	const post = await import(`../${params.path}.md`)
	const { title, description } = post.metadata
	const content = post.default
	const books = pathItems.filter((item) => item.group === params.path);

	return {
		content,
		title,
		description,
		books
	}
}