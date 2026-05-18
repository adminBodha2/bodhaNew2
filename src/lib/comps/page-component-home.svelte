<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import type { Snippet } from 'svelte';

	let {
		section1,
		section2,
		section3,
		section4,
		section5,
		section6
	}: {
		section1?: Snippet;
		section2?: Snippet;
		section3?: Snippet;
		section4?: Snippet;
		section5?: Snippet;
		section6?: Snippet;
	} = $props();
</script>

<Container>
	<section class="wrapper-std">
		{@render section1?.()}
	</section>
	<section class="wrapper-std growingline">
		{@render section2?.()}
	</section>
	<section class="wrapper-std growingline alternate">
		{@render section3?.()}
	</section>
	<section class="wrapper-std growingline">
		{@render section4?.()}
	</section>
	<section class="wrapper-std growingline alternate">
		{@render section5?.()}
	</section>
	<section class="wrapper-std growingline">
		{@render section6?.()}
	</section>
</Container>
