<script lang="ts">
	import type { Snippet } from 'svelte'
	import { autoItemValue, setNavItemContext } from './state.svelte.js'

	type Props = {
		value?: string
		class?: string
		children?: Snippet
	}

	let { value, class: className = '', children }: Props = $props()

	const resolvedValue = value ?? autoItemValue()
	setNavItemContext(resolvedValue)
</script>

<li class="nm-item {className}" data-value={resolvedValue}>
	{@render children?.()}
</li>
