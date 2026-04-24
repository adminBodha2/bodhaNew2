import { selectedTag } from '$lib/utils/localpulls';

export async function load({ params }: { params: { tag: string } }) {
	const route = params.tag;
	const posts = await selectedTag(route);

	return {
		route,
		posts
	};
}
