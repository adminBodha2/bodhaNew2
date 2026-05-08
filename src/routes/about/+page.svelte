<script lang="ts">
	import { teamMembers } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Slider from '$lib/svelteanim/components/Slide.svelte'
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte'
	import Policy from '$lib/icons/policy.svelte'
	import Concern from '$lib/icons/concern.svelte'
	import Aware from '$lib/icons/aware.svelte'

	const title = 'About | Bodha';
	const metaDescription = 'About Bodha, its work, method, and purpose.';
	const metaUrl = absoluteUrl('/about');
	const metaImage = absoluteImage('/images/bodhacover.png');
	let referenceOne = $state<HTMLElement | null>(null);
	let referenceTwo = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => referenceOne, {threshold: 0.4, once: true})
	let isTwoVisible = useInView(() => referenceTwo, {threshold: 0.5, once: true})

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
	<section class="box wrapper-std rgap32">
		<Crumb showT={true} title="About Bodha" showD={true} desc={metaDescription} />
		<div class="box rgap32">
			<p class="highlight-text width60">Bodha is a <span class="blue">think tank and research group</span> studying contemporary issues of cultural concern. We inform core areas of policy with wisdom derived from Hindu culture and philosophy, and help orient education to the Indian Knowledge Systems (IKS). We also curate cultural experiences of core Hindu institutions like the Hindu temple.</p>
			<div class="box rgap16">
				<p class="highlight-text bold">Our Mandate</p>
				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 white-grid">
					<div class="row ycenter cgap16 rgap8 p16 lg:p32 whitecard">
						<Policy color="var(--color-theme-2)"/>
						<p class="flex-grow paragraph-text tight grey">Provide an Indian cultural lens to policy and institutional design with research in frontier areas.</p>
					</div>
					<div class="row ycenter cgap16 whitecard p16 lg:p32">
						<Concern size={56} color="var(--color-theme-2)"/>
						<p class="flex-grow paragraph-text tight grey">Ask pertinent questions about the most critical cultural problems today.</p>
					</div>
					<div class="row ycenter cgap16 whitecard p16 lg:p32">
						<Aware color="var(--color-theme-2)"/>
					<p class="flex-grow paragraph-text tight grey">Create immersive cultural experiences to make our youth more culture aware and active.</p>
					</div>
				</div>
			</div> 
		</div>
	</section>
	<section class="box wrapper-std rgap64 growingline" bind:this={referenceOne}>
		<Title text="Our Work" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" id="forlinks">
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000}>
			<div class="box rgap8 p16 lg:p32 stonecard radius8">
				<p class="card-title bold">Research</p>
				<p class="grey paragraph-text tight">Our primary work stream, with projects in current and upcoming pipelines. We point methodological rigor, authenticity, and emic cultural sensitivity towards issues such as Hindu models of temple management, Hindu views of modernity, and more</p>
				<a class="hollow-link" href="/research"
					>See All Projects
					<div class="button-text">→</div></a>
			</div>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={200}>
			<div class="box rgap8 p16 lg:p32 stonecard radius8">
				<p class="card-title bold">Big Questions</p>
				<p class="paragraph-text tight grey">With the Big Questions initiative, we're asking provocative questions about the most fundamental problems and open questions that Hindu society faces today.</p>
				<a class="hollow-link" href="/big-questions"
					>Know More
					<div class="button-text">→</div></a>
			</div>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={400}>
			<div class="box rgap8 p16 lg:p32 stonecard radius8">
				<p class="card-title bold">Academy</p>
				<p class="paragraph-text tight grey">Bodha Academy envisions creating a line of scholars capable of carrying the Hindu intellectural work forward, and runs critical online courses.</p>
				<a class="hollow-link" href="/academy"
					>See Courses
					<div class="button-text">→</div></a>
			</div>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={600}>
			<div class="box rgap8 p16 lg:p32 stonecard radius8">
				<p class="card-title bold">Anveshi</p>
				<p class="paragraph-text tight grey">Bodha Anveshi is our flagship cultural immersion program, curating sacred tours to unexplored cultural kshetras and trails.</p>
				<a class="hollow-link" href="/anveshi"
					>Upcoming Tours
					<div class="button-text">→</div></a>
			</div>
			</Slider>
		</div>
	</section>
	<section class="wrapper-std rgap16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16 growingline alternate ycenter" bind:this={referenceTwo}>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500}>
			<a class="glass-3 box rgap8 theme-line-parent p16 lg:p32 radius8" href="/library">
				<p class="paragraph-text bold headlink">Bodha Open Library</p>
				<p class="altprim pbot8">The Bodha Open Library features 200+ texts ranging from Puranas and Darshanic texts to papers on Indo-European linguistics, IKS, and more.</p>
				<div class="theme-line"></div>
			</a>
		</Slider>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={200}>
			<a class="glass-3 box rgap8 theme-line-parent p16 lg:p32 radius8" href="/blog">
				<p class="paragraph-text bold headlink">Essays, Writings</p>
				<p class="altprim pbot8">
					Read our essays on culture, history, tradition, and more at our blog, featuring 50+ articles that bring together our writings, research, opinions over the years.
				</p>
				<div class="theme-line"></div>
			</a>
		</Slider>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={300}>
			<a class="glass-3 box rgap8 theme-line-parent p16 lg:p32 radius8" href="/inspiration">
				<p class="paragraph-text bold headlink">Our Inspiration</p>
				<p class="altprim pbot8">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought. We document the schools of thought and thinkers that inspire and inform us.</p>
				<div class="theme-line"></div>
			</a>
		</Slider>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={400}>
			<div class="glass-3 box rgap8 theme-line-parent p16 lg:p32 radius8">
				<p class="paragraph-text bold headlink">Brand and Logo</p>
				<p class="altprim pbot8">This essay by our founder explains the <a class="linkedlight" href="meaning behind our logo">meaning behind our logo</a>, and here he outlines the <a class="linkedlight" href="/blog/bodha-pyramid-of-priorities-nature-of-hindu-orgs">Bodha pyramid of priorities.</a>.</p>
				<p class="altprim pbot8">We're passionate about design and development! Learn more about <a class="linkedlight" href="/designbodha">designBodha,</a> and access our <a class="linkedlight" target="_blank" rel="noreferrer" href="https://github.com/adminBodha2/bodhaNew2">website public repo</a> at Github.</p>
				<div class="theme-line"></div>
			</div>
		</Slider>
		</section>
	<section class="box wrapper-std rgap64 growingline">
		<Title text="The Team" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 white-grid">
			{#each teamMembers as member, j}
				<div class="box rgap32 whitestone p16 lg:p32">
					<div class="member-image">
						<img src={member.image} alt={member.name} />
					</div>
					<div class="member-info box rgap8">
						<div class="member-head">
							<p class="card-title tight">{member.name}</p>
							<p class="tt-u w500">{member.role}</p>
						</div>
						<p class="grey">{member.bio}</p>
						{#if member.links.length > 0}
							<div class="member-links row ycenter cgap4">
								{#if j < 4}
								<p class="citation blue-dark bold"><a class="blank" href="{member.blog}">Writings</a></p>
								<span class="link-sep">·</span>
								{/if}
								{#each member.links as link, i}
									{#if i > 0}<span class="link-sep">·</span>{/if}
									<p class="citation blue bold"><a class="blank" href={link.href} target="_blank" rel="noreferrer">{link.label}</a></p>
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
		width: 120px
		height: 120px
		border-radius: 50%
		object-fit: cover
		object-position: center top
		border: 1px solid rgba(0,0,0,0.07)
		display: block

</style>
