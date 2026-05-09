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
			pdflink?: string;
			image?: string
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
	<section class="box wrapper-std rgap32 header-margin">
		<Crumb showT={true} title="Bodha Newsletter" showD={true} desc="Bodha Newsletter is a monthly release bringing together the many strands of work unfolding at Bodha."/>
		<div class="grid lg:grid-cols-2 rgap16 cgap16 borderbot pbot32">
			<p class="highlight-text">Our monthly newsletter brings together the many strands of work unfolding at Bodha - longform essays, research notes, updates from ongoing projects, new publications, cultural reflections, and creative experiments in storytelling. </p>
			<p class="highlight-text">Bodha’s work is expanding across research, writing, publishing, design, archives, and public education. Rather than letting these efforts remain scattered across different platforms, this newsletter will serve as a regular monthly record of what we are thinking, building, publishing, and preparing.</p>
		</div>
		<div class="grid lg:grid-cols-3">
		{#each posts as item}
			<a class="row cgap8 ytop svg-hover has-image-background radius" href={item.linkpath} style="background-image: url('{item.meta.image}')">
				<div class="box in-screen p16 lg:p32 ybottom">
				<News/>
				<div class="box">
				<p class="card-title white">{item.meta.title}</p>
				<p class="tag-text tt-u lgrey">{item.meta.date}</p>
				</div>
				</div>
			</a>
		{/each}
		</div>
	</section>
</Container>

<style lang="sass">

a.has-image-background
	height: 300px
	max-width: 500px
	border: var(--border-dark)
	&:hover
		.in-screen
			background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%)
	@media screen and (min-width: 1025px)
		height: 360px

.in-screen
	height: 100%
	width: 100%
	background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)
	transition: background 450ms ease

</style>
