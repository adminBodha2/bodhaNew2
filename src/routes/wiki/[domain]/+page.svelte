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
		<div class="section-grid">
			{#each data.sections as section}
				<section class="domain-section">
					<div class="section-head">
						<h2>{section.title}</h2>
						<span>{section.items.length}</span>
					</div>
					{#if section.items.length}
						<div class="item-list">
							{#each section.items as item}
								<article class="domain-card">
									<div class="card-main">
										{#if item.href}
											<a href={item.href}>{item.title}</a>
										{:else}
											<h3>{item.title}</h3>
										{/if}
										{#if item.authors.length}
											<p class="meta-line">{item.authors.join(', ')}</p>
										{/if}
										{#if item.description}
											<p class="description">{item.description}</p>
										{/if}
									</div>
									{#if item.lens}
										<span class="lens">{item.lens}</span>
									{/if}
								</article>
							{/each}
						</div>
					{:else}
						<p class="empty-note">No connected {section.title.toLowerCase()} yet.</p>
					{/if}
				</section>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.tag-list
	display: flex
	flex-wrap: wrap
	gap: 7px

.section-grid
	display: grid
	gap: 24px

.domain-section
	display: grid
	gap: 12px

.section-head
	display: flex
	align-items: baseline
	justify-content: space-between
	gap: 16px
	border-bottom: var(--border-main)
	padding-bottom: 8px
	h2
		margin: 0
		color: var(--color-black)
		font-size: clamp(1.35rem, 3vw, 2rem)
		font-weight: 700
		letter-spacing: 0
	span
		color: var(--domain-color)
		font-size: 0.86rem
		font-weight: 800

.item-list
	display: grid
	grid-template-columns: repeat(2, minmax(0, 1fr))
	gap: 10px
	@media (max-width: 760px)
		grid-template-columns: 1fr

.domain-card
	display: flex
	align-items: flex-start
	justify-content: space-between
	gap: 12px
	border: var(--border-main)
	border-radius: 7px
	padding: 14px
	background: var(--color-back)

.card-main
	display: grid
	gap: 5px
	min-width: 0
	a,
	h3
		margin: 0
		color: var(--color-black)
		font-size: 0.98rem
		font-weight: 700
		line-height: 1.25
		letter-spacing: 0
		text-decoration: none
	a:hover
		color: var(--domain-color)

.meta-line,
.description
	margin: 0
	line-height: 1.4

.meta-line
	color: var(--domain-color)
	font-size: 0.78rem
	font-weight: 700

.description
	color: var(--color-grey-1)
	font-size: 0.84rem

.lens
	flex: 0 0 auto
	border-radius: 999px
	padding: 4px 7px
	background: color-mix(in srgb, var(--domain-color) 10%, transparent)
	color: var(--color-grey-2)
	font-size: 0.68rem
	font-weight: 700
	text-transform: uppercase

.empty-note
	margin: 0
	border: var(--border-main)
	border-radius: 7px
	padding: 14px
	color: var(--color-grey-1)
	background: var(--color-stone-1-2)
</style>
