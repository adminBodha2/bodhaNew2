#!/usr/bin/env python3
"""
add-edge.py — Add a single edge to node-edges-map.csv with validation.

Run this when:
  - A new thinker has been added and you want to wire authored/founded/responds_to edges
  - A new research-project needs to be connected to a question
  - A new book is identified as addressing a specific question
  - Any manual semantic connection needs to be recorded

Edge types:
  authored      — thinker wrote a book/article
  founded       — thinker founded a school
  member_of     — thinker associated with a school
  influences    — intellectual influence between thinkers
  investigates  — research-project or school investigates a question
  draws_on      — research-project or wiki page draws on a thinker's framework
  responds_to   — thinker's body of work responds to a question
  addresses     — a book or wiki page addresses a question
  path_step     — content appears in a reading/project/question path

Usage:
  python3 scripts/add-edge.py \\
    --source thinker:ram-swarup \\
    --target question:what-will-destroy \\
    --type responds_to \\
    --notes "Ram Swarup's analysis of Islam and Christianity as systemic threats"

  python3 scripts/add-edge.py --list-types    # print all valid edge types
  python3 scripts/add-edge.py --list-nodes    # list all node IDs

"""

import csv, sys, argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent

VALID_EDGE_TYPES = [
    'authored', 'founded', 'member_of', 'influences',
    'investigates', 'draws_on', 'responds_to', 'addresses', 'path_step',
    'supports_project', 'has_topic',
]


def load_node_ids():
    ids = set()
    with open(ROOT / 'node-domain-map.csv') as f:
        for row in csv.DictReader(f):
            ids.add(row['node_id'])
    return ids


def load_existing_edges():
    with open(ROOT / 'node-edges-map.csv') as f:
        return list(csv.DictReader(f))


def main():
    parser = argparse.ArgumentParser(description='Add an edge to node-edges-map.csv')
    parser.add_argument('--source',  help='Source node_id')
    parser.add_argument('--target',  help='Target node_id')
    parser.add_argument('--type',    help='Edge type (see --list-types)')
    parser.add_argument('--notes',   default='', help='Rationale for this edge')
    parser.add_argument('--skip-validation', action='store_true',
                        help='Skip node existence check (for reading-path or pending nodes)')
    parser.add_argument('--list-types', action='store_true', help='Print valid edge types and exit')
    parser.add_argument('--list-nodes', action='store_true', help='Print all node IDs and exit')
    args = parser.parse_args()

    if args.list_types:
        print("Valid edge types:")
        for t in VALID_EDGE_TYPES:
            print(f"  {t}")
        return

    if args.list_nodes:
        for nid in sorted(load_node_ids()):
            print(nid)
        return

    missing = [f for f in ['source', 'target', 'type'] if not getattr(args, f)]
    if missing:
        parser.error(f"Missing required arguments: {', '.join('--' + m for m in missing)}")

    if args.type not in VALID_EDGE_TYPES:
        print(f"Error: '{args.type}' is not a valid edge type.")
        print(f"Valid types: {', '.join(VALID_EDGE_TYPES)}")
        sys.exit(1)

    if not args.skip_validation:
        node_ids = load_node_ids()
        errors = []
        if args.source not in node_ids:
            errors.append(f"Source node '{args.source}' not found in node-domain-map.csv")
        if args.target not in node_ids:
            errors.append(f"Target node '{args.target}' not found in node-domain-map.csv")
        if errors:
            for e in errors:
                print(f"Error: {e}")
            print("\nUse --skip-validation to add the edge anyway (e.g. for reading-path nodes).")
            sys.exit(1)

    existing = load_existing_edges()
    for edge in existing:
        if (edge['source_id'] == args.source and
            edge['target_id'] == args.target and
            edge['edge_type'] == args.type):
            print(f"Warning: this edge already exists.")
            confirm = input("Add anyway? [y/N]: ").strip().lower()
            if confirm != 'y':
                print("Aborted.")
                return

    new_edge = {
        'source_id': args.source,
        'target_id': args.target,
        'edge_type': args.type,
        'notes':     args.notes,
    }

    edges_path = ROOT / 'node-edges-map.csv'
    fieldnames = ['source_id', 'target_id', 'edge_type', 'notes']
    with open(edges_path, 'a', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writerow(new_edge)

    print(f"Added: {args.source} --[{args.type}]--> {args.target}")
    print(f"Total edges: {len(existing) + 1}")


if __name__ == '__main__':
    main()
