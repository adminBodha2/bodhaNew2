import type { ReadingDirection } from './comic-reader.types';

export type DisplayedPageOptions = {
	pageIndex: number;
	pageCount: number;
	spreadMode: boolean;
	hasCover: boolean;
	readingDirection: ReadingDirection;
	isMobile: boolean;
};

export type PageStepOptions = {
	pageIndex: number;
	pageCount: number;
	spreadMode: boolean;
	hasCover: boolean;
};

export function clampPageIndex(pageIndex: number, pageCount: number): number {
	if (pageCount <= 0) return 0;
	return Math.min(Math.max(Math.round(pageIndex), 0), pageCount - 1);
}

export function getDisplayedPageIndexes(options: DisplayedPageOptions): number[] {
	const pageIndex = clampPageIndex(options.pageIndex, options.pageCount);

	if (options.pageCount <= 0) return [];
	if (options.isMobile || !options.spreadMode || (options.hasCover && pageIndex === 0)) {
		return [pageIndex];
	}

	const partnerIndex = getSpreadPartnerIndex(options);
	const indexes = [pageIndex, partnerIndex]
		.filter((index) => index >= 0 && index < options.pageCount)
		.sort((a, b) => a - b);

	return options.readingDirection === 'rtl' ? indexes.reverse() : indexes;
}

export function getNextPageIndex(options: PageStepOptions): number {
	const current = getLogicalGroup(options);
	const anchor = Math.max(...current) + 1;
	return clampPageIndex(anchor, options.pageCount);
}

export function getPreviousPageIndex(options: PageStepOptions): number {
	const current = getLogicalGroup(options);
	const anchor = Math.min(...current) - 1;
	const previousGroup = getLogicalGroup({
		...options,
		pageIndex: anchor
	});

	return clampPageIndex(Math.min(...previousGroup), options.pageCount);
}

function getLogicalGroup(options: PageStepOptions): number[] {
	return getDisplayedPageIndexes({
		...options,
		readingDirection: 'ltr',
		isMobile: false
	});
}

function getSpreadPartnerIndex(options: Pick<DisplayedPageOptions, 'pageIndex' | 'hasCover'>): number {
	if (options.hasCover) {
		return options.pageIndex % 2 === 1 ? options.pageIndex + 1 : options.pageIndex - 1;
	}

	return options.pageIndex % 2 === 0 ? options.pageIndex + 1 : options.pageIndex - 1;
}

