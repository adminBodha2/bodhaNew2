<svelte:options runes={true} />

<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import CraftingPanel from '$lib/comps/crafting-panel.svelte';
	import { forgeStore } from '$lib/utils/forge-store.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		forgeStore.load();
	});
</script>

<Container>
	<section class="wrapper-std">
		<Crumb
			isSolo={true}
			showT={true}
			title="Dhatu Forge"
			showD={true}
			desc="Join dhatus, build a civilization. An experimental game to accompany our course - Dhatus as Civilizational Theory."
			showRow={true}
		>
			<div class="row gap16">
				<a class="primary" href="/academy/dhatus-as-civilizational-code"><span>APPLY TO COURSE</span></a>
				<a href="/designbodha/dhatu-forge/world" class="primary">
					<span>ENTER THE WORLD</span>
				</a>
				<a href="/designbodha/dhatu-forge/levels" class="primary">
					<span>PLAY SESSIONS</span>
				</a>
			</div>
		</Crumb>
		<CraftingPanel forgeConfig={data.forgeConfig} />
	</section>
</Container>

<style lang="sass">
	.wrapper-std
		display: flex
		flex-direction: column
		gap: 1.5rem
</style>
