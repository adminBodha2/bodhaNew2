import { collectInventory } from '@seomaster/inventory.mjs';
import { auditInventory, type SeoPageInventoryItem } from '@seomaster/audit.mjs';

// Re-export useful types from the engine for the GUI
export type { SeoPageInventoryItem };

export type AuditIssue = {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  urlPath: string;
  category: string;
  finding: string;
  evidence: string[];
  recommendation: string;
  patchAvailable: boolean;
};

export type FullAuditResult = {
  generatedAt: string;
  options: Record<string, unknown>;
  summary: {
    pages: number;
    issues: number;
    bySeverity: Record<string, number>;
    bySource: Record<string, number>;
    routeFamilies: Record<string, number>;
  };
  inventory: SeoPageInventoryItem[];
  issues: AuditIssue[];
};

export type RunAuditOptions = {
  live?: boolean;
  limit?: number;
};

export async function runAudit(opts: RunAuditOptions = {}): Promise<FullAuditResult> {
  const { live = false, limit = 0 } = opts;
  const inventory = await collectInventory({ live, limit });
  const result = auditInventory(inventory, { live, limit });
  return result as FullAuditResult;
}

/** Pure helper: return all issues for one specific page */
export function getIssuesForPage(issues: AuditIssue[], urlPath: string): AuditIssue[] {
  return issues.filter((i) => i.urlPath === urlPath);
}

/** Pure helper: find a page in inventory by path */
export function getPageByPath(inventory: SeoPageInventoryItem[], urlPath: string) {
  return inventory.find((p) => p.urlPath === urlPath);
}

/** Compute facet counts for a given key on the issues array */
export function computeFacetCounts<T extends string>(
  issues: AuditIssue[],
  key: 'severity' | 'category' | 'routeFamily'
): Record<T, number> {
  const counts: Record<string, number> = {};
  for (const issue of issues) {
    let val: string;
    if (key === 'severity') val = issue.severity;
    else if (key === 'category') val = issue.category;
    else val = (issue as any).routeFamily ?? 'unknown'; // fallback, usually on inventory
    counts[val] = (counts[val] || 0) + 1;
  }
  return counts as Record<T, number>;
}
