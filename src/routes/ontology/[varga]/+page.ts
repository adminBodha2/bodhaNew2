import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getOntologyIndex, getOntologyVarga } from '$lib/ontology';

export const load: PageLoad = ({ params }) => {
	const ontology = getOntologyVarga(params.varga);

	if (!ontology) {
		throw error(404, 'Ontology varga not found');
	}

	return {
		ontology,
		allVargas: getOntologyIndex().map((item) => ({
			id: item.varga.id,
			title: item.varga.title,
			slug: item.varga.slug,
			count: item.content.length
		}))
	};
};
