<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import '$lib/styles/lab.sass';
	import { selectedOpenLibrary } from '$lib/utils/supabaseClient';

	let isCat = Array(8).fill(false);
	let category = '';
	let setCat: any;

	function setCategory(newCat: string) {
		category = newCat;
		(async () => {
			setCat = await selectedOpenLibrary(category);
		})();
	}

	function toggleCat(index: number) {
		isCat[index] = !isCat[index];
		for (let i = 0; i < isCat.length; i++) {
			if (i !== index && isCat[i] === true) {
				isCat[i] = false;
			}
		}
	}

	$: if (page.url.pathname) {
		// reset all category toggles
		isCat = Array(7).fill(false);
	}

	onMount(() => {
		(async () => {
			setCat = await selectedOpenLibrary(category);
		})();
	});
</script>

<div class="stdpad lab-page">
	<div class="lab-shell">
		<aside class="lab-side column">
			<div class="lab-side-inner">
				<nav class="lab-nav column rgap32">
					<div class="row cgap8 rgap8 pbot8" style="flex-wrap: wrap">
						<button
							class="ftnbtn"
							class:active={isCat[0]}
							on:click={() => {
								toggleCat(0);
								setCategory('aryanissue');
							}}>Aryan Issue</button>
						<button
							class="ftnbtn"
							class:active={isCat[1]}
							on:click={() => {
								toggleCat(1);
								setCategory('darshana');
							}}>Darshanas</button>
						<button
							class="ftnbtn"
							class:active={isCat[2]}
							on:click={() => {
								toggleCat(2);
								setCategory('essentials');
							}}>Essentials</button>
						<button
							class="ftnbtn"
							class:active={isCat[3]}
							on:click={() => {
								toggleCat(3);
								setCategory('iks');
							}}>IKS</button>
						<button
							class="ftnbtn"
							class:active={isCat[4]}
							on:click={() => {
								toggleCat(4);
								setCategory('scriptural');
							}}>Scriptural</button>
						<button
							class="ftnbtn"
							class:active={isCat[5]}
							on:click={() => {
								toggleCat(5);
								setCategory('shatrubodha');
							}}>Shatrubodha</button>
						<button
							class="ftnbtn"
							class:active={isCat[6]}
							on:click={() => {
								toggleCat(6);
								setCategory('svayambodha');
							}}>Svayambodha</button>
					</div>
					<div class="one-item column rgap8 bordertop ptop16">
						{#if isCat.some((v) => v) && setCat && setCat.length > 0}
							{#each setCat as item}
								{#if item.type === 'aryanissue'}
									<p class="sm"><a class="blank linker" target="_blank" rel="noreferrer" href={item.link}>{item.name}</a></p>
								{:else}
									<p class="sm"><a class="blank linker" href="/library/{item.slug}">{item.name}</a></p>
								{/if}
							{/each}
						{/if}
					</div>
				</nav>
			</div>
		</aside>
		<main class="lab-main">
			<slot></slot>
		</main>
	</div>
</div>

<style lang="sass">

	.one-item
		padding-right: 1rem

</style>
