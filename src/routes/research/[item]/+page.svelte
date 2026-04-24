<script lang="ts">

	import { page } from '$app/state';
	import '$lib/styles/lab.sass'
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	
	let { data } = $props();
	let sY = $state(0);
	let imageY = $derived(-(sY / 4));

	let title = $derived(data.title + ' | Research Project at Bodha');
	let metaDescription = $derived(data.description);
	let metaUrl = $derived('https://www.bodharesearch.in' + page.url.pathname);
	let metaImage = $derived('https://www.bodharesearch.in' + data.image);

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description: data.description,
		image: metaImage,
		publisher: {
			'@type': 'Organization',
			name: 'Bodha',
			url: 'https://www.bodharesearch.in'
		},
		url: metaUrl
	}));

</script>

<svelte:window bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" ogType="article" {jsonld} />

<Container narrow={true} scaled={true}>
<section class="stdbox padded-ontop">
<Crumb item1="Research" item1Link="/research" showT={true} title={data.title} desc={data.description} showD={true} showRow={true}>
	<div class="row wrap cgap8 rgap8 ycenter">
		{#each data.tags as tag}
			<a class="tag-pill tt-u" href="/concepts/{tag}">{tag.replaceAll('-', ' ')}</a>
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
		{#if data.research?.length > 0}
			<div class="projects">
				{#each data.research as item}
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

<style lang="sass">

a.std-pill
	position: relative
	font-size: 0.75rem
	font-weight: 500
	letter-spacing: 0.02rem
	color: var(--color-grey-2)
	&::after
		content: ' '
		height: 1px
		width: 100%
		background: var(--color-theme)
		position: absolute
		left: 0
		bottom: -4px

</style>