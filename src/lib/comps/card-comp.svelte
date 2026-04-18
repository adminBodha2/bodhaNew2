<script lang="ts">

	export let link = ' '
	export let imageLink = ' '
	export let noLink = false
	export let boxType = 'box'

</script>

{#if noLink}
<div class="card-outer {boxType} nuevocard">
	<div class="imagebox">
		<img src={imageLink} alt="click-to-navigate"/>
	</div>
	<div class="box textbox">
		<slot></slot>
	</div>
</div>
{:else}
<a class="blank card-outer box-as-link {boxType} nuevocard" href={link}>
	<div class="imagebox">
		<img src={imageLink} alt="click-to-navigate"/>
	</div>
	<div class="box textbox">
		<slot></slot>
	</div>
</a>
{/if}
