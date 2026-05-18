import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();

	if (!session || !user) {
		throw redirect(303, '/members');
	}

	return { user };
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();

		if (error) {
			return fail(400, { logoutError: error.message });
		}

		throw redirect(303, '/members?message=signed-out');
	}
};
