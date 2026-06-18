<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.title} - Select Session</title>
</svelte:head>

<Container>
	<section class="wrapper-std">
		<Crumb isSolo={true} showT={true} title={data.title} showD={true} desc={data.subtitle} showRow={false} />

		<h2 class="txt-xl w600">Select a Session</h2>

		<div class="box rgap16">
			{#each data.levels as level}
				<a
					href="/designbodha/dhatu-forge/levels/{level.id}"
					class="glass-1 session-card radius8"
				>
					<p class="txt-xs tt-u grey1 ls003p session-number">Session {level.id}</p>
					<h3 class="txt-lg w500 mtop4">{level.title}</h3>
					<p class="txt-bs grey2 lh14 mtop8">{level.session.text}</p>
				</a>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.session-card
	display: block
	text-decoration: none
	color: var(--color-primary)
	padding: 1.25rem 1.5rem
	transition: transform 0.15s var(--es-back), border-color 0.15s

	&:hover
		transform: translateY(-2px)
		border-color: var(--color-theme)

.session-number
	margin-bottom: 0

</style>
