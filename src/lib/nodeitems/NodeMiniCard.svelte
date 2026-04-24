<script lang="ts">
	import type { Node } from '$lib/types/graph';
	import { getContentHref } from '$lib/graph/routing';

	export let node: Node;
	export let showType = true

	const typeStyle: Record<string, { color: string; bg: string; border: string }> = {
		article:  { color: '#1971C2', bg: 'rgba(25,113,194,0.07)',  border: 'rgba(25,113,194,0.2)'  },
		thinker:  { color: '#1864AB', bg: 'rgba(24,100,171,0.07)',  border: 'rgba(24,100,171,0.2)'  },
		school:   { color: '#0D3B65', bg: 'rgba(13,59,101,0.07)',   border: 'rgba(13,59,101,0.2)'   },
		text:     { color: '#5999D3', bg: 'rgba(89,153,211,0.09)',  border: 'rgba(89,153,211,0.25)' },
		question: { color: '#4C9BE8', bg: 'rgba(76,155,232,0.07)',  border: 'rgba(76,155,232,0.2)'  },
		concept:  { color: '#74C0FC', bg: 'rgba(116,192,252,0.09)', border: 'rgba(116,192,252,0.3)' },
	};

	$: ts = typeStyle[node.type] ?? typeStyle.article;
	$: href = node.type === 'concept' ? `/concept/${node.slug}` : getContentHref(node);
	$: isExternal = href.startsWith('http');
</script>

<a
	class="mini-card blank box card-padded whitestone"
	{href}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noreferrer' : undefined}
	style="--tc: {ts.color}; --tbg: {ts.bg}; --tborder: {ts.border};"
>	
	{#if showType}
	<p class="citation-big blue tt-u">{node.type}</p>
	{/if}
	<p class="w500 tight">{node.title}</p>
</a>
