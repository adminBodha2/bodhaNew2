<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import libraryItems from '$lib/serving/library-items.json';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { libCategories, libPaths, libExternal } from '$lib/utils/localsends';

	const title = 'Bodha Open Library';
	const metaDescription = 'A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more.';
	const metaUrl = 'https://www.bodharesearch.in/library';
	const metaImage = 'https://www.bodharesearch.in/images/key-bol.webp';

	const categoryCounts = Object.fromEntries(libCategories.map((category) => [category.type, libraryItems.filter((item) => item.type === category.type).length]));
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} />

<Parallax imageLink="/images/key-bol.webp" isClass="is50" />
<Container narrow={true} scaled={true}>
	<div class="box std padded">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Open Library" showD={true} desc="A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more." />
		<div class="box std">
			<div class="grid white-grid four stay2">
				{#each libCategories as cat, i}
					<a class="card-padded labelbox whitestone" href={cat.href}>
						<div class="box shelf-main">
							<p class="highlight-text w500 tight">{cat.label}</p>
							<p class="citation-big lgrey">{categoryCounts[cat.type]} texts</p>
						</div>
						<p class="small-text tight grey">{cat.desc}</p>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<div class="stdbox padded bordertop">
		<Title text="Curated Reading Paths" />
		<div class="grid white-grid four stay2">
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
		<div class="white-grid grid four stay2">
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
	background: #FFFFFF
	transition: background 0.15s ease

</style>
