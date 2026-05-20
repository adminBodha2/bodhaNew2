<script lang="ts">
	import type { PageData } from './$types';
	import { DEFAULT_IMAGE, SITE_URL, organizationJsonLd, stringifyJsonLd, websiteJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { verticals, publications } from '$lib/utils/localsends';
	import VideoPlayer from '$lib/comps/custom-video-player.svelte';
	import Slider from '$lib/svelteanim/components/Slide.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import { animState, toggleAnim } from '$lib/utils/globalstores';

	let { data }: { data: PageData } = $props();

	let blogs = $derived(data.blogs ?? []);
	let vids = $derived(data.vids ?? []);
	let latestItems = $derived(data.latestItems ?? []);
	let headReveal = $state<HTMLElement | null>(null);
	let headVis = useInView(() => headReveal, { threshold: 0.2, once: true });
	let section = $state<HTMLElement | null>(null);
	let sectionTwo = $state<HTMLElement | null>(null);
	let sectionThree = $state<HTMLElement | null>(null);
	let sectionFour = $state<HTMLElement | null>(null);
	let sectionFive = $state<HTMLElement | null>(null);
	const verticalsInView = useInView(() => section, { threshold: 0.2, once: true });
	const secondInView = useInView(() => sectionTwo, { threshold: 0.5, once: true });
	const thirdInView = useInView(() => sectionThree, { threshold: 0.5, once: true });
	const fourthInView = useInView(() => sectionFour, { threshold: 0.5, once: true });
	const fifthInView = useInView(() => sectionFive, { threshold: 0.6, once: true });

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
		<div class="box rgap16 lg:rgap32 ycenter" bind:this={headReveal} id="introduction">
			<div class="box">
				<Reveal visible={headVis.visible} duration={600} direction="left">
					<h1 class="txt-5xl md:txt-7xl lg:txt-9xl ls010m lh11 source-serif"><span class="theme">Bodha</span> <span class="underline">is a think tank</span></h1>
				</Reveal>
				<Reveal visible={headVis.visible} delay={200} duration={600} direction="right">
					<h1 class="txt-5xl md:txt-7xl lg:txt-9xl ls010m lh11 source-serif">and research group,</h1>
				</Reveal>
			</div>
			<Reveal visible={headVis.visible} delay={800} duration={300} direction="down">
				<p class="txt-xl md:txt-2xl lg:txt-3xl lh15 width80">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
			</Reveal>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="our pillars" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" bind:this={section}>
			{#each verticals as item, i}
				<Slider visible={verticalsInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 200}>
					<a class="box blank verticals radius4 overflow-hidden" href={item.href}>
						<div class="overflow-hidden"><img class="fitted sm:herocard md:port" src={item.image} alt={item.title} /></div>
						<div class="box rgap16 ptop24 pbot32 px16 lg:px24">
							<h2 class="txt-4xl source-serif ls002m lg:ls004m a-hover">{item.title}</h2>
							<p class="txt-lg grey1 lh14">{item.desc}</p>
						</div>
					</a>
				</Slider>
			{/each}
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		{#if latestItems}
			<Title text="Latest at Bodha" />
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid" bind:this={sectionTwo}>
				{#each latestItems as item, i}
					<Slider visible={secondInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<a class="box p24 md:p32 blank whitestone" href={item.link}>
							<p class="txt-xs w500 tt-u grey1">{item.badge}</p>
							<h3 class="txt-2xl lh12 w660 source-serif a-hover ptop8 pbot16 ls001m">{item.title}</h3>
							<p class="grey2 lh14">{item.description}</p>
						</a>
					</Slider>
				{/each}
			</div>
		{/if}
	</section>
	<section class="wrapper-std growingline">
		{#if blogs.length > 0}
			<div class="row xbetween ycenter rgap16 mleft mwrap">
				<Title text="essays and articles" />
				<a class="primary" href="/blog"><span>See All</span></a>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 white-grid" bind:this={sectionThree}>
				{#each blogs as item, i}
					<Slider visible={thirdInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 250}>
						<div class="box whitecard">
							<div class="row cgap4 rgap4 ycenter p16 ">
								{#if item.meta.tags && item.meta.tags.length > 0}
									{#each item.meta.tags as tag}
										<a class="txt-xs tt-u w500 theme" href="/blog/tags/{tag}">#{tag.replaceAll('-', ' ')}</a>
									{/each}
								{/if}
							</div>
							<a class="blank" href={item.linkpath} aria-label="image">
								<img class="fitted landscape" src={item.meta.image} alt={item.meta.title} />
							</a>
							<a class="blank box rgap24 p16 lg:p32" href={item.linkpath}>
								<h3 class="txt-2xl lg:txt-3xl source-serif w660 lh12 a-hover">{item.meta.title}</h3>
								<p class="grey2 lh14">{item.meta.excerpt}</p>
								<div class="box rgap4 self-bottom">
									<p class="tt-u txt-sm w600">{item.meta.author}</p>
									<p class="tt-u txt-xs w500 grey1">{item.formattedDate} | {item.meta.words} words</p>
								</div>
							</a>
						</div>
					</Slider>
				{/each}
			</div>
		{/if}
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="publications" />
		<div class="grid grid-cols-1 lg:grid-cols-2 gap32" bind:this={sectionFour}>
			{#each publications as pub, i}
				<Slider visible={fourthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
					<div class="books rgap16">
						<img class="fitted port contain" src={pub.image} alt={pub.title} />
						<div class="box rgap8 p16 lg:p32">
							<p class="txt-2xl w600 lh14">{pub.title}</p>
							<p class="grey1">{pub.desc}</p>
							<div class="row wrap cgap8 rgap8 mtop8">
								{#each pub.links as link}
									<a class="primary grey" href={link.href} target="_blank" rel="noreferrer"><span>{link.label} →</span> </a>
								{/each}
							</div>
						</div>
					</div>
				</Slider>
			{/each}
		</div>
	</section>
	<section class="wrapper-std growingline">
		{#if vids.length > 0}
			<div class="row xbetween ycenter rgap16 mcol mleft col-span-full">
				<Title text="recent videos" />
				<a class="primary" href="/videos"><span>All Videos</span></a>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16" bind:this={sectionFive}>
				{#each vids as item, i}
					<Slider visible={fifthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<div class="box p0 blank whitestone theme-line-parent videobox">
							<VideoPlayer videoId={item.videoid} title={item.name} loop />
							<a class="box rgap8 p16" href={item.link} target="_blank" rel="noreferrer">
								<p class="txt-lg w550">{item.name}</p>
								<div class="self-bottom box rgap8">
									<div class="theme-line"></div>
									<p class="txt-sm grey0 tt-u">{item.channel}</p>
								</div>
							</a>
						</div>
					</Slider>
				{/each}
			</div>
		{/if}
	</section>
</Container>

<style lang="sass">

#introduction
	@media (min-width: 1025px)
		height: 64vh

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


// ── VIDEOS ────────────────────────────────────────────────

.videobox
	border: var(--border-main)
	border-radius: 8px
	overflow: hidden

</style>
