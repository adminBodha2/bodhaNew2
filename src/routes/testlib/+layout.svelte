<script lang="ts">

  import { onMount } from 'svelte'
  import { page } from '$app/stores';
  import { selectedOpenLibrary } from '$lib/utils/supabaseClient'
  import '$lib/styles/lab.sass'

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

<div class="doc-page stdpad">
  <aside class="doc-sidebar">
    <div class="accordion-wrapper">
      <p class="lab-landing-eyebrow"><a class="blank linked" href="/testlib">LIBRARY</a> > CATEGORIES</p>
      <div class="accordion-head blank row wrap cgap8 rgap8 pbot32">
        <button class="accordion-header blank" class:selected={isCat[0]} on:click={() => {toggleCat(0); setCategory('essentials')}}>
          Essentials
        </button>
        <button class="accordion-header blank" class:selected={isCat[1]} on:click={() => {toggleCat(1); setCategory('general')}}>
          General
        </button>
        <button class="accordion-header blank" class:selected={isCat[2]} on:click={() => {toggleCat(2); setCategory('iks')}}>
          IKS
        </button>
        <button class="accordion-header blank" class:selected={isCat[3]} on:click={() => {toggleCat(3); setCategory('scriptural')}}>
          Scriptural
        </button>
        <button class="accordion-header blank" class:selected={isCat[4]} on:click={() => {toggleCat(4); setCategory('darshana')}}>
          Darshanas
        </button>
        <button class="accordion-header blank" class:selected={isCat[5]} on:click={() => {toggleCat(5); setCategory('svayambodha')}}>
          Svayambodha
        </button>
        <button class="accordion-header blank" class:selected={isCat[6]} on:click={() => {toggleCat(6); setCategory('shatrubodha')}}>
          Shatrubodha
        </button>
        <button class="accordion-header blank" class:selected={isCat[7]} on:click={() => {toggleCat(7); setCategory('aryanissue')}}>
          Aryan Issue
        </button>
      </div>
      <div class="accordion-item bordertop column rgap12 ptop16">
        {#if isCat.some(v => v) && setCat && setCat.length > 0}
          {#each setCat as item}
            {#if item.type === 'aryanissue'}
              <div class="column book-box">
                <span class="lab-nav-title tight"><a class="blank linker" target="_blank" rel="noreferrer" href={item.link}>{item.name}</a></span>
                <small class="grey">{item.author}</small>
              </div>
            {:else}
              <div class="column book-box">
                <span class="lab-nav-title tight"><a class="blank linker" href="/library/{item.slug}">{item.name}</a></span>
                <small class="grey">{item.author}</small>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </aside>
  <main class="doc-main">
    <slot></slot>
  </main>
</div>

<style lang="sass">

.book-box
  border-bottom: 1px solid var(--grey-sm)
  padding-bottom: 12px
  &:last-child
    border-bottom: none
    padding-bottom: 0

.accordion-wrapper
  button
    background: var(--themealt)
    color: white
    font-family: 'Google Sans Flex', sans-serif
    font-size: 12px
    text-transform: uppercase
    padding: 6px 12px
    border-radius: 3px
    &:hover
      background: var(--theme)

.doc-page
  display: grid
  width: 100%
  min-height: 100vh
  @media screen and (min-width: 1025px)
    grid-template-columns: 320px 1fr
    grid-template-areas: "sidebar main"
    padding-top: 64px
  @media screen and (max-width: 1024px)
    grid-template-columns: 1fr
    grid-template-areas: "main" "sidebar"

.doc-sidebar
  grid-area: sidebar
  display: flex
  flex-direction: column
  @media screen and (min-width: 1025px)
    position: sticky
    top: 64px
    height: calc(100vh - 64px)
    padding: 64px 32px 32px 0
    border-right: 1px solid var(--grey-sm)
    overflow-y: scroll

.doc-main
  @media screen and (min-width: 1025px)
    padding-top: 64px
    padding-left: 64px
    padding-bottom: 64px

</style>