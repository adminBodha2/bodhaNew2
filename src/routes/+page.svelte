<script lang="ts">
	import type { PageData } from './$types';
	import { DEFAULT_IMAGE, SITE_URL, organizationJsonLd, stringifyJsonLd, websiteJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Youtuber from '$lib/comps/youtuber.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { gateways, verticals, publications } from '$lib/utils/localsends';

	let { data }: { data: PageData } = $props();

	let blogs = $derived(data.blogs ?? []);
	let vids = $derived(data.vids ?? []);

	const title = 'Bodha - Cultural Think Tank';
	const metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	const metaUrl = SITE_URL;
	const metaImage = DEFAULT_IMAGE;

	const jsonld = stringifyJsonLd([organizationJsonLd(), websiteJsonLd()]);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />

<Parallax imageLink="/images/heroimage2.webp" isClass="is100" />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop ycenter" id="first">
		<div class="home-panel box textbox">
				<div class="box textbox">
					<h1 class="source-serif width60"><span class="blue">Bodha</span> is a think tank and research group,</h1>
					<p class="altprim card-title loose thin">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
				</div>
		<div class="grid four mid2 tight">
			{#each verticals as item}
				<a class="elembox blank verticals" href={item.href}>
					<div class="imgbox"><img src={item.image} alt={item.title} /></div>
					<div class="labelbox">
						<h2 class="card-title source-serif">{item.title}</h2>
						<p class="small-text grey">{item.desc}</p>
					</div>
				</a>
			{/each}
		</div>
		</div>
	</div>

	{#if blogs.length > 0}
		<div class="stdbox padded bordertop sideline" id="blog posts">
			<div class="row xbetween ycenter rgap16">
				<Title text="essays and articles" />
				<a class="small-button row ycenter cgap4" href="/blog"
					>See All <div class="button-text">→</div></a>
			</div>
			<div class="white-grid grid three blog-grid">
				{#each blogs as item, i}
					<BlogCard title={item.meta.title} link={item.linkpath} image={item.meta.image} excerpt={item.meta.excerpt} author={item.meta.author} date={item.formattedDate} words={item.meta.words} numbering="slate">
						{#each item.meta.tags as tag}
							<a class="tag-pill accented tt-u" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
						{/each}
					</BlogCard>
				{/each}
			</div>
		</div>
	{/if}

	<div class="stdbox padded bordertop sideline" id="publications">
		<Title text="publications" />
		<div class="grid two tight">
			{#each publications as pub}
				<div class="books">
					<img class="publication-image" src={pub.image} alt={pub.title} />
					<div class="box labelbox">
						<p class="card-title source-serif">{pub.title}</p>
						<p class="small-text grey">{pub.desc}</p>
						<div class="row wrap cgap16 rgap8 ptop8">
							{#each pub.links as link}
								<a class="small-button row ycenter cgap8" href={link.href} target="_blank" rel="noreferrer"
									>{link.label}
									<div class="button-text">→</div></a>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if vids.length > 0}
		<div class="stdbox padded bordertop">
			<div class="row xbetween ycenter rgap16">
				<Title text="recent videos" />
				<a class="small-button row ycenter cgap8" href="/videos"
					>See All <div class="button-text">→</div></a>
			</div>
			<div class="standard-grid grid three video-grid">
				{#each vids as item, i}
					<a class="video-card blank" href={item.link} target="_blank" rel="noreferrer">
						<Youtuber youTubeId={item.videoid} />
						<div class="box video-footer rgap8">
							<p class="w500 tight">{item.name}</p>
							<div class="theme-line"></div>
							<p class="citation-big lgrey tt-u">{item.channel}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</Container>

<style lang="sass">

#first
	min-height: 100vh

.home-panel
	row-gap: 3rem
	border-radius: 4px
	@media screen and (max-width: 1024px)
		padding: 0
		row-gap: 2rem

// ── GATEWAY CARDS ─────────────────────────────────────────


.theme-line
	height: 2px
	width: 32px
	background: var(--color-theme)
	transition: all 0.14s ease
	transform-origin: left center

// ── VERTICALS ─────────────────────────────────────────────

.verticals
	border-radius: 4px
	background: rgba(255,255,255,0.5)
	backdrop-filter: blur(10px) saturate(120%)
	-webkit-backdrop-filter: blur(10px) saturate(120%)
	border: 1px solid rgba(255,255,255,0.35)
	transition: all 200ms cubic-bezier(0.22, 1, 0.36, 1)
	box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.15)
	&:hover
		box-shadow: 0 4px 4px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.15)
		border: 1px solid rgba(255,255,255,0.1)
		background: rgba(255,255,255,0.32)
		img
			filter: saturate(1)
	img
		width: 100%
		height: 100%
		object-fit: cover
		transition: all 120ms cubic-bezier(0.745, 0.150, 0.690, 0.470)
		filter: saturate(0.25)
	.labelbox
		padding: 0 1.5rem 2rem 1.5rem
	.imgbox
		height: 420px
		padding: 1rem 1rem 0 1rem
		overflow: hidden
	@media screen and (max-width: 1024px)
		.imgbox
			height: 280px
		.labelbox
			padding: 0 1rem 1.5rem 1rem

.blog-grid
	border-radius: 4px


// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	gap: 1.25rem
	padding: 1rem
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 4px
	background: var(--color-stone)
	@media screen and (min-width: 1025px)
		display: grid
		grid-template-columns: 160px 1fr
		align-items: start
		.labelbox
			padding: 1rem

.publication-image
	object-fit: cover
	border-radius: 4px
	display: block
	@media screen and (min-width: 1025px)
		height: 256px
		width: 100%
	@media screen and (max-width: 1024px)
		height: 200px
		margin-right: auto


// ── VIDEOS ────────────────────────────────────────────────

.video-grid
	border-radius: 4px

.video-card
	overflow: hidden
	background: var(--color-white)
	transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease
	&:hover
		transform: translateY(-2px)
		background: var(--color-stone)
		.theme-line
			transform: scaleX(1.5)

.video-footer
	padding: 1.1rem 1.2rem
	border-top: 1px solid rgba(0,0,0,0.05)

</style>
