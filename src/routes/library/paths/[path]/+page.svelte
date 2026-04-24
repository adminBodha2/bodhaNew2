<script lang="ts">

	import { page } from '$app/state'
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte'

	export let data;

</script>

<Head
	title={'Bodha | Learning Path - ' + data.title}
	metaDescription={data.description}
	metaImage="/images/bodhacover.png"
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2linked={true} item2="Open Library" item2Link="/library" showT={true} title={data.title} showD={true} desc={data.description}/>
		<div class="classic-document">
			<svelte:component this={data.content}/>
		</div>
	</div>
</Container>