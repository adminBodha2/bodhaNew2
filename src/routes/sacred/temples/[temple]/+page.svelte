<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const infoOrder = [
		'main_deity',
		'other_deities',
		'history',
		'architecture',
		'significance',
		'overview'
	];

	let title = $derived(`${data.temple.name} | Sacred Temples`);
	let metaDescription = $derived(getMetaDescription(data.temple));
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let crumbDescription = $derived(
		[data.temple.info?.location, data.temple.state].filter(Boolean).join(' | ')
	);
	let infoItems = $derived(
		infoOrder
			.map((key) => ({
				key,
				label: labelFromKey(key),
				value: data.temple.info?.[key]
			}))
			.filter((item): item is { key: string; label: string; value: string } => Boolean(item.value))
	);
	let storyArchitectureItems = $derived([
		...recordEntries(data.temple.architecture).map(([key, value]) => ({
			key: `architecture-${key}`,
			label: architectureLabel(key),
			value
		})),
		...recordEntries(data.temple.story).map(([key, value]) => ({
			key: `story-${key}`,
			label: labelFromKey(key),
			value
		}))
	]);
	let visitingGuideItems = $derived(
		recordEntries(data.temple.visiting_guide).map(([key, value]) => ({
			key,
			label: labelFromKey(key),
			value
		}))
	);

	function recordEntries(value: unknown) {
		if (!value || typeof value !== 'object' || Array.isArray(value)) {
			return [];
		}

		return Object.entries(value as Record<string, unknown>).filter(
			(entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].trim().length > 0
		);
	}

	function labelFromKey(key: string) {
		return key.replaceAll('_', ' ');
	}

	function architectureLabel(key: string) {
		return key === 'overview' ? 'architectural overview' : labelFromKey(key);
	}

	function getMetaDescription(temple: PageProps['data']['temple']) {
		return (
			temple.info?.overview ??
			temple.info?.description ??
			temple.story?.overview ??
			temple.story?.description ??
			`Notes on ${temple.name}.`
		);
	}
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<div class="stdbox stdpad header-margin is-last">
		<Crumb showT={true} title={data.temple.name} showD={true} desc={crumbDescription} />

		<article class="box rgap24">
			{#if infoItems.length > 0}
				<section class="box">
					<p class="paragraph-text">{#each infoItems as item}{item.value.replaceAll('.','. ')}{/each}.</p>
				</section>
			{/if}

			{#if storyArchitectureItems.length > 0}
				<section class="grid four midgaps">
					{#each storyArchitectureItems as item}
						<div class="labelbox">
							<p class="tag-text green tt-u bold tight">{item.label}</p>
							<p class="tight">{item.value}</p>
						</div>
					{/each}
				</section>
			{/if}

			{#if visitingGuideItems.length > 0}
				<section class="grid four">
					{#each visitingGuideItems as item}
						<div class="labelbox card-padded">
							<p class="descriptor-text green tt-u tight">{item.label}</p>
							<p class="descriptor-text grey tight">{item.value}</p>
						</div>
					{/each}
				</section>
			{/if}
		</article>
	</div>
</Container>
