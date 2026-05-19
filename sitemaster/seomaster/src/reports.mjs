import path from 'node:path';
import { REPORT_DIR } from './config.mjs';
import { writeJson, writeText } from './fs-utils.mjs';

export async function writeSiteReports(result) {
	await writeJson(path.join(REPORT_DIR, 'site-audit.json'), result);
	await writeText(path.join(REPORT_DIR, 'site-audit.md'), siteAuditMarkdown(result));
}

export async function writePageReport(result, slug = 'page-audit') {
	await writeJson(path.join(REPORT_DIR, `${slug}.json`), result);
	await writeText(path.join(REPORT_DIR, `${slug}.md`), pageAuditMarkdown(result));
}

export async function writeTopicReport(topicKey, issues) {
	const result = {
		generatedAt: new Date().toISOString(),
		topic: topicKey,
		issues
	};
	await writeJson(path.join(REPORT_DIR, `topic-${topicKey}.json`), result);
	await writeText(path.join(REPORT_DIR, `topic-${topicKey}.md`), topicMarkdown(topicKey, issues));
}

function siteAuditMarkdown(result) {
	const lines = [
		'# Bodha SEO Site Audit',
		'',
		`Generated: ${result.generatedAt}`,
		'',
		'## Summary',
		'',
		`- Inventory pages: ${result.summary.pages}`,
		`- Issues: ${result.summary.issues}`,
		`- Critical: ${result.summary.bySeverity.critical || 0}`,
		`- High: ${result.summary.bySeverity.high || 0}`,
		`- Medium: ${result.summary.bySeverity.medium || 0}`,
		`- Low: ${result.summary.bySeverity.low || 0}`,
		'',
		'## Inventory Sources',
		''
	];

	for (const [source, count] of Object.entries(result.summary.bySource).sort()) {
		lines.push(`- ${source}: ${count}`);
	}

	lines.push('', '## Route Families', '');
	for (const [family, count] of Object.entries(result.summary.routeFamilies).sort()) {
		lines.push(`- ${family}: ${count}`);
	}

	lines.push('', '## Top Issues', '');
	for (const issue of sortedIssues(result.issues).slice(0, 80)) {
		lines.push(formatIssue(issue));
	}

	return `${lines.join('\n')}\n`;
}

function pageAuditMarkdown(result) {
	const lines = [
		'# Bodha SEO Page Audit',
		'',
		`Generated: ${result.generatedAt}`,
		'',
		result.page ? `Page: ${result.page.urlPath}` : `Page: ${result.urlPath}`,
		'',
		'## Issues',
		''
	];

	for (const issue of sortedIssues(result.issues)) {
		lines.push(formatIssue(issue));
	}

	return `${lines.join('\n')}\n`;
}

function topicMarkdown(topicKey, issues) {
	const lines = [
		`# Bodha SEO Topic Audit: ${topicKey}`,
		'',
		`Generated: ${new Date().toISOString()}`,
		'',
		'## Issues And Findings',
		''
	];

	for (const issue of sortedIssues(issues)) {
		lines.push(formatIssue(issue));
	}

	if (issues.length === 0) {
		lines.push('No actionable topic issues found.');
	}

	return `${lines.join('\n')}\n`;
}

function formatIssue(issue) {
	const lines = [
		`### [${issue.severity}] ${issue.finding}`,
		'',
		`- Route: \`${issue.urlPath}\``,
		`- Category: \`${issue.category}\``,
		`- Patch available: ${issue.patchAvailable ? 'yes' : 'no'}`,
		`- Recommendation: ${issue.recommendation}`
	];

	if (issue.evidence?.length) {
		lines.push('- Evidence:');
		for (const evidence of issue.evidence.slice(0, 8)) {
			lines.push(`  - ${evidence}`);
		}
	}

	lines.push('');
	return lines.join('\n');
}

function sortedIssues(issues) {
	const weight = { critical: 0, high: 1, medium: 2, low: 3 };
	return [...issues].sort((a, b) => {
		const bySeverity = (weight[a.severity] ?? 9) - (weight[b.severity] ?? 9);
		if (bySeverity !== 0) return bySeverity;
		return a.urlPath.localeCompare(b.urlPath);
	});
}
