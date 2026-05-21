import type { PageLoad } from './$types';
import { allResearch } from '$lib/utils/localpulls';

type ResearchEntry = {
	linkpath: string;
	meta: {
		id?: number | string;
		title: string;
		type?: string;
		image?: string;
	};
};

const pillarMeta: Record<string, { title: string; image: string; order: number }> = {
	'institutional design': {
		title: 'Institutional Design',
		image: '/images/research-1.webp',
		order: 1
	},
	'policy and strategic affairs': {
		title: 'Policy and Strategic Affairs',
		image: '/images/research-2.webp',
		order: 2
	},
	'purva paksha of western institutions': {
		title: 'Purva Paksha Project',
		image: '/images/research-3.webp',
		order: 3
	}
};

function titleCase(value: string) {
	return value
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function compareByResearchId(a: ResearchEntry, b: ResearchEntry) {
	const aId = Number(a.meta.id);
	const bId = Number(b.meta.id);

	if (Number.isFinite(aId) && Number.isFinite(bId)) {
		return aId - bId;
	}

	if (Number.isFinite(aId)) return -1;
	if (Number.isFinite(bId)) return 1;

	return a.meta.title.localeCompare(b.meta.title);
}

export const load: PageLoad = async () => {
	const research = (await allResearch()) as ResearchEntry[];
	const grouped = new Map<string, ResearchEntry[]>();

	for (const item of research) {
		const key = item.meta.type?.trim().toLowerCase() || 'other research';
		grouped.set(key, [...(grouped.get(key) ?? []), item]);
	}

	const researchAreas = [...grouped.entries()]
		.map(([type, items]) => {
			const fallbackImage = items.find((item) => item.meta.image)?.meta.image ?? '/images/key-research.webp';
			const meta = pillarMeta[type] ?? {
				title: titleCase(type),
				image: fallbackImage,
				order: 100
			};

			return {
				title: meta.title,
				image: meta.image,
				order: meta.order,
				items: [...items]
					.sort(compareByResearchId)
					.map((item) => ({
						label: item.meta.title,
						href: item.linkpath
					}))
			};
		})
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

	return {
		researchAreas
	};
};
