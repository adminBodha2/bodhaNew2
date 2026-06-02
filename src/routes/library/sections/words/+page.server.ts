import type { PageServerLoad } from './$types';
import {
	filterWords,
	formatWordIndexItems,
	paginateWords,
	type DictionaryId
} from '$lib/synaptic/dictionary';
import { toPositiveNumber } from '$lib/synaptic';

function dictionaryParam(value: string | null): DictionaryId | null {
	return value === 'apte' || value === 'mw' ? value : null;
}

export const load: PageServerLoad = ({ url }) => {
	const query = url.searchParams.get('q') ?? '';
	const dictionary = dictionaryParam(url.searchParams.get('dictionary'));
	const page = toPositiveNumber(url.searchParams.get('page')) ?? 1;
	const filtered = filterWords(query, dictionary);
	const slice = paginateWords(filtered, page);

	return {
		query,
		dictionary,
		slice: {
			...slice,
			items: formatWordIndexItems(slice.items)
		}
	};
};
