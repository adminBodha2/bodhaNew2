<script lang="ts">
	import Arrow from '$lib/icons/arrow-right.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import StackingLetters from '$lib/motion-core/stacking-words/StackingLetters.svelte';
	import Scramble from '$lib/motion-core/text-scramble/TextScramble.svelte'

	type Props = {
		text?: string;
		anveshi?: boolean;
		isCenter?: boolean;
		span?: string;
		sizeType?: boolean;
		isWhite?: boolean
	};

	let { text = 'Title', anveshi = false, isCenter = false, span = 'col-span-full', sizeType=false, isWhite=false }: Props = $props();

	let reference = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => reference, { threshold: 0.2, once: true });
</script>

<div class="title-wrap row ycenter xleft cgap8 rgap8 mwrap trigger {span}" class:xcenter={isCenter} class:mleft={isCenter} bind:this={reference}>
	{#if !isWhite}
	<div class="bob" class:animatenow={isVisible.visible}>
		<Arrow size={20} color={anveshi ? '#D3633A' : undefined} />
	</div>
	{/if}
	<StackingLetters direction="left" ease="power3.out" start="top 95%">
		<Scramble>	
			<h2 class="txt-2xl w600 name" class:white={isWhite} class:tt-u={!sizeType} class:md:txt-4xl={!sizeType} class:animatenow={isVisible.visible}>
				{text}
			</h2>
		</Scramble>
	</StackingLetters>
</div>

<style lang="sass">

.title-wrap
	overflow-x: hidden

.animatenow.bob
	@media (min-width: 1201px)
		animation: fromLeft 1s ease-in-out forwards

.bob
	opacity: 0
	transform: translate(-80px)
	@media (max-width: 1024px)
		display: none

.text-animation
	display: inline-block
	color: var(--lgrey)
	opacity: 0
	transform: translateY(8px)

@keyframes fromLeft
	0%
		transform: translateX(-80px)
		opacity: 0
	100%
		transform: translateX(0)
		opacity: 1

@keyframes flyUp
	0%
		transform: translateY(8px)
		opacity: 0
	100%
		transform: translateY(0)
		opacity: 1

</style>
