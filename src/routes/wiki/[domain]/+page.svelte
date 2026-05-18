<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = $derived(`${data.domain.title} | Bodha Knowledge Wiki`);
	const metaDescription = $derived(data.domain.description);
	const metaUrl = $derived(absoluteUrl(`/wiki/${data.domain.slug}`));
	const metaImage = absoluteImage('/images/bodhacover.png');
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<section class="wrapper-std header-margin">
		<Crumb showT={true} title={data.domain.title} showD={true} desc={data.domain.description} showRow={true}>
			<div class="box rgap4">
				<p class="txt-xs tt-u w500 grey0">Connected Knowledge - <span class="theme">{data.totalConnected}</span></p>
				{#if data.domain.tags.length}
					<div class="tag-list">
						{#each data.domain.tags as tag}
							<p class="txt-xs tt-u w500 theme">{tag.replaceAll('-', ' ')}</p>
						{/each}
					</div>
				{/if}
			</div>
		</Crumb>
		<div class="box rgap32">
			{#each data.sections as section}
				<div class="domain-section">
					<h2 class="txt-2xl w600">{section.title}</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 white-grid">
						{#each section.items as item}
							<article class="box whitestone p32">
								<div class="box">
									{#if item.lens}
										<p class="txt-xs tt-u w500 theme">{item.lens}</p>
									{/if}
									{#if item.href}
										<a class="txt-xl w500 ptop8 pbot16" href={item.href}>{item.title}</a>
									{:else}
										<h3 class="txt-xl w500 ptop8 pbot16">{item.title}</h3>
									{/if}
									{#if item.description}
										<p class="grey1 lh14 pbot16">{item.description}</p>
									{/if}
									{#if item.authors.length}
										<p class="txt-sm tt-u w500 grey2">{item.authors.join(', ')}</p>
									{/if}
								</div>
							</article>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.tag-list
	display: flex
	flex-wrap: wrap
	gap: 7px

.domain-section
	display: grid
	gap: 12px

</style>
