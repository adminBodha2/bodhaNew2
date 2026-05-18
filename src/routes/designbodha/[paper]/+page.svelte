<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();
</script>

<Container>
	<Parallax imageLink={data.image} wipe={true} />
	<section class="box wrapper-std first-box">
		<Crumb showT={true} title={data.title} showD={true} desc={data.description} />
		<div class="whitepaper-box">
			<div class="classic-document">
				<data.content />
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

.whitepaper-box
	.classic-document
		padding-top: 1rem
	@media screen and (min-width: 1025px)
		border-bottom: var(--border-dark)
		.classic-document
			width: 1024px
			border-left: var(--border-dark)
			border-right: var(--border-dark)
			background: var(--color-back)
			margin-left: auto
			margin-right: auto
			padding: 4rem

</style>
