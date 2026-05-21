<script lang="ts">
	import { onMount } from 'svelte';
import sections from '$lib/serving/bharata1000-sections.json'
	import { bharata1000 } from '$lib/utils/supabaseClient';

	let selectedSection = $state('');
	let bharatabooks = $state<any>(null);
	function toggleSection(newitem: string) {
		selectedSection = newitem;
		(async () => {
			bharatabooks = await bharata1000(selectedSection);
		})();
	}
	onMount(async () => {
		bharatabooks = await bharata1000(selectedSection);
	});
</script>

		<p class="w600 theme">Select any section below to view books:</p>
		<div class="row cgap8 rgap8 wrap">
			{#each sections as item, i}
				<button class="filter-button" onclick={() => toggleSection(item.section)} class:active={item.section === selectedSection}>{item.section}</button>
			{/each}
			{#if selectedSection !== ''}
				<button class="filter-button" onclick={() => toggleSection('')} class:active={selectedSection === ''}>Close</button>
			{/if}
		</div>
		{#if bharatabooks}
			<div class="grid grid-cols-2 lg:grid-cols-4 gap8 lg:gap16">
				{#each bharatabooks as item}
					<div class="box p24 b-main radius">
						<p class="txt-xl w600 a-hover pbot8">{item.title}</p>
						<p class="grey2 lh14">{item.description}</p>
						{#if item.author && item.author !== ''}
							<p class="txt-xs tt-u w500 theme ptop8 self-bottom">{item.author}</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}