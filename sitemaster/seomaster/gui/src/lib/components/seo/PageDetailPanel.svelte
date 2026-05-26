<script lang="ts">
  import SeverityBadge from '../SeverityBadge.svelte';
  import {
    getFocusedPage,
    getFocusedPagePath,
    getIssuesForFocusedPage,
    clearFocusedPage
  } from '../../stores/audit.svelte';

  const focusedPage = $derived(getFocusedPage());
  const focusedIssues = $derived(getIssuesForFocusedPage());
  const path = $derived(getFocusedPagePath());
</script>

{#if path && focusedPage}
  <div class="detail-panel">
    <div class="panel-header">
      <div class="title">
        <span class="label">Page Detail</span>
        <code class="path">{path}</code>
      </div>
      <button class="close" onclick={clearFocusedPage} aria-label="Clear focus">×</button>
    </div>

    <div class="meta-grid">
      <div class="meta-item">
        <span class="meta-label">Title</span>
        <span class="meta-value">{focusedPage.title || '—'}</span>
      </div>

      <div class="meta-item">
        <span class="meta-label">Route Family</span>
        <span class="meta-value">{focusedPage.routeFamily}</span>
      </div>

      <div class="meta-item full">
        <span class="meta-label">Description</span>
        <span class="meta-value description">{focusedPage.description || '—'}</span>
      </div>

      <div class="meta-item">
        <span class="meta-label">Sources</span>
        <span class="meta-value sources">
          {#each focusedPage.sources || [] as src}
            <span class="source-tag">{src}</span>
          {/each}
        </span>
      </div>

      <div class="meta-item">
        <span class="meta-label">Headings</span>
        <span class="meta-value">{(focusedPage.headings || []).length}</span>
      </div>

      <div class="meta-item">
        <span class="meta-label">Issues for this page</span>
        <span class="meta-value issue-count">{focusedIssues.length}</span>
      </div>

      {#if focusedPage.hasHeadComponent}
        <div class="meta-item">
          <span class="meta-label">Head Component</span>
          <span class="meta-value good">Yes</span>
        </div>
      {/if}
    </div>

    {#if focusedIssues.length > 0}
      <div class="issues-section">
        <div class="section-label">Issues for this page</div>
        <div class="issues-list">
          {#each focusedIssues as issue}
            <div class="issue-row">
              <SeverityBadge severity={issue.severity as any} />
              <span class="issue-finding">{issue.finding}</span>
              <span class="issue-reco" title={issue.recommendation}>
                {issue.recommendation}
              </span>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="no-issues">No issues recorded for this page in the current audit.</div>
    {/if}
  </div>
{/if}

<style>
  .detail-panel {
    background: #16181f;
    border: 1px solid #252833;
    border-radius: 12px;
    padding: 16px 20px;
    margin-top: 20px;
  }
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }
  .title {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  .label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748b;
  }
  .path {
    font-family: ui-monospace, monospace;
    color: #60a5fa;
    font-size: 14px;
  }
  .close {
    background: none;
    border: none;
    color: #64748b;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    padding: 0 4px;
  }
  .close:hover {
    color: #e6e8ec;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px 20px;
  }
  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .meta-item.full {
    grid-column: 1 / -1;
  }
  .meta-label {
    font-size: 10px;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.5px;
  }
  .meta-value {
    font-size: 13px;
    color: #e2e8f0;
    line-height: 1.3;
  }
  .meta-value.description {
    color: #cbd5e1;
  }
  .meta-value.good {
    color: #4ade80;
  }
  .meta-value.sources {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .source-tag {
    font-size: 11px;
    background: #1e2937;
    padding: 1px 6px;
    border-radius: 4px;
    color: #94a3b8;
  }
  .issue-count {
    font-weight: 600;
    color: #f59e0b;
  }

  .issues-section {
    margin-top: 16px;
    border-top: 1px solid #252833;
    padding-top: 12px;
  }
  .section-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }
  .issues-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .issue-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 12px;
    background: #0f1115;
    padding: 6px 10px;
    border-radius: 6px;
  }
  .issue-finding {
    flex: 1;
    color: #e2e8f0;
  }
  .issue-reco {
    color: #64748b;
    max-width: 380px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .no-issues {
    margin-top: 12px;
    font-size: 13px;
    color: #64748b;
    font-style: italic;
  }
</style>
