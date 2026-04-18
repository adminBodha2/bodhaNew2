<script lang="ts">
	import Arrow from '$lib/icons/arrow-right.svelte';
	export let text = 'Title';
	export let anveshi = false;
	export let isCenter = false
</script>

<div class="row ycenter xleft cgap16 trigger" class:xcenter={isCenter} class:mleft={isCenter}>
	<div class="bob">
		<Arrow size={12} color={anveshi ? '#D3633A' : undefined} />
	</div>
	<p class="eyebrow tight thin name lgrey tt-u">
		{#each text.split('') as char, i}
			<span class="text-animation char-{i}" style="animation-delay: {i * 0.04}s">{char}</span>
		{/each}
	</p>
</div>

<style lang="sass">

.trigger
	&:hover
		.text-animation
			animation: colorchange 4s infinite forwards

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
		color: var(--lgrey)
	17%
		color: var(--themealt)
	34%
		color: var(--theme)
	50%
		color: var(--themesub)
	68%
		color: var(--theme)
	84%
		color: var(--themealt)
	100%
		color: var(--lgrey)

</style>
