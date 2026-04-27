<script lang="ts">

	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();

</script>

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-on">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2="Archaeology Wiki" item2linked={true} item2Link="/wiki/arch-journal" showT={true} title={data.title}/>
		<article class="wiki-body">
			<data.content />
		</article>
	</div>
</Container>