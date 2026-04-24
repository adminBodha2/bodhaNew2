import type { PageLoad } from './$types';
import pathsData from '$lib/data/paths.json';

export const load: PageLoad = () => {
	return { paths: pathsData as any[] };
};
