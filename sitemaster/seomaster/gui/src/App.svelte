<script lang="ts">
  import AuditControls from './lib/components/seo/AuditControls.svelte';
  import IssuesFilters from './lib/components/seo/IssuesFilters.svelte';
  import IssuesTable from './lib/components/seo/IssuesTable.svelte';
  import InventoryExplorer from './lib/components/seo/InventoryExplorer.svelte';
  import PageDetailPanel from './lib/components/seo/PageDetailPanel.svelte';
  import {
    getCurrentAudit,
    clearAll,
    getFocusedPagePath,
    clearFocusedPage,
    getIsRunning
  } from './lib/stores/audit.svelte';

  let activeWorkspace: 'seo' | 'graph' = $state('seo');

  const currentAudit = $derived(getCurrentAudit());
  const focusedPagePath = $derived(getFocusedPagePath());
  const isRunning = $derived(getIsRunning());
</script>

<main class="workbench">
  <header class="topbar">
    <div class="brand">
      <span class="logo-mark">BW</span>
      <span class="title">Bodha Workbench</span>
    </div>

    <div class="workspace-tabs">
      <button
        class:active={activeWorkspace === 'seo'}
        onclick={() => (activeWorkspace = 'seo')}
      >
        SEO
      </button>
      <button
        class:active={activeWorkspace === 'graph'}
        onclick={() => (activeWorkspace = 'graph')}
      >
        Graph
      </button>
    </div>

    <div class="status">
      <span class="status-dot"></span>
      Local • Bodha repo
    </div>
  </header>

  <div class="body">
    {#if activeWorkspace === 'seo'}
      <div class="seo-workspace">
        <div class="header-row">
          <h1>SEO Workspace</h1>
          {#if currentAudit}
            <button class="ghost" onclick={clearAll}>Clear results</button>
          {/if}
        </div>

        <AuditControls />

        {#if currentAudit}
          <div class="summary-bar">
            <div class="stat">
              <span class="num">{currentAudit.summary.pages}</span>
              <span class="lbl">pages</span>
            </div>
            <div class="stat">
              <span class="num">{currentAudit.summary.issues}</span>
              <span class="lbl">issues</span>
            </div>
            <div class="stat high">
              <span class="num">{currentAudit.summary.bySeverity.high || 0}</span>
              <span class="lbl">high</span>
            </div>
            <div class="stat med">
              <span class="num">{currentAudit.summary.bySeverity.medium || 0}</span>
              <span class="lbl">medium</span>
            </div>
            <div class="stat low">
              <span class="num">{currentAudit.summary.bySeverity.low || 0}</span>
              <span class="lbl">low</span>
            </div>

            {#if focusedPagePath}
              <div class="focus-chip">
                Focused: <code>{focusedPagePath}</code>
                <button onclick={clearFocusedPage}>×</button>
              </div>
            {/if}
          </div>

          <div class="main-grid">
            <div class="panel inventory-panel">
              <InventoryExplorer />
            </div>

            <div class="panel issues-panel">
              <div class="panel-header">
                <h3>Issues</h3>
                <span class="count">{currentAudit.summary.issues} total</span>
              </div>
              <IssuesFilters />
              <IssuesTable />
            </div>
          </div>

          <PageDetailPanel />
        {:else}
          <div class="empty-state">
            <p>Run a local audit to explore issues and inventory with powerful faceted filtering.</p>
            <p class="small">Clicking rows in either table will focus that page and filter the other view.</p>
          </div>
        {/if}
      </div>
    {:else}
      <div class="workspace">
        <h1>Knowledge Graph Workspace</h1>
        <p class="hint">Coming in the next phase of the workbench. Full wiki-graph explorer + connection manager.</p>
      </div>
    {/if}
  </div>
</main>

<style>
  .workbench {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0f1115;
    color: #e6e8ec;
  }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: #16181f;
    border-bottom: 1px solid #252833;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #3b82f6;
    color: white;
    font-weight: 700;
    font-size: 13px;
    border-radius: 6px;
  }
  .title {
    font-weight: 600;
    letter-spacing: -0.2px;
  }
  .workspace-tabs {
    display: flex;
    gap: 4px;
  }
  .workspace-tabs button {
    background: transparent;
    border: 1px solid #252833;
    color: #9ca3af;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
  }
  .workspace-tabs button:hover {
    border-color: #3b82f6;
    color: #e6e8ec;
  }
  .workspace-tabs button.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
    font-weight: 500;
  }
  .status {
    font-size: 12px;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
  }
  .body {
    padding: 24px 24px 40px;
    flex: 1;
  }
  .seo-workspace {
    max-width: 1480px;
    margin: 0 auto;
  }
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 26px;
    font-weight: 600;
    margin: 0;
  }
  .ghost {
    background: transparent;
    border: 1px solid #475569;
    color: #94a3b8;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }
  .ghost:hover {
    border-color: #64748b;
  }

  .summary-bar {
    display: flex;
    gap: 20px;
    align-items: center;
    background: #16181f;
    border: 1px solid #252833;
    border-radius: 10px;
    padding: 12px 18px;
    margin-bottom: 16px;
  }
  .stat {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .stat .num {
    font-size: 22px;
    font-weight: 600;
  }
  .stat .lbl {
    font-size: 12px;
    color: #64748b;
  }
  .focus-chip {
    margin-left: auto;
    background: #1e3a5f;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .focus-chip code {
    color: #60a5fa;
  }
  .focus-chip button {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 520px 1fr;
    gap: 20px;
  }
  .panel {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .panel-header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
  }
  .panel-header .count {
    font-size: 12px;
    color: #64748b;
  }

  .empty-state {
    background: #16181f;
    border: 1px solid #252833;
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    color: #94a3b8;
  }
  .empty-state p {
    margin: 8px 0;
  }
  .empty-state .small {
    font-size: 13px;
    opacity: 0.7;
  }
</style>
