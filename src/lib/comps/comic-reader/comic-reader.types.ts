export type ReadingDirection = 'ltr' | 'rtl';

export type ComicReaderPage = {
	id: string;
	src: string;
	alt?: string;
	aspectRatio?: number;
};

export type ComicReaderProps = {
	id: string;
	title?: string;
	pages: ComicReaderPage[];
	pageAspectRatio?: number;
	readingDirection?: ReadingDirection;
	spreadMode?: boolean;
	hasCover?: boolean;
	initialPageIndex?: number;
	persistProgress?: boolean;
	class?: string;
};

