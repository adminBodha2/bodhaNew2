<script lang="ts">
  import {
    getSeverityFilter,
    getCategoryFilter,
    getFacetCounts,
    getTextSearch,
    setTextSearch,
    toggleSeverity,
    toggleCategory,
    resetAllFilters
  } from '../../stores/audit.svelte';

  // Local list of known categories
  const knownCategories = ['metadata', 'schema', 'sitemap', 'content', 'links', 'topic', 'technical'];

  // Reactive getters (these will cause re-renders when the underlying state changes)
  let severityFilter = $derived(getSeverityFilter());
  let categoryFilter = $derived(getCategoryFilter());
  let facetCounts = $derived(getFacetCounts());
  let textSearch = $derived(getTextSearch());

  function handleSearchInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    setTextSearch(val);
  }

  function clearSearch() {
    setTextSearch('');
  }
</script>

<div class="filters">
  <div class="row">
    <!-- Severity -->
    <div class="group">
      <div class="label">Severity</div>
      <div class="chips">
        {#each ['critical', 'high', 'medium', 'low'] as sev}
          {@const count = facetCounts.bySeverity[sev] || 0}
          <button
            class="chip"
            class:active={severityFilter.has(sev as any)}
            onclick={() => toggleSeverity(sev as any)}
            disabled={count === 0 && !severityFilter.has(sev as any)}
          >
            {sev} <span class="count">({count})</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Category -->
    <div class="group">
      <div class="label">Category</div>
      <div class="chips">
        {#each knownCategories as cat}
          {@const count = facetCounts.byCategory[cat] || 0}
          <button
            class="chip"
            class:active={categoryFilter.has(cat)}
            onclick={() => toggleCategory(cat)}
            disabled={count === 0 && !categoryFilter.has(cat)}
          >
            {cat} <span class="count">({count})</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="row search-row">
    <div class="search">
      <input
        type="text"
        placeholder="Search path, finding, or recommendation…"
        value={textSearch}
        oninput={handleSearchInput}
      />
      {#if textSearch}
        <button class="clear" onclick={clearSearch}>✕</button>
      {/if}
    </div>

    <button class="reset" onclick={resetAllFilters}>Reset filters</button>
  </div>
</div>

<style>
  .filters {
    background: #16181f;
    border: 1px solid #252833;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 12px;
  }
  .row {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }
  .group {
    min-width: 220px;
  }
  .label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #6b7280;
    margin-bottom: 6px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .chip {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid #374151;
    background: transparent;
    color: #cbd5e1;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .chip:hover:not(:disabled) {
    border-color: #3b82f6;
  }
  .chip.active {
    background: #1e40af;
    border-color: #3b82f6;
    color: white;
  }
  .chip:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .count {
    opacity: 0.7;
    font-size: 10px;
  }
  .search-row {
    margin-top: 12px;
    align-items: center;
  }
  .search {
    position: relative;
    flex: 1;
    max-width: 420px;
  }
  .search input {
    width: 100%;
    background: #0f1115;
    border: 1px solid #334155;
    color: #e6e8ec;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
  }
  .search input:focus {
    outline: none;
    border-color: #3b82f6;
  }
  .clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 14px;
  }
  .reset {
    background: transparent;
    border: 1px solid #475569;
    color: #94a3b8;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
  }
  .reset:hover {
    border-color: #64748b;
  }
</style>
