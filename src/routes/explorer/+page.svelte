<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Responsive from '$lib/comps/responsive-menu.svelte';
	import CardGrid from '$lib/comps/card-grid.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { staggerAnimatePlugin } from '$lib/svelteanim/utils/staggerPlugin';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { nodeHref } from '$lib/wiki-graph';

	let { data }: { data: PageData } = $props();

	const title = 'Knowledge Explorer | Bodha';
	const metaDescription = 'Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base.';
	const metaUrl = absoluteUrl('/explorer');
	const metaImage = absoluteImage('/images/bodhacover.png');

	const tabs = ['Blog', 'Books', 'Questions', 'Research', 'Thinkers', 'Schools', 'Lab'];
	let active = $state(0);

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: Object.values(data.grouped).flat().map((node) => ({
					name: node.title,
					url: node.slug ? `/${node.slug}` : metaUrl
				}))
			})
		)
	);

	const blogCards = $derived(
		data.grouped.blogs.map((node) => ({
			id: node.id,
			title: node.title,
			description: node.description,
			href: nodeHref(node),
			tags: node.tags
		}))
	);

	const bookCards = $derived(
		data.grouped.books.map((node) => ({
			id: node.id,
			title: node.title,
			description: node.description,
			href: '/library',
			tags: node.tags
		}))
	);

	const questionCards = $derived(
		data.grouped.questions.map((node) => ({
			id: node.id,
			title: node.title,
			description: node.description,
			href: nodeHref(node)
		}))
	);

	const projectCards = $derived(
		data.grouped.projects.map((node) => ({
			id: node.id,
			title: node.title,
			description: node.description,
			href: nodeHref(node)
		}))
	);

	const thinkerCards = $derived(
		data.grouped.thinkers.map((node) => ({
			id: node.id,
			title: node.title,
			description: node.description,
			href: nodeHref(node)
		}))
	);

	const schoolCards = $derived(
		data.grouped.schools.map((node) => ({
			id: node.id,
			title: node.title,
			description: node.description,
			href: nodeHref(node)
		}))
	);

	const labCards = $derived(
		data.grouped.labs.map((node) => ({
			id: node.id,
			title: node.title,
			description: node.description,
			href: nodeHref(node),
			tags: node.tags
		}))
	);
</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Explorer" showD={true} desc="One-stop explorer for all content and ideas on our website - essays, research projects, books - everything.">
		</Crumb>
		<div class="thisbox box rgap32">
		<Responsive>
				{#each tabs as tab, i}
					<button class="selection-button" class:active={active === i} onclick={() => (active = i)}>{tab}</button>
				{/each}
		</Responsive>
		<div use:autoAnimate={staggerAnimatePlugin({ stagger: 160, duration: 300 })}>
		{#if active === 0}
			<CardGrid items={blogCards} columns={4} animated={false} />
		{:else if active === 1}
			<CardGrid items={bookCards} columns={4} animated={false} />
		{:else if active === 2}
			<CardGrid items={questionCards} columns={4} animated={false} />
		{:else if active === 3}
			<CardGrid items={projectCards} columns={4} animated={false} />
		{:else if active === 4}
			<CardGrid items={thinkerCards} columns={4} animated={false} />
		{:else if active === 5}
			<CardGrid items={schoolCards} columns={4} animated={false} />
		{:else if active === 6}
			<CardGrid items={labCards} columns={4} animated={false} />
		{/if}
		</div>
		</div>
	</section>
</Container>


<style lang="sass">

.thisbox
	min-height: 80vh
	align-items: start
	align-content: start

</style>
