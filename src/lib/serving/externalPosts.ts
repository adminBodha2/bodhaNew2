import externalPostsData from './external-posts.json';

export type ExternalPost = {
	filename: string;
	title: string;
	date: string;
	tags: string[];
	image: string;
	description: string;
	route: string;
	platform: string;
};

function dateValue(date: string) {
	const [day, month, year] = date.split('/').map(Number);
	return new Date(year, month - 1, day).getTime();
}

export function sortedExternalPosts() {
	return [...(externalPostsData as ExternalPost[])].sort((a, b) => dateValue(b.date) - dateValue(a.date));
}
