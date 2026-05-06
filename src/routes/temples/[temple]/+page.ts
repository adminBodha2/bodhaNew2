import { error } from '@sveltejs/kit';
import templesJson from '$lib/serving/db-hindu-temples.json';
import type { PageLoad } from './$types';

export interface TempleRecord {
	name: string;
	slug: string;
	state: string;
	image?: string | null;
	latitude?: number | null;
	longitude?: number | null;
	isanveshi?: boolean | null;
	anveshichapter?: string | null;
	'anveshi-description'?: string | null;
	anveshidescription?: string | null;
	info?: {
		location?: string | null;
		'main-deity'?: string | null;
		maindeity?: string | null;
		'other-deities'?: { deity?: string | null }[] | null;
		highlights?: { highlight?: string | null }[] | null;
	} | null;
	story?: {
		details?: string | null;
		'scriptural-references'?: { reference?: string | null }[] | null;
		'scriptural-facts'?: { fact?: string | null; detail?: string | null }[] | string[] | null;
	} | null;
	'visiting-guide'?: {
		'getting-there'?: string | null;
		'things-to-do'?: string | null;
		tips?: string | null;
	} | null;
	architecture?: {
		details?: string | null;
		'key-features'?: { feature?: string | null }[] | null;
	} | null;
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
