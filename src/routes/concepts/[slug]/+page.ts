import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDomainBySlug, getDomainConnectedNodes, getDomainSections } from '$lib/wiki-graph';

export const load: PageLoad = ({ params }) => {
	const domain = getDomainBySlug(params.slug);

	if (!domain) {
		throw error(404, 'Concept not found');
	}

	const connectedNodes = getDomainConnectedNodes(domain.id);
	const sections = getDomainSections(domain.id);

	return {
		concept: domain,
		conceptTree: [],
		grouped: {
			blogs: sections.find((section) => section.key === 'blog')?.items ?? [],
			books: sections.find((section) => section.key === 'book')?.items ?? [],
			questions: sections.find((section) => section.key === 'question')?.items ?? [],
			projects: sections.find((section) => section.key === 'project')?.items ?? [],
			thinkers: sections.find((section) => section.key === 'thinker')?.items ?? [],
			schools: sections.find((section) => section.key === 'school')?.items ?? [],
			labs: sections.find((section) => section.key === 'lab')?.items ?? [],
			externalArticles: sections.find((section) => section.key === 'external-article')?.items ?? []
		},
		relatedNodes: connectedNodes,
		count: connectedNodes.length
	};
};
