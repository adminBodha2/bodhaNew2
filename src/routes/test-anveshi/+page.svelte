<script lang="ts">

	import Container from '$lib/comps/wrapper.svelte';

</script>

<Container>
	<section class="wrapper-std header-margin">
		<div class="grid grid-cols-4 gap16">
			<div class="box p64 b-main i1">1</div>
			<div class="box p64 b-main i2">2</div>
			<div class="box p64 b-main i3">3</div>
			<div class="box p64 b-main i4">4</div>
			<div class="box p64 b-main i5">5</div>
			<div class="box p64 b-main i6">6</div>
			<div class="box p64 b-main i7">7</div>
			<div class="box p64 b-main i8">8</div>
		</div>
	</section>
</Container>

<style lang="sass">

.i1
	background: var(--color-stone-0)

.i2
	background: var(--color-stone-1)

.i3
	background: var(--color-stone-2)

.i4
	background: var(--color-stone-3)

.i5
	background: var(--save1)

.i6
	background: var(--save2)

.i7
	background: var(--save3)

</style>