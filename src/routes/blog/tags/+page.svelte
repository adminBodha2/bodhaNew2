<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import '$lib/styles/system/blog.sass';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let tags = $derived(data.tags ?? []);
	let tagsC = $derived(data.tagsC ?? []);
	let showCount = $state(false);

	const title = 'Tags | Bodha Blog';
	const metaDescription = 'All content tags at the Bodha website.';
	const metaUrl = absoluteUrl('/blog/tags');
	const metaImage = absoluteImage('/images/bodhacover.png');

	function toggleTagC() {
		showCount = !showCount;
	}

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: tags.map((tag) => ({
					name: tag.tag,
					url: `/blog/tags/${tag.tag}`
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="box wrapper-std header-margin">
		<Crumb showT={false} title="Tags | Bodha" showRow={true}>
			<ResponsiveMenu>
				<a class="small-button tt-u" href="/blog">Blog Main</a>
				<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
				<a class="small-button tt-u" href="/blog/writers">Writers</a>
			</ResponsiveMenu>
		</Crumb>
		<div class="blog-wrapper ptop32 rgap32 box">
			<div class="row cgap8 ycenter">
				<div class="toggler-std">
					<input class="in-toggle" id="check-toggle" type="checkbox" bind:checked={showCount} />
					<label for="check-toggle"></label>
				</div>
				<p class="cite tt-u lgrey">
					{#if showCount}View Alphabetical{:else}View by Count{/if}
				</p>
			</div>
			<div class="row wrap cgap8 rgap8 tray-of-tags">
				{#if showCount && tagsC && tagsC.length > 0}
					{#each tagsC as tag}
						<a class="tag-item blank tt-u" href="/blog/tags/{tag.tag}">
							{tag.tag.replaceAll('-', ' ')}
							<span class="tag-count">({tag.count})</span>
						</a>
					{/each}
				{:else if !showCount && tags && tags.length > 0}
					{#each tags as tag}
						<a class="tag-item blank tt-u" href="/blog/tags/{tag.tag}">
							{tag.tag.replaceAll('-', ' ')}
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

.tag-item
	background: #575757
	border: 1px solid #171717
	padding: 0.5rem 1rem
	color: #FFFFFF
	border-radius: 4px
	font-size: 0.9rem
	letter-spacing: 0.04rem
	&:hover
		border: 1px solid var(--color-theme-light)
		background: var(--color-theme-dark)
		color: var(--color-theme-light2)

</style>
