# Developer Guide - Bodha Wiki IA Maintenance

This document explains how to keep the wiki's information architecture up to date as content grows. Read ARCHITECTURE.md first to understand what the data files are and why they exist the way they do.

## The data files and how they relate

```
domains.json - the 13 domain definitions (keywords drive auto-classification)
lenses.json - the 4 lens definitions (keywords drive auto-classification)
node-domain-map.csv - every node: its domain(s), lens(es), type, source
node-edges-map.csv - every connection between nodes
```

All four files must be kept in sync. When you add something to one, you almost always need to update the others.

## Adding a new domain

**When:** A subject area has emerged that genuinely doesn't fit any existing domain and has enough content (10+ nodes) to warrant its own hub in the graph.

**Steps:**

1. **Edit `domains.json`** - add a new entry following the existing schema exactly:
   ```json
   {
     "id": "your-domain-slug",
     "name": "Display Name",
     "description": "One or two sentences.",
     "color": "#HEXCOLOR",
     "keywords": ["tag1", "tag2", "..."],
     "content_types": ["book","blog","external-article","thinker","school",
                       "research-project","question","lab-note","temple","framework"]
   }
   ```
   - The `id` must be a lowercase hyphen-separated slug.
   - The `content_types` array is always the full global set of 10 - copy it exactly from any existing domain.
   - Choose `keywords` carefully: these are the tags that auto-assign nodes to this domain. Check `sitedata_*.csv` tag columns to find tags already in use that should map here.

2. **Re-run classification** to catch all existing nodes that carry tags matching the new keywords:
   ```bash
   python3 scripts/reclassify.py --dry-run   # preview
   python3 scripts/reclassify.py             # apply
   ```

3. **Update ARCHITECTURE.md** - add a row to the 13-domain table with the new domain's id, name, and description.

4. **Check for orphaned nodes** - after reclassification, verify nothing was accidentally re-routed away from its correct domain. Open `node-domain-map.csv` and filter on the new domain to review the assignments.

## Adding a new lens

**When:** A new analytical stance or framing has become prominent enough to be a first-class filter - not a subject (that's a domain) but a *how Bodha approaches* category.

**Steps:**

1. **Edit `lenses.json`** - add a new entry:
   ```json
   {
     "id": "lens-slug",
     "name": "Display Name",
     "description": "One or two sentences.",
     "color": "#HEXCOLOR",
     "keywords": ["tag1", "tag2", "..."]
   }
   ```

2. **Re-run classification:**
   ```bash
   python3 scripts/reclassify.py --dry-run
   python3 scripts/reclassify.py
   ```

3. **Assign bharata1000 books manually if applicable** - if the new lens corresponds to a bharata1000 section not yet mapped, edit `scripts/reclassify.py`: in the `section_lens_map` dictionary (or add it directly to `node-domain-map.csv` for the relevant section). Then re-run.

4. **Update ARCHITECTURE.md** - add a row to the lenses table, and update the lens coverage count.

## Adding new content nodes

### Blog posts (new articles published on the Bodha site)

When new posts are published, export an updated sitedata CSV from the SvelteKit project and run:

```bash
python3 scripts/sync-sitedata.py path/to/sitedata_export.csv --dry-run
python3 scripts/sync-sitedata.py path/to/sitedata_export.csv
```

The script:
- Derives the `node_id` from the `linkpath` field (e.g. `/blog/my-post` → `blog:my-post`)
- Matches tags against `domains.json` and `lenses.json` keywords
- Appends new rows to `node-domain-map.csv`
- Prints any nodes it couldn't classify - fix domain_1 manually in the CSV

**After syncing:** check whether the new post addresses a question or is part of a project, and add those edges:
```bash
python3 scripts/add-edge.py \
  --source blog:my-post \
  --target question:will-save-sanatana-dharma \
  --type addresses \
  --notes "Brief explanation of why this connection is real"
```

### External articles

Same process as blog posts - they come through the same sitedata CSV export. Their `linkpath` is `/external-article/slug`, which becomes `external-article:slug` in the map.

### Library books (new additions to the library)

1. Add the book to `library-items.json` in the SvelteKit project with its full metadata and tags.
2. Export a fresh sitedata CSV and run `sync-sitedata.py`.
3. Check if the book's author matches an existing thinker in the map. If so, add an `authored` edge:
   ```bash
   python3 scripts/add-edge.py \
     --source thinker:dharampal \
     --target book:bol-new-book-slug \
     --type authored --weight 3
   ```

### Bharata1000 books (new additions to the list)

The bharata1000 is a curated 1000-book list. If books are added or reorganised:

1. Export a fresh `db-bharata1000_rows.csv` from the database.
2. Run the following to identify new rows and add them:
   ```bash
   python3 scripts/sync-b1000.py path/to/db-bharata1000_rows.csv
   ```
3. For each new book, domain assignment uses the `section` field via the section→domain mapping in `sync-b1000.py`. Lens assignment uses the section→lens mapping. If the book is in a section not yet mapped, assign manually.

### Thinkers and schools

These are added via sitedata (they are nodes in the SvelteKit site). Run `sync-sitedata.py` after publishing a new thinker or school page.

After adding, wire semantic edges manually:
- Which school does this thinker belong to? → `member_of`
- Did they found the school? → `founded`
- Which questions does their work respond to? → `responds_to`
- Which projects draw on their framework? → `draws_on`
- Did they write any books already in the library? → `authored`

Use `add-edge.py` for each.

### Questions

Questions are added via sitedata. After adding a question node:

1. Run `sync-sitedata.py`.
2. Add a corresponding entry to `big-questions-path.json` in the SvelteKit project with its pathway steps.
3. Re-run the path step import (manual step: append the path_step edges from the new question's steps to `node-edges-map.csv`, or use `add-edge.py` for each step).
4. Wire projects that investigate this question using `investigates` edges.
5. Wire thinkers whose work responds to it using `responds_to` edges.

### Research projects

Research projects are added via sitedata. After adding:

1. Run `sync-sitedata.py`.
2. Add a corresponding entry to `project-paths.json` in the SvelteKit project.
3. Wire `investigates` edges to the question(s) the project addresses.
4. Wire `draws_on` edges to thinkers whose frameworks the project uses.
5. Import the project's path steps as `path_step` edges.

### Temples

Temples are served directly from `db-hindu-temples.json` in the SvelteKit layer. They are not part of the knowledge graph and have no entries in `node-domain-map.csv` or `node-edges-map.csv`. If new temples are added, update `db-hindu-temples.json` in the SvelteKit project — no graph scripts need to run.

### Lab notes

Lab notes have no tags, so they cannot be auto-classified.

1. Add the lab note node manually to `node-domain-map.csv`:
   ```
   node_id:   lab:your-note-slug
   title:     Note title
   author:    Author name
   type:      lab-note
   source:    library
   domain_1:  [assign manually — look at the note's subject]
   ```
2. Optionally assign a lens if the note has a clear analytical stance.

### Wiki pages (megawikiwiki)

Wiki pages are synthesized reference pages - one per topic, each drawing on multiple source books. They live in the `megawikiwiki` folder alongside the SvelteKit project. There are five wiki clusters:

| Wiki | Pages | Description |
|------|-------|-------------|
| `wiki-srg-srs` | 7 | Ram Swarup & Sita Ram Goel corpus |
| `wiki-indian-civilization` | 21 | Phenomenology of religion, dharma, karma, sacred geography |
| `wiki-indian-history` | 10 | Origins, Vedic history, Sarasvati, Aryan debate |
| `wiki-aurobindo` | 9 | Sri Aurobindo corpus |
| `wiki-comparative-civilizations` | 6 | Civilizational theory (selective) |

Wiki pages have no tags, so they cannot be auto-classified. When a new wiki page is added:

1. Add the node manually to `node-domain-map.csv`:
   ```
   node_id:   wiki:your-topic-slug
   title:     Topic title
   author:    Author(s) if thinker-specific (e.g. "Sri Aurobindo"), else blank
   type:      wiki
   source:    wiki
   domain_1:  [assign by topic]
   lens:      [assign if the page has a clear analytical stance - svayambodha/shatrubodha/etc.]
   ```
2. Wire edges immediately after adding:
   - Does the wiki page draw on a specific thinker's corpus? → `draws_on`
   - Does the wiki page address a civilizational question? → `addresses`
3. Use `add-edge.py` for each edge:
   ```bash
   python3 scripts/add-edge.py \
     --source wiki:your-topic-slug \
     --target thinker:ram-swarup \
     --type draws_on \
     --notes "Reason this wiki page draws on this thinker"
   ```

## Updating edges after any addition

Every time a new node is added, ask these questions:

| Question | Edge to add |
|----------|-------------|
| Did a thinker write this content? | `authored` |
| Does this content address a civilizational question? | `addresses` |
| Is this content topically covered by a synthesized wiki page? | `has_topic` |
| Does this thinker's work respond to a big question? | `responds_to` |
| Does this project investigate a question? | `investigates` |
| Does this project draw on a thinker's framework? | `draws_on` |
| Does this content support a research project? | `supports_project` |
| Does this thinker belong to or found a school? | `member_of` or `founded` |
| Is this content part of a reading path or project pathway? | `path_step` |

Add each relevant edge with:
```bash
python3 scripts/add-edge.py \
  --source SOURCE_NODE_ID \
  --target TARGET_NODE_ID \
  --type EDGE_TYPE \
  --notes "Reason this connection is real"
```

For `path_step` edges where the source is a `reading-path:` node (which doesn't exist in node-domain-map.csv), use `--skip-validation`.

## Updating reading paths and project pathways

Reading paths and question/project pathways live in the SvelteKit project as JSON files:
- `path-books-map.json` - reading paths (books by topic group)
- `big-questions-path.json` - question pathways (curated steps per question)
- `project-paths.json` - project pathways (curated steps per project)

When these files are updated:

1. Re-import all path_step edges:
   ```bash
   python3 scripts/sync-paths.py \
     path/to/path-books-map.json \
     path/to/big-questions-path.json \
     path/to/project-paths.json
   ```
   This removes all existing `path_step` edges and regenerates them from the three source files.
   
   For a single new step only, use `add-edge.py` directly instead.

## Full re-sync checklist

Run this sequence whenever you've done a batch update (new export of all sitedata, new bharata1000, etc.):

```bash
# 1. Import new sitedata nodes (blogs, thinkers, schools, questions, projects)
python3 scripts/sync-sitedata.py path/to/latest-sitedata.csv

# 2. Import new bharata1000 books (if db-bharata1000_rows.csv changed)
python3 scripts/sync-b1000.py path/to/db-bharata1000_rows.csv

# 3. Update temples (if db-hindu-temples.json changed)
#    Temples are not in the graph — just update db-hindu-temples.json directly in the SvelteKit project.

# 4. Import new wiki pages (if megawikiwiki folder has new .md files)
python3 scripts/sync-wiki.py path/to/megawikiwiki

# 5. Re-classify all keyword-method nodes (picks up new domain/lens keywords)
python3 scripts/reclassify.py

# 6. Re-import path_step edges (if any path JSON changed)
python3 scripts/sync-paths.py \
  path/to/path-books-map.json \
  path/to/big-questions-path.json \
  path/to/project-paths.json

# 7. Manually fix any unassigned nodes flagged by earlier steps
#    (filter node-domain-map.csv for empty domain_1, assign manually)

# 8. Add any new semantic edges
python3 scripts/add-edge.py --source ... --target ... --type ... --notes "..."

# 9. Validate - must exit clean before shipping
python3 scripts/validate.py

# 10. Update ARCHITECTURE.md coverage counts if they've changed significantly
```

## Keeping `node-edges-map.csv` clean

A few rules:
- Never add duplicate edges (same source + target + type). `add-edge.py` checks for this.
- `path_step` edges are managed as a batch from path JSON files - don't add them one by one unless it's a single new step.
- `knowledge_inference` edges should always have a non-empty `notes` field explaining the reasoning.
- `data_match` edges are generated by scripts — don't edit them manually.

## Scripts reference

| Script | Purpose | Run when |
|--------|---------|----------|
| `scripts/sync-sitedata.py` | Import new nodes from a sitedata CSV export | After publishing new blog posts, thinkers, schools, questions, or projects |
| `scripts/sync-b1000.py` | Import new bharata1000 books from `db-bharata1000_rows.csv` | After new books are added to the bharata1000 list |
| `scripts/sync-wiki.py` | Import new wiki pages from the megawikiwiki folder | After `.md` files are added to any wiki cluster |
| `scripts/sync-paths.py` | Re-import all `path_step` edges from the three path JSON files | After any reading path or question/project pathway is updated |
| `scripts/reclassify.py` | Re-apply domain/lens keyword matching to all bharata1000 and sitedata nodes | After editing `domains.json` or `lenses.json` keywords |
| `scripts/add-edge.py` | Add a single validated edge to `node-edges-map.csv` | After adding any new node that has semantic connections |
| `scripts/validate.py` | Check referential integrity across both CSVs — 12 checks, exits 1 on error | After any batch import or manual edit; before shipping |

## Node ID conventions

| Type | Prefix | Example |
|------|--------|---------|
| Blog post | `blog:` | `blog:the-dharma-of-design` |
| External article | `external-article:` | `external-article:the-story-of-a-priest` |
| Library book | `book:bol-` | `book:bol-the-beautiful-tree` |
| Bharata1000 book | `b1000:` | `b1000:42` |
| Thinker | `thinker:` | `thinker:dharampal` |
| School | `school:` | `school:voice-of-india-shatrubodha-school` |
| Question | `question:` | `question:what-will-destroy` |
| Research project | `project:` | `project:artist-in-art` |
| Lab note | `lab:` | `lab:dharma-as-design` |
| Reading path | `reading-path:` | `reading-path:darshanas-and-philosophy` |
| Wiki page | `wiki:` | `wiki:dharma`, `wiki:aurobindo-integral-yoga` |

For wiki pages whose topics are thinker-specific (Aurobindo, SRG-SRS), prefix the slug with the thinker shortname to avoid collisions as more wiki clusters are added (e.g. `wiki:aurobindo-integral-yoga` not `wiki:integral-yoga`).

Slugs are always lowercase, hyphen-separated. No underscores. No spaces.

*Last updated: May 2026*
