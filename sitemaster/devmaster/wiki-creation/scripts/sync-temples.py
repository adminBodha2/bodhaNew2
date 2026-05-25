#!/usr/bin/env python3
"""
sync-temples.py — Import new or updated temples from db-hindu-temples.json.

Run this when:
  - New temples are added to db-hindu-temples.json
  - A temple's is_anveshi status changes

What it does:
  - Reads db-hindu-temples.json
  - Identifies temples whose node_id (temple:{slug}) does NOT already exist
    in node-domain-map.csv
  - Assigns all temples to domain=sacred-geography-and-temple, method=category
  - Sets is_anveshi from the JSON field
  - Appends new rows to node-domain-map.csv

What it does NOT do:
  - Update is_anveshi on existing rows — run with --update-anveshi to sync that field
  - Assign lenses — temples carry no lens (their content is geographic and devotional)

Usage:
  python3 scripts/sync-temples.py path/to/db-hindu-temples.json
  python3 scripts/sync-temples.py path/to/db-hindu-temples.json --dry-run
  python3 scripts/sync-temples.py path/to/db-hindu-temples.json --update-anveshi

"""

import json, csv, sys, argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent


def main():
    parser = argparse.ArgumentParser(description='Sync new temples into node-domain-map.csv')
    parser.add_argument('temples_json', nargs='?',
                        help='Path to db-hindu-temples.json')
    parser.add_argument('--dry-run', action='store_true',
                        help='Preview without writing')
    parser.add_argument('--update-anveshi', action='store_true',
                        help='Also update is_anveshi on existing temple rows')
    args = parser.parse_args()

    if not args.temples_json:
        print("Usage: python3 scripts/sync-temples.py path/to/db-hindu-temples.json")
        sys.exit(1)

    temples_path = Path(args.temples_json)
    if not temples_path.exists():
        print(f"Error: file not found: {temples_path}")
        sys.exit(1)

    map_path = ROOT / 'node-domain-map.csv'

    with open(temples_path) as f:
        temples = json.load(f)

    # Load existing map
    existing_rows = []
    with open(map_path) as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        for row in reader:
            existing_rows.append(row)
    existing_ids = {r['node_id']: i for i, r in enumerate(existing_rows)}

    new_rows = []
    anveshi_updates = 0

    for t in temples:
        slug = t.get('slug', '').strip()
        if not slug:
            print(f"⚠  Skipping temple with no slug: {t.get('temple_name','?')}")
            continue

        node_id = f"temple:{slug}"
        is_anveshi = 'yes' if t.get('is_anveshi') else ''

        if node_id in existing_ids:
            # Optionally update is_anveshi on existing rows
            if args.update_anveshi:
                idx = existing_ids[node_id]
                old_val = existing_rows[idx].get('is_anveshi', '')
                if old_val != is_anveshi:
                    existing_rows[idx]['is_anveshi'] = is_anveshi
                    anveshi_updates += 1
            continue

        new_row = {f: '' for f in fieldnames}
        new_row.update({
            'node_id':    node_id,
            'title':      t.get('temple_name', ''),
            'author':     '',
            'type':       'temple',
            'source':     'library',
            'domain_1':   'sacred-geography-and-temple',
            'domain_2':   '',
            'domain_3':   '',
            'lens_1':     '',
            'lens_2':     '',
            'method':     'category',
            'overlap':    '',
            'is_anveshi': is_anveshi,
            'b1000_id':   '',
        })
        new_rows.append(new_row)

    print(f"New temples to add: {len(new_rows)}")
    anveshi_count = sum(1 for r in new_rows if r['is_anveshi'] == 'yes')
    if anveshi_count:
        print(f"  of which Anveshi temples: {anveshi_count}")
    if args.update_anveshi:
        print(f"  is_anveshi updates on existing rows: {anveshi_updates}")

    if not new_rows and not (args.update_anveshi and anveshi_updates):
        print("Nothing to do — map is already up to date.")
        return

    if args.dry_run:
        print("\nNew temples (dry run):")
        for r in new_rows:
            anveshi_flag = ' [ANVESHI]' if r['is_anveshi'] == 'yes' else ''
            print(f"  {r['node_id']:<40} {r['title'][:40]}{anveshi_flag}")
        if args.update_anveshi and anveshi_updates:
            print(f"\n{anveshi_updates} is_anveshi fields would be updated.")
        print("\nRun without --dry-run to apply.")
        return

    all_rows = existing_rows + new_rows
    with open(map_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)

    print(f"\nAppended {len(new_rows)} new temples. Total nodes: {len(all_rows)}")
    if args.update_anveshi and anveshi_updates:
        print(f"Updated is_anveshi on {anveshi_updates} existing temple rows.")


if __name__ == '__main__':
    main()
