import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getDomainBySlug, getDomainConnectedNodes, getDomainSections, getDomains } from '$lib/wiki-graph';

export const load: PageLoad = ({ params }) => {
	const domain = getDomainBySlug(params.domain);

	if (!domain) {
		error(404, 'Wiki domain not found');
	}

	return {
		domain: {
			id: domain.id,
			title: domain.title,
			slug: domain.slug,
			description: domain.description ?? '',
			tags: domain.tags ?? [],
			color: domain.meta?.color ?? '#d3633a'
		},
		sections: getDomainSections(domain.id),
		domains: getDomains().map((item) => ({
			title: item.title,
			slug: item.slug,
			active: item.slug === domain.slug
		})),
		totalConnected: getDomainConnectedNodes(domain.id).length
	};
};
