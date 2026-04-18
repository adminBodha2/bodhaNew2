import wikiData from './wiki-main.json';

type WikiItem = {
	filename: string;
	title: string;
	type: string;
	tags: string[];
	image: string;
	description: string;
	route: string;
	featured: boolean;
};

const wiki = wikiData as WikiItem[];

export function servingExternal() {
	return wiki.filter((item) => item.type === 'external-article');
}
