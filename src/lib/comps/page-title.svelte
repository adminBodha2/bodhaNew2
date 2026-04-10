<script lang="ts">

  import Arrow from '$lib/icons/arrow-right.svelte'
  export let text = 'Title'

</script>

<div class="row ycenter xleft">
  <Arrow/>
  <h3 class="steady">{text}</h3>
</div>

<style lang="sass">

.row
  margin-left: -8px

</style>