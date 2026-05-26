#!/usr/bin/env python3
"""
sync-paths.py — Re-import all path_step edges from the three path JSON files.

Run this when:
  - A reading path (path-books-map.json) is updated
  - A question pathway (big-questions-path.json) is updated
  - A project pathway (project-paths.json) is updated

What it does:
  - Removes ALL existing path_step edges from node-edges-map.csv
  - Re-generates path_step edges from the three source files
  - Writes the updated edge file

Path sources:
  path-books-map.json       — reading paths (books by topic group)
  big-questions-path.json   — question pathways (steps per question)
  project-paths.json        — project pathways (steps per project)

Node ID derivation:
  Reading path book:  link=/library/books/{slug}  →  book:bol-{slug}
                      source node: reading-path:{group}
  Question step:      nodeId field used as-is
                      source node: question:{id} (from questionNodeId)
  Project step:       nodeId field used as-is
                      source node: project:{id} (from projectNodeId)

Usage:
  python3 scripts/sync-paths.py \\
    path/to/path-books-map.json \\
    path/to/big-questions-path.json \\
    path/to/project-paths.json
  python3 scripts/sync-paths.py ... --dry-run

"""

import json, csv, sys, argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent


def load_json(path):
    with open(path) as f:
        return json.load(f)


def book_node_id_from_link(link):
    """Convert /library/books/{slug} → book:bol-{slug}."""
    parts = [p for p in link.strip('/').split('/') if p]
    if not parts:
        return None
    slug = parts[-1]
    return f"book:bol-{slug}"


def generate_reading_path_edges(path_books):
    """Generate path_step edges from path-books-map.json."""
    edges = []
    for item in path_books:
        group = item.get('group', '').strip()
        link  = item.get('link', '').strip()
        if not group or not link:
            continue
        source_id = f"reading-path:{group}"
        target_id = book_node_id_from_link(link)
        if not target_id:
            continue
        edges.append({
            'source_id': source_id,
            'target_id': target_id,
            'edge_type': 'path_step',
            'notes':     f"Reading path: {group}",
        })
    return edges


def generate_question_path_edges(big_questions):
    """Generate path_step edges from big-questions-path.json."""
    edges = []
    for question in big_questions:
        source_id = question.get('questionNodeId', '').strip()
        steps = question.get('steps', [])
        if not source_id:
            continue
        for step in steps:
            target_id = step.get('nodeId', '').strip()
            note      = step.get('note', '')
            if not target_id:
                continue
            edges.append({
                'source_id': source_id,
                'target_id': target_id,
                'edge_type': 'path_step',
                'notes':     note,
            })
    return edges


def generate_project_path_edges(project_paths):
    """Generate path_step edges from project-paths.json."""
    edges = []
    for project in project_paths:
        source_id = project.get('projectNodeId', '').strip()
        steps = project.get('steps', [])
        if not source_id:
            continue
        for step in steps:
            target_id = step.get('nodeId', '').strip()
            note      = step.get('note', '')
            if not target_id:
                continue
            edges.append({
                'source_id': source_id,
                'target_id': target_id,
                'edge_type': 'path_step',
                'notes':     note,
            })
    return edges


def main():
    parser = argparse.ArgumentParser(description='Re-import all path_step edges.')
    parser.add_argument('path_books',     nargs='?', help='Path to path-books-map.json')
    parser.add_argument('big_questions',  nargs='?', help='Path to big-questions-path.json')
    parser.add_argument('project_paths',  nargs='?', help='Path to project-paths.json')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    args = parser.parse_args()

    if not all([args.path_books, args.big_questions, args.project_paths]):
        print("Usage: python3 scripts/sync-paths.py "
              "path-books-map.json big-questions-path.json project-paths.json")
        sys.exit(1)

    for p in [args.path_books, args.big_questions, args.project_paths]:
        if not Path(p).exists():
            print(f"Error: file not found: {p}")
            sys.exit(1)

    edges_path = ROOT / 'node-edges-map.csv'

    # Load existing edges
    existing_edges = []
    with open(edges_path) as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        for row in reader:
            existing_edges.append(row)

    non_path_edges = [e for e in existing_edges if e.get('edge_type') != 'path_step']
    old_path_count = len(existing_edges) - len(non_path_edges)

    # Generate new path_step edges
    path_books    = load_json(args.path_books)
    big_questions = load_json(args.big_questions)
    project_paths = load_json(args.project_paths)

    reading_edges  = generate_reading_path_edges(path_books)
    question_edges = generate_question_path_edges(big_questions)
    project_edges  = generate_project_path_edges(project_paths)

    new_path_edges = reading_edges + question_edges + project_edges

    # Deduplicate (same source+target+type)
    seen = set()
    deduped = []
    for e in new_path_edges:
        key = (e['source_id'], e['target_id'], e['edge_type'])
        if key not in seen:
            seen.add(key)
            deduped.append(e)

    print(f"Removing {old_path_count} existing path_step edges")
    print(f"Generating {len(deduped)} new path_step edges:")
    print(f"  Reading paths:    {len(reading_edges)}")
    print(f"  Question pathways:{len(question_edges)}")
    print(f"  Project pathways: {len(project_edges)}")
    if len(deduped) < len(new_path_edges):
        print(f"  ({len(new_path_edges) - len(deduped)} duplicates removed)")

    if args.dry_run:
        print("\nSample new edges (first 10):")
        for e in deduped[:10]:
            print(f"  {e['source_id']} → {e['target_id']}  [{e['notes'][:50]}]")
        print(f"\nTotal after sync: {len(non_path_edges) + len(deduped)} edges")
        print("Run without --dry-run to apply.")
        return

    # Ensure all fieldnames are present in new edge rows
    padded = []
    for e in deduped:
        row = {f: '' for f in fieldnames}
        row.update(e)
        padded.append(row)

    all_edges = non_path_edges + padded
    with open(edges_path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_edges)

    print(f"\nDone. Total edges: {len(all_edges)} "
          f"(was {len(existing_edges)}, delta {len(all_edges)-len(existing_edges):+d})")


if __name__ == '__main__':
    main()
