<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes } from 'svelte/elements'

	type Props = HTMLAnchorAttributes & {
		active?: boolean
		class?: string
		children?: Snippet
	}

	let {
		active = false,
		class: className = '',
		href = '#',
		children,
		...rest
	}: Props = $props()
</script>

<a {href} class="nm-link {className}" data-active={active ? 'true' : undefined} {...rest}>
	{@render children?.()}
</a>
