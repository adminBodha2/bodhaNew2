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
	<section class="wrapper-std" id="first">
		<div class="box rgap8" id="introduction" bind:this={headReveal}>
			<Reveal visible={headVis.visible} duration={400} direction="down" elasticOut>
				<h1 class="txt-5xl lg:txt-7xl ls-2sm lg:ls-4sm lh1 source-serif"><span class="theme">Bodha</span> is a think tank</h1>
			</Reveal>
			<Reveal visible={headVis.visible} delay={200} duration={400} direction="down" elasticOut>
				<h1 class="txt-5xl lg:txt-7xl ls-3sm lg:ls-4sm lh1 source-serif">and research group,</h1>
			</Reveal>
			<Reveal visible={headVis.visible} delay={600} duration={600} direction="down">
				<div class="ptop16 lg:ptop32"><p class="txt-xl lg:txt-2xl fw400 width80">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p></div>
			</Reveal>
		</div>
		<h2 class="txt-3xl">Our Pillars</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" bind:this={section}>
			{#each verticals as item, i}
				<Slider visible={verticalsInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 200}>
					<a class="box blank verticals glass-1" href={item.href}>
						<div class="pbot16"><enhanced:img class="portrait radius8" src={item.image} alt={item.title} /></div>
						<div class="box rgap12 p24 lg:p32 notop">
							<h2 class="header-2 fw700 source-serif ls-3sm">{item.title}</h2>
							<p class="txt-bs grey1">{item.desc}</p>
						</div>
					</a>
				</Slider>
			{/each}
		</div>
	</section>

	<!--------latest---------------------------------------------------------------------->
	{#if latestItems}
		<section class="wrapper-std growingline" id="latest" bind:this={sectionTwo}>
			<Title text="Latest at Bodha" />
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each latestItems as item, i}
					<Slider visible={secondInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<a class="box rgap12 p32 blank b-main radius8" href={item.link}>
							<p class="headline-sm a-hover">{item.title}</p>
							<p class="grey1">{item.description}</p>
							<p class="cite tt-u self-bottom theme dead">{item.badge}</p>
						</a>
					</Slider>
				{/each}
			</div>
		</section>
	{/if}

	<!------------blog articles------------------------------------------------------------>
	{#if blogs.length > 0}
		<section class="wrapper-std growingline alternate" id="blog-posts" bind:this={sectionThree}>
			<div class="row xbetween ycenter rgap16 mleft mwrap">
				<Title text="essays and articles" />
				<a class="primary grey" href="/blog"><span>See All</span></a>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
				{#each blogs as item, i}
					<Slider visible={thirdInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 250}>
						<div class="box b-main radius">
							<div class="row cgap4 rgap4 ycenter p16 nbot">
								{#if item.meta.tags && item.meta.tags.length > 0}
									{#each item.meta.tags as tag}
										<a class="cite tt-u blank theme" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
									{/each}
								{/if}
							</div>
							<a class="blank p16 notop" href={item.linkpath} aria-label="image">
								<enhanced:img class="fit radius8" src={item.meta.image} alt={item.meta.title} />
							</a>
							<a class="blank box rgap16 p16 lg:p32 notop" href={item.linkpath}>
								<p class="headline a-hover">{item.meta.title}</p>
								<p class="grey1">{item.meta.excerpt}</p>
							</a>
							<div class="self-bottom bordertop p16" style="background: var(--color-stone-3)">
								<p class="txt-sm fw500">{item.formattedDate} | {item.meta.author} | {item.meta.words} words</p>
							</div>
						</div>
					</Slider>
				{/each}
			</div>
		</section>
	{/if}

	<!------------publications------------------------------------------------------------>
	<section class="wrapper-std growingline" id="publications" bind:this={sectionFour}>
		<Title text="publications" />
		<div class="grid grid-cols-1 lg:grid-cols-2 gap32">
			{#each publications as pub, i}
				<Slider visible={fourthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
					<div class="books rgap16">
						<img class="portrait contained left" src={pub.image} alt={pub.title} />
						<div class="box rgap8 p16 lg:p32">
							<p class="headline">{pub.title}</p>
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

	<!-----------videos------------------------------------------------------------>
	{#if vids.length > 0}
		<section class="wrapper-std growingline alternate" bind:this={sectionFive}>
			<div class="row xbetween ycenter rgap16 mcol mleft col-span-full">
				<Title text="recent videos" />
				<a class="primary grey" href="/videos"><span>All Videos</span></a>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
				{#each vids as item, i}
					<Slider visible={fifthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<div class="box p0 blank theme-line-parent videobox">
							<VideoPlayer videoId={item.videoid} title={item.name} loop />
							<a class="box rgap8 p16" href={item.link} target="_blank" rel="noreferrer">
								<p class="headline-sm">{item.name}</p>
								<div class="self-bottom box rgap8">
									<div class="theme-line"></div>
									<p class="cite lgrey tt-u">{item.channel}</p>
								</div>
							</a>
						</div>
					</Slider>
				{/each}
			</div>
		</section>
	{/if}
</Container>

<style lang="sass">

#introduction
	@media (min-width: 1025px)
		padding-top: 3rem
		padding-bottom: 3rem

.contained.left
	object-fit: contain
	margin-right: auto
	width: 100%

//verticals──────────────────────────────────────

.verticals
	position: relative
	&:hover
		.portrait
			filter: saturate(1)
		&::after
			width: 100%
			left: 0
	.portrait
		transition: all 120ms cubic-bezier(0.745, 0.150, 0.690, 0.470)
		filter: saturate(0.25)
	&::after
		position: absolute
		right: 0
		bottom: -1px
		content: " "
		width: 0
		height: 2px
		background: var(--color-theme)
		transition: width 200ms ease

// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	@media (min-width: 1025px)
		display: grid
		grid-template-columns: 160px 1fr
		align-items: center


// ── VIDEOS ────────────────────────────────────────────────

.videobox
	border: var(--border-main)
	border-radius: 8px
	overflow: hidden
	&:hover
		border: 1px solid var(--color-stone-1)

</style>
