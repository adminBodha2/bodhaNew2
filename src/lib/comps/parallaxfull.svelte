<script lang="ts">

  let scroY:number
  export let imageLink:string = ''

</script>

<svelte:window bind:scrollY={scroY}/>

<div class="imager">
  <img src={imageLink} alt="parallax header" style="transform: translateY({scroY/1.8}px)"/>
</div>

<style lang="sass">

.imager
  overflow: hidden
  @media screen and (min-width: 1025px)
    height: 100vh
    img
      object-fit: cover
      object-position: center center
      height: 100%
      width: 100%
  @media screen and (max-width: 1024px)
    height: 320px
    margin-top: 64px
    img
      object-fit: cover
      object-position: center center
      width: 100%
      height: 100%

</style>