<script lang="ts">

	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { fullLab } from '$lib/utils/localpulls';
	import { formatYear, formatDOM, formatMonth } from '$lib/utils/localpulls.js';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import '$lib/styles/lab.sass'

	export let data;
	let labitems:any

	let yOP: string, dOM: string, mOD: string;
	$: if (page) {
		yOP = formatYear(data.date);
		dOM = formatDOM(data.date);
		mOD = formatMonth(data.date);
	}

	const title = data.title
	const metaDescription = data.excerpt
	const metaUrl = 'https://www.bodharesearch.in' + page.url.pathname
	const metaImage = 'https://www.bodharesearch.in/images/key-research.webp'

	onMount(() => {
		(async() => {
			labitems = await fullLab()
		})();
	})
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl}/>

<Container narrow={true} scaled={true}>
	<section class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title={data.title} desc={data.excerpt} showD={true}/>
	</section>
	<section class="content-section">
		<div class="classic-document">
{#key page.url.pathname}
	<data.content />
{/key}
		</div>
		<div class="box sidebar">
			{#if labitems && labitems.length > 0}
				<div class="projects projects-t">
					{#each labitems as item}
						<a class="blank project-link" href={item.linkpath}>
							<p class="rem1 grey tight">{item.meta.title}</p>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>
</Container>


<style lang="sass">

.projects.projects-t
	@media screen and (min-width: 1025px)
		position: sticky
		top: 80px

</style>
