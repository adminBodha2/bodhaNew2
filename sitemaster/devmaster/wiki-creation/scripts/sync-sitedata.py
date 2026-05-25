#!/usr/bin/env python3
"""
sync-sitedata.py — Import new nodes from a sitedata CSV export.

Run this when:
  - A new blog post is published
  - A new external article is added
  - A new thinker, school, question, or research-project node is created
  - Any new sitedata content needs to enter the graph

What it does:
  - Reads the sitedata CSV (exported from the SvelteKit data layer)
  - Identifies rows whose node_id does NOT already exist in node-domain-map.csv
  - Classifies each new node (domain via keyword matching, lens via keyword matching)
  - Appends the new rows to node-domain-map.csv
  - Prints a summary of what was added and what was unclassified

What it does NOT do:
  - Modify existing nodes already in the map
  - Add bharata1000 books (use sync-b1000.py for that)
  - Add temples (use sync-temples.py for that)
  - Create edges (add edges manually via add-edge.py)

Usage:
  python3 scripts/sync-sitedata.py path/to/sitedata.csv
  python3 scripts/sync-sitedata.py path/to/sitedata.csv --dry-run

Sitedata CSV expected columns:
  title, author/0, type, linkpath, description, tags/0, tags/1, tags/2, tags/3, ...

"""

import csv, json, sys, argparse
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).parent.parent

# Sitedata type → node_id prefix
TYPE_PREFIX = {
    'blog':             'blog',
    'article':          'blog',
    'external-article': 'external-article',
    'thinker':          'thinker',
    'school':           'school',
    'question':         'question',
    'project':          'project',
    'research-project': 'project',
    'lab':              'lab',
    'lab-note':         'lab',
}

# Types to skip — handled by separate import scripts
SKIP_TYPES = {'book'}  # library books come in via library-items.json, not sitedata


def load_keyword_map(items):
    kw_map = {}
    for item in items:
        for kw in item.get('keywords', []):
            kw_map.setdefault(kw.lower(), []).append(item['id'])
    return kw_map


def classify(tags, kw_map):
    seen = []
    for tag in tags:
        for item_id in kw_map.get(tag.lower(), []):
            if item_id not in seen:
                seen.append(item_id)
    return seen


def derive_node_id(row):
    """Derive node_id from type (authoritative for prefix) and linkpath (for slug).

    Linkpath patterns per type:
      blog            /blog/{slug}
      project         /research/{slug}
      lab             /lab/{slug}
      question        /big-questions/{slug}
      thinker         /inspiration/{slug}
      school          /inspiration/{slug}
      external-article  https://domain.com/path/{slug}/
    """
    raw_type = row.get('type', '').lower().strip()
    if raw_type in SKIP_TYPES:
        return None

    prefix = TYPE_PREFIX.get(raw_type)
    if not prefix:
        return None

    linkpath = row.get('linkpath', '').strip()

    if linkpath.startswith('http'):
        # External article or full URL — derive slug from last non-empty URL segment
        parts = [p for p in linkpath.rstrip('/').split('/') if p and not p.startswith('http')]
        if not parts:
            return None
        slug = parts[-1]
    else:
        # Internal path — last segment is always the slug
        parts = [p for p in linkpath.strip('/').split('/') if p]
        if not parts:
            return None
        slug = parts[-1]

    return f"{prefix}:{slug}"


def get_tags(row):
    tags = []
    for i in range(10):
        key = f'tags/{i}'
        if key in row and row[key].strip():
            tags.append(row[key].strip())
    return tags


def main():
    parser = argparse.ArgumentParser(description='Sync new sitedata nodes into node-domain-map.csv')
    parser.add_argument('sitedata_csv', nargs='?',
                        default=str(ROOT.parent / 'sitedata_9may.csv'),
                        help='Path to sitedata CSV export')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    args = parser.parse_args()

    sitedata_path = Path(args.sitedata_csv)
    if not sitedata_path.exists():
        print(f"Error: sitedata CSV not found at {sitedata_path}")
        sys.exit(1)

    domains_path = ROOT / 'domains.json'
    lenses_path  = ROOT / 'lenses.json'
    map_path     = ROOT / 'node-domain-map.csv'

    # Load classifiers
    with open(domains_path) as f:
        domains = json.load(f)
    with open(lenses_path) as f:
        lenses = json.load(f)
    domain_kw = load_keyword_map(domains)
    lens_kw   = load_keyword_map(lenses)

    # Load existing map
    existing_rows = []
    with open(map_path) as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        for row in reader:
            existing_rows.append(row)

    existing_ids = {r['node_id'] for r in existing_rows}

    # Parse sitedata
    new_rows = []
    skipped  = []

    with open(sitedata_path) as f:
        for row in csv.DictReader(f):
            if row.get('type', '').lower().strip() in SKIP_TYPES:
                continue  # books handled separately
            node_id = derive_node_id(row)
            if not node_id:
                skipped.append(('no_id', row.get('title', '?')))
                continue
            if node_id in existing_ids:
                continue  # already in map

            tags = get_tags(row)
            matched_domains = classify(tags, domain_kw)
            matched_lenses  = classify(tags, lens_kw)

            new_row = {f: '' for f in fieldnames}
            new_row.update({
                'node_id':  node_id,
                'title':    row.get('title', ''),
                'author':   row.get('author/0', ''),
                'type':     'blog' if row.get('type','').lower() in ('article','blog') else row.get('type','').lower(),
                'source':   'library',
                'domain_1': matched_domains[0] if len(matched_domains) > 0 else '',
                'domain_2': matched_domains[1] if len(matched_domains) > 1 else '',
                'lens':     matched_lenses[0]  if len(matched_lenses)  > 0 else '',
            })
            new_rows.append(new_row)

    print(f"New nodes to add: {len(new_rows)}")
    if skipped:
        print(f"Skipped (no derivable ID): {len(skipped)}")

    if not new_rows:
        print("Nothing to add — map is already up to date.")
        return

    # Show what would be added
    unclassified = [r for r in new_rows if not r.get('domain_1')]
    print(f"  Classified:   {len(new_rows) - len(unclassified)}")
    print(f"  Unclassified: {len(unclassified)} (will need manual domain assignment)")

    if args.dry_run:
        print("\nNew nodes (dry run):")
        for r in new_rows:
            domain_str = r['domain_1'] or '⚠ unassigned'
            lens_str   = r.get('lens', '') or '—'
            print(f"  {r['node_id']:<60} domain={domain_str}  lens={lens_str}")
        print("\nRun without --dry-run to append these to node-domain-map.csv")
        return

    # Append to map
    all_rows = existing_rows + new_rows
    with open(map_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)

    print(f"\nAppended {len(new_rows)} new nodes. Total nodes: {len(all_rows)}")

    if unclassified:
        print(f"\n⚠  {len(unclassified)} nodes need manual domain assignment:")
        for r in unclassified:
            print(f"   {r['node_id']} — {r['title']}")
        print("\nEdit node-domain-map.csv and set domain_1 for each unclassified node.")


if __name__ == '__main__':
    main()
