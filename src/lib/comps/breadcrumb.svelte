<script lang="ts">

	export let item1 = ' '
	export let item1Link = ' '
	export let show2 = false
	export let item2 = ' '
	export let showT = false
	export let title = ' '
	export let rgap = 0
	export let showRow = false
	export let showD = false
	export let desc = ' '

</script>

<div class="column rgap{rgap}" class:borderbot={showT} class:pbot32={showT}>
<div class="row ycenter xleft cgap8 rgap8 forcrumb">
	<p class="citation-big lgrey tt-u"><a class="blank linkonhover" href={item1Link}>{item1}</a></p>
	{#if show2}
		<p class="citation-big lgrey">></p>
		<p class="citation-big tt-u lgrey">{item2}</p>
	{/if}
</div>
<div class="box textbox">
{#if showT}
<h1 class="page-title source-serif tt-c">{title}</h1>
{/if}
{#if showD}
<p class="small-text grey width60">{desc}</p>
{/if}
</div>
{#if showRow}
	<slot></slot>
{/if}
</div>

<style lang="sass">

.textbox
	h1
		@media screen and (min-width: 1025px)
			width: 95%

</style>