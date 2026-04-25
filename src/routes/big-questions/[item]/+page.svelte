<script lang="ts">

	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/lab.sass';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { WaterRipple } from "$lib/motion-core";
	import Liner from '$lib/icons/anim-line.svelte'

	interface Props {
	    data: PageData;
	    brushSize?: number;
	}

let { 
    data, 
    brushSize = 100, 
}: Props = $props();

	let sY = $state(0);

	let title = $derived(data.title + ' | Big Questions at Bodha');
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.icon));

	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: data.description,
				image: metaImage,
				url: metaUrl
			})
		)
	);

</script>

<svelte:window bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} imWidth="1024" imHeight="683" />

<Container narrow={true} scaled={true}>
	<section class="key-image">
		<WaterRipple src={data.icon} class="ripple-motion" {brushSize}/>
	</section>
	<section class="stdbox padded">
		<Crumb rgap={16} item1="Big Questions" item1Link="/big-questions" showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
			{#if data.tags?.length}
				<div class="row wrap cgap8 rgap8 ycenter">
					{#each data.tags as tag}
						<a class="tag-pill tt-u" href="/concepts/{tag}">{tag.replaceAll('-', ' ')}</a>
					{/each}
				</div>
			{/if}
		</Crumb>
		<section class="content-section">
			<div class="classic-document">
				<data.content />
				<Liner/>
			</div>
			<div class="box sidebar">
				{#if data.questions?.length > 0}
					<div class="grid white-grid">
					{#each data.questions as item}
					{#if item.meta.title !== data.title}
					<a class="blank project-link card-padded whitestone" href={item.linkpath}>
						<p class="tight rem1">{item.meta.title}</p>
					</a>
					{/if}
				{/each}
					</div>
				{/if}
			</div>
		</section>
	</section>
</Container>

<style lang="sass">

.sidebar
	.white-grid
		border-top: none
		border-bottom: none
		border-right: none

.key-image
	height: 300px
	margin-top: 80px
	@media screen and (min-width: 1025px)
		height: 640px
		margin-top: 88px

img.icon
	object-fit: cover
	height: 56px
	width: 56px
	background: none
	padding: 0
	border: none

</style>
