<script lang="ts">

	import type { PageData } from './$types';
	import { servingExternal } from '$lib/serving/servingWiki';
	import Container from '$lib/comps/wrapper.svelte'

	type BlogPost = {
		linkpath: string;
		formattedDate?: string;
		meta: {
			title?: string;
			image?: string;
			excerpt?: string;
			author?: string;
			words?: string | number;
			tags?: string[];
		};
	};
	let { data }: { data: PageData } = $props();
	let posts = $derived((data.posts ?? []) as BlogPost[]);
	let showEx = $state(false);

	const externalPosts = servingExternal();

</script>

<Container>
	<div class="stdbox padded">
	</div>
</Container>