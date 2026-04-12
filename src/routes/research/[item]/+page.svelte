<script lang="ts">
	import { onMount } from 'svelte';
	import { allResearch } from '$lib/utils/supabaseClient';
	import { page } from '$app/stores';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	export let data;

	let projects: any;

	onMount(() => {
		(async () => {
			projects = await allResearch();
		})();
	});
</script>

<Head
	title={data.research}
	metaDescription="Explore our research projects at Bodha."
	metaImage="/images/bodhacover.png"
	metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}
/>

<Container>
	<div class="box-t">
		<div class="column rgap4">
		<div class="row ycenter xbetween">
			<div class="row ycenter cgap8">
				<small class="blue"><a class="blank" href="/research">RESEARCH</a></small>
				<small class="lgrey">></small>
				<small class="tt-u lgrey">{data.research}</small>
			</div>
		</div>
		<h2 class="source-serif tight">{data.research}</h2>
		<p class="tt-l italic"># {data.type}</p>
		</div>
	</div>
	<div class="box-3">
		<div class="grid two right rgap32">
			<div class="column rgap32 item-box">
				<img class="key" src={data.image} alt={data.research} />
				<pre class="big">{data.detail}</pre>
			</div>
			<div class="column sider">
				<div class="insider rgap24 column">
					<p class="source-serif"><b>All Projects</b></p>
					{#if projects && projects.length > 0}
						<div class="column rgap16">
							{#each projects as item}
								<p class="thin tight forstyle sm grey">
									<a class="blank color" href="/research/{item.slug}">{item.research}</a>
								</p>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.item-box
	@media screen and (min-width: 1025px)
		border: 1px solid var(--grey-sm)
		padding: 3rem
		border-radius: 5px
		background: var(--grey-xs)

p.forstyle
	transition: padding 0.2s ease
	@media screen and (min-width: 1025px)
		&:hover
			padding-left: 5px

h2
	@media screen and (max-width: 1024px)
		margin-top: 0.5rem

pre
	font-family: 'Google Sans Flex', sans-serif

.sider
	height: 100%
	@media screen and (min-width: 1025px)
		padding-left: 64px
		.insider
			position: sticky
			top: 8rem
	@media screen and (max-width: 1024px)
		border-top: 1px solid var(--grey-sm)
		padding-top: 32px

img.key
	object-fit: cover
	object-position: center center
	width: 100%
	@media screen and (min-width: 1025px)
		height: 480px

</style>
