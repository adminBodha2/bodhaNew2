<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf-new.svelte';
	import Revealing from '$lib/motion-core/stacking-words/Reveal2.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let iW = $state(0);
	let sY = $state(0);

	let imageLink = '/images/designbodha/pramana-library.webp';

	const title = 'Pramana Library | Bodha';
	const metaDescription = 'The Pramana Library is a set of cognitive and communicative concepts from the Sanskrit intellectual traditions, for designers, researchers, and people building and leading with AI.';
	const metaUrl = absoluteUrl('/designbodha/pramana-library');
	const metaImage = absoluteImage('/images/designbodha/pramana-library.webp');

	const jsonld = stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'AboutPage'
		})
	);
</script>

<svelte:window bind:innerWidth={iW} bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Parallax {imageLink} wipe={true} />
<Container>
	<Crumb showT={true} title="Pramana Library" showD={true} desc="A set of cognitive and communicative concepts from the Sanskrit intellectual traditions, for designers, researchers, and people building and leading with AI." />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<div class="box rgap16">
				<Revealing>
					<p class="txt-2xl w600">Cognitive and communicative concepts from the Sanskrit intellectual traditions, for designers, researchers, and people building and leading with AI.</p>
				</Revealing>
				<Revealing>
					<p class="highlight-text">
						A reference of operational concepts drawn from the Indian Knowledge Systems. Each card names a move you can make in your work - a question you can ask, a discrimination you can draw - that the available English vocabulary does not give you a clean way to name. Each card has an English title leading, with the Sanskrit term as a subtitle. Each card closes with a Diagnostic Question, an
						IKS Roots section for the Sanskrit apparatus, and a short further-reading note.
					</p>
				</Revealing>
			</div>
			<div class="box rgap16">
				<Revealing>
					<p class="txt-lg lh15">
						Each card has an English title leading, with the Sanskrit term as a subtitle. The card carries a tradition ID (N for Nyaya, Y for Yoga, M for Mimamsa, V for Vedanta, G for Vyakarana grammar, A for Alankara-shastra poetics, O for other), an applicability tag — Users of tech products, Builders, Stewards who set direction — a gist line, then a body in plain English. Each card closes with
						a Diagnostic Question, an IKS Roots section for the Sanskrit apparatus, and a short further-reading note. A 'Where the closest English-language analog falls short' section appears where the comparison sharpens the card. Some cards skip it because the concept has no obvious English near-neighbour to set against.
					</p>
				</Revealing>
				<Revealing>
					<p class="txt-lg lh15">
						<b>Users</b> - anyone working with tech products day-to-day. Writers using LLMs, knowledge workers querying assistants, anyone receiving AI output as part of their work.<br />
						<b>Builders</b> - anyone making tech products. Developers, designers, prompt engineers, ML practitioners, UX writers, anyone touching how the product behaves.<br />
						<b>Stewards</b> - anyone setting direction or judging the work. Product managers, design leads, research leads, founders, evaluators, brand owners, executives.
					</p>
				</Revealing>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Pramana Cards" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
			{#each data.allcards as item}
				<a class="box rgap16 b-main p24 lg:p32 whitestone" href={item.linkpath}>
					<div class="row mwrap xbetween">
						<p class="txt-00 tt-u desb">{item.meta.id}</p>
						{#if item.meta.tradition}
							<p class="txt-00 tt-u desb">{item.meta.tradition}</p>
						{/if}
					</div>
					<div class="box">
						<p class="a-hover txt-xl lg:txt-2xl w600 tt-c lh12">{item.meta.title}</p>
						{#if item.meta.sanskrit?.transliteration}
							<p class="grey1 txt-lg">{item.meta.sanskrit.transliteration}</p>
						{/if}
					</div>
					{#if item.meta.gist}
						<p class="lh14 grey1">{item.meta.gist}</p>
					{/if}
					{#if item.meta.applicability.length}
						<div class="row self-bottom bordertop ptop8 cgap16 mwrap" aria-label="Applicability">
							{#each item.meta.applicability as tag (tag)}
								<p class="txt-xs tt-u w500">{tag}</p>
							{/each}
						</div>
					{/if}
				</a>
			{/each}
		</div>
	</section>
</Container>
