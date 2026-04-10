export async function load({ params }: { params: { post: string } }) {
  const post = await import(`../${params.post}.md`)
  const { title, author, tags, date, image, excerpt, words, category } = post.metadata
  const content = post.default

  return {
    content,
    title,
    author,
    tags,
    date,
    image,
    excerpt,
    words,
    category
  }
}