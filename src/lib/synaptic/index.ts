import dbAshtadhyayiRules from '$lib/serving/synaptic/db-ashtadhyayi.json';
import dhatus from '$lib/serving/synaptic/dhatus.json';

type DbAshtadhyayiRule = {
	id: string;
	text: string;
	theme: string;
	transliteration: string;
	padacheda: string;
	english: string;
	explainer: string;
	chapter: number;
	pada: number;
	sutra: number;
	numindex: number;
	sansdoclink: string;
	sansdiclink: string;
};

export type AshtadhyayiRule = {
	id: string;
	adhyaya: number;
	pada: number;
	number: number;
	text: string;
	theme: string;
	transliteration: string;
	padacheda: string;
	english: string;
	explainer: string;
	numindex: number;
	sanskritDocumentsUrl: string;
	sanskritDictionaryUrl: string;
	source: string;
	sourceUrl: string;
	referenceUrl: string;
};

export type Dhatu = {
	id: string;
	slug: string;
	root: string;
	rootIast: string;
	gana: number;
	ganaName: string;
	meaning: string;
	meaningIast: string;
	source: string;
	sourceUrl: string;
	relatedSutras: string[];
};

export type PageSlice<T> = {
	items: T[];
	page: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
};

export const DEFAULT_PAGE_SIZE = 48;

const rules = (dbAshtadhyayiRules as DbAshtadhyayiRule[])
	.map((rule) => ({
		id: rule.id,
		adhyaya: rule.chapter,
		pada: rule.pada,
		number: rule.sutra,
		text: rule.text,
		theme: rule.theme,
		transliteration: rule.transliteration,
		padacheda: rule.padacheda.trim(),
		english: rule.english,
		explainer: rule.explainer,
		numindex: rule.numindex,
		sanskritDocumentsUrl: rule.sansdoclink,
		sanskritDictionaryUrl: rule.sansdiclink,
		source: 'db-ashtadhyayi.json',
		sourceUrl: rule.sansdoclink,
		referenceUrl: rule.sansdiclink
	}))
	.sort((a, b) => a.numindex - b.numindex) satisfies AshtadhyayiRule[];
const roots = dhatus as Dhatu[];

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

function matchesRuleSearch(rule: AshtadhyayiRule, query: string) {
	const regex = iastSearchRegex(query);
	if (!regex) return true;

	return [rule.text, rule.transliteration, rule.padacheda, rule.theme]
		.join(' ')
		.normalize('NFC')
		.toLowerCase()
		.search(regex) !== -1;
}

export function getAshtadhyayiRules() {
	return rules;
}

export function getAshtadhyayiRule(sutra: string) {
	return rules.find((rule) => rule.id === sutra);
}

export function getDhatus() {
	return roots;
}

export function getDhatu(slug: string) {
	return roots.find((dhatu) => dhatu.slug === slug || dhatu.id === slug);
}

export function getRuleNeighbors(id: string) {
	const index = rules.findIndex((rule) => rule.id === id);
	return {
		previous: index > 0 ? rules[index - 1] : null,
		next: index >= 0 && index < rules.length - 1 ? rules[index + 1] : null
	};
}

export function getDhatuNeighbors(slug: string) {
	const index = roots.findIndex((dhatu) => dhatu.slug === slug);
	return {
		previous: index > 0 ? roots[index - 1] : null,
		next: index >= 0 && index < roots.length - 1 ? roots[index + 1] : null
	};
}

export function getGanas() {
	return [...new Map(roots.map((dhatu) => [dhatu.gana, dhatu.ganaName])).entries()]
		.map(([gana, name]) => ({ gana, name, count: roots.filter((dhatu) => dhatu.gana === gana).length }))
		.sort((a, b) => a.gana - b.gana);
}

export function filterRules(adhyaya: number | null, pada: number | null, query = '') {
	return rules.filter((rule) => {
		if (adhyaya && rule.adhyaya !== adhyaya) return false;
		if (pada && rule.pada !== pada) return false;
		if (!matchesRuleSearch(rule, query)) return false;
		return true;
	});
}

export function filterDhatus(query: string, gana: number | null) {
	const normalizedQuery = query.trim().toLowerCase();
	return roots.filter((dhatu) => {
		if (gana && dhatu.gana !== gana) return false;
		if (!normalizedQuery) return true;

		return [dhatu.root, dhatu.rootIast, dhatu.meaning, dhatu.meaningIast, dhatu.ganaName]
			.join(' ')
			.toLowerCase()
			.includes(normalizedQuery);
	});
}

export function paginate<T>(items: T[], page: number, pageSize = DEFAULT_PAGE_SIZE): PageSlice<T> {
	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
	const safePage = Math.min(Math.max(page, 1), totalPages);
	const start = (safePage - 1) * pageSize;

	return {
		items: items.slice(start, start + pageSize),
		page: safePage,
		pageSize,
		totalItems: items.length,
		totalPages
	};
}

export function toPositiveNumber(value: string | null) {
	if (!value) return null;
	const parsed = Number(value);
	return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}
