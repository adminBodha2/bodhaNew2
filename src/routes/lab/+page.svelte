<script lang="ts">
	import { onMount } from 'svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import { fullLab } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'

	$metaTitle = 'Bodha Lab';
	$metaDescription = 'Working notes, ongoing inquiries, opinions, and deep research — published as they develop.';
	$metaUrl = 'https://www.bodharesearch.in/lab';
	$metaImage = '/images/bodhacover.png';

	let labItems: any[] = [];

	onMount(async () => {
		labItems = await fullLab();
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Lab" showD={true} desc={$metaDescription}/>
	{#if labItems.length > 0}
	<div class="box std">
		<div class="standard-grid grid four stay2">
			{#each labItems as item, i}
			<a class="box labelbox box-of-items blank number{i}" href={item.linkpath}>
				<div class="item-meta row ycenter cgap8">
					<span class="cat-badge tt-u">{item.meta.category}</span>
					<span class="item-date">{item.formattedDate}</span>
				</div>
				<p class="tight w500">{item.meta.title}</p>
				<p class="item-excerpt">{item.meta.excerpt}</p>
			</a>
			{/each}
		</div>
	</div>
	{/if}

</div>
</Container>

<style lang="sass">

.page-content
	display: flex
	flex-direction: column
	gap: var(--gap-std)

.items-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(2, 1fr)

.box-of-items
	padding: 1.4rem

.item-meta
	flex-wrap: wrap

.cat-badge
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: #4C9BE8
	padding: 2px 8px
	border-radius: 100px
	border: 1px solid rgba(116,192,252,0.3)
	background: rgba(116,192,252,0.08)

.item-date
	font-size: 0.75rem
	color: var(--text-ghost)

.item-title
	font-size: clamp(0.95rem, 1.5vw, 1.15rem)
	font-weight: 400
	line-height: 1.25
	letter-spacing: -0.02em
	color: #111
	margin: 0
	transition: color 0.15s ease

.item-excerpt
	font-size: 0.82rem
	line-height: 1.65
	color: #777
	margin: 0

</style>
