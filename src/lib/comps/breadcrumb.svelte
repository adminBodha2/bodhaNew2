<script lang="ts">

	export let item1 = ' '
	export let item1Link = ' '
	export let show2 = false
	export let item2 = ' '

</script>

<div class="row ycenter xleft cgap8 rgap8 pbot16">
	<small class="blue"><a class="blank" href={item1Link}>{item1}</a></small>
	{#if show2}
		<small class="lgrey">></small>
		<small class="tt-u lgrey">{item2}</small>
	{/if}
</div>