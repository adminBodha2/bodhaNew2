<script lang="ts">
	import type { PageData } from './$types';
	import { DEFAULT_IMAGE, SITE_URL, organizationJsonLd, stringifyJsonLd, websiteJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import StackingWords from '$lib/svelteanim/components/StackingWords.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { verticals, publications } from '$lib/utils/localsends';
	import VideoPlayer from '$lib/comps/custom-video-player.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import type { ComponentProps } from 'svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import ReadingT from '$lib/icons/readingT.svelte';
	import Cut from '$lib/svelteanim/components/Cut.svelte';

	type Props = Partial<ComponentProps<typeof StackingWords>>;

	let { data }: { data: PageData } & Props = $props();

	let blogs = $derived(data.blogs ?? []);
	let vids = $derived(data.vids ?? []);
	let latestItems = $derived(data.latestItems ?? []);
	let wikiItems = $derived(data.wikiOpeners ?? []);

	const title = 'Bodha - Cultural Think Tank';
	const metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	const metaUrl = SITE_URL;
	const metaImage = DEFAULT_IMAGE;

	const jsonld = stringifyJsonLd([organizationJsonLd(), websiteJsonLd()]);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />

<Parallax imageLink="/images/heroimage2.webp" isClass="is100" />

<Container>
	<section class="wrapper-std">
		<div class="box rgap16 lg:rgap32 ycenter" id="introduction">
			<div class="box">
				<StackingWords>
					<h1 class="txt-4xl md:txt-7xl lg:txt-9xl lh11 source-serif"><span class="theme">Bodha</span> <span class="underline">is a think tank</span></h1>
				</StackingWords>
				<StackingWords>
					<h1 class="txt-4xl md:txt-7xl lg:txt-9xl lh13 source-serif">and research group,</h1>
				</StackingWords>
			</div>
			<Reveal start="top 70%"><p class="txt-xl md:txt-2xl lg:txt-3xl lh15 lg:width80">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that strengthen Hindu cultural revival.</p></Reveal>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="our pillars" />
		<Slide direction="down" distance={260} duration={900} stagger={180} start="top 75%" end="top 25%" scrub={1} targetSelector=".verticals">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each verticals as item}
					<a class="box blank verticals radius4 overflow-hidden paper-1" href={item.href}>
						<div class="overflow-hidden"><img class="fitted sm:herocard md:port" src={item.image} alt={item.title} /></div>
						<div class="box rgap16 ptop24 pbot32 px16 lg:px24">
							<h2 class="txt-3xl lg:txt-4xl ls002m lg:ls004m a-hover w600">{item.title}</h2>
							<p class="txt-lg grey1 lh14">{item.desc}</p>
						</div>
					</a>
				{/each}
			</div>
		</Slide>
	</section>
	<section class="wrapper-std growingline alternate">
		{#if latestItems}
			<Title text="Latest at Bodha" />
			<Slide direction="down" distance={120} duration={500} stagger={180} start="top 90%" end="top 15%" scrub={1} targetSelector=".newitems">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
					{#each latestItems as item, i}
						<a class="box p24 md:p32 blank whitestone b-main newitems" href={item.link}>
							<p class="txt-xs w500 tt-u grey1">{item.badge}</p>
							<h3 class="txt-xl lg:txt-2xl lh12 w600 a-hover ptop8 pbot16 ls001m">{item.title}</h3>
							<p class="grey2 lh14">{item.description}</p>
<p class="a-hover highlight-text arrow self-bottom px8">→</p>
						</a>
					{/each}
				</div>
			</Slide>
		{/if}
	</section>
	<section class="wrapper-std growingline">
		{#if blogs.length > 0}
			<div class="row xbetween ycenter rgap8 mleft mcol">
				<Title text="essays and articles" />
				<a class="primary" href="/blog"><span>See All</span></a>
			</div>
			<Slide targetSelector=".blog-items">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
					{#each blogs as item, i}
						<div class="box whitestone b-main blog-items">
							<div class="row cgap4 rgap4 ycenter p16">
								{#if item.meta.tags && item.meta.tags.length > 0}
									{#each item.meta.tags as tag}
										<a class="txt-xs tt-u w500 theme" href="/blog/tags/{tag}">#{tag.replaceAll('-', ' ')}</a>
									{/each}
								{/if}
							</div>
							<a class="blank" href={item.linkpath} aria-label="image">
								<img class="fitted landscape" src={item.meta.image} alt={item.meta.title} />
							</a>
							<a class="blank box rgap16 lg:rgap24 p16 lg:p32" href={item.linkpath}>
								<h3 class="txt-2xl w600 lh12 a-hover">{item.meta.title}</h3>
								<p class="grey2 lh14">{item.meta.excerpt}</p>
							</a>
							<div class="box rgap4 self-bottom p16 lg:px32 lg:py16 bordertop">
								<p class="tt-u txt-sm w600">{item.meta.author}</p>
								<div class="row cgap8">
									<p class="tt-u txt-xs w500 grey1">{item.formattedDate}</p>
									<div class="row ycenter cgap4">
										<ReadingT />
										<p class="tt-u txt-xs w500 grey1">{item.readingTime} mins</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</Slide>
		{/if}
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="publications" />
		<Slide targetSelector=".books">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap32">
				{#each publications as pub, i}
					<div class="books rgap16">
						<img class="fitted port contain" src={pub.image} alt={pub.title} />
						<div class="box rgap8 lg:rgap16 p16 lg:p32">
							<p class="txt-2xl w600 lh14 ls001m">{pub.title}</p>
							<p class="grey2 txt-lg lh14">{pub.desc}</p>
							<div class="row wrap cgap8 rgap8 mtop8">
								{#each pub.links as link}
									<a class="primary grey" href={link.href} target="_blank" rel="noreferrer"><span>{link.label} →</span> </a>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</Slide>
	</section>
</Container>
<Cut duration={600} end="bottom 10%">
<section class="padding-wrapper">
	<div class="inside-section">
		<div class="grid lg:grid-cols-3 cgap16 rgap32">
			<a class="box std-pad rgap16" href="/newsletter">
				<p class="white txt-2xl w500">Monthly Newsletter</p>
				<p class="txt-lg white lh14">Our monthly newsletter brings together the many strands of work unfolding at Bodha - longform essays, research notes, updates from ongoing projects, new publications, cultural reflections, and creative experiments in storytelling.</p>
				<div class="arrow"><span class="white">→</span></div>
			</a>
			<a class="box std-pad rgap16" href="/aryavarta">
				<p class="white txt-2xl w500">Scrolls of Aryavarta</p>
				<p class="txt-lg white lh14">Scrolls of Aryavarta is an exercise in creative cultural storytelling, to recreate the Bharata that once was, or could have been. Featuring digital comics exploring different facets of Indian history, new issue every fortnight.</p>
				<div class="arrow"><span class="white">→</span></div>
			</a>
			<a class="box std-pad rgap16" href="/members">
				<p class="white txt-2xl w500">Subscribe</p>
				<p class="txt-lg white lh14">Subscribe to receive our monthly newsletters and fortnightly releases of Scrolls of Aryavarta directly in your email inbox.</p>
				<div class="arrow"><span class="white">→</span></div>
			</a>
		</div>
	</div>
</section>
</Cut>
<Container>
	<section class="wrapper-std">
		{#if vids.length > 0}
			<div class="row xbetween ycenter rgap8 mcol mleft col-span-full">
				<Title text="recent videos" />
				<a class="primary" href="/videos"><span>All Videos</span></a>
			</div>
			<Slide targetSelector=".video-items">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
					{#each vids as item, i}
						<div class="box blank whitestone theme-line-parent video-items">
							<VideoPlayer videoId={item.videoid} title={item.name} loop />
							<a class="box rgap8 lg:rgap16 p16 lg:p24" href={item.link} target="_blank" rel="noreferrer">
								<p class="txt-lg w500">{item.name}</p>
								<div class="self-bottom box rgap4">
									<div class="theme-line"></div>
									<p class="txt-xs grey1 tt-u">{item.channel}</p>
								</div>
							</a>
						</div>
					{/each}
				</div>
			</Slide>
		{/if}
	</section>
	<section class="wrapper-std growingline min100vh">
		<Title text="Knowledge Base" />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<div>
				<Reveal>
					<p class="highlight-text">We're nerds about knowledge bases, wikis, and repositories. The Bodha Knowledge Base is an experimental, continually improving build that brings together various concepts, content, and sub-respositories yoked and classified in ways that facilitate learning, discovery, exploration.</p>
				</Reveal>
			</div>
			<div class="box rgap16">
				<Reveal>
					<p class="highlight-text">Rather than a single web page or subroute, the knowledge base is a mesh running across our website. Start at <a class="linked w500" href="/wiki">wiki home</a>, is a grounding point for the entire network...</p>
				</Reveal>
				<Reveal>
					<p class="highlight-text">Or choose any of the following ways to begin exploring -</p>
				</Reveal>
			</div>
		</div>
		<Slide targetSelector=".wiki-items">
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each wikiItems as item}
					<a class="blank box whitestone p16 md:p24 lg:p32 rgap8 lg:rgap16 b-main wiki-items" href={item.link}>
						<p class="txt-xl w600 a-hover">{item.label}</p>
						<p class="lh14 grey1">{item.description}</p>
					</a>
				{/each}
			</div>
		</Slide>
	</section>
</Container>

<style lang="sass">

h1.source-serif
	letter-spacing: -0.05rem
	@media (min-width: 1025px)
		letter-spacing: -0.2rem

.padding-wrapper
	background: linear-gradient(to right, #004e92, #000428)
	padding-top: 2rem
	padding-bottom: 2rem
	@media (min-width: 1025px)
		height: 400px
		padding-top: 4rem
		padding-bottom: 4rem

#introduction
	@media (min-width: 1025px)
		height: 80vh

//verticals──────────────────────────────────────

.verticals
	position: relative
	&:hover
		&::after
			width: 100%
			left: 0
	&::after
		position: absolute
		right: 0
		bottom: 1px
		content: " "
		width: 0
		height: 2px
		border-radius: 8px
		background: var(--color-theme)
		transition: width 200ms ease

// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	.fitted.port.contain
		height: 320px
	@media (min-width: 1025px)
		display: grid
		grid-template-columns: 160px 1fr
		align-items: center

</style>
