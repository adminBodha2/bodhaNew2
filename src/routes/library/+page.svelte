<script lang="ts">

  import { onMount } from 'svelte'
  import { selectedOpenLibrary } from '$lib/utils/supabaseClient';
  import Head from '$lib/comps/headcomponent.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  let books:any

  $metaTitle = 'Bodha - Library'
  $metaDescription = 'A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more.'
  $metaUrl = 'https://www.bodharesearch.in/library'
  $metaImage = '/images/bodhacover.png'

  onMount(() => {
    (async() => {
      books = await selectedOpenLibrary('essentials')
    })();
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<div class="column rgap16 pbot32">
  <p>Bodha Library is a collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more. Use the menu to navigate.</p>
  <p>All texts in the library are sourced from the public domain. If any text violates copyright, please write to us at <span class="blue">contact@bodharesearch.in</span>. All works compiled under 'Aryan Issue' are externally hosted/published papers, and links will open in a new tab.</p>
  <div class="column rgap32 bordertop ptop32">
    <h5>Recommended Essentials</h5>
    {#if books && books.length > 0}
      <div class="grid three stacked">
        {#each books as item}
          <div class="column">
            <p class="bold tight"><a class="blank linker" href="/library/{item.slug}">{item.name}</a></p>
            <p class="sm blue">{item.author}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div class="column rgap16 bordertop ptop32">
    <h5>Resources</h5>
    <p>A compilation of learning, text, and other resources across the web:</p>
    <div class="column rgap16">
      <p class="sm16"><a class="linked" href="https://gretil.sub.uni-goettingen.de/gretil.html" target="_blank" rel="noreferrer">GRETIL -</a> The Göttingen Register of Electronic Texts in Indian Languages (GRETIL) is a resource platform providing standardized machine-readable texts in Indian languages that have been contributed by various individuals and institutions. GRETIL has complete HTML, XML and text collections of the Vedas, Epics, Puranas, and various texts in Kavya, Darshanas, Shastras, and more.</p>
      <p class="sm16"><a class="linked" href="https://sanskritdocuments.org/" target="_blank" rel="noreferrer">Sanskrit Documents -</a> A beautiful resource with compiled long lists of Sanskrit documents available elsewhere, bookstores, Veda Pathashala, and hundreds of scanned books. Also contains various tools and links for learning Sanskrit.</p>
      <p class="sm16"><a class="linked" href="https://sanskrit.safire.com/Sanskrit.html" target="_blank" rel="noreferrer">Safire Repository -</a> A rich repository of PDFs for various texts, stotras, and learning tools.</p>
      <p class="sm16"><a class="linked" href="http://www.sanskrit-linguistics.org/dcs/index.php" target="_blank" rel="noreferrer">Digital Corpus of Sanskrit -</a> The Digital Corpus of Sanskrit (DCS) is a Sandhi-split corpus of Sanskrit texts with full morphological and lexical analysis. It is designed for text-historical research in Sanskrit linguistics and philology. The raw data is also available for data analysts, AI builders, and researchers at <a class="linked" href="https://github.com/OliverHellwig/sanskrit" target="_blank" rel="noreferrer">Github.</a></p>
      <p class="sm16"><a class="linked" href="https://shodhganga.inflibnet.ac.in/" target="_blank" rel="noreferrer">Shodh Ganga -</a> A platform for research students to submit their Ph.D. theses, making them accessible to the global scholarly community through open access.</p>
      <p class="sm16"><a class="linked" href="https://sanskritdictionary.com/" target="_blank" rel="noreferrer">Sanskrit Dictionary -</a> A composite Sanskrit dictionary and word lookup site that gives us meanings, associated words, and other references. The companion <a class="linked" href="https://sanskritdictionary.com/roots.php" target="_blank" rel="noreferrer">Sanskrit dhatus search site</a> is equally helpful.</p>
      <p class="sm16"><a class="linked" href="https://archive.org/" target="_blank" rel="noreferrer">Archive.org -</a> The original and still undefeated repository for all kinds of texts. Most of the documents sourced in our own library are from this archive.</p>
    </div>
  </div>
</div>