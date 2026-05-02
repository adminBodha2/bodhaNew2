export async function load({ params }: { params: { issue: string } }) {
	const post = await import(`../${params.issue}.md`);
	const { title, date, id, pdflink, image } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		id,
		date,
		pdflink,
		image
	};
}
