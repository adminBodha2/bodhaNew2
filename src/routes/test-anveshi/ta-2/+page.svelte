<script lang="ts">

	import Container from '$lib/comps/wrapper.svelte';

</script>

<Container>
	<div class="db-grid padded bdr header-margin">
		<div class="db-grid span-4">
			<div class="bdr brx span-4">
				<p>span full</p>
			</div>
			<div class="bdr brx span-2">
					<p>span half</p>
			</div>
			<div class="bdr brx span-3">
					<p>span third</p>
			</div>
			<div class="bdr brx">
					<p>d3</p>
			</div>
		</div>
		<div class="db-grid span-4">
			<div class="bdr brx">
					<p>d4</p>
			</div>
			<div class="bdr brx">
					<p>d5</p>
			</div>
			<div class="bdr brx">
					<p>d6</p>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.brx
	padding: 1rem

</style>
