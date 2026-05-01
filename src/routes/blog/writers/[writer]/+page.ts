import { selectedWriter } from '$lib/utils/blogpulls';

export async function load({ params }: { params: { writer: string } }) {
	const writerName = decodeURIComponent(params.writer);
	const posts = await selectedWriter(writerName, 50);

	return {
		writerName,
		posts
	};
}
