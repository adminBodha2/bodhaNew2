<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	const title = 'Scrolls of Aryavarta | Bodha';
	const metaDescription = 'A creative project in cultural storytelling through digital comics, recreating legends, triumphs, struggles, and tragedies from Indian history.';
	const metaUrl = absoluteUrl('/aryavarta');
	const metaImage = absoluteImage('/images/heroes/key-soa.webp');

	type Comic = {
		linkpath: string;
		meta: {
			title?: string;
			issue?: number;
			volume?: number;
			id?: number;
			date?: string;
			image?: string;
			description?: string;
		};
	};

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.posts ?? []) as Comic[]);

	function toJsonLdItem(post: Comic): { name: string; description?: string; url: string } | null {
		const name = post.meta.title?.trim();
		if (!name) return null;

		return {
			name,
			...(post.meta.description ? { description: post.meta.description } : {}),
			url: post.linkpath
		};
	}

	let jsonldItems = $derived(
		posts
			.map(toJsonLdItem)
			.filter((item): item is { name: string; description?: string; url: string } => item !== null)
	);

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: jsonldItems
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" {jsonld} />

	<Parallax imageLink="/images/heroes/key-soa.webp" wipe={true} />
<Container>
<Crumb showT={true} title="Scrolls of Aryavarta" showD={true} desc="A creative project in cultural storytelling through digital comics, recreating legends, triumphs, struggles, and tragedies from Indian history." />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<div class="box rgap16">
			<Reveal>
				<p class="highlight-text">
					Scrolls of Aryavarta is an exercise in creative cultural storytelling, to recreate the Bharata that once was, or could have been. Featuring digital comics exploring different facets of Indian history.
				</p>
			</Reveal>
			<Reveal>
				<p class="highlight-text">New issue every fortnight. <span class="w600">To receive in your inbox, <a href="/members" class="linked">please subscribe.</a></span></p>
			</Reveal>
			</div>
			<div class="box rgap16">
			<Reveal>
				<p class="highlight-text">
					Currently running Volume 1 - The Story of Islamic Imperialism in India, based on the works of Shri Sita Ram Goel, narrating what historian Will Durant called the “bloodiest chapter in human history."
				</p>
			</Reveal>
			<Reveal>
				<p class="highlight-text"><a class="linked" href="/blog/about-scrolls-of-aryavarta">Read more</a> about Scrolls of Aryavarta.</p>
			</Reveal>
			</div>
		</div>
		<Slide targetSelector=".comic-item">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cgap16 rgap16">
			{#each posts as item}
				<a class="blank box rgap24 whitestone b-main std-pad comic-item" href={item.linkpath}>
					<div><img class="fitted landscape" src={item.meta.image} alt={item.meta.title} /></div>
					<div class="box gap16">
						<p class="txt-xl lg:txt-2xl w600 a-hover">{item.meta.title}</p>
						<p class="grey1 txt-lg">{item.meta.description}</p>
						<p class="txt-xs w500 tt-u">Vol. {item.meta.volume}, Issue {item.meta.issue} | {item.meta.date}</p>
					</div>
				</a>
			{/each}
		</div>
		</Slide>
	</section>
</Container>