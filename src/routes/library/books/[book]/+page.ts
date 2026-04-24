import { error } from '@sveltejs/kit';
import libraryItems from '$lib/serving/library-items.json';
import { selectedOpenLibrary } from '$lib/utils/supabaseClient';

export async function load({ params }: { params: { book: string } }) {
	const book = libraryItems.find((item) => item.slug === params.book);

	if (!book) {
		throw error(404, 'Book not found');
	}

	const relatedBooks = await selectedOpenLibrary(book.type);

	return {
		...book,
		relatedBooks
	};
}
