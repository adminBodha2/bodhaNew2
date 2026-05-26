import { pramanaCards}  from '$lib/utils/localpulls'

export async function load({ params }: { params: { card: string } }) {
	const post = await import(`../${params.card}.md`);
	const { id, slug, title, sanskrit, register, applicability, cross_refs, gist } = post.metadata;
	const content = post.default;
	const allcards = await pramanaCards();
	return {
		content,
		title,
		id,
		slug,
		sanskrit,
		register,
		applicability,
		cross_refs,
		gist,
		allcards
	};
}
