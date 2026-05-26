import { pramanaCards } from '$lib/utils/localpulls';

export async function load() {
	const allcards = await pramanaCards();
	return {
		allcards
	};
}
