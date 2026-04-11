<script lang="ts">

	import { onMount } from 'svelte'
	import { selectedOpenLibrary } from '$lib/utils/supabaseClient'
	import Head from '$lib/comps/headcomponent.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  
	let books:any
	$metaTitle = 'Bodha - Library | Svayambodha'
	$metaDescription = 'Readings in Svayambodha.'
	$metaUrl = 'https://www.bodharesearch.in/library/svayambodha'
	$metaImage = '/images/bodhacover.png'
  
	onMount(() => {
	  (async() => {
		books = await selectedOpenLibrary('svayambodha');
	  })();
	})
  
  </script>
  
  <Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>
  
  <div class="box">
	  <div class="column borderbot pbot32">
		  <div class="pbot8">
			  <small class="blue"><a class="blank" href="/library">BODHA OPEN LIBRARY</a></small>
		  </div>
		  <h2 class="source-serif">Svayambodha</h2>
	  </div>
	  {#if books && books.length > 0}
	  <div class="grid two stacked-4816 ptop32 pbot64">
		{#each books as item}
		  <div class="column">
			  {#if item.type === "aryanissue"}
				<p class="bold tight"><a class="heading" href={item.linkfinal} target="_blank" rel="noreferrer">{item.name}</a></p>
			  {:else}
				<p class="bold tight"><a class="heading" href="/library/{item.slug}">{item.name}</a></p>
			  {/if}
			<div class="row xbetween ycenter">
			  <small class="sm grey">{item.author}</small>
			</div>
		  </div>
		{/each}
	  </div>
	{/if}
  </div>
  