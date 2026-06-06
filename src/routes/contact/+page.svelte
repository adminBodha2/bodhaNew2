<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import FB from '$lib/icons/facebook.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Insta from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	const title = 'Contact Bodha Research | Hindu, Dharma, and IKS Collaboration';
	const metaDescription = 'Contact Bodha Research for queries, collaborations, website issues, and social media updates.';
	const metaUrl = absoluteUrl('/contact');
	const metaImage = absoluteImage('/images/bodhacover.png');

	const jsonld = stringifyJsonLd({
		...webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'ContactPage'
		}),
		mainEntity: {
			'@type': 'Organization',
			name: 'Bodha',
			url: absoluteUrl('/'),
			email: 'contact@bodharesearch.in',
			sameAs: [
				'https://x.com/BodhaResearch',
				'https://www.facebook.com/profile.php?id=61584291760187',
				'https://www.instagram.com/bodharesearch',
				'https://www.linkedin.com/company/bodha-research/'
			]
		}
	});
</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container>
	<section class="wrapper-std">
<Crumb showT={true} title="Contact Us" thinBot={true}/>
		<p class="highlight-text">
			Write to us at <span class="blue">contact@bodharesearch.in</span><br />
			or, reach out on social media-
		</p>
		<div class="row cgap16 ycenter">
			<a class="blank" href="https://x.com/BodhaResearch" rel="noreferrer" target="_blank">
				<Twitter size="24" color={'var(--color-theme-dark)'} />
			</a>
			<a class="blank" href="https://www.facebook.com/profile.php?id=61584291760187" rel="noreferrer" target="_blank">
				<FB size="24" color={'var(--color-theme-dark)'} />
			</a>
			<a class="blank" href="https://www.instagram.com/bodharesearch" rel="noreferrer" target="_blank">
				<Insta size="24" color={'var(--color-theme-dark)'} />
			</a>
			<a class="blank" href="https://www.linkedin.com/company/bodha-research/" rel="noreferrer" target="_blank">
				<Linkedin size="24" color={'var(--color-theme-dark)'} />
			</a>
		</div>
		<p class="highlight-text">For queries on website, to report bugs/broken links etc., please write to sitemaster@bodharesearch.in</p>
	</section>
</Container>
