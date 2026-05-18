#!/usr/bin/env node
import { auditInventory, auditSinglePage, auditTopic } from './audit.mjs';
import { collectInventory } from './inventory.mjs';
import { writePageReport, writeSiteReports, writeTopicReport } from './reports.mjs';

const args = process.argv.slice(2);
const command = args[0] || 'audit';

main().catch((error) => {
	console.error(error.stack || error.message);
	process.exit(1);
});

async function main() {
	if (command === 'audit') {
		const live = args.includes('--live');
		const limit = numberArg('--limit') || 40;
		const inventory = await collectInventory({ live, limit });
		const result = auditInventory(inventory, { live, limit });
		await writeSiteReports(result);
		printSummary(result);
		return;
	}

	if (command === 'page') {
		const urlPath = args[1];
		if (!urlPath) usage('Missing page path. Example: node tools/bodha-seo/src/cli.mjs page /research/hindu-frameworks-of-education');
		const live = args.includes('--live');
		const inventory = await collectInventory({ live, limit: numberArg('--limit') || 40 });
		const result = auditSinglePage(inventory, urlPath);
		await writePageReport(result, `page-${slug(urlPath)}`);
		console.log(`Wrote reports/seo/page-${slug(urlPath)}.json`);
		console.log(`Wrote reports/seo/page-${slug(urlPath)}.md`);
		return;
	}

	if (command === 'topic') {
		const topicKey = args[1];
		if (!topicKey) usage('Missing topic key. Example: node tools/bodha-seo/src/cli.mjs topic hindu-temple');
		const live = args.includes('--live');
		const inventory = await collectInventory({ live, limit: numberArg('--limit') || 40 });
		const issues = auditTopic(inventory, topicKey);
		await writeTopicReport(topicKey, issues);
		console.log(`Wrote reports/seo/topic-${topicKey}.json`);
		console.log(`Wrote reports/seo/topic-${topicKey}.md`);
		return;
	}

	if (command === 'help' || command === '--help' || command === '-h') {
		usage();
		return;
	}

	usage(`Unknown command: ${command}`);
}

function printSummary(result) {
	console.log('Bodha SEO audit complete');
	console.log(`Inventory pages: ${result.summary.pages}`);
	console.log(`Issues: ${result.summary.issues}`);
	console.log(`Critical: ${result.summary.bySeverity.critical || 0}`);
	console.log(`High: ${result.summary.bySeverity.high || 0}`);
	console.log(`Medium: ${result.summary.bySeverity.medium || 0}`);
	console.log(`Low: ${result.summary.bySeverity.low || 0}`);
	console.log('Wrote reports/seo/site-audit.json');
	console.log('Wrote reports/seo/site-audit.md');
}

function usage(message = '') {
	if (message) console.error(message);
	console.log(`
Bodha SEO Optimizer

Commands:
  audit [--live] [--limit N]         Build inventory and write site audit reports
  page <path> [--live]               Audit one page from the inventory
  topic <topic-key> [--live]         Audit a topic cluster

Examples:
  node tools/bodha-seo/src/cli.mjs audit
  node tools/bodha-seo/src/cli.mjs audit --live --limit 25
  node tools/bodha-seo/src/cli.mjs page /core/indian-knowledge-systems
  node tools/bodha-seo/src/cli.mjs topic hindu-temple
`);
	process.exit(message ? 1 : 0);
}

function numberArg(name) {
	const index = args.indexOf(name);
	if (index === -1) return 0;
	const value = Number(args[index + 1]);
	return Number.isFinite(value) ? value : 0;
}

function slug(value) {
	return String(value).replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'root';
}

