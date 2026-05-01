import { allWriters } from '$lib/utils/localsends';

export async function load() {
	const writers = allWriters
	return {
		writers
	};
}
