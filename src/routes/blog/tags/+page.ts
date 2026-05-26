import { tagsWithCounts, tagsWithCountsAlphabetical } from '$lib/utils/blogpulls';


export async function load() {
	const [tags, tagsC] = await Promise.all([
		tagsWithCountsAlphabetical(),
		tagsWithCounts()
	]);

	return {
		tags,
		tagsC,
	};
}
