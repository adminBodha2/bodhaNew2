<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let selectedState = $state(getDefaultState());
	let temples = $derived(data.temples.filter((item) => item.state === selectedState));

	let title = $derived('Sacred Temples | Bodha');
	let metaDescription = $derived('A browsable index of sacred temples grouped by state.');
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	function getDefaultState() {
		return data.states[0] ?? '';
	}
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<div class="stdbox stdpad header-margin is-last">
		<Crumb showT={true} title="Sacred Temples" showD={true} desc="Repository of 268 temples of India and information about them."/>
		<div class="elembox">
			<p class="rem1 altprim">This data is sourced from this <a class="linked" target="_blank" rel="noreferrer" href="https://github.com/rishabhmodi03/hindu-temples">Hindu Temples repository</a> at Github.<br>The data is not completely clean, and there are still errors in mapping, names etc.<br>Please point out any that you find by mailing us at sitemaster@bodharesearch.in</p> 
			<div class="row cgap8 rgap8 wrap">
					{#each data.states as state}
						<button
							type="button"
							class="filter-button"
							class:active={selectedState === state}
							onclick={() => (selectedState = state)}
						>
							{state}
						</button>
					{/each}
			</div>
			<div class="grid four white-grid stay2">
				{#each temples as temple}
					<a
						class="blank labelbox whitestone card-padded"
						href={`/sacred/temples/${temple.slug}`}
					>
						<p class="w500 tight">{temple.name}</p>
						{#if temple.infoview}
							<p class="descriptor-text grey tight">{temple.infoview.slice(0,300)}</p>
						{:else if temple.overview}
							<p class="descriptor-text grey tight">{temple.overview.slice(0,300)}...</p>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>
</Container>
