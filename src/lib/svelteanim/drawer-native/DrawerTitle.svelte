<script lang="ts">
	import type { Snippet } from 'svelte'

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props()
</script>

<h2 class="dr-title {className}">
	{@render children?.()}
</h2>
