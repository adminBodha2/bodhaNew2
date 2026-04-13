<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Marker from '$lib/icons/bookmark.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha Open Library';
	$metaDescription = 'A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more.';
	$metaUrl = 'https://www.bodharesearch.in/library';
	$metaImage = '/images/key-bol.webp';
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Parallax imageLink="/images/key-bol.webp" />
<Container narrow={true}>
	<div class="box-3" id="first">
		<h1 class="source-serif tight">
			Bodha <br /><span class="blue">Open Library</span>
		</h1>
		<h6 class="thin">
			is a collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more. All texts in the library are sourced from the public domain. If any text violates copyright, please write to us at <span class="blue">contact@bodharesearch.in</span>.
		</h6>
		<div class="row wrap cgap16 rgap16">
			<a class="primary" href="/library/aryan-issue"><span>Aryan Issue</span></a>
			<a class="primary" href="/library/darshana"><span>Darshanas</span></a>
			<a class="primary" href="/library/iks"><span>Indian Knowledge Systems</span></a>
			<a class="primary" href="/library/scriptural"><span>Scriptural</span></a>
			<a class="primary" href="/library/shatrubodha"><span>Shatrubodha</span></a>
			<a class="primary" href="/library/svayambodha"><span>Svayambodha</span></a>
		</div>
		<div class="column rgap32 bordertop ptop32">
			<h4>Curated Discovery Paths</h4>
			<div class="grid three stacked-2">
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight"><a class="blank linker" href="/library/paths/arts-performance-and-aesthetics">Arts, Performance, and Aesthetics</a></p>
					</div>
					<p class="sm grey tight">Sources on music, drama, performance, rasa, kala, and the theory and practice of artistic experience.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/darshanas-and-philosophy">Darshanas and Philosophy</a>
						</p>
					</div>
					<p class="sm grey tight">Works on the major schools of Indian philosophy, including Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa, Vedanta, and Shaiva thought.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/dharma-ethics-and-law">Dharma, Ethics, Law</a>
						</p>
					</div>
					<p class="sm grey tight">Texts dealing with duty, moral order, legal reasoning, social norms, ritual obligations, and the dharmashastra tradition.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/hinduism-overview">Hindu Overview</a>
						</p>
					</div>
					<p class="sm grey tight">Broad introductory works that summarize Hindu tradition as a whole, including its beliefs, practices, worldview, and civilizational continuity.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/history-polity-and-society">History, Polity, and Society</a>
						</p>
					</div>
					<p class="sm grey tight">Works on political thought, governance, social structure, chronicles, institutions, and historical memory in Indian civilization.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/indian-knowledge-systems">Indian Knowledge Systems</a>
						</p>
					</div>
					<p class="sm grey tight">Texts on traditional systems of organized knowledge, including science, mathematics, technical disciplines, applied learning, and knowledge classification.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/indology-and-civilizational-critique">Indology and Civilizational Critique</a>
						</p>
					</div>
					<p class="sm grey tight">Modern critical works examining Indology, orientalism, academic method, and the ideological framing of Indian traditions and civilization.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/language-logic-and-sanskrit">Language, Logic, Sanskrit</a>
						</p>
					</div>
					<p class="sm grey tight">Works on Sanskrit language, grammar, semantics, lexicography, linguistic philosophy, and systems of logical reasoning.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/puranic-and-itihasic-literature">Puranic and Itihasic Literature</a>
						</p>
					</div>
					<p class="sm grey tight">Narrative and sacred-historical texts such as the Puranas, Harivamsha, epic-related studies, and story literature preserving cosmology, myth, genealogy, and sacred geography.</p>
				</div>
				<div class="column rgap4">
					<div class="row mwrap cgap8 rgap8 onhove">
						<Marker size={20} />
						<p class="big bold tight">
							<a class="blank linker" href="/library/paths/vedic-and-upanishadic-texts">Vedic and Upanishadic Texts</a>
						</p>
					</div>
					<p class="sm grey tight">Sources centered on the Vedas, Rigvedic interpretation, and Upanishads, especially themes of revelation, ritual, self, brahman, and liberation.</p>
				</div>
			</div>
		</div>
		<div class="column rgap24 bordertop ptop32">
			<h6>External Resources</h6>
			<div class="grid two stacked16">
				<p class="borderbot pbot16">
					<a class="linked" href="https://gretil.sub.uni-goettingen.de/gretil.html" target="_blank" rel="noreferrer">GRETIL -</a> The Göttingen Register of Electronic Texts in Indian Languages (GRETIL) is a resource platform providing standardized machine-readable texts in Indian languages that have been contributed by various individuals and institutions. GRETIL has complete HTML, XML and text collections
					of the Vedas, Epics, Puranas, and various texts in Kavya, Darshanas, Shastras, and more.
				</p>
				<p class="borderbot pbot16"><a class="linked" href="https://sanskritdocuments.org/" target="_blank" rel="noreferrer">Sanskrit Documents -</a> A beautiful resource with compiled long lists of Sanskrit documents available elsewhere, bookstores, Veda Pathashala, and hundreds of scanned books. Also contains various tools and links for learning Sanskrit.</p>
				<p class="borderbot pbot16"><a class="linked" href="https://sanskrit.safire.com/Sanskrit.html" target="_blank" rel="noreferrer">Safire Repository -</a> A rich repository of PDFs for various texts, stotras, and learning tools.</p>
				<p class="borderbot pbot16">
					<a class="linked" href="http://www.sanskrit-linguistics.org/dcs/index.php" target="_blank" rel="noreferrer">Digital Corpus of Sanskrit -</a> The Digital Corpus of Sanskrit (DCS) is a Sandhi-split corpus of Sanskrit texts with full morphological and lexical analysis. It is designed for text-historical research in Sanskrit linguistics and philology. The raw data is also available for data
					analysts, AI builders, and researchers at <a class="linked" href="https://github.com/OliverHellwig/sanskrit" target="_blank" rel="noreferrer">Github.</a>
				</p>
				<p class="borderbot pbot16"><a class="linked" href="https://shodhganga.inflibnet.ac.in/" target="_blank" rel="noreferrer">Shodh Ganga -</a> A platform for research students to submit their Ph.D. theses, making them accessible to the global scholarly community through open access.</p>
				<p class="borderbot pbot16">
					<a class="linked" href="https://sanskritdictionary.com/" target="_blank" rel="noreferrer">Sanskrit Dictionary -</a> A composite Sanskrit dictionary and word lookup site that gives us meanings, associated words, and other references. The companion <a class="linked" href="https://sanskritdictionary.com/roots.php" target="_blank" rel="noreferrer">Sanskrit dhatus search site</a> is equally helpful.
				</p>
				<p><a class="linked" href="https://archive.org/" target="_blank" rel="noreferrer">Archive.org -</a> The original and still undefeated repository for all kinds of texts. Most of the documents sourced in our own library are from this archive.</p>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.onhove
	transition: all 0.5s ease
	&:hover
		align-items: center

#first
	min-height: 50vh
	justify-content: center

</style>
