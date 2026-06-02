<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import IconNext from '$lib/icons/arrow-next.svelte';
	import IconPrev from '$lib/icons/arrow-prev.svelte'

	let { data }: { data: PageData } = $props();

	const title = 'Dhātupāṭha Roots | Synaptic';
	const metaDescription = 'Search and browse Dhātupāṭha roots by gaṇa, root form, and meaning.';
	const metaUrl = absoluteUrl('/library/sections/dhatus');
	const metaImage = absoluteImage('/images/sitemaster/list-dhatus.png');
	let jsonld = $derived(stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: data.slice.items.map((dhatu) => ({
				name: `√${dhatu.rootIast}`,
				description: dhatu.meaningIast,
				url: absoluteUrl(`/library/sections/dhatus/${dhatu.slug}`)
			}))
		})
	));

	function ganaHref(gana: number | null) {
		const params = new URLSearchParams();
		if (gana) params.set('gana', String(gana));
		if (data.query) params.set('q', data.query);
		const query = params.toString();
		return `/library/sections/dhatus${query ? `?${query}` : ''}`;
	}

	function pageHref(page: number) {
		const params = new URLSearchParams();
		if (data.gana) params.set('gana', String(data.gana));
		if (data.query) params.set('q', data.query);
		params.set('page', String(page));
		return `/library/sections/dhatus?${params.toString()}`;
	}
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1600" imHeight="1000" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb isSolo={true} showT={true} title="Dhātupāṭha" showD={true} desc={metaDescription} fullP={true} />
		<div class="row gap8 ytop xbetween">
		<div class="box rgap8 ytop">
			<ResponsiveMenu>
				<a class="selection-button-2" class:active={!data.gana} href={ganaHref(null)}>All</a>
				{#each data.ganas as gana}
					<a class="selection-button-2" class:active={data.gana === gana.gana} href={ganaHref(gana.gana)}>{gana.name}</a>
				{/each}
			</ResponsiveMenu>
			<p class="txt-00 tt-u w500 grey2">Gaṇa</p>
		</div>
		<form class="row gap8" method="GET">
			<input class="library-search" type="search" name="q" value={data.query} placeholder="Search root or meaning" />
			{#if data.gana}
				<input type="hidden" name="gana" value={data.gana} />
			{/if}
			<button class="primary" type="submit"><span>Search</span></button>
		</form>
		</div>
		<div class="box rgap16">
			<div class="row ycenter gap16">
				<p class="txt-sm grey2">{data.slice.totalItems} dhātus · page {data.slice.page} of {data.slice.totalPages}</p>
				<div class="row ycenter">
				{#if data.slice.page > 1}
					<a class="row ycenter a-svg" href={pageHref(data.slice.page - 1)}><IconPrev/></a>
				{/if}
				{#if data.slice.page < data.slice.totalPages}
					<a class="row ycenter a-svg" href={pageHref(data.slice.page + 1)}><IconNext/></a>
				{/if}
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap16 pbot16">
				{#each data.slice.items as dhatu}
					<a class="blank box rgap8" href={`/library/sections/dhatus/${dhatu.slug}`}>
						<p class="txt-xl w500 a-hover">√{dhatu.rootIast}</p>
					</a>
				{/each}
			</div>
			<div class="row wrap cgap8 rgap8">
				{#if data.slice.page > 1}
					<a class="primary grey" href={pageHref(data.slice.page - 1)}><span>Previous</span></a>
				{/if}
				{#if data.slice.page < data.slice.totalPages}
					<a class="primary" href={pageHref(data.slice.page + 1)}><span>Next</span></a>
				{/if}
			</div>
		</div>
	</section>
</Container>
