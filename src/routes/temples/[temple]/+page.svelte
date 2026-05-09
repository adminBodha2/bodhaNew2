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
	<section class="box wrapper-std rgap32 header-margin">
		<Crumb showT={true} title={templeName} showD={true} desc={crumbDescription} />
		<article class="box">
			{#if displayImage}
				<section class="box">
					<img class="fit radius" src={displayImage} alt={templeName} />
				</section>
			{/if}
			{#if factItems.length > 0}
				<section class="grid grid-cols-2 lg:grid-cols-4 white-grid">
					{#each factItems as item}
						<div class="box whitestone p16 lg:p24 rgap4">
							<p class="tag-text anveshi-o tt-u bold tight">{item.label}</p>
							<p class="tight paragraph-text">{item.value}</p>
						</div>
					{/each}
				</section>
			{/if}
			{#if data.temple.is_anveshi}
				<div class="box rgap16">
					<div class="row cgap16 ycenter">
						<p class="tag-pill anveshi">In Anveshi</p>
						{#if anveshiHref}
							<a class="primary anveshi" href={anveshiHref}><span>View Anveshi Chapter</span></a>
						{/if}
					</div>
				</div>
			{/if}
			{#if data.temple.description}
			<div class="temple-grid">
				<div class="temple-side box sm:ptop32">
					{#if scripturalItems.length > 0}
						{#each scripturalItems as item}
							<div class="sidebar-item box borderbot pbot8 ptop8">
								<p>{item}</p>
							</div>
						{/each}
					{/if}
					{#if otherDetails.length > 0}
						<div class="box facts ptop32 rgap4 sm:rgap8">
							<p class="paragraph-text w600 pbot8">Facts:</p>
								{#each otherDetails as detail}
									<p class="grey">{detail}</p>
								{/each}
						</div>
					{/if}
				</div>
				<div class="temple-main box sm:ptop32">
					<p class="paragraph-text">{data.temple.description}</p>
	<p class="paragraph-text">{data.temple.description}</p>
				</div>
			</div>
			{/if}
		</article>
	</section>
</Container>

<style lang="sass">

.temple-grid
	display: grid
	.temple-side
		grid-area: side
	.temple-main
		grid-area: main
	grid-template-columns: 1fr
	grid-template-areas: "side" "main"
	@media (min-width: 1025px)
		grid-template-columns: 360px 1fr
		grid-template-areas: "side main"
		border-bottom: var(--border-dark)
		.temple-main
			border-left: var(--border-dark)
			padding-left: 4rem
			padding-top: 4rem
			padding-bottom: 4rem
		.temple-side
			padding-top: 2rem
			padding-right: 2rem
			padding-bottom: 2rem
			position: sticky
			top: 72px
			height: calc(100vh - 72px)
			overflow-y: scroll
	@media (min-width: 1201px)
		grid-template-columns: 440px 1fr
		grid-template-areas: "side main"

</style>