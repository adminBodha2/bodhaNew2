<script lang="ts">

	export let data
	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'

</script>


<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title={data.title} showD={true} desc={data.description}/>
	</section>
</Container>
