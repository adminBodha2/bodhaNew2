import type { PageLoad } from './$types';
import { filterRules, paginate, toPositiveNumber } from '$lib/synaptic';

export const load: PageLoad = ({ url }) => {
	const adhyaya = toPositiveNumber(url.searchParams.get('adhyaya'));
	const pada = toPositiveNumber(url.searchParams.get('pada'));
	const rawQuery = url.searchParams.get('q') ?? '';
	const query = rawQuery.trim().length >= 3 ? rawQuery : '';
	const page = toPositiveNumber(url.searchParams.get('page')) ?? 1;
	const filtered = filterRules(adhyaya, pada, query);

	return {
		adhyaya,
		pada,
		query,
		slice: paginate(filtered, page)
	};
};
