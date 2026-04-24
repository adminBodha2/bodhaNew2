import { chapterItinerary, chapterTemples } from '$lib/utils/supabaseClient';

export async function load({ params }: { params: { chapter: string } }) {
	const post = await import(`../${params.chapter}.md`);
	const {
		title,
		description,
		image,
		id,
		isOpen,
		dates,
		price,
		duration,
		temples,
		slug,
		registerLink,
		brochureLink,
		quote
	} = post.metadata;
	const content = post.default;

	const [itins, templeList] = await Promise.all([
		chapterItinerary(slug),
		chapterTemples(slug)
	]);

	return {
		content,
		title,
		description,
		image,
		id,
		isOpen,
		dates,
		price,
		duration,
		temples,
		slug,
		registerLink,
		brochureLink,
		quote,
		itins,
		templesList: templeList
	};
}
