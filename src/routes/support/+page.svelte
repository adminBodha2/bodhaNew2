<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Title from '$lib/comps/page-title.svelte';

	type SupportArea = {
		title: string;
		points: string[];
	};

	const title = 'Support Us';
	const metaDescription = 'Support long-term research, civilizational dialogue, and scholar training rooted in Hindu knowledge systems.';
	const metaUrl = absoluteUrl('/support');
	const metaImage = absoluteImage('/images/key-research.webp');
	const supportAreas: SupportArea[] = [
		{
			title: 'Research',
			points: ['Months of field immersion', 'Case studies across regions and communities', 'Development of frameworks rooted in dharma']
		},
		{
			title: 'Big Questions',
			points: ['Identifying civilizational problems worth solving', 'Bringing thinkers into structured dialogue', 'Producing ideas that move discourse forward']
		},
		{
			title: 'Bodha Academy',
			points: ['Training scholars in Indic anthropology and sociology', 'Building intellectual depth that compounds over decades']
		}
	];
	const supportAudience = ['Believe that India must think from within its own civilization', 'Feel that policy and academia are disconnected from cultural reality', 'Want to contribute to a long-term Hindu intellectual renaissance', 'Prefer building institutions over funding events'];
	const jsonld = stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage
		})
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Support Us" showD={true} desc={metaDescription} />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">

				<p class="highlight-text">
					Modern India is governed by frameworks that often remain disconnected from its own civilizational logic. Bodha exists to correct this. We are a research group and think tank working at the intersection of culture, policy, and Indian knowledge systems (IKS) - drawing from Hindu knowledge systems to engage with contemporary questions. Our work is to translate the wisdom of Hindu traditions
					into rigorous, field-tested insights that can inform policy, shape education, and guide our collective future.
				</p>

	
				<p class="highlight-text">
					This means:<br />
					- Field research into living Hindu institutions<br />
					- Deep theoretical work rooted in dharmic frameworks<br />
					- Training a new generation of scholars<br />
					- Asking, and attempting to answer, the hardest questions facing Hindu society today<br />
					- Embedding IKS into curriculum, pedagogy, and methodologies
				</p>

		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="What Your Support Makes Possible" />
		<Slide targetSelector=".support-area">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
				{#each supportAreas as area}
					<article class="box whitestone b-main p16 md:p24 lg:p32 rgap16 support-area">
						<h3 class="txt-2xl lg:txt-3xl w600 lh12 ls001m">{area.title}</h3>
						<ol class="support-list box rgap12">
							{#each area.points as point}
								<li class="txt-lg lh14 grey2">{point}</li>
							{/each}
						</ol>
					</article>
				{/each}
			</div>
		</Slide>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Ways to Support" />
		<Reveal>
			<p class="highlight-text lg:width80">There is no single way to support Bodha. Different people contribute in different ways, according to their capacity and intent. You can elect to contribute freely in open donations of any amount. Or you may select a structured way to sustain us.</p>
		</Reveal>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Sustain the Work" />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<Reveal>
				<p class="highlight-text">Fund continuity. This is the most powerful form of support — because it allows Bodha to think long-term.</p>
			</Reveal>
			<Reveal start="top 70%">
				<div class="box whitestone b-main p16 md:p24 lg:p32 rgap16">
					<p class="txt-sm tt-u w500 theme">You can</p>
					<ul class="support-list box rgap12">
						<li class="txt-lg lh14 grey2">Support a month, a quarter, or a full year of work</li>
						<li class="txt-lg lh14 grey2">Become a long-term institutional patron</li>
						<li class="txt-lg lh14 grey2">Help us operate without constantly optimizing for short-term funding</li>
					</ul>
				</div>
			</Reveal>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Sponsor a Complete Vertical" />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<Reveal>
				<p class="highlight-text">If you prefer precision, you can fund clearly defined units of work.</p>
			</Reveal>
			<Slide targetSelector=".vertical-option">
				<div class="grid grid-cols-1 gap16">
					<div class="vertical-option box whitestone b-main p16 md:p24 rgap8">
						<p class="txt-xs tt-u w500 theme">01</p>
						<p class="txt-xl lg:txt-2xl w600 lh12">A research project</p>
					</div>
					<div class="vertical-option box whitestone b-main p16 md:p24 rgap8">
						<p class="txt-xs tt-u w500 theme">02</p>
						<p class="txt-xl lg:txt-2xl w600 lh12">A Big Question</p>
					</div>
					<div class="vertical-option box whitestone b-main p16 md:p24 rgap8">
						<p class="txt-xs tt-u w500 theme">03</p>
						<p class="txt-xl lg:txt-2xl w600 lh12">The training of one or more scholars for a year</p>
					</div>
				</div>
			</Slide>
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Who Should Support Bodha" />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<Reveal>
				<p class="highlight-text">Supporting Bodha is closer to sponsoring a gurukula, patronizing a scholar, or sustaining a parampara. Your participation ensures that the right questions are asked, the right frameworks built, and the long-term seeds for continuance are sown.</p>
			</Reveal>
			<Reveal start="top 70%">
				<div class="box whitestone b-main p16 md:p24 lg:p32 rgap16">
					<p class="txt-sm tt-u w500 theme">You may consider supporting Bodha if you</p>
					<ul class="support-list box rgap12">
						{#each supportAudience as point}
							<li class="txt-lg lh14 grey2">{point}</li>
						{/each}
					</ul>
				</div>
			</Reveal>
		</div>
	</section>
</Container>

<style lang="sass">

.support-list
	margin: 0
	padding-left: 1.25rem

.support-list li
	padding-left: 0.25rem

</style>
