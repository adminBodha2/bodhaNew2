<script lang="ts">
	import { tick } from 'svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	type Props = {
		children: string;
		scrollContainer?: HTMLElement | null;
		containerClass?: string;
		textClass?: string;
		lineClass?: string;
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
		lineClass = '',
		animationDuration = 1,
		ease = 'power4.out',
		scrollStart = 'top 82%',
		scrollEnd = 'bottom 58%',
		stagger = 0.08,
		delay = 0,
		scrub = false,
		once = true
	}: Props = $props();

	let containerRef: HTMLDivElement;
	let measureRef: HTMLSpanElement;
	let lineIndexes = $state<number[][]>([]);

	const words = $derived(
		children
			.trim()
			.split(/\s+/)
			.filter(Boolean)
	);
	const revealDelay = $derived(delay > 20 ? delay / 1000 : delay);

	function getLineIndexes() {
		const wordElements = Array.from(measureRef.querySelectorAll<HTMLElement>('.line-reveal-measure-word'));
		const lines: number[][] = [];
		const tops: number[] = [];

		wordElements.forEach((word, index) => {
			const top = Math.round(word.getBoundingClientRect().top);
			const lineIndex = tops.findIndex((value) => Math.abs(value - top) <= 2);

			if (lineIndex === -1) {
				tops.push(top);
				lines.push([index]);
				return;
			}

			lines[lineIndex].push(index);
		});

		return lines;
	}

	onMount(() => {
		if (!containerRef || !measureRef) return;

		let ctx: gsap.Context | undefined;
		let resizeFrame = 0;

		const build = async () => {
			ctx?.revert();
			lineIndexes = getLineIndexes();
			await tick();

			ctx = gsap.context(() => {
				const targets = containerRef.querySelectorAll('.line-reveal-text');

				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
					gsap.set(targets, { yPercent: 0 });
					return;
				}

				gsap.fromTo(
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
			}, containerRef);
		};

		const scheduleBuild = () => {
			cancelAnimationFrame(resizeFrame);
			resizeFrame = requestAnimationFrame(build);
		};

		build();
		window.addEventListener('resize', scheduleBuild);

		return () => {
			window.removeEventListener('resize', scheduleBuild);
			cancelAnimationFrame(resizeFrame);
			ctx?.revert();
		};
	});
</script>

<div bind:this={containerRef} class="line-reveal {containerClass}">
	<span bind:this={measureRef} class="line-reveal-measure {textClass}" aria-hidden="true">
		{#each words as word}
			<span class="line-reveal-measure-word">{word}</span>{' '}
		{/each}
	</span>

	<span class="line-reveal-visual {textClass}" aria-label={children}>
		{#each lineIndexes as line}
			<span class="line-reveal-line {lineClass}">
				<span class="line-reveal-text">
					{#each line as wordIndex}
						<span class="line-reveal-word tt-u">{words[wordIndex]}</span>{' '}
					{/each}
				</span>
			</span>
		{/each}
	</span>
</div>

<style lang="sass">

.line-reveal-word
	font-size: 3rem
	font-family: 'Google Sans Flex', sans-serif
	font-weight: 300

.line-reveal
	position: relative
	display: block

.line-reveal-measure
	display: block
	visibility: hidden
	pointer-events: none

.line-reveal-measure-word
	display: inline-block

.line-reveal-visual
	position: absolute
	inset: 0
	display: block

.line-reveal-line
	display: block
	overflow: hidden

.line-reveal-text
	display: inline-block

.line-reveal-word
	display: inline-block

</style>
