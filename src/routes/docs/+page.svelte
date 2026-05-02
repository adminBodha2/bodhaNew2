<script lang="ts">

	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'

</script>

<Container>
	<div class="stdbox stdpad header-margin is-last">
	<Crumb showT={true} title="Site Docs"/>
	<div class="textbox">
		<a class="linked" href="/docs/terms-and-conditions">Terms and Conditions</a>
		<a class="linked" href="/docs/privacy-policy">Privacy Policy</a>
		<a class="linked" href="/docs/refunds-policy">Refunds Policy</a>
	</div>
	</div>
</Container>