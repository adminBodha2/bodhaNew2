import path from 'node:path';
import { absoluteUrl, routeFamily, ROUTES_DIR, SITE_URL } from './config.mjs';
import { pathExists, readText, walkFiles } from './fs-utils.mjs';
import { extractHtmlMetadata, extractMarkdownMetadata, extractSvelteMetadata } from './metadata.mjs';

export async function collectInventory(options = {}) {
	const records = [];

	records.push(...await collectRouteFiles());
	records.push(...await collectMarkdownFiles());
	records.push(...await collectLocalSitemapHints());

	if (options.live) {
		records.push(...await collectLiveSitemap());
		records.push(...await collectLiveSearchApi());
		records.push(...await collectLiveTagsApi());
		records.push(...await collectLivePages(records, options.limit || 40));
	}

	return mergeInventory(records);
}

async function collectRouteFiles() {
	const files = await walkFiles(ROUTES_DIR, (file) => /\/(\+page\.svelte|\+page\.ts|\+server\.ts)$/.test(file));
	const records = [];

	for (const file of files) {
		const urlPath = routePathFromFile(file);
		const isDynamic = urlPath.includes('[');
		const isEndpoint = file.endsWith('+server.ts') || urlPath.startsWith('/api/') || urlPath.endsWith('.xml');
		const source = file.endsWith('+page.svelte') || file.endsWith('+page.ts') ? await readText(file) : '';
		const meta = file.endsWith('+page.svelte') && source ? extractSvelteMetadata(source) : {};
		const isRedirect = /throw\s+redirect\(/.test(source);

		records.push({
			urlPath,
			absoluteUrl: isDynamic ? '' : absoluteUrl(urlPath),
			source: 'route-file',
			routeFamily: routeFamily(urlPath),
			title: meta.title || '',
			description: meta.description || '',
			tags: [],
			headings: meta.headings || [],
			outgoingLinks: meta.links || [],
			discoveredFrom: [relativeRouteFile(file)],
			isDynamic,
			isEndpoint,
			isRedirect,
			filePath: file,
			hasHeadComponent: meta.hasHeadComponent || false,
			hasSvelteHead: meta.hasSvelteHead || false
		});
	}

	return records;
}

async function collectMarkdownFiles() {
	const files = await walkFiles(ROUTES_DIR, (file) => file.endsWith('.md'));
	const records = [];

	for (const file of files) {
		const source = await readText(file);
		const meta = extractMarkdownMetadata(source);
		const urlPath = routePathFromFile(file);

		records.push({
			urlPath,
			absoluteUrl: absoluteUrl(urlPath),
			source: 'markdown',
			routeFamily: routeFamily(urlPath),
			title: meta.title,
			description: meta.description,
			tags: meta.tags,
			headings: meta.headings,
			outgoingLinks: meta.links,
			discoveredFrom: [relativeRouteFile(file)],
			isDynamic: false,
			filePath: file,
			contentLength: meta.bodyTextLength,
			frontmatter: meta.frontmatter
		});
	}

	return records;
}

async function collectLocalSitemapHints() {
	const file = path.join(ROUTES_DIR, 'sitemap.xml/+server.ts');
	if (!await pathExists(file)) return [];

	const source = await readText(file);
	const records = [];
	const routeMatches = [...source.matchAll(/\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?\}/g)];
	for (const match of routeMatches) {
		const urlPath = match[1];
		records.push({
			urlPath,
			absoluteUrl: absoluteUrl(urlPath),
			source: 'sitemap-code',
			routeFamily: routeFamily(urlPath),
			title: '',
			description: '',
			tags: [],
			headings: [],
			outgoingLinks: [],
			discoveredFrom: ['src/routes/sitemap.xml/+server.ts'],
			isDynamic: false
		});
	}

	const globHints = [...source.matchAll(/import\.meta\.glob\(['"]\/src\/routes\/([^*]+)\*\.md['"]\)/g)].map((m) => m[1]);
	for (const hint of globHints) {
		records.push({
			urlPath: `/${hint.replace(/\/$/, '')}/*`,
			absoluteUrl: '',
			source: 'sitemap-code',
			routeFamily: routeFamily(`/${hint}`),
			title: '',
			description: '',
			tags: [],
			headings: [],
			outgoingLinks: [],
			discoveredFrom: ['src/routes/sitemap.xml/+server.ts'],
			isDynamic: true
		});
	}

	return records;
}

async function collectLiveSitemap() {
	const response = await fetch(`${SITE_URL}/sitemap.xml`);
	if (!response.ok) {
		return [{
			urlPath: '/sitemap.xml',
			absoluteUrl: `${SITE_URL}/sitemap.xml`,
			source: 'live-sitemap-error',
			routeFamily: 'technical',
			title: '',
			description: `HTTP ${response.status}`,
			tags: [],
			headings: [],
			outgoingLinks: [],
			discoveredFrom: ['live sitemap'],
			isDynamic: false
		}];
	}

	const xml = await response.text();
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
		const url = match[1].trim();
		const urlPath = url.replace(SITE_URL, '') || '/';
		return {
			urlPath,
			absoluteUrl: url,
			source: 'sitemap',
			routeFamily: routeFamily(urlPath),
			title: '',
			description: '',
			tags: [],
			headings: [],
			outgoingLinks: [],
			discoveredFrom: ['live sitemap'],
			isDynamic: false
		};
	});
}

async function collectLiveSearchApi() {
	const response = await fetch(`${SITE_URL}/api/search.json`);
	if (!response.ok) return [];
	const items = await response.json();
	if (!Array.isArray(items)) return [];

	return items.map((item) => {
		const rawPath = typeof item.linkpath === 'string' ? item.linkpath : '';
		const isExternal = rawPath.startsWith('http://') || rawPath.startsWith('https://');
		const urlPath = isExternal ? rawPath : rawPath || '/';
		return {
			urlPath,
			absoluteUrl: isExternal ? rawPath : absoluteUrl(urlPath),
			source: 'search-api',
			routeFamily: item.type || routeFamily(urlPath),
			title: stringValue(item.title),
			description: stringValue(item.description),
			tags: arrayValue(item.tags),
			headings: [],
			outgoingLinks: [],
			discoveredFrom: ['live api/search.json'],
			isDynamic: false
		};
	});
}

async function collectLiveTagsApi() {
	const response = await fetch(`${SITE_URL}/api/tags`);
	if (!response.ok) return [];
	const items = await response.json();
	if (!Array.isArray(items)) return [];

	return items.map((item) => {
		const tag = stringValue(item.tag || item.name || item);
		const urlPath = `/blog/tags/${encodeURIComponent(tag)}`;
		return {
			urlPath,
			absoluteUrl: absoluteUrl(urlPath),
			source: 'tags-api',
			routeFamily: 'tags',
			title: tag,
			description: '',
			tags: [tag],
			headings: [],
			outgoingLinks: [],
			discoveredFrom: ['live api/tags'],
			isDynamic: false
		};
	});
}

async function collectLivePages(existingRecords, limit) {
	const candidates = existingRecords
		.filter((item) => item.absoluteUrl && item.absoluteUrl.startsWith(SITE_URL))
		.map((item) => item.urlPath)
		.filter((value, index, all) => all.indexOf(value) === index)
		.slice(0, limit);

	const records = [];
	for (const urlPath of candidates) {
		try {
			const response = await fetch(absoluteUrl(urlPath));
			const html = await response.text();
			const meta = extractHtmlMetadata(html);
			records.push({
				urlPath,
				absoluteUrl: absoluteUrl(urlPath),
				source: 'live-crawl',
				routeFamily: routeFamily(urlPath),
				title: meta.title,
				description: meta.description,
				tags: [],
				headings: [...meta.h1, ...meta.h2],
				outgoingLinks: meta.links,
				discoveredFrom: [`live crawl HTTP ${response.status}`],
				isDynamic: false,
				status: response.status,
				html: meta
			});
		} catch (error) {
			records.push({
				urlPath,
				absoluteUrl: absoluteUrl(urlPath),
				source: 'live-crawl-error',
				routeFamily: routeFamily(urlPath),
				title: '',
				description: error.message,
				tags: [],
				headings: [],
				outgoingLinks: [],
				discoveredFrom: ['live crawl error'],
				isDynamic: false
			});
		}
	}
	return records;
}

function mergeInventory(records) {
	const map = new Map();

	for (const record of records) {
		const key = record.urlPath || record.absoluteUrl;
		if (!key) continue;
		const existing = map.get(key);
		if (!existing) {
			map.set(key, {
				...record,
				sources: [record.source],
				discoveredFrom: [...new Set(record.discoveredFrom || [])]
			});
			continue;
		}

		existing.sources = [...new Set([...existing.sources, record.source])];
		existing.discoveredFrom = [...new Set([...existing.discoveredFrom, ...(record.discoveredFrom || [])])];
		existing.title ||= record.title;
		existing.description ||= record.description;
		existing.absoluteUrl ||= record.absoluteUrl;
		existing.tags = [...new Set([...(existing.tags || []), ...(record.tags || [])])];
		existing.headings = [...new Set([...(existing.headings || []), ...(record.headings || [])])];
		existing.outgoingLinks = [...new Set([...(existing.outgoingLinks || []), ...(record.outgoingLinks || [])])];
		existing.contentLength ||= record.contentLength;
		existing.status ||= record.status;
		existing.html ||= record.html;
		existing.isEndpoint ||= record.isEndpoint;
		existing.isRedirect ||= record.isRedirect;
		existing.hasHeadComponent ||= record.hasHeadComponent;
		existing.hasSvelteHead ||= record.hasSvelteHead;
	}

	return [...map.values()].sort((a, b) => a.urlPath.localeCompare(b.urlPath));
}

function routePathFromFile(file) {
	let rel = relativeRouteFile(file);
	rel = rel.replace(/\/\+page\.(svelte|ts)$/, '');
	rel = rel.replace(/\/\+server\.ts$/, '');
	rel = rel.replace(/\.md$/, '');
	rel = rel.replace(/\/\(.*?\)/g, '');
	rel = rel.replace(/\/index$/, '');
	return rel === '' ? '/' : rel;
}

function relativeRouteFile(file) {
	return file.replace(ROUTES_DIR, '').replaceAll(path.sep, '/') || '/';
}

function stringValue(value) {
	return typeof value === 'string' ? value.trim() : '';
}

function arrayValue(value) {
	if (Array.isArray(value)) return value.map(String).filter(Boolean);
	if (typeof value === 'string' && value) return [value];
	return [];
}
