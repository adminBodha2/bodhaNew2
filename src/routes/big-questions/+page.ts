import { allQuestions } from '$lib/utils/localpulls';

export async function load() {
	const questions = await allQuestions();

	return {
		questions
	};
}
