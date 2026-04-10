<script lang="ts">

  import { onMount } from 'svelte'
  import { allSchools, allThinkers } from '$lib/utils/supabaseClient'
  import Container from '$lib/comps/container.svelte'

  let schools:any
  let thinkers:any

  onMount(() => {
    (async() => {
      schools = await allSchools();
      thinkers = await allThinkers();
    })();
  })

</script>

<Container>
  <div class="box100 column ytop special-pad solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue"><a class="blank" href="/inspiration">INSPIRATION</a></small>
    </div>
    <div class="documentation">
      <div class="doc-side column rgap8">
        <div class="inside column rgap8">
          {#if schools && schools.length > 0}
            {#each schools as item}
              <div class="column itembox">
                <small class="italic lgrey tt-u">{item.type}s of thought</small>
                <p class="sm16 bold"><a class="blank linker" href="/inspiration/{item.slug}">{item.name}</a></p>
              </div>
            {/each}
          {/if}
          {#if thinkers && thinkers.length > 0}
            {#each thinkers as item}
              <div class="column itembox">
                <small class="italic lgrey tt-u">{item.type}</small>
                <p class="sm16 bold"><a class="blank linker" href="/inspiration/{item.slug}">{item.name}</a></p>
              </div>
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
      height: 100%
      .inside.column
        height: calc(100vh - 192px)
        overflow-y: scroll
        padding-right: 16px
        position: sticky
        top: 168px
        &::-webkit-scrollbar
          width: 4px
        &::-webkit-scrollbar-track
          background: #FFFFFF
        &::-webkit-scrollbar-thumb
          background: var(--color-alt)
    .doc-main
      padding-top: 32px
      padding-bottom: 32px
      padding-left: 64px
  @media screen and (max-width: 1024px)
    grid-template-columns: 1fr
    grid-template-areas: "main" "side"
    .doc-main
      padding-top: 32px
      border-bottom: 1px solid #e7e7e7
      padding-bottom: 32px
    .doc-side
      padding-top: 32px
      padding-bottom: 32px

</style>