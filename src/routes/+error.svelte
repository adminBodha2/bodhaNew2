<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import { page } from '$app/state';

</script>

<Container>
	<div class="box-t mmVH">
		<div class="column">
		<p class="status sm">{page.status} | {page.error?.message ?? ''}</p>
		<p class="big pbot16 bold">{page.status === 404 ? 'Sorry, Page not found' : 'Something went wrong'}</p>
		<div class="row cgap16 rgap16 mwrap ycenter pbot32">
			<button class="blank" on:click={() => history.back()}><p class="blue">← Back to Previous Page</p></button>
		</div>
		<img src="/images/error.gif" alt="error"/>
		</div>
	</div>
</Container>

<style lang="sass">

img
	width: 200px
	border: 1px solid #000000
	border-radius: 8px
	height: 100%
	object-fit: contain

</style>