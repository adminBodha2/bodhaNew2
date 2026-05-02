<script lang="ts">

	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import News from '$lib/icons/newsletter.svelte'
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type NewsLetter = {
		linkpath: string;
		meta: {
			title?: string;
			date?: string;
			id?: number;
			pdflink?: string
		}
	}

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.posts ?? []) as NewsLetter[]);
	const title = 'Bodha Newsletter | Bodha';
	const metaDescription = 'Bodha Newsletter is a monthly release bringing together the many strands of work unfolding at Bodha.';
	const metaUrl = absoluteUrl('/newsletter');
	const metaImage = absoluteImage('/images/bodhacover.png');
	const jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: posts.map((post) => ({
					name: post.meta.title ?? 'Bodha Newsletter',
					url: post.linkpath,
					description: post.meta.date
				}))
			})
		)
	);

</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />

<Container>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Newsletter" showD={true} desc="Bodha Newsletter is a monthly release bringing together the many strands of work unfolding at Bodha."/>
		<div class="textbox">
			<p class="paragraph-text">
				Our monthly newsletter brings together the many strands of work unfolding at Bodha - longform essays, research notes, updates from ongoing projects, new publications, cultural reflections, and creative experiments in storytelling. Bodha’s work is expanding across research, writing, publishing, design, archives, and public education. Rather than letting these efforts remain scattered across different platforms, this newsletter will serve as a regular monthly record of what we are thinking, building, publishing, and preparing.
			</p>
		</div>
	</div>
	<div class="stdbox padded bordertop">
		{#each posts as item}
			<a class="row cgap8 ytop svg-hover" href={item.linkpath}>
				<News/>
				<div class="box">
				<p class="highlight-text a-hover">{item.meta.title}</p>
				<p class="tag-text grey">{item.meta.date}</p>
				</div>
			</a>
		{/each}
	</div>
</Container>
