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
	<div class="box-t">
		<div class="column borderbot pbot32">
			<Crumb item1="BODHA OPEN LIBRARY" item1Link="/library"/>
			<h2 class="source-serif tight pbot8">{data.title}</h2>
			<p class="grey sm">{data.description}</p>
		</div>
		<div class="classic-document">
			<svelte:component this={data.content}/>
		</div>
	</div>
</Container>