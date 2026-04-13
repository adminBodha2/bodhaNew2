<script lang="ts">

	import { onMount } from 'svelte'
	import { page } from '$app/state'
	import '$lib/styles/lab.sass';
	import { allResearch } from '$lib/utils/localpulls';
  
	let projects:any
	const rootPath = page.url.pathname.split('/')[2];

	onMount(() => {
	  (async() => {
		projects = await allResearch();
	  })();
	})
  
  </script>
  
  <div class="stdpad lab-page">
	  <div class="lab-shell">
		  <aside class="lab-side column">
			  <div class="lab-side-inner">
				  <nav class="lab-nav column rgap32">
					  {#if projects && projects.length > 0}
							  <div class="column rgap8">
								  {#each projects as item}
								  {#if item.linkpath !== page.url.pathname}
								  <p class="sm"><a class="blank linker" href={item.linkpath}>{item.meta.title}</a></p>
								  {/if}
							  {/each}
							  </div>
					{/if}
				  </nav>
			  </div>
		  </aside>
		  <main class="lab-main">
			  <slot></slot>
		  </main>
	  </div>
  </div>
  