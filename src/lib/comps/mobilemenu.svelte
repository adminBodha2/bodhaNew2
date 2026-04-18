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
  <div class="mm-inner">
    <p class="eyebrow tt-u mm-label">Navigation</p>
    <ul class="mm-list">
      {#each links as link}
      <li>
        <a
          class="mm-link blank"
          class:active={firstSubroute === link.href}
          href={link.href}
          on:click={toggleMenuState}
        >
          {link.label}
        </a>
      </li>
      {/each}
    </ul>
    <div class="mm-footer">
      <a class="mm-footer-link blank" href="/contact" on:click={toggleMenuState}>Contact</a>
      <a class="mm-footer-link blank" href="/path" on:click={toggleMenuState}>Learning Paths</a>
    </div>
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
  border-top: 1px solid rgba(0,0,0,0.06)
  z-index: 1000
  overflow-y: auto

.mm-inner
  display: flex
  flex-direction: column
  padding: 2rem 1.25rem 3rem
  gap: 0

.mm-label
  color: var(--text-ghost)
  margin-bottom: 1.25rem

.mm-list
  list-style: none
  padding: 0
  margin: 0
  display: flex
  flex-direction: column
  gap: 2px

.mm-link
  display: block
  font-size: 1.35rem
  font-weight: 500
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

.mm-footer
  display: flex
  flex-direction: row
  gap: 0.5rem
  padding: 1.5rem 0.75rem 0
  margin-top: 1.5rem
  border-top: 1px solid rgba(0,0,0,0.06)

.mm-footer-link
  font-size: 0.82rem
  font-weight: 600
  letter-spacing: 0.04em
  color: var(--text-ghost)
  padding: 6px 12px
  border: 1px solid rgba(0,0,0,0.08)
  border-radius: 6px
  transition: color 0.12s ease, border-color 0.12s ease
  &:hover
    color: var(--text-sub)
    border-color: rgba(0,0,0,0.14)

</style>
