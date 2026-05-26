<script lang="ts">
  let { category }: { category: string } = $props();
</script>

<span class="pill">{category}</span>

<style>
  .pill {
    font-size: 11px;
    padding: 1px 7px;
    border-radius: 999px;
    background: #1f2937;
    color: #9ca3af;
    border: 1px solid #374151;
  }
</style>
