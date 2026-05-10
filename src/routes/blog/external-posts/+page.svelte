<script lang="ts">
	import { tick } from 'svelte';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import '$lib/styles/system/blog.sass';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type ExternalPost = {
		title: string;
		description: string;
		route: string;
		tags: string[];
		platform: string;
	};

	let { data }: { data: PageData } = $props();
	let mobileMenuOpen = $state(false);
	let firstMenuItem: HTMLButtonElement | undefined = $state();

	let externalPosts = $derived((data.externalPosts ?? []) as ExternalPost[]);

	const title = 'External Posts | Bodha';
	const metaDescription = 'Selected external essays, interviews, and references from the Bodha reading ecosystem.';
	const metaUrl = absoluteUrl('/blog/external-posts');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: externalPosts.map((post) => ({
					name: post.title ?? 'External post',
					url: post.route,
					description: post.description ?? ''
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

<svelte:window onkeydown={onWindowKeydown} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="box wrapper-std header-margin">
		<Crumb showT={false} title="External Posts" showRow={true}>
			<ResponsiveMenu>
				<a class="small-button tt-u" href="/blog">Blog</a>
				<a class="small-button tt-u" href="/blog/writers">Writers</a>
				<a class="small-button tt-u" href="/blog/tags">Tags</a>
			</ResponsiveMenu>
		</Crumb>
		<div class="blog-wrapper ptop32">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 white-grid">
				{#each externalPosts as post}
					<a class="blank box rgap16 ncolor p16 lg:p32" href={post.route} target="_blank" rel="noreferrer">
						<p class="cite blue tt-u">{post.platform}</p>
						<p class="body-text tight bold a-hover">{post.title}</p>
						<p class="grey tight">{post.description}</p>
						<div class="row wrap self-bottom rgap4 cgap4">
							{#each post.tags as tag, i}
								{#if tag !== ''}
									<p class="cite hollow tt-u">
										{#if i > 0}
											|
										{/if}
										{tag.replaceAll('-', ' ')}
									</p>
								{/if}
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</Container>
