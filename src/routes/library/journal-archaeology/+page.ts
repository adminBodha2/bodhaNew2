import type { PageLoad } from './$types';
import issues from '$lib/data/arch-journal.json';

export const load: PageLoad = async () => {
	return {
		issues
	};
};