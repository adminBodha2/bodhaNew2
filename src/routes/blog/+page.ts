import type { PageLoad } from './$types';
import { fullBlog, tagsWithCounts, writersWithCountsAlphabetical } from '$lib/utils/blogpulls';
import { sortedExternalPosts } from '$lib/serving/externalPosts';

export const load: PageLoad = async () => {
	const posts = await fullBlog();
	const tags = await tagsWithCounts();
	const writers = await writersWithCountsAlphabetical();
	const externalPosts = sortedExternalPosts();
	const categoryCounts = posts.reduce((counts, post) => {
		const category = post.meta.category;
		const categories = Array.isArray(category) ? category : category ? [category] : [];

		for (const item of categories) {
			const key = String(item).trim();
			if (!key) continue;
			counts.set(key, (counts.get(key) ?? 0) + 1);
		}

		return counts;
	}, new Map<string, number>());
	const categories = [...categoryCounts.entries()].map(([category, count]) => ({ category, count }));

	return {
		posts,
		categories,
		externalPosts,
		tags,
		writers
	};
};
