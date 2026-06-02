<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	const title = 'Synaptic Sanskrit Reader | Bodha Open Library';
	const metaDescription = 'A Sanskrit reader and discovery foundation for Aṣṭādhyāyī rules, Dhātupāṭha roots, and dictionary words.';
	const metaUrl = absoluteUrl('/library/sections');
	const metaImage = absoluteImage('/images/sitemaster/list-ashtadhyayi.png');
	let sections = $derived([
		{
			title: 'Aṣṭādhyāyī',
			href: '/library/sections/ashtadhyayi',
			desc: 'Browse Pāṇini’s rule sequence by adhyāya and pāda, with source links and detail navigation.'
		},
		{
			title: 'Dhātupāṭha',
			href: '/library/sections/dhatus',
			desc: 'Search and filter verbal roots by root form, meaning, and gaṇa.'
		},
		{
			title: 'Dictionary Words',
			href: '/library/sections/words',
			desc: 'Browse a universal Sanskrit word list with concise Apte and Monier-Williams meaning layers.'
		}
	]);
	let jsonld = $derived(stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: sections.map((section) => ({
				name: section.title,
				description: section.desc,
				url: absoluteUrl(section.href)
			}))
		})
	));
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1600" imHeight="1000" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb isSolo={true} showT={true} title="Sanskrit Universe" showD={true} desc={metaDescription} fullP={true} />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
			{#each sections as section}
				<a class="blank box rgap8 std-pad b-main whitestone" href={section.href}>
					<p class="txt-xl w600 a-hover">{section.title}</p>
					<p class="grey2 lh14">{section.desc}</p>
				</a>
			{/each}
		</div>
	</section>
</Container>
