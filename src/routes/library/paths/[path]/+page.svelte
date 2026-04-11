<script lang="ts">

	export let data

</script>

<div class="borderbot pbot32">
	<div class="row ycenter cgap8">
		<small class="blue"><a class="blank" href="/library">BODHA OPEN LIBRARY</a></small>
	</div>
	<h3 class="source-serif">{data.title}</h3>
	<p class="grey sm">{data.description}</p>
</div>
<div class="column ptop32 rgap16 pbot64 width80">
	<svelte:component this={data.content}/>
</div>
