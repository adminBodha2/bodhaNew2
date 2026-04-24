import { writersWithCountsAlphabetical } from '$lib/utils/localpulls';

export async function load() {
	const writers = await writersWithCountsAlphabetical();

	return {
		writers
	};
}
