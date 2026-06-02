import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAshtadhyayiRule, getRuleNeighbors } from '$lib/synaptic';

export const load: PageLoad = ({ params }) => {
	const rule = getAshtadhyayiRule(params.sutra);

	if (!rule) {
		error(404, 'Aṣṭādhyāyī rule not found');
	}

	return {
		rule,
		neighbors: getRuleNeighbors(rule.id)
	};
};
