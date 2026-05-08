<script lang="ts">

	export let color="var(--color-primary)"
	export let size=28
	export let inDropdown = false

</script>

<svg class:inDropdown={inDropdown} viewBox="0 0 24 24" width={size} height={size} fill={color} stroke={color} xmlns="http://www.w3.org/2000/svg"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"/></svg>