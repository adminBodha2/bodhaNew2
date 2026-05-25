#!/usr/bin/env python3
"""
sync-wiki.py — Import new wiki pages from the megawikiwiki folder.

Run this when:
  - A new .md file is added to any wiki cluster in megawikiwiki/

What it does:
  - Scans the megawikiwiki folder for .md files that match the known wiki clusters
  - Compares against existing wiki: nodes in node-domain-map.csv
  - For each new file, prompts for domain and lens assignment (interactive)
  - Appends the new nodes to node-domain-map.csv

Wiki clusters and their folder prefixes:
  wiki-srg-srs/              → node prefix: wiki:srg-{slug}   (topic pages only)
  wiki-indian-civilization/  → node prefix: wiki:{slug}
  wiki-indian-history/       → node prefix: wiki:{slug}
  wiki-aurobindo/            → node prefix: wiki:aurobindo-{slug}
  wiki-comparative-civilizations/ → node prefix: wiki:{slug}

Files excluded from import:
  - INDEX-*.md (index files, not topic pages)
  - source-summaries.md (meta pages)
  - Any .md file in the root megawikiwiki/ directory

Slug derivation: filename without .md extension, lowercased, spaces → hyphens.
For aurobindo cluster: slug is prefixed with 'aurobindo-' to avoid collisions.
For srg-srs cluster: slug is prefixed with 'srg-' to avoid collisions.

After importing, wire edges manually via add-edge.py:
  - wiki page draws on thinker/school → draws_on
  - wiki page addresses a question    → addresses

Usage:
  python3 scripts/sync-wiki.py path/to/megawikiwiki
  python3 scripts/sync-wiki.py path/to/megawikiwiki --dry-run
  python3 scripts/sync-wiki.py path/to/megawikiwiki --non-interactive domain=X lens=Y

"""

import csv, sys, argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Known wiki clusters: (folder_name, node_slug_prefix, default_author)
WIKI_CLUSTERS = [
    ('wiki-srg-srs',                  'srg-',          'Ram Swarup, Sita Ram Goel'),
    ('wiki-indian-civilization',       '',              ''),
    ('wiki-indian-history',            '',              ''),
    ('wiki-aurobindo',                 'aurobindo-',    'Sri Aurobindo'),
    ('wiki-comparative-civilizations', '',              ''),
]

# Files to skip within wiki clusters
SKIP_FILES = {'source-summaries.md', 'reading-map.md'}
SKIP_PREFIXES = ('INDEX-',)

VALID_DOMAINS = [
    'sruti-and-veda', 'puranas-and-itihasa', 'darshanas-and-philosophy',
    'dharmashastra-and-polity', 'language-and-sanskrit', 'arts-and-aesthetics',
    'sacred-geography-and-temple', 'history-and-civilizational-recovery',
    'sindhu-sarasvati-and-origins', 'indology-and-civilizational-critique',
    'knowledge-systems-and-education', 'festivals-and-living-tradition',
    'civilizational-consciousness',
]
VALID_LENSES = [
    'svayambodha', 'shatrubodha', 'civilizational-consciousness',
    'purva-paksha', '',
]


def slug_from_filename(filename, prefix=''):
    stem = Path(filename).stem.lower().replace('_', '-').replace(' ', '-')
    return f"{prefix}{stem}"


def title_from_filename(filename):
    stem = Path(filename).stem
    return stem.replace('-', ' ').replace('_', ' ').title()


def prompt_domain(node_id, title, default=''):
    print(f"\n  Node: {node_id}")
    print(f"  Title: {title}")
    print(f"  Valid domains:")
    for i, d in enumerate(VALID_DOMAINS):
        print(f"    [{i+1:2d}] {d}")
    while True:
        val = input(f"  domain_1 [{default or 'required'}]: ").strip()
        if not val and default:
            return default
        if val.isdigit() and 1 <= int(val) <= len(VALID_DOMAINS):
            return VALID_DOMAINS[int(val) - 1]
        if val in VALID_DOMAINS:
            return val
        print("  Invalid — enter domain name or number.")


def prompt_lens(node_id):
    print(f"  Valid lenses (leave blank for none):")
    for i, l in enumerate(VALID_LENSES):
        label = l if l else '(none)'
        print(f"    [{i}] {label}")
    while True:
        val = input(f"  lens [blank=none]: ").strip()
        if val == '':
            return ''
        if val.isdigit() and 0 <= int(val) < len(VALID_LENSES):
            return VALID_LENSES[int(val)]
        if val in VALID_LENSES:
            return val
        print("  Invalid — enter lens name or number.")


def main():
    parser = argparse.ArgumentParser(description='Sync new wiki pages into node-domain-map.csv')
    parser.add_argument('wiki_dir', nargs='?', help='Path to megawikiwiki folder')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    parser.add_argument('--non-interactive', action='store_true',
                        help='Skip prompts; use --domain and --lens instead')
    parser.add_argument('--domain', default='', help='Domain to assign to all new pages (non-interactive)')
    parser.add_argument('--lens',   default='', help='Lens to assign to all new pages (non-interactive)')
    args = parser.parse_args()

    if not args.wiki_dir:
        print("Usage: python3 scripts/sync-wiki.py path/to/megawikiwiki")
        sys.exit(1)

    wiki_root = Path(args.wiki_dir)
    if not wiki_root.exists():
        print(f"Error: directory not found: {wiki_root}")
        sys.exit(1)

    map_path = ROOT / 'node-domain-map.csv'
    existing_rows = []
    with open(map_path) as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        for row in reader:
            existing_rows.append(row)
    existing_ids = {r['node_id'] for r in existing_rows}

    # Discover new wiki pages
    candidates = []
    for folder_name, slug_prefix, default_author in WIKI_CLUSTERS:
        cluster_dir = wiki_root / folder_name
        if not cluster_dir.exists():
            continue
        for md_file in sorted(cluster_dir.glob('*.md')):
            fname = md_file.name
            if fname in SKIP_FILES:
                continue
            if any(fname.startswith(p) for p in SKIP_PREFIXES):
                continue
            node_id = f"wiki:{slug_from_filename(fname, slug_prefix)}"
            if node_id in existing_ids:
                continue
            candidates.append({
                'node_id':       node_id,
                'title':         title_from_filename(fname),
                'author':        default_author,
                'cluster':       folder_name,
                'file':          str(md_file),
            })

    print(f"New wiki pages found: {len(candidates)}")
    if not candidates:
        print("Nothing to add — map is already up to date.")
        return

    for c in candidates:
        print(f"  {c['node_id']:<50} [{c['cluster']}]")

    if args.dry_run:
        print("\nRun without --dry-run to assign domains and import.")
        return

    # Assign domains and lenses
    new_rows = []
    for c in candidates:
        if args.non_interactive:
            domain = args.domain
            lens   = args.lens
            if not domain:
                print(f"⚠  --domain required in non-interactive mode. Skipping {c['node_id']}")
                continue
        else:
            domain = prompt_domain(c['node_id'], c['title'])
            lens   = prompt_lens(c['node_id'])

        new_row = {f: '' for f in fieldnames}
        new_row.update({
            'node_id':  c['node_id'],
            'title':    c['title'],
            'author':   c['author'],
            'type':     'wiki',
            'source':   'wiki',
            'domain_1': domain,
            'domain_2': '',
            'lens':     lens,
        })
        new_rows.append(new_row)
        print(f"  ✓ {c['node_id']} → domain={domain} lens={lens or '—'}")

    if not new_rows:
        return

    all_rows = existing_rows + new_rows
    with open(map_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)

    print(f"\nAppended {len(new_rows)} wiki nodes. Total nodes: {len(all_rows)}")
    print("\nNext: wire edges for each new wiki page using add-edge.py")
    print("  - draws_on  → thinker or school the page draws on")
    print("  - addresses → question the page addresses")


if __name__ == '__main__':
    main()
