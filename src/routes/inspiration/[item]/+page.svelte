<script lang="ts">

	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/lab2.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, withContext } from '$lib/utils/seo';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';

	interface Props {
	    data: PageData;
	    brushSize?: number;
	}

let { 
    data, 
    brushSize = 100, 
}: Props = $props();

	let sY = $state(0);

	let schools = $derived(data.schools ?? []);
	let thinkers = $derived(data.thinkers ?? []);

	let title = $derived(data.title + ' | Bodha Inspiration');
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.image));

	let jsonld = $derived(
		stringifyJsonLd(
			withContext(data.type === 'thinker' ? 'Person' : 'CreativeWork', {
				name: data.title,
				description: data.description,
				image: metaImage,
				url: metaUrl,
				publisher: {
					'@type': 'Organization',
					name: 'Bodha',
					url: absoluteUrl('/')
				}
			})
		)
	);
</script>

<svelte:window bind:scrollY={sY} />

<Head
	{title}
	{metaDescription}
	{metaImage}
	{metaUrl}
	ogType="article"
	{jsonld}
/>


<Container>
<section class="key-image">
	<WaterRipple src={data.image} class="ripple-motion" {brushSize}/>
</section>
	<section class="documents-grid">
		<div class="box sidearea">
				<div class="all-items">
				{#if schools && schools.length > 0}
					{#each schools as item}
						<a class="project-link sidebar-text" href={item.linkpath}>
							{item.meta.title}
						</a>
					{/each}
				{/if}
				{#if thinkers && thinkers.length > 0}
					{#each thinkers as item}
					<a class="blank project-link whitestone" href={item.linkpath}>
						<p class="rem1 tight grey">{item.meta.title}</p>
					</a>
					{/each}
				{/if}
				</div>
		</div>
		<div class="stdbox mainarea stdpad is-first is-last">
			<div class="labelbox title-area">
				<Crumb showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
				{#if data.tags && data.tags.length > 0}
					<div class="row wrap rgap4 cgap4">
						{#each data.tags as tag}
							<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll("-"," ")}</a>
						{/each}
					</div>
				{/if}
				</Crumb>
			</div>
			<div class="classic-document">
				<data.content />
			</div>
		</div>
	</section>
</Container>
