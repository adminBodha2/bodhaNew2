import { tagsWithCounts, tagsWithCountsAlphabetical } from '$lib/utils/localpulls';

export async function load() {
	const [tags, tagsC] = await Promise.all([
		tagsWithCountsAlphabetical(),
		tagsWithCounts()
	]);

	return {
		tags,
		tagsC
	};
}
