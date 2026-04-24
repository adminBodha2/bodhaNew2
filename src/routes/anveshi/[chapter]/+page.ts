export async function load({ params }: { params: { chapter: string } }) {
  const post = await import(`../${params.chapter}.md`)
  const { title, description, image, id, isOpen, dates, price, duration, temples, slug, registerLink, brochureLink, quote } = post.metadata
  const content = post.default

  return {
    content,
    title,
	description,
	image,
	id,
	isOpen,
	dates,
	price,
	duration,
	temples,
	slug,
	registerLink,
	brochureLink,
	quote
  }
}