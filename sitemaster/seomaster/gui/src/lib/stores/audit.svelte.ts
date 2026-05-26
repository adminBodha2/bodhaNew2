/**
 * Central Svelte 5 runes-based state for the SEO audit workbench.
 * All state lives inside this module. Components interact via exported functions + getters.
 */

import { runAudit, type FullAuditResult, type AuditIssue, type SeoPageInventoryItem } from '../runAudit';

// --- Private state (never exported directly for mutation) ---

let _currentAudit = $state<FullAuditResult | null>(null);
let _isRunning = $state(false);
let _lastError = $state<string | null>(null);
let _lastRunOptions = $state({ live: false, limit: 0 });

let _focusedPagePath = $state<string | null>(null);

let _severityFilter = $state(new Set(['critical', 'high', 'medium', 'low']));
let _categoryFilter = $state(new Set<string>());
let _routeFamilyFilter = $state(new Set<string>());
let _textSearch = $state('');

// --- Public API (functions + getters) ---

export function getCurrentAudit() {
  return _currentAudit;
}
export function getIsRunning() {
  return _isRunning;
}
export function getLastError() {
  return _lastError;
}
export function getFocusedPagePath() {
  return _focusedPagePath;
}

export function getFocusedPage() {
  if (!_focusedPagePath || !_currentAudit) return null;
  return _currentAudit.inventory.find((p) => p.urlPath === _focusedPagePath) ?? null;
}

export function getIssuesForFocusedPage(): AuditIssue[] {
  if (!_focusedPagePath) return [];
  return _currentAudit?.issues.filter((i) => i.urlPath === _focusedPagePath) ?? [];
}
export function getTextSearch() {
  return _textSearch;
}

export function getLastRunOptions() {
  return _lastRunOptions;
}

// Derived values (recomputed when dependencies change)
export function getAllIssues(): AuditIssue[] {
  return _currentAudit?.issues ?? [];
}
export function getAllInventory(): SeoPageInventoryItem[] {
  return _currentAudit?.inventory ?? [];
}

export function getVisibleIssues(): AuditIssue[] {
  let list = getAllIssues();

  if (_focusedPagePath) {
    return list.filter((i) => i.urlPath === _focusedPagePath);
  }

  if (_severityFilter.size > 0) {
    list = list.filter((i) => _severityFilter.has(i.severity as any));
  }
  if (_categoryFilter.size > 0) {
    list = list.filter((i) => _categoryFilter.has(i.category));
  }
  if (_routeFamilyFilter.size > 0) {
    const allowed = new Set(
      getAllInventory()
        .filter((p) => _routeFamilyFilter.has(p.routeFamily))
        .map((p) => p.urlPath)
    );
    list = list.filter((i) => allowed.has(i.urlPath));
  }
  if (_textSearch.trim()) {
    const q = _textSearch.toLowerCase().trim();
    list = list.filter(
      (i) =>
        i.urlPath.toLowerCase().includes(q) ||
        i.finding.toLowerCase().includes(q) ||
        i.recommendation.toLowerCase().includes(q)
    );
  }
  return list;
}

export function getVisibleInventory() {
  let list = getAllInventory();

  if (_textSearch.trim()) {
    const q = _textSearch.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.urlPath.toLowerCase().includes(q) ||
        (p.title || '').toLowerCase().includes(q)
    );
  }
  return list;
}

export function getInventoryWithCounts() {
  const countMap = new Map<string, number>();
  for (const issue of getAllIssues()) {
    countMap.set(issue.urlPath, (countMap.get(issue.urlPath) || 0) + 1);
  }
  return getAllInventory().map((item) => ({
    ...item,
    issueCount: countMap.get(item.urlPath) || 0
  }));
}

export function getFacetCounts() {
  const bySeverity: Record<string, number> = {};
  const byCategory: Record<string, number> = {};

  for (const i of getAllIssues()) {
    bySeverity[i.severity] = (bySeverity[i.severity] || 0) + 1;
    byCategory[i.category] = (byCategory[i.category] || 0) + 1;
  }
  return { bySeverity, byCategory };
}

// --- Actions (these are the only way to mutate state) ---

export async function run(options: { live?: boolean; limit?: number } = {}) {
  _isRunning = true;
  _lastError = null;

  const runOpts = {
    live: !!options.live,
    limit: options.limit ?? 0
  };

  try {
    const result = await runAudit(runOpts);
    _currentAudit = result;
    _lastRunOptions = runOpts;
  } catch (e: any) {
    _lastError = e?.message || String(e);
    console.error('[Workbench] Audit run failed', e);
  } finally {
    _isRunning = false;
  }
}

export function setFocusedPage(path: string | null) {
  _focusedPagePath = path;
}

export function clearFocusedPage() {
  _focusedPagePath = null;
}

export function toggleSeverity(sev: 'critical' | 'high' | 'medium' | 'low') {
  if (_severityFilter.has(sev)) _severityFilter.delete(sev);
  else _severityFilter.add(sev);
  _severityFilter = new Set(_severityFilter); // trigger reactivity
}

export function toggleCategory(cat: string) {
  if (_categoryFilter.has(cat)) _categoryFilter.delete(cat);
  else _categoryFilter.add(cat);
  _categoryFilter = new Set(_categoryFilter);
}

export function setTextSearch(q: string) {
  _textSearch = q;
}

export function resetAllFilters() {
  _severityFilter = new Set(['critical', 'high', 'medium', 'low']);
  _categoryFilter = new Set();
  _routeFamilyFilter = new Set();
  _textSearch = '';
}

export function clearAll() {
  _currentAudit = null;
  _focusedPagePath = null;
  resetAllFilters();
  _lastError = null;
}

// Convenience for components that want the raw sets (for .has checks)
export function getSeverityFilter() {
  return _severityFilter;
}
export function getCategoryFilter() {
  return _categoryFilter;
}
export function getRouteFamilyFilter() {
  return _routeFamilyFilter;
}
