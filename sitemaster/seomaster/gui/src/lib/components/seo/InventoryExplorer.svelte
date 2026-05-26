<script lang="ts">
  import InventoryTable from './InventoryTable.svelte';
</script>

<div class="explorer">
  <div class="header">
    <h3>Inventory</h3>
    <div class="hint">Click any row to focus it (filters issues to that page)</div>
  </div>
  <InventoryTable />
</div>

<style>
  .explorer {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .header {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  .header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #e6e8ec;
  }
  .hint {
    font-size: 12px;
    color: #64748b;
  }
</style>
