<svelte:options runes={true} />

<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import libraryItems from '$lib/serving/library-items.json';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { libCategories, libPaths, libExternal } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { toggleSearch } from '$lib/utils/globalstores';

	const title = 'Open Library | Bodha';
	const metaDescription = 'A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more.';
	const metaUrl = absoluteUrl('/library');
	const metaImage = absoluteImage('/images/key-bol.webp');

	const categoryCounts = Object.fromEntries(libCategories.map((category) => [category.type, libraryItems.filter((item) => item.type === category.type).length]));

	const jsonld = stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: libCategories.map((category) => ({
				name: category.label,
				url: category.href
			}))
		})
	);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1536" imHeight="1024" {jsonld} />

<Parallax imageLink="/images/key-bol.webp" isClass="is50" />
<Container narrow={true} scaled={true}>
	<div class="stdbox padded">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Open Library" showD={true} desc="A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more." />
		<div class="grid two tightrows reading-block">
			<p class="highlight-text">Bodha Open Library is a collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more. Find your next reading by browsing the categories, or select one of our curated reading paths.</p>
			<p class="highlight-text">All texts in the library are sourced from the public domain. If any text violates copyright, please write to us at <span class="blue">sitemaster@bodharesearch.in</span>. All works compiled under 'Aryan Issue' are externally hosted/published papers, and links will open in a new tab.</p>
			<button onclick={toggleSearch}>Search</button>
		</div>
	</div>
	<div class="stdbox padded bordertop">
		<div class="grid white-grid four">
			{#each libCategories as cat, i}
				<a class="card-padded labelbox whitestone" href={cat.href}>
					<div class="box shelf-main">
						<p class="highlight-text w500 tight">{cat.label}</p>
						<p class="tag-text grey">{categoryCounts[cat.type]} texts</p>
					</div>
					<p class="small-text tight altprim">{cat.desc}</p>
				</a>
			{/each}
		</div>
	</div>
	<div class="stdbox padded bordertop">
		<Title text="Curated Reading Paths" />
		<div class="grid white-grid four">
			{#each libPaths as path, i}
				<a class="card-padded labelbox blank whitestone" href={path.href}>
					<p class="highlight-text w500 tight">{path.label}</p>
					<p class="small-text grey tight">{path.desc}</p>
				</a>
			{/each}
		</div>
	</div>

	<div class="stdbox padded bordertop">
		<Title text="External Resources" />
		<div class="white-grid grid four">
			{#each libExternal as res}
				<a class="resource-card blank whitestone" href={res.href} target="_blank" rel="noreferrer">
					<p class="item-line tight">{res.label} →</p>
					<p class="small-text grey tight">{res.desc}</p>
				</a>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.resource-card
	display: flex
	flex-direction: column
	gap: 0.4rem
	padding: 1.2rem 1.4rem
	background: var(--color-white)
	transition: background 0.15s ease

</style>
