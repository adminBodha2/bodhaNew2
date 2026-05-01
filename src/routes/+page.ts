import { limitBlog } from '$lib/utils/blogpulls';
import { sixVideos } from '$lib/utils/supabaseClient';

export async function load() {
	const [blogs, vids] = await Promise.all([
		limitBlog(),
		sixVideos()
	]);

	return {
		blogs,
		vids
	};
}
