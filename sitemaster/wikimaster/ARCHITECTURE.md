# Wiki Information Architecture

This document describes the conceptual structure of the Bodha knowledge wiki - a content platform covering dharma, itihasa, and Bharata. It is the reference point for all data modelling decisions.

## What the wiki is

An interactive knowledge base where users can explore a large, interconnected body of content - blogs, books, scholars, temples, questions, research - through a graph interface and curated pathways. The design goal is that a user can enter at any point and trace meaningful connections outward, rather than hitting a flat list.

## Content types

These are the eleven types of content that exist in the wiki. They are a global set - every domain can contain any of these types.

| Type | Description |
|------|-------------|
| `book` | Books in the library (200+) and bharata1000 |
| `blog` | Original posts published on the Bodha site |
| `external-article` | Articles published on other platforms |
| `thinker` | Individual scholars and thinkers the org draws on |
| `school` | Schools of thought the org identifies with or analyses |
| `research-project` | Active research projects run by the org |
| `question` | The big civilizational questions the wiki is organised around |
| `lab-note` | Working notes - in-progress thinking, not yet published |
| `temple` | Hindu temples (380+), integrated as a geographic/sacred layer |
| `framework` | Conceptual frameworks - to be added |
| `wiki` | Synthesized reference pages as a knowledge wiki - one page per topic, drawing on multiple sources. Covers five topic clusters: Sri Aurobindo corpus, Indian Civilization (phenomenology & religion), Indian History (origins & archaeology), Ram Swarup & Sita Ram Goel corpus, and Comparative Civilizations (selective). Node IDs use `wiki:` prefix. |

## Domains

Domains are the primary classification structure of the wiki. They are the hub nodes in the knowledge graph - the conceptual clusters around which all content organises itself.

**Base file:** `domains.json`

Every content item is assigned one or more domains. Domains drive the graph's visual structure: in the overview, only domain nodes (and a few other hub types) are visible. Content nodes appear when a user zooms into a domain.

### What a domain is not

- Domains are not tags. Tags are fine-grained metadata used for search and filtering within a domain. A domain is a coarser, stable classification.
- Domains are not navigation filters. They are semantic clusters - a book on Nyaya philosophy belongs in *Darśanas & Philosophy* because that is what it *is*, not because a filter was applied.
- Domains are not mutually exclusive. A single item can belong to multiple domains, and those cross-domain connections are among the most interesting edges in the graph.

### The 13 domains

| ID | Name | Description |
|----|------|-------------|
| `sruti-and-veda` | Śruti & the Vedic World | Vedas, Upanishads, Aranyakas, Vedic symbolism and cosmology |
| `puranas-and-itihasa` | Purāṇas & Itihāsa | Mahabharata, Ramayana, the Puranas, sacred narrative and mythic time |
| `darshanas-and-philosophy` | Darśanas & Philosophy | The six schools, Vedanta, Kashmir Shaivism, Yoga, Buddhist and Jain philosophy |
| `dharmashastra-and-polity` | Dharmaśāstra & Polity | Smriti, law, statecraft, Arthashastra, governance and political ethics |
| `language-and-sanskrit` | Language & Sanskrit | Grammar, linguistics, philosophy of language, Bhartrhari, Sanskrit study |
| `arts-and-aesthetics` | Arts & Aesthetics | Natyashastra, rasa theory, music, dance, drama, iconography, architecture |
| `sacred-geography-and-temple` | Sacred Geography & Temple | Temples, tirthas, kshetras, pilgrimage, Agama, Dharmic circuits |
| `history-and-civilizational-recovery` | History & Civilizational Recovery | Indian historiography, Dharampal tradition, pre-colonial knowledge, decolonisation |
| `sindhu-sarasvati-and-origins` | Sindhu-Sarasvatī & Origins | Indus-Sarasvati civilisation, Out of India theory, Aryan debate, ancient genetics |
| `indology-and-civilizational-critique` | Indology & Civilizational Critique | Critique of Western Indology, purva-paksha, Voice of India tradition |
| `knowledge-systems-and-education` | Knowledge Systems & Education | IKS, Amarakosha, Hindu science and mathematics, knowledge transmission |
| `festivals-and-living-tradition` | Festivals & Living Tradition | Festivals, utsavas, ritual cycles, temple-going, living practice |
| `civilizational-consciousness` | Civilizational Consciousness | Svayambodha, civilizational frameworks, ecology as worldview, dharmic response to modernity |

### Domain schema

Each domain in `domains.json` has the following fields:

```json
{
  "id": "slug used in all references",
  "name": "Display name (may use diacritics)",
  "description": "One or two sentences describing what the domain covers",
  "color": "Hex color for graph visualisation",
  "keywords": ["list of tags that auto-map content items to this domain"],
  "content_types": ["the global set of 10 content types - same for all domains"]
}
```

The `keywords` field is used for automated domain assignment: if a content item carries a tag that appears in a domain's keyword list, it is assigned to that domain.

## Lenses

Lenses are a second classification layer that cuts across domains. Where domains answer "what is this content about," lenses answer "how does Bodha frame it" - the analytical or civilizational stance the organisation brings to the content.

**Base file:** `lenses.json`

A single item can carry both a domain and a lens. They are independent axes. Example: a book on German Indology belongs to the domain *Indology & Civilizational Critique* and carries the lens `shatrubodha`. A book on Vedic cosmology belongs to *Śruti & the Vedic World* and may carry `svayambodha` or `civilizational-consciousness`.

### The 4 lenses

| ID | Name | Description |
|----|------|-------------|
| `svayambodha` | Svayambodha | Hindu self-knowledge, internal recovery, and civilizational self-possession - the inward-facing lens |
| `shatrubodha` | Śatrubodha | Analysis of threats, hostile ideologies, and adversarial forces - Islamic supremacism, missionary activity, Marxist historiography, breaking-India networks |
| `civilizational-consciousness` | Civilizational Consciousness | Content that reads its subject through a civilizational frame - asking not just what happened but what it means for Bharata as a living civilisation |
| `purva-paksha` | Pūrva-pakṣa | Engagement with Western, rival, or adversarial thought seriously on its own terms before critiquing it - the classical method of philosophical engagement |

### Lens schema

Each lens in `lenses.json` has the following fields:

```json
{
  "id": "slug used in all references",
  "name": "Display name (may use diacritics)",
  "description": "One or two sentences describing what the lens covers",
  "color": "Hex color for graph visualisation",
  "keywords": ["list of tags that auto-map content items to this lens"]
}
```

As with domains, the `keywords` field drives automated lens assignment: if a content item carries a tag appearing in a lens's keyword list, it receives that lens.

### Coverage

| Lens | Assigned nodes |
|------|---------------|
| `svayambodha` | ~200 |
| `shatrubodha` | ~110 |
| `civilizational-consciousness` | ~120 |
| `purva-paksha` | ~90 |
| **Total lens-assigned** | **519 (35% of 1468)** |

Sitedata and wiki nodes are assigned via tag matching or manually. Bharata1000 nodes receive lens assignments via section-to-lens inference across 13 of 36 sections. The remaining 65% of unassigned nodes are primarily the 23 bharata1000 sections covering primary texts, classical philosophy, and devotional literature - content where no analytical stance applies, correctly left unlensed.

## Navigation modes

The wiki supports three ways of moving through the content:

**Graph (by domain)** - The force-directed node graph. Domain nodes are the permanent hubs. Content nodes appear on zoom. Scholars and schools float near their primary domains. This is for open-ended browsing.

**Questions** - The ten big civilizational questions act as named clusters: pre-formed collections of content, scholars, and projects that converge on a specific inquiry. Not all content maps to a question - questions surface where genuine convergence exists.

**Paths** - Curated, linear sequences: reading paths through the library, and research pathways through the org's projects. Not a graph - more like a syllabus. For users who want to be guided.

## Data files

| File | Contents |
|------|----------|
| `domains.json` | The 13 domain definitions with keywords and metadata |
| `lenses.json` | The 4 lens definitions with keywords and metadata |
| `node-domain-map.csv` | Every content item mapped to its domain(s) and lens - 1468 nodes |
| `node-edges-map.csv` | Node-to-node connections - 4500 edges |

### node-domain-map.csv schema

| Column | Description |
|--------|-------------|
| `node_id` | Unique identifier with type prefix (e.g. `blog:slug`, `b1000:42`, `thinker:dharampal`) |
| `title` | Content title |
| `author` | Author(s) |
| `type` | Content type - one of: `book`, `blog`, `external-article`, `thinker`, `school`, `research-project`, `project`, `question`, `lab-note`, `wiki` |
| `source` | `library`, `bharata1000`, or `wiki` |
| `domain_1` | Primary domain (required) |
| `domain_2` | Secondary domain - for content that genuinely spans two domains (30% of nodes) |
| `lens` | Analytical lens, if applicable - `svayambodha`, `shatrubodha`, `civilizational-consciousness`, or `purva-paksha` |

### Coverage

| Source | Nodes |
|--------|-------|
| Bharata 1000 books | 992 |
| Library books | 248 |
| External articles | 55 |
| Wiki pages (megawikiwiki) | 53 |
| Blogs, thinkers, schools, questions, projects, lab-notes | 120 |
| **Total** | **1468** |

**Note on temples:** Temple data (379 entries) is served directly from `db-hindu-temples.json` in the SvelteKit layer. Temples are not in the knowledge graph - they have no semantic connections and form no part of the discovery network. The temple map is a separate browse surface.

All 1468 graph nodes are domain-assigned. Wiki nodes use `wiki:` prefix and `source=wiki`; they are manually domain-assigned. The 8 titles that appeared in both the library and bharata1000 have been merged into single library nodes.

### node-edges-map.csv schema

**Base file:** `node-edges-map.csv`

Edges are directional: `source_id → target_id`. The graph engine reads both directions for layout, but semantics are directional (a thinker *authored* a book, not the reverse).

| Column | Description |
|--------|-------------|
| `source_id` | The originating node (`node_id` from node-domain-map) |
| `target_id` | The destination node |
| `edge_type` | Type of relationship (see table below) |
| `notes` | Rationale - required for all semantic edges, explains the connection to the user |

#### Edge types

| Type | Semantics | Count |
|------|-----------|-------|
| `has_topic` | Blog, book, or external article is topically covered by a synthesized wiki page | 1277 |
| `path_step` | Content appears in a reading path or curated question/project pathway (ordered) | 231 |
| `addresses` | A book, blog, external article, or wiki page addresses a question | 1811 |
| `supports_project` | Blog, book, or external article supplies evidence, background, or conceptual support for a research project | 1098 |
| `investigates` | Research-project or school investigates a question | 21 |
| `responds_to` | A thinker's body of work responds to a question | 13 |
| `draws_on` | Research-project or wiki page draws on a thinker's framework | 28 |
| `authored` | Thinker wrote a book or article | 9 |
| `member_of` | Thinker associated with / belongs to a school | 6 |
| `influences` | One thinker's work shaped another's | 4 |
| `founded` | Thinker founded a school of thought | 2 |

#### Coverage

4500 edges total. The 231 `path_step` edges come from three source files: `path-books-map.json` (10 reading paths, 145 books), `big-questions-path.json` (10 question pathways, 36 steps), and `project-paths.json` (11 project pathways, 55 steps). The remaining 4269 semantic edges were derived from documented intellectual relationships, institutional histories, thematic alignment, curated pathway membership, explicit topic-to-wiki matches, broad domain bridges for books that did not have a narrower title match, curated blog-to-question / blog-to-project links, and capped book-to-question / book-to-project pathway links - each has a `notes` field explaining the connection.

#### Note on node ID conventions

All own articles/posts use the `blog:` prefix throughout - in node IDs, path steps, and type values - matching the site's route structure.

#### Reading path sources

The 10 reading paths are curated book lists by topic. Their source nodes are `reading-path:{group}`:

| Reading path | Books |
|---|---|
| `reading-path:darshanas-and-philosophy` | 38 |
| `reading-path:puranic-and-itihasic-literature` | 22 |
| `reading-path:vedic-and-upanishadic-texts` | 20 |
| `reading-path:indology-and-civilizational-critique` | 20 |
| `reading-path:language-logic-and-sanskrit` | 12 |
| `reading-path:dharma-ethics-and-law` | 11 |
| `reading-path:hinduism-overview` | 6 |
| `reading-path:history-polity-and-society` | 6 |
| `reading-path:arts-performance-and-aesthetics` | 5 |
| `reading-path:indian-knowledge-systems` | 5 |

---

For step-by-step instructions on adding domains, lenses, nodes, and edges - and for the scripts that automate classification and sync - see [DEVELOPER.md](DEVELOPER.md).

*Last updated: May 2026*
