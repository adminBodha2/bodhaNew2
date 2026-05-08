<script lang="ts">

	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import '$lib/styles/system/blog.sass';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type Writer = {
		writer: string;
		link: string;
		image: string;
	};

	let { data }: { data: PageData } = $props();

	let writers = $derived((data.writers ?? []) as Writer[]);

	const title = 'Writers | Bodha';
	const metaDescription = 'Browse posts at Bodha by writer.';
	const metaUrl = absoluteUrl('/blog/writers');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
				collectionPageJsonLd({
					name: title,
					description: metaDescription,
					url: metaUrl,
					image: metaImage,
					items: writers.map((post) => ({
						name: post.writer ?? 'Writer',
						url: post.link,
						image: post.image ?? ''
					}))
				})
		)
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
	<section class="box wrapper-std header-margin">
		<Crumb showT={false} title="Writers | Bodha" showRow={true}>
			<ResponsiveMenu>
			<a class="small-button tt-u" href="/blog">Blog</a>
			<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
			<a class="small-button tt-u" href="/blog/tags">Tags</a>
			</ResponsiveMenu>
	</Crumb>
	<div class="blog-wrapper ptop32">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid">
			{#each writers as post}
				<a class="blank whitestone p16 row ycenter cgap16" href={post.link}>
					<enhanced:img class="avatar" src={post.image} alt={post.writer}/>
					<p class="paragraph-text tight w500">{post.writer}</p>
				</a>
			{/each}
		</div>
	</div>
	</section>

</Container>

<style lang="sass">

.whitestone
	.avatar
		object-fit: cover
		width: 64px
		height: 64px
		border-radius: 40px
	p
		width: calc(100% - 64px)
	@media screen and (min-width: 1025px)
		p
			width: calc(100% - 80px)

</style>
