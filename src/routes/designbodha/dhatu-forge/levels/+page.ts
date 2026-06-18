import type { PageLoad } from './$types';
import gameStructure from '$lib/serving/dhatu-structure.json';

export interface PageData {
	title: string;
	subtitle: string;
	levels: typeof gameStructure.levels;
	excerpts: typeof gameStructure.sessionExcerpts;
}

export const load = ((): PageData => {
	return {
		title: gameStructure.title,
		subtitle: gameStructure.subtitle,
		levels: gameStructure.levels,
		excerpts: gameStructure.sessionExcerpts,
	};
}) satisfies PageLoad;
