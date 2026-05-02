<script lang="ts">
	import type { PageData } from './$types';
	import { DEFAULT_IMAGE, SITE_URL, organizationJsonLd, stringifyJsonLd, websiteJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { verticals, publications } from '$lib/utils/localsends';
	import VideoPlayer from '$lib/comps/custom-video-player.svelte'

	let { data }: { data: PageData } = $props();

	let blogs = $derived(data.blogs ?? []);
	let vids = $derived(data.vids ?? []);
	let latestItems = $derived(data.latestItems??[]);

	const title = 'Bodha - Cultural Think Tank';
	const metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	const metaUrl = SITE_URL;
	const metaImage = DEFAULT_IMAGE;

	const jsonld = stringifyJsonLd([organizationJsonLd(), websiteJsonLd()]);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />

<Parallax imageLink="/images/heroimage2.webp" isClass="is100" />

<Container>
	<div class="stdbox stdpad ycenter" id="first">
		<div class="home-panel box">
			<div class="box elembox">
				<h1 class="source-serif width50"><span class="blue">Bodha</span> is a think tank and research group,</h1>
				<p class="paragraph-text loose width80" style="font-weight: 400">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
			</div>
		<div class="grid four mid2 tight">
			{#each verticals as item, i}
				<a class="elembox blank verticals glass-1" href={item.href}>
					<div class="imgbox"><img src={item.image} alt={item.title} /></div>
					<div class="labelbox">
						<h2 class="card-title source-serif">{item.title}</h2>
						<p class="descriptor-text grey">{item.desc}</p>
					</div>
				</a>
			{/each}
		</div>
		</div>
	</div>

<!--------latest---------------------------------------------------------------------->
	{#if latestItems}
	<div class="stdbox stdpad bordertop" id="latest">
		<Title text="Latest at Bodha"/>
		<div class="grid fitted-four tight">
			{#each latestItems as item}
				<a class="blank labelbox card-padded and-bordered" href={item.link}>
					<p class="card-title tight source-serif a-hover">{item.title}</p>
					<p class="descriptor-text grey tight borderbot pbot8">{item.description}</p>
					<p class="tag-pill tt-u self-bottom">{item.badge}</p>
				</a>
			{/each}
		</div>
	</div>
	{/if}

<!------------blog articles------------------------------------------------------------>

	{#if blogs.length > 0}
		<div class="stdbox stdpad bordertop sideline" id="blog posts">
			<div class="row xbetween ycenter rgap16 mcol mleft">
				<Title text="essays and articles" />
				<a class="small-button themed" href="/blog">See All</a>
			</div>
			<div class="grid three tight">
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
						</div>
						<a class="blank imgbox" href={item.linkpath}>
							<img src={item.meta.image} alt={item.meta.title}/>
						</a>
						<a class="blank labelbox title-desc" href={item.linkpath}>
							<p class="source-serif card-title tight">{item.meta.title}</p>
							<p class="descriptor-text grey">{item.meta.excerpt}</p>
						</a>
						<div class="foot box">
							<p class="tag-text altprim tt-u w500">{item.formattedDate} | {item.meta.author} | {item.meta.words} words</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

<!------------publications------------------------------------------------------------>

	<div class="stdbox stdpad bordertop sideline" id="publications">
		<Title text="publications" />
		<div class="grid two tight">
			{#each publications as pub}
				<div class="books">
					<img class="publication-image" src={pub.image} alt={pub.title} />
					<div class="box labelbox">
						<p class="card-title source-serif">{pub.title}</p>
						<p class="descriptor-text grey">{pub.desc}</p>
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

<!-----------videos------------------------------------------------------------>

	{#if vids.length > 0}
		<div class="stdbox stdpad bordertop">
			<div class="row xbetween ycenter rgap16 mcol mleft">
				<Title text="recent videos" />
				<a class="small-button themed" href="/videos">All Videos</a>
			</div>
			<div class="standard-grid grid three video-grid">
				{#each vids as item, i}
					<div class="video-card blank">
						<VideoPlayer videoId={item.videoid} title={item.name} loop />
						<a class="box video-footer rgap8" href={item.link} target="_blank" rel="noreferrer">
							<p class="w500 tight">{item.name}</p>
							<div class="theme-line"></div>
							<p class="tag-text lgrey tt-u">{item.channel}</p>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</Container>

<style lang="sass">

//introduction-area────────────────────────────────────

#first
	min-height: 100vh

.home-panel
	border-radius: 4px
	padding-top: 4rem
	.box.elembox
		padding-bottom: 6rem
	@media screen and (max-width: 1024px)
		padding: 0
		.box.elembox
			padding-bottom: 3rem

//verticals──────────────────────────────────────

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
			height: 200px
		.labelbox
			padding: 0 1rem 1.5rem 1rem

.post-card
	border-radius: 4px
	.title-desc
		padding: 1rem
	.post-metadata
		padding: 0.5rem
	.foot
		margin-top: auto
		border-top: var(--border-dark)
		padding: 1rem
	a.imgbox
		height: 160px
		padding: 0 0.5rem
		img
			object-fit: cover
			width: 100%
			height: 100%
	@media screen and (min-width: 1025px)
		.post-metadata
			padding: 1rem
		a.imgbox
			height: 240px
			padding: 0 1rem
		.title-desc
			padding: 1rem 2rem
		.foot
			padding: 1rem 2rem

// ── GATEWAY CARDS ─────────────────────────────────────────

.theme-line
	height: 2px
	width: 32px
	background: var(--color-theme)
	transition: all 0.14s ease
	transform-origin: left center

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
	@media screen and (max-width: 1024px)
		height: 200px
		margin-right: auto


// ── VIDEOS ────────────────────────────────────────────────

.video-card
	overflow: hidden
	background: var(--color-back)
	transition: border-color 0.15s ease, box-shadow 0.15s ease
	&:hover
		background: var(--color-stone)
		.theme-line
			transform: scaleX(1.5)

.video-footer
	padding: 0.5rem
	@media screen and (min-width: 1025px)
		padding: 1rem

</style>
