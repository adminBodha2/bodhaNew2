#!/usr/bin/env python3
"""
validate.py — Check referential integrity of node-domain-map.csv and node-edges-map.csv.

Run this:
  - After any batch import (sync-b1000.py, sync-wiki.py, sync-sitedata.py)
  - After manually editing either CSV
  - Before shipping a release of the graph data

What it checks:

  node-domain-map.csv:
    [1] Every node has a non-empty node_id
    [2] Every node has a non-empty domain_1
    [3] node_id format matches expected pattern (prefix:slug)
    [4] domain_1/2 values are in the known domain list
    [5] lens value is in the known lens list (or empty)
    [6] type is one of the known content types
    [7] No duplicate node_ids

  node-edges-map.csv:
    [8]  No duplicate edges (same source_id + target_id + edge_type)
    [9]  source_id exists in node-domain-map.csv
         (reading-path: nodes are exempt — they have no map entry)
    [10] target_id exists in node-domain-map.csv
    [11] edge_type is one of the known types
    [12] knowledge_inference edges have a non-empty notes field

Usage:
  python3 scripts/validate.py

"""

import csv, json, sys, unicodedata
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).parent.parent

VALID_TYPES = {
    'book', 'blog', 'external-article', 'thinker', 'school',
    'research-project', 'project', 'question', 'lab-note', 'lab',
    'framework', 'wiki',
}
VALID_EDGE_TYPES = {
    'path_step', 'investigates', 'responds_to', 'draws_on',
    'authored', 'addresses', 'member_of', 'influences', 'founded',
    'supports_project', 'has_topic', 'knowledge_inference',
}
# node_id prefixes that are valid sources for path_step edges but don't
# exist in node-domain-map.csv
EXEMPT_SOURCE_PREFIXES = {'reading-path:'}


def nfc(s):
    """NFC-normalize to prevent NFD/NFC byte-level mismatches."""
    return unicodedata.normalize('NFC', s)


def load_valid_ids(domains_path, lenses_path):
    with open(domains_path) as f:
        domains = json.load(f)
    with open(lenses_path) as f:
        lenses = json.load(f)
    valid_domains = {nfc(d['id']) for d in domains}
    valid_lenses  = {nfc(l['id']) for l in lenses}
    return valid_domains, valid_lenses


def validate_nodes(rows, valid_domains, valid_lenses):
    errors = []
    warnings = []
    seen_ids = Counter()

    for i, r in enumerate(rows):
        lineno = i + 2
        nid = nfc(r.get('node_id', '').strip())

        # [1] non-empty node_id
        if not nid:
            errors.append(f"  [L{lineno}] Missing node_id")
            continue

        # [7] duplicate node_ids
        seen_ids[nid] += 1

        # [3] node_id format
        if ':' not in nid:
            errors.append(f"  {nid}: node_id missing ':' separator")

        # [2] domain_1
        d1 = r.get('domain_1', '').strip()
        if not d1:
            errors.append(f"  {nid}: missing domain_1")

        # [4] domain values
        for field in ('domain_1', 'domain_2'):
            val = r.get(field, '').strip()
            if val and nfc(val) not in valid_domains:
                errors.append(f"  {nid}: unknown {field}='{val}'")

        # [5] lens value
        val = r.get('lens', '').strip()
        if val and nfc(val) not in valid_lenses:
            errors.append(f"  {nid}: unknown lens='{val}'")

        # [6] type
        node_type = r.get('type', '').strip()
        if node_type not in VALID_TYPES:
            warnings.append(f"  {nid}: unknown type='{node_type}'")

    # [7] duplicates
    for nid, count in seen_ids.items():
        if count > 1:
            errors.append(f"  DUPLICATE node_id: {nid} (appears {count} times)")

    return errors, warnings


def validate_edges(edge_rows, valid_node_ids):
    errors = []
    warnings = []
    seen_edges = Counter()

    for i, e in enumerate(edge_rows):
        lineno = i + 2
        src   = nfc(e.get('source_id', '').strip())
        tgt   = nfc(e.get('target_id', '').strip())
        etype = e.get('edge_type', '').strip()
        notes = e.get('notes', '').strip()

        if not src or not tgt:
            errors.append(f"  [L{lineno}] Edge missing source_id or target_id")
            continue

        # [8] duplicate edges
        key = (src, tgt, etype)
        seen_edges[key] += 1

        # [9] source exists (exempt reading-path: sources)
        exempt = any(src.startswith(p) for p in EXEMPT_SOURCE_PREFIXES)
        if not exempt and src not in valid_node_ids:
            errors.append(f"  Edge {src} → {tgt}: source_id not in node map")

        # [10] target exists
        if tgt not in valid_node_ids:
            errors.append(f"  Edge {src} → {tgt}: target_id not in node map")

        # [11] edge_type
        if etype not in VALID_EDGE_TYPES:
            errors.append(f"  Edge {src} → {tgt}: unknown edge_type='{etype}'")

        # [12] notes on knowledge_inference
        if etype == 'knowledge_inference' and not notes:
            warnings.append(f"  Edge {src} → {tgt}: knowledge_inference edge has no notes")

    for key, count in seen_edges.items():
        if count > 1:
            errors.append(f"  DUPLICATE edge: {key[0]} → {key[1]} [{key[2]}] (×{count})")

    return errors, warnings


def main():
    domains_path = ROOT / 'domains.json'
    lenses_path  = ROOT / 'lenses.json'
    map_path     = ROOT / 'node-domain-map.csv'
    edges_path   = ROOT / 'node-edges-map.csv'

    valid_domains, valid_lenses = load_valid_ids(domains_path, lenses_path)

    node_rows = []
    with open(map_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            node_rows.append(row)

    edge_rows = []
    with open(edges_path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            edge_rows.append(row)

    valid_node_ids = {nfc(r['node_id']) for r in node_rows}

    print(f"Validating {len(node_rows)} nodes and {len(edge_rows)} edges...\n")

    node_errors, node_warnings = validate_nodes(node_rows, valid_domains, valid_lenses)
    edge_errors, edge_warnings = validate_edges(edge_rows, valid_node_ids)

    all_errors   = node_errors   + edge_errors
    all_warnings = node_warnings + edge_warnings

    if node_errors:
        print(f"NODE ERRORS ({len(node_errors)}):")
        for e in node_errors: print(e)
    if edge_errors:
        print(f"\nEDGE ERRORS ({len(edge_errors)}):")
        for e in edge_errors: print(e)
    if node_warnings:
        print(f"\nNODE WARNINGS ({len(node_warnings)}):")
        for w in node_warnings: print(w)
    if edge_warnings:
        print(f"\nEDGE WARNINGS ({len(edge_warnings)}):")
        for w in edge_warnings: print(w)

    if not all_errors and not all_warnings:
        print("✓ No issues found.")
    else:
        print(f"\nSummary: {len(all_errors)} error(s), {len(all_warnings)} warning(s)")

    # Coverage summary
    total    = len(node_rows)
    assigned = sum(1 for r in node_rows if r.get('domain_1'))
    lensed   = sum(1 for r in node_rows if r.get('lens'))
    print(f"\nCoverage: {assigned}/{total} domain-assigned ({100*assigned//total}%) | "
          f"{lensed}/{total} lens-assigned ({100*lensed//total}%)")

    # Edge type breakdown
    from collections import Counter
    etype_counts = Counter(e.get('edge_type', '') for e in edge_rows)
    print(f"\nEdge types:")
    for etype, count in sorted(etype_counts.items(), key=lambda x: -x[1]):
        print(f"  {etype:<25} {count}")

    sys.exit(1 if all_errors else 0)


if __name__ == '__main__':
    main()
