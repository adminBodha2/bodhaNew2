import { redirect } from '@sveltejs/kit';
import type { EmailOtpType } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';

function cleanNext(next: string | null) {
	return next && next.startsWith('/') && !next.startsWith('//') ? next : '/members';
}

export const GET: RequestHandler = async ({ locals, url }) => {
	const code = url.searchParams.get('code');
	const tokenHash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = cleanNext(url.searchParams.get('next'));

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			throw redirect(303, next);
		}
	}

	if (tokenHash && type) {
		const { error } = await locals.supabase.auth.verifyOtp({
			type,
			token_hash: tokenHash
		});

		if (!error) {
			throw redirect(303, next);
		}
	}

	throw redirect(303, '/members?error=Authentication%20callback%20failed');
};
