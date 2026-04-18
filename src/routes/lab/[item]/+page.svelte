<script lang="ts">
	import { page } from '$app/stores';
	import { formatYear, formatDOM, formatMonth } from '$lib/utils/localpulls.js';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	export let data;

	let yOP: string, dOM: string, mOD: string;
	$: if ($page) {
		yOP = formatYear(data.date);
		dOM = formatDOM(data.date);
		mOD = formatMonth(data.date);
	}
</script>

<Head
	title={data.title}
	metaDescription={data.excerpt}
	metaImage="/images/key-research.webp"
	metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}
/>

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
	<Crumb item1="Bodha Lab" item1Link="/lab" showT={true} title={data.title} showD={true} desc={data.excerpt}/> 
		<div class="grid two right midgaps">
			<div class="classic-document box textbox down">
				<data.content />
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.article-page
	display: flex
	flex-direction: column
	gap: var(--gap-std)

.date-tag
	font-size: 0.78rem
	color: var(--text-ghost)

.article-imgs
	:global(img)
		border-radius: 6px
		max-width: 100%
		height: auto
		max-height: 540px
		object-fit: contain
		border: 1px solid rgba(0,0,0,0.07)
		padding: 1rem
		background: #F9F8F6
		margin-bottom: 1rem
		display: block

</style>
