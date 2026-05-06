<script lang="ts">
	import WipeSceneView from './WipeSceneView.svelte';
	import { wipeScenes } from './demoScenes';

	const scene = wipeScenes[0];
</script>

<WipeSceneView {scene} />
