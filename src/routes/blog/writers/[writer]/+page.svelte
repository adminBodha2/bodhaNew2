<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	import PageHead from '$lib/comps/page-header-one.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import '$lib/styles/system/blog.sass';
	import Card from '$lib/comps/blog-card.svelte'
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let writerName = $derived(data.writerName);
	let posts = $derived(data.posts ?? []);

	let title = $derived('Essays by ' + writerName + ' | Bodha Blog');
	let metaDescription = $derived('Read all essays by ' + writerName + ' at Bodha Blog.');
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: posts.map((post: any) => ({
					name: post.meta.title,
					url: post.linkpath
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<PageHead title="Writers at Our Blog | Bodha" />
	<section class="wrapper-std header-margin" style="row-gap: 2rem">
			<ResponsiveMenu>
				<a class="small-button tt-u" href="/blog">Blog</a>
				<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
				<a class="small-button tt-u active" href="/blog/writers">Writers</a>
				<a class="small-button tt-u" href="/blog/tags">Tags</a>
			</ResponsiveMenu>
			<Slide targetSelector=".slide-item">
		<div class="blog-wrapper">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each posts as item}
					<Card
						image={item.meta.image}
						title={item.meta.title}
						link={item.linkpath}
						desc={item.meta.excerpt}
						words={item.meta.words}
						shutAuth={true}>
						<div class="row wrap essay-tags rgap4 cgap4">
							{#each item.meta.tags as tag}
								<p class="txt-xs tt-u w500 theme">{tag.replaceAll('-', ' ')}</p>
							{/each}
						</div>
				</Card>
				{/each}
			</div>
		</div>
		</Slide>
	</section>
</Container>
