import assert from 'node:assert/strict';
import {
	clampPageIndex,
	getDisplayedPageIndexes,
	getNextPageIndex,
	getPreviousPageIndex
} from '../../src/lib/comps/comic-reader/comic-reader.logic';

assert.equal(clampPageIndex(-3, 5), 0);
assert.equal(clampPageIndex(99, 5), 4);
assert.equal(clampPageIndex(2, 5), 2);

assert.deepEqual(
	getDisplayedPageIndexes({
		pageIndex: 0,
		pageCount: 5,
		spreadMode: true,
		hasCover: true,
		readingDirection: 'rtl',
		isMobile: false
	}),
	[0]
);

assert.deepEqual(
	getDisplayedPageIndexes({
		pageIndex: 1,
		pageCount: 5,
		spreadMode: true,
		hasCover: true,
		readingDirection: 'rtl',
		isMobile: false
	}),
	[2, 1]
);

assert.equal(getNextPageIndex({ pageIndex: 1, pageCount: 5, spreadMode: true, hasCover: true }), 3);
assert.equal(getPreviousPageIndex({ pageIndex: 3, pageCount: 5, spreadMode: true, hasCover: true }), 1);

console.log('comic-reader navigation tests passed');
