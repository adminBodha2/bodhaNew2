<script lang="ts">
	import { onMount } from 'svelte';

	let { index = 0, children } = $props();
	let el = $state<HTMLElement>();
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ rootMargin: '0px 0px -10% 0px' }
		);

		if (el) observer.observe(el);

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={el}
	class="reveal-item"
	class:visible
	style={`--i:${index}`}
>
	{@render children?.()}
</div>

<style lang="sass">

.reveal-item
	clip-path: inset(0 0 100% 0)
	transition: clip-path 0.7s cubic-bezier(0.22, 1, 0.36, 1)
	transition-delay: calc(var(--i) * 0.06s)
	will-change: clip-path

.reveal-item.visible
	clip-path: inset(0 0 0 0)

</style>