<script lang="ts">
	import type { Node } from '$lib/types/graph';
	import { getContentHref } from '$lib/graph/routing';

	export let node: Node;

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
	class="mini-card blank"
	{href}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noreferrer' : undefined}
	style="--tc: {ts.color}; --tbg: {ts.bg}; --tborder: {ts.border};"
>
	<span class="mini-type tt-u">{node.type}</span>
	<span class="mini-title">{node.title}</span>
	{#if node.meta?.author}
		<span class="mini-author">{node.meta.author}</span>
	{/if}
</a>

<style lang="sass">

.mini-card
	display: flex
	flex-direction: column
	gap: 3px
	padding: 0.55rem 0.8rem
	border-radius: 8px
	border: 1px solid var(--tborder)
	background: var(--tbg)
	box-shadow: 0 1px 2px rgba(0,0,0,0.02), 0 2px 5px rgba(0,0,0,0.02)
	transition: box-shadow 0.15s ease, transform 0.15s ease
	&:hover
		box-shadow: 0 2px 6px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)
		transform: translateY(-1px)

.mini-type
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--tc)
	opacity: 0.7

.mini-title
	font-size: 0.78rem
	font-weight: 500
	color: #222
	line-height: 1.35

.mini-author
	font-size: 0.7rem
	color: #999
	margin-top: 1px

</style>
