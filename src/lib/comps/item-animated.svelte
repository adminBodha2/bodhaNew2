<!-- Static wrapper kept for existing imports without GSAP. -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
	};

	let { children, class: className = '' }: Props = $props();
</script>

<div class={className}>
	{@render children()}
</div>
