<script lang="ts">

  import { onMount } from 'svelte'
  import { page } from '$app/stores';
  import { selectedOpenLibrary } from '$lib/utils/supabaseClient'
  import Container from '$lib/comps/container.svelte'

  let isCat = Array(8).fill(false)
	let category = '';
	let setCat: any;

	function setCategory(newCat: string) {
		category = newCat;
		(async () => {
			setCat = await selectedOpenLibrary(category);
		})();
	}

  function toggleCat(index:number){
		isCat[index] = !isCat[index];
		for (let i = 0; i < isCat.length; i++) {
			if (i !== index && isCat[i] === true) {
				isCat[i] = false;
			}
		}
  }

	$: if ($page.url.pathname) {
		// reset all category toggles
		isCat = Array(7).fill(false);
	}

  onMount(() => {
    (async() => {
      setCat = await selectedOpenLibrary(category)
    })();
  })

</script>

<Container>
  <div class="box100 column ytop solo special-pad">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue"><a class="blank" href="/library">LIBRARY</a></small>
    </div>
    <div class="documentation">
      <div class="doc-side column rgap16">
        <div class="row cgap8 rgap8 pbot8" style="flex-wrap: wrap">
          <button class="buttonheading" class:selected={isCat[0]} on:click={() => {toggleCat(0); setCategory('aryanissue')}}>Aryan Issue</button>
          <button class="buttonheading" class:selected={isCat[1]} on:click={() => {toggleCat(1); setCategory('darshana')}}>Darshanas</button>
          <button class="buttonheading" class:selected={isCat[2]} on:click={() => {toggleCat(2); setCategory('essentials')}}>Essentials</button>
          <button class="buttonheading" class:selected={isCat[3]} on:click={() => {toggleCat(3); setCategory('iks')}}>IKS</button>
          <button class="buttonheading" class:selected={isCat[4]} on:click={() => {toggleCat(4); setCategory('scriptural')}}>Scriptural</button>
          <button class="buttonheading" class:selected={isCat[5]} on:click={() => {toggleCat(5); setCategory('shatrubodha')}}>Shatrubodha</button>
          <button class="buttonheading" class:selected={isCat[6]} on:click={() => {toggleCat(6); setCategory('svayambodha')}}>Svayambodha</button>
          <button class="buttonheading" class:selected={isCat[7]} on:click={() => {toggleCat(7); setCategory('general')}}>General</button>
        </div>
        <div class="one-item column rgap8 bordertop ptop16">
          {#if isCat.some(v => v) && setCat && setCat.length > 0}
            {#each setCat as item}
              {#if item.type === 'aryanissue'}
                <p class="sm16"><a class="blank linker" target="_blank" rel="noreferrer" href={item.link}>{item.name}</a></p>
              {:else}
                <p class="sm16"><a class="blank linker" href="/library/{item.slug}">{item.name}</a></p>
              {/if}
            {/each}
          {/if}
        </div>
      </div>
      <div class="doc-main column">
        <slot></slot>
      </div>
    </div>
  </div>
</Container>

<style lang="sass">

.special-pad
  @media screen and (min-width: 1025px)
    padding-top: 104px
  @media screen and (max-width: 1024px)
    padding-top: 88px

.documentation
  display: grid
  .doc-side
    grid-area: side
  .doc-main
    grid-area: main
  @media screen and (min-width: 1025px)
    grid-template-columns: 360px 1fr
    grid-template-areas: "side main"
    min-height: calc(100vh - 192px)
    .doc-side
      border-right: 1px solid #e7e7e7
      padding-top: 32px
      padding-bottom: 16px
      padding-right: 32px
      height: calc(100vh - 192px)
      overflow-y: scroll
    .doc-main
      padding-top: 32px
      padding-bottom: 32px
      padding-left: 64px
  @media screen and (max-width: 1024px)
    grid-template-columns: 1fr
    grid-template-areas: "side" "main"
    .doc-main

      border-bottom: 1px solid #e7e7e7
      padding-bottom: 32px
    .doc-side
      padding-top: 32px
      padding-bottom: 32px

</style>