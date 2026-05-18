import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const target = new URL('/members/callback', url.origin);

	for (const [key, value] of url.searchParams) {
		target.searchParams.set(key, value);
	}

	throw redirect(308, target);
};
