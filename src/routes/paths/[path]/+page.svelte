<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Heading from '$lib/comps/page-header-one.svelte'
	import Filter from '$lib/icons/filter.svelte'
	import LibraryModal from '$lib/comps/librarymodal.svelte'
	import { toggleLibraryMenu } from '$lib/utils/globalstores.js';

	export let data;
	let color='#616161'

	function handleHoverInOut(newColor:string){
		color = newColor
	}

</script>

<Head
	title="{data.title} | Bodha Open Library"
	metaDescription="Library texts on {data.title} — curated by Bodha Research."
	metaImage="/images/key-bol.webp"
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<Container narrow={false} scaled={true} toffcolor={true}>
	<Heading title={data.title}/>
	<div class="narrowsize">
	<div class="box-t andB">
		<div class="column borderbot pbot32 this-fixed">
			<Crumb item1="BODHA OPEN LIBRARY" item1Link="/library" show2={true} item2={data.title} />
			<h3 class="tight">{data.title}</h3>
			<p class="grey sm ptop8">{data.items.length} texts</p>
			<LibraryModal/>
		</div>
		<div class="grid three tight">
			{#each data.items as item}
				<div class="box library-card">
					<div class="box library-card-text">
						<h6>
						{#if page.url.pathname === '/paths/indo-european-aryans-pie'}
						<a class="blank linker" href={item.linkfinal} target="_blank" rel="noreferrer">{item.name}</a>
						{:else}
							<a class="blank linker" href={item.linkfinal}>{item.name}</a>
							{/if}
						</h6>
						<p class="grey tight">{item.summary}</p>
					</div>
					<p class="library-card-small-text small-text tt-u w500 blue-dark">{item.author}</p>
					<div class="row wrap cgap8 rgap8 library-card-row">
						{#each item.tags as tag}
							<a class="label tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
	</div>

</Container>

<style lang="sass">

.this-fixed
	position: relative
	.filter
		position: absolute
		right: 0
		top: 0
		background: none
		border: none
		cursor: pointer

</style>
