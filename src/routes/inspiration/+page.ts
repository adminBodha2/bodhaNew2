import { allSchools, allThinkers } from '$lib/utils/localpulls';

export async function load() {
	const [schools, thinkers] = await Promise.all([
		allSchools(),
		allThinkers()
	]);

	return {
		schools,
		thinkers
	};
}
