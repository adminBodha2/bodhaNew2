import type { PageLoad } from './$types';
import { getOntologyIndex } from '$lib/ontology';

export const load: PageLoad = () => {
	return {
		ontology: getOntologyIndex()
	};
};
