<script lang="ts">

  import { onMount } from 'svelte'
  import '$lib/styles/lab.sass';
  import { allSchools, allThinkers } from '$lib/utils/localpulls'

  let schools:any
  let thinkers:any

  onMount(() => {
    (async() => {
      schools = await allSchools();
      thinkers = await allThinkers();
    })();
  })

</script>

<div class="stdpad lab-page">
	<div class="lab-shell">
		<aside class="lab-side column">
			<div class="lab-side-inner">
				<nav class="lab-nav column rgap32">
					{#if schools && schools.length > 0}
						<div class="column rgap16">
							<small class="blue">schools of thought</small>
							<div class="column rgap8">
								{#each schools as item}
								<p class="sm"><a class="blank linker" href={item.linkpath}>{item.meta.title}</a></p>
							{/each}
							</div>
						</div>
				  {/if}
				  {#if thinkers && thinkers.length > 0}
						<div class="column rgap16 bordertop ptop32">
							<small class="blue">thinkers</small>
							<div class="column rgap8">
								{#each thinkers as item}
								<p class="sm"><a class="blank linker" href={item.linkpath}>{item.meta.title}</a></p>
							  {/each}
							</div>
						</div>
				  {/if}
				</nav>
			</div>
		</aside>
		<main class="lab-main">
			<slot></slot>
		</main>
	</div>
</div>
