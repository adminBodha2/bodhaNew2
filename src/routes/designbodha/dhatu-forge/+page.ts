import type { PageLoad } from './$types';
import config from '$lib/serving/forge-config.json';
import gameStructure from '$lib/serving/dhatu-structure.json';
import type { ForgeConfig } from '$lib/utils/dhatu-forge';

export interface PageData {
	forgeConfig: ForgeConfig;
	gameStructure: typeof gameStructure;
}

export const load = ((): PageData => ({
	forgeConfig: config,
	gameStructure,
})) satisfies PageLoad;
