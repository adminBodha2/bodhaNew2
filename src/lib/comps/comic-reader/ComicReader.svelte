<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import {
		clampPageIndex,
		getDisplayedPageIndexes,
		getNextPageIndex,
		getPreviousPageIndex
	} from './comic-reader.logic';
	import type { ComicReaderPage, ComicReaderProps, ReadingDirection } from './comic-reader.types';
	import './comic-reader.sass';

	let {
		id,
		title = 'Comic reader',
		pages,
		pageAspectRatio = 2 / 3,
		readingDirection = 'ltr',
		spreadMode = false,
		hasCover = true,
		initialPageIndex = 0,
		persistProgress = true,
		class: className = ''
	}: ComicReaderProps = $props();

	function getInitialPageIndex() {
		return initialPageIndex;
	}

	let currentPageIndex = $state(getInitialPageIndex());
	let expanded = $state(false);
	let width = $state(0);
	let zoomScale = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let dragStart:
		| {
				pointerId: number;
				x: number;
				y: number;
				panX: number;
				panY: number;
				panning: boolean;
		  }
		| null = $state(null);

	let pageCount = $derived(pages.length);
	let isMobile = $derived(width > 0 && width <= 720);
	let canGoPrevious = $derived(currentPageIndex > 0);
	let canGoNext = $derived(currentPageIndex < pageCount - 1);
	let storageKey = $derived(`bodha-comic-reader:${id}:page`);
	let visibleIndexes = $derived(
		getDisplayedPageIndexes({
			pageIndex: currentPageIndex,
			pageCount,
			spreadMode,
			hasCover,
			readingDirection,
			isMobile
		})
	);

	onMount(() => {
		if (!persistProgress) return;

		const savedPage = Number(localStorage.getItem(storageKey));
		if (Number.isFinite(savedPage)) {
			currentPageIndex = clampPageIndex(savedPage, pageCount);
		}
	});

	$effect(() => {
		currentPageIndex = clampPageIndex(currentPageIndex, pageCount);
	});

	$effect(() => {
		if (!browser || !persistProgress || pageCount === 0) return;
		localStorage.setItem(storageKey, String(currentPageIndex));
	});

	function pageRatio(page: ComicReaderPage) {
		return page.aspectRatio ?? pageAspectRatio;
	}

	function goToPage(pageIndex: number) {
		currentPageIndex = clampPageIndex(pageIndex, pageCount);
		resetZoom();
	}

	function nextPage() {
		if (!canGoNext) return;
		goToPage(
			getNextPageIndex({
				pageIndex: currentPageIndex,
				pageCount,
				spreadMode: spreadMode && !isMobile,
				hasCover
			})
		);
	}

	function previousPage() {
		if (!canGoPrevious) return;
		goToPage(
			getPreviousPageIndex({
				pageIndex: currentPageIndex,
				pageCount,
				spreadMode: spreadMode && !isMobile,
				hasCover
			})
		);
	}

	function moveLeft() {
		if (readingDirection === 'rtl') {
			nextPage();
		} else {
			previousPage();
		}
	}

	function moveRight() {
		if (readingDirection === 'rtl') {
			previousPage();
		} else {
			nextPage();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		if (target?.matches('input, textarea, select, button')) return;

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			moveLeft();
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			moveRight();
		}

		if (event.key === 'Escape' && expanded) {
			expanded = false;
		}
	}

	function zoomBy(amount: number) {
		zoomScale = Math.min(Math.max(Number((zoomScale + amount).toFixed(2)), 1), 4);
		if (zoomScale === 1) {
			panX = 0;
			panY = 0;
		}
	}

	function resetZoom() {
		zoomScale = 1;
		panX = 0;
		panY = 0;
	}

	function handlePointerDown(event: PointerEvent) {
		dragStart = {
			pointerId: event.pointerId,
			x: event.clientX,
			y: event.clientY,
			panX,
			panY,
			panning: zoomScale > 1
		};
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function handlePointerMove(event: PointerEvent) {
		if (!dragStart || dragStart.pointerId !== event.pointerId || !dragStart.panning) return;

		panX = dragStart.panX + event.clientX - dragStart.x;
		panY = dragStart.panY + event.clientY - dragStart.y;
	}

	function handlePointerUp(event: PointerEvent) {
		if (!dragStart || dragStart.pointerId !== event.pointerId) return;

		const deltaX = event.clientX - dragStart.x;
		const deltaY = event.clientY - dragStart.y;
		const isSwipe = !dragStart.panning && Math.abs(deltaX) > 56 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5;

		if (isSwipe) {
			if (deltaX > 0) {
				readingDirection === 'rtl' ? nextPage() : previousPage();
			} else {
				readingDirection === 'rtl' ? previousPage() : nextPage();
			}
		}

		dragStart = null;
	}

	function handlePageInput(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		goToPage(Number(input.value));
	}
</script>

<svelte:window bind:innerWidth={width} onkeydown={handleKeydown} />

<section
	class="comic-reader {className}"
	class:expanded
	data-direction={readingDirection}
	aria-label={title}
>
	<header class="comic-reader__bar">
		<div class="comic-reader__title">
			<p>{title}</p>
			<span>{pageCount === 0 ? 0 : currentPageIndex + 1} / {pageCount}</span>
		</div>
		<div class="comic-reader__tools" aria-label="Reader controls">
			<button type="button" aria-label="Zoom out" onclick={() => zoomBy(-0.25)} disabled={zoomScale === 1}>−</button>
			<button type="button" aria-label="Reset zoom" onclick={resetZoom}>{Math.round(zoomScale * 100)}%</button>
			<button type="button" aria-label="Zoom in" onclick={() => zoomBy(0.25)} disabled={zoomScale === 4}>+</button>
			<button type="button" aria-label={expanded ? 'Exit expanded reader' : 'Expand reader'} onclick={() => (expanded = !expanded)}>
				{expanded ? '↙' : '↗'}
			</button>
		</div>
	</header>

	<div
		class="comic-reader__stage"
		data-zoomed={zoomScale > 1}
		role="group"
		aria-label="Comic page surface"
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		onpointercancel={handlePointerUp}
	>
		{#if pageCount === 0}
			<p class="comic-reader__empty">No pages supplied.</p>
		{:else}
			<div class="comic-reader__spread" data-spread={visibleIndexes.length > 1}>
				{#each visibleIndexes as pageIndex (pages[pageIndex]?.id)}
					{@const page = pages[pageIndex]}
					{#if page}
						<figure class="comic-reader__page" style:--page-aspect-ratio={pageRatio(page)}>
							<img
								src={page.src}
								alt={page.alt ?? `${title} page ${pageIndex + 1}`}
								draggable="false"
								style:transform={`translate(${panX}px, ${panY}px) scale(${zoomScale})`}
							/>
						</figure>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<footer class="comic-reader__controls">
		<button type="button" aria-label="Previous page" onclick={previousPage} disabled={!canGoPrevious}>‹</button>
		<label class="comic-reader__seek">
			<span>Page</span>
			<input
				type="range"
				min="0"
				max={Math.max(pageCount - 1, 0)}
				value={currentPageIndex}
				disabled={pageCount <= 1}
				oninput={handlePageInput}
			/>
		</label>
		<button type="button" aria-label="Next page" onclick={nextPage} disabled={!canGoNext}>›</button>
	</footer>
</section>
