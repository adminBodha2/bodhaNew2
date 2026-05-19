import { TOPIC_CLUSTERS } from './config.mjs';

export function auditInventory(inventory, options = {}) {
	const issues = [];
	for (const item of inventory) {
		issues.push(...auditPageItem(item, inventory));
	}

	issues.push(...auditDiscoverability(inventory));
	for (const topicKey of Object.keys(TOPIC_CLUSTERS)) {
		issues.push(...auditTopic(inventory, topicKey));
	}

	return {
		generatedAt: new Date().toISOString(),
		options,
		summary: summarize(inventory, issues),
		inventory,
		issues
	};
}

export function auditSinglePage(inventory, urlPath) {
	const item = inventory.find((entry) => entry.urlPath === urlPath || entry.absoluteUrl === urlPath);
	if (!item) {
		return {
			generatedAt: new Date().toISOString(),
			urlPath,
			issues: [{
				id: 'page-not-found-in-inventory',
				severity: 'critical',
				urlPath,
				category: 'technical',
				finding: 'The requested page was not found in the optimizer inventory.',
				evidence: ['Inventory is built from route files, markdown files, sitemap hints, and live surfaces when enabled.'],
				recommendation: 'Run a site audit with --live or check whether this page is discoverable through routes, sitemap, or search.',
				patchAvailable: false
			}]
		};
	}

	return {
		generatedAt: new Date().toISOString(),
		page: item,
		issues: auditPageItem(item, inventory)
	};
}

export function auditTopic(inventory, topicKey) {
	const cluster = TOPIC_CLUSTERS[topicKey];
	if (!cluster) {
		return [{
			id: `unknown-topic-${topicKey}`,
			severity: 'medium',
			urlPath: '/',
			category: 'topic',
			finding: `Unknown topic cluster: ${topicKey}.`,
			evidence: [`Known clusters: ${Object.keys(TOPIC_CLUSTERS).join(', ')}`],
			recommendation: 'Add a topic cluster definition before auditing this term.',
			patchAvailable: false
		}];
	}

	const matches = inventory
		.filter((item) => isRankablePage(item.urlPath) && !isExternalPage(item) && !item.isVirtualConcrete)
		.map((item) => ({ item, score: scoreTopicPage(item, cluster.terms) }))
		.filter((entry) => entry.score > 0)
		.sort((a, b) => b.score - a.score);

	const issues = [];
	if (matches.length < 5) {
		issues.push({
			id: `topic-${topicKey}-low-coverage`,
			severity: 'high',
			urlPath: '/',
			category: 'topic',
			finding: `${cluster.label} has low visible coverage in the discoverable inventory.`,
			evidence: [`Matched ${matches.length} pages against ${cluster.terms.length} seed terms.`],
			recommendation: `Create or strengthen pages that explicitly serve the ${cluster.label} search intent, then connect them through sitemap/search/internal links.`,
			patchAvailable: false
		});
	}

	for (const hub of cluster.expectedHubs) {
		const hubItem = inventory.find((item) => item.urlPath === hub);
		if (!hubItem) {
			issues.push({
				id: `topic-${topicKey}-missing-hub-${slugId(hub)}`,
				severity: 'medium',
				urlPath: hub,
				category: 'topic',
				finding: `Expected ${cluster.label} hub is not discoverable in the inventory.`,
				evidence: [`Expected hub: ${hub}`],
				recommendation: `Make sure ${hub} exists, is linked, and appears in sitemap/search where appropriate.`,
				patchAvailable: false
			});
		}
	}

	const hasDiscoverablePrimaryHub = cluster.primaryHub
		? inventory.some((item) => item.urlPath === cluster.primaryHub)
		: false;
	const topMatches = matches.slice(0, 12).map(({ item, score }) => `${item.urlPath} (${score})`);
	if (topMatches.length > 0 && !hasDiscoverablePrimaryHub) {
		issues.push({
			id: `topic-${topicKey}-top-pages`,
			severity: 'low',
			urlPath: '/',
			category: 'topic',
			finding: `${cluster.label} currently has ${matches.length} discoverable candidate pages.`,
			evidence: topMatches,
			recommendation: 'Review these pages as a cluster and add intentional internal links from hubs to supporting pages.',
			patchAvailable: false
		});
	}

	return issues;
}

function auditPageItem(item, inventory = []) {
	const issues = [];
	const title = item.title || item.html?.title || '';
	const description = item.description || item.html?.description || '';

	if (item.isEndpoint || item.isRedirect || item.isVirtualConcrete || !isRankablePage(item.urlPath)) {
		return issues;
	}

	if (item.isDynamic && !item.absoluteUrl) {
		if (!hasConcreteDynamicMatches(item.urlPath, inventory)) {
			issues.push({
				id: `dynamic-route-pattern-${slugId(item.urlPath)}`,
				severity: 'low',
				urlPath: item.urlPath,
				category: 'technical',
				finding: 'Dynamic route pattern found without concrete page URLs in the current inventory.',
				evidence: item.discoveredFrom,
				recommendation: 'Concrete pages for this dynamic route should appear through sitemap, search, or live crawl if they are meant to rank.',
				patchAvailable: false
			});
		}
		return issues;
	}

	if (!title) {
		issues.push(issue(item, 'missing-title', 'high', 'metadata', 'Page has no discoverable title.', 'Add a specific title through the route metadata/head component.'));
	} else if (title.length < 20) {
		issues.push(issue(item, 'short-title', 'medium', 'metadata', `Title is short: "${title}".`, 'Use a more specific title that names the page and search intent.'));
	} else if (title.length > 70) {
		issues.push(issue(item, 'long-title', 'low', 'metadata', `Title is long: ${title.length} characters.`, 'Consider keeping titles below roughly 60-70 characters where possible.'));
	}

	if (!description) {
		issues.push(issue(item, 'missing-description', 'high', 'metadata', 'Page has no discoverable description.', 'Add a concise page-specific meta description.'));
	} else if (description.length < 70) {
		issues.push(issue(item, 'short-description', 'medium', 'metadata', `Description is short: ${description.length} characters.`, 'Expand the description so it states the page subject and value clearly.'));
	} else if (description.length > 180) {
		issues.push(issue(item, 'long-description', 'low', 'metadata', `Description is long: ${description.length} characters.`, 'Trim the description to a focused search snippet.'));
	}

	if (item.html) {
		if (!item.html.canonical) {
			issues.push(issue(item, 'missing-canonical', 'high', 'metadata', 'Live page has no canonical URL.', 'Wire canonical URLs through the head component.'));
		}
		if (!item.html.ogTitle || !item.html.ogDescription) {
			issues.push(issue(item, 'missing-og', 'medium', 'metadata', 'Live page is missing OpenGraph title or description.', 'Add complete OpenGraph metadata.'));
		}
		if (item.html.jsonLd.length === 0) {
			issues.push(issue(item, 'missing-jsonld', 'high', 'schema', 'Live page has no JSON-LD structured data.', 'Add suitable Schema.org JSON-LD for this page type.'));
		}
		if (item.html.h1.length === 0) {
			issues.push(issue(item, 'missing-h1', 'medium', 'content', 'Live page has no H1.', 'Add one clear H1 that names the page subject.'));
		}
		if (item.html.h1.length > 1) {
			issues.push(issue(item, 'multiple-h1', 'low', 'content', `Live page has ${item.html.h1.length} H1 elements.`, 'Prefer one primary H1 and use H2/H3 for section structure.'));
		}
		const missingAlt = item.html.images.filter((image) => image.src && !image.alt);
		if (missingAlt.length > 0) {
			issues.push(issue(item, 'missing-image-alt', 'medium', 'content', `${missingAlt.length} live images have no alt text.`, 'Add descriptive alt text to content images and empty alt only for decorative images.'));
		}
	}

	return issues;
}

function hasConcreteDynamicMatches(routePattern, inventory) {
	const matcher = dynamicRouteMatcher(routePattern);
	if (!matcher) return false;

	return inventory.some((item) =>
		!item.isDynamic &&
		!item.isEndpoint &&
		isRankablePage(item.urlPath) &&
		matcher.test(item.urlPath)
	);
}

function dynamicRouteMatcher(routePattern) {
	if (!routePattern?.includes('[') && !routePattern?.includes('*')) return null;

	const segments = routePattern.split('/').filter(Boolean);
	const pattern = segments
		.map((segment) => {
			if (segment === '*') return '/[^/]+';
			if (/^\[\[\.\.\.[^\]]+\]\]$/.test(segment)) return '(?:/.+)?';
			if (/^\[\.\.\.[^\]]+\]$/.test(segment)) return '/.+';
			if (/^\[[^\]]+\]$/.test(segment)) return '/[^/]+';
			return `/${escapeRegExp(segment)}`;
		})
		.join('');

	return new RegExp(`^${pattern || '/'}$`);
}

function auditDiscoverability(inventory) {
	const issues = [];
	const byPath = new Map(inventory.map((item) => [item.urlPath, item]));
	const concreteLocal = inventory.filter((item) =>
		!item.isDynamic &&
		!item.isEndpoint &&
		!item.isVirtualConcrete &&
		(item.sources.includes('markdown') || item.sources.includes('route-file')) &&
		!item.sources.includes('sitemap') &&
		!item.sources.includes('sitemap-code') &&
		isRankablePage(item.urlPath) &&
		!item.isRedirect &&
		!item.urlPath.startsWith('/api/') &&
		!item.urlPath.endsWith('.xml') &&
		!item.urlPath.includes('auth')
	);

	for (const item of concreteLocal.slice(0, 80)) {
		issues.push({
			id: `not-in-sitemap-${slugId(item.urlPath)}`,
			severity: 'medium',
			urlPath: item.urlPath,
			category: 'sitemap',
			finding: 'Concrete local route/content page is not represented in sitemap sources.',
			evidence: [`Sources: ${item.sources.join(', ')}`],
			recommendation: 'If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.',
			patchAvailable: false
		});
	}

	const searchItems = inventory.filter((item) => item.sources.includes('search-api'));
	for (const item of searchItems) {
		if (item.absoluteUrl?.startsWith('http') && !item.absoluteUrl.includes('bodharesearch.in')) continue;
		const local = byPath.get(item.urlPath);
		if (local && !local.sources.some((source) => source.includes('sitemap'))) {
			issues.push({
				id: `search-not-sitemap-${slugId(item.urlPath)}`,
				severity: 'low',
				urlPath: item.urlPath,
				category: 'sitemap',
				finding: 'Page appears in search API but not in sitemap sources.',
				evidence: [`Sources: ${item.sources.join(', ')}`],
				recommendation: 'Decide whether searchable pages should also be sitemap-visible.',
				patchAvailable: false
			});
		}
	}

	return issues;
}

export function isRankablePage(urlPath) {
	if (!urlPath) return false;
	if (urlPath.startsWith('/api/')) return false;
	if (urlPath.includes('/auth')) return false;
	if (urlPath === '/members/callback' || urlPath === '/members/signed-in') return false;
	if (urlPath.startsWith('/transition')) return false;
	if (urlPath.startsWith('/test-')) return false;
	if (urlPath.startsWith('/site-docs')) return false;
	if (urlPath === '/docs/[item]') return false;
	if (urlPath === '/wiki/temples/[temple]') return false;
	if (urlPath.startsWith('/docs/privacy') || urlPath.startsWith('/docs/refunds') || urlPath.startsWith('/docs/terms')) {
		return false;
	}
	if (urlPath.endsWith('.xml')) return false;
	return true;
}

export function isExternalPage(item) {
	const value = item.absoluteUrl || item.urlPath || '';
	return /^https?:\/\//.test(value) && !value.includes('bodharesearch.in');
}

function summarize(inventory, issues) {
	const bySeverity = countBy(issues, 'severity');
	const bySource = {};
	for (const item of inventory) {
		for (const source of item.sources || [item.source]) {
			bySource[source] = (bySource[source] || 0) + 1;
		}
	}

	return {
		pages: inventory.length,
		issues: issues.length,
		bySeverity,
		bySource,
		routeFamilies: countBy(inventory, 'routeFamily')
	};
}

export function scoreTopicPage(item, terms) {
	const haystack = [
		item.urlPath,
		item.title,
		item.description,
		...(item.tags || []),
		...(item.headings || [])
	].join(' ').toLowerCase();

	return terms.reduce((score, term) => score + (haystack.includes(term.toLowerCase()) ? 1 : 0), 0);
}

function issue(item, suffix, severity, category, finding, recommendation) {
	return {
		id: `${suffix}-${slugId(item.urlPath)}`,
		severity,
		urlPath: item.urlPath,
		category,
		finding,
		evidence: item.discoveredFrom || [],
		recommendation,
		patchAvailable: ['metadata', 'schema', 'sitemap'].includes(category)
	};
}

function countBy(items, key) {
	return items.reduce((acc, item) => {
		const value = item[key] || 'unknown';
		acc[value] = (acc[value] || 0) + 1;
		return acc;
	}, {});
}

function slugId(value) {
	return String(value || 'root').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'root';
}

function escapeRegExp(value) {
	return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
