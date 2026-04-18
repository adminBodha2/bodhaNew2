<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { elementSizeStore } from '$lib/utils/elementSizeStore';
	import { tweened } from 'svelte/motion';
	let scrollPercent: any;
	const progress = tweened(0);

	export let ref: HTMLElement | null = null;
	let y: number;

	$: size = elementSizeStore(ref);
	$: perCent = y / $size.height;

	const updateProgress = () => {
		const maincol = document.querySelector('.heightmeasure');
		if (!maincol) return;
		const readingHeight = maincol.scrollHeight;
		const scrollTop = window.scrollY;
		const totalScroll = readingHeight - window.innerHeight;
		const scrollPercentage = Math.min(scrollTop / totalScroll, 1);
		scrollPercent = Math.round(scrollPercentage * 100);
		progress.set(scrollPercent);
	};

	const handleScroll = () => {
		updateProgress();
	};

	onMount(() => {
	window.addEventListener('scroll', handleScroll);
	return () => {
		window.removeEventListener('scroll', handleScroll);
	};
});
</script>

<svelte:window bind:scrollY={y} />

<div
	class="scroll-progress"
	style="width: {perCent *
		100}%; background: var(--theme); height: 2px"
></div>

<style lang="sass">

.scroll-progress
	width: 100%
	position: fixed
	top: 80px
	left: 0
	z-index: 500
	@media screen and (max-width: 1024px)
		top: 63px

</style>