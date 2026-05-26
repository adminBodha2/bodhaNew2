<script lang="ts">
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import type { EasingFunction } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { areScrollAnimationsDisabled } from '../motionPreference.svelte';
	import type { SlideDirection } from '../types';
	import { directionToOffset } from '../transitions/slide';

	interface Props {
		/** Controls whether the element is in the DOM and triggers in/out animations. */
		visible?: boolean;
		/** Direction the element slides from on enter. Default: 'left' */
		direction?: SlideDirection;
		/**
		 * Override the exit direction. When omitted the element exits back
		 * the same way it entered. Useful for page-transition-style effects.
		 */
		outDirection?: SlideDirection;
		/** Distance in pixels to slide. Default: 100 */
		distance?: number;
		/** Animation duration in ms. Default: 300 */
		duration?: number;
		/** Delay before the animation starts, in ms. Default: 0 */
		delay?: number;
		/** Easing function. Default: quintOut */
		easing?: EasingFunction;
		/** Whether to also fade opacity during the slide. Default: true */
		opacity?: boolean;
		children: Snippet;
		/** Extra attributes forwarded to the wrapper element (class, id, aria-*, data-*, ...) */
		[key: string]: unknown;
	}

	let {
		visible = true,
		direction = 'left',
		outDirection,
		distance = 100,
		duration = 300,
		delay = 0,
		easing = quintOut,
		opacity = true,
		children,
		...rest
	}: Props = $props();

	let wrapperRef = $state<HTMLElement | null>(null);
	let renderOverride = $state<boolean | null>(null);
	let previousVisible = $state<boolean | null>(null);
	const rendered = $derived(renderOverride ?? visible);
	let activeTween: { kill: () => void } | null = null;
	let animationRun = 0;

	const attachWrapperRef = (node: HTMLElement) => {
		wrapperRef = node;
		return () => {
			if (wrapperRef === node) wrapperRef = null;
		};
	};

	function getAnimationTarget(node: HTMLElement): HTMLElement | null {
		return (node.firstElementChild as HTMLElement | null) ?? node;
	}

	function prefersReducedMotion(): boolean {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function clearInlineAnimationStyles(target: HTMLElement) {
		target.style.transform = '';
		if (opacity) target.style.opacity = '';
		target.style.visibility = '';
	}

	function setOffset(target: HTMLElement, slideDirection: SlideDirection, alpha: number) {
		const { x, y } = directionToOffset(slideDirection, distance);
		target.style.transform = `translate(${x}px, ${y}px)`;
		if (opacity) target.style.opacity = String(alpha);
	}

	$effect.pre(() => {
		if (visible) {
			renderOverride = null;
		} else if (previousVisible === true) {
			renderOverride = true;
		}
		previousVisible = visible;
	});

	$effect(() => {
		if (!browser || !rendered) return;

		const node = wrapperRef;
		if (!node) return;

		const target = getAnimationTarget(node);
		if (!target) {
			if (!visible) renderOverride = false;
			return;
		}
		const animationTarget = target;

		const run = ++animationRun;
		const entering = visible;
		const slideDirection = entering ? direction : (outDirection ?? direction);
		const { x, y } = directionToOffset(slideDirection, distance);

		activeTween?.kill();
		activeTween = null;

		if (prefersReducedMotion() || areScrollAnimationsDisabled()) {
			clearInlineAnimationStyles(target);
			if (!entering) renderOverride = false;
			return;
		}

		let cancelled = false;

		async function animate() {
			const { gsap } = await import('gsap');
			if (cancelled || run !== animationRun) return;

			if (entering) {
				setOffset(animationTarget, slideDirection, 0);
			}

			activeTween = gsap.to(animationTarget, {
				x: entering ? 0 : x,
				y: entering ? 0 : y,
				autoAlpha: opacity ? (entering ? 1 : 0) : undefined,
				duration: duration / 1000,
				delay: delay / 1000,
				ease: easing,
				onComplete: () => {
					if (run !== animationRun) return;
					activeTween = null;

					if (entering) {
						clearInlineAnimationStyles(animationTarget);
					} else {
						renderOverride = false;
					}
				}
			});
		}

		void animate();

		return () => {
			cancelled = true;
			if (run === animationRun) {
				activeTween?.kill();
				activeTween = null;
			}
		};
	});
</script>

{#if rendered}
	<div {...rest} style:display="contents" {@attach attachWrapperRef}>
		{@render children()}
	</div>
{/if}
