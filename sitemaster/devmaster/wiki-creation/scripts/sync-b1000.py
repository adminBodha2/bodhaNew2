#!/usr/bin/env python3
"""
sync-b1000.py — Import new or updated bharata1000 books into node-domain-map.csv.

Run this when:
  - New books are added to the bharata1000 list
  - Books are moved between sections

What it does:
  - Reads db-bharata1000_rows.csv
  - Identifies rows whose node_id (b1000:{id}) does NOT already exist in
    node-domain-map.csv
  - Assigns domain and lens based on the book's section using a fixed mapping
  - Appends new rows to node-domain-map.csv
  - Flags any sections not in the mapping so they can be assigned manually

What it does NOT do:
  - Update existing b1000 nodes (their method=section assignments are stable)
  - Handle overlap with library books — overlap is managed manually via the
    'overlap' and 'b1000_id' fields

Usage:
  python3 scripts/sync-b1000.py path/to/db-bharata1000_rows.csv
  python3 scripts/sync-b1000.py path/to/db-bharata1000_rows.csv --dry-run

db-bharata1000_rows.csv expected columns:
  id, title, author, description, section, subsection, link

"""

import csv, sys, argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Section → (domain_1, domain_2, lens) derived from existing classified data.
# Sections with no strong analytical lens are left with lens=''.
SECTION_MAP = {
    'Shruti - The Foundational Revelation':             ('sruti-and-veda',                        '',                                  ''),
    'The Six Darshanas':                                ('darshanas-and-philosophy',               '',                                  ''),
    'Vedanta - The Sub-schools':                        ('darshanas-and-philosophy',               '',                                  ''),
    'Sanskrit Philosophy of Mind, Self, and Consciousness': ('darshanas-and-philosophy',           '',                                  ''),
    'Ramana Maharshi, Nisargadatta, and Modern Advaita Voices': ('darshanas-and-philosophy',       '',                                  ''),
    'Buddhist Philosophy in India':                     ('darshanas-and-philosophy',               '',                                  ''),
    'Jain Philosophy':                                  ('darshanas-and-philosophy',               '',                                  ''),
    'The Itihasas - Mahabharata and Ramayana':          ('puranas-and-itihasa',                    '',                                  ''),
    'The Puranas':                                      ('puranas-and-itihasa',                    '',                                  ''),
    'Itihasa-Purana Adjacent Texts and Subhashita Literature': ('puranas-and-itihasa',             '',                                  ''),
    'Smritis and Dharmashastra':                        ('dharmashastra-and-polity',               '',                                  ''),
    'Statecraft, Economics, and Polity':                ('dharmashastra-and-polity',               'civilizational-consciousness',      'civilizational-consciousness'),
    'Sanskrit Grammar, Linguistics, and Philosophy of Language': ('language-and-sanskrit',         '',                                  ''),
    'Sanskrit Reference and Study':                     ('language-and-sanskrit',                  '',                                  ''),
    'Art, Iconography, and Architecture':               ('arts-and-aesthetics',                    '',                                  ''),
    'Sanskrit Kavya and Drama':                         ('arts-and-aesthetics',                    '',                                  ''),
    'Music, Dance, and Performing Arts':                ('arts-and-aesthetics',                    '',                                  ''),
    'Tantra and Agama':                                 ('sacred-geography-and-temple',            '',                                  ''),
    'Saiva Traditions':                                 ('festivals-and-living-tradition',          '',                                  ''),
    'Shakta and Goddess Traditions':                    ('festivals-and-living-tradition',          '',                                  ''),
    'North Indian Bhakti':                              ('festivals-and-living-tradition',          '',                                  ''),
    'Bengal Vaishnavism and Caitanya Tradition':        ('festivals-and-living-tradition',          '',                                  ''),
    'Tamil Sangam and Bhakti':                          ('festivals-and-living-tradition',          '',                                  ''),
    'Ancient Indian History':                           ('history-and-civilizational-recovery',    '',                                  'civilizational-consciousness'),
    'Medieval India':                                   ('history-and-civilizational-recovery',    '',                                  'shatrubodha'),
    'Essential Anthologies and Sourcebooks':            ('history-and-civilizational-recovery',    '',                                  ''),
    'Civilizational and Indic Studies - Indian Voices': ('history-and-civilizational-recovery',   '',                                  'svayambodha'),
    'Hindu Reform and the Long Nineteenth Century':     ('history-and-civilizational-recovery',    '',                                  'svayambodha'),
    'Sindhu-Sarasvati and the Indo-European Question':  ('sindhu-sarasvati-and-origins',           '',                                  'purva-paksha'),
    'Hindu Studies - Contemporary Scholarship and Critique': ('indology-and-civilizational-critique', '',                              'purva-paksha'),
    'Hindu Studies - Indigenous Reclamation':           ('indology-and-civilizational-critique',   '',                                  'svayambodha'),
    'Decolonial and Civilizational Critique':           ('indology-and-civilizational-critique',   '',                                  'shatrubodha'),
    'Hindu Science, Mathematics, Medicine, and Cosmology': ('knowledge-systems-and-education',     '',                                  'svayambodha'),
    'Sri Aurobindo and Integral Vision':                ('civilizational-consciousness',            '',                                  'civilizational-consciousness'),
    'Vivekananda, Ramakrishna, and Modern Vedanta':     ('civilizational-consciousness',            '',                                  'svayambodha'),
    'The Diaspora, Modern Practice, and Global Hinduism': ('civilizational-consciousness',          '',                                  ''),
}


def main():
    parser = argparse.ArgumentParser(description='Sync new bharata1000 books into node-domain-map.csv')
    parser.add_argument('b1000_csv', nargs='?',
                        help='Path to db-bharata1000_rows.csv')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    args = parser.parse_args()

    if not args.b1000_csv:
        print("Usage: python3 scripts/sync-b1000.py path/to/db-bharata1000_rows.csv")
        sys.exit(1)

    b1000_path = Path(args.b1000_csv)
    if not b1000_path.exists():
        print(f"Error: file not found: {b1000_path}")
        sys.exit(1)

    map_path = ROOT / 'node-domain-map.csv'

    # Load existing map
    existing_rows = []
    with open(map_path) as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        for row in reader:
            existing_rows.append(row)
    existing_ids = {r['node_id'] for r in existing_rows}

    # Parse b1000
    new_rows = []
    unmapped_sections = set()

    with open(b1000_path) as f:
        for row in csv.DictReader(f):
            node_id = f"b1000:{row['id']}"
            if node_id in existing_ids:
                continue

            section = row.get('section', '').strip()
            if section not in SECTION_MAP:
                unmapped_sections.add(section)
                mapping = ('', '', '')
            else:
                mapping = SECTION_MAP[section]

            new_row = {f: '' for f in fieldnames}
            new_row.update({
                'node_id':  node_id,
                'title':    row.get('title', ''),
                'author':   row.get('author', ''),
                'type':     'book',
                'source':   'bharata1000',
                'domain_1': mapping[0],
                'domain_2': mapping[1],
                'lens':     mapping[2],
            })
            new_rows.append(new_row)

    print(f"New b1000 books to add: {len(new_rows)}")

    if not new_rows:
        print("Nothing to add — map is already up to date.")
        return

    unassigned = [r for r in new_rows if not r.get('domain_1')]
    print(f"  Section-classified: {len(new_rows) - len(unassigned)}")
    print(f"  Unassigned (unknown section): {len(unassigned)}")

    if unmapped_sections:
        print(f"\n⚠  Unknown sections (add to SECTION_MAP in this script):")
        for s in sorted(unmapped_sections):
            print(f"   '{s}'")

    if args.dry_run:
        print("\nNew books (dry run):")
        for r in new_rows:
            domain_str = r['domain_1'] or '⚠ unassigned'
            lens_str   = r.get('lens', '') or '—'
            print(f"  {r['node_id']:<12} domain={domain_str:<45} lens={lens_str}")
            print(f"             {r['title'][:70]}")
        print("\nRun without --dry-run to append.")
        return

    all_rows = existing_rows + new_rows
    with open(map_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)

    print(f"\nAppended {len(new_rows)} new b1000 books. Total nodes: {len(all_rows)}")

    if unassigned:
        print(f"\n⚠  {len(unassigned)} books need manual domain assignment:")
        for r in unassigned:
            print(f"   {r['node_id']} — {r['title']}")


if __name__ == '__main__':
    main()
