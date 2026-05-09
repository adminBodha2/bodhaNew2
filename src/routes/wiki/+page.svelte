<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import WikiGraph from '$lib/comps/wikigraph.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = 'Knowledge Map | Bodha';
	const metaDescription = 'An interactive map of the Bodha knowledge base — thinkers, schools, questions, wiki pages, and research nodes, connected by the relationships between them.';
	const metaUrl = absoluteUrl('/wiki');
	const metaImage = absoluteImage('/images/bodhacover.png');
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container graphing={true}>
	<section class="box wrapper-std rgap32 header-margin">
		<Crumb showT={true} title="Knowledge Map" showD={true} desc="An interactive map of the Bodha knowledge base. Nodes are thinkers, schools, questions, wiki pages, and research projects. Edges show how they connect — who draws on whom, what addresses what, which schools a thinker belongs to."/>
		<WikiGraph nodes={data.nodes} edges={data.edges} />
	</section>
</Container>
