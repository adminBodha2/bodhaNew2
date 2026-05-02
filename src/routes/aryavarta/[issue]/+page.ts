export async function load({ params } : { params: { issue: string } }) {
	const post = await import (`../${params.issue}.md`);
	const { title, volume, issue, description, id, image, date, pdflink } = post.metadata;
	const content = post.default;
	return {
		content,
		title,
		volume,
		issue,
		description,
		id,
		image,
		date,
		pdflink
	}
}