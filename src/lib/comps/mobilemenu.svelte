<script lang="ts">

  import { slide } from 'svelte/transition'
  import { toggleMenuState } from '$lib/utils/globalstores'

</script>

<button class="blank column mobilemenu xright" on:click={toggleMenuState} transition:slide={{ axis: 'y' }}>
  <p class="tt-u sans"><a class="blank" href="/research">Research</a></p>
  <p class="tt-u sans"><a class="blank" href="/big-questions">Big Questions</a></p>
  <p class="tt-u sans"><a class="blank" href="/anveshi">Anveshi</a></p>
  <p class="tt-u sans"><a class="blank" href="/academy">Academy</a></p>
  <p class="tt-u sans"><a class="blank" href="/inspiration">Inspiration</a></p>
  <p class="tt-u sans"><a class="blank" href="/blog">Blog</a></p>
  <p class="tt-u sans"><a class="blank" href="/library">Library</a></p>
  <p class="tt-u sans"><a class="blank" href="/lab">Lab</a></p>
  <p class="tt-u sans"><a class="blank" href="/team">Team</a></p>
  <p class="tt-u sans"><a class="blank" href="/search">Search</a></p>
</button>

<style lang="sass">

.mobilemenu
  width: 100vw
  height: calc(100vh - 64px)
  background: #FFFFFF
  position: fixed
  top: 64px
  left: 0
  z-index: 1000
  padding: 32px 16px
  align-items: flex-end
  justify-content: flex-start
  row-gap: 20px
  p
    font-size: 32px
    color: var(--color-main)

</style>