import { limitBlog } from '$lib/utils/blogpulls';
import { sixVideos, latest } from '$lib/utils/supabaseClient';
import { wikiOpeners } from '$lib/utils/localsends'

export async function load() {
	const [blogs, vids, latestItems ] = await Promise.all([
		limitBlog(),
		sixVideos(),
		latest()
	]);
	return {
		blogs,
		vids,
		latestItems,
		wikiOpeners
	};
}
