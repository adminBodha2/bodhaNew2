import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { formatDictionaryEntries, getDictionaryWord, hydrateWordDhatus } from '$lib/synaptic/dictionary';

export const load: PageServerLoad = ({ params }) => {
	const word = getDictionaryWord(params.word);

	if (!word) {
		error(404, 'Dictionary word not found');
	}

	return {
		word,
		entries: formatDictionaryEntries(word.entries),
		dhatuLinks: hydrateWordDhatus(word)
	};
};
