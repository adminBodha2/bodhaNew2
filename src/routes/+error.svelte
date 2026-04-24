<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import { page } from '$app/state';

</script>

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<div class="labelbox">
		<p class="status sm">{page.status} | Sorry, {page.error?.message ?? ''}!</p>
		<p>If you feel this link should exist, or to report a broken link in general, please write to us at <span class="w500">sitemaster@bodharesearch.in</span></p>
		<div class="row cgap16 rgap16 mwrap ycenter pbot32">
			<button class="blank" on:click={() => history.back()}><p class="blue">← Back to Previous Page</p></button>
		</div>
		<img src="/images/error.gif" alt="error"/>
		</div>
	</div>
</Container>

<style lang="sass">

img
	width: 400px
	border: var(--border-dark)
	border-radius: 8px
	height: 100%
	object-fit: contain
	@media screen and (max-width: 1024px)
		width: 100%

</style>