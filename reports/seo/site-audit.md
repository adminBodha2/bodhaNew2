# Bodha SEO Site Audit

Generated: 2026-05-17T19:45:10.128Z

## Summary

- Inventory pages: 253
- Issues: 345
- Critical: 0
- High: 9
- Medium: 173
- Low: 163

## Inventory Sources

- markdown: 185
- route-file: 65
- sitemap-code: 14

## Route Families

- about: 1
- academy: 3
- anveshi: 6
- api: 4
- aryavarta: 3
- auth: 3
- big-questions: 13
- blog: 67
- concepts: 2
- contact: 1
- core: 22
- designbodha: 3
- docs: 5
- explorer: 3
- home: 1
- inspiration: 31
- lab: 13
- library: 40
- newsletter: 3
- ontology: 2
- research: 14
- site-docs: 4
- sitemap.xml: 1
- team: 1
- temples: 2
- test-anveshi: 1
- transition: 2
- videos: 1
- wiki: 1

## Top Issues

### [high] Page has no discoverable title.

- Route: `/aryavarta`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a specific title through the route metadata/head component.
- Evidence:
  - /aryavarta/+page.svelte
  - /aryavarta/+page.ts

### [high] Page has no discoverable description.

- Route: `/aryavarta`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a concise page-specific meta description.
- Evidence:
  - /aryavarta/+page.svelte
  - /aryavarta/+page.ts

### [high] Page has no discoverable title.

- Route: `/docs`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a specific title through the route metadata/head component.
- Evidence:
  - /docs/+page.svelte

### [high] Page has no discoverable description.

- Route: `/docs`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a concise page-specific meta description.
- Evidence:
  - /docs/+page.svelte

### [high] Page has no discoverable title.

- Route: `/library/journal-archaeology`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a specific title through the route metadata/head component.
- Evidence:
  - /library/(library-subroutes)/journal-archaeology/+page.svelte
  - /library/(library-subroutes)/journal-archaeology/+page.ts

### [high] Page has no discoverable description.

- Route: `/library/journal-archaeology`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a concise page-specific meta description.
- Evidence:
  - /library/(library-subroutes)/journal-archaeology/+page.svelte
  - /library/(library-subroutes)/journal-archaeology/+page.ts

### [high] Page has no discoverable description.

- Route: `/newsletter/issue-1`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a concise page-specific meta description.
- Evidence:
  - /newsletter/issue-1.md

### [high] Page has no discoverable title.

- Route: `/temples`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a specific title through the route metadata/head component.
- Evidence:
  - /temples/+page.svelte
  - /temples/+page.ts

### [high] Page has no discoverable description.

- Route: `/temples`
- Category: `metadata`
- Patch available: yes
- Recommendation: Add a concise page-specific meta description.
- Evidence:
  - /temples/+page.svelte
  - /temples/+page.ts

### [medium] Title is short: "About | Bodha".

- Route: `/about`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /about/+page.svelte

### [medium] Description is short: 43 characters.

- Route: `/about`
- Category: `metadata`
- Patch available: yes
- Recommendation: Expand the description so it states the page subject and value clearly.
- Evidence:
  - /about/+page.svelte

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/about`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: route-file

### [medium] Title is short: "Academy | Bodha".

- Route: `/academy`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /academy/+page.svelte
  - /academy/+page.ts
  - src/routes/sitemap.xml/+server.ts

### [medium] Title is short: "Bodha Courses".

- Route: `/academy/courses`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /academy/courses/+page.svelte

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/academy/courses`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: route-file

### [medium] Description is short: 59 characters.

- Route: `/academy/courses/introduction-to-shri-ram-swarup`
- Category: `metadata`
- Patch available: yes
- Recommendation: Expand the description so it states the page subject and value clearly.
- Evidence:
  - /academy/courses/introduction-to-shri-ram-swarup/+page.svelte

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/academy/courses/introduction-to-shri-ram-swarup`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: route-file

### [medium] Title is short: "Anveshi | Bodha".

- Route: `/anveshi`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /anveshi/+page.svelte
  - /anveshi/+page.ts
  - src/routes/sitemap.xml/+server.ts

### [medium] Title is short: "Badami Chapter".

- Route: `/anveshi/badami`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /anveshi/badami.md

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/anveshi/badami`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Title is short: "Gujarat Chapter".

- Route: `/anveshi/gujarat`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /anveshi/gujarat.md

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/anveshi/gujarat`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Title is short: "Kannur Chapter".

- Route: `/anveshi/kannur`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /anveshi/kannur.md

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/anveshi/kannur`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Title is short: "Kullu Chapter".

- Route: `/anveshi/kullu`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /anveshi/kullu.md

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/anveshi/kullu`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/aryavarta`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: route-file

### [medium] Description is short: 60 characters.

- Route: `/aryavarta/v1-i1`
- Category: `metadata`
- Patch available: yes
- Recommendation: Expand the description so it states the page subject and value clearly.
- Evidence:
  - /aryavarta/v1-i1.md

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/aryavarta/v1-i1`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/being-indian`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/core-of-sanatana-dharma`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/hindu-institution-generate`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/hindu-renaissance`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/hindu-unity-and-diversity`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/modernity-and-hindu-values`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/new-indian-republic`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/practice-but-not-proven`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/what-will-destroy`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/big-questions/will-save-sanatana-dharma`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Title is short: "Blog | Bodha".

- Route: `/blog`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /blog/+page.svelte
  - /blog/+page.ts
  - src/routes/sitemap.xml/+server.ts

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/14-lokas-0-telescopes`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/ahoiashtami`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/artandmeaningmaking`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/artificialintelligence`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/artificialintelligencetwo`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/battleagainsthindusinmanipur`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/bharatiya-wanderlust-1`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/bharatiya-wanderlust-2`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/bharatiya-wanderlust-3`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/bodha-pyramid-of-priorities-nature-of-hindu-orgs`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/brahmacharini`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/chandraghanta`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/chath`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/civilizations-as-karmic-streams`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/cultureandwarfare`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/dasharajna1`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/dasharajna2`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/dasharajna3`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/decolonizationapersonalfootprint`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/decolonizinglanguage`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/dharmika-frame-for-sustainability-and-technology`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Title is short: "The Dhārmika Gene".

- Route: `/blog/dharmikagene`
- Category: `metadata`
- Patch available: yes
- Recommendation: Use a more specific title that names the page and search intent.
- Evidence:
  - /blog/dharmikagene.md

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/dharmikagene`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/difference-between-us`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/external-posts`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: route-file

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/four-aphorisms`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/fractalmandalaone`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/fractalmandalatwo`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/freedomofexpression`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/gloryofkrishnajanmashtami`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/grandhistoryone`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/hinduisminblindspot1`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/hinduisminblindspot2`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/historyvsitihasa`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/how-to-build-a-civilization`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/indiancivilizationalconsciousness`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/indicenvironmentalism`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/journey-with-anveshi`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/kalaratri`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

### [medium] Concrete local route/content page is not represented in sitemap sources.

- Route: `/blog/kannur-sacred-heart-of-kerala`
- Category: `sitemap`
- Patch available: no
- Recommendation: If this page should rank, add it to sitemap generation or make sure it appears in a sitemap-derived source.
- Evidence:
  - Sources: markdown

