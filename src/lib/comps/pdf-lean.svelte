<!--
  PDFReader.svelte
  ─────────────────────────────────────────────────────
  Lightweight PDF viewer built on pdfjs-dist (no embla).

  Usage:
    <PDFReader src={data.linkcloud} title={data.name} height="82vh" />

  Install dependency:
    npm install pdfjs-dist

  CORS note:
    Your Cloudflare R2 bucket needs an appropriate CORS policy
    so the browser can fetch the PDF. Add a rule allowing GET from
    your app's origin (or * for public buckets).

  Icons:
    Each toolbar button exposes a named snippet slot so you can
    drop in your own icon components. Falls back to inline SVGs.
    Replace the content inside each {#snippet} block below.
-->

<script lang="ts">
  import { onMount, tick } from 'svelte';

  // ── Props ──────────────────────────────────────────────────────────────────
  interface Props {
    src: string;
    title?: string;
    height?: string;
  }

  let { src, title = '', height = '82vh' }: Props = $props();

  // ── PDF engine ─────────────────────────────────────────────────────────────
  let pdfLib: any;
  let pdfDoc: any = $state(null);

  // ── View state ─────────────────────────────────────────────────────────────
  let currentPage = $state(1);
  let totalPages  = $state(0);
  let scale       = $state(1.2);
  let dualView    = $state(false);
  let rotation    = $state(0);
  let loading     = $state(true);
  let errorMsg    = $state('');
  let rendering   = $state(false);

  const ZOOM_STEPS = [0.5, 0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
  let zoomIdx = $state(5); // 1.0

  // ── DOM refs ───────────────────────────────────────────────────────────────
  let canvas1: HTMLCanvasElement | undefined = $state();
  let canvas2: HTMLCanvasElement | undefined = $state();
  let scrollArea: HTMLDivElement | undefined = $state();

  // ── Derived ────────────────────────────────────────────────────────────────
  const zoomLabel    = $derived(`${Math.round(scale * 100)}%`);
  const canGoPrev    = $derived(currentPage > 1);
  const canGoNext    = $derived(currentPage < totalPages);
  const canZoomOut   = $derived(zoomIdx > 0);
  const canZoomIn    = $derived(zoomIdx < ZOOM_STEPS.length - 1);

  let pageInput = $state(1);
  $effect(() => { pageInput = currentPage; });

  // ── Load tracking (prevents double-load on src prop change) ───────────────
  let loadedSrc = '';
  let loadToken = 0;

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  onMount(async () => {
    pdfLib = await import('pdfjs-dist');
    // Use jsDelivr CDN for the worker — no extra vite config needed
    pdfLib.GlobalWorkerOptions.workerSrc =
      `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfLib.version}/build/pdf.worker.min.mjs`;
    loadedSrc = src;
    await load(src);
  });

  $effect(() => {
    const url = src;
    if (pdfLib && url && url !== loadedSrc) {
      loadedSrc = url;
      load(url);
    }
  });

  // ── Core: load document ────────────────────────────────────────────────────
  async function load(url: string) {
    const token = ++loadToken;
    loading  = true;
    errorMsg = '';
    pdfDoc   = null;

    try {
      const task = pdfLib.getDocument({ url, withCredentials: false });
      const doc  = await task.promise;
      if (token !== loadToken) return; // superseded

      pdfDoc      = doc;
      totalPages  = doc.numPages;
      currentPage = 1;
      loading     = false;

      await tick();
      await renderAll();
    } catch (e: any) {
      if (token !== loadToken) return;
      errorMsg = e?.message ?? 'Could not load PDF';
      loading  = false;
    }
  }

  // ── Core: render visible pages ─────────────────────────────────────────────
  async function renderAll() {
    if (!pdfDoc || rendering) return;
    rendering = true;
    try {
      if (canvas1) await paint(canvas1, currentPage);
      if (dualView && canvas2 && currentPage + 1 <= totalPages) {
        await paint(canvas2, currentPage + 1);
      }
    } finally {
      rendering = false;
    }
  }

  async function paint(canvas: HTMLCanvasElement, pageNum: number) {
    if (!canvas || !pdfDoc) return;
    const page  = await pdfDoc.getPage(pageNum);
    const vp    = page.getViewport({ scale, rotation });
    const dpr   = window.devicePixelRatio || 1;

    canvas.width        = Math.floor(vp.width  * dpr);
    canvas.height       = Math.floor(vp.height * dpr);
    canvas.style.width  = `${Math.floor(vp.width)}px`;
    canvas.style.height = `${Math.floor(vp.height)}px`;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  async function goTo(page: number) {
    if (!pdfDoc || page < 1 || page > totalPages) return;
    currentPage = page;
    await renderAll();
  }

  const prev = () => goTo(Math.max(1, currentPage - (dualView ? 2 : 1)));
  const next = () => goTo(Math.min(totalPages, currentPage + (dualView ? 2 : 1)));

  function handlePageInput(e: Event) {
    const v = parseInt((e.target as HTMLInputElement).value);
    if (!isNaN(v)) goTo(v);
  }

  // ── Zoom ───────────────────────────────────────────────────────────────────
  async function applyZoom(idx: number) {
    zoomIdx = Math.max(0, Math.min(ZOOM_STEPS.length - 1, idx));
    scale   = ZOOM_STEPS[zoomIdx];
    await renderAll();
  }

  async function fitWidth() {
    if (!pdfDoc || !scrollArea || !canvas1) return;
    const page   = await pdfDoc.getPage(currentPage);
    const baseVp = page.getViewport({ scale: 1, rotation });
    const gap    = dualView ? 88 : 48;
    const ns     = (scrollArea.clientWidth - gap) / baseVp.width;
    scale        = ns;
    zoomIdx      = ZOOM_STEPS.reduce((ci, v, i) =>
      Math.abs(v - ns) < Math.abs(ZOOM_STEPS[ci] - ns) ? i : ci, 0);
    await renderAll();
  }

  // ── Other controls ─────────────────────────────────────────────────────────
  async function toggleDual() {
    dualView = !dualView;
    await tick();
    await renderAll();
  }

  async function rotateRight() {
    rotation = (rotation + 90) % 360;
    await renderAll();
  }

  // ── Keyboard ───────────────────────────────────────────────────────────────
  function onKeydown(e: KeyboardEvent) {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    prev();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  next();
    if (e.key === '+'  || e.key === '=') applyZoom(zoomIdx + 1);
    if (e.key === '-')                   applyZoom(zoomIdx - 1);
  }
</script>

<svelte:window on:keydown={onKeydown} />

<!--
  ╔══════════════════════════════════════════════════════════╗
  ║  To use your own icons, replace the SVG inside each     ║
  ║  <button> below with your icon component, e.g.:         ║
  ║    <IconChevronLeft class="toolbar-icon" />              ║
  ╚══════════════════════════════════════════════════════════╝
-->

<div class="pdf-reader" style:--h={height} role="region" aria-label={title || 'PDF viewer'}>

  <!-- ── Toolbar ─────────────────────────────────────────────────────────── -->
  <div class="toolbar" role="toolbar" aria-label="PDF controls">

    <!-- Navigation -->
    <div class="btn-group">
      <button class="icon-btn" onclick={prev} disabled={!canGoPrev} title="Previous page (←)">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 4l-6 6 6 6"/>
        </svg>
      </button>

      <label class="page-indicator">
        <input
          class="page-input"
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onchange={handlePageInput}
          aria-label="Page number"
        />
        <span class="page-sep">/ {totalPages}</span>
      </label>

      <button class="icon-btn" onclick={next} disabled={!canGoNext} title="Next page (→)">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 4l6 6-6 6"/>
        </svg>
      </button>
    </div>

    <div class="divider"></div>

    <!-- Zoom -->
    <div class="btn-group">
      <button class="icon-btn" onclick={() => applyZoom(zoomIdx - 1)} disabled={!canZoomOut} title="Zoom out (-)">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <circle cx="8.5" cy="8.5" r="5"/>
          <line x1="12.5" y1="12.5" x2="17" y2="17"/>
          <line x1="6"    y1="8.5"  x2="11" y2="8.5"/>
        </svg>
      </button>
      <span class="zoom-label">{zoomLabel}</span>
      <button class="icon-btn" onclick={() => applyZoom(zoomIdx + 1)} disabled={!canZoomIn} title="Zoom in (+)">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <circle cx="8.5" cy="8.5" r="5"/>
          <line x1="12.5" y1="12.5" x2="17"   y2="17"/>
          <line x1="8.5"  y1="6"    x2="8.5"   y2="11"/>
          <line x1="6"    y1="8.5"  x2="11"    y2="8.5"/>
        </svg>
      </button>
    </div>

    <div class="divider"></div>

    <!-- Actions -->
    <div class="btn-group">
      <!-- Fit to width -->
      <button class="icon-btn" onclick={fitWidth} title="Fit to width">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <circle cx="10" cy="10" r="3.5"/>
          <line x1="10" y1="2"  x2="10" y2="5.5"/>
          <line x1="10" y1="14.5" x2="10" y2="18"/>
          <line x1="2"  y1="10" x2="5.5" y2="10"/>
          <line x1="14.5" y1="10" x2="18" y2="10"/>
        </svg>
      </button>

      <!-- Dual page toggle -->
      <button class="icon-btn" class:active={dualView} onclick={toggleDual} title="Toggle dual-page view">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2"  y="4" width="6.5" height="12" rx="1"/>
          <rect x="11.5" y="4" width="6.5" height="12" rx="1"/>
        </svg>
      </button>

      <!-- Rotate right -->
      <button class="icon-btn" onclick={rotateRight} title="Rotate 90°">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 10a5 5 0 1 1-2-4"/>
          <polyline points="13,3 16,6 13,9" fill="none"/>
        </svg>
      </button>

      <!-- Open in new tab -->
      <a class="icon-btn" href={src} target="_blank" rel="noopener noreferrer" title="Open in new tab">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 3h4v4"/>
          <path d="M17 3l-7 7"/>
          <path d="M9 5H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5"/>
        </svg>
      </a>
    </div>
  </div>

  <!-- ── Scroll area ──────────────────────────────────────────────────────── -->
  <div class="scroll-area" bind:this={scrollArea}>

    {#if loading}
      <div class="state-overlay">
        <span class="spinner" aria-label="Loading"></span>
        <p>Loading PDF…</p>
      </div>

    {:else if errorMsg}
      <div class="state-overlay error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="width:36px;height:36px;opacity:.6">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <circle cx="12" cy="16" r=".5" fill="currentColor"/>
        </svg>
        <p>{errorMsg}</p>
        <small>Confirm the URL is reachable and CORS is configured on your storage bucket.</small>
      </div>

    {:else}
      <div class="pages-row" class:dual={dualView}>
        <div class="page-card">
          <canvas bind:this={canvas1}></canvas>
        </div>
        {#if dualView && currentPage + 1 <= totalPages}
          <div class="page-card">
            <canvas bind:this={canvas2}></canvas>
          </div>
        {/if}
      </div>
    {/if}

  </div>
</div>

<style>
  /* ── Container ─────────────────────────────────────────────────────────── */
  .pdf-reader {
    display: flex;
    flex-direction: column;
    height: var(--h, 82vh);
    background: #525659;
    border-radius: 6px;
    overflow: hidden;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 13px;
    color: #222;
  }

  /* ── Toolbar ───────────────────────────────────────────────────────────── */
  .toolbar {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 2px;
    padding: 0 10px;
    height: 44px;
    background: #ffffff;
    border-bottom: 1px solid #e2e2e2;
    box-shadow: 0 1px 3px rgba(0,0,0,.07);
    z-index: 1;
    user-select: none;
  }

  .btn-group {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .divider {
    width: 1px;
    height: 20px;
    background: #d6d6d6;
    margin: 0 6px;
    flex-shrink: 0;
  }

  /* ── Icon buttons ──────────────────────────────────────────────────────── */
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 5px;
    background: transparent;
    cursor: pointer;
    color: #555;
    transition: background 0.1s ease, color 0.1s ease;
    text-decoration: none;
  }

  .icon-btn svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }

  .icon-btn:hover:not(:disabled) {
    background: #f0f0f0;
    color: #111;
  }

  .icon-btn:active:not(:disabled) {
    background: #e6e6e6;
  }

  .icon-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .icon-btn.active {
    background: #e8f0fe;
    color: #1a73e8;
  }

  /* ── Page indicator ────────────────────────────────────────────────────── */
  .page-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 2px;
  }

  .page-input {
    width: 38px;
    height: 26px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    font-size: 13px;
    color: #333;
    padding: 0;
    background: #fff;
    appearance: textfield;
    -moz-appearance: textfield;
    transition: border-color 0.12s;
  }

  .page-input::-webkit-inner-spin-button,
  .page-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  .page-input:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26,115,232,.15);
  }

  .page-sep {
    color: #888;
    white-space: nowrap;
  }

  /* ── Zoom label ────────────────────────────────────────────────────────── */
  .zoom-label {
    min-width: 40px;
    text-align: center;
    color: #444;
    font-variant-numeric: tabular-nums;
  }

  /* ── Scroll area ───────────────────────────────────────────────────────── */
  .scroll-area {
    flex: 1;
    overflow: auto;
    display: flex;
    justify-content: center;
    padding: 28px 24px 36px;
  }

  /* ── Pages layout ──────────────────────────────────────────────────────── */
  .pages-row {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    justify-content: center;
  }

  /* ── Page card (white paper with shadow) ───────────────────────────────── */
  .page-card {
    background: #fff;
    border-radius: 2px;
    line-height: 0;
    box-shadow:
      0 1px 3px rgba(0,0,0,.22),
      0 4px 12px rgba(0,0,0,.16),
      0 12px 32px rgba(0,0,0,.10);
  }

  .page-card canvas {
    display: block;
  }

  /* ── Overlay states ────────────────────────────────────────────────────── */
  .state-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: rgba(255,255,255,.55);
    min-height: 260px;
    text-align: center;
    max-width: 320px;
    margin: auto;
  }

  .state-overlay p {
    margin: 0;
    font-size: 14px;
    color: rgba(255,255,255,.7);
  }

  .state-overlay small {
    font-size: 12px;
    color: rgba(255,255,255,.4);
    line-height: 1.5;
  }

  .state-overlay.error {
    color: #ff9e9e;
  }

  /* ── Spinner ───────────────────────────────────────────────────────────── */
  .spinner {
    display: block;
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255,255,255,.15);
    border-top-color: rgba(255,255,255,.65);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Scrollbar styling (WebKit) ────────────────────────────────────────── */
  .scroll-area::-webkit-scrollbar        { width: 8px; height: 8px; }
  .scroll-area::-webkit-scrollbar-track  { background: transparent; }
  .scroll-area::-webkit-scrollbar-thumb  { background: rgba(255,255,255,.2); border-radius: 4px; }
  .scroll-area::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.35); }
</style>