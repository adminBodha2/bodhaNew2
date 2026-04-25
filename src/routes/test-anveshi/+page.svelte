<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import { nodes, edges } from '$lib/graph';

</script>

<Container narrow={true}>
	<div class="stdbox padded-ontop">
<p>Nodes: {nodes.length}</p>
<p>Edges: {edges.length}</p>
	</div>
</Container>