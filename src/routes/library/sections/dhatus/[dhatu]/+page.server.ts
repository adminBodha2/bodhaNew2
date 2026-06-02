import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAshtadhyayiRule, getDhatu, getDhatuNeighbors } from '$lib/synaptic';
import { getDhatuWordGroups, getDhatuWords } from '$lib/synaptic/dictionary';

export const load: PageServerLoad = ({ params }) => {
	const dhatu = getDhatu(params.dhatu);

	if (!dhatu) {
		error(404, 'Dhātu not found');
	}

	const relatedRules = dhatu.relatedSutras
		.map(getAshtadhyayiRule)
		.filter((rule): rule is NonNullable<typeof rule> => rule !== undefined);

	const derivedWords = getDhatuWords(dhatu.slug);

	return {
		dhatu,
		relatedRules,
		derivedWordCount: derivedWords.length,
		wordGroups: getDhatuWordGroups(dhatu.slug, dhatu.rootIast),
		neighbors: getDhatuNeighbors(dhatu.slug)
	};
};
