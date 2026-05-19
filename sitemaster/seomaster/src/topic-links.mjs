import path from 'node:path';
import { collectInventory } from './inventory.mjs';
import { REPO_ROOT, TOPIC_CLUSTERS, absoluteUrl, routeFamily } from './config.mjs';
import { isExternalPage, isRankablePage, scoreTopicPage } from './audit.mjs';
import { writeJson } from './fs-utils.mjs';

export const TOPIC_LINKS_PATH = path.join(REPO_ROOT, 'src/lib/generated/seo-topic-links.json');

export async function writeTopicLinks(options = {}) {
	const inventory = await collectInventory(options);
	const topicLinks = buildTopicLinks(inventory, options);
	await writeJson(TOPIC_LINKS_PATH, topicLinks);
	return { filePath: TOPIC_LINKS_PATH, topicLinks };
}

export function buildTopicLinks(inventory, options = {}) {
	const limit = Number.isFinite(options.linkLimit) && options.linkLimit > 0 ? options.linkLimit : 10;

	return {
		generatedAt: new Date().toISOString(),
		source: 'sitemaster/seomaster',
		topics: Object.fromEntries(
			Object.entries(TOPIC_CLUSTERS).map(([topicKey, cluster]) => [
				topicKey,
				buildTopicLinkCluster(inventory, topicKey, cluster, limit)
			])
		)
	};
}

function buildTopicLinkCluster(inventory, topicKey, cluster, limit) {
	const hub = pickHub(inventory, cluster);
	const supportingPages = inventory
		.filter((item) => item.urlPath !== hub)
		.filter((item) => isRankablePage(item.urlPath) && !isExternalPage(item))
		.map((item) => ({ item, score: scoreTopicPage(item, cluster.terms) }))
		.filter(({ score }) => score > 0)
		.sort(sortByScoreThenTitle)
		.slice(0, limit)
		.map(({ item, score }) => ({
			urlPath: item.urlPath,
			absoluteUrl: absoluteUrl(item.urlPath),
			title: cleanText(item.title) || item.urlPath,
			description: cleanText(item.description),
			score,
			routeFamily: item.routeFamily || routeFamily(item.urlPath),
			sources: item.sources || []
		}));

	return {
		key: topicKey,
		label: cluster.label,
		hub,
		hubAbsoluteUrl: absoluteUrl(hub),
		terms: cluster.terms,
		supportingPages
	};
}

function pickHub(inventory, cluster) {
	if (cluster.primaryHub) return cluster.primaryHub;
	const discoverableHub = cluster.expectedHubs?.find((hub) =>
		inventory.some((item) => item.urlPath === hub)
	);
	return discoverableHub || cluster.expectedHubs?.[0] || '/';
}

function sortByScoreThenTitle(a, b) {
	if (b.score !== a.score) return b.score - a.score;
	return (a.item.title || a.item.urlPath).localeCompare(b.item.title || b.item.urlPath);
}

function cleanText(value) {
	return String(value || '').replace(/\s+/g, ' ').trim();
}
