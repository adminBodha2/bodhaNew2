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
	};

	let { showT = false, title = ' ', rgap = 0, showRow = false, showD = false, libraryType = false, onblog = false, desc = ' ', centered = false, sidebarSoloPad2 = false, isSolo=false, serifed = true, thinBot = false, thinTop = false, fullP = false, children }: Props = $props();

	let routeSegments = $derived(page.url.pathname.split('/').filter(Boolean));

	let routeDepth = $derived(routeSegments.length);
	let firstSegment = $derived(routeSegments[0]);
	let secondSegment = $derived(routeSegments[1]);
	let thirdSegment = $derived(routeSegments[2]);
</script>

<div class="box crumb-outer" class:isSolo={isSolo} class:onblog class:fullP class:xcenter={centered} class:thinBot={thinBot} class:thinTop={thinTop} class:sidebarSolo={sidebarSoloPad2}>
	<!-----adds page title as h1 tag for seo and semantic markup. automatically added if showT is false. defined by title on pages----->
	{#if !showT}
		<h1 class="visually-hidden">{title}</h1>
	{/if}

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
		{#if showT}
			{#if libraryType}
			<h1 class="w600 txt-2xl lg:txt-3xl">{title}</h1>
			{:else}
			<h1 class="txt-4xl md:txt-6xl ls002m lg:txt-7xl md:ls007m lg:ls009m lh11 tt-c" class:w700={serifed} class:w500={!serifed} class:source-serif={serifed}>{title}</h1>
			{/if}
		{/if}
		{#if showRow}
		<div class="box rgap32">
			<div class="whitecard box width60"><p class="txt-bs lg:txt-lg lh14 grey3">{desc}</p></div>
			<div class="box whitecard">
				{@render children?.()}
			</div>
		</div>
		{:else}
		<p class="txt-bs lg:txt-lg lh14 grey3" class:width50={!centered && !fullP}>{desc}</p>
		{/if}
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
	border-bottom: var(--border-main)
	padding-top: 3rem
	padding-bottom: 3rem
	row-gap: 1rem
	&.onblog
		padding-top: 0rem
		padding-bottom: 2rem
	&.isSolo
		padding-bottom: 0
		padding-top: 2rem
	&.thinBot
		padding-bottom: 2rem
	&.thinTop
		padding-top: 4rem
	&.sidebarSolo
		padding-bottom: 2rem
		padding-top: 4rem
	@media (min-width: 1025px)
		padding-bottom: 5rem
		padding-top: 4rem
		row-gap: 2rem
		&.onblog
			padding-top: 2rem
			padding-bottom: 2rem
		&.isSolo
			padding-bottom: 0
			padding-top: 1rem
		&.thinBot
			padding-bottom: 2rem
		&.thinTop
			padding-top: 6rem
		&.sidebarSolo
			padding-top: 6rem
			row-gap: 1rem
			padding-bottom: 2rem

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
