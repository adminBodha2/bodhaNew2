export function stripTags(html) {
	return html
		.replace(/<script[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function extractHtmlMetadata(html) {
	const title = matchOne(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
	const description = matchMeta(html, 'name', 'description');
	const canonical = matchLink(html, 'canonical');
	const ogTitle = matchMeta(html, 'property', 'og:title');
	const ogDescription = matchMeta(html, 'property', 'og:description');
	const ogImage = matchMeta(html, 'property', 'og:image');
	const twitterTitle = matchMeta(html, 'name', 'twitter:title');
	const twitterDescription = matchMeta(html, 'name', 'twitter:description');
	const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
	const h2 = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => stripTags(m[1]));
	const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1].trim());
	const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
	const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((tag) => ({
		src: matchAttr(tag[0], 'src'),
		alt: matchAttr(tag[0], 'alt')
	}));

	return {
		title,
		description,
		canonical,
		ogTitle,
		ogDescription,
		ogImage,
		twitterTitle,
		twitterDescription,
		h1,
		h2,
		jsonLd,
		links,
		images,
		visibleTextLength: stripTags(html).length
	};
}

export function extractMarkdownMetadata(source) {
	const frontmatter = parseFrontmatter(source);
	const body = source.replace(/^---\n[\s\S]*?\n---\n?/, '');
	const headings = [...body.matchAll(/^#{1,3}\s+(.+)$/gm)].map((m) => m[1].trim());
	const links = [...body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m) => m[1]);
	const title = stringValue(frontmatter.title) || headings[0] || '';
	const description =
		stringValue(frontmatter.description) ||
		stringValue(frontmatter.excerpt) ||
		firstParagraph(body);

	return {
		frontmatter,
		title,
		description,
		tags: arrayValue(frontmatter.tags),
		headings,
		links,
		bodyTextLength: body.replace(/\s+/g, ' ').trim().length
	};
}

export function extractSvelteMetadata(source) {
	const title =
		matchConstString(source, 'title') ||
		matchOne(source, /<title[^>]*>([\s\S]*?)<\/title>/i);
	const description =
		matchConstString(source, 'metaDescription') ||
		matchConstString(source, 'description') ||
		matchMeta(source, 'name', 'description');
	const headings = [
		...[...source.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1])),
		...[...source.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => stripTags(m[1]))
	].filter(Boolean);
	const links = [
		...[...source.matchAll(/\bhref=["']([^"']+)["']/g)].map((m) => m[1]),
		...[...source.matchAll(/\bgoto\(["']([^"']+)["']\)/g)].map((m) => m[1])
	];

	return {
		title,
		description,
		headings,
		links,
		hasHeadComponent: /<Head\b/.test(source),
		hasSvelteHead: /<svelte:head\b/.test(source)
	};
}

export function parseFrontmatter(source) {
	if (!source.startsWith('---\n')) return {};
	const end = source.indexOf('\n---', 4);
	if (end === -1) return {};
	const block = source.slice(4, end).trim();
	const data = {};
	let currentKey = '';

	for (const rawLine of block.split('\n')) {
		const line = rawLine.trimEnd();
		if (!line.trim()) continue;

		const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (keyMatch) {
			currentKey = keyMatch[1];
			data[currentKey] = parseScalar(keyMatch[2]);
			continue;
		}

		const listMatch = line.match(/^-\s*(.+)$/);
		if (listMatch && currentKey) {
			if (!Array.isArray(data[currentKey])) data[currentKey] = [];
			data[currentKey].push(unquote(listMatch[1].trim()));
		}
	}

	return data;
}

function firstParagraph(body) {
	return body
		.split(/\n\s*\n/)
		.map((part) => part.replace(/^#+\s+/gm, '').replace(/\s+/g, ' ').trim())
		.find((part) => part.length > 40) || '';
}

function parseScalar(value) {
	const trimmed = value.trim();
	if (!trimmed) return '';
	if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
		return trimmed
			.slice(1, -1)
			.split(',')
			.map((item) => unquote(item.trim()))
			.filter(Boolean);
	}
	return unquote(trimmed);
}

function unquote(value) {
	return value.replace(/^['"]|['"]$/g, '');
}

function stringValue(value) {
	return typeof value === 'string' ? value.trim() : '';
}

function arrayValue(value) {
	if (Array.isArray(value)) return value.map(String).filter(Boolean);
	if (typeof value === 'string' && value) return [value];
	return [];
}

function matchOne(source, pattern) {
	const match = source.match(pattern);
	return match ? stripTags(match[1]) : '';
}

function matchConstString(source, name) {
	const escaped = escapeRegExp(name);
	const match = source.match(new RegExp(`(?:const|let)\\s+${escaped}\\s*=\\s*(['"\`])([\\s\\S]*?)\\1`, 'm'));
	if (!match) return '';
	const value = match[2].trim();
	if (/[${}]/.test(value)) return '';
	return stripTags(value);
}

function matchMeta(source, attrName, attrValue) {
	const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attrName}=["']${escapeRegExp(attrValue)}["'])(?=[^>]*\\bcontent=["']([^"']*)["'])[^>]*>`, 'i');
	const match = source.match(pattern);
	return match ? match[1].trim() : '';
}

function matchLink(source, relValue) {
	const pattern = new RegExp(`<link\\b(?=[^>]*\\brel=["']${escapeRegExp(relValue)}["'])(?=[^>]*\\bhref=["']([^"']*)["'])[^>]*>`, 'i');
	const match = source.match(pattern);
	return match ? match[1].trim() : '';
}

function matchAttr(source, name) {
	const match = source.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'));
	return match ? match[1].trim() : '';
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
