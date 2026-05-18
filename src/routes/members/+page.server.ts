import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

function readCredentials(formData: FormData) {
	const email = String(formData.get('email') ?? '').trim();
	const password = String(formData.get('password') ?? '');

	if (!email || !password) {
		return null;
	}

	return { email, password };
}

function passwordsMatch(formData: FormData) {
	const password = String(formData.get('password') ?? '');
	const confirmPassword = String(formData.get('confirmPassword') ?? '');

	return Boolean(password) && password === confirmPassword;
}

function redirectPath(formData: FormData, fallback = '/members/signed-in') {
	const next = String(formData.get('next') ?? fallback);
	return next.startsWith('/') && !next.startsWith('//') ? next : fallback;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const { session, user } = await locals.safeGetSession();

	return {
		session,
		user,
		error: url.searchParams.get('error'),
		message: url.searchParams.get('message'),
		mode: url.searchParams.get('mode')
	};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const credentials = readCredentials(formData);

		if (!credentials) {
			return fail(400, { loginError: 'Enter both email and password.' });
		}

		const { error } = await locals.supabase.auth.signInWithPassword(credentials);

		if (error) {
			return fail(400, { loginError: error.message });
		}

		throw redirect(303, redirectPath(formData));
	},

	signup: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const credentials = readCredentials(formData);
		const next = redirectPath(formData);
		const emailRedirectTo = new URL('/members/callback', url.origin);
		emailRedirectTo.searchParams.set('next', next);

		if (!credentials) {
			return fail(400, { signupError: 'Enter both email and password.' });
		}

		if (!passwordsMatch(formData)) {
			return fail(400, { signupError: 'Passwords do not match.' });
		}

		const { error } = await locals.supabase.auth.signUp({
			...credentials,
			options: {
				emailRedirectTo: emailRedirectTo.toString()
			}
		});

		if (error) {
			return fail(400, { signupError: error.message });
		}

		return {
			signupMessage: 'Check your email to confirm the account, then return here to sign in.'
		};
	},

	google: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const next = redirectPath(formData);
		const redirectTo = new URL('/members/callback', url.origin);
		redirectTo.searchParams.set('next', next);

		const { data, error } = await locals.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: redirectTo.toString()
			}
		});

		if (error) {
			return fail(400, { oauthError: error.message });
		}

		if (!data.url) {
			return fail(400, { oauthError: 'Google did not return a login URL.' });
		}

		throw redirect(303, data.url);
	},

	requestPasswordReset: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = String(formData.get('resetEmail') ?? '').trim();
		const redirectTo = new URL('/members/callback', url.origin);
		redirectTo.searchParams.set('next', '/members?mode=reset');

		if (!email) {
			return fail(400, { resetError: 'Enter the email address for your account.' });
		}

		const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
			redirectTo: redirectTo.toString()
		});

		if (error) {
			return fail(400, { resetError: error.message });
		}

		return {
			resetMessage: 'If an account exists for that email, a password reset link has been sent.'
		};
	},

	updatePassword: async ({ request, locals }) => {
		const { session, user } = await locals.safeGetSession();
		const formData = await request.formData();
		const password = String(formData.get('password') ?? '');

		if (!session || !user) {
			return fail(401, { updatePasswordError: 'Open the password reset link again before setting a new password.' });
		}

		if (!password || password.length < 6) {
			return fail(400, { updatePasswordError: 'Password must be at least 6 characters.' });
		}

		if (!passwordsMatch(formData)) {
			return fail(400, { updatePasswordError: 'Passwords do not match.' });
		}

		const { error } = await locals.supabase.auth.updateUser({ password });

		if (error) {
			return fail(400, { updatePasswordError: error.message });
		}

		throw redirect(303, '/members?message=password-updated');
	},

	logout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();

		if (error) {
			return fail(400, { logoutError: error.message });
		}

		throw redirect(303, '/members?message=signed-out');
	}
};
