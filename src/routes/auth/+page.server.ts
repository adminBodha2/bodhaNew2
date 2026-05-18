import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const target = new URL('/members', url.origin);

	for (const [key, value] of url.searchParams) {
		target.searchParams.set(key, value);
	}

	throw redirect(303, target);
};
