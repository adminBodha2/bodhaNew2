<script lang="ts">

	import Container from '$lib/comps/wrapper.svelte'
	import '$lib/styles/system/document-layout.sass';

	let { children } = $props();

</script>


<Container graphing={true}>
	<section class="docgrid">
		<div class="box docside">
			ues
		</div>
		<div class="docmain box no-image lg:pright64 sm:pbot32">
			{@render children?.()}
		</div>
	</section>
</Container>

<style lang="sass">

.docmain
	background: var(--color-back)
	@media (min-width: 1025px)
		border-right: var(--border-main)

</style>