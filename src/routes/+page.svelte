<script lang="ts">
	import type { PageData } from './$types';
	import { DEFAULT_IMAGE, SITE_URL, organizationJsonLd, stringifyJsonLd, websiteJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { verticals, publications } from '$lib/utils/localsends';
	import Navigator from '$lib/comps/navigator.svelte'
	import VideoPlayer from '$lib/comps/custom-video-player.svelte'

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
	<div class="stdbox padded ycenter" id="first">
		<div class="home-panel box textbox">
				<div class="box elembox">
					<h1 class="source-serif width50"><span class="blue">Bodha</span> is a think tank and research group,</h1>
					<p class="highlight-text loose width80" style="font-weight: 400">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
				</div>
		<div class="grid four mid2 tight">
			{#each verticals as item, i}
				<a class="elembox blank verticals glass-1" href={item.href}>
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
				<Navigator text="See All" link="/blog"/>
			</div>
			<div class="grid three mid2 tight">
				{#each blogs as item, i}
					<div class="post-card box glass-2">
						<div class="row post-metadata ycenter">
							{#if item.meta.tags && item.meta.tags.length > 0}
								<div class="row wrap all-tags">
									{#each item.meta.tags as tag}
										<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll("-"," ")}</a>
									{/each}
								</div>
							{/if}
							<p class="citation-big tt-u grey" style="margin-left: 4px">{item.meta.words} words</p>
						</div>
						<a class="blank imgbox" href={item.linkpath}>
							<img src={item.meta.image} alt={item.meta.title}/>
						</a>
						<a class="blank textbox title-desc" href={item.linkpath}>
							<p class="source-serif card-title tight">{item.meta.title}</p>
							<p class="small-text grey">{item.meta.excerpt}</p>
						</a>
						<div class="foot box">
							<p class="tag-text tt-u w500">{item.formattedDate} | {item.meta.author}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div class="stdbox padded bordertop sideline" id="publications">
		<Title text="publications" />
		<div class="grid two tight">
			{#each publications as pub}
				<div class="books glass-books">
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
				<Navigator text="See All" link="/videos"/>
			</div>
			<div class="standard-grid grid three video-grid">
				{#each vids as item, i}
					<div class="video-card blank">
						<VideoPlayer videoId={item.videoid} title={item.name} loop />
						<a class="box video-footer rgap8" href={item.link} target="_blank" rel="noreferrer">
							<p class="w500 tight">{item.name}</p>
							<div class="theme-line"></div>
							<p class="citation-big lgrey tt-u">{item.channel}</p>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</Container>

<style lang="sass">

.post-card
	border-radius: 4px
	.title-desc
		padding: 0 2rem 2rem 2rem
	.post-metadata
		padding: 2rem 2rem 0 2rem
	.foot
		margin-top: auto
		padding: 2rem 2rem 1rem 2rem
	@media screen and (max-width: 1024px)
		.title-desc
			padding: 0 1.25rem 1.25rem 1.25rem
		.post-metadata
			padding: 1.25rem 1.25rem 0 1.25rem
		.foot
			padding: 1.25rem 1.25rem 1rem 1.25rem

.imgbox
	height: 320px
	padding: 1rem 2rem
	img
		object-fit: cover
		width: 100%
		height: 100%
	@media screen and (max-width: 1024px)
		padding: 1rem 1.25rem
		height: 280px

#first
	min-height: 100vh

.home-panel
	row-gap: 3rem
	border-radius: 4px
	padding-top: 4rem
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
	position: relative
	&:hover
		img
			filter: saturate(1)
		&::after
			width: 100%
			left: 0
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
		padding: 0.5rem 0.5rem 0 0.5rem
		overflow: hidden
	&::after
		position: absolute
		right: 0
		bottom: -1px
		content: " "
		width: 0
		height: 2px
		background: var(--color-theme)
		transition: width 200ms ease
	@media screen and (max-width: 1024px)
		.imgbox
			height: 280px
		.labelbox
			padding: 0 1rem 1.5rem 1rem


// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	gap: 1.25rem
	padding: 1rem
	border-radius: 4px
	background: var(--color-back)
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
		box-shadow: 0 4px 4px rgba(15, 23, 42, 0.08), 0 -2px 2px rgba(255,255,255,0.2), inset 0 -4px 20px rgba(255,255,255,0.15)
	@media screen and (max-width: 1024px)
		height: 200px
		margin-right: auto


// ── VIDEOS ────────────────────────────────────────────────

.video-card
	overflow: hidden
	background: var(--color-back)
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
