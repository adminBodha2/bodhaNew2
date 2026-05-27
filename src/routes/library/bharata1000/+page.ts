import { bharata1000, pathBooks } from '$lib/utils/supabaseClient';
import { reading1000 } from '$lib/utils/localpulls';
import { bharata1000sections } from '$lib/utils/localsends'

export async function load() {
	const rows = await bharata1000();
	const rawPaths = await reading1000();
	const paths = await Promise.all(
		rawPaths.map(async (p) => {
			const slug = p.meta?.slug as string | undefined;
			const books = slug ? await pathBooks(slug) : [];
			return {
				...p,
				books: books ?? []
			};
		})
	);

	return {
		rows,
		paths,
		bharata1000sections
	};
}
