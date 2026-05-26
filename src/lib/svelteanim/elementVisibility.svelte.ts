// ── Components ────────────────────────────────────────────────────────────────
export { default as Slide }  from './components/Slide.svelte';
export { default as Slide2 } from './components/Slide2.svelte';
export { default as Reveal } from './components/Reveal.svelte';
export { default as Scale }  from './components/Scale.svelte';
export { default as Blur }   from './components/Blur.svelte';

// ── Raw transition functions ──────────────────────────────────────────────────
// Use these directly with Svelte's in:/out: directives for full control.
export { slide }   from './transitions/slide.js';
export { reveal }  from './transitions/reveal.js';
export { scaleIn } from './transitions/scale.js';
export { blurIn }  from './transitions/blur.js';

// ── Composables ───────────────────────────────────────────────────────────────
export { useInView } from './utils/useInView.svelte.js';

// ── Utilities ─────────────────────────────────────────────────────────────────
export { stagger } from './utils/stagger.js';

// ── Types ─────────────────────────────────────────────────────────────────────
export type { SlideDirection, SlideParams }    from './types.js';
export type { RevealDirection, RevealParams }  from './transitions/reveal.js';
export type { ScaleParams }                    from './transitions/scale.js';
export type { BlurParams }                     from './transitions/blur.js';
export type { StaggerPattern, StaggerOptions } from './utils/stagger.js';
export type { UseInViewOptions }               from './utils/useInView.svelte.js';
export type { EasingFunction }                 from 'svelte/transition';
