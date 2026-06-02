import { readFile, writeFile } from 'node:fs/promises';

const OUT_DIR = new URL('../../src/lib/serving/synaptic/', import.meta.url);

function foldSearch(value) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();
}

function foldCompact(value) {
	return foldSearch(value).replace(/\s+/g, '');
}

function compactText(value, limit = 420) {
	const compact = value.replace(/\s+/g, ' ').trim();
	if (compact.length <= limit) return compact;
	return `${compact.slice(0, limit).replace(/\s+\S*$/, '')}...`;
}

function dhatuSignatures(dhatu) {
	const folded = foldCompact(dhatu.rootIast);
	const signatures = new Set([folded]);

	if (folded.endsWith('u')) {
		const base = folded.slice(0, -1);
		signatures.add(`${base}o`);
		signatures.add(`${base}au`);
		signatures.add(`${base}av`);
	}

	if (folded.endsWith('i')) {
		const base = folded.slice(0, -1);
		signatures.add(`${base}e`);
		signatures.add(`${base}ai`);
		signatures.add(`${base}ay`);
	}

	if (folded.endsWith('r')) {
		const base = folded.slice(0, -1);
		signatures.add(`${base}ar`);
	}

	return [...signatures].filter((signature) => signature.length >= 3);
}

function citesRoot(searchText, rootFold) {
	if (rootFold.length < 3) return false;
	return new RegExp(`(^| )${rootFold}( |$)`).test(searchText);
}

function buildLinks(words, dhatus) {
	const linkMap = new Map(dhatus.map((dhatu) => [dhatu.slug, []]));
	const dhatuMeta = dhatus.map((dhatu) => ({
		dhatu,
		rootFold: foldCompact(dhatu.rootIast),
		signatures: dhatuSignatures(dhatu)
	}));

	for (const word of words) {
		const wordLinks = [];
		const searchText = foldSearch(word.entries.map((entry) => entry.text).join(' '));

		for (const meta of dhatuMeta) {
			const citedInSource = citesRoot(searchText, meta.rootFold);
			const matchedStem = meta.signatures.find((signature) => word.normalized.startsWith(signature));
			if (!citedInSource && !matchedStem) continue;

			const basis = citedInSource
				? `dictionary text cites √${meta.dhatu.rootIast}`
				: `headword begins with ${matchedStem} from √${meta.dhatu.rootIast}`;
			const score = citedInSource ? 2 : 1;

			wordLinks.push({
				dhatuSlug: meta.dhatu.slug,
				rootIast: meta.dhatu.rootIast,
				gana: meta.dhatu.gana,
				basis,
				score
			});
			linkMap.get(meta.dhatu.slug)?.push({
				slug: word.slug,
				headword: word.headword,
				preview: compactText(word.entries[0]?.text ?? '', 180),
				dictionaries: word.dictionaries,
				basis,
				score
			});
		}

		word.dhatuLinks = wordLinks
			.sort((a, b) => b.score - a.score || a.rootIast.localeCompare(b.rootIast))
			.slice(0, 12)
			.map(({ score, ...link }) => link);
	}

	return Object.fromEntries(
		[...linkMap.entries()].map(([slug, links]) => [
			slug,
			links
				.sort((a, b) => b.score - a.score || a.headword.localeCompare(b.headword))
				.slice(0, 200)
				.map(({ score, ...link }) => link)
		])
	);
}

const [words, dhatus] = await Promise.all([
	readFile(new URL('dictionary-entries.json', OUT_DIR), 'utf8').then(JSON.parse),
	readFile(new URL('dhatus.json', OUT_DIR), 'utf8').then(JSON.parse)
]);

for (const word of words) {
	word.normalized = foldCompact(word.headword);
	word.entries = word.entries.map((entry) => ({
		...entry,
		text: compactText(entry.text)
	}));
}

const dhatuWordLinks = buildLinks(words, dhatus);
const wordIndex = words.map((word) => ({
	slug: word.slug,
	headword: word.headword,
	normalized: word.normalized,
	dictionaries: word.dictionaries,
	preview: compactText(word.entries[0]?.text ?? '', 180),
	dhatuSlugs: word.dhatuLinks.map((link) => link.dhatuSlug)
}));

await Promise.all([
	writeFile(new URL('dictionary-entries.json', OUT_DIR), `${JSON.stringify(words)}\n`),
	writeFile(new URL('word-index.json', OUT_DIR), `${JSON.stringify(wordIndex)}\n`),
	writeFile(new URL('dhatu-word-links.json', OUT_DIR), `${JSON.stringify(dhatuWordLinks)}\n`)
]);

console.log(`Compacted ${words.length} dictionary words.`);
