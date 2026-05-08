<script lang="ts">
	import type { Snippet } from 'svelte'

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props()
</script>

<ul class="nm-list {className}">
	{@render children?.()}
</ul>
