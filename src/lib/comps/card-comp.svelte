<script lang="ts">

	export let link = ' '
	export let imageLink = ' '
	export let noLink = false

</script>

{#if noLink}
<div class="column rgap24 card-outer">
	<div class="imagebox">
		<img src={imageLink} alt="click-to-navigate"/>
	</div>
	<div class="textbox column rgap16">
		<slot></slot>
	</div>
</div>
{:else}
<a class="blank column rgap24 card-outer" href={link}>
	<div class="imagebox">
		<img src={imageLink} alt="click-to-navigate"/>
	</div>
	<div class="textbox column rgap16">
		<slot></slot>
	</div>
</a>
{/if}

<style lang="sass">

.card-outer
	&:hover
		img
			transform: scale(1.05)

.textbox
	@media screen and (min-width: 1025px)
		padding: 0 1rem

.imagebox
	overflow: hidden
	border-radius: 8px
	height: 240px
	@media screen and (min-width: 1025px)
		height: 280px

img
	object-fit: cover
	object-position: center center
	height: 100%
	width: 100%
	transition: all 0.25s ease

</style>