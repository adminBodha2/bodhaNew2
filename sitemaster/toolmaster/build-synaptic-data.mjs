import { mkdir, writeFile } from 'node:fs/promises';

const OUT_DIR = new URL('../../src/lib/serving/synaptic/', import.meta.url);
const GITHUB_API = 'https://api.github.com/repos/cceh/c-salt_sanskrit_data';

const SOURCES = {
	sutras:
		'https://raw.githubusercontent.com/ambuda-org/vidyut/main/vidyut-prakriya/data/sutrapatha.tsv',
	dhatus:
		'https://raw.githubusercontent.com/ambuda-org/vidyut/main/vidyut-prakriya/data/dhatupatha.tsv',
	apteXmlBlob: `${GITHUB_API}/git/blobs/adf25382fd7ad5a13d80528f7764dfa37dbb2a4d`,
	mwSplit: `${GITHUB_API}/contents/sa_en/mw/split?ref=master`
};

const ganaNames = {
	'01': 'bhvadi',
	'02': 'adadi',
	'03': 'juhotyadi',
	'04': 'divadi',
	'05': 'svadi',
	'06': 'tudadi',
	'07': 'rudhadi',
	'08': 'tanadi',
	'09': 'kryadi',
	'10': 'curadi'
};

const slp1ToIastMap = new Map([
	['A', 'ā'],
	['I', 'ī'],
	['U', 'ū'],
	['f', 'ṛ'],
	['F', 'ṝ'],
	['x', 'ḷ'],
	['X', 'ḹ'],
	['E', 'ai'],
	['O', 'au'],
	['M', 'ṃ'],
	['H', 'ḥ'],
	['N', 'ṅ'],
	['K', 'kh'],
	['G', 'gh'],
	['Y', 'ñ'],
	['C', 'ch'],
	['J', 'jh'],
	['w', 'ṭ'],
	['W', 'ṭh'],
	['q', 'ḍ'],
	['Q', 'ḍh'],
	['R', 'ṇ'],
	['T', 'th'],
	['D', 'dh'],
	['P', 'ph'],
	['B', 'bh'],
	['S', 'ś'],
	['z', 'ṣ']
]);

function slp1ToIast(value) {
	return value
		.replace(/[~\\^]/g, '')
		.split('')
		.map((char) => slp1ToIastMap.get(char) ?? char)
		.join('');
}

function decodeEntities(value) {
	return value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'");
}

function plainSlug(value) {
	const base = value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

	return base || 'word';
}

function foldIast(value) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '');
}

function compactText(value, limit = 700) {
	const compact = decodeEntities(value)
		.replace(/\s+/g, ' ')
		.replace(/\s+([,.;:)])/g, '$1')
		.replace(/([(])\s+/g, '$1')
		.trim();

	if (compact.length <= limit) return compact;
	return `${compact.slice(0, limit).replace(/\s+\S*$/, '')}...`;
}

function markupToText(value) {
	return value
		.replace(/<lb\s*\/>/g, ' ')
		.replace(/<(?:s|w|orth|hyph)\b[^>]*>([\s\S]*?)<\/(?:s|w|orth|hyph)>/g, (_, inner) =>
			slp1ToIast(inner.replace(/<[^>]+>/g, ''))
		)
		.replace(/<[^>]+>/g, ' ');
}

function slpTokenSet(value) {
	const tokens = new Set();
	const slpTagged = value.matchAll(/<(?:s|w|orth|hyph)\b[^>]*>([\s\S]*?)<\/(?:s|w|orth|hyph)>/g);

	for (const match of slpTagged) {
		const inner = decodeEntities(match[1].replace(/<[^>]+>/g, ' '));
		for (const token of inner.split(/[^A-Za-z~\\^]+/)) {
			const clean = cleanDhatu(token);
			if (clean.length < 2) continue;
			tokens.add(foldIast(slp1ToIast(clean)));
		}
	}

	return tokens;
}

function unique(values) {
	return [...new Set(values.filter(Boolean))];
}

function cleanDhatu(value) {
	return value.replace(/[~\\^]/g, '');
}

function slugBaseForDhatu(dhatu) {
	const base = slp1ToIast(cleanDhatu(dhatu))
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

	return base || 'dhatu';
}

function parseTsv(text) {
	const [headerLine, ...lines] = text.trim().split(/\r?\n/);
	const headers = headerLine.split('\t');

	return lines
		.map((line) => {
			const cells = line.split('\t');
			return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
		})
		.filter((row) => Object.values(row).some(Boolean));
}

async function fetchText(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Unable to fetch ${url}: ${response.status} ${response.statusText}`);
	}
	return response.text();
}

async function fetchJson(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Unable to fetch ${url}: ${response.status} ${response.statusText}`);
	}
	return response.json();
}

async function fetchGithubBlobText(url) {
	const blob = await fetchJson(url);
	if (!blob.content || blob.encoding !== 'base64') {
		throw new Error(`GitHub blob did not return base64 content for ${url}`);
	}
	return Buffer.from(blob.content, 'base64').toString('utf8');
}

function normalizeSutras(rows) {
	return rows
		.filter((row) => /^\d+\.\d+\.\d+$/.test(row.code) && row.text)
		.map((row) => {
			const [adhyaya, pada, number] = row.code.split('.').map(Number);
			return {
				id: row.code,
				adhyaya,
				pada,
				number,
				text: row.text,
				transliteration: slp1ToIast(row.text),
				source: 'Vidyut sutrapatha.tsv, cross-referenced with sanskrit/ashtadhyayi',
				sourceUrl: `https://github.com/ambuda-org/vidyut/blob/main/vidyut-prakriya/data/sutrapatha.tsv`,
				referenceUrl: `https://ashtadhyayi.github.io/suutra/${adhyaya}.${pada}/${row.code}/`
			};
		})
		.sort((a, b) => a.adhyaya - b.adhyaya || a.pada - b.pada || a.number - b.number);
}

function normalizeDhatus(rows) {
	const seenSlugs = new Set();
	return rows
		.filter((row) => /^\d{2}\.\d{4}$/.test(row.code) && row.dhatu && row.dhatu !== '-')
		.map((row) => {
			const ganaCode = row.code.slice(0, 2);
			const root = cleanDhatu(row.dhatu);
			const slugBase = slugBaseForDhatu(row.dhatu);
			const slug = seenSlugs.has(slugBase) ? `${slugBase}-${row.code.replace('.', '-')}` : slugBase;
			seenSlugs.add(slug);
			return {
				id: row.code,
				slug,
				root,
				rootIast: slp1ToIast(root),
				gana: Number(ganaCode),
				ganaName: ganaNames[ganaCode] ?? `gana ${Number(ganaCode)}`,
				meaning: row.artha,
				meaningIast: slp1ToIast(row.artha),
				source: 'Vidyut dhatupatha.tsv',
				sourceUrl: 'https://github.com/ambuda-org/vidyut/blob/main/vidyut-prakriya/data/dhatupatha.tsv',
				relatedSutras: ['1.3.1']
			};
		});
}

function extractTag(block, tag) {
	const match = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`));
	return match ? decodeEntities(match[1].trim()) : '';
}

function extractApteEntries(xml) {
	const entries = [];
	const matches = xml.matchAll(/<H\d\b[^>]*>[\s\S]*?<\/H\d>/g);

	for (const match of matches) {
		const block = match[0];
		const headwordSlp = extractTag(block, 'key1');
		const body = extractTag(block, 'body');
		if (!headwordSlp || !body) continue;

		const headword = slp1ToIast(headwordSlp);
		entries.push({
			dictionary: 'apte',
			dictionaryLabel: 'Apte Sanskrit-English Dictionary',
			id: `apte:${entries.length + 1}`,
			headword,
			headwordSlp,
			text: compactText(markupToText(body), 420),
			sourceTokens: slpTokenSet(block),
			sourceUrl: 'https://github.com/cceh/c-salt_sanskrit_data/blob/master/sa_en/ap90/ap90.xml'
		});
	}

	return entries;
}

function extractMwEntries(xml, sourceUrl) {
	const entries = [];
	const matches = xml.matchAll(/<entry\b[^>]*>[\s\S]*?<\/entry>/g);

	for (const match of matches) {
		const block = match[0];
		const id = block.match(/xml:id="([^"]+)"/)?.[1] ?? `mw:${entries.length + 1}`;
		const headwordSlp = block.match(/<orth\b[^>]*ana="key1"[^>]*>([\s\S]*?)<\/orth>/)?.[1] ?? '';
		if (!headwordSlp) continue;

		const headword = slp1ToIast(decodeEntities(headwordSlp));
		const senses = [...block.matchAll(/<sense\b[^>]*>[\s\S]*?<\/sense>/g)]
			.slice(0, 4)
			.map((sense) => compactText(markupToText(sense[0]), 160))
			.filter(Boolean);
		if (!senses.length) continue;

		entries.push({
			dictionary: 'mw',
			dictionaryLabel: 'Monier-Williams Sanskrit-English Dictionary',
			id: `mw:${id}`,
			headword,
			headwordSlp,
			text: compactText(senses.join(' '), 420),
			sourceTokens: slpTokenSet(block),
			sourceUrl
		});
	}

	return entries;
}

function mergeDictionaryEntries(entries) {
	const bySlug = new Map();
	const seenSlugs = new Set();

	for (const entry of entries) {
		const baseSlug = plainSlug(entry.headword);
		let slug = baseSlug;
		let suffix = 2;
		while (seenSlugs.has(slug) && !bySlug.get(slug)?.headwordSlps.includes(entry.headwordSlp)) {
			slug = `${baseSlug}-${suffix}`;
			suffix += 1;
		}
		seenSlugs.add(slug);

		const word = bySlug.get(slug) ?? {
			slug,
			headword: entry.headword,
			headwordSlps: [],
			normalized: foldIast(entry.headword),
			dictionaries: [],
			entries: [],
			sourceTokens: new Set()
		};

		word.headwordSlps = unique([...word.headwordSlps, entry.headwordSlp]);
		for (const token of entry.sourceTokens) word.sourceTokens.add(token);
		if (!word.dictionaries.includes(entry.dictionary)) word.dictionaries.push(entry.dictionary);
		if (word.entries.filter((item) => item.dictionary === entry.dictionary).length < 3) {
			word.entries.push({
				dictionary: entry.dictionary,
				dictionaryLabel: entry.dictionaryLabel,
				id: entry.id,
				text: entry.text,
				sourceUrl: entry.sourceUrl
			});
		}

		bySlug.set(slug, word);
	}

	return [...bySlug.values()].sort((a, b) => a.normalized.localeCompare(b.normalized));
}

function dhatuSignatures(dhatu) {
	const folded = foldIast(dhatu.rootIast);
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

function buildDhatuWordLinks(words, dhatus) {
	const linkMap = new Map(dhatus.map((dhatu) => [dhatu.slug, []]));
	const dhatuMeta = dhatus.map((dhatu) => ({
		dhatu,
		rootFold: foldIast(dhatu.rootIast),
		rootSlp: cleanDhatu(dhatu.root),
		signatures: dhatuSignatures(dhatu)
	}));

	for (const word of words) {
		const wordLinks = [];
		for (const meta of dhatuMeta) {
			const citedInSource = word.sourceTokens.has(meta.rootFold);
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
				preview: word.entries[0]?.text ?? '',
				dictionaries: word.dictionaries,
				basis,
				score
			});
		}

		word.dhatuLinks = wordLinks
			.sort((a, b) => b.score - a.score || a.rootIast.localeCompare(b.rootIast))
			.slice(0, 12)
			.map(({ score, ...link }) => link);
		delete word.sourceTokens;
	}

	const dhatuWordLinks = Object.fromEntries(
		[...linkMap.entries()].map(([slug, links]) => [
			slug,
			links
				.sort((a, b) => b.score - a.score || a.headword.localeCompare(b.headword))
				.slice(0, 200)
				.map(({ score, ...link }) => link)
		])
	);

	return dhatuWordLinks;
}

function buildWordIndex(words) {
	return words.map((word) => ({
		slug: word.slug,
		headword: word.headword,
		normalized: word.normalized,
		dictionaries: word.dictionaries,
		preview: compactText(word.entries[0]?.text ?? '', 180),
		dhatuSlugs: word.dhatuLinks.map((link) => link.dhatuSlug)
	}));
}

async function buildDictionaryData(dhatus) {
	const [apteXml, mwFiles] = await Promise.all([
		fetchGithubBlobText(SOURCES.apteXmlBlob),
		fetchJson(SOURCES.mwSplit)
	]);
	const entries = extractApteEntries(apteXml);
	const mwTeiFiles = mwFiles.filter((file) => /^mw_\d+\.tei$/.test(file.name));

	for (const file of mwTeiFiles) {
		const xml = await fetchGithubBlobText(file.git_url);
		entries.push(...extractMwEntries(xml, file.html_url));
		console.log(`Parsed ${file.name}`);
	}

	const words = mergeDictionaryEntries(entries);
	const dhatuWordLinks = buildDhatuWordLinks(words, dhatus);
	const wordIndex = buildWordIndex(words);

	return {
		words: words.map(({ headwordSlps, ...word }) => word),
		wordIndex,
		dhatuWordLinks
	};
}

async function main() {
	const [sutrasText, dhatusText] = await Promise.all([
		fetchText(SOURCES.sutras),
		fetchText(SOURCES.dhatus)
	]);

	const sutras = normalizeSutras(parseTsv(sutrasText));
	const dhatus = normalizeDhatus(parseTsv(dhatusText));
	const dictionaryData = await buildDictionaryData(dhatus);

	await mkdir(OUT_DIR, { recursive: true });
	await writeFile(new URL('ashtadhyayi-rules.json', OUT_DIR), `${JSON.stringify(sutras, null, '\t')}\n`);
	await writeFile(new URL('dhatus.json', OUT_DIR), `${JSON.stringify(dhatus, null, '\t')}\n`);
	await writeFile(new URL('dictionary-entries.json', OUT_DIR), `${JSON.stringify(dictionaryData.words, null, '\t')}\n`);
	await writeFile(new URL('word-index.json', OUT_DIR), `${JSON.stringify(dictionaryData.wordIndex, null, '\t')}\n`);
	await writeFile(new URL('dhatu-word-links.json', OUT_DIR), `${JSON.stringify(dictionaryData.dhatuWordLinks, null, '\t')}\n`);

	console.log(
		`Wrote ${sutras.length} sutras, ${dhatus.length} dhatus, and ${dictionaryData.words.length} dictionary words.`
	);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
