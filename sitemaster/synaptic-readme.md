# Synaptic Developer Guide

Synaptic is the Sanskrit reader and discovery section mounted under `/library/sections`.

## Routes

- `/library/sections` - Synaptic index with counts for rules, dhātus, and dictionary words.
- `/library/sections/ashtadhyayi` - paginated Aṣṭādhyāyī rule browser with adhyāya/pāda filters and live 3-character search.
- `/library/sections/ashtadhyayi/[sutra]` - Aṣṭādhyāyī rule detail, rich notes, and previous/next sequence navigation by `numindex`.
- `/library/sections/dhatus` - paginated Dhātupāṭha browser with gaṇa filter and search.
- `/library/sections/dhatus/[dhatu]` - dhātu detail with source metadata, related rules, and preview words from the dhātu.
- `/library/sections/dhatus/[dhatu]/words` - paginated words linked to a dhātu.
- `/library/sections/words` - universal Sanskrit word list with Apte and Monier-Williams filters.
- `/library/sections/words/[word]` - dictionary meaning detail with source attribution and dhātu links.

## Data Files

Generated static data lives in `src/lib/serving/synaptic/`.

- `db-ashtadhyayi.json` - rich Aṣṭādhyāyī rule data used by the app.
- `ashtadhyayi-rules.json` - older normalized Vidyut sutra output kept for source traceability.
- `dhatus.json` - normalized Vidyut Dhātupāṭha roots.
- `dictionary-entries.json` - normalized word details with concise Apte/MW excerpts.
- `word-index.json` - compact word-list index for browse/search.
- `dhatu-word-links.json` - dhātu-to-word discovery map.

## Source Inputs

- Vidyut sutrapatha TSV: `https://raw.githubusercontent.com/ambuda-org/vidyut/main/vidyut-prakriya/data/sutrapatha.tsv`
- Vidyut dhatupatha TSV: `https://raw.githubusercontent.com/ambuda-org/vidyut/main/vidyut-prakriya/data/dhatupatha.tsv`
- AP90 Apte XML: `https://github.com/cceh/c-salt_sanskrit_data/blob/master/sa_en/ap90/ap90.xml`
- Monier-Williams TEI split files: `https://github.com/cceh/c-salt_sanskrit_data/tree/master/sa_en/mw/split`

## Scripts

Run the full generator:

```sh
node sitemaster/toolmaster/build-synaptic-data.mjs
```

The generator fetches source data, normalizes it, and writes all JSON outputs. GitHub API rate limits can interrupt full AP90/MW fetches. If complete dictionary JSON already exists and only compaction/link recomputation is needed, run:

```sh
node sitemaster/toolmaster/compact-synaptic-dictionary.mjs
```

## Helper Modules

- `src/lib/synaptic/index.ts` handles Aṣṭādhyāyī and Dhātupāṭha data access, filtering, pagination, and neighbors.
- `src/lib/synaptic/dictionary.ts` handles dictionary word access, word search, dictionary counts, dhātu-word lists, and word-to-dhātu hydration.

Dictionary helpers are kept separate so non-dictionary pages do not import the large dictionary JSON unless they need it.

## Link Semantics

Dhātu-word links are generated as discovery links:

- Direct links use dictionary Sanskrit-token evidence and are labeled `dictionary text cites √...`.
- Fallback links use conservative guṇa/vṛddhi stem signatures and are labeled `headword begins with ... from √...`.

These links are not a complete prakriyā derivation engine. Future work should replace or enrich fallback links with explicit derivational data.

## Verification

After Synaptic route or data-helper changes:

```sh
npm run check
npm run build
```

Runtime smoke URLs:

- `/library/sections`
- `/library/sections/ashtadhyayi`
- `/library/sections/ashtadhyayi/1.1.1`
- `/library/sections/dhatus`
- `/library/sections/dhatus/bhu`
- `/library/sections/dhatus/bhu/words`
- `/library/sections/words`
- `/library/sections/words/bhava`
