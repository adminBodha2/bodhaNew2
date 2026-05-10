<script lang="ts">

	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'

</script>

<Container>
	<section class="box wrapper-std rgap32 header-margin">
	<Crumb showT={true} title="Site Docs"/>
	<div class="box rgap16">
		<a class="linked paragraph-text" href="/docs/terms-and-conditions">Terms and Conditions</a>
		<a class="linked paragraph-text" href="/docs/privacy-policy">Privacy Policy</a>
		<a class="linked paragraph-text" href="/docs/refunds-policy">Refunds Policy</a>
	</div>
	</section>
</Container>