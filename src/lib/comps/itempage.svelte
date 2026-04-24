<script lang="ts">

	import Container from '$lib/comps/container.svelte'

	let sY: number;
	export let imageLink = ' '
	export let imageT = ' '

</script>

<svelte:window bind:scrollY={sY} />

<Container narrow={true} scaled={true}>
<section class="stdbox padded-ontop">
	<section class="key-image">
		<img src={imageLink} alt={imageT} style="transform: translateY(-{sY/4}px)"/>
	</section>
	<section class="content-section">

	</section>
</section>
</Container>