<script lang="ts">

	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { slide } from 'svelte/transition';
	import { libraryMenu, toggleLibraryMenu, iW } from '$lib/utils/globalstores'
	import Filter from '$lib/icons/filter.svelte'

	const closeMenu = () => ($libraryMenu = false)

</script>


<div class="box library-modal-outer" class:isopen={$libraryMenu} class:mobile={$iW} class:desk={!$iW} transition:slide={{ duration: 200 }} use:clickOutsideAction on:clickoutside={closeMenu}>
	<div class="row">
		<Filter/>
	</div>
</div>


<style lang="sass">

.mobile.library-modal-outer
	height: 100vh
	width: 400px
	z-index: 500
	background: #FFF
	top: 128px
	right: -400px
	transition: all 0.2s ease
	&.isopen
		right: 0

</style>
