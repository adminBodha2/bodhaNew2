// Components
export { default as Slide } from './components/Slide.svelte';

// Raw transition function — use this directly with Svelte's in:/out: directives
// when you need more control than the component gives you.
export { slide } from './transitions/slide';

// Composables
export { useInView } from './utils/useInView.svelte';

// Types
export type { SlideDirection, SlideParams } from './types';
export type { UseInViewOptions } from './utils/useInView.svelte';
export type { EasingFunction } from 'svelte/transition';
