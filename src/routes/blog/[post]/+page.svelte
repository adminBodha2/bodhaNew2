<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Social from '$lib/comps/socialshare.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Pageprogress from '$lib/comps/pageprogress.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';
	import { mouseStore } from '$lib/utils/mousestore';
	import { readerChromeHidden } from '$lib/utils/globalstores';

	const position = mouseStore();
	const readerModeStart = 900;
	const revealOnScrollUp = 450;
	const revealPointerZone = 120;

	interface Props {
		data: PageData;
		grid?: number;
		mouseSize?: number;
		strength?: number;
		relaxation?: number;
	}

	let { data, grid = 64, mouseSize = 0.15, strength = 0.6, relaxation = 0.8 }: Props = $props();

	let posts = $derived(data.posts ?? []);
	let ref = $state<HTMLElement | null>(null);
	let sY = $state(0);
	let lastScrollY = $state(0);
	let upwardScrollDistance = $state(0);
	let isReaderChromeHidden = $state(false);
	let mouseViewportY = $derived($position.y - sY);

	let formattedDate = $derived(
		new Date(data.date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		})
	);

	let firstAuthor = $derived(Array.isArray(data.author) ? data.author[0] : data.author);

	let title = $derived(data.title);
	let metaDescription = $derived(data.excerpt);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.image));

	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: data.excerpt,
				url: metaUrl,
				image: metaImage,
				datePublished: data.date,
				author: data.author,
				section: data.category
			})
		)
	);

	function setReaderChromeHidden(hidden: boolean) {
		if (isReaderChromeHidden === hidden) return;

		isReaderChromeHidden = hidden;
		readerChromeHidden.set(hidden);
	}

	$effect(() => {
		const delta = sY - lastScrollY;
		const pointerNearTop = mouseViewportY >= 0 && mouseViewportY <= revealPointerZone;

		if (sY < readerModeStart || pointerNearTop) {
			upwardScrollDistance = 0;
			setReaderChromeHidden(false);
		} else if (delta < 0) {
			upwardScrollDistance += Math.abs(delta);

			if (upwardScrollDistance >= revealOnScrollUp) {
				setReaderChromeHidden(false);
			}
		} else if (delta > 0) {
			upwardScrollDistance = 0;
			setReaderChromeHidden(true);
		}

		lastScrollY = sY;
	});

	onDestroy(() => {
		readerChromeHidden.set(false);
	});
</script>

<svelte:window bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} />

<Pageprogress --thispagebackground="var(--color-theme)" --thispageheight="2px" {ref} />
<Container>
	<section class="box rgap32 wrapper-std header-margin">
		<div class="box rgap16 xcenter mleft ta-c ptop32 pbot32">
			<Crumb onblog={true} />
			<h1 class="txt-4xl md:txt-6xl lg:txt-8xl source-serif width90 lh12 self-center">{data.title}</h1>
			<div class="box rgap16 width90 self-center">
				<p class="txt-lg lh14">{data.excerpt}</p>
				<div class="info row ycenter lg:xcenter cgap8">
					<div class="line left-line"></div>
					<p class="highlight-text"><a class="linkedlight" href="/blog/writers/{data.author}">{data.author}</a> | {data.words} words | {formattedDate}</p>
					<div class="line right-line"></div>
				</div>
				<div class="tag-row row self-center">
					{#each data.tags as tag}
						<a class="txt-sm tt-u w500 theme" href="/blog/tags/{tag}">#{tag.replaceAll('-', ' ')}</a>
					{/each}
				</div>
			</div>
		</div>
		<div class="box blog-image-area xcenter">
			<WaterRipple src={metaImage} class="ripple-motion" brushSize={100} />
		</div>
		<article class="blog-article self-center" bind:this={ref}>
			<data.content />
		</article>
		<div class="row share-row ycenter cgap16 xbetween post-article self-center">
			<Social urlToShare={page.url.href} />
			<a class="primary" href="/blog"><span>← Back to Blog</span></a>
		</div>
	</section>
	<section class="box wrapper-std rgap64 growingline">
		{#if posts && posts.length > 0}
			<Title text="More Like This" />
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
				{#each posts as item, i}
					<a class="box blank p16 rgap8 p8 b-main radius8" href={item.linkpath}>
						<img class="fitted landscape radius4" src={item.meta.image} alt={item.meta.title} />
						<div class="box p16 rgap16">
							<p class="txt-xl w600 lh14 a-hover">{item.meta.title}</p>
							<p class="grey1 lh14">{item.meta.excerpt}</p>
						</div>
						<div class="box foot self-bottom bordertop ptop16 rgap4">
							<p class="txt-sm tt-u grey2">{item.meta.author} | {item.meta.words} words</p>
							<div class="row of-info mwrap cgap8 rgap8">
								{#each item.meta.tags as tag}
									<p class="txt-xs tt-u w500 theme">{tag.replaceAll('-', ' ')}</p>
								{/each}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</Container>

<style lang="sass">

.share-row
	border-top: var(--border-main)
	padding-top: 2rem
	margin-top: 2rem

.blog-image-area
	overflow: hidden
	border-radius: 5px
	@media screen and (max-width: 1024px)
		height: 360px
	@media screen and (min-width: 1025px)
		height: 800px
		border-radius: 60px

.line
	height: 1px
	width: 20%
	background: var(--color-grey-0)
	@media screen and (max-width: 1024px)
		display: none

.tag-row
	display: flex
	flex-wrap: wrap
	gap: 6px

.blog-article
	width: 100%
	@media (min-width: 1025px)
		width: 920px
		padding: 4rem 2rem 0 2rem

.post-article
	width: 100%
	@media (min-width: 1025px)
		width: 920px

.share-row
	display: flex
	align-items: center
	justify-content: space-between
	flex-wrap: wrap
	gap: 1rem

</style>
