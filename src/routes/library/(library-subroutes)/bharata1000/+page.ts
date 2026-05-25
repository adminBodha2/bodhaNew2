import { bharata1000 } from '$lib/utils/supabaseClient';

export async function load() {
	const rows = await bharata1000();

	return {
		rows
	};
}
