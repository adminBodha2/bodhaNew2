import { error } from '@sveltejs/kit';
import { libCategories } from '$lib/utils/localsends';
import libraryItems from '$lib/serving/library-items.json';

export async function load({ params }: { params: { category: string } }) {
	const category = libCategories.find((c) => c.href.endsWith(`/${params.category}`));

	if (!category) {
		throw error(404, 'Category not found');
	}

	const books = libraryItems.filter((item) => item.type === category.forLink);

	return {
		category,
		books
	};
}
