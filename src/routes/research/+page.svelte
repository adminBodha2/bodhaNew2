<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import Card from '$lib/comps/card-comp.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha - Research';
	$metaDescription =
		'Our research areas fall in 3 categories - Institutional Design, Policy and Strategic Affairs, Intellectual Output.';
	$metaUrl = 'https://www.bodharesearch.in/research';
	$metaImage = '/images/key-research.webp';
</script>

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
></Head>

<Parallax imageLink="/images/key-research.webp" />
<Container narrow={true}>
	<div class="box-2" id="first">
		<div class="grid two stacked-4816">
			<h6 class="thin source-serif">
				A standing complaint of Hindu society is that India’s policy does not take into account
				Hindu cultural sensibilities. Bodha works to rectify this, by providing policy inputs
				gleaned from extensive field research in culture studies, particularly in ethnography,
				anthropology and sociology. India is a living civilization whose soul resides in its
				practices and not just in principles. Shying away from dogmas, it has always coupled
				theories with practices and experiences.
			</h6>
			<div class="column rgap24">
			<h6 class="thin source-serif">
				Any effort towards pushing India’s
				policy closer to Hindu culture has to come from wisdom gleaned from field experiences and
				case studies, based upon rigorous and culture sensitive research methodology. Our goal is to make experimental methodology central to policy recommendations so that
				policy in future India is conducive to India’s culture, and also practical and capable of
				competing with global forces.
			</h6>
			<div class="row cgap16 ycenter">
			<a class="primary" href="/big-questions"><span>Big Questions</span></a>
			<a class="primary" href="/lab"><span>Bodha Lab</span></a>
			</div>
			</div>
		</div>
	</div>
	<div class="box-2">
		<Title text="Research Areas" />
			<div class="grid three stacked-2">
				<Card noLink={true} imageLink="/images/research-1.webp">
					<h5 class="source-serif tight">Institutional Design</h5>
					<div class="column">
						<p class="pbot8 borderbot"><a class="blank linked color" href="/research/hindu-models-of-temple-management">Hindu Models of Temple Management</a></p>
						<p class="pbot8 ptop8 borderbot"><a class="blank linked color" href="/research/structure-of-hindu-charity">Structure of Hindu Charity</a></p>
						<p class="pbot8 ptop8 borderbot"><a class="blank linked color" href="/research/hindu-frameworks-of-education">Hindu Frameworks of Education</a></p>
						<p class="pbot8 ptop8 borderbot"><a class="blank linked color" href="/research/interchanging-dynamics-of-hindu-family">Interchanging Dynamics of Hindu Family</a></p>
						<p class="ptop8"><a class="blank linked color" href="/research/temples-of-madhya-pradesh">Temples of Madhya Pradesh</a></p>
					</div>
				</Card>
				<Card noLink={true} imageLink="/images/research-2.webp">
					<h5 class="source-serif tight">Policy and Strategic Affairs</h5>
					<div class="column">
						<p class="pbot8 borderbot"><a class="blank linked color" href="/research/battle-for-dharma-north-east">Battle of Dharma in North East</a></p>
						<p class="ptop8 pbot8 borderbot"><a class="blank linked color" href="/research/year-in-hajong-village">A Year in a Hajong Village</a></p>
						<p class="ptop8 pbot8 borderbot"><a class="blank linked color" href="/research/dangs-anatomy-of-religious-terror">Dangs: Anatomy of Religious Terror</a></p>
						<p class="ptop8 pbot8 borderbot">The Dharma-Dhamma Axis</p>
						<p class="ptop8">Kekadia: Impact of Conversion on Tribal Society</p>
					</div>
				</Card>
				<Card noLink={true} imageLink="/images/research-3.webp">
					<h5 class="source-serif tight">Purva Paksha Project</h5>
					<div class="column">
						<p class="pbot8 borderbot"><a class="blank linked color" href="/research/hindu-response-to-enlightenment">A Hindu View of the Enlightenment</a></p>
						<p class="pbot8 ptop8 borderbot"><a class="blank linked color" href="/research/artist-in-art">Artist in the Art: Hindu View of Western Art</a></p>
						<p class="pbot8 ptop8 borderbot">India That Was: Glimpses of a Disappearing World</p>
						<p class="ptop8">Alternate Consciousness: Pagan Cultures</p>
					</div>
				</Card>
			</div>
	</div>
</Container>

<style lang="sass">

#first
	min-height: 50vh
	justify-content: center

.research-area
	h4
		border-bottom: 1px solid var(--grey-sm)
		padding-bottom: 1rem

.research-outer
	border: 1px solid var(--grey-sm)
	padding: 2rem
	border-radius: 5px
	@media screen and (max-width: 1024px)
		padding: 1rem

img.vert
	object-fit: cover
	object-position: center center
	@media screen and (min-width: 1025px)
		width: 100%
		height: 280px
	@media screen and (max-width: 1024px)
		width: 100%
		height: 200px

</style>
