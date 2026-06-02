## 2026-06-01 - Phase 1 foundation implemented

Implemented the first Synaptic browse surface under `/library/sections` with static, prerender-safe data for Aṣṭādhyāyī rules and Dhātupāṭha roots.

### Data sources

- Vidyut sutrapatha TSV: `https://raw.githubusercontent.com/ambuda-org/vidyut/main/vidyut-prakriya/data/sutrapatha.tsv`
- Vidyut dhatupatha TSV: `https://raw.githubusercontent.com/ambuda-org/vidyut/main/vidyut-prakriya/data/dhatupatha.tsv`
- Normalized generated output:
	- `src/lib/serving/synaptic/ashtadhyayi-rules.json` with 3,983 rules
	- `src/lib/serving/synaptic/dhatus.json` with 2,229 dhatus

### Touched implementation files

- `sitemaster/toolmaster/build-synaptic-data.mjs`
- `src/lib/synaptic/index.ts`
- `src/lib/serving/synaptic/ashtadhyayi-rules.json`
- `src/lib/serving/synaptic/dhatus.json`
- `src/routes/library/sections/+page.ts`
- `src/routes/library/sections/+page.svelte`
- `src/routes/library/sections/ashtadhyayi/+page.ts`
- `src/routes/library/sections/ashtadhyayi/+page.svelte`
- `src/routes/library/sections/ashtadhyayi/[sutra]/+page.ts`
- `src/routes/library/sections/ashtadhyayi/[sutra]/+page.svelte`
- `src/routes/library/sections/dhatus/+page.ts`
- `src/routes/library/sections/dhatus/+page.svelte`
- `src/routes/library/sections/dhatus/[dhatu]/+page.ts`
- `src/routes/library/sections/dhatus/[dhatu]/+page.svelte`

### Verification

- `npm run check`: passed with 0 errors. Existing unrelated warnings remain in older components/routes.
- `npm run build`: passed. Existing unrelated warnings remain for unused selectors, FlexSearch dynamic import metadata, unresolved Newsreader font references, and Vercel externalization of Node `crypto`.
- Manual local route checks on `http://127.0.0.1:5174`:
	- `/library/sections`
	- `/library/sections/ashtadhyayi`
	- `/library/sections/ashtadhyayi/1.1.1`
	- `/library/sections/ashtadhyayi?adhyaya=1&pada=1&page=2`
	- `/library/sections/dhatus`
	- `/library/sections/dhatus?q=satta&gana=1&page=1`
	- `/library/sections/dhatus/bhu`
	- `/library/sections/ashtadhyayi/not-a-rule` returns 404

### Deferred

- Derived words remain intentionally deferred for Extension 1.
- Dhatu detail pages reserve a derived-words section but do not infer or generate forms yet.

## 2026-06-01 - Phase 2 dictionary and dhātu-word layer

Implemented Synaptic Extension 1 surfaces for dictionary-backed Sanskrit words and dhātu-to-word browsing.

### Data sources

- AP90 Apte Sanskrit-English XML from `cceh/c-salt_sanskrit_data`: `sa_en/ap90/ap90.xml`
- Monier-Williams Sanskrit-English TEI split files from `cceh/c-salt_sanskrit_data`: `sa_en/mw/split/mw_01.tei` through `mw_32.tei`
- Phase 2 generated output:
	- `src/lib/serving/synaptic/dictionary-entries.json` with 54,907 normalized dictionary words and concise Apte/MW meaning excerpts
	- `src/lib/serving/synaptic/word-index.json` for paginated word-list browsing and search
	- `src/lib/serving/synaptic/dhatu-word-links.json` for dhātu-to-word lists

### Link strategy

- Direct dictionary evidence is preferred: if the dictionary excerpt cites a dhātu token, the word is linked with `dictionary text cites √...`.
- Conservative guṇa/vṛddhi stem signals are used as a fallback for words whose headword begins with a generated root signature.
- The generated links are discovery aids, not a full prakriyā engine. A later extension should replace fallback links with derivational prakriyā data where available.

### Touched implementation files

- `sitemaster/toolmaster/build-synaptic-data.mjs`
- `sitemaster/toolmaster/compact-synaptic-dictionary.mjs`
- `src/lib/synaptic/dictionary.ts`
- `src/lib/serving/synaptic/dictionary-entries.json`
- `src/lib/serving/synaptic/word-index.json`
- `src/lib/serving/synaptic/dhatu-word-links.json`
- `src/routes/library/sections/+page.ts`
- `src/routes/library/sections/+page.svelte`
- `src/routes/library/sections/dhatus/[dhatu]/+page.ts`
- `src/routes/library/sections/dhatus/[dhatu]/+page.svelte`
- `src/routes/library/sections/dhatus/[dhatu]/words/+page.ts`
- `src/routes/library/sections/dhatus/[dhatu]/words/+page.svelte`
- `src/routes/library/sections/words/+page.ts`
- `src/routes/library/sections/words/+page.svelte`
- `src/routes/library/sections/words/[word]/+page.ts`
- `src/routes/library/sections/words/[word]/+page.svelte`

### Verification

- `npm run check`: passed with 0 errors. Existing unrelated warnings remain in older components/routes.
- `npm run build`: passed. Existing unrelated warnings remain for unused selectors, FlexSearch `import.meta`, unresolved Newsreader font references, and browser externalization of Node `crypto`.
- Runtime route checks on `http://127.0.0.1:5174`:
	- `/library/sections/words`
	- `/library/sections/words?q=bhava&dictionary=apte`
	- `/library/sections/words/bhava`
	- `/library/sections/dhatus/bhu`
	- `/library/sections/dhatus/bhu/words`
	- `/library/sections/words/not-a-word` returns 404
	- `/library/sections/dhatus/not-a-root/words` returns 404

## 2026-06-01 - Phase 2 dictionary and dhātu-word layer

Implemented Synaptic Extension 1 surfaces: a universal Sanskrit word list, word meaning detail pages, and dhātu-to-word browsing.

### Data sources

- Apte Sanskrit-English Dictionary AP90 XML from C-SALT Sanskrit data:
	- `https://github.com/cceh/c-salt_sanskrit_data/blob/master/sa_en/ap90/ap90.xml`
- Monier-Williams Sanskrit-English Dictionary TEI split files from C-SALT Sanskrit data:
	- `https://github.com/cceh/c-salt_sanskrit_data/tree/master/sa_en/mw/split`
- Existing Vidyut Dhātupāṭha roots remain the root authority for dhātu ids, gaṇa metadata, and root slugs.

### Generated normalized output

- `src/lib/serving/synaptic/dictionary-entries.json` with 54,907 normalized word detail records.
- `src/lib/serving/synaptic/word-index.json` with the list/search shape for all word cards.
- `src/lib/serving/synaptic/dhatu-word-links.json` with dhātu-to-word link lists.

### Implementation files

- `sitemaster/toolmaster/build-synaptic-data.mjs` now builds Phase 1 and Phase 2 data.
- `sitemaster/toolmaster/compact-synaptic-dictionary.mjs` compacts and recomputes word-index/link data from generated dictionary entries when the GitHub API source fetch is rate-limited mid-run.
- `src/lib/synaptic/dictionary.ts` provides typed dictionary, word-list, and dhātu-word helpers.
- Added routes:
	- `/library/sections/words`
	- `/library/sections/words/[word]`
	- `/library/sections/dhatus/[dhatu]/words`
- Updated `/library/sections` and `/library/sections/dhatus/[dhatu]` to expose the dictionary layer.

### Dhātu-word link policy

- Primary links use dictionary meaning text that cites the dhātu root as an exact folded IAST token.
- Secondary links use conservative headword-prefix signatures for guṇa/vṛddhi-style root alternants.
- The links are discovery aids, not a full prakriyā engine. Full derivational explanation remains a later Synaptic extension.

### Verification notes

- `node sitemaster/toolmaster/build-synaptic-data.mjs` completed once and wrote the dictionary source layer. A second full source fetch hit GitHub's unauthenticated API rate limit, so `node sitemaster/toolmaster/compact-synaptic-dictionary.mjs` was used to recompute compact local outputs from the generated dictionary data.
- `npm run check` currently fails on unrelated untracked `src/lib/comps/standalone-select` TypeScript/Svelte errors; no Synaptic route/helper diagnostics were reported in that run.
