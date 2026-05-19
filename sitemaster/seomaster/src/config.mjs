import path from 'node:path';

export const SITE_URL = 'https://www.bodharesearch.in';
export const REPO_ROOT = path.resolve(process.cwd());
export const ROUTES_DIR = path.join(REPO_ROOT, 'src/routes');
export const REPORT_DIR = path.join(REPO_ROOT, 'sitemaster/seomaster/reports');

export const ROUTE_FAMILIES = [
	'blog',
	'research',
	'big-questions',
	'library',
	'concepts',
	'explorer',
	'tags',
	'inspiration',
	'core',
	'lab',
	'anveshi',
	'wiki',
	'ontology',
	'videos'
];

export const TOPIC_CLUSTERS = {
	'hindu-temple': {
		label: 'Temple / Hindu Temple',
		primaryHub: '/wiki/temples',
		terms: [
			'hindu temple',
			'temple',
			'mandir',
			'mandira',
			'kshetra',
			'tirtha',
			'pilgrimage',
			'sacred geography',
			'deity',
			'murti',
			'jyotirlinga',
			'shakti pitha',
			'char dham',
			'saptapuri',
			'temple architecture'
		],
		expectedHubs: ['/wiki/temples', '/core/temple', '/research/temples-of-madhya-pradesh']
	},
	'indian-knowledge-systems': {
		label: 'Indian Knowledge Systems / Education',
		primaryHub: '/wiki/indian-knowledge-systems-and-education',
		terms: [
			'indian knowledge systems',
			'indian knowledge systems and education',
			'iks',
			'sanskrit',
			'shastra',
			'darshana',
			'ayurveda',
			'ganita',
			'vyakarana',
			'nyaya',
			'mimamsa',
			'gurukula',
			'traditional education',
			'hindu education',
			'civilizational learning',
			'dharampal'
		],
		expectedHubs: [
			'/wiki/indian-knowledge-systems-and-education',
			'/core/indian-knowledge-systems',
			'/library/paths/indian-knowledge-systems',
			'/research/hindu-frameworks-of-education'
		]
	},
	dharma: {
		label: 'Dharma',
		primaryHub: '/big-questions/core-of-sanatana-dharma',
		terms: [
			'dharma',
			'sanatana dharma',
			'dharmic',
			'hindu ethics',
			'hindu law',
			'purushartha',
			'seva',
			'dana',
			'hindu family',
			'polity'
		],
		expectedHubs: ['/big-questions/core-of-sanatana-dharma', '/core/dharma', '/core/sanatana-dharma']
	}
};

export function absoluteUrl(urlPath) {
	if (!urlPath) return SITE_URL;
	if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) return urlPath;
	return `${SITE_URL}${urlPath.startsWith('/') ? urlPath : `/${urlPath}`}`;
}

export function routeFamily(urlPath) {
	const clean = urlPath.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
	const first = clean.split('/').filter(Boolean)[0];
	return first || 'home';
}
