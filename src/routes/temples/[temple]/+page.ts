import { error } from '@sveltejs/kit';
import templesJson from '$lib/serving/db-hindu-temples.json';
import type { PageLoad } from './$types';

export interface TempleRecord {
	temple_name: string;
	slug: string;
	description?: string | null;
	main_deity?: string | null;
	category?: string | null;
	temple_type?: string | null;
	shiva_temple?: boolean | null;
	vishnu_temple?: boolean | null;
	devi_temple?: boolean | null;
	ganesha_temple?: boolean | null;
	saptapuri?: boolean | null;
	char_dham?: boolean | null;
	is_architectural_heritage?: boolean | null;
	anveshi_image?: string | null;
	latitude: number;
	longitude: number;
	state?: string | null;
	image?: string | null;
	is_anveshi?: boolean | null;
	chapter?: string | null;
	other_deities?: { deity?: string | null; details?: string | null }[] | null;
	other_details?: { details?: string | null }[] | null;
	scriptural?: { details?: string | null; reference?: string | null; fact?: string | null }[] | null;
	architecture?: string | null;
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
