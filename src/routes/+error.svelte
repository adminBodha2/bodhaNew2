<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import { page } from '$app/state';

</script>

<Container>
	<div class="box-t mmVH">
		<div class="column">
		<p class="status sm">{page.status} | {page.error?.message ?? ''}</p>
		<p class="big pbot16 bold">{page.status === 404 ? 'Sorry, Page not found' : 'Something went wrong'}</p>
		<a class="linked" href="/">← Back to Homepage</a>
		</div>
	</div>
</Container>