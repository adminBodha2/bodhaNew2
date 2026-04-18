<script lang="ts">

	export let bigger = false
	export let fill = 'var(--primary)'

</script>

<svg class:bigger={bigger} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M256-181.912 181.912-256l224-224-224-224L256-778.088l224 224 224-224L778.088-704l-224 224 224 224L704-181.912l-224-224-224 224Z" fill={fill}/></svg>

<style lang="sass">

svg
	transform-origin: center center
	&.bigger
		transform: scale(1.25)

</style>
