<script lang="ts">
	import type { PageProps } from './$types';
	import WipeSceneView from '../WipeSceneView.svelte';

	let { data }: PageProps = $props();
</script>

<WipeSceneView scene={data.scene} />
