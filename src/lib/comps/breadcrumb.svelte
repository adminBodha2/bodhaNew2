<script lang="ts">
	export let item1 = ' ';
	export let item1Link = ' ';
	export let show2 = false;
	export let item2 = ' ';
	export let item2linked = false;
	export let item2Link = ' ';
	export let showT = false;
	export let title = ' ';
	export let rgap = 0;
	export let showRow = false;
	export let showD = false;
	export let desc = ' ';
	export let centered = false
</script>

<div class="box labelbox mleft null{rgap}" class:xcenter={centered} class:borderbot={showT} class:pbot32={showT}>
	<div class="row ycenter xleft cgap8 rgap8 forcrumb">
		<p class="tag-text w500 lgrey tt-u"><a class="blank linkonhover" href={item1Link}>← {item1}</a></p>
		{#if show2 || item2linked}
			<p class="tag-text w500 lgrey">></p>
			{#if item2linked}
				<p class="tag-text w500 lgrey tt-u"><a class="blank linkonhover" href={item2Link}>{item2}</a></p>
			{:else}
				<p class="tag-text w500 tt-u lgrey">{item2}</p>
			{/if}
		{/if}
	</div>
	<div class="labelbox pbot8">
		{#if showT}
			<h1 class="page-title source-serif tt-c">{title}</h1>
		{/if}
		{#if showD}
			<p class="small-text grey width50">{desc}</p>
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
