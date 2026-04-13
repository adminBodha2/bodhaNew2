<script lang="ts">

	import { onMount } from 'svelte'
	import { selectedOpenLibrary } from '$lib/utils/supabaseClient'
	import Head from '$lib/comps/headcomponent.svelte'
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  
	let books:any
	$metaTitle = 'Bodha Open Library | Aryan Issue'
	$metaDescription = 'Readings on Indo-European Linguistics.'
	$metaUrl = 'https://www.bodharesearch.in/library/aryan-issue'
	$metaImage = '/images/bodhacover.png'
  
	onMount(() => {
	  (async() => {
		books = await selectedOpenLibrary('aryanissue');
	  })();
	})
  
  </script>
  
  <Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container narrow={true}>
	<div class="box-t column">
		<div class="column borderbot pbot32">
			<Crumb item1="BODHA OPEN LIBRARY" item1Link="/library" show2={true} item2="ARYAN ISSUE"/>
			<h2 class="source-serif tight">Aryan Issue</h2>
			<div class="row ycenter mwrap cgap8 rgap8 ptop16">
				<a class="ftnbtn" href="/library/essentials">Essentials</a>
				<a class="ftnbtn" href="/library/darshana">Darshanas</a>
				<a class="ftnbtn" href="/library/iks">IKS</a>
				<a class="ftnbtn" href="/library/scriptural">Scriptural</a>
				<a class="ftnbtn" href="/library/shatrubodha">Shatrubodha</a>
				<a class="ftnbtn" href="/library/svayambodha">Svayambodha</a>
			</div>
		</div>
		{#if books && books.length > 0}
		<div class="grid three rgap8 cgap8">
		  {#each books as item}
			<div class="column book-case">
				{#if item.type === "aryanissue"}
				  <p class="bold big tight"><a class="heading" href={item.linkfinal} target="_blank" rel="noreferrer">{item.name}</a></p>
				{:else}
				  <p class="bold big tight"><a class="heading" href="/library/{item.slug}">{item.name}</a></p>
				{/if}
			  <div class="row xbetween ycenter">
				<p class="sm blue">{item.author}</p>
			  </div>
			</div>
		  {/each}
		</div>
	  {/if}
	</div>
</Container>

<style lang="sass">

.book-case
	border: 1px solid var(--grey-sm)
	border-radius: 8px
	padding: 1rem

</style>