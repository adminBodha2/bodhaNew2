import { allArch } from "$lib/utils/localpulls";
import archParent from "$lib/data/arch-parent.json";

export async function load({ params }: { params: { issue: string } }) {
	const post = await import(`../${params.issue}.md`);
	const { title, type, tags, id } = post.metadata;
	const content = post.default;
	const groups = await allArch();
	const relatedArticles = archParent[id as keyof typeof archParent] ?? [];

	return {
		content,
		title,
		type,
		tags,
		id,
		groups,
		relatedArticles
	};
}
