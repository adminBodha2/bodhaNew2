<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	type Props = {
		showT?: boolean;
		title?: string;
		rgap?: number;
		showRow?: boolean;
		showD?: boolean;
		desc?: string;
		centered?: boolean;
		serifed?: boolean;
		fullP?: boolean;
		onblog?: boolean;
		isSolo?:boolean;
		thinBot?:boolean;
		thinTop?:boolean;
		sidebarSoloPad2?:boolean;
		libraryType?:boolean;
		children?: Snippet;
		noBorder?:boolean;
	};

	let { showT = false, title = ' ', rgap = 0, showRow = false, showD = false, libraryType = false, onblog = false, desc = ' ', centered = false, sidebarSoloPad2 = false, isSolo=false, serifed = true, thinBot = false, thinTop = false, noBorder = false, fullP = false, children }: Props = $props();

	let routeSegments = $derived(page.url.pathname.split('/').filter(Boolean));

	let routeDepth = $derived(routeSegments.length);
	let firstSegment = $derived(routeSegments[0]);
	let secondSegment = $derived(routeSegments[1]);
	let thirdSegment = $derived(routeSegments[2]);
</script>

<div class="box crumb-outer borderbot">
	<!------breadcrumb row - automatically adds route links at the top of page ------>
	<div class="row ycenter xleft cgap4 rgap8 mwrap crumbrow">
		<a class="crumb-link row cgap4" class:faded={routeDepth > 1} href="/"
			><div class="link-arrow" class:gone={routeDepth > 1}>←</div>
			Bodha
		</a>
		{#if routeDepth > 1}
			<span class="divider">\</span>
			<a class="crumb-link" class:faded={routeDepth > 2} href="/{firstSegment}">{firstSegment.replaceAll('-', ' ')}</a>
			{#if routeDepth < 3}
				<span class="divider">\</span>
			{/if}
		{/if}
		{#if routeDepth > 2}
			<span class="divider">\</span>
			<a class="crumb-link" href="/{firstSegment}/{secondSegment}">{secondSegment.replaceAll('-', ' ')}</a>
			{#if routeDepth < 4}
				<span class="divider">\</span>
			{/if}
		{/if}
	</div>
	<!-----title and description row - adds title, description - set variables showT and showD to true, define in title and desc ---->
	<div class="mleft box rgap16" class:ta-c={centered}>
		<h1 class="txt-2xl md:txt-3xl ls002m lg:txt-5xl md:ls008m lh11 tt-c source-serif">{title}</h1>
		<div class="box rgap16">
			<p class="lh14 grey2 width60">{desc}</p>
			{@render children?.()}
		</div>
	</div>
	<!-----optional row to add more data in page header area, like tags, buttons, text anything. set showRow to true and then add on page ---->
	<!---a bottom border and padding of 2rem is automatically added to component via styling of crumb-outer below----->
</div>

<style lang="sass">

h1
	word-break: break-word

.crumbrow
	padding-bottom: 8px

.crumb-outer
	padding-top: 2rem
	padding-bottom: 2rem
	row-gap: 0.5rem
	@media (min-width: 1025px)
		padding-bottom: 2rem
		padding-top: 2rem
		row-gap: 1rem

.divider
	font-size: 0.5rem
	color: var(--color-grey-0)

a.crumb-link
	font-size: 0.8rem
	text-transform: uppercase
	font-weight: 500
	letter-spacing: 0.01rem
	color: var(--color-grey-1)
	transition: all 135ms cubic-bezier(0.42, 0, 0.58, 1)
	.link-arrow
		transform-origin: left center
		font-size: 0.5rem
		&.gone
			display: none
	&.faded
		color: var(--color-grey-0)
	&:hover
		color: var(--color-theme)
		letter-spacing: 0
		.link-arrow
			transform: scaleX(1.2)
	

</style>
