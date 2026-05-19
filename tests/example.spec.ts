import { expect, test } from '@playwright/test';

const ignoredLocalPaths = new Set([
	'/_vercel/insights/script.js',
	'/_vercel/speed-insights/script.js'
]);

const ignoredConsolePatterns = [
	'Failed to load resource:',
	'TypeError: Failed to fetch'
];

test('public sitemap pages render without missing local assets', async ({ page, request, baseURL }) => {
	test.setTimeout(120_000);

	if (!baseURL) throw new Error('baseURL is not configured');

	const base = new URL(baseURL);
	const sitemap = await request.get('/sitemap.xml');
	expect(sitemap.ok()).toBeTruthy();

	const xml = await sitemap.text();
	const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
		.map((match) => new URL(match[1]).pathname)
		.filter((path, index, all) => all.indexOf(path) === index);

	expect(paths.length).toBeGreaterThan(0);

	const failures: string[] = [];

	page.on('console', (message) => {
		if (message.type() === 'error') {
			const text = message.text();
			if (
				!ignoredConsolePatterns.some((pattern) => text.includes(pattern)) &&
				![...ignoredLocalPaths].some((path) => text.includes(path))
			) {
				failures.push(`console error: ${text}`);
			}
		}
	});

	page.on('pageerror', (error) => {
		failures.push(`page error: ${error.message}`);
	});

	page.on('response', (response) => {
		const url = new URL(response.url());
		if (url.origin === base.origin && response.status() >= 400 && !ignoredLocalPaths.has(url.pathname)) {
			failures.push(`${response.status()} ${url.pathname}`);
		}
	});

	for (const path of paths) {
		failures.length = 0;

		const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
		expect(response?.ok(), `${path} returned ${response?.status()}`).toBeTruthy();

		await expect(page.locator('body')).toBeVisible();
		expect(failures, `Failures on ${path}`).toEqual([]);
	}
});
