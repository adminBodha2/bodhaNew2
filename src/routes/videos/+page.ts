import { allVideos } from '$lib/utils/supabaseClient';

export async function load() {
	const vids = await allVideos();

	return {
		vids
	};
}
