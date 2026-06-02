import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDhatu, toPositiveNumber } from '$lib/synaptic';
import { filterDhatuWords, getDhatuWordGroups, paginateWords } from '$lib/synaptic/dictionary';

export const load: PageServerLoad = ({ params, url }) => {
	const dhatu = getDhatu(params.dhatu);

	if (!dhatu) {
		error(404, 'Dhātu not found');
	}

	const query = url.searchParams.get('q') ?? '';
	const page = toPositiveNumber(url.searchParams.get('page')) ?? 1;
	const filtered = filterDhatuWords(dhatu.slug, query);

	return {
		dhatu,
		query,
		slice: paginateWords(filtered, page),
		wordGroups: getDhatuWordGroups(dhatu.slug, dhatu.rootIast, Number.POSITIVE_INFINITY, filtered)
	};
};
