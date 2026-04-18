<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	export let data;

	const shelfMap: Record<string, { label: string; href: string }> = {
		essentials: { label: 'Essentials', href: '/library/essentials' },
		'aryan-issue': { label: 'Aryan Issue', href: '/library/aryan-issue' },
		darshana: { label: 'Darshanas', href: '/library/darshana' },
		iks: { label: 'Indian Knowledge Systems', href: '/library/iks' },
		scriptural: { label: 'Scriptural', href: '/library/scriptural' },
		shatrubodha: { label: 'Shatrubodha', href: '/library/shatrubodha' },
		svayambodha: { label: 'Svayambodha', href: '/library/svayambodha' }
	};

	const shelf = shelfMap[data.type];
</script>

<Head
	title={data.name}
	metaDescription={data.summary ?? `Read ${data.name} at Bodha Open Library.`}
	metaImage="/images/bodhacover.png"
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<Container narrow={true} scaled={true}>
<div class="box-t">

	<div class="page-hero">
		<p class="eyebrow tt-u">
			<a class="linkonhover" href="/">Bodha Research</a>
			<span class="sep">·</span>
			<a class="linkonhover" href="/library">Open Library</a>
			{#if shelf}
				<span class="sep">·</span>
				<a class="linkonhover" href={shelf.href}>{shelf.label}</a>
			{/if}
		</p>
		<h1 class="hero-title source-serif">{data.name}</h1>
		{#if data.summary}
		<p class="hero-sub">{data.summary}</p>
		{/if}
		<div class="meta-row">
			{#if data.author}<span class="meta-pill tt-u">{data.author}</span>{/if}
			{#if data.wikigroup}<span class="meta-pill">{data.wikigroup}</span>{/if}
			{#if data.topic}<a class="meta-pill blank" href="/paths/{data.topic}">Reading Path</a>{/if}
		</div>
		{#if data.tags?.length}
		<div class="tags-row">
			{#each data.tags as tag}
			<span class="tag-pill tt-u">{tag.replaceAll('-', ' ')}</span>
			{/each}
		</div>
		{/if}
	</div>

	<div class="section-block">
		<div class="reader-head">
			<p class="eyebrow tt-u">Reading Surface</p>
			<a class="reader-link blank" href={data.linkreal} target="_blank" rel="noreferrer">Open Full Reader</a>
		</div>
		<div class="reader-shell">
			<iframe title={data.name} src={data.linkreal} allow="autoplay"></iframe>
		</div>
	</div>

</div>
</Container>

<style lang="sass">

.sep
	margin: 0 4px
	color: #DDD

.hero-sub
	max-width: 64ch

.meta-row
	display: flex
	flex-wrap: wrap
	gap: 6px

.meta-pill
	font-size: 0.76rem
	color: #666
	padding: 4px 10px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.08)
	background: #F9F8F6

.tags-row
	display: flex
	flex-wrap: wrap
	gap: 6px

.reader-head
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	flex-wrap: wrap

.reader-link
	font-size: 0.8rem
	font-weight: 500
	color: var(--theme)
	transition: color 0.12s ease
	&:hover
		color: var(--themealt)

.reader-shell
	background: #F9F8F6
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 12px
	padding: 0.85rem
	iframe
		display: block
		width: 100%
		height: 72vh
		min-height: 620px
		border: 1px solid rgba(0,0,0,0.08)
		border-radius: 8px
		background: #FFFFFF
	@media screen and (max-width: 1024px)
		padding: 0.6rem
		iframe
			height: 68vh
			min-height: 540px

</style>
