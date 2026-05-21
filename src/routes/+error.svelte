<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { page } from '$app/state';
	import { DEFAULT_IMAGE, SITE_URL } from '$lib/utils/seo';
	const title = 'Page Not Found | Bodha';
	const metaDescription = 'The requested page could not be found on Bodha.';
	const metaUrl = SITE_URL;
	const metaImage = DEFAULT_IMAGE;
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="2560" imHeight="1440" />

<Container>
	<section class="wrapper-std header-margin">
		<div class="box rgap16">
			<p class="status highlight-text">{page.status} | Sorry, {page.error?.message ?? ''}!</p>
			<p class="txt-lg">If you feel this link should exist, or to report a broken link in general, please write to us at <span class="w500">sitemaster@bodharesearch.in</span></p>
			<div class="row cgap16 rgap16 mwrap ycenter pbot32">
				<button class="blank" onclick={() => history.back()}><p class="theme txt-lg">← Back to Previous Page</p></button>
			</div>
			<img src="/images/error.gif" alt="error" />
		</div>
	</section>
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
