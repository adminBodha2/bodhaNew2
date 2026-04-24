<script lang="ts">

	import { page } from '$app/state'
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte'

	export let data
	const title = data.title
	const metaDescription = data.description
	const metaUrl = 'https://www.bodharesearch.in' + page.url.pathname;
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png'

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage}/>

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title={data.title} showD={true} desc={data.description}/>
		<article class="core-item">
			<data.content/>
		</article>
	</div>
</Container>