import { error } from '@sveltejs/kit';
import templesJson from '$lib/serving/db-temples.json';
import type { PageLoad } from './$types';

export interface TempleRecord {
	name: string;
	slug: string;
	state: string;
	info?: Record<string, string> | null;
	story?: Record<string, string> | null;
	visiting_guide?: Record<string, string> | null;
	architecture?: Record<string, string> | null;
	mention_in_scripture?: Record<string, string> | null;
	[key: string]: unknown;
}

const temples = templesJson as unknown as TempleRecord[];

export const load: PageLoad = ({ params }) => {
	const temple = temples.find((item) => item.slug === params.temple);

	if (!temple) {
		error(404, 'Temple not found');
	}

	return {
		temple
	};
};
