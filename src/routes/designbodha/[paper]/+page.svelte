<script lang="ts">

	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';
	import Head from '$lib/comps/headcomponent.svelte'

	let { data } = $props();

</script>


<Container graphing={true}>
<section class="key-image">
	<WaterRipple src={data.image} class="ripple-motion" brushSize={100}/>
</section>
	<div class="stdpad is-first">
		<Crumb showT={true} title={data.title} showD={true} desc={data.description}/>
		<div class="whitepaper-box">
			<div class="whitepaper-page">
				<data.content/>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.key-image
	height: 200px
	margin-top: 80px
	@media screen and (min-width: 1025px)
		height: 620px
		margin-top: 128px

.whitepaper-box
	.whitepaper-page
		padding-top: 1rem
	@media screen and (min-width: 1025px)
		border-bottom: var(--border-dark)
		.whitepaper-page
			width: 1024px
			border-left: var(--border-darker)
			border-right: var(--border-darker)
			background: var(--color-back)
			margin-left: auto
			margin-right: auto
			padding: 4rem

</style>
