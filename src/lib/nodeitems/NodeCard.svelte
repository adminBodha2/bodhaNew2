<script lang="ts">
	import type { Node } from '$lib/types/graph';
	import { getContentHref } from '$lib/graph/routing';

	export let node: Node;
	export let note: string | undefined = undefined;

	$: href = getContentHref(node);
	$: desc = node.description ? node.description.slice(0, 120) + (node.description.length > 120 ? '…' : '') : '';
	$: isExternal = href.startsWith('http');

	const typeStyle: Record<string, { color: string; bg: string; border: string }> = {
		article:  { color: '#1971C2', bg: 'rgba(25,113,194,0.07)',  border: 'rgba(25,113,194,0.2)'  },
		thinker:  { color: '#1864AB', bg: 'rgba(24,100,171,0.07)',  border: 'rgba(24,100,171,0.2)'  },
		school:   { color: '#0D3B65', bg: 'rgba(13,59,101,0.07)',   border: 'rgba(13,59,101,0.2)'   },
		text:     { color: '#5999D3', bg: 'rgba(89,153,211,0.09)',  border: 'rgba(89,153,211,0.25)' },
		question: { color: '#4C9BE8', bg: 'rgba(76,155,232,0.07)',  border: 'rgba(76,155,232,0.2)'  },
		concept:  { color: '#74C0FC', bg: 'rgba(116,192,252,0.09)', border: 'rgba(116,192,252,0.3)' },
	};

	$: ts = typeStyle[node.type] ?? typeStyle.article;
</script>

<div class="node-card column ybetween scaledTypo">
	{#if note}
		<p class="small-text blue">{note}</p>
	{/if}
	<a class="blank column rgap24 ybetween heightmax" href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
		<div class="box ptop24 rgap8">
			<h2 class="card-title source-serif">{node.title}</h2>
			{#if desc}
				<p class="grey node-desc">{desc}</p>
			{/if}
		</div>
		<div>
			{#if node.meta?.author}<p class="small-text blue-dark w500 pbot8">{node.meta.author}</p>{/if}
			<small class="type-label tt-u" style="color: {ts.color}; background: {ts.bg}; border-color: {ts.border};">{node.type}</small>
		</div>
	</a>
</div>

<style lang="sass">

h2.card-title
	color: #111
	margin: 0
	@media screen and (min-width: 1025px)
		letter-spacing: -0.001em
		border-top: var(--stroke-focus)
		padding-top: 1.2rem

.type-label
	display: inline-flex
	align-items: center
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 3px 9px
	border-radius: 100px
	border: 1px solid
	margin-top: auto
	width: max-content

</style>
