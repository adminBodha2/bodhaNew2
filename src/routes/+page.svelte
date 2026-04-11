<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Title2 from '$lib/comps/page-title.svelte';
	import Title3 from '$lib/comps/page-title.svelte';
	import Title4 from '$lib/comps/page-title.svelte';
	import Youtuber from '$lib/comps/youtuber.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import { limitBlog, limitLab } from '$lib/utils/localpulls';
	import { sixVideos } from '$lib/utils/supabaseClient';

	let scroY: number;
	let vids: any;
	let blogs: any;
	let labs: any;

	$metaTitle = 'Bodha';
	$metaDescription =
		'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	$metaUrl = 'https://www.bodharesearch.in';
	$metaImage = '/images/bodhacover.png';

	onMount(() => {
		(async () => {
			vids = await sixVideos();
			blogs = await limitBlog();
			labs = await limitLab();
		})();
	});
</script>

<svelte:window bind:scrollY={scroY} />

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
></Head>

<Container>
	<div class="marginx"></div>
	<Parallax imageLink="/images/heroimage2.webp" />
	<div class="box-1">
		<h1 class="width70 source-serif page-hero">Bodha is a <span class="blue italic">think tank</span> and <span class="blue italic">research group</span>,</h1>
		<h6 class="width70 thin source-serif">
			focused on contemporary issues of cultural concern, to inform core areas of policy with
			wisdom drawn from Hindu traditions. We advance intellectual churn within the Hindu
			renaissance, and curate cultural experiences of core Hindu institutions such as the temple.
		</h6>
		<div class="column landing-p rgap16 width50">
			<p class="p-bot-b">
				About our <a class="blank linked tt-u" href="/research"><b>research projects</b></a>
			</p>
			<p class="p-bot-b">Explore our <a class="blank linked tt-u" href="/blog"><b>writings</b></a></p>
			<p class="p-bot-b">
				<a class="blank linked tt-u" href="/lab"><b>current notes</b>,</a> opinions, and more
			</p>
			<p>
				Visit <a class="blank linked tt-u" href="/library"><b>Bodha Open Library</b></a>
			</p>
		</div>
	</div>
	<div class="box-1">
		<Title text="Verticals" />
		<div class="grid two cgap16 rgap16">
			<div class="column rgap16 blogbox2">
				<img class="vert" src="/images/vertical-research.webp" alt="research" />
				<h4 class="blue source-serif"><a class="blank linker" href="/research">Research</a></h4>
				<p class="tight source-serif big">
					To illuminate hidden universal forces and long arcs in foreign and public policy; to
					reveal the design of core Hindu institutions like the temple, gurukula, family, and
					charity; and to turn the social sciences lens with a Hindu view, Bodha engages in focused
					research projects. These projects combine deep and immersive field research with rigorous
					theorization based on core cultural ideas.
				</p>
			</div>
			<div class="column rgap16 blogbox2">
				<img class="vert" src="/images/vertical-tours.webp" alt="cultural tours" />
				<h4 class="blue source-serif"><a class="blank linker" href="/anveshi">Cultural Tours</a></h4>
				<p class="tight source-serif big">
					A guided tour of four to five days to beautiful and hitherto unexplored temples and
					kshetras of Bharatavarsha. Anveshi tours are full of architectural, sculptural and
					cultural splendor, and also an immersion into living systems carrying beautiful cultural
					traditions for thousands of years.
				</p>
			</div>
			<div class="column rgap16 blogbox2">
				<img class="vert" src="/images/vertical-scholars.webp" alt="bodha academy" />
				<h4 class="blue source-serif"><a class="blank linker" href="/academy">Bodha Academy</a></h4>
				<p class="tight source-serif big">
					Modern fault lines in Hindu society stem from an identity crisis manufactured by the
					British, by institutionalizing identity-based fault lines through academia and other
					institutions. At Bodha, we address this by training scholars every year in anthropology
					and sociology from an Indic point of view.
				</p>
			</div>
			<div class="column rgap16 blogbox2">
				<img class="vert" src="/images/vertical-bigquestions.webp" alt="big questions" />
				<h4 class="blue source-serif"><a class="blank linker" href="/big-questions">The Big Questions</a></h4>
				<p class="tight source-serif big">
					Every year we will formulate big questions stating major problems that capture core
					concerns in the contemporary journey of Hindu society, and put those questions to great
					thinkers, leaders and activists. The Big Questions vertical will seek answers which will
					move the needle towards solving the stated problems.
				</p>
			</div>
		</div>
	</div>
	<div class="box-1">
		<div class="column">
			<Title4 text="Writings" />
			<h6 class="thin">Explore long form essays, opinions, research output, and more at our <a href="/blog" class="blank linked"><b>BLOG.</b></a></h6>
		</div>
		{#if blogs && labs && blogs.length > 0 && labs.length > 0}
			<div class="grid three stacked-2">
				{#each blogs as item}
				<div class="column rgap16">
					<img src={item.meta.image} class="vert2" alt={item.meta.title} />
					<h5 class="source-serif tight"><a class="blank linker" href={item.linkpath}>{item.meta.title}</a></h5>
					<p class="tight grey">{item.meta.excerpt}</p>
					<div class="row mwrap cgap8 rgap8">
						{#each item.meta.tags as tag}
							<p class="sm blue italic">#{tag}</p>
						{/each}
					</div>
				</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="box-1">
		<Title2 text="Publications" />
		<div class="grid two stacked-2">
			<div class="column rgap16">
				<img class="book" src="/images/book-ss.webp" alt="svayambodha and shatrubodha" />
				<h5 class="source-serif tight">Svayambodha and Shatrubodha</h5>
				<p class="grey">
					This book is a small attempt to take the intellectual Hindu renaissance forward by
					rekindling the viveka that is necessary to differentiate between dharma and adharma. The
					Svayambodha–Shatrubodha framework does this by making Hindus aware of their civilizational
					core on one hand and by sensitizing them about the civilizational threats that Sanatana
					Dharma and Hindu society face today.
				</p>
				<div class="row mwrap cgap8 rgap8 ycenter">
					<a class="primary" target="_blank" rel="noreferrer" href="https://www.hindueshop.com/product/svayambodha-and-shatrubodha/">
						<span>Hindu eShop</span>
					</a>
					<a class="primary" target="_blank" rel="noreferrer" href="https://padhegaindia.in/product/svayambodha-and-shatrubodha-hindu-view-of-self-and-the-world-hb/">
						<span>Padhega India</span>
					</a>
					<a class="primary" target="_blank" rel="noreferrer" href="https://amzn.in/d/hMAWoWD">
						<span>Amazon</span>
					</a>
				</div>
			</div>
			<div class="column rgap16">
				<img class="book" src="/images/book-fm.webp" alt="fractal mandala" />
				<h5 class="source-serif tight">Fractal Maṇḍala</h5>
				<p class="grey">
					Fractal Maṇḍala is a fresh exploration of Indian civilization through its own stories and
					traditions. It follows India’s journey from the deep past of the Holocene to the early
					Iron Age. Using the Purāṇas, Vedas, Itihāsas, and ancient genealogies, the book shows that
					what is often called ‘myth’ today was, for ancient Indians, a way of preserving history—a
					civilizational memory encoded in stories, songs, and symbols.
				</p>
				<div class="row mwrap cgap8 rgap8 ycenter">
					<a class="primary" target="_blank" rel="noreferrer" href="https://www.hindueshop.com/product/fractal-mandala/">
						<span>Hindu eShop</span>
					</a>
					<a class="primary" target="_blank" rel="noreferrer" href="https://padhegaindia.in/product/fractal-mandala-a-history-of-ancient-india/">
						<span>Padhega India</span>
					</a>
					<a class="primary" target="_blank" rel="noreferrer" href="https://amzn.in/d/5a526b5">
						<span>Amazon</span>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="box-2">
		<div class="column">
			<Title3 text="Videos" />
			<h6 class="thin">Talks, conferences, podcasts - <a href="/videos" class="blank linked"><b>SEE ALL.</b></a></h6>
		</div>
		{#if vids && vids.length > 0}
			<div class="grid three stacked-2">
				{#each vids as item}
					<div class="column rgap16">
						<Youtuber youTubeId={item.videoid} />
						<div class="column rgap8">
							<p class="big bold tight">
								<a class="blank linker" href={item.link} target="_blank" rel="noreferrer"
									>{item.name}</a
								>
							</p>
							<p class="sm blue">{item.channel}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}

	</div>
</Container>

<style lang="sass">

p.p-bot-b
	padding-bottom: 0.75rem

h1.page-hero
	@media screen and (min-width: 1025px)
		font-size: 4rem
		letter-spacing: -2px
	@media screen and (max-width: 1024px)
		font-size: 2.5em
		letter-spacing: -1px
		line-height: 1.2

img.vert
	object-fit: cover
	object-position: center center
	@media screen and (min-width: 1025px)
		width: 100%
		height: 360px
	@media screen and (max-width: 1024px)
		width: 100%
		height: 240px

img.vert2
	object-fit: cover
	object-position: center center
	@media screen and (min-width: 1025px)
		width: 100%
		height: 280px
	@media screen and (max-width: 1024px)
		width: 100%
		height: 240px

img.book
	object-fit: contain
	margin-right: auto
	border-radius: 5px
	background: var(--grey-ink)
	@media screen and (min-width: 1025px)
		height: 360px
		padding: 1rem
	@media screen and (max-width: 1024px)
		height: 320px

.marginx
	@media screen and (min-width: 1025px)
		height: 80px
	@media screen and (max-width: 1024px)
		height: 56px

</style>
