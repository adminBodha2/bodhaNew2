import { error } from '@sveltejs/kit';
import { selectedOpenLibrary } from '$lib/utils/supabaseClient';
import { libCategories } from '$lib/utils/localsends';

export async function load({ params }: { params: { category: string } }) {
	const category = libCategories.find((c) => c.href.endsWith(`/${params.category}`));

	if (!category) {
		throw error(404, 'Category not found');
	}

	const books = await selectedOpenLibrary(category.forLink);

	return {
		category,
		books
	};
}
