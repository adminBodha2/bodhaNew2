<script lang="ts">
	import { page } from '$app/state';
	import '$lib/styles/lab.sass';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, withContext } from '$lib/utils/seo';

	let { data } = $props();

	let sY = $state(0);
	let imageY = $derived(-(sY / 4));

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

<Container narrow={true} scaled={true}>
<section class="stdbox padded-ontop">
<Crumb item1="Bodha" item1Link="/" showT={true} title={data.title} desc={data.description} showD={true} showRow={true}>
	<div class="row wrap cgap8 rgap8 ycenter">
			<p class="citation-big altprim tt-u">{data.type}</p>
		{#each data.tags as tag}
			<a class="tag-pill themed tt-u" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
		{/each}
	</div>
</Crumb>
<section class="key-image">
	<img src={data.image} alt={data.title} style:transform={`translateY(${imageY}px)`}/>
</section>
<section class="content-section">
	<div class="classic-document">
	<data.content />
	</div>
	<div class="box sidebar">
		{#if schools && schools.length > 0 && thinkers && thinkers.length > 0}
			<div class="projects projects-type2">
				{#each schools as item}
				<a class="blank project-link" href={item.linkpath}>
					<p class="rem1 grey tight">{item.meta.title}</p>
					<p class="tag-text blue">{item.meta.type}</p>
				</a>
				{/each}
				{#each thinkers as item}
				<a class="blank project-link" href={item.linkpath}>
					<p class="rem1 grey tight">{item.meta.title}</p>
					<p class="tag-text blue">{item.meta.type}</p>
				</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
</section>
</Container>
