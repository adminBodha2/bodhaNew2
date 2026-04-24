<script lang="ts">

	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { allResearch } from '$lib/utils/localpulls';
	import '$lib/styles/lab.sass'
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaImage, metaUrl } from '$lib/utils/metastores';
	
	let { data } = $props();
	let sY = $state(0);
	let projects = $state<any[]>([]);

	$effect(() => {
		$metaTitle = data.title + ' | Research Project at Bodha';
		$metaDescription = data.description;
		$metaUrl = 'https://www.bodharesearch.in' + page.url.pathname;
		$metaImage = data.image;
	})

	const jsonld = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: data.title + ' | Research Project at Bodha',
			description: data.description,
			image: data.image,
			publisher: { '@type': 'Organization', name: 'Bodha', url: 'https://www.bodharesearch.in' },
			url: 'https://www.bodharesearch.in' + page.url.pathname,
		})
	)

	onMount(async () => {
		projects = await allResearch();
	});
</script>

<svelte:window bind:scrollY={sY} />

<Head title={$metaTitle} metaDescription={$metaDescription} metaImage={$metaImage} metaUrl={$metaUrl} {jsonld} />

<Container narrow={true} scaled={true}>
<section class="stdbox padded-ontop">
<Crumb item1="Research" item1Link="/research" showT={true} title={data.title} desc={data.description} showD={true} showRow={true}>
	<div class="row wrap cgap8 rgap8 ycenter">
			<p class="citation-big altprim tt-u">{data.type}</p>
		{#each data.tags as tag}
			<a class="tag-pill themed tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
		{/each}
	</div>
</Crumb>
<section class="key-image">
	<img src={data.image} alt={data.title} style="transform: translateY(-{sY/4}px)"/>
</section>
<section class="content-section">
	<div class="classic-document">
	<data.content />
	</div>
	<div class="box sidebar">
		{#if projects && projects.length > 0}
			<div class="projects">
				{#each projects as item}
				<a class="blank project-link" href={item.linkpath}>
					<p class="rem1 grey">{item.meta.title}</p>
				</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
</section>
</Container>