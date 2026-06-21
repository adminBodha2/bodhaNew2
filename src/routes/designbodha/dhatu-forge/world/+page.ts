import type { PageLoad } from './$types';
import config from '$lib/serving/forge-config.json';
import worldConfig from '$lib/serving/world-config.json';
import type { ForgeConfig } from '$lib/utils/dhatu-forge';
import type { WorldConfig } from '$lib/utils/dhatu-forge-world';

export interface PageData {
	forgeConfig: ForgeConfig;
	worldConfig: WorldConfig;
}

export const load = ((): PageData => ({
	forgeConfig: config,
	worldConfig,
})) satisfies PageLoad;
