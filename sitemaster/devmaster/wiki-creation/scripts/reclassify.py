#!/usr/bin/env python3
"""
reclassify.py — Re-apply domain and lens keyword matching to all nodes.

Run this after:
  - Adding or editing keywords in domains.json
  - Adding or editing keywords in lenses.json
  - Any time you want to re-score classification coverage

What it does:
  - Reads domains.json and lenses.json
  - For every sitedata-sourced node (blog, external-article, thinker, school,
    question, project), re-runs tag matching and updates domain_1/2 and lens
  - Nodes with source=bharata1000 are left untouched — those were assigned
    by section mapping in sync-b1000.py
  - Prints a before/after coverage summary

Usage:
  python3 scripts/reclassify.py
  python3 scripts/reclassify.py --dry-run    # preview without writing

"""

import csv, json, sys, argparse
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).parent.parent

def load_keyword_map(filepath):
    """Returns {keyword: [id, ...]} for domains or lenses."""
    with open(filepath) as f:
        items = json.load(f)
    kw_map = {}
    for item in items:
        for kw in item.get('keywords', []):
            kw_map.setdefault(kw.lower(), []).append(item['id'])
    return kw_map

def get_tags_from_row(row):
    """Extract all non-empty tag values from a node-domain-map row."""
    # Tags are stored in a 'tags' field if present, otherwise not (CSV has no tag column)
    # Classification is done by matching node_id prefix and stored domain/lens fields
    return []

def classify_by_keywords(tag_list, kw_map):
    """Given a list of tags, return matched item IDs in order of first match."""
    seen = []
    for tag in tag_list:
        for item_id in kw_map.get(tag.lower(), []):
            if item_id not in seen:
                seen.append(item_id)
    return seen  # [primary, secondary, ...]


def main():
    parser = argparse.ArgumentParser(description='Re-apply domain/lens keyword classification.')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    args = parser.parse_args()

    domains_path = ROOT / 'domains.json'
    lenses_path  = ROOT / 'lenses.json'
    map_path     = ROOT / 'node-domain-map.csv'
    sitedata_path = ROOT.parent / 'sitedata_9may.csv'  # adjust if path differs

    # Load classification maps
    with open(domains_path) as f:
        domains = json.load(f)
    with open(lenses_path) as f:
        lenses = json.load(f)

    domain_kw_map = {}
    for d in domains:
        for kw in d.get('keywords', []):
            domain_kw_map.setdefault(kw.lower(), []).append(d['id'])

    lens_kw_map = {}
    for l in lenses:
        for kw in l.get('keywords', []):
            lens_kw_map.setdefault(kw.lower(), []).append(l['id'])

    # Load sitedata to get tag lists per node
    node_tags = {}  # node_id -> [tag, ...]
    if sitedata_path.exists():
        with open(sitedata_path) as f:
            for row in csv.DictReader(f):
                # Derive node_id from linkpath
                linkpath = row.get('linkpath', '')
                if not linkpath:
                    continue
                parts = [p for p in linkpath.split('/') if p]
                if len(parts) >= 2:
                    prefix = parts[0]   # blog, external-article, thinker, etc.
                    slug   = parts[-1]
                    node_id = f"{prefix}:{slug}"
                    tags = [row[f'tags/{i}'] for i in range(10)
                            if f'tags/{i}' in row and row[f'tags/{i}']]
                    node_tags[node_id] = tags
    else:
        print(f"Warning: sitedata not found at {sitedata_path} — can only re-classify nodes that already have domain assignments.")

    # Load and update map
    rows = []
    with open(map_path) as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        for row in reader:
            rows.append(row)

    # Nodes to skip — bharata1000 section-mapped, wiki manually assigned
    SKIP_SOURCES = {'bharata1000', 'wiki'}

    changed = 0
    for row in rows:
        if row.get('source', '') in SKIP_SOURCES:
            continue

        tags = node_tags.get(row['node_id'], [])
        if not tags:
            continue  # no tag data available — skip

        # Domains
        matched_domains = classify_by_keywords(tags, domain_kw_map)
        old_d = (row.get('domain_1',''), row.get('domain_2',''))
        new_d1 = matched_domains[0] if len(matched_domains) > 0 else ''
        new_d2 = matched_domains[1] if len(matched_domains) > 1 else ''

        # Lens
        matched_lenses = classify_by_keywords(tags, lens_kw_map)
        old_l = row.get('lens', '')
        new_l = matched_lenses[0] if len(matched_lenses) > 0 else ''

        if (new_d1, new_d2) != old_d or new_l != old_l:
            changed += 1
            if args.dry_run:
                print(f"  CHANGE {row['node_id']}")
                if (new_d1, new_d2) != old_d:
                    print(f"    domain: {old_d} → {(new_d1, new_d2)}")
                if new_l != old_l:
                    print(f"    lens:   {old_l!r} → {new_l!r}")
            else:
                row['domain_1'] = new_d1
                row['domain_2'] = new_d2
                row['lens']     = new_l

    if not args.dry_run:
        with open(map_path, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
        print(f"Updated {changed} nodes.")
    else:
        print(f"\n{changed} nodes would change. Run without --dry-run to apply.")

    # Coverage summary
    total = len(rows)
    assigned = sum(1 for r in rows if r.get('domain_1'))
    lensed   = sum(1 for r in rows if r.get('lens'))
    print(f"\nCoverage: {assigned}/{total} domain-assigned ({100*assigned//total}%) | "
          f"{lensed}/{total} lens-assigned ({100*lensed//total if total else 0}%)")


if __name__ == '__main__':
    main()
