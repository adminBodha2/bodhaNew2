import type { PageLoad } from './$types';
import issues from '$lib/data/arch-journal.json';
import { allArch } from '$lib/utils/localpulls'

export const load: PageLoad = async () => {
	const groups = await allArch();

	return {
		issues,
		groups
	};
};