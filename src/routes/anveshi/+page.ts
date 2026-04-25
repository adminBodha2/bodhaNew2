import {
	anveshiCurrent,
	anveshiFuture,
	anveshiPast,
	anveshiTestimonials
} from '$lib/utils/supabaseClient';

export async function load() {
	const [currproj, futureproj, pastproj, testis] = await Promise.all([
		anveshiCurrent(),
		anveshiFuture(),
		anveshiPast(),
		anveshiTestimonials()
	]);

	return {
		currproj,
		futureproj,
		pastproj,
		testis
	};
}
