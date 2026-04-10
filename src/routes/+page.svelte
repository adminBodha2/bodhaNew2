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
	<div class="box50 column ycenter rgap32 pbot32 ptop64">
		<div class="column rgap16 ycenter">
			<h1 class="width70">Bodha is a <span class="blue">think tank and research group</span>,</h1>
			<h6 class="width70 thin">
				focused on contemporary issues of cultural concern, to inform core areas of policy with
				wisdom drawn from Hindu traditions. We advance intellectual churn within the Hindu
				renaissance, and curate cultural experiences of core Hindu institutions such as the temple.
			</h6>
			<!--
      <h3 class="blue ptop16">Our Mandate</h3>
      <div class="grid four stay2 stacked16">
        <div class="column boxed">
          <p>Provide a Hindu cultural lens to foreign policy and institutional design, with original research.</p>
        </div>
        <div class="column boxed">
          <p>Ask pertinent questions about critical cultural problems and create a bank of actionable solutions.</p>
        </div>
        <div class="column boxed">
          <p>Create immersive cultural experiences to make our youth more culturally aware and active.</p>
        </div>
        <div class="column boxed">
          <p>Create institutional and academic depth by training scholars in critical disciplines.</p>
        </div>
      </div>
      -->
		</div>
		<div class="column rgap8">
			<p class="grey">
				About our <a class="blank linked tt-u" href="/research"><b>research projects</b></a>
			</p>
			<p class="grey">Explore our <a class="blank linked tt-u" href="/blog"><b>writings</b></a></p>
			<p class="grey">
				<a class="blank linked tt-u" href="/lab"><b>current notes</b>,</a> opinions, and more
			</p>
			<p class="grey">
				Visit <a class="blank linked tt-u" href="/library"><b>Bodha Open Library</b></a>
			</p>
		</div>
	</div>
	<div class="box50 ycenter column rgap32 bordertop mid-pad">
		<Title text="Verticals" />
		<div class="grid four cgap16 rgap16">
			<div class="column rgap8 blogbox2">
				<img class="vert pbot8" src="/images/vertical-research.webp" alt="research" />
				<h5 class="blue"><a class="blank linker" href="/research">Research</a></h5>
				<p class="tight">
					To illuminate hidden universal forces and long arcs in foreign and public policy; to
					reveal the design of core Hindu institutions like the temple, gurukula, family, and
					charity; and to turn the social sciences lens with a Hindu view, Bodha engages in focused
					research projects. These projects combine deep and immersive field research with rigorous
					theorization based on core cultural ideas.
				</p>
			</div>
			<div class="column rgap8 blogbox2">
				<img class="vert pbot8" src="/images/vertical-tours.webp" alt="cultural tours" />
				<h5 class="blue"><a class="blank linker" href="/anveshi">Cultural Tours</a></h5>
				<p class="tight">
					A guided tour of four to five days to beautiful and hitherto unexplored temples and
					kshetras of Bharatavarsha. Anveshi tours are full of architectural, sculptural and
					cultural splendor, and also an immersion into living systems carrying beautiful cultural
					traditions for thousands of years.
				</p>
			</div>
			<div class="column rgap8 blogbox2">
				<img class="vert pbot8" src="/images/vertical-scholars.webp" alt="bodha academy" />
				<h5 class="blue"><a class="blank linker" href="/academy">Bodha Academy</a></h5>
				<p class="tight">
					Modern fault lines in Hindu society stem from an identity crisis manufactured by the
					British, by institutionalizing identity-based fault lines through academia and other
					institutions. At Bodha, we address this by training scholars every year in anthropology
					and sociology from an Indic point of view.
				</p>
			</div>
			<div class="column rgap8 blogbox2">
				<img class="vert pbot8" src="/images/vertical-bigquestions.webp" alt="big questions" />
				<h5 class="blue"><a class="blank linker" href="/big-questions">The Big Questions</a></h5>
				<p class="tight">
					Every year we will formulate big questions stating major problems that capture core
					concerns in the contemporary journey of Hindu society, and put those questions to great
					thinkers, leaders and activists. The Big Questions vertical will seek answers which will
					move the needle towards solving the stated problems.
				</p>
			</div>
		</div>
	</div>
	<div class="box50 ycenter column rgap32 bordertop mid-pad">
		<div class="column">
			<Title4 text="Writings" />
			<p class="sm lgrey">
				Explore long form essays, opinions, notes on ongoing research, and more...
			</p>
		</div>
		{#if blogs && labs && blogs.length > 0 && labs.length > 0}
			<div class="grid three stacked-2">
				{#each blogs as item}
					<div class="column rgap8">
						<img src={item.meta.image} class="vert" alt={item.meta.title} />
						<h6 class="tight">
							<a class="blank linker" href={item.linkpath}>{item.meta.title}</a>
						</h6>
						<p class="sm16 tight grey">{item.meta.excerpt}</p>
						<div class="row mwrap cgap8 rgap8">
							{#each item.meta.tags as tag}
								<p class="sm blue italic">#{tag}</p>
							{/each}
						</div>
					</div>
				{/each}
				{#each labs as item}
					<div class="column rgap8 blogbox2">
						<small class="blue italic tt-l">#{item.meta.category}</small>
						<h6 class="tight">
							<a class="blank linker" href={item.linkpath}>{item.meta.title}</a>
						</h6>
						<p class="sm16 grey">{item.meta.excerpt}</p>
					</div>
				{/each}
			</div>
		{/if}
		<div class="row mwrap cgap8 rgap8 ycenter ptop8">
			<a class="button-main" href="/blog">Visit Blog</a>
			<a class="button-main" href="/lab">Visit Lab</a>
		</div>
	</div>
	<div class="box100 ycenter column rgap32 bordertop mid-pad">
		<Title2 text="Publications" />
		<div class="grid two stacked-2">
			<div class="column rgap16">
				<img class="book" src="/images/book-ss.webp" alt="svayambodha and shatrubodha" />
				<h6>Svayambodha and Shatrubodha</h6>
				<p class="sm16 grey">
					This book is a small attempt to take the intellectual Hindu renaissance forward by
					rekindling the viveka that is necessary to differentiate between dharma and adharma. The
					Svayambodha–Shatrubodha framework does this by making Hindus aware of their civilizational
					core on one hand and by sensitizing them about the civilizational threats that Sanatana
					Dharma and Hindu society face today.
				</p>
				<div class="row mwrap cgap8 rgap8 ycenter">
					<a
						class="button-main"
						target="_blank"
						rel="noreferrer"
						href="https://www.hindueshop.com/product/svayambodha-and-shatrubodha/">Hindu Eshop</a
					>
					<a
						class="button-main"
						target="_blank"
						rel="noreferrer"
						href="https://padhegaindia.in/product/svayambodha-and-shatrubodha-hindu-view-of-self-and-the-world-hb/"
						>Padhega India</a
					>
					<a class="button-main" target="_blank" rel="noreferrer" href="https://amzn.in/d/hMAWoWD"
						>Amazon</a
					>
				</div>
			</div>
			<div class="column rgap16">
				<img class="book" src="/images/book-fm.webp" alt="fractal mandala" />
				<h6>Fractal Maṇḍala</h6>
				<p class="sm16 grey">
					Fractal Maṇḍala is a fresh exploration of Indian civilization through its own stories and
					traditions. It follows India’s journey from the deep past of the Holocene to the early
					Iron Age. Using the Purāṇas, Vedas, Itihāsas, and ancient genealogies, the book shows that
					what is often called ‘myth’ today was, for ancient Indians, a way of preserving history—a
					civilizational memory encoded in stories, songs, and symbols.
				</p>
				<div class="row mwrap cgap8 rgap8 ycenter">
					<a
						class="button-main"
						target="_blank"
						rel="noreferrer"
						href="https://www.hindueshop.com/product/fractal-mandala/">Hindu Eshop</a
					>
					<a
						class="button-main"
						target="_blank"
						rel="noreferrer"
						href="https://padhegaindia.in/product/fractal-mandala-a-history-of-ancient-india/"
						>Padhega India</a
					>
					<a class="button-main" target="_blank" rel="noreferrer" href="https://amzn.in/d/5a526b5"
						>Amazon</a
					>
				</div>
			</div>
		</div>
	</div>
	<div class="box100 ycenter column rgap32 bordertop mid-pad">
		<Title3 text="Videos" />
		{#if vids && vids.length > 0}
			<div class="grid three stacked-2">
				{#each vids as item}
					<div class="column rgap16">
						<Youtuber youTubeId={item.videoid} />
						<div class="column rgap8">
							<p class="bold tight">
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
		<a class="button-main" href="/videos">See All</a>
	</div>
</Container>

<style lang="sass">

img.vert
  object-fit: cover
  object-position: center center
  @media screen and (min-width: 1025px)
    width: 100%
    height: 320px
  @media screen and (max-width: 1024px)
    width: 100%
    height: 240px

img.book
  object-fit: contain
  margin-right: auto
  @media screen and (min-width: 1025px)
    height: 360px
  @media screen and (max-width: 1024px)
    height: 320px

.marginx
  @media screen and (min-width: 1025px)
    height: 80px
  @media screen and (max-width: 1024px)
    height: 56px

</style>
