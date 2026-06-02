import dictionaryEntries from '$lib/serving/synaptic/dictionary-entries.json';
import dhatuWordLinks from '$lib/serving/synaptic/dhatu-word-links.json';
import wordIndex from '$lib/serving/synaptic/word-index.json';
import { getDhatu, type PageSlice, paginate } from '$lib/synaptic';

export type DictionaryId = 'apte' | 'mw';

export type DictionaryEntrySource = {
	dictionary: DictionaryId;
	dictionaryLabel: string;
	id: string;
	text: string;
	sourceUrl: string;
};

export type DictionaryEntryView = DictionaryEntrySource & {
	meaningLines: string[];
};

export type DhatuWordLink = {
	slug: string;
	headword: string;
	preview: string;
	dictionaries: DictionaryId[];
	basis: string;
};

export type DhatuWordView = DhatuWordLink & {
	meaning: string;
	meaningLines: string[];
};

export type DhatuWordGroup = {
	title: string;
	stem: string;
	words: DhatuWordView[];
};

export type WordDhatuLink = {
	dhatuSlug: string;
	rootIast: string;
	gana: number;
	basis: string;
};

export type DictionaryWord = {
	slug: string;
	headword: string;
	normalized: string;
	dictionaries: DictionaryId[];
	entries: DictionaryEntrySource[];
	dhatuLinks: WordDhatuLink[];
};

export type WordIndexItem = {
	slug: string;
	headword: string;
	normalized: string;
	dictionaries: DictionaryId[];
	preview: string;
	dhatuSlugs: string[];
};

export type WordIndexView = WordIndexItem & {
	previewLines: string[];
};

const words = dictionaryEntries as DictionaryWord[];
const index = wordIndex as WordIndexItem[];
const linksByDhatu = dhatuWordLinks as Record<string, DhatuWordLink[]>;
const wordsBySlug = new Map(words.flatMap((word) => [[word.slug, word], [word.normalized, word]]));

const IAST_SEARCH_GROUPS: Record<string, string> = {
	a: 'aā',
	i: 'iī',
	u: 'uū',
	r: 'rṛṝ',
	l: 'lḷḹ',
	n: 'nṇṅñṃṁ',
	m: 'mṃṁ',
	s: 'sśṣ',
	t: 'tṭ',
	d: 'dḍ',
	h: 'hḥ'
};

function escapeRegex(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function iastSearchRegex(query: string) {
	const normalizedQuery = query.trim().normalize('NFC').toLowerCase();
	if (!normalizedQuery) return null;

	let pattern = '';
	for (let index = 0; index < normalizedQuery.length; index += 1) {
		const character = normalizedQuery[index];
		if (normalizedQuery.slice(index, index + 2) === 'sh') {
			pattern += '(?:sh|ś|ṣ)';
			index += 1;
			continue;
		}

		const group = IAST_SEARCH_GROUPS[character];
		pattern += group ? `[${group}]` : escapeRegex(character);
	}

	return new RegExp(pattern, 'u');
}

function matchesWordSearch(word: WordIndexItem, query: string) {
	const regex = iastSearchRegex(query);
	if (!regex) return true;

	return [word.headword, word.normalized, word.preview]
		.join(' ')
		.normalize('NFC')
		.toLowerCase()
		.search(regex) !== -1;
}

function foldIast(value: string) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '');
}

function stemLabel(value: string) {
	return value || 'root';
}

function dhatuStems(rootIast: string) {
	const folded = foldIast(rootIast);
	const root = [folded];
	const guna = new Set<string>();
	const vrddhi = new Set<string>();

	if (folded.endsWith('u')) {
		const base = folded.slice(0, -1);
		guna.add(`${base}o`);
		guna.add(`${base}av`);
		vrddhi.add(`${base}au`);
		vrddhi.add(`${base}av`);
	} else if (folded.endsWith('i')) {
		const base = folded.slice(0, -1);
		guna.add(`${base}e`);
		guna.add(`${base}ay`);
		vrddhi.add(`${base}ai`);
		vrddhi.add(`${base}ay`);
	} else if (folded.endsWith('r')) {
		const base = folded.slice(0, -1);
		guna.add(`${base}ar`);
		vrddhi.add(`${base}ar`);
	} else if (folded.endsWith('a')) {
		const base = folded.slice(0, -1);
		guna.add(folded);
		vrddhi.add(`${base}a`);
	} else {
		guna.add(folded);
		vrddhi.add(folded);
	}

	return {
		root,
		guna: [...guna],
		vrddhi: [...vrddhi]
	};
}

function wordView(link: DhatuWordLink): DhatuWordView {
	const word = getDictionaryWord(link.slug);
	const meaning = word?.entries[0]?.text ?? link.preview;

	return {
		...link,
		meaning,
		meaningLines: parseDictionaryMeaning(meaning)
	};
}

function startsWithAny(value: string, stems: string[]) {
	return stems.some((stem) => stem.length >= 2 && value.startsWith(stem));
}

export function getWordIndex() {
	return index;
}

export function getDictionaryWord(slug: string) {
	return wordsBySlug.get(slug);
}

export function parseDictionaryMeaning(text: string) {
	const normalized = text.replace(/\s+/g, ' ').trim();
	if (!normalized) return [];

	return normalized
		.replace(/\s*--\s*(?=\d+)/g, '\n')
		.replace(/\s*--\s*/g, ' ')
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean);
}

export function formatDictionaryEntries(entries: DictionaryEntrySource[]): DictionaryEntryView[] {
	return entries.map((entry) => ({
		...entry,
		meaningLines: parseDictionaryMeaning(entry.text)
	}));
}

export function formatWordIndexItems(items: WordIndexItem[]): WordIndexView[] {
	return items.map((item) => ({
		...item,
		previewLines: parseDictionaryMeaning(item.preview)
	}));
}

export function filterWords(query = '', dictionary: DictionaryId | null = null) {
	return index.filter((word) => {
		if (dictionary && !word.dictionaries.includes(dictionary)) return false;
		if (!matchesWordSearch(word, query)) return false;
		return true;
	});
}

export function getDhatuWords(dhatuSlug: string) {
	return linksByDhatu[dhatuSlug] ?? [];
}

export function getDhatuWordGroups(
	dhatuSlug: string,
	rootIast: string,
	limitPerGroup = Number.POSITIVE_INFINITY,
	sourceLinks = getDhatuWords(dhatuSlug)
) {
	const stems = dhatuStems(rootIast);
	const groups: DhatuWordGroup[] = [
		{ title: 'Words Starting with Root', stem: stemLabel(stems.root[0]), words: [] },
		{ title: 'Words Starting with Guṇa of Root', stem: stemLabel(stems.guna[0]), words: [] },
		{ title: 'Words starting with Vṛddhi of Root', stem: stemLabel(stems.vrddhi[0]), words: [] }
	];
	const otherWords: DhatuWordView[] = [];

	for (const link of sourceLinks) {
		const normalized = foldIast(link.headword);
		const view = wordView(link);

		if (startsWithAny(normalized, stems.root) && groups[0].words.length < limitPerGroup) {
			groups[0].words.push(view);
			continue;
		}

		if (startsWithAny(normalized, stems.guna) && groups[1].words.length < limitPerGroup) {
			groups[1].words.push(view);
			continue;
		}

		if (startsWithAny(normalized, stems.vrddhi) && groups[2].words.length < limitPerGroup) {
			groups[2].words.push(view);
			continue;
		}

		otherWords.push(view);
	}

	if (otherWords.length) {
		groups.push({ title: 'Other Linked Words', stem: 'linked', words: otherWords });
	}

	return groups;
}

export function filterDhatuWords(dhatuSlug: string, query = '') {
	const regex = iastSearchRegex(query);
	return getDhatuWords(dhatuSlug).filter((word) => {
		if (!regex) return true;
		return [word.headword, word.preview, word.basis]
			.join(' ')
			.normalize('NFC')
			.toLowerCase()
			.search(regex) !== -1;
	});
}

export function paginateWords<T>(items: T[], page: number): PageSlice<T> {
	return paginate(items, page);
}

export function hydrateWordDhatus(word: DictionaryWord) {
	return word.dhatuLinks.map((link) => ({
		...link,
		dhatu: getDhatu(link.dhatuSlug)
	}));
}

export function getDictionaryCounts() {
	return {
		wordCount: index.length,
		apteCount: index.filter((word) => word.dictionaries.includes('apte')).length,
		mwCount: index.filter((word) => word.dictionaries.includes('mw')).length
	};
}
