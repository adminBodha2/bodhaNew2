<script lang="ts">
  import { fly } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { toggleMenuState } from '$lib/utils/globalstores'
  import { page } from '$app/stores'

  let firstSubroute = '/'
  $: {
    const parts = $page.url.pathname.split('/').filter(Boolean)
    firstSubroute = parts.length > 0 ? '/' + parts[0] : '/'
  }

  const links = [
    { href: '/research',       label: 'Research' },
    { href: '/big-questions',  label: 'Big Questions' },
    { href: '/academy',        label: 'Academy' },
    { href: '/anveshi',        label: 'Anveshi' },
    { href: '/library',        label: 'Library' },
    { href: '/blog',           label: 'Blog' },
    { href: '/inspiration',    label: 'Inspiration' },
    { href: '/lab',            label: 'Lab' },
    { href: '/team',           label: 'Team' },
  ]
</script>

<nav
  class="mm-wrap"
  transition:fly={{ y: -16, duration: 220, easing: cubicOut }}
  aria-label="Mobile navigation"
>
  <div class="mm-inner box xright ta-r">
    {#each links as link}
    	<a
    	  class="mm-link blank tt-u"
    	  class:active={firstSubroute === link.href}
    	  href={link.href}
    	  on:click={toggleMenuState}
    	>
    	  {link.label}
    	</a>
    {/each}
  </div>
</nav>

<style lang="sass">

.mm-wrap
  position: fixed
  top: 64px
  left: 0
  width: 100vw
  height: calc(100dvh - 64px)
  background: var(--background)
  z-index: 1000
  overflow-y: hidden

.mm-inner
  display: flex
  flex-direction: column
  padding: 1rem
  gap: 0

.mm-link
  display: block
  font-size: 1.5rem
  letter-spacing: -0.01em
  color: var(--text-sub)
  padding: 0.65rem 0.75rem
  border-radius: 8px
  transition: background 0.12s ease, color 0.12s ease
  &:hover
    background: rgba(0,0,0,0.04)
    color: var(--text-main)
  &.active
    color: var(--theme)
    background: rgba(0,0,0,0.03)

</style>
