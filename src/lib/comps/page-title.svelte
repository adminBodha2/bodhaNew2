<script lang="ts">
	import Arrow from '$lib/icons/arrow-right.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';

	type Props = {
		text?: string;
		anveshi?: boolean;
		isCenter?: boolean;
		span?: string;
	};

	let { text = 'Title', anveshi = false, isCenter = false, span = 'col-span-full' }: Props = $props();

	let reference = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => reference, { threshold: 0.2, once: true });
</script>

<div class="row ycenter xleft cgap8 rgap8 mwrap trigger {span}" class:xcenter={isCenter} class:mleft={isCenter} bind:this={reference}>
	<div class="bob" class:animatenow={isVisible.visible}>
		<Arrow size={20} color={anveshi ? '#D3633A' : undefined} />
	</div>
	<h2 class="txt-3xl md:txt-4xl w600 name tt-u hover-animation" class:animatenow={isVisible.visible}>
		{#each text.split('') as char, i}
			<span class="text-animation char-{i}" style:animation-delay={`${(i + 10) * 0.02}s`}>
				{char === ' ' ? '\u00A0' : char}
			</span>
		{/each}
	</h2>
</div>

<style lang="sass">

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

.animatenow
	.text-animation
		animation-name: flyUp
		animation-duration: 0.05s
		animation-timing-function: ease
		animation-fill-mode: forwards

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
