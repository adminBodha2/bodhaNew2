import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getWipeScene } from '../demoScenes';

export const load: PageLoad = ({ params }) => {
	const scene = getWipeScene(params.scene);

	if (!scene || !scene.slug) {
		error(404, 'Wipe scene not found');
	}

	return { scene };
};
