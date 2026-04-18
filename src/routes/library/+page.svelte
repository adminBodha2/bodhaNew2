<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import libraryItems from '$lib/serving/library-items.json';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha Open Library';
	$metaDescription = 'A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more.';
	$metaUrl = 'https://www.bodharesearch.in/library';
	$metaImage = '/images/key-bol.webp';

const categories = [
		{ label: 'Essentials', href: '/library/categories/essentials', type: 'essentials', forLink: 'essentials', desc: 'Foundational readings for entering the civilisational and philosophical landscape of Bodha.' },
		{ label: 'Aryan Issue', href: '/library/categories/aryan-issue', type: 'aryan-issue', forLink: 'aryanissue', desc: 'Texts on the Aryan debate, migration theory, archaeology, philology, and civilizational argument.' },
		{ label: 'Darshanas', href: '/library/categories/darshanas', type: 'darshana', forLink: 'darshana', desc: 'Primary and secondary works on Indian philosophical systems, debates, and metaphysical frameworks.' },
		{ label: 'Indian Knowledge Systems', href: '/library/categories/iks', type: 'iks', forLink: 'iks', desc: 'Works on organised traditions of knowledge, method, science, language, and pedagogy.' },
		{ label: 'Scriptural', href: '/library/categories/scriptural', type: 'scriptural', forLink: 'scriptural', desc: 'Sources in shruti, smriti, puranic, and sacred-historical traditions.' },
		{ label: 'Shatrubodha', href: '/library/categories/shatrubodha', type: 'shatrubodha', forLink: 'shatrubodha', desc: 'Texts dealing with critique, conflict, ideology, and civilisational self-understanding.' },
		{ label: 'Svayambodha', href: '/library/categories/svayambodha', type: 'svayambodha', forLink: 'svayambodha', desc: 'Books oriented toward self-understanding, cultural continuity, and Hindu civilisational confidence.' }
];

	const categoryCounts = Object.fromEntries(
		categories.map((category) => [
			category.type,
			libraryItems.filter((item) => item.type === category.type).length
		])
	);

	const paths = [
		{ label: 'Arts, Performance, and Aesthetics', href: '/paths/arts-performance-and-aesthetics', desc: 'Sources on music, drama, performance, rasa, kala, and the theory and practice of artistic experience.' },
		{ label: 'Darshanas and Philosophy', href: '/paths/darshana-and-philosophy', desc: 'Works on the major schools of Indian philosophy, including Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa, Vedanta, and Shaiva thought.' },
		{ label: 'Dharma, Ethics, Law', href: '/paths/dharma-ethics-and-law', desc: 'Texts dealing with duty, moral order, legal reasoning, social norms, ritual obligations, and the dharmashastra tradition.' },
		{ label: 'Hindu Overview', href: '/paths/hindu-overviews', desc: 'Broad introductory works that summarize Hindu tradition as a whole, including its beliefs, practices, worldview, and civilizational continuity.' },
		{ label: 'History, Polity, and Society', href: '/paths/history-polity-and-society', desc: 'Works on political thought, governance, social structure, chronicles, institutions, and historical memory in Indian civilization.' },
		{ label: 'Indian Knowledge Systems', href: '/paths/indian-knowledge-systems', desc: 'Texts on traditional systems of organized knowledge, including science, mathematics, technical disciplines, applied learning, and knowledge classification.' },
		{ label: 'Indology and Civilizational Critique', href: '/paths/indology-and-civilizational-critique', desc: 'Modern critical works examining Indology, orientalism, academic method, and the ideological framing of Indian traditions and civilization.' },
		{ label: 'Language, Logic, Sanskrit', href: '/paths/language-logic-and-sanskrit', desc: 'Works on Sanskrit language, grammar, semantics, lexicography, linguistic philosophy, and systems of logical reasoning.' },
		{ label: 'Puranic and Itihasic Literature', href: '/paths/puranic-and-itihasa-literature', desc: 'Narrative and sacred-historical texts such as the Puranas, epics, and story literature preserving cosmology, myth, and sacred geography.' },
		{ label: 'Vedic and Upanishadic Texts', href: '/paths/vedic-and-upanishadic-texts', desc: 'Sources centered on the Vedas, Rigvedic interpretation, and Upanishads, especially themes of revelation, ritual, self, brahman, and liberation.' },
	];

	const externalResources = [
		{ label: 'GRETIL', href: 'https://gretil.sub.uni-goettingen.de/gretil.html', desc: 'The Göttingen Register of Electronic Texts in Indian Languages. Complete HTML, XML and text collections of the Vedas, Epics, Puranas, and various texts in Kavya, Darshanas, Shastras, and more.' },
		{ label: 'Sanskrit Documents', href: 'https://sanskritdocuments.org/', desc: 'A comprehensive resource with Sanskrit documents, bookstore listings, Veda Pathashala, scanned books, and tools for learning Sanskrit.' },
		{ label: 'Safire Repository', href: 'https://sanskrit.safire.com/Sanskrit.html', desc: 'A rich repository of PDFs for various texts, stotras, and Sanskrit learning tools.' },
		{ label: 'Digital Corpus of Sanskrit', href: 'http://www.sanskrit-linguistics.org/dcs/index.php', desc: 'A Sandhi-split corpus of Sanskrit texts with full morphological and lexical analysis, designed for text-historical research in linguistics and philology.' },
		{ label: 'Shodh Ganga', href: 'https://shodhganga.inflibnet.ac.in/', desc: 'A platform for Indian Ph.D. theses, accessible to the global scholarly community through open access.' },
		{ label: 'Sanskrit Dictionary', href: 'https://sanskritdictionary.com/', desc: 'A composite Sanskrit dictionary and word lookup site with meanings, associated words, and references, including a Sanskrit dhatus search companion.' },
		{ label: 'Archive.org', href: 'https://archive.org/', desc: 'The original and undefeated repository for all kinds of texts. Most documents in our own library are sourced from this archive.' },
	];
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Parallax imageLink="/images/key-bol.webp" isClass="is50"/>
<Container narrow={true} scaled={true}>
<div class="box std padded">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Open Library" showD={true} desc="A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more."/>
	<div class="box std">
		<div class="grid standard-grid four stay2">
			{#each categories as cat}
			<a class="shelf-card box labelbox number" href={cat.href}>
				<div class="shelf-top">
					<p class="card-title">{cat.label}</p>
					<p class="citation-big lgrey">{categoryCounts[cat.type]} texts</p>
				</div>
				<p class="small-text tight grey">{cat.desc}</p>
			</a>
			{/each}
		</div>
	</div>
</div>
<div class="box std padded bordertop">
	<Title text="Curated Reading Paths"/>
	<div class="grid standard-grid four stay2">
			{#each paths as path}
			<a class="box labelbox card-path blank number" href={path.href}>
				<p class="card-title tight">{path.label}</p>
				<p class="path-desc">{path.desc}</p>
			</a>
			{/each}
	</div>
</div>

<div class="box std padded bordertop">
	<Title text="External Resources"/>
	<div class="standard-grid grid two stay2">
			{#each externalResources as res}
			<a class="resource-card blank number" href={res.href} target="_blank" rel="noreferrer">
				<p class="item-line tight">{res.label} →</p>
				<p class="resource-desc">{res.desc}</p>
			</a>
			{/each}
	</div>
</div>

</Container>

<style lang="sass">

.hero-sub
	max-width: 66ch

.shelves-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(2, 1fr)

.shelf-card
	padding: 1.35rem 1.4rem

.shelf-top
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	flex-wrap: wrap

.shelf-title
	font-size: clamp(0.95rem, 1.5vw, 1.1rem)
	font-weight: 400
	line-height: 1.2
	letter-spacing: -0.02em
	color: #111
	margin: 0
	transition: color 0.15s ease

.shelf-count
	font-size: 0.74rem
	color: var(--text-ghost)
	white-space: nowrap

.shelf-desc
	font-size: 0.82rem
	line-height: 1.65
	color: #777
	margin: 0

// Paths grid
.paths-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(2, 1fr)

.card-path
	padding: 1.4rem

.path-title
	font-size: clamp(0.9rem, 1.5vw, 1.05rem)
	font-weight: 400
	line-height: 1.25
	letter-spacing: -0.02em
	color: #111
	margin: 0
	transition: color 0.15s ease

.path-desc
	font-size: 0.8rem
	line-height: 1.65
	color: #777
	margin: 0

// External resources
.resources-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(2, 1fr)

.resource-card
	display: flex
	flex-direction: column
	gap: 0.4rem
	padding: 1.2rem 1.4rem
	background: #FFFFFF
	transition: background 0.15s ease
	&:hover
		background: #F9F8F6
		.resource-label
			color: var(--theme)

.resource-label
	font-size: 0.84rem
	font-weight: 600
	color: #333
	transition: color 0.15s ease

.resource-desc
	font-size: 0.78rem
	line-height: 1.6
	color: #888
	margin: 0

</style>
