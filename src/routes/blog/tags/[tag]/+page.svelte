<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import '$lib/styles/system/blog.sass';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let route = $derived(data.route);
	let posts = $derived(data.posts ?? []);
	let mobileMenuOpen = $state(false);
	let firstMenuItem: HTMLButtonElement | undefined = $state();

	let title = $derived('Tag | ' + route);
	let metaDescription = $derived('All essays tagged ' + route + ' at Bodha Blog.');
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

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMobileMenu();
		}
	}

	$effect(() => {
		if (!mobileMenuOpen) return;

		tick().then(() => {
			firstMenuItem?.focus();
		});
	});
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="box wrapper-std header-margin">
		<Crumb showT={false} title="Tags | Bodha" showRow={true}>
			<ResponsiveMenu>
				<a class="small-button tt-u" href="/blog">Blog</a>
				<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
				<a class="small-button tt-u" href="/blog/writers">Writers</a>
				<a class="small-button tt-u" href="/blog/tags">Tags</a>
			</ResponsiveMenu>
		</Crumb>
		<div class="blog-wrapper">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each posts as item}
					<div class="box whitestone b-main radius">
						<a class="blank p8" href={item.linkpath} aria-label="image">
							<img class="fitted landscape" src={item.meta.image} alt={item.meta.title} />
						</a>
						<div class="box blog-rest p16">
							<a class="blank rgap16 box blog-text-box tight-padded" href={item.linkpath}>
								<p class="txt-00 grey2 tt-u">{item.meta.words} words | {item.formattedDate}</p>
								<p class="txt-xl w600 a-hover">{item.meta.title}</p>
								<p class="grey1 lh14">{item.meta.excerpt}</p>
							</a>
						</div>
						<div class="row wrap self-bottom bordertop tight-padded rgap4 cgap4 p16 stonecard">
							<p class="txt-xs tt-u w500">{item.meta.author}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</Container>
