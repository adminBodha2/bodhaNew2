<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();
</script>

<Container>
	<section class="wrapper-std">
		<div>
		<Crumb showT={true} title={data.title} showD={true} desc={data.description} />
		<div class="whitepaper-box">
			<div class="classic-document">
				<data.content />
			</div>
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
			background: var(--color-back)
			margin-left: auto
			margin-right: auto
			padding: 4rem

</style>
