import { categoryPosts } from '$lib/utils/blogpulls';

export async function load({ params }: { params: { post: string } }) {
	const post = await import(`../${params.post}.md`);
	const { title, author, tags, date, image, excerpt, words, category } = post.metadata;
	const content = post.default;
	const posts = category ? await categoryPosts(category) : [];

	return {
		content,
		title,
		author,
		tags,
		date,
		image,
		excerpt,
		words,
		category,
		posts
	};
}
