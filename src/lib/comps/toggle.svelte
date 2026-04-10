<script lang="ts">

  export let isToggled = false

</script>

<div class="togglebox row small" class:toggled={isToggled}>
  <div class="togglecircle"></div>
</div>

<style lang="sass">

.togglebox
  position: relative
  width: 40px
  height: 20px
  border-radius: 2px
  background: #474747
  border: 2px solid #474747
  align-items: center
  padding-left: 2px
  padding-right: 6px
  justify-content: space-between
  transition: all 0.12s cubic-bezier(0.455, 0.890, 0.260, 0.965)
  .togglecircle
    width: 13px
    height: 13px
    border-radius: 0px
    background: #FFFFFF
    transition: background 0.12s cubic-bezier(0.455, 0.890, 0.260, 0.965), transform 0.12s cubic-bezier(0.455, 0.890, 0.260, 0.965)
  &:hover
    background: var(--color-main)
    border: 2px solid var(--color-main)

.togglebox.toggled
  background: #FFFFFF
  padding-left: 6px
  padding-right: 2px
  border: 2px solid #a1a1a1
  .togglecircle
    background: #171717
    transform: translateX(16px)
  &:hover
    border: 2px solid var(--color-main)
    .togglecircle
      background: var(--color-main)

</style>