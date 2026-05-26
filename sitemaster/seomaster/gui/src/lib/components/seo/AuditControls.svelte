<script lang="ts">
  import {
    run,
    getIsRunning,
    getCurrentAudit,
    getLastRunOptions
  } from '../../stores/audit.svelte';

  const isRunning = $derived(getIsRunning());
  const currentAudit = $derived(getCurrentAudit());
  const lastRunOptions = $derived(getLastRunOptions());

  async function runLocal() {
    await run({ live: false, limit: 0 });
  }
</script>

<div class="controls">
  <button class="primary" disabled={isRunning} onclick={runLocal}>
    {isRunning ? 'Running…' : 'Run Local Audit'}
  </button>

  {#if currentAudit}
    <div class="meta">
      Last run: {new Date(currentAudit.generatedAt).toLocaleTimeString()}
      {#if lastRunOptions.live} (live){/if}
    </div>
  {/if}

  {#if isRunning}
    <div class="spinner">Analyzing routes, markdown, sitemap sources…</div>
  {/if}
</div>

<style>
  .controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  .primary {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .primary:disabled {
    opacity: 0.7;
    cursor: default;
  }
  .meta {
    font-size: 12px;
    color: #64748b;
  }
  .spinner {
    font-size: 12px;
    color: #94a3b8;
    font-style: italic;
  }
</style>
