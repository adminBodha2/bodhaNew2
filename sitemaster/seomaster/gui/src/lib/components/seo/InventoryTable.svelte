<script lang="ts">
  import RouteFamilyPill from '../RouteFamilyPill.svelte';
  import { getInventoryWithCounts, setFocusedPage, getFocusedPagePath } from '../../stores/audit.svelte';

  let searchTerm = $state('');
  let showOnlyWithIssues = $state(false);

  const inventoryWithCounts = $derived(getInventoryWithCounts());
  const focusedPagePath = $derived(getFocusedPagePath());

  const filtered = $derived.by(() => {
    let list = inventoryWithCounts;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.urlPath.toLowerCase().includes(q) ||
          (p.title || '').toLowerCase().includes(q)
      );
    }

    if (showOnlyWithIssues) {
      list = list.filter((p) => p.issueCount > 0);
    }

    return [...list].sort((a, b) => {
      if (a.issueCount !== b.issueCount) return b.issueCount - a.issueCount;
      return a.urlPath.localeCompare(b.urlPath);
    });
  });
</script>

<div class="inventory">
  <div class="toolbar">
    <input
      type="text"
      placeholder="Search path or title…"
      bind:value={searchTerm}
    />
    <label class="toggle">
      <input type="checkbox" bind:checked={showOnlyWithIssues} />
      Only pages with issues
    </label>
    <span class="count">{filtered.length} / {inventoryWithCounts.length}</span>
  </div>

  <div class="table">
    <div class="header">
      <div class="col path">Path</div>
      <div class="col title">Title</div>
      <div class="col family">Family</div>
      <div class="col issues">Issues</div>
    </div>

    {#if filtered.length === 0}
      <div class="empty">No pages match your search.</div>
    {:else}
      {#each filtered as page (page.urlPath)}
        <div
          class="row"
          class:focused={focusedPagePath === page.urlPath}
          role="button"
          tabindex="0"
          onclick={() => setFocusedPage(page.urlPath)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFocusedPage(page.urlPath);
            }
          }}
        >
          <div class="col path">
            <code>{page.urlPath}</code>
          </div>
          <div class="col title" title={page.title || ''}>
            {page.title || '—'}
          </div>
          <div class="col family">
            <RouteFamilyPill family={page.routeFamily} />
          </div>
          <div class="col issues">
            {#if page.issueCount > 0}
              <span class="issue-badge">{page.issueCount}</span>
            {:else}
              <span class="no-issues">0</span>
            {/if}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .inventory {
    background: #16181f;
    border: 1px solid #252833;
    border-radius: 10px;
    overflow: hidden;
  }
  .toolbar {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px 14px;
    background: #1f2937;
    border-bottom: 1px solid #252833;
  }
  .toolbar input {
    flex: 1;
    max-width: 320px;
    background: #0f1115;
    border: 1px solid #334155;
    color: #e6e8ec;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 13px;
  }
  .toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #94a3b8;
    cursor: pointer;
  }
  .count {
    margin-left: auto;
    font-size: 12px;
    color: #64748b;
  }
  .table {
    max-height: 420px;
    overflow: auto;
  }
  .header {
    display: grid;
    grid-template-columns: 220px 1fr 110px 80px;
    gap: 12px;
    padding: 8px 14px;
    background: #1f2937;
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.5px;
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .row {
    display: grid;
    grid-template-columns: 220px 1fr 110px 80px;
    gap: 12px;
    padding: 8px 14px;
    border-top: 1px solid #252833;
    cursor: pointer;
    font-size: 13px;
    align-items: center;
  }
  .row:hover {
    background: #1e2937;
  }
  .row.focused {
    background: #1e3a5f;
    border-left: 3px solid #3b82f6;
  }
  .col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .path code {
    font-family: ui-monospace, monospace;
    color: #60a5fa;
    font-size: 12px;
  }
  .title {
    color: #e2e8f0;
  }
  .issue-badge {
    background: #f59e0b;
    color: #1f2937;
    font-weight: 600;
    font-size: 12px;
    padding: 1px 8px;
    border-radius: 999px;
  }
  .no-issues {
    color: #475569;
    font-size: 12px;
  }
  .empty {
    padding: 20px;
    color: #64748b;
    font-style: italic;
  }
</style>
