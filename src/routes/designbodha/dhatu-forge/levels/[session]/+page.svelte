<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';

	let { data }: PageProps = $props();

	function formatKey(key: string): string {
		return key
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (s) => s.toUpperCase());
	}
</script>

<svelte:head>
	<title>Session {data.level.id} - {data.title}</title>
</svelte:head>

<Container>
	<section class="wrapper-std">
		<Crumb
			isSolo={true}
			showT={true}
			title="Session {data.level.id}: {data.level.session.title}"
			showD={true}
			desc={data.level.session.text}
			showRow={true}
		>
			<a class="primary" href="/designbodha/dhatu-forge/levels">
				<span>← All Sessions</span>
			</a>
		</Crumb>

		<!-- New Mechanics -->
		<section>
			<h2 class="txt-xl w600 mbot16">New Mechanics</h2>
			<div class="grid grid-cols-1 lg:grid-cols-2 cgap16 rgap16">
				{#each Object.entries(data.level.newMechanics) as [key, desc]}
					<div class="glass-3 p16">
						<h3 class="txt-sm w600 tt-u theme ls003p mbot8">{formatKey(key)}</h3>
						<p class="txt-bs grey2 lh15">{desc}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Unlocked Dhātus -->
		{#if data.dhatuDefinitions.length > 0}
			<section class="mtop48">
				<h2 class="txt-xl w600 mbot16">Unlocked Dhātus</h2>
				<div class="grid grid-cols-2 lg:grid-cols-3 cgap12 rgap12">
					{#each data.dhatuDefinitions as dhatu}
						<div class="stonecard radius8 p16 box xcenter ta-c">
							<p class="txt-lg w600 theme mbot4">{dhatu.root}</p>
							<p class="txt-sm grey1">{dhatu.meaning}</p>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Prefix Rules -->
		<section class="mtop48">
			<h2 class="txt-xl w600 mbot16">Prefix Rules</h2>
			<div class="glass-1 p24 radius8 box rgap8">
				<p class="txt-bs"><span class="w600 theme">Allowed:</span> {data.level.prefixRules.allowed.join(', ')}</p>
				{#if data.level.prefixRules.required.length > 0}
					<p class="txt-bs"><span class="w600 theme">Required:</span> {data.level.prefixRules.required.join(', ')}</p>
				{/if}
			</div>
		</section>

		<!-- Special Rules -->
		{#if Object.keys(data.level.specialRules).length > 0}
			<section class="mtop32">
				<h2 class="txt-xl w600 mbot16">Special Rules</h2>
				<div class="glass-1 p24 radius8 box rgap8">
					{#each Object.entries(data.level.specialRules) as [key, rule]}
						<p class="txt-bs"><span class="w600 theme">{formatKey(key)}:</span> {rule}</p>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Session Excerpts -->
		{#if data.excerpt}
			<section class="mtop48">
				<h2 class="txt-xl w600 mbot16">Session Excerpts</h2>
				<div class="box rgap12">
					{#each data.excerpt.excerpts as excerpt, i}
						<blockquote class="glass-1 p16 pleft24 radius4" class:mbot0={i === data.excerpt.excerpts.length - 1}>
							<p class="txt-bs lh15 grey1 italic source-serif">{excerpt}</p>
						</blockquote>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Actions -->
		<section class="mtop48 ta-c">
			<a href="/designbodha/dhatu-forge" class="primary desb">
				<span>Go to Forge to Craft</span>
			</a>
		</section>
	</section>
</Container>

<style lang="sass">

blockquote
	border-left: 3px solid var(--color-theme)

</style>
