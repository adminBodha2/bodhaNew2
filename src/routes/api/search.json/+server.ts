import { json } from '@sveltejs/kit';
import { fullBlog } from '$lib/utils/blogpulls';
import wikiData from '$lib/serving/wiki-main.json';
import libraryItemsData from '$lib/serving/library-items.json';

export const prerender = true;

type Metadata = Record<string, unknown>;

type SearchItem = {
	title: string;
	author: string | string[];
	type: string;
	tags: string[];
	linkpath: string;
	description: string;
};

type WikiItem = {
	title?: string;
	type?: string;
	tags?: string[];
	route?: string;
	description?: string;
};

type LibraryItem = {
	name?: string;
	author?: string;
	tags?: string[];
	linkcloud?: string;
	summary?: string;
};

function routePath(path: string) {
	return path.slice('/src/routes'.length, -'.md'.length);
}

function stringValue(value: unknown) {
	return typeof value === 'string' ? value : '';
}

function stringArray(value: unknown) {
	if (Array.isArray(value)) return value.map(String);
	if (typeof value === 'string' && value) return [value];
	return [];
}

function authorValue(value: unknown) {
	if (Array.isArray(value)) return value.map(String);
	if (typeof value === 'string') return value;
	return '';
}

async function entriesFromGlob(files: Record<string, () => Promise<unknown>>) {
	return Promise.all(
		Object.entries(files).map(async ([path, resolver]) => {
			const mod = (await resolver()) as { metadata?: Metadata };
			return {
				meta: mod.metadata ?? {},
				linkpath: routePath(path)
			};
		})
	);
}

export const GET = async () => {
	const [blogPosts, questions, research, inspiration, lab] = await Promise.all([
		fullBlog(),
		entriesFromGlob(import.meta.glob('/src/routes/big-questions/*.md')),
		entriesFromGlob(import.meta.glob('/src/routes/research/*.md')),
		entriesFromGlob(import.meta.glob('/src/routes/inspiration/*.md')),
		entriesFromGlob(import.meta.glob('/src/routes/lab/*.md'))
	]);

	const blogItems: SearchItem[] = blogPosts.map((post) => ({
		title: stringValue(post.meta.title),
		author: authorValue(post.meta.author),
		type: 'blog',
		tags: stringArray(post.meta.tags),
		linkpath: post.linkpath,
		description: stringValue(post.meta.excerpt)
	}));

	const questionItems: SearchItem[] = questions.map(({ meta, linkpath }) => ({
		title: stringValue(meta.title),
		author: '',
		type: 'question',
		tags: stringArray(meta.tags),
		linkpath,
		description: stringValue(meta.description)
	}));

	const researchItems: SearchItem[] = research.map(({ meta, linkpath }) => ({
		title: stringValue(meta.title),
		author: '',
		type: 'project',
		tags: stringArray(meta.tags),
		linkpath,
		description: stringValue(meta.description)
	}));

	const inspirationItems: SearchItem[] = inspiration.map(({ meta, linkpath }) => ({
		title: stringValue(meta.title),
		author: '',
		type: stringValue(meta.type),
		tags: stringArray(meta.tags),
		linkpath,
		description: stringValue(meta.description)
	}));

	const labItems: SearchItem[] = lab.map(({ meta, linkpath }) => ({
		title: stringValue(meta.title),
		author: '',
		type: 'lab',
		tags: [],
		linkpath,
		description: stringValue(meta.excerpt)
	}));

	const externalItems: SearchItem[] = (wikiData as WikiItem[])
		.filter((item) => item.type === 'external-article')
		.map((item) => ({
			title: stringValue(item.title),
			author: '',
			type: 'external-article',
			tags: stringArray(item.tags),
			linkpath: stringValue(item.route),
			description: stringValue(item.description)
		}));

	const libraryItems: SearchItem[] = (libraryItemsData as LibraryItem[]).map((item) => ({
		title: stringValue(item.name),
		author: authorValue(item.author),
		type: 'book',
		tags: stringArray(item.tags),
		linkpath: stringValue(item.linkcloud),
		description: stringValue(item.summary)
	}));

	return json([
		...blogItems,
		...questionItems,
		...researchItems,
		...inspirationItems,
		...labItems,
		...externalItems,
		...libraryItems
	]);
};
