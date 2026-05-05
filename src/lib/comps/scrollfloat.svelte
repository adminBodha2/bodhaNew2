<script lang="ts">
	type Props = {
		children: string;
		containerClass?: string;
		textClass?: string;
	};

	let {
		children = '',
		containerClass = '',
		textClass = ''
	}: Props = $props();

	const chars = $derived(children.split(''));
</script>

<h2 class="scroll-float {containerClass}">
	<span class="scroll-float-text {textClass}">
		{#each chars as char}
			<span class="char">
				{char === ' ' ? '\u00A0' : char}
			</span>
		{/each}
	</span>
</h2>

<style lang="sass">

.scroll-float
	overflow: hidden
	display: block

.scroll-float-text
	display: inline-block

.char
	display: inline-block

</style>
