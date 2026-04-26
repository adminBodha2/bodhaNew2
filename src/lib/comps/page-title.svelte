<script lang="ts">

	import Arrow from '$lib/icons/arrow-right.svelte';

	type Props = {
		text?: string;
		anveshi?: boolean;
		isCenter?: boolean;
	}

	let {
		text = 'Title',
		anveshi = false,
		isCenter = false
	}: Props = $props()

</script>

<div class="row ycenter xleft cgap8 trigger" class:xcenter={isCenter} class:mleft={isCenter}>
	<div class="bob">
		<Arrow size={24} color={anveshi ? '#D3633A' : undefined} />
	</div>
	<h2 class="header-2 name tt-u">
		{#each text.split('') as char, i}
			<span class="text-animation char-{i}" style="animation-delay: {i * 0.04}s">{char}</span>
		{/each}
	</h2>
</div>

<style lang="sass">

.name
	.char-0, .char-1, .char-2, .char-3, .char-4, .char-5, .char-6, .char-7, .char-8, .char-9, .char-10, .char-11, .char-12, .char-13
		color: var(--lgrey)

.bob
	animation: bob 2s ease-in-out infinite

@keyframes bob
	0%
		transform: translateX(0)
	50%
		transform: translateX(8px)
	100%
		transform: translateX(0)

@keyframes colorchange
	0%
		color: var(--color-grey-2)
	25%
		color: var(--color-theme)
	50%
		color: var(--color-theme-5)
	75%
		color: var(--color-theme)
	100%
		color: var(--color-grey-2)

</style>
