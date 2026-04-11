<script lang="ts">

  import ChevronDown from '$lib/icons/chevron-down.svelte'
  export let label = 'Menu'
  export let chevronSize = 32
  let hovered = false

</script>

<div class="dropdown" role="navigation" on:mouseenter={() => (hovered = true)} on:mouseleave={() => (hovered = false)}>
  <div class="trigger row ycenter">
    <p class="sm tt-u" style="font-weight: 500" class:active={hovered}>{label}</p>
    <span class="chevron" class:rotated={hovered}>
      <ChevronDown size={chevronSize}/>
    </span>
  </div>

  <div class="menu" class:open={hovered}>
    <slot />
  </div>
</div>

<script context="module" lang="ts">
</script>

<style lang="sass">

.dropdown
  position: relative
  display: inline-block
  z-index: 1999

.trigger
  cursor: pointer
  user-select: none
  p
    margin: 0
    color: inherit
    transition: color 0.2s ease
    letter-spacing: -0.5px
    &.active
      color: var(--color-alt)

.chevron
  display: flex
  align-items: center
  transition: transform 0.2s ease
  &.rotated
    transform: rotate(180deg)

.menu
  position: absolute
  top: 100%
  left: 0
  background: white
  overflow: hidden
  display: grid
  row-gap: 1rem
  z-index: 1000
  grid-template-rows: 0fr
  transition: grid-template-rows 0.2s ease
  min-width: 400px
  border-radius: 4px
  &.open
    grid-template-rows: 1fr
    border: 1px solid var(--color-border)
    padding: 2rem

.menu :global(> *)
  overflow: hidden

</style>