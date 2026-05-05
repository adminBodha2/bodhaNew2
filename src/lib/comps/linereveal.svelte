<script lang="ts">
	type Props = {
		children: string;
		containerClass?: string;
		textClass?: string;
		lineClass?: string;
	};

	let {
		children = '',
		containerClass = '',
		textClass = '',
		lineClass = ''
	}: Props = $props();
</script>

<div class="line-reveal {containerClass}">
	<span class="line-reveal-visual {textClass}" aria-label={children}>
		<span class="line-reveal-line {lineClass}">
			<span class="line-reveal-text">{children}</span>
		</span>
	</span>
</div>

<style lang="sass">

.line-reveal
	display: block

.line-reveal-visual
	display: block

.line-reveal-line
	display: block

.line-reveal-text
	display: inline-block

</style>
