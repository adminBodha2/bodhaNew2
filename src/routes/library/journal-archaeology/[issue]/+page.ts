import { allArch } from "$lib/utils/localpulls";

export async function load({ params }: { params: { issue: string } }) {
	const post = await import(`../${params.issue}.md`);
	const { title, type, tags } = post.metadata;
	const content = post.default;
	const groups = await allArch();

	return {
		content,
		title,
		type,
		tags,
		groups
	};
}
