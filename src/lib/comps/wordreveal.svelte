<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	type Props = {
		children: string;
		scrollContainer?: HTMLElement | null;
		containerClass?: string;
		textClass?: string;
		wordClass?: string;
		animationDuration?: number;
		ease?: string;
		scrollStart?: string;
		scrollEnd?: string;
		stagger?: number;
		delay?: number;
		scrub?: boolean | number;
		once?: boolean;
	};

	let {
		children = '',
		scrollContainer = null,
		containerClass = '',
		textClass = '',
		wordClass = '',
		animationDuration = 0.9,
		ease = 'power4.out',
		scrollStart = 'top 82%',
		scrollEnd = 'bottom 58%',
		stagger = 0.035,
		delay = 0,
		scrub = false,
		once = true
	}: Props = $props();

	let containerRef: HTMLDivElement;

	const words = $derived(
		children
			.trim()
			.split(/\s+/)
			.filter(Boolean)
	);
	const revealDelay = $derived(delay > 20 ? delay / 1000 : delay);

	onMount(() => {
		if (!containerRef) return;

		const targets = containerRef.querySelectorAll('.word-reveal-text');

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			gsap.set(targets, { yPercent: 0 });
			return;
		}

		const anim = gsap.fromTo(
			targets,
			{
				yPercent: 112,
				willChange: 'transform'
			},
			{
				yPercent: 0,
				duration: animationDuration,
				delay: revealDelay,
				ease,
				stagger,
				scrollTrigger: {
					trigger: containerRef,
					scroller: scrollContainer || window,
					start: scrollStart,
					end: scrollEnd,
					scrub,
					once,
					toggleActions: scrub ? undefined : 'play none none reverse',
					invalidateOnRefresh: true
				}
			}
		);

		return () => {
			if (anim.scrollTrigger) anim.scrollTrigger.kill();
			anim.kill();
		};
	});
</script>

<div bind:this={containerRef} class="word-reveal {containerClass}" aria-label={children}>
	<span class="word-reveal-text-wrap {textClass}">
		{#each words as word}
			<span class="word-reveal-word {wordClass}">
				<span class="word-reveal-text">{word}</span>
			</span>{' '}
		{/each}
	</span>
</div>

<style lang="sass">

.word-reveal
	display: block

.word-reveal-text-wrap
	display: block

.word-reveal-word
	display: inline-block
	overflow: hidden
	vertical-align: top

.word-reveal-text
	display: inline-block
	font-size: 2rem
	line-height: 1.5
	@media screen and (max-width: 1024px)
		font-size: 1.5rem

</style>
