<svelte:options runes={true} />

<script lang="ts">

	import { page } from '$app/state'
	import type { Snippet } from 'svelte';

	type Props = {
		showT?: boolean;
		title?: string;
		rgap?: number;
		showRow?: boolean;
		showD?: boolean;
		desc?: string;
		centered?: boolean;
		serifed?:boolean;
		children?: Snippet;
	};

	let {
		showT = false,
		title = ' ',
		rgap = 0,
		showRow = false,
		showD = false,
		desc = ' ',
		centered = false,
		serifed = true,
		children
	}: Props = $props();

	let routeSegments = $derived(
		page.url.pathname
		.split('/')
		.filter(Boolean)
	);

	let routeDepth = $derived(routeSegments.length);
	let firstSegment = $derived(routeSegments[0]);
	let secondSegment = $derived(routeSegments[1]);
	let thirdSegment = $derived(routeSegments[2]);

</script>

<div
	class="box labelbox mleft null{rgap} crumb-outer"
	class:xcenter={centered}
	class:padded={showT}
>
	<div class="row ycenter xleft cgap4 rgap8 mwrap">
		<a class="crumb-link row cgap4" class:faded={routeDepth > 1} href="/"><div class="link-arrow" class:gone={routeDepth > 1}>←</div> Bodha</a>
		{#if routeDepth > 1}
		<span class="divider">\</span>
		<a class="crumb-link" class:faded={routeDepth > 2} href="/{firstSegment}">{firstSegment.replaceAll('-',' ')}</a>
		{#if routeDepth < 3}
		<span class="divider">\</span>
		{/if}
		{/if}
		{#if routeDepth > 2}
		<span class="divider">\</span>
		<a class="crumb-link" href="/{firstSegment}/{secondSegment}">{secondSegment.replaceAll('-',' ')}</a>
		{#if routeDepth < 4}
		<span class="divider">\</span>
		{/if}
		{/if}
	</div>
	<div class="labelbox pbot8 mleft" class:ta-c={centered}>
		{#if showT}
			<h1 class="page-title tt-c tight" class:source-serif={serifed}>{title}</h1>
		{/if}

		{#if showD}
			<p class="descriptor-text grey tight" class:width50={!centered}>{desc}</p>
		{/if}
	</div>
	{#if showRow}
		{@render children?.()}
	{/if}
</div>

<style lang="sass">

.crumb-outer
	border-bottom: var(--border-dark)
	&.padded
		padding-bottom: 2rem

.divider
	font-size: 0.5rem
	color: var(--color-grey-2)

a.crumb-link
	font-size: 0.72rem
	text-transform: uppercase
	font-weight: 500
	letter-spacing: 0.01rem
	color: var(--color-grey-3)
	.link-arrow
		transform-origin: left center
		font-size: 0.5rem
		&.gone
			display: none
	&.faded
		color: var(--color-grey-2)
	&:hover
		color: var(--color-theme)
		.link-arrow
			transform: scaleX(1.2)
	

</style>