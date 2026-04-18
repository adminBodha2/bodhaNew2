import { error } from '@sveltejs/kit';
import libraryItems from '$lib/serving/library-items.json';

export function load({ params }: { params: { path: string } }) {
	const items = libraryItems.filter(item => item.topic === params.path);

	if (items.length === 0) {
		throw error(404, { message: `No library items found for topic "${params.path}"` });
	}

	const title = items[0].wikigroup;

	return { title, items };
}
