<!--
  Slider.svelte — Svelte 5 (runes) SvelteKit slider plugin
  ---------------------------------------------------------
  Features
    • Customizable prev/next buttons (via snippets or props)
    • Optional, customizable pagination (dots / numbers / custom snippet)
    • Configurable slidesPerView + gap
    • Separate mobile config (< 1025px by default)
    • Touch swipe on mobile, optional mouse drag on desktop
    • Keyboard arrow navigation on desktop (when focused / hovered)
    • Infinite loop, autoplay with pause-on-hover, slide/fade transitions
    • A11y labels, visible focus rings, roving tab index
-->
<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import type { Snippet } from 'svelte';

  type TransitionKind = 'slide' | 'fade';

  type ResponsiveConfig = {
    slidesPerView?: number;
    gap?: number;
    draggable?: boolean;
  };

  type Props = {
    // Slide content
    slides?: Snippet;                 // render slides via snippet
    // Navigation
    showNav?: boolean;
    prevButton?: Snippet<[{ onclick: () => void; disabled: boolean }]>;
    nextButton?: Snippet<[{ onclick: () => void; disabled: boolean }]>;
    prevLabel?: string;
    nextLabel?: string;
    // Pagination
    showPagination?: boolean;
    paginationKind?: 'dots' | 'numbers';
    pagination?: Snippet<[{ count: number; active: number; goTo: (i: number) => void }]>;
    // Layout
    slidesPerView?: number;
    gap?: number;
    // Responsive
    mobileBreakpoint?: number;        // px; viewport <= this uses `mobile`
    mobile?: ResponsiveConfig;
    // Interaction
    keyboard?: boolean;               // desktop arrow keys
    draggable?: boolean;              // desktop mouse drag
    swipeable?: boolean;              // mobile touch swipe
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;           // ms
    pauseOnHover?: boolean;
    transition?: TransitionKind;
    duration?: number;                // ms
    // A11y
    ariaLabel?: string;
    // Events
    onchange?: (index: number) => void;
  };

  let {
    slides,
    showNav = true,
    prevButton,
    nextButton,
    prevLabel = 'Previous slide',
    nextLabel = 'Next slide',
    showPagination = true,
    paginationKind = 'dots',
    pagination,
    slidesPerView = 3,
    gap = 16,
    mobileBreakpoint = 1024,
    mobile = { slidesPerView: 1, gap: 12, draggable: true },
    keyboard = true,
    draggable = false,
    swipeable = true,
    loop = false,
    autoplay = false,
    autoplayDelay = 4000,
    pauseOnHover = true,
    transition = 'slide',
    duration = 400,
    ariaLabel = 'Carousel',
    onchange
  }: Props = $props();

  // ---- Internal state -----------------------------------------------------
  let root = $state<HTMLElement | null>(null);
  let track = $state<HTMLElement | null>(null);
  let viewportW = $state(0);
  let isMobile = $derived(viewportW > 0 && viewportW <= mobileBreakpoint);

  let activeSPV = $derived(isMobile ? (mobile.slidesPerView ?? 1) : slidesPerView);
  let activeGap = $derived(isMobile ? (mobile.gap ?? 12) : gap);
  let activeDraggable = $derived(isMobile ? (mobile.draggable ?? true) : draggable);

  let count = $state(0);                // number of slide children
  let index = $state(0);                // current "page" index
  let pageCount = $derived(Math.max(1, Math.ceil(count / activeSPV)));

  let dragging = $state(false);
  let dragDX = $state(0);
  let startX = 0;
  let startY = 0;
  let pointerId: number | null = null;
  let suppressClick = false;
  let hovered = $state(false);
  let autoplayTimer: ReturnType<typeof setInterval> | null = null;

  // ---- Lifecycle ----------------------------------------------------------
  onMount(() => {
    const ro = new ResizeObserver(() => {
      viewportW = window.innerWidth;
    });
    ro.observe(document.body);
    viewportW = window.innerWidth;

    // Count slides (light children inside track)
    const observer = new MutationObserver(measure);
    if (track) observer.observe(track, { childList: true });
    measure();

    return () => {
      ro.disconnect();
      observer.disconnect();
    };
  });

  function measure() {
    if (!track) return;
    count = track.children.length;
    if (index > pageCount - 1) index = Math.max(0, pageCount - 1);
  }

  // ---- Navigation --------------------------------------------------------
  function goTo(i: number) {
    if (loop) {
      const n = pageCount;
      index = ((i % n) + n) % n;
    } else {
      index = Math.min(Math.max(0, i), pageCount - 1);
    }
    onchange?.(index);
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // ---- Autoplay ----------------------------------------------------------
  $effect(() => {
    stopAutoplay();
    if (autoplay && !(pauseOnHover && hovered) && !dragging) {
      autoplayTimer = setInterval(next, autoplayDelay);
    }
    return stopAutoplay;
  });
  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }

  // ---- Keyboard ----------------------------------------------------------
  function onKeydown(e: KeyboardEvent) {
    if (!keyboard || isMobile) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  }

  // ---- Pointer / swipe / drag -------------------------------------------
  function canDrag() { return (isMobile ? swipeable : activeDraggable); }

  function onPointerDown(e: PointerEvent) {
    if (!canDrag()) return;
    if (e.pointerType === 'mouse' && !activeDraggable) return;
    dragging = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    dragDX = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent) {
    if (!dragging || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dy) > Math.abs(dx) * 1.2 && Math.abs(dy) > 8) {
      // Vertical intent — bail out so the page can scroll
      cancelDrag();
      return;
    }
    dragDX = dx;
  }
  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    const threshold = Math.max(40, (root?.clientWidth ?? 300) * 0.12);
    if (Math.abs(dragDX) > 4) suppressClick = true;
    if (dragDX > threshold) prev();
    else if (dragDX < -threshold) next();
    cancelDrag();
  }
  function cancelDrag() {
    dragging = false;
    dragDX = 0;
    pointerId = null;
    setTimeout(() => { suppressClick = false; }, 0);
  }
  function onClickCapture(e: MouseEvent) {
    if (suppressClick) { e.stopPropagation(); e.preventDefault(); }
  }

  // ---- Transform --------------------------------------------------------
  let trackStyle = $derived.by(() => {
    if (transition === 'fade') return '';
    const pct = -index * 100;
    const drag = dragging ? ` + ${dragDX}px` : '';
    return `transform: translate3d(calc(${pct}%${drag}), 0, 0); transition: ${dragging ? 'none' : `transform ${duration}ms cubic-bezier(.22,.61,.36,1)`};`;
  });

  let atStart = $derived(!loop && index === 0);
  let atEnd = $derived(!loop && index >= pageCount - 1);

// Inside your <script>
$effect(() => {
  if (hovered && keyboard && !isMobile) {
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }
});

</script>

<section
  bind:this={root}
  class="slider"
  class:is-fade={transition === 'fade'}
  class:is-dragging={dragging}
  aria-roledescription="carousel"
  aria-label={ariaLabel}
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
  onfocusin={() => (hovered = true)}
  onfocusout={() => (hovered = false)}
>
<div 
    class="viewport"
	role="presentation"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={cancelDrag}
    onclickcapture={onClickCapture}
  >
    <div
      bind:this={track}
      class="track"
      style="--spv: {activeSPV}; --gap: {activeGap}px; {trackStyle}"
      aria-live={autoplay ? 'off' : 'polite'}
    >
      {@render slides?.()}
    </div>
  </div>

  {#if showNav}
    <div class="nav">
      {#if prevButton}
        {@render prevButton({ onclick: prev, disabled: atStart })}
      {:else}
        <button class="nav-btn nav-prev" aria-label={prevLabel} onclick={prev} disabled={atStart}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      {/if}
      {#if nextButton}
        {@render nextButton({ onclick: next, disabled: atEnd })}
      {:else}
        <button class="nav-btn nav-next" aria-label={nextLabel} onclick={next} disabled={atEnd}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      {/if}
    </div>
  {/if}

  {#if showPagination}
    <div class="pagination" role="tablist" aria-label="Slide pagination">
      {#if pagination}
        {@render pagination({ count: pageCount, active: index, goTo })}
      {:else if paginationKind === 'numbers'}
        {#each Array(pageCount) as _, i}
          <button
            role="tab"
            aria-selected={i === index}
            class="page-num"
            class:is-active={i === index}
            onclick={() => goTo(i)}
          >{i + 1}</button>
        {/each}
      {:else}
        {#each Array(pageCount) as _, i}
          <button
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            class="dot"
            class:is-active={i === index}
            onclick={() => goTo(i)}
          ></button>
        {/each}
      {/if}
    </div>
  {/if}
</section>

<style>
  .slider {
    --focus: oklch(0.62 0.18 255);
    position: relative;
    outline: none;
  }
  .slider:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--focus) 40%, transparent);
    border-radius: 12px;
  }
  .viewport {
    overflow: hidden;
    touch-action: pan-y;
    border-radius: 12px;
  }
  .is-dragging .viewport { cursor: grabbing; }
  .track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% - (var(--spv) - 1) * var(--gap)) / var(--spv));
    gap: var(--gap);
    will-change: transform;
  }
  .is-fade .track {
    display: block;
    position: relative;
  }
  .is-fade .track > :global(*) {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 300ms ease;
  }
  /* NB: fade mode assumes 1 slide visible; caller should set slidesPerView=1 */

  .nav {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    padding: 0 8px;
  }
  .nav-btn {
    pointer-events: auto;
    width: 40px; height: 40px;
    border-radius: 999px;
    border: 1px solid oklch(0.9 0.005 260);
    background: oklch(0.99 0.003 90 / 0.92);
    backdrop-filter: blur(8px);
    color: oklch(0.22 0.01 260);
    display: grid; place-items: center;
    cursor: pointer;
    transition: transform 120ms ease, background 120ms ease, opacity 120ms ease;
  }
  .nav-btn:hover { background: oklch(1 0 0); transform: scale(1.04); }
  .nav-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
  .nav-btn:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }
  .dot {
    width: 8px; height: 8px; border-radius: 999px;
    border: none;
    background: oklch(0.86 0.005 260);
    cursor: pointer;
    padding: 0;
    transition: width 180ms ease, background 180ms ease;
  }
  .dot.is-active { width: 24px; background: oklch(0.28 0.015 260); }
  .dot:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; }

  .page-num {
    min-width: 28px; height: 28px; padding: 0 8px;
    border-radius: 8px;
    border: 1px solid oklch(0.9 0.005 260);
    background: transparent;
    font: 500 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    color: oklch(0.35 0.01 260);
    cursor: pointer;
  }
  .page-num.is-active {
    background: oklch(0.22 0.015 260);
    color: oklch(0.98 0.003 90);
    border-color: transparent;
  }
</style>
