import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import gameStructure from '$lib/serving/dhatu-structure.json';
import config from '$lib/serving/forge-config.json';

interface DhatuDef {
	id: string;
	root: string;
	meaning: string;
	level: number;
}

export interface PageData {
	title: string;
	subtitle: string;
	level: (typeof gameStructure.levels)[number];
	dhatuDefinitions: DhatuDef[];
	allPrefixes: Array<{ id: string; label: string; display: string }>;
	excerpt: { session: number; excerpts: string[] } | undefined;
}

export const load = (({ params }) => {
	const sessionId = parseInt(params.session, 10);
	const level = gameStructure.levels.find((l) => l.id === sessionId);

	if (!level) {
		error(404, 'Session not found');
	}

	const dhatuDefinitions = config.dhatus.filter((d) =>
		level.unlockedDhatuIds.includes(d.id)
	);

	const excerpt = gameStructure.sessionExcerpts.find(
		(e) => e.session === sessionId
	);

	return {
		title: gameStructure.title,
		subtitle: gameStructure.subtitle,
		level,
		dhatuDefinitions,
		allPrefixes: config.prefixes,
		excerpt,
	};
}) satisfies PageLoad;
