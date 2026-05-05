<script lang="ts">
	type Props = {
		children: string;
		containerClass?: string;
		textClass?: string;
		wordClass?: string;
	};

	let {
		children = '',
		containerClass = '',
		textClass = '',
		wordClass = ''
	}: Props = $props();

	const words = $derived(
		children
			.trim()
			.split(/\s+/)
			.filter(Boolean)
	);
</script>

<div class="word-reveal {containerClass}" aria-label={children}>
	<span class="word-reveal-text-wrap {textClass}">
		{#each words as word}
			<span class="word-reveal-word {wordClass}">
				<span class="word-reveal-text">{word}</span>
			</span>{' '}
		{/each}
	</span>
</div>

<style lang="sass">

.word-reveal
	display: block

.word-reveal-text-wrap
	display: block

.word-reveal-word
	display: inline-block
	vertical-align: top

.word-reveal-text
	display: inline-block
	font-size: 2rem
	line-height: 1.5
	@media screen and (max-width: 1024px)
		font-size: 1.5rem

</style>
