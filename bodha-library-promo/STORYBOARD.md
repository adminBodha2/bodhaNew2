# Storyboard

**Format:** 1920x1080 landscape
**Audio:** TTS voiceover + soft tanpura-like pad + paper, chime, and card movement SFX
**VO direction:** calm, intelligent, research-guide tone; conversational but serious; pauses after each key phrase
**Style basis:** DESIGN.md, captured website screenshots, and `capture/assets/key-bol.webp`

## Asset Audit

| Asset | Type | Assign to Beat | Role |
| --- | --- | --- | --- |
| `capture/assets/key-bol.webp` | Hero image | Beats 1 and 5 | Full-bleed illustrated cultural world; opener and closer |
| `capture/screenshots/scroll-020.png` | Page screenshot | Beat 2 | Category grid proof: counts and collection structure |
| `capture/screenshots/scroll-040.png` | Page screenshot | Beat 3 | Curated reading paths grid |
| `capture/screenshots/scroll-060.png` | Page screenshot | Beat 4 | Bharata1000 category field |
| `capture/screenshots/scroll-079.png` | Page screenshot | Beat 4 | External resource grid and deep blue footer |
| `capture/assets/svgs/svelte-1kaph8v.svg` | Logo mark | Beats 1 and 5 | Small Bodha mark accent |
| `capture/assets/svgs/search-svg.svg` | Icon | Beat 2 | Search/discovery accent |

## Beat 1 - Map, Not Scatter (0.00-5.80s)

**VO cue:** "What if learning Hindu civilization didn't begin with scattered links, but with a map?"

**Concept:** The video opens inside the illustrated world of the library page. The camera glides across the temple, books, lamp, and reader before a clean white editorial title surface rises over it. The hook reframes the library as orientation, not just collection.

**Visual description:** `key-bol.webp` fills the frame with a slow Ken Burns push. Thin blue route lines draw over the image like study paths. Small white paper slips labeled "History", "Darshanas", "Scripture", and "IKS" drift into a loose constellation. The title "A map for Hindu civilization" lands in Source Serif 4 over a warm paper panel. A small Bodha mark sits near the lower edge.

**Animation choreography:** Hero image pushes slowly; blue lines draw left-to-right; paper slips rise and settle; title slides up with a soft scale; Bodha mark fades in.

**Transition:** Bright paper wipe upward into the website category grid.

## Beat 2 - The Open Library (5.80-13.60s)

**VO cue:** "Bodha Open Library gathers more than two hundred readings across Hindu culture, history, darshanas, Indian knowledge systems, scripture, archaeology, and civilizational critique."

**Concept:** The viewer now sees the product structure: a serious reading library with real categories and counts. The scene feels like a catalog coming into focus.

**Visual description:** The captured category grid is recreated as clean cards over a white background. Counters count up to 10, 103, 39, 18, 30, 20, 21, and 41. Category titles cascade into place: Essentials, Aryan Issue, Darshanas, Indian Knowledge Systems, Scriptural, Shatrubodha, Svayambodha, Indian Archaeology. A large "200+ readings" figure anchors the left side while a search icon scans across the grid.

**Animation choreography:** Cards cascade in rows; numbers count up; category descriptions fade from gray to black; blue search ring sweeps once; "200+ readings" expands from 92% to 100%.

**Transition:** Blue arrow streak pulls the camera into the reading path grid.

## Beat 3 - Reading Paths (13.60-21.20s)

**VO cue:** "Browse by category, follow curated reading paths, or use Bharata one thousand: a structured list of one thousand books arranged into serious study lanes."

**Concept:** The library becomes a study map. Topic cards and Bharata1000 chips organize the huge field of texts into lanes that a reader can actually follow.

**Visual description:** Reading path cards slide in from the left: Arts, Darshanas, Dharma, Hinduism Overview, History, Indian Knowledge Systems, Sanskrit, Puranic, Vedic and Upanishadic. Then the camera drops into a dense field of Bharata1000 chips, where "Ancient Indian History", "Sanskrit Grammar", "The Six Darshanas", "Vedanta", and "The Itihasas" light up in sequence. A thin label reads "1,000-book study map".

**Animation choreography:** Topic cards cascade with subtle paper depth; selected cards receive blue underline draws; Bharata1000 chips flow in rows; five chips pulse in sequence; the "1,000" counter counts up rapidly.

**Transition:** Soft blur-through into external resources and reader outcome.

## Beat 4 - From Curiosity To Depth (21.20-28.80s)

**VO cue:** "It helps readers move from curiosity to depth, with public-domain texts, journal issues, and trusted external resources in one place."

**Concept:** This beat explains usefulness: the page is a guided gateway from first question to serious study. It connects internal public-domain texts, archaeology journal issues, and outside research repositories.

**Visual description:** A path line travels from "Curiosity" on the left to "Depth" on the right. Along it, cards appear for "Public-domain texts", "41 archaeology journal issues", "GRETIL", "Digital Corpus of Sanskrit", "Shodh Ganga", and "Archive.org". The background briefly reveals the captured external resource grid, softened behind the motion layer.

**Animation choreography:** Path line draws; cards pop on along the path; "41" counts up; resource arrows draw; background screenshot slowly pans upward; final path endpoint glows blue.

**Transition:** The blue endpoint expands into a deep blue closing surface.

## Beat 5 - Direction (28.80-34.80s)

**VO cue:** "Bodha Open Library. Start reading with direction."

**Concept:** The final frame returns to the hero image and brand. It should feel calm, resolved, and scholarly: a reader has somewhere to begin.

**Visual description:** Deep blue footer texture fills the frame with a warm cropped slice of the hero illustration in the upper half. The Bodha mark and "Bodha Open Library" appear centered. Below it: "Start reading with direction" and the URL `bodharesearch.in/library`. Three small chips settle beneath: "Categories", "Reading paths", "Bharata1000".

**Animation choreography:** Deep blue background wipes in; hero crop drifts; logo scales gently into place; URL types on; chips settle with a soft stagger; final frame holds.

**Transition:** Final fade to deep blue.

## Production Architecture

```
bodha-library-promo/
├── index.html
├── DESIGN.md
├── SCRIPT.md
├── STORYBOARD.md
├── narration.txt
├── narration.wav
├── transcript.json
├── capture/
│   ├── screenshots/
│   ├── assets/
│   └── extracted/
├── hyperframes.json
├── meta.json
└── package.json
```
