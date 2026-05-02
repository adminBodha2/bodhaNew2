import { limitBlog } from '$lib/utils/blogpulls';
import { sixVideos, latest } from '$lib/utils/supabaseClient';

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
	};
}
