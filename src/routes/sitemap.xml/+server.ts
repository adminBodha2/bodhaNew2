import { tagsWithCountsAlphabetical, writersWithCountsAlphabetical } from '$lib/utils/localpulls';
import tagData from '$lib/serving/tag-index.json';

const BASE = 'https://www.bodharesearch.in';

const STATIC_ROUTES = [
	{ path: '/',              priority: '1.0', changefreq: 'weekly'  },
	{ path: '/blog',          priority: '0.9', changefreq: 'weekly'  },
	{ path: '/research',      priority: '0.9', changefreq: 'monthly' },
	{ path: '/academy',       priority: '0.8', changefreq: 'monthly' },
	{ path: '/inspiration',   priority: '0.8', changefreq: 'monthly' },
	{ path: '/big-questions', priority: '0.8', changefreq: 'monthly' },
	{ path: '/library',       priority: '0.7', changefreq: 'monthly' },
	{ path: '/team',          priority: '0.6', changefreq: 'yearly'  },
	{ path: '/videos',        priority: '0.6', changefreq: 'monthly' },
	{ path: '/anveshi',       priority: '0.7', changefreq: 'monthly' },
];

function pathsFrom(glob: Record<string, unknown>): string[] {
	return Object.keys(glob).map(p => p.slice(11, -3)); // /src/routes/foo/bar.md → /foo/bar
}

export async function GET() {
	const blogPaths       = pathsFrom(import.meta.glob('/src/routes/blog/*.md'));
	const bqPaths         = pathsFrom(import.meta.glob('/src/routes/big-questions/*.md'));
	const inspirationPaths= pathsFrom(import.meta.glob('/src/routes/inspiration/*.md'));
	const researchPaths   = pathsFrom(import.meta.glob('/src/routes/research/*.md'));

	const [blogTags, writers] = await Promise.all([
		tagsWithCountsAlphabetical(),
		writersWithCountsAlphabetical(),
	]);

	const siteTagPaths   = Object.keys(tagData).map(tag => `/tags/${tag}`);
	const blogTagPaths   = blogTags.map(t => `/blog/tags/${t.tag}`);
	const writerPaths    = writers.map(w => `/blog/writers/${encodeURIComponent(w.writer)}`);

	const urls = [
		...STATIC_ROUTES.map(r => ({ ...r })),
		...blogPaths.map(p       => ({ path: p, priority: '0.8', changefreq: 'monthly' })),
		...researchPaths.map(p   => ({ path: p, priority: '0.8', changefreq: 'monthly' })),
		...bqPaths.map(p         => ({ path: p, priority: '0.7', changefreq: 'monthly' })),
		...inspirationPaths.map(p=> ({ path: p, priority: '0.7', changefreq: 'monthly' })),
		...blogTagPaths.map(p    => ({ path: p, priority: '0.5', changefreq: 'weekly'  })),
		...writerPaths.map(p     => ({ path: p, priority: '0.5', changefreq: 'monthly' })),
		...siteTagPaths.map(p    => ({ path: p, priority: '0.5', changefreq: 'weekly'  })),
	];

	const today = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ path, priority, changefreq }) => `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600',
		},
	});
}
