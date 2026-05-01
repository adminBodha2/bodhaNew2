import type { PageLoad } from './$types';
import { fullBlog } from '$lib/utils/localpulls';

export const load: PageLoad = async () => {
	const posts = await fullBlog();

	return {
		posts
	};
};