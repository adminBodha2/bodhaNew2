<script lang="ts">
	import { teamMembers } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Slider from '$lib/svelteanim/components/Slide.svelte'
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte'

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
	<div class="db-grid padded wraps header-margin first-box">
		<Crumb showT={true} title="About Bodha" showD={true} desc={metaDescription} />
		<div class="db-grid span-4">
			<p class="highlight-text span-2">Bodha is a <span class="blue">think tank and research group</span> studying contemporary issues of cultural concern. We inform core areas of policy with wisdom derived from Hindu culture and philosophy, and help orient education to the Indian Knowledge Systems (IKS). We also curate cultural experiences of core Hindu institutions like the Hindu temple.</p>
			<div class="box rgap-sm p2222 bk1111 span-2">
				<p class="card-title">Our Mandate</p>
				<p class="paragraph-text">
					1. Provide an Indian cultural lens to policy and institutional design with research in frontier areas.<br />
					2. Ask pertinent questions about the most critical cultural problems today.<br />
					3. Create immersive cultural experiences to make our youth more culture aware and active.
				</p>
			</div>
		</div>
	</div>
	<div class="db-grid padded wraps growingline" bind:this={referenceOne}>
		<Title text="Our Work" />
		<div class="db-grid span-4 wraps">
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000}>
			<div class="box rgap-sm p0101 item1">
				<p class="card-title">Research</p>
				<p class="grey paragraph-text tight">Our primary work stream, with projects in current and upcoming pipelines. We point methodological rigor, authenticity, and emic cultural sensitivity towards issues such as Hindu models of temple management, Hindu views of modernity, and more</p>
				<a class="hollow-link" href="/research"
					>See All Projects
					<div class="button-text">→</div></a>
			</div>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={200}>
			<div class="box rgap-sm p0101 item2">
				<p class="card-title">Big Questions</p>
				<p class="paragraph-text tight grey">With the Big Questions initiative, we're asking provocative questions about the most fundamental problems and open questions that Hindu society faces today.</p>
				<a class="hollow-link" href="/big-questions"
					>Know More
					<div class="button-text">→</div></a>
			</div>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={400}>
			<div class="box rgap-sm p0101 item3">
				<p class="card-title">Academy</p>
				<p class="paragraph-text tight grey">Bodha Academy envisions creating a line of scholars capable of carrying the Hindu intellectural work forward, and runs critical online courses.</p>
				<a class="hollow-link" href="/academy"
					>See Courses
					<div class="button-text">→</div></a>
			</div>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={600}>
			<div class="box rgap-sm p0101 item4">
				<p class="card-title">Anveshi</p>
				<p class="paragraph-text tight grey">Bodha Anveshi is our flagship cultural immersion program, curating sacred tours to unexplored cultural kshetras and trails.</p>
				<a class="hollow-link" href="/anveshi"
					>Upcoming Tours
					<div class="button-text">→</div></a>
			</div>
			</Slider>
		</div>
	</div>
	<div class="db-grid padded growingline alternate ycenter" bind:this={referenceTwo}>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500}>
			<a class="p2222 glass-3 box rgap-sm theme-line-parent" href="/library">
				<p class="paragraph-text bold headlink">Bodha Open Library</p>
				<p class="altprim pbot8">The Bodha Open Library features 200+ texts ranging from Puranas and Darshanic texts to papers on Indo-European linguistics, IKS, and more.</p>
				<div class="theme-line"></div>
			</a>
		</Slider>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={200}>
			<a class="p2222 glass-3 box rgap-sm theme-line-parent" href="/blog">
				<p class="paragraph-text bold headlink">Essays, Writings</p>
				<p class="altprim pbot8">
					Read our essays on culture, history, tradition, and more at our blog, featuring 50+ articles that bring together our writings, research, opinions over the years.
				</p>
				<div class="theme-line"></div>
			</a>
		</Slider>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={300}>
			<a class="p2222 glass-3 box rgap-sm theme-line-parent" href="/inspiration">
				<p class="paragraph-text bold headlink">Our Inspiration</p>
				<p class="altprim pbot8">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought. We document the schools of thought and thinkers that inspire and inform us.</p>
				<div class="theme-line"></div>
			</a>
		</Slider>
		<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={400}>
			<div class="p2222 glass-3 box rgap-sm theme-line-parent">
				<p class="paragraph-text bold headlink">Brand and Logo</p>
				<p class="altprim pbot8">This essay by our founder explains the <a class="linkedlight" href="meaning behind our logo">meaning behind our logo</a>, and here he outlines the <a class="linkedlight" href="/blog/bodha-pyramid-of-priorities-nature-of-hindu-orgs">Bodha pyramid of priorities.</a>.</p>
				<p class="altprim pbot8">We're passionate about design and development! Learn more about <a class="linkedlight" href="/designbodha">designBodha,</a> and access our <a class="linkedlight" target="_blank" rel="noreferrer" href="https://github.com/adminBodha2/bodhaNew2">website public repo</a> at Github.</p>
				<div class="theme-line"></div>
			</div>
		</Slider>
		</div>
	<div class="db-grid padded wraps is-last growingline">
		<Title text="The Team" />
		<div class="db-grid fix-3 white-grid span-4">
			{#each teamMembers as member, j}
				<div class="textbox whitestone card-padded">
					<div class="member-image">
						<img src={member.image} alt={member.name} />
					</div>
					<div class="member-info textbox">
						<div class="member-head">
							<p class="bold card-title tight">{member.name}</p>
							<p class="rem1 altprim tt-u w500">{member.role}</p>
						</div>
						<p class="grey">{member.bio}</p>
						{#if member.links.length > 0}
							<div class="member-links row ycenter cgap4">
								{#if j < 4}
								<p class="descriptor-text blue-dark bold"><a class="blank" href="{member.blog}">Writings</a></p>
								<span class="link-sep">·</span>
								{/if}
								{#each member.links as link, i}
									{#if i > 0}<span class="link-sep">·</span>{/if}
									<p class="descriptor-text blue bold"><a class="blank" href={link.href} target="_blank" rel="noreferrer">{link.label}</a></p>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
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
