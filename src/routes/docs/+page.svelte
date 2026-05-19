<script lang="ts">

	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	const title = 'Bodha Site Documents | Legal, Privacy, Refunds, and Website Policies';
	const metaDescription = 'Legal and policy documents for Bodha, including terms and conditions, privacy policy, and refunds policy.';
	const metaUrl = absoluteUrl('/docs');
	const metaImage = absoluteImage('/images/bodhacover.png');
	const jsonld = stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'CollectionPage'
		})
	);

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} {jsonld} />

<Container>
	<section class="box wrapper-std rgap32 header-margin">
	<Crumb showT={true} title="Site Docs" showD={true} desc={metaDescription}/>
	<div class="box rgap16">
		<a class="linked paragraph-text" href="/docs/terms-and-conditions">Terms and Conditions</a>
		<a class="linked paragraph-text" href="/docs/privacy-policy">Privacy Policy</a>
		<a class="linked paragraph-text" href="/docs/refunds-policy">Refunds Policy</a>
	</div>
	</section>
</Container>
