<script lang="ts" generics="T">
  import { onMount } from 'svelte';
  import type {
    SliderMobileConfig,
    SliderNavigationState,
    SliderPaginationState,
    SliderProps,
    SliderSlideState
  } from '$lib/utils/slidertypes';

  let {
    items = [],
    visibleSlides = 1,
    mobile = {} as SliderMobileConfig,
    mobileBreakpoint = 1024,
    showPagination = true,
    gap = 16,
    ariaLabel = 'Content slider',
    className = '',
    previousButton,
    nextButton,
    paginationItem,
    slide
  }: SliderProps<T> = $props();

  let currentPage = $state(0);
  let viewportWidth = $state(0);
  let isPointerInside = $state(false);
  let hasFocusWithin = $state(false);
  let touchStartX = $state<number | null>(null);
  let touchDeltaX = $state(0);
  let root: HTMLElement | null = null;

  const isMobileView = $derived(viewportWidth <= mobileBreakpoint);
  const activeVisibleSlides = $derived(
    Math.max(1, isMobileView ? (mobile.visibleSlides ?? visibleSlides) : visibleSlides)
  );
  const paginationVisible = $derived(
    isMobileView ? (mobile.showPagination ?? showPagination) : showPagination
  );
  const swipeEnabled = $derived(isMobileView && (mobile.swipable ?? true));
  const totalPages = $derived(Math.max(1, Math.ceil(items.length / activeVisibleSlides)));
  const maxPage = $derived(totalPages - 1);
  const startIndex = $derived(currentPage * activeVisibleSlides);

  const previousState = $derived<SliderNavigationState>({
    disabled: currentPage <= 0,
    direction: 'previous',
    currentPage,
    totalPages
  });

  const nextState = $derived<SliderNavigationState>({
    disabled: currentPage >= maxPage,
    direction: 'next',
    currentPage,
    totalPages
  });

  function clampPage(page: number) {
    return Math.max(0, Math.min(page, maxPage));
  }

  function goTo(page: number) {
    currentPage = clampPage(page);
  }

  function goPrevious() {
    goTo(currentPage - 1);
  }

  function goNext() {
    goTo(currentPage + 1);
  }

  function isVisible(index: number) {
    return index >= startIndex && index < startIndex + activeVisibleSlides;
  }

  function createSlideState(item: T, index: number): SliderSlideState<T> {
    return {
      item,
      index,
      isVisible: isVisible(index),
      currentPage
    };
  }

  function createPaginationState(page: number): SliderPaginationState {
    return {
      page,
      isActive: page === currentPage,
      totalPages
    };
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isMobileView || (!isPointerInside && !hasFocusWithin)) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  }

  function handleTouchStart(event: TouchEvent) {
    if (!swipeEnabled) {
      return;
    }

    touchStartX = event.touches[0]?.clientX ?? null;
    touchDeltaX = 0;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!swipeEnabled || touchStartX === null) {
      return;
    }

    touchDeltaX = (event.touches[0]?.clientX ?? touchStartX) - touchStartX;
  }

  function handleTouchEnd() {
    if (!swipeEnabled || touchStartX === null) {
      return;
    }

    if (touchDeltaX <= -48) {
      goNext();
    } else if (touchDeltaX >= 48) {
      goPrevious();
    }

    touchStartX = null;
    touchDeltaX = 0;
  }

  function updateViewportWidth() {
    viewportWidth = window.innerWidth;
  }

  onMount(() => {
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('resize', updateViewportWidth);
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  $effect(() => {
    currentPage = clampPage(currentPage);
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  bind:this={root}
  class={`slider-shell ${className}`.trim()}
  role="region"
  aria-label={ariaLabel}
  tabindex="0"
  onmouseenter={() => {
    isPointerInside = true;
  }}
  onmouseleave={() => {
    isPointerInside = false;
  }}
  onfocusin={() => {
    hasFocusWithin = true;
  }}
  onfocusout={() => {
    hasFocusWithin = root?.contains(document.activeElement) ?? false;
  }}
>
  <div class="slider-nav">
    {#if previousButton}
      {@render previousButton(previousState, goPrevious)}
    {:else}
      <button
        type="button"
        class="slider-button"
        onclick={goPrevious}
        disabled={previousState.disabled}
        aria-label="Previous slides"
      >
        <span aria-hidden="true">Previous</span>
      </button>
    {/if}

    {#if nextButton}
      {@render nextButton(nextState, goNext)}
    {:else}
      <button
        type="button"
        class="slider-button"
        onclick={goNext}
        disabled={nextState.disabled}
        aria-label="Next slides"
      >
        <span aria-hidden="true">Next</span>
      </button>
    {/if}
  </div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="slider-viewport"
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
  >
    <div
      class="slider-track"
      style={`--visible-slides:${activeVisibleSlides}; --slider-gap:${gap}px; transform: translate3d(calc(${startIndex} * ((100% + ${gap}px) / ${activeVisibleSlides}) * -1), 0, 0);`}
    >
      {#each items as item, index (index)}
        <div class="slider-slide" aria-hidden={!isVisible(index)}>
          {#if slide}
            {@render slide(createSlideState(item, index))}
          {:else}
            <div class="slider-fallback">{String(item)}</div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  {#if paginationVisible && totalPages > 1}
    <div class="slider-pagination" aria-label="Slider pagination">
      {#each Array.from({ length: totalPages }) as _, page (page)}
        {@const state = createPaginationState(page)}

        {#if paginationItem}
          {@render paginationItem(state, () => goTo(page))}
        {:else}
          <button
            type="button"
            class={`slider-dot ${state.isActive ? 'is-active' : ''}`.trim()}
            onclick={() => {
              goTo(page);
            }}
            aria-label={`Go to slide group ${page + 1}`}
            aria-pressed={state.isActive}
          >
            <span aria-hidden="true"></span>
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .slider-shell {
    display: grid;
    gap: 1rem;
    width: 100%;
    outline: none;
  }

  .slider-shell:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }

  .slider-nav {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .slider-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid currentColor;
    background: transparent;
    padding: 0.75rem 1rem;
    cursor: pointer;
  }

  .slider-button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .slider-viewport {
    overflow: hidden;
    width: 100%;
    touch-action: pan-y pinch-zoom;
  }

  .slider-track {
    display: flex;
    gap: var(--slider-gap);
    transition: transform 180ms ease;
    will-change: transform;
  }

  .slider-slide {
    min-width: calc((100% - (var(--slider-gap) * (var(--visible-slides) - 1))) / var(--visible-slides));
    flex: 0 0 calc((100% - (var(--slider-gap) * (var(--visible-slides) - 1))) / var(--visible-slides));
  }

  .slider-fallback {
    display: grid;
    place-items: center;
    min-height: 10rem;
    border: 1px dashed currentColor;
  }

  .slider-pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .slider-dot {
    width: 0.875rem;
    height: 0.875rem;
    padding: 0;
    border: 0;
    background: transparent;
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  .slider-dot span {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    background: color-mix(in srgb, currentColor 30%, transparent);
    transition: transform 180ms ease, background 180ms ease;
  }

  .slider-dot.is-active span {
    background: currentColor;
    transform: scale(1.1);
  }

</style>
