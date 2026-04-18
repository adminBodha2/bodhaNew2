<script lang="ts">
	import { currentNodeId, relatedConcepts } from '$lib/graph/stores';
  
	export let node;
  
	$: currentNodeId.set(node.id);
  </script>
  
  {#each $relatedConcepts as c}
  <a href={`/concept/${c.slug}`}>{c.title}</a>
{/each}