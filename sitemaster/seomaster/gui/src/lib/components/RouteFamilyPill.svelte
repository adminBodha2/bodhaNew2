<script lang="ts">
  let { family }: { family: string } = $props();
</script>

<span class="family-pill">{family}</span>

<style>
  .family-pill {
    font-size: 10px;
    padding: 1px 6px;
    border-radius: 4px;
    background: #0f172a;
    color: #64748b;
    border: 1px solid #334155;
    font-family: ui-monospace, monospace;
  }
</style>
