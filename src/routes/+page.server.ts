import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const code = url.searchParams.get('code');

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			throw redirect(303, '/members?message=confirmed');
		}

		throw redirect(303, '/members?error=Authentication%20callback%20failed');
	}

	return {};
};
