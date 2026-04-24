<script lang="ts">

	import type { Snippet } from 'svelte';

	type Props = {
		narrow?: boolean;
		isTop?: boolean;
		scaled?: boolean;
		offcolor?: boolean;
		toffcolor?: boolean;
		children?: Snippet;
	};


	let {
		narrow = false,
		isTop = false,
		scaled = false,
		offcolor = false,
		toffcolor = false,
		children
	}: Props = $props();

</script>

<div class="pbot64 column" class:scaledTypo={scaled} class:top-cushion={isTop} class:widebox={!narrow} class:narrowbox={narrow} class:offcolor={offcolor} class:toffcolor={toffcolor}>
  {@render children?.()}
</div>

<style lang="sass">

.pbot64.column.widebox
	min-height: calc(100vh - 80px)
	padding-left: 12px
	padding-right: 12px
	&.top-cushion
		padding-top: 7rem
		@media screen and (min-width: 1025px)
			padding-top: 8rem
	@media screen and (min-width: 1025px)
		padding-left: 24px
		padding-right: 24px
	@media screen and (min-width: 1201px)
		padding-left: 32px
		padding-right: 32px

.pbot64.column.narrowbox
	min-height: 100vh

.offcolor
	background: #f7f7f7

</style>