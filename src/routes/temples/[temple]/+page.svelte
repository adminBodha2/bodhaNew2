<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import type { PageProps } from './$types';

	type LabelValue = {
		label: string;
		value: string;
	};

	let { data }: PageProps = $props();

	let anveshiDescription = $derived(
		firstText(data.temple['anveshi-description'], data.temple.anveshidescription)
	);
	let mainDeity = $derived(firstText(data.temple.info?.['main-deity'], data.temple.info?.maindeity));
	let coordinates = $derived(formatCoordinates(data.temple.latitude, data.temple.longitude));
	let anveshiHref = $derived(
		data.temple.isanveshi && hasText(data.temple.anveshichapter)
			? `/anveshi/${data.temple.anveshichapter}`
			: ''
	);

	let title = $derived(`${data.temple.name} | Sacred Temples`);
	let metaDescription = $derived(getMetaDescription(data.temple));
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.temple.image));

	let crumbDescription = $derived(
		[data.temple.info?.location, data.temple.state].filter(hasText).join(' | ')
	);
	let factItems = $derived(
		[
			{ label: 'state', value: data.temple.state },
			{ label: 'location', value: data.temple.info?.location },
			{ label: 'main deity', value: mainDeity },
			{ label: 'coordinates', value: coordinates }
		].filter(isLabelValue)
	);
	let otherDeities = $derived(
		(data.temple.info?.['other-deities'] ?? [])
			.map((item) => item.deity)
			.filter(hasText)
	);
	let highlights = $derived(
		(data.temple.info?.highlights ?? [])
			.map((item) => item.highlight)
			.filter(hasText)
	);
	let scripturalReferences = $derived(
		(data.temple.story?.['scriptural-references'] ?? [])
			.map((item) => item.reference)
			.filter(hasText)
	);
	let scripturalFacts = $derived(normalizeScripturalFacts(data.temple.story?.['scriptural-facts']));
	let visitingGuideItems = $derived(
		[
			{ label: 'getting there', value: data.temple['visiting-guide']?.['getting-there'] },
			{ label: 'things to do', value: data.temple['visiting-guide']?.['things-to-do'] },
			{ label: 'tips', value: data.temple['visiting-guide']?.tips }
		].filter(isLabelValue)
	);
	let keyFeatures = $derived(
		(data.temple.architecture?.['key-features'] ?? [])
			.map((item) => item.feature)
			.filter(hasText)
	);
	let hasSupportingItems = $derived(
		otherDeities.length > 0 ||
			highlights.length > 0 ||
			scripturalReferences.length > 0 ||
			scripturalFacts.length > 0
	);

	function hasText(value: unknown): value is string {
		return typeof value === 'string' && value.trim().length > 0;
	}

	function firstText(...values: unknown[]) {
		return values.find(hasText) ?? '';
	}

	function isLabelValue(item: { label: string; value: unknown }): item is LabelValue {
		return hasText(item.value);
	}

	function formatCoordinates(latitude: number | null | undefined, longitude: number | null | undefined) {
		if (typeof latitude !== 'number' || typeof longitude !== 'number') {
			return '';
		}

		return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
	}

	function normalizeScripturalFacts(
		facts: PageProps['data']['temple']['story'] extends infer Story
			? Story extends { 'scriptural-facts'?: infer Facts }
				? Facts | undefined
				: never
			: never
	) {
		if (!Array.isArray(facts)) {
			return [];
		}

		return facts
			.map((item) => {
				if (typeof item === 'string') {
					return item;
				}

				return firstText(item.fact, item.detail);
			})
			.filter(hasText);
	}

	function getMetaDescription(temple: PageProps['data']['temple']) {
		const description = firstText(
			temple['anveshi-description'],
			temple.anveshidescription,
			temple.story?.details,
			temple.architecture?.details,
			`Notes on ${temple.name}.`
		);

		return description.length > 180 ? `${description.slice(0, 177).trim()}...` : description;
	}
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<div class="stdbox stdpad header-margin is-last">
		<Crumb showT={true} title={data.temple.name} showD={true} desc={crumbDescription} />
		<article class="box rgap24">
			{#if data.temple.image}
				<section class="box">
					<img class="fit radius" src={data.temple.image} alt={data.temple.name} />
				</section>
			{/if}

			{#if factItems.length > 0}
				<section class="grid four white-grid">
					{#each factItems as item}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">{item.label}</p>
							<p class="tight descriptor-text">{item.value}</p>
						</div>
					{/each}
				</section>
			{/if}

			{#if data.temple.isanveshi}
				<section class="box rgap16">
					<div class="row cgap16 ycenter">
						<p class="tag-pill anveshi">In Anveshi</p>
						{#if anveshiHref}
							<a class="primary anveshi" href={anveshiHref}><span>View Anveshi Chapter</span></a>
						{/if}
					</div>
					{#if anveshiDescription}
						<p class="paragraph-text">{anveshiDescription}</p>
					{/if}
				</section>
			{/if}

			{#if data.temple.story?.details}
				<section class="box">
					<p class="tag-text green tt-u bold tight">story</p>
					<p class="paragraph-text">{data.temple.story.details}</p>
				</section>
			{/if}

			{#if hasSupportingItems}
				<section class="grid two white-grid">
					{#if otherDeities.length > 0}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">other deities</p>
							<ul class="box rgap8">
								{#each otherDeities as deity}
									<li class="descriptor-text">{deity}</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if highlights.length > 0}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">highlights</p>
							<ul class="box rgap8">
								{#each highlights as highlight}
									<li class="descriptor-text">{highlight}</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if scripturalReferences.length > 0}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">scriptural references</p>
							<ul class="box rgap8">
								{#each scripturalReferences as reference}
									<li class="descriptor-text">{reference}</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if scripturalFacts.length > 0}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">scriptural facts</p>
							<ul class="box rgap8">
								{#each scripturalFacts as fact}
									<li class="descriptor-text">{fact}</li>
								{/each}
							</ul>
						</div>
					{/if}
				</section>
			{/if}

			{#if visitingGuideItems.length > 0}
				<section class="grid three white-grid">
					{#each visitingGuideItems as item}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">{item.label}</p>
							<p class="tight descriptor-text">{item.value}</p>
						</div>
					{/each}
				</section>
			{/if}

			{#if data.temple.architecture?.details || keyFeatures.length > 0}
				<section class="box rgap16">
					{#if data.temple.architecture?.details}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">architecture</p>
							<p class="tight descriptor-text">{data.temple.architecture.details}</p>
						</div>
					{/if}

					{#if keyFeatures.length > 0}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">key features</p>
							<ul class="box rgap8">
								{#each keyFeatures as feature}
									<li class="descriptor-text">{feature}</li>
								{/each}
							</ul>
						</div>
					{/if}
				</section>
			{/if}
		</article>
	</div>
</Container>
