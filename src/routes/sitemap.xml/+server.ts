import { blogContentPaths, tagsWithCountsAlphabetical, writersWithCountsAlphabetical } from '$lib/utils/blogpulls';
import { getAkVargas } from '$lib/ontology';
import tagData from '$lib/serving/tag-index.json';

const BASE = 'https://www.bodharesearch.in';

const STATIC_ROUTES = [
	{ path: '/',              priority: '1.0', changefreq: 'weekly'  },
	{ path: '/about',         priority: '0.8', changefreq: 'monthly' },
	{ path: '/blog',          priority: '0.9', changefreq: 'weekly'  },
	{ path: '/blog/external-posts', priority: '0.6', changefreq: 'monthly' },
	{ path: '/blog/tags',     priority: '0.6', changefreq: 'weekly'  },
	{ path: '/blog/writers',  priority: '0.6', changefreq: 'monthly' },
	{ path: '/concepts',      priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact',       priority: '0.5', changefreq: 'yearly'  },
	{ path: '/designbodha',   priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs',          priority: '0.4', changefreq: 'yearly'  },
	{ path: '/explorer',      priority: '0.7', changefreq: 'monthly' },
	{ path: '/explorer/graph', priority: '0.6', changefreq: 'monthly' },
	{ path: '/research',      priority: '0.9', changefreq: 'monthly' },
	{ path: '/academy',       priority: '0.8', changefreq: 'monthly' },
	{ path: '/academy/courses', priority: '0.7', changefreq: 'monthly' },
	{ path: '/academy/courses/introduction-to-shri-ram-swarup', priority: '0.7', changefreq: 'yearly' },
	{ path: '/inspiration',   priority: '0.8', changefreq: 'monthly' },
	{ path: '/big-questions', priority: '0.8', changefreq: 'monthly' },
	{ path: '/lab',           priority: '0.7', changefreq: 'weekly'  },
	{ path: '/ontology',      priority: '0.7', changefreq: 'monthly' },
	{ path: '/library',       priority: '0.7', changefreq: 'monthly' },
	{ path: '/library/journal-archaeology', priority: '0.7', changefreq: 'monthly' },
	{ path: '/members',       priority: '0.5', changefreq: 'monthly' },
	{ path: '/newsletter',    priority: '0.7', changefreq: 'monthly' },
	{ path: '/team',          priority: '0.6', changefreq: 'yearly'  },
	{ path: '/videos',        priority: '0.6', changefreq: 'monthly' },
	{ path: '/wiki',          priority: '0.7', changefreq: 'monthly' },
	{ path: '/wiki/temples',  priority: '0.8', changefreq: 'monthly' },
	{ path: '/wiki/indian-knowledge-systems-and-education', priority: '0.8', changefreq: 'monthly' },
	{ path: '/anveshi',       priority: '0.7', changefreq: 'monthly' },
	{ path: '/anveshi/badami', priority: '0.7', changefreq: 'monthly' },
	{ path: '/anveshi/gujarat', priority: '0.6', changefreq: 'monthly' },
	{ path: '/anveshi/kannur', priority: '0.6', changefreq: 'monthly' },
	{ path: '/anveshi/kullu',  priority: '0.6', changefreq: 'monthly' },
	{ path: '/aryavarta',      priority: '0.7', changefreq: 'monthly' },
	{ path: '/aryavarta/v1-i1', priority: '0.6', changefreq: 'monthly' },
];

function pathsFrom(glob: Record<string, unknown>): string[] {
	return Object.keys(glob).map(p => p.slice(11, -3).replace(/\/\([^/]+\)/g, '')); // /src/routes/(group)/foo/bar.md → /foo/bar
}

export async function GET() {
	const blogPaths       = blogContentPaths();
	const bqPaths         = pathsFrom(import.meta.glob('/src/routes/big-questions/*.md'));
	const corePaths       = pathsFrom(import.meta.glob('/src/routes/core/*.md'));
	const designBodhaPaths= pathsFrom(import.meta.glob('/src/routes/designbodha/*.md'));
	const inspirationPaths= pathsFrom(import.meta.glob('/src/routes/inspiration/*.md'));
	const labPaths        = pathsFrom(import.meta.glob('/src/routes/lab/*.md'));
	const journalArchaeologyPaths = pathsFrom(import.meta.glob('/src/routes/library/(library-subroutes)/journal-archaeology/*.md'));
	const libraryPathPaths = pathsFrom(import.meta.glob('/src/routes/library/(library-subroutes)/paths/*.md'));
	const newsletterPaths  = pathsFrom(import.meta.glob('/src/routes/newsletter/*.md'));
	const researchPaths   = pathsFrom(import.meta.glob('/src/routes/research/*.md'));

	const [blogTags, writers] = await Promise.all([
		tagsWithCountsAlphabetical(),
		writersWithCountsAlphabetical(),
	]);

	const siteTagPaths   = Object.keys(tagData).map(tag => `/tags/${tag}`);
	const blogTagPaths   = blogTags.map(t => `/blog/tags/${t.tag}`);
	const writerPaths    = writers.map(w => `/blog/writers/${encodeURIComponent(w.writer)}`);
	const ontologyPaths  = getAkVargas().map(varga => `/ontology/${varga.slug}`);

	const urls = [
		...STATIC_ROUTES.map(r => ({ ...r })),
		...blogPaths.map(p       => ({ path: p, priority: '0.8', changefreq: 'monthly' })),
		...corePaths.map(p       => ({ path: p, priority: '0.8', changefreq: 'monthly' })),
		...designBodhaPaths.map(p=> ({ path: p, priority: '0.7', changefreq: 'monthly' })),
		...researchPaths.map(p   => ({ path: p, priority: '0.8', changefreq: 'monthly' })),
		...bqPaths.map(p         => ({ path: p, priority: '0.7', changefreq: 'monthly' })),
		...inspirationPaths.map(p=> ({ path: p, priority: '0.7', changefreq: 'monthly' })),
		...labPaths.map(p        => ({ path: p, priority: '0.6', changefreq: 'weekly' })),
		...journalArchaeologyPaths.map(p => ({ path: p, priority: '0.6', changefreq: 'monthly' })),
		...libraryPathPaths.map(p => ({ path: p, priority: '0.6', changefreq: 'monthly' })),
		...newsletterPaths.map(p => ({ path: p, priority: '0.6', changefreq: 'monthly' })),
		...ontologyPaths.map(p  => ({ path: p, priority: '0.6', changefreq: 'monthly' })),
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
