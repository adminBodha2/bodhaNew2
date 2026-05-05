<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ComponentProps {
		children?: Snippet;
		class?: string;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = '',
		...restProps
	}: ComponentProps = $props();

	function cn(...classes: Array<string | false | null | undefined>) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<span class={cn('text-scramble', className)} {...restProps}>
	{@render children?.()}
</span>
