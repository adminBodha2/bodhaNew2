export async function load({ params }: { params: { item: string } }) {
  const post = await import(`../${params.item}.md`)
  const { title, description } = post.metadata
  const content = post.default

  return {
    content,
    title,
	description
  }
}