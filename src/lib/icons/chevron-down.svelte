<script lang="ts">

  export let size = 32
  export let fill = 'var(--blue-main)'
  export let rotated = false

</script>

<svg class:rotated={rotated} viewBox="0 0 24 24" height={size} width={size} fill={fill} xmlns="http://www.w3.org/2000/svg"><path d="M12 14L8 10H16L12 14Z"/></svg>

<style lang="sass">

svg.rotated
  transform: rotate(180deg)

</style>