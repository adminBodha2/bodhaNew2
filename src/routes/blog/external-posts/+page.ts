import type { PageLoad } from './$types';
import { sortedExternalPosts } from '$lib/serving/externalPosts';

export const load: PageLoad = async () => {
	const externalPosts = sortedExternalPosts();

	return {
		externalPosts
	};
};
