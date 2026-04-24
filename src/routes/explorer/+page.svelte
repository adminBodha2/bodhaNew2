<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import NodeMiniCard from '$lib/nodeitems/NodeMiniCard.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data }: { data: PageData } = $props();

	let types = $derived([
		{ key: 'articles', label: 'Articles', nodes: data.articles },
		{ key: 'texts', label: 'Books', nodes: data.texts },
		{ key: 'thinkers', label: 'Thinkers', nodes: data.thinkers },
		{ key: 'schools', label: 'Schools', nodes: data.schools },
		{ key: 'questions', label: 'Questions', nodes: data.questions }
	]);

	let activeKey = $state('articles');
	let active = $derived(types.find((t) => t.key === activeKey)!);
	let total = $derived(types.reduce((sum, type) => sum + type.nodes.length, 0));

	const title = 'Knowledge Explorer | Bodha';
	const metaDescription = 'Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base.';
	const metaUrl = 'https://www.bodharesearch.in/explorer';
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: title,
		description: metaDescription,
		url: metaUrl,
		image: metaImage,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: types.flatMap((type) => type.nodes).map((node, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: node.title,
				url: node.slug ? 'https://www.bodharesearch.in/' + node.slug : metaUrl
			}))
		}
	}));
</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Knowledge Explorer" showD={true} desc="Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base. {total} nodes | {types.length} types" showRow={true}>
		<div class="row ycenter cgap8 mwrap rgap8">
		{#each types as t}
			<button
				class="nav-btn"
				class:active={activeKey === t.key}
				onclick={() => activeKey = t.key}
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