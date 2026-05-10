<script lang="ts">
	import { teamMembers } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Slider from '$lib/svelteanim/components/Slide.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import Policy from '$lib/icons/policy.svelte';
	import Concern from '$lib/icons/concern.svelte';
	import Aware from '$lib/icons/aware.svelte';

	const title = 'About | Bodha';
	const metaDescription = 'About Bodha, its work, method, and purpose.';
	const metaUrl = absoluteUrl('/about');
	const metaImage = absoluteImage('/images/bodhacover.png');
	let referenceOne = $state<HTMLElement | null>(null);
	let referenceTwo = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => referenceOne, { threshold: 0.4, once: true });
	let isTwoVisible = useInView(() => referenceTwo, { threshold: 0.5, once: true });
	let revref = $state<HTMLElement | null>(null);
	let revVis = useInView(() => revref, { threshold: 0.4, once: true });

	const jsonld = stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'AboutPage'
		})
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<Parallax imageLink="/images/heroes/key-aboutbodha.webp" />
	<section class="wrapper-std first-box">
		<Crumb showT={true} title="About Bodha" showD={true} desc={metaDescription} />
		<div class="box rgap32" bind:this={revref}>
			<Reveal visible={revVis.visible}>
				<p class="txt-xl width60">Bodha is a <span class="blue">think tank and research group</span> studying contemporary issues of cultural concern. We inform core areas of policy with wisdom derived from Hindu culture and philosophy, and help orient education to the Indian Knowledge Systems (IKS). We also curate cultural experiences of core Hindu institutions like the Hindu temple.</p>
			</Reveal>
			<div class="box rgap16">
				<h2 class="txt-2xl fw600">Our Mandate</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap16">
					<div class="box ycenter cgap16 rgap16 p24 lg:p32 whitestone b-main radius8" style="height: 100%">
						<Policy color="var(--color-theme-dark)" size={48} />
						<p class="flex-grow txt-lg tight grey2">Provide an Indian cultural lens to policy and institutional design with research in frontier areas.</p>
					</div>
					<div class="box ycenter cgap16 rgap16 whitestone b-main p24 lg:p32 radius8" style="height: 100%">
						<Concern size={48} color="var(--color-theme-dark)" />
						<p class="flex-grow txt-lg tight grey2">Ask pertinent questions about the most critical cultural problems today.</p>
					</div>
					<div class="box ycenter cgap16 rgap16 whitestone b-main p24 lg:p32 radius8" style="height: 100%">
						<Aware color="var(--color-theme-dark)" size={48} />
						<p class="flex-grow txt-lg tight grey2">Create immersive cultural experiences to make our youth more culture aware and active.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline" bind:this={referenceOne}>
		<Title text="Our Work" />
		<div class="box rgap16">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" id="forlinks">
				<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000}>
					<a class="box rgap16 p24 lg:p32 glass-1" href="/research" style="height: 100%">
						<p class="headline a-hover">Research</p>
						<p class="txt-lg grey2 flex-grow">Our primary work stream, with projects in current and upcoming pipelines. We point methodological rigor, authenticity, and emic cultural sensitivity towards issues such as Hindu models of temple management, Hindu views of modernity, and more.</p>
						<p class="theme txt-2xl self-bottom arrow">→</p>
					</a>
				</Slider>
				<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={200}>
					<a class="box rgap16 p24 lg:p32 glass-1" href="/big-questions" style="height: 100%">
						<p class="headline a-hover">Big Questions</p>
						<p class="txt-lg grey2 flex-grow">With the Big Questions initiative, we're asking provocative questions about the most fundamental problems and open questions that Hindu society faces today.</p>
						<p class="theme txt-2xl self-bottom arrow">→</p>
					</a>
				</Slider>
				<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={400}>
					<a class="box rgap16 p24 lg:p32 glass-1" href="/academy" style="height: 100%">
						<p class="headline a-hover">Academy</p>
						<p class="txt-lg grey2 flex-grow">Bodha Academy envisions creating a line of scholars capable of carrying the Hindu intellectural work forward, and runs critical online courses.</p>
						<p class="theme txt-2xl self-bottom arrow">→</p>
					</a>
				</Slider>
				<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={600}>
					<a class="box rgap16 p24 lg:p32 glass-1" href="/anveshi" style="height: 100%">
						<p class="headline a-hover">Anveshi</p>
						<p class="txt-lg grey2 flex-grow">Bodha Anveshi is our flagship cultural immersion program, curating sacred tours to unexplored cultural kshetras and trails.</p>
						<p class="theme txt-2xl self-bottom arrow">→</p>
					</a>
				</Slider>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" bind:this={referenceTwo}>
				<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500}>
					<a class="whitestone box rgap16 lg:rgap24 theme-line-parent p24 radius8" href="/library" style="height: 100%">
						<p class="headline-sm">Bodha Open Library</p>
						<p class="grey1">The Bodha Open Library features 200+ texts ranging from Puranas and Darshanic texts to papers on Indo-European linguistics, IKS, and more.</p>
						<div class="theme-line"></div>
					</a>
				</Slider>
				<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={200}>
					<a class="whitestone box rgap24 theme-line-parent p24 radius8" href="/blog" style="height: 100%">
						<p class="headline-sm">Essays, Writings</p>
						<p class="grey1">Read our essays on culture, history, tradition, and more at our blog, featuring 50+ articles that bring together our writings, research, opinions over the years.</p>
						<div class="theme-line"></div>
					</a>
				</Slider>
				<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={300}>
					<a class="whitestone box rgap24 theme-line-parent p24 radius8" href="/inspiration" style="height: 100%">
						<p class="headline-sm">Our Inspiration</p>
						<p class="grey1">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought. We document the schools of thought and thinkers that inspire and inform us.</p>
						<div class="theme-line"></div>
					</a>
				</Slider>
				<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={400}>
					<div class="whitestone box rgap24 theme-line-parent p24 radius8" style="height: 100%">
						<p class="headline-sm">Brand and Logo</p>
						<div class="grey1">
							<p>This essay by our founder explains the <a class="linkedlight" href="meaning behind our logo">meaning behind our logo</a>, and here he outlines the <a class="linkedlight" href="/blog/bodha-pyramid-of-priorities-nature-of-hindu-orgs">Bodha pyramid of priorities.</a>.</p>
							<p>We're passionate about design and development! Learn more about <a class="linkedlight" href="/designbodha">designBodha,</a> and access our <a class="linkedlight" target="_blank" rel="noreferrer" href="https://github.com/adminBodha2/bodhaNew2">website public repo</a> at Github.</p>
						</div>
						<div class="theme-line"></div>
					</div>
				</Slider>
			</div>
		</div>
	</section>
	<section class="box wrapper-std rgap64 growingline pbot64">
		<Title text="The Team" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
			{#each teamMembers as member, j}
				<div class="box rgap24 whitestone b-main radius8 p24 lg:p32" style="height: 100%">
					<div class="member-image-wrap">
						<div class="member-image">
							<img src={member.image} alt={member.name} />
						</div>
					</div>
					<div class="member-info box rgap16">
						<div class="member-head box rgap4">
							<p class="headline">{member.name}</p>
							<p class="tt-u grey2 fw500">{member.role}</p>
						</div>
						<p class="txt-lg grey2 lh14">{member.bio}</p>
						{#if member.links.length > 0}
							<div class="row ycenter flex-wrap cgap8 ptop16 bordertop">
								{#if j < 4}
									<p class="txt-sm tt-u fw600 theme-dark"><a class="blank" href={member.blog}>Writings</a></p>
									<span class="link-sep grey">·</span>
								{/if}
								{#each member.links as link, i}
									{#if i > 0}<span class="link-sep grey">·</span>{/if}
									<p class="txt-sm tt-u fw600 theme"><a class="blank" href={link.href} target="_blank" rel="noreferrer">{link.label}</a></p>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.member-image
	img
		width: 140px
		height: 140px
		border-radius: 50%
		object-fit: cover
		object-position: center top
		border: var(--border-main)
		display: block

</style>
