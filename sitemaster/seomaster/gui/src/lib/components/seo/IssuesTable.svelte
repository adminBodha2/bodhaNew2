<script lang="ts">
  import SeverityBadge from '../SeverityBadge.svelte';
  import CategoryPill from '../CategoryPill.svelte';
  import { getVisibleIssues, setFocusedPage } from '../../stores/audit.svelte';

  const visibleIssues = $derived(getVisibleIssues());
</script>

<div class="issues-table">
  {#if visibleIssues.length === 0}
    <div class="empty">No issues match the current filters.</div>
  {:else}
    <div class="header">
      <div class="col sev">Severity</div>
      <div class="col cat">Category</div>
      <div class="col path">Path</div>
      <div class="col finding">Finding</div>
    </div>

    {#each visibleIssues as issue (issue.id)}
      <div
        class="row"
        role="button"
        tabindex="0"
        onclick={() => setFocusedPage(issue.urlPath)}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFocusedPage(issue.urlPath);
          }
        }}
      >
        <div class="col sev">
          <SeverityBadge severity={issue.severity as any} />
        </div>
        <div class="col cat">
          <CategoryPill category={issue.category} />
        </div>
        <div class="col path">
          <code>{issue.urlPath}</code>
        </div>
        <div class="col finding" title={issue.finding}>
          {issue.finding}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .issues-table {
    background: #16181f;
    border: 1px solid #252833;
    border-radius: 10px;
    overflow: hidden;
  }
  .header {
    display: grid;
    grid-template-columns: 90px 110px 240px 1fr;
    gap: 12px;
    padding: 8px 14px;
    background: #1f2937;
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.5px;
  }
  .row {
    display: grid;
    grid-template-columns: 90px 110px 240px 1fr;
    gap: 12px;
    padding: 10px 14px;
    border-top: 1px solid #252833;
    cursor: pointer;
    font-size: 13px;
  }
  .row:hover {
    background: #1e2937;
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
  .finding {
    color: #cbd5e1;
  }
  .empty {
    padding: 24px;
    color: #64748b;
    font-style: italic;
  }
</style>
