<script lang="ts">
	import type { Node } from '$lib/types/graph';

	export let title: string;
	export let nodes: Node[] = [];

	// optional: limit display
	export let limit: number | null = null;

	const getHref = (node: Node) => {
		if (node.type === 'concept') {
			return `/concept/${node.slug}`;
		}
		return `/node/${node.id}`;
	};

	$: sorted = [...nodes].sort((a, b) => a.title.localeCompare(b.title));
</script>

{#if nodes.length > 0}
	<section>
		<p class="small-text">{title}</p>
		<div class="grid four">
			{#each limit ? sorted.slice(0, limit) : sorted as node (node.id)}
			<div class="node-item">
			  <span class="node-type">[{node.type}]</span>
			  <a href={getHref(node)} class="node-title">
				{node.title}
			  </a>
			</div>
		  {/each}
		</div>
	</section>
{/if}
