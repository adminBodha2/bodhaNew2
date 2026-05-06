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

	let templeName = $derived(data.temple.temple_name);
	let stateLabel = $derived(data.temple.state?.trim() || 'Unknown');
	let displayImage = $derived(data.temple.anveshi_image || data.temple.image || '');
	let coordinates = $derived(formatCoordinates(data.temple.latitude, data.temple.longitude));
	let anveshiHref = $derived(
		data.temple.is_anveshi && hasText(data.temple.chapter) ? `/anveshi/${data.temple.chapter}` : ''
	);
	let categoryTags = $derived(
		[
			data.temple.category,
			data.temple.temple_type,
			flagLabel('Shiva temple', data.temple.shiva_temple),
			flagLabel('Vishnu temple', data.temple.vishnu_temple),
			flagLabel('Devi temple', data.temple.devi_temple),
			flagLabel('Ganesha temple', data.temple.ganesha_temple),
			flagLabel('Sapta Puri', data.temple.saptapuri),
			flagLabel('Char Dham', data.temple.char_dham),
			flagLabel('Architectural heritage', data.temple.is_architectural_heritage)
		].filter(hasText)
	);

	let title = $derived(`${templeName} | Sacred Temples`);
	let metaDescription = $derived(getMetaDescription(data.temple));
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(displayImage));

	let crumbDescription = $derived([data.temple.main_deity, stateLabel].filter(hasText).join(' | '));
	let factItems = $derived(
		[
			{ label: 'state', value: stateLabel },
			{ label: 'main deity', value: data.temple.main_deity },
			{ label: 'category', value: data.temple.category },
			{ label: 'temple type', value: data.temple.temple_type },
			{ label: 'coordinates', value: coordinates }
		].filter(isLabelValue)
	);
	let otherDeities = $derived(normalizeItems(data.temple.other_deities, ['deity', 'details']));
	let otherDetails = $derived(normalizeItems(data.temple.other_details, ['details']));
	let scripturalItems = $derived(
		normalizeItems(data.temple.scriptural, ['details', 'reference', 'fact'])
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

	function flagLabel(label: string, value: boolean | null | undefined) {
		return value === true ? label : '';
	}

	function formatCoordinates(latitude: number | null | undefined, longitude: number | null | undefined) {
		if (typeof latitude !== 'number' || typeof longitude !== 'number') {
			return '';
		}

		return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
	}

	function normalizeItems(items: unknown, fields: string[]) {
		if (!Array.isArray(items)) {
			return [];
		}

		return items
			.map((item) => {
				if (typeof item === 'string') {
					return item;
				}

				if (!item || typeof item !== 'object') {
					return '';
				}

				const record = item as Record<string, unknown>;
				return firstText(...fields.map((field) => record[field]));
			})
			.filter(hasText);
	}

	function getMetaDescription(temple: PageProps['data']['temple']) {
		const description = firstText(
			temple.description,
			temple.architecture,
			`Notes on ${temple.temple_name}.`
		);

		return description.length > 180 ? `${description.slice(0, 177).trim()}...` : description;
	}
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<div class="stdbox stdpad header-margin is-last">
		<Crumb showT={true} title={templeName} showD={true} desc={crumbDescription} />
		<article class="box rgap24">
			{#if displayImage}
				<section class="box">
					<img class="fit radius" src={displayImage} alt={templeName} />
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

			{#if categoryTags.length > 0}
				<section class="row cgap8 ycenter wrap">
					{#each categoryTags as tag}
						<p class="tag-pill">{tag}</p>
					{/each}
				</section>
			{/if}

			{#if data.temple.is_anveshi}
				<section class="box rgap16">
					<div class="row cgap16 ycenter">
						<p class="tag-pill anveshi">In Anveshi</p>
						{#if anveshiHref}
							<a class="primary anveshi" href={anveshiHref}><span>View Anveshi Chapter</span></a>
						{/if}
					</div>
				</section>
			{/if}

			{#if data.temple.description}
				<section class="box">
					<p class="tag-text green tt-u bold tight">description</p>
					<p class="paragraph-text">{data.temple.description}</p>
				</section>
			{/if}

			{#if otherDeities.length > 0 || otherDetails.length > 0 || scripturalItems.length > 0}
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

					{#if otherDetails.length > 0}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">other details</p>
							<ul class="box rgap8">
								{#each otherDetails as detail}
									<li class="descriptor-text">{detail}</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if scripturalItems.length > 0}
						<div class="labelbox card-padded whitestone">
							<p class="tag-text green tt-u bold tight">scriptural</p>
							<ul class="box rgap8">
								{#each scripturalItems as item}
									<li class="descriptor-text">{item}</li>
								{/each}
							</ul>
						</div>
					{/if}
				</section>
			{/if}

			{#if data.temple.architecture}
				<section class="box rgap16">
					<div class="labelbox card-padded whitestone">
						<p class="tag-text green tt-u bold tight">architecture</p>
						<p class="tight descriptor-text">{data.temple.architecture}</p>
					</div>
				</section>
			{/if}
		</article>
	</div>
</Container>
