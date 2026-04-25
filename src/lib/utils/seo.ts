export const SITE_URL = 'https://www.bodharesearch.in';
export const SITE_NAME = 'Bodha';
export const DEFAULT_IMAGE = `${SITE_URL}/images/bodhacover.png`;

type JsonObject = Record<string, unknown>;

function cleanObject<T extends JsonObject>(object: T): T {
	return Object.fromEntries(
		Object.entries(object).filter(([, value]) => value !== undefined && value !== null && value !== '')
	) as T;
}

export function absoluteUrl(pathOrUrl: string) {
	if (!pathOrUrl) return SITE_URL;
	if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
	return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function absoluteImage(pathOrUrl: string | undefined | null) {
	return absoluteUrl(pathOrUrl || DEFAULT_IMAGE);
}

export function stringifyJsonLd(data: unknown) {
	return JSON.stringify(data);
}

export function withContext(type: string, data: JsonObject) {
	return cleanObject({
		'@context': 'https://schema.org',
		'@type': type,
		...data
	});
}

export function organizationJsonLd() {
	return withContext('Organization', {
		name: SITE_NAME,
		url: SITE_URL,
		logo: DEFAULT_IMAGE,
		sameAs: [
			'https://x.com/BodhaResearch',
			'https://www.instagram.com/bodharesearch',
			'https://www.linkedin.com/company/bodha-research/'
		]
	});
}

export function websiteJsonLd() {
	return withContext('WebSite', {
		name: SITE_NAME,
		url: SITE_URL
	});
}

type WebPageJsonLdInput = {
	name: string;
	description: string;
	url: string;
	image?: string;
	type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
};

export function webPageJsonLd({
	name,
	description,
	url,
	image = DEFAULT_IMAGE,
	type = 'WebPage'
}: WebPageJsonLdInput) {
	return withContext(type, {
		name,
		description,
		url: absoluteUrl(url),
		image: absoluteImage(image),
		isPartOf: {
			'@type': 'WebSite',
			name: SITE_NAME,
			url: SITE_URL
		}
	});
}

type ItemListEntry = {
	name: string;
	url: string;
	description?: string;
};

type CollectionPageJsonLdInput = {
	name: string;
	description: string;
	url: string;
	image?: string;
	items: ItemListEntry[];
};

export function collectionPageJsonLd({
	name,
	description,
	url,
	image = DEFAULT_IMAGE,
	items
}: CollectionPageJsonLdInput) {
	return {
		...webPageJsonLd({
			name,
			description,
			url,
			image,
			type: 'CollectionPage'
		}),
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: items.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				description: item.description,
				url: absoluteUrl(item.url)
			}))
		}
	};
}

type ArticleJsonLdInput = {
	headline: string;
	description: string;
	url: string;
	image?: string;
	datePublished?: string;
	author?: string | string[];
	section?: string;
};

export function articleJsonLd({
	headline,
	description,
	url,
	image = DEFAULT_IMAGE,
	datePublished,
	author,
	section
}: ArticleJsonLdInput) {
	const authors = Array.isArray(author) ? author : author ? [author] : [];

	return withContext('Article', {
		headline,
		description,
		url: absoluteUrl(url),
		image: absoluteImage(image),
		datePublished,
		articleSection: section,
		author: authors.map((name) => ({
			'@type': 'Person',
			name
		})),
		publisher: {
			'@type': 'Organization',
			name: SITE_NAME,
			url: SITE_URL
		}
	});
}

type BookJsonLdInput = {
	name: string;
	description: string;
	url: string;
	image?: string;
	author?: string | string[];
	keywords?: string[];
};

export function bookJsonLd({
	name,
	description,
	url,
	image = DEFAULT_IMAGE,
	author,
	keywords
}: BookJsonLdInput) {
	const authors = Array.isArray(author) ? author : author ? [author] : [];

	return withContext('Book', {
		name,
		description,
		url: absoluteUrl(url),
		image: absoluteImage(image),
		keywords: keywords?.join(', '),
		author: authors.map((authorName) => ({
			'@type': 'Person',
			name: authorName
		}))
	});
}

type CourseJsonLdInput = {
	name: string;
	description: string;
	url: string;
	image?: string;
	instructor?: string;
	price?: string;
	priceCurrency?: string;
	availability?: string;
};

export function courseJsonLd({
	name,
	description,
	url,
	image = DEFAULT_IMAGE,
	instructor,
	price,
	priceCurrency = 'INR',
	availability
}: CourseJsonLdInput) {
	return withContext('Course', {
		name,
		description,
		url: absoluteUrl(url),
		image: absoluteImage(image),
		provider: {
			'@type': 'Organization',
			name: SITE_NAME,
			url: SITE_URL
		},
		instructor: instructor
			? {
					'@type': 'Person',
					name: instructor
				}
			: undefined,
		offers: price
			? {
					'@type': 'Offer',
					price,
					priceCurrency,
					availability,
					url: absoluteUrl(url)
				}
			: undefined
	});
}

type TouristTripJsonLdInput = {
	name: string;
	description: string;
	url: string;
	image?: string;
	itinerary?: Array<{ name: string; description?: string }>;
};

export function touristTripJsonLd({
	name,
	description,
	url,
	image = DEFAULT_IMAGE,
	itinerary
}: TouristTripJsonLdInput) {
	return withContext('TouristTrip', {
		name,
		description,
		url: absoluteUrl(url),
		image: absoluteImage(image),
		provider: {
			'@type': 'Organization',
			name: SITE_NAME,
			url: SITE_URL
		},
		itinerary: itinerary?.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			description: item.description
		}))
	});
}
