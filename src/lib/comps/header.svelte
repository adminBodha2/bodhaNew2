<script lang="ts">

  import { page } from '$app/stores'
  import Menu from '$lib/icons/menu.svelte'
  import Close from '$lib/icons/close.svelte'
  import Mobilemenu from '$lib/comps/mobilemenu.svelte'
  import Drop1 from '$lib/comps/menudropdown.svelte'
  import Drop2 from '$lib/comps/menudropdown.svelte'
  import { menuState, toggleMenuState } from '$lib/utils/globalstores'

  let iW:number
  let scro:number
  let firstSubroute = '/'

  $: {
    const parts = $page.url.pathname.split('/').filter(Boolean);
    firstSubroute = parts.length > 0 ? '/' + parts[0] : '/';
  }

</script>

<svelte:window bind:innerWidth={iW} bind:scrollY={scro}/>

<div class="row width100 ycenter xbetween stdpad sans">
  <div class="row ycenter">
    <a class="blank row ycenter logoholder" href="/">
      <img class="rotator" src="/images/rotator.png" alt="rotator" style="transform: rotate({scro/8}deg)"/>
      <img class="rest" src="/images/rest.png" alt="rest"/>
    </a>
  </div>
  {#if iW >= 1025}
  <div class="row ycenter cgap16">
    <Drop1 label="RESEARCH">
      <div class="column">
        <p class="tt-u borderbot pbot8" style="letter-spacing: -0.5px"><a class="blank" href="/research">All Projects</a></p>
        <p class="tt-u borderbot ptop8 pbot8" style="letter-spacing: -0.5px"><a class="blank" href="/big-questions">Big Questions</a></p>
        <p class="tt-u ptop8" style="letter-spacing: -0.5px"><a class="blank" href="/lab">Lab</a></p>
      </div>
    </Drop1>
    <Drop2 label="LEARNING">
      <div class="column">
        <p class="tt-u borderbot pbot8" style="letter-spacing: -0.5px"><a class="blank" href="/academy">Academy</a></p>
        <p class="tt-u borderbot ptop8 pbot8" style="letter-spacing: -0.5px"><a class="blank" href="/inspiration">Inspiration</a></p>
        <p class="tt-u ptop8" style="letter-spacing: -0.5px"><a class="blank" href="/library">Library</a></p>
      </div>
    </Drop2>
    <p class="sm tt-u"><a class="blank" href="/anveshi">Anveshi</a></p>
    <p class="sm tt-u"><a class="blank" href="/blog">Blog</a></p>
    <p class="sm tt-u"><a class="blank" href="/team">Team</a></p>
    <p class="sm tt-u bold"><a class="blank" href="/search">Search</a></p>
  </div>
  {:else}
    <div class="row ycenter cgap16">
      <button class="blank" on:click={toggleMenuState}>
        {#if $menuState === true}
          <Close/>
        {:else}
          <Menu/>
        {/if}
      </button>
    </div>
  {/if}
</div>
{#if $menuState === true}
<Mobilemenu/>
{/if}

<style lang="sass">

.logoholder
  @media screen and (min-width: 1025px)
    img.rotator
      height: 48px
      width: 48px
    img.rest
      height: 33px
      width: 100%
      margin-left: -40.5px
  @media screen and (max-width: 1024px)
    img.rotator
      height: 40px
      width: 40px
    img.rest
      height: 27.5px
      width: 100%
      margin-left: -34px

p
  font-weight: 500
  letter-spacing: -0.5px
  a.blank
    &:hover
      color: var(--color-alt)
  &.bold
    font-weight: 700

</style>