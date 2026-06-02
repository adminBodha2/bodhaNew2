import type { PageLoad } from './$types';
import { filterDhatus, getGanas, paginate, toPositiveNumber } from '$lib/synaptic';

export const load: PageLoad = ({ url }) => {
	const query = url.searchParams.get('q') ?? '';
	const gana = toPositiveNumber(url.searchParams.get('gana'));
	const page = toPositiveNumber(url.searchParams.get('page')) ?? 1;
	const filtered = filterDhatus(query, gana);

	return {
		query,
		gana,
		ganas: getGanas(),
		slice: paginate(filtered, page)
	};
};
