<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
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

<Container>
	<Parallax imageLink="/images/heroes/key-soa.webp" wipe={true} />
	<section class="box wrapper-std first-box rgap32">
		<Crumb showT={true} title="Scrolls of Aryavarta" showD={true} desc="A creative project in cultural storytelling through digital comics, recreating legends, triumphs, struggles, and tragedies from Indian history." />
		<div class="box rgap8">
			<p class="txt-lg theme">To receive the fortnightly issues in your email inbox, please <a href="/members" class="linked">subscribe.</a></p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cgap16 rgap16">
			{#each posts as item}
				<a class="blank box comic-card p16 radius8 whitestone" href={item.linkpath}>
					<img class="fitted herocard radius4" src={item.meta.image} alt={item.meta.title} />
					<div class="box comic-data-main p16 rgap16">
						<p class="txt-2xl w600 a-hover">{item.meta.title}</p>
						<p class="grey1 txt-lg">{item.meta.description}</p>
					</div>
					<div class="self-bottom bordertop p16 nobot">
						<p class="txt-xs w500 tt-u">Vol. {item.meta.volume}, Issue {item.meta.issue} | {item.meta.date}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.comic-card
	border: var(--border-dark)

</style>
