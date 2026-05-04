import templesJson from '$lib/serving/db-temples.json';
import type { PageLoad } from './$types';

export interface TempleListItem {
	name: string;
	slug: string;
	state: string;
	architecture?: {
		overview?: string;
	};
	info?: {
		overview?: string;
	}
}

const temples = templesJson as unknown as TempleListItem[];

export const load: PageLoad = () => {
	const sortedTemples = temples
		.map((temple) => ({
			name: temple.name,
			slug: temple.slug,
			state: temple.state,
			infoview: temple.info?.overview ?? '',
			overview: temple.architecture?.overview ?? ''
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
	const states = [...new Set(temples.map((item) => item.state).filter(Boolean))].sort((a, b) =>
		a.localeCompare(b)
	);

	return {
		states,
		temples: sortedTemples
	};
};
