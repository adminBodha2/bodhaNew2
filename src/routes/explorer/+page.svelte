<script lang="ts">

	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import NodeMiniCard from '$lib/nodeitems/NodeMiniCard.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	export let data: PageData;

	const types = [
		{ key: 'articles',  label: 'Articles',  nodes: data.articles  },
		{ key: 'texts',     label: 'Books',     nodes: data.texts     },
		{ key: 'thinkers',  label: 'Thinkers',  nodes: data.thinkers  },
		{ key: 'schools',   label: 'Schools',   nodes: data.schools   },
		{ key: 'questions', label: 'Questions', nodes: data.questions },
	];

	let activeKey = 'articles';
	$: active = types.find(t => t.key === activeKey)!;
	$: total = types.reduce((s, t) => s + t.nodes.length, 0);

	const title = "Knowledge Explorer"
	const metaDescription = "Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base."
	const metaUrl = "https://www.bodharesearch.in/explorer"
	const metaImage = "https://www.bodharesearch.in/images/bodhacover.png"
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} />

<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Knowledge Explorer" showD={true} desc="Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base. {total} nodes | {types.length} types" showRow={true}>
		<div class="row ycenter cgap8 mwrap rgap8">
		{#each types as t}
			<button
				class="nav-btn"
				class:active={activeKey === t.key}
				on:click={() => activeKey = t.key}
			>
				{t.label} | {t.nodes.length}
			</button>
		{/each}
		</div>
	</Crumb>
	<div class="grid white-grid four">
		{#each active.nodes as node (node.id)}
			<NodeMiniCard {node} showType={false} />
		{/each}
	</div>
</div>
</Container>