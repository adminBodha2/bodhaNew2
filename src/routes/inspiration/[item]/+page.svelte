<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, withContext } from '$lib/utils/seo';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';

	interface Props {
		data: PageData;
		brushSize?: number;
	}

	let { data, brushSize = 100 }: Props = $props();

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

<Head {title} {metaDescription} {metaImage} {metaUrl} ogType="article" {jsonld} />

<Parallax imageLink={metaImage} wipe={true} />
<Container>
	<section class="docgrid">
		<div class="box docside">
			<nav class="doclist">
				{#if schools && schools.length > 0}
					<div class="box rgap16">
					{#each schools as item}
						<a class="doclink txt-bs sm:txt-lg grey2" href={item.linkpath}>
							{item.meta.title}
						</a>
					{/each}
					</div>
				{/if}
				{#if thinkers && thinkers.length > 0}
					<div class="box rgap16">
					{#each thinkers as item}
						<a class="doclink txt-bs sm:txt-lg grey2" href={item.linkpath}>
							{item.meta.title}
						</a>
					{/each}
					</div>
				{/if}
			</nav>
		</div>
		<div class="docmain rgap32 box pbot32">
				<Crumb showT={true} title={data.title} showD={true} desc={data.description} showRow={true} fullP={true} isSolo={true}>
					{#if data.tags && data.tags.length > 0}
						<div class="row wrap rgap4 cgap4">
							{#each data.tags as tag}
								<a class="standard-pill" href="/concepts/{tag}">#{tag.replaceAll('-', ' ')}</a>
							{/each}
						</div>
					{/if}
				</Crumb>
			<div class="doctext classic-document">
				<data.content />
			</div>
		</div>
	</section>
</Container>
