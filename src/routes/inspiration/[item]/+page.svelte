<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let sY = $state<number>(0);
	let { data } = $props();

	const jsonld = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': data.type === 'thinker' ? 'Thinker' : 'School of Thought',
			headline: data.title,
			description: data.description,
			image: data.image,
			publisher: { '@type': 'Organization', name: 'Bodha Research', url: 'https://www.bodharesearch.in' },
			url: 'https://www.bodharesearch.in' + page.url.pathname
		})
	);
</script>

<svelte:window bind:scrollY={sY} />

<Head title={data.title} metaDescription={data.description} metaImage={data.image} metaUrl={'https://www.bodharesearch.in' + page.url.pathname} {jsonld} />

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb item1="inspiration" showRow={true} item1Link="/inspiration" rgap={16} show2={true} item2={data.type} showT={true} title={data.title} showD={true} desc={data.description}>
			<div class="row cgap8 rgap8 mwrap">
				{#if data.tags?.length}
					{#each data.tags as tag}
						<a class="tag-pill tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
					{/each}
				{/if}
			</div>
		</Crumb>
		<div class="grid two midgaps">
			<div class="classic-document box textbox down">
				<data.content />
			</div>
			<div class="box imagebox up">
				<img src={data.image} alt={data.title}/>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.imagebox img
	object-fit: cover
	width: 100%
	height: 100%

.imagebox
	overflow: hidden


</style>
