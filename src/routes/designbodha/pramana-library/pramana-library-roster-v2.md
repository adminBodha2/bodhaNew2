# Pramana — Library Roster (v2, locked)

**The full card map, locked, ready for the writing phase.**

Six cards are written and calibrated. Twenty-six remain to write. Three structural locks are in place:

- **English-led card titles.** Each card's H1 is its English gloss ("Necessary co-occurrence," "Cognition without object"). The Sanskrit term sits underneath as a subtitle ("*Sanskrit: vyāpti (व्याप्ति)*"). Same logic as keeping Sanskrit out of card bodies — the entry-point should not gate the card on prior Sanskrit familiarity.
- **Tradition-prefixed IDs.** N for Nyaya, Y for Yoga, M for Mimamsa, V for Vedanta, G for Vyakarana (grammar), A for Alankara-shastra, O for the small "other" bucket. So a card's ID always tells you its school at a glance.
- **File per card.** Each card lives in `cards/IDX-term.md` (e.g. `cards/N2-vyapti.md`). A master index file (`pramana-library-index.md`) gives navigation across the set.

---

## What changed from roster v1

- *Apaurusheyatva* (M2 in v1) **cut**. In Mimamsa the term has a specific doctrinal reference — the authorlessness of *śruti*, the Vedas. Pulling it into AI discourse would be appropriative and sloppy. The Mimamsa section is now two cards (M1 *Arthapatti*, M2 *Vidhi/Nishedha*).
- The four v1 "stretch" candidates re-evaluated on pure salience.
  - **Promoted to main roster:** Pramana taxonomy (now N1), Vrittis as a system (now Y1), Drik-drishya (now Y7).
  - **Cut:** Akhyata-and-Nama — operationally duplicative with karaka.
- Net count: **32 cards** in the locked roster.

---

## The locked roster, 32 cards

### Nyaya — Logic and epistemology (8 cards)

**N1. Orientation to valid cognition** *(Sanskrit: pramāṇa-vichāra)* — Framing card. Six distinct routes to knowing: perception, inference, comparison, testimony, postulation, and non-perception, each with its own structure. *Users · Builders · Stewards.*

**N2. Necessary co-occurrence** *(Sanskrit: vyāpti)* ✓ written — Testing whether a posited relation is invariable, or just statistical co-occurrence. *Users · Builders · Stewards.*

**N3. Positive and negative instance sets** *(Sanskrit: sapakṣa / vipakṣa)* — The structure of evidence in inference. Where the thing-to-be-established is present, and where it is absent. Maps onto training data and counterfactual-test structure, with normative force the ML vocabulary lacks. *Builders · Stewards.*

**N4. The locus of inference** *(Sanskrit: pakṣatā)* — The structural prior to any inference: what is at issue, where the question is anchored. Different from framing because it is metaphysical, not psychological. *Users · Builders · Stewards.*

**N5. Counterbalanced reasons** *(Sanskrit: satpratipakṣa)* — From the Nyaya taxonomy of inferential failures: the case where equally strong reasons support contrary conclusions. No clean Western counterpart; lands when evaluating AI outputs and competing predictions. *Builders · Stewards.*

**N6. Reductio as test of commitments** *(Sanskrit: tarka)* — "If your claim held, then this absurdity would follow." A test of consistency with what one already accepts, separate from thought-experiment-as-exploration. *Users · Builders · Stewards.*

**N7. Non-perception as knowledge** *(Sanskrit: anupalabdhi)* — The cognitive structure by which absence becomes knowable. Accepted as an independent pramana by the Bhatta Mimamsakas and Advaitins. Directly relevant to AI's failure mode around negative knowledge. *Users · Builders · Stewards.*

**N8. Testimony as a means of knowing** *(Sanskrit: śabda)* — The Indian epistemology of trust in verbal sources, with criteria for when testimony is a pramana and when it fails. Foundational to AI evaluation, because much of what LLMs do is testimonial in structure. *Users · Builders · Stewards.*

### Yoga — Psychology and mental cultivation (7 cards)

**Y1. The five modes of mental activity** *(Sanskrit: pañca-vṛtti)* — Framing card. Yoga's mapping of the mind into five distinct kinds of activity: valid cognition, mistaken cognition, cognition without object, sleep, and memory. Each card downstream sits inside this map. *Users · Builders · Stewards.*

**Y2. Cognition without object** *(Sanskrit: vikalpa)* ✓ written — The cognitive event in which language generates a referentless representation. *Users · Builders · Stewards.*

**Y3. Mistaken cognition with a real referent** *(Sanskrit: viparyaya)* — The partner to vikalpa: cognition that has a real object but tracks it wrongly. Discriminates "wrong-referent" failure from "no-referent" failure, with different operational fixes. *Users · Builders · Stewards.*

**Y4. Mistaking the constructed for the natural** *(Sanskrit: avidyā)* ✓ written — The root mis-cognition; the active mis-taking of the contingent as necessary. *Users · Builders · Stewards.*

**Y5. The fusion of awareness with the instrument** *(Sanskrit: asmitā)* — The cognitive event of identifying the seer with the seen, the user with the interface, the self with the tool. Relevant to persona attachment, user-tool identity collapse, AI mistaken for an agent. *Users · Builders · Stewards.*

**Y6. Dispositional traces** *(Sanskrit: saṁskāra)* — The latent imprints left by experience that shape future cognition and action. Maps onto AI training residues, user habit-formation, and organisational pattern-lock. *Builders · Stewards.*

**Y7. The seer and the seen** *(Sanskrit: dṛk / dṛśya)* — The Sankhya-Yoga structural separation of the witness from what is witnessed. Relevant to agent-environment loops, to where in a system "noticing" happens, and to AI designed to observe vs to act. *Builders · Stewards.*

### Mimamsa — Hermeneutics and the philosophy of language (2 cards)

**M1. Postulation from inexplicability** *(Sanskrit: arthāpatti)* ✓ written — The cognitive route by which an unstated fact is known through the requirement of coherence. *Users · Builders · Stewards.*

**M2. Injunction and prohibition as utterance-types** *(Sanskrit: vidhi / niṣedha)* — The Mimamsa typology of prescriptive utterances. Foundational to interface affordances, policy rules, content moderation, prompt instructions, and any utterance whose role is to direct action. *Builders · Stewards.*

### Vedanta — Cognition and first-order reality (4 cards)

**V1. Superimposition as the structure of error** *(Sanskrit: adhyāsa)* — Sankara's analysis: error is not motivational; it is the active placement of one thing on another (the rope is seen as a snake; the screen is seen as a person). Different from projection bias, which is motivated; this is structural. *Users · Builders · Stewards.*

**V2. Real, unreal, and indeterminable** *(Sanskrit: sat / asat / anirvachanīya)* — The three-valued ontology of Advaita. The real (what cannot be sublated), the unreal (what is contradictory), and the indeterminable (what appears but cannot be settled either way). Directly relevant to the ontology of AI-generated objects, fictional characters, and the status of model outputs. *Builders · Stewards.*

**V3. Positive and negative concomitance as method** *(Sanskrit: anvaya-vyatireka)* — The disciplined paired test: when X is present Y is present; when X is absent Y is absent. The method by which necessary connections are established. Different from statistical causal inference because it is a method-of-establishment, not a quantification. *Builders · Stewards.*

**V4. Apparent and real transformation** *(Sanskrit: vivarta / pariṇāma)* — Two theories of change. *Vivarta* is the appearance of change without underlying change (the rope appearing as a snake). *Pariṇāma* is genuine transformation (milk to yogurt). The distinction lets you ask of any observed change which kind it is. *Builders · Stewards.*

### Vyakarana — Grammar and language structure (4 cards)

**G1. Semantic roles in action** *(Sanskrit: kāraka)* ✓ written — The six functional roles in any action: agent, object, instrument, recipient, source, locus. *Users · Builders.*

**G2. The gestalt unity of utterance** *(Sanskrit: sphoṭa)* — Bhartrhari's claim: meaning emerges as a whole, the utterance recognised as a unit. Relevant to how LLMs process meaning, to chunking in design, and to the gestalt-vs-sequential question in attention. *Builders · Stewards.*

**G3. Secondary or indirect meaning** *(Sanskrit: lakṣaṇā)* — The technical Sanskrit theory of how words shift their reference under pressure — metaphor, metonymy, analogical extension. Tighter than the standard English vocabulary on figurative language. *Builders · Stewards.*

**G4. The means by which meaning is grasped** *(Sanskrit: śaktigraha)* — The enumeration of how a hearer learns what a word means: grammar, dictionary, statement of a knowledgeable person, syntactic context, paraphrase, observed usage, proximity to known terms, ostension. A checklist for designing grounding strategies in AI systems and onboarding flows. *Builders · Stewards.*

### Alankara-shastra — Poetics and communication design (4 cards)

**A1. Meaning by resonance** *(Sanskrit: dhvani)* ✓ written — The level of meaning carried by suggestion, beyond denotation and indirect reference. *Builders · Stewards.*

**A2. Designed emotional response** *(Sanskrit: rasa)* — The classical theory of the eight or nine aestheticised emotional states that craft can produce in a qualified receiver. *Rasa* is the artefact of the work, designed and engineered; "feeling" is the receiver's affect. The card names what the design is producing. *Builders · Stewards.*

**A3. Oblique expression as aesthetic principle** *(Sanskrit: vakrokti)* — Kuntaka's claim: communication that exhibits craft requires curvature, a turning-away from the direct statement. Relevant to AI tone, brand voice, UX writing, and any place where literal communication produces flat reception. *Builders · Stewards.*

**A4. The qualified receiver as design constraint** *(Sanskrit: sahṛdaya)* — The Alankara concept of the "co-hearted" — the receiver who can complete the aesthetic act. Different from user persona because sahridaya is normative (this is the receiver the work assumes), where persona is descriptive (these are users we have observed). *Builders · Stewards.*

### Other — Outside the six major schools (3 cards)

**O1. Modes of mental tone** *(Sanskrit: triguṇa — sattva, rajas, tamas)* — The Sankhya-Ayurveda theory of three psychological-functional modes: clarity, agitation, inertia. The trigunas are tonal qualities of the mind, distinct from arousal-and-valence affect dimensions. *Users · Stewards.*

**O2. Willful transgression against wisdom** *(Sanskrit: prajñāparādha)* — The Ayurvedic concept of deliberate violation of what one knows to be wise. Diagnostic, not just descriptive; different from akrasia because it carries volitional structure and locates the failure precisely. *Users · Stewards.*

**O3. The four aims as a frame for human flourishing** *(Sanskrit: puruṣārtha)* — *Artha* (security and resources), *kama* (desire and pleasure), *dharma* (alignment with role and right), *moksha* (release). A framework for designing products that address the full range of legitimate human ends. *Stewards.*

---

## What is locked, what is open

**Locked:** the 32-card roster, the English-led title structure, tradition-prefixed IDs, file-per-card layout, the cut of *apaurusheyatva*.

**Open and decidable later:** whether to migrate to a live web library after the markdown phase; whether to add cross-references between cards (e.g., Y3 *viparyaya* pointing to Y2 *vikalpa*); whether to produce a printable version once the cards are stable.

---

## Writing path from here

1. Migrate the six existing cards into the `cards/` subdirectory under their new IDs and English titles. (Mechanical rewrite.)
2. Set up `pramana-library-index.md` as the navigation hub.
3. Batch one: the rest of Nyaya — N1 (orientation), N3, N4, N5, N6, N7, N8. Seven cards.
4. Batch two: the rest of Yoga — Y1, Y3, Y5, Y6, Y7. Five cards.
5. Batch three: rest of Mimamsa and all of Vedanta — M2, V1, V2, V3, V4. Five cards.
6. Batch four: rest of Vyakarana and all of Alankara-shastra — G2, G3, G4, A2, A3, A4. Six cards.
7. Batch five: the Other section — O1, O2, O3. Three cards.
8. Final polish pass: voice ("not X but Y" sweep), Sanskrit transliteration consistency, cross-references, redundancy check.

After each batch, a calibration check — does the format still hold, does the section read as a coherent set, anything that needs adjustment before the next batch.
