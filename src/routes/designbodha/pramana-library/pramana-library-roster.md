# Pramana — Library Roster

**The full card map for review and lock-in before scaling.**

Six cards are written and calibrated. The remaining cards are listed below, grouped by the Sanskrit intellectual tradition they come from. Each entry gives the term, an English gloss, a one-line statement of what the card gives you that the existing English vocabulary does not, and the proposed applicability tags. A short rationale appears where the inclusion is borderline. A separate section at the close lists what was considered and cut, with reasoning, so the discrimination is visible.

Target: 30 cards in the locked roster, with 4 stretch candidates available if you want a fuller library. Both ranges sit inside the 30-to-40 zone we discussed.

---

## Organisation

Cards are grouped by tradition-register: **Nyaya** (logic and epistemology), **Yoga** (psychology and mental cultivation), **Mimamsa** (hermeneutics and the philosophy of language), **Vedanta** (cognition and first-order reality), **Vyakarana** (Sanskrit grammar and language structure), **Alankara-shastra** (poetics and communication design), and a small **Other** bucket for concepts that fall outside these schools but earn their place.

Two structural choices to lock before writing scales:

**Numbering scheme.** Option A: simple sequential (Card 01, Card 02, …, Card 30), order driven by tradition grouping. Option B: tradition-prefixed (N1, N2 for Nyaya; Y1, Y2 for Yoga; …), so a card's ID always tells you its school at a glance. Option A is cleaner for casual reading; Option B is more functional for cross-referencing. I would recommend Option B, but it is your call.

**File layout.** Option A: one master file (`pramana-library-master.md`) with all cards in tradition-grouped sections. Option B: one file per tradition, plus an index file. Option A is easier to read straight through; Option B is easier to maintain at scale and supports an eventual web-artifact migration. I would recommend Option A for the markdown stage and Option B if and when we move to a live web library later.

---

## Nyaya — Logic and epistemology

The school of inference and the theory of valid cognition. Seven cards, one written.

**N1. Vyapti** — *Necessary co-occurrence.* ✓ written
The discipline of testing whether a posited relation between two phenomena is invariable, or just statistical co-occurrence.
*Users · Builders · Stewards.*

**N2. Sapaksha / Vipaksha** — *Positive and negative instance sets.*
The structure of evidence in inference: where the thing-to-be-established is present, and where it is absent. Maps to training-data and counterfactual-test structure, with normative force the ML vocabulary lacks.
*Builders · Stewards.*

**N3. Pakshata** — *The locus of inference; the question at stake.*
The structural prior to any inference: what is at issue, where the question is anchored. Different from framing because it is about the metaphysical structure of inquiry, before any cognitive frame is applied.
*Users · Builders · Stewards.*

**N4. Satpratipaksha** — *Counterbalanced reasons.*
From the Nyaya taxonomy of inferential fallacies: the case where equally strong reasons support contrary conclusions. Has no clean Western counterpart; lands hard when evaluating AI outputs and competing model predictions.
*Builders · Stewards.*

**N5. Tarka** — *Reductio as test of inferential commitments.*
Hypothetical entailment: "if your claim held, then this absurdity would follow." Different from thought experiment because it operates as a method for testing the consistency of one's existing positions, not for exploring possibilities.
*Users · Builders · Stewards.*

**N6. Anupalabdhi** — *Non-perception as a means of knowledge.*
The cognitive structure by which absence becomes knowable. The Bhatta Mimamsakas and Advaitins accept it as an independent pramana. Directly relevant to AI's failure mode around negative knowledge and "I do not know."
*Users · Builders · Stewards.*

**N7. Shabda-pramana** — *Testimony as valid cognition.*
The Indian epistemology of trust in verbal sources, with criteria for when testimony is a pramana and when it fails. Foundational to AI evaluation, because much of what LLMs do is testimonial in structure.
*Users · Builders · Stewards.*

---

## Yoga — Psychology and mental cultivation

The classical Indian psychology of mental modes and afflictions. Five cards, two written.

**Y1. Avidya** — *Mistaking the constructed for the natural.* ✓ written
The root mis-cognition, the active mis-taking of the contingent as necessary.
*Users · Builders · Stewards.*

**Y2. Vikalpa** — *Cognition without object.* ✓ written
The cognitive event in which language generates a referentless representation.
*Users · Builders · Stewards.*

**Y3. Viparyaya** — *Mistaken cognition with a real referent.*
The partner concept to vikalpa: cognition that has a real object but tracks it wrongly. Discriminates "wrong-referent" failure from "no-referent" failure, with different operational fixes.
*Users · Builders · Stewards.*

**Y4. Samskara** — *Dispositional traces.*
The latent imprints left by experience that shape future cognition and action. Relevant to AI bias (training residues as disposition), to user habits, and to organisational pattern-lock.
*Builders · Stewards.*

**Y5. Asmita** — *The fusion of awareness with the instrument of cognition.*
The cognitive event of identifying the seer with the seen, the user with the interface, the self with the tool. Relevant to persona attachment, user-tool identity collapse, and AI mistaken for an agent.
*Users · Builders · Stewards.*

---

## Mimamsa — Hermeneutics and the philosophy of language

The school of textual interpretation and the analysis of injunction. Three cards, one written.

**M1. Arthapatti** — *Postulation from inexplicability.* ✓ written
The cognitive route by which an unstated fact is known through the requirement of coherence.
*Users · Builders · Stewards.*

**M2. Apaurusheyatva** — *Authorlessness as a feature of valid testimony.*
The Mimamsa claim that some testimony has no author and gains its authority precisely from this. Strangely relevant to LLM output, which is authorless in a specific technical sense; the Mimamsa framework gives you a vocabulary for what kind of authority such utterance can or cannot have.
*Users · Stewards.*

**M3. Vidhi / Nishedha** — *Injunction and prohibition as utterance-types.*
The Mimamsa typology of prescriptive utterances. Foundational to interface affordances, policy rules, content moderation, prompt instructions, and any utterance whose role is to direct action.
*Builders · Stewards.*

---

## Vedanta — Cognition and first-order reality

The school of non-duality and the analysis of error and reality. Four cards, none written.

**V1. Adhyasa** — *Superimposition as the structure of error.*
Sankara's analysis: error is not absence of knowledge, error is the live cognitive act of placing one thing on another (the rope is seen as a snake; the screen is seen as a person). Different from projection bias, which is motivational; adhyasa is structural.
*Users · Builders · Stewards.*

**V2. Sat-asat-anirvachaniya** — *Real, unreal, and indeterminable.*
The three-valued ontology of Advaita: the real (what cannot be sublated), the unreal (what is contradictory), and the indeterminable (what appears but cannot be settled either way). Directly relevant to the ontology of AI-generated objects, fictional characters, and the status of model outputs.
*Builders · Stewards.*

**V3. Anvaya-vyatireka** — *Positive and negative concomitance as method.*
The disciplined paired test: when X is present, Y is present; when X is absent, Y is absent. The method by which necessary connections are established. Different from causal inference because it is a method-of-establishment, not a statistical operation.
*Builders · Stewards.*

**V4. Vivarta and Parinama** — *Apparent transformation and real transformation.*
Two theories of change: vivarta is the appearance of change without underlying change (the rope appearing as a snake); parinama is genuine transformation (milk to yogurt). The distinction lets you ask of any observed change which kind it is.
*Builders · Stewards.*

---

## Vyakarana — Grammar and language structure

Sanskrit grammar, the most developed indigenous theory of language in any tradition. Four cards, one written.

**G1. Karaka** — *Semantic roles in action.* ✓ written
The six functional roles in any action: agent, object, instrument, recipient, source, locus.
*Users · Builders.*

**G2. Sphota** — *The gestalt unity of utterance.*
Bhartrhari's claim: meaning does not assemble from phonemes in sequence; it emerges as a whole, the utterance recognised as a unit. Relevant to how LLMs process meaning, to chunking in design, and to the gestalt-vs-sequential question in attention.
*Builders · Stewards.*

**G3. Lakshana** — *Secondary or indirect meaning.*
The technical Sanskrit theory of how words shift their reference under pressure — metaphor, metonymy, analogical extension. Tighter and more discriminating than the standard English vocabulary on figurative language.
*Builders · Stewards.*

**G4. Shaktigraha** — *The means by which word-meaning is grasped.*
The Sanskrit grammarians' enumeration of how a hearer learns what a word means: grammar, dictionary, statement of a knowledgeable person, syntactic context, paraphrase, vyavahara (observed usage), proximity to known terms, and direct ostension. A checklist for designing grounding strategies in AI systems and onboarding flows.
*Builders · Stewards.*

---

## Alankara-shastra — Poetics and communication design

The school of aesthetic theory and crafted utterance. Four cards, one written.

**A1. Dhvani** — *Meaning by resonance.* ✓ written
The level of meaning carried by suggestion, beyond denotation and indirect reference.
*Builders · Stewards.*

**A2. Rasa** — *Designed emotional response.*
The classical theory of the eight or nine aestheticised emotional states that craft can produce in a qualified receiver. Different from "feeling" because rasa is the artefact of the work, not the receiver's affect; designed and engineered, not elicited.
*Builders · Stewards.*

**A3. Vakrokti** — *Oblique expression as aesthetic principle.*
Kuntaka's claim: communication that exhibits craft requires curvature, a turning-away from the direct statement. Relevant to AI tone, brand voice, UX writing, and any place where literal communication produces flat reception.
*Builders · Stewards.*

**A4. Sahridaya** — *The qualified receiver as design constraint.*
The Alankara concept of the "co-hearted" — the receiver who can complete the aesthetic act. Different from "user persona" because sahridaya is normative (this is the receiver the work assumes), where persona is descriptive (these are users we have observed).
*Builders · Stewards.*

---

## Other — Concepts outside the six major schools

Cards drawn from broader Indic frames — Ayurveda's psychology, the purusharthas, and similar — that earn inclusion. Three cards, none written.

**O1. Trigunas** — *Sattva, rajas, tamas as modes of mental tone.*
The Sankhya-Ayurveda theory of three psychological-functional modes: clarity, agitation, inertia. Different from arousal-and-valence models because the trigunas are tonal qualities of the mind, not affect dimensions.
*Users · Stewards.*

**O2. Prajnaparadha** — *Willful transgression against wisdom.*
The Ayurvedic concept of the deliberate violation of what one knows to be wise. Diagnostic, not just descriptive; different from akrasia because it carries volitional structure and locates the failure precisely.
*Users · Stewards.*

**O3. Purusharthas** — *The four aims as a framework for designing for human flourishing.*
Artha (security and resources), kama (desire and pleasure), dharma (alignment with role and right), moksha (release). A framework for designing products that address the full range of legitimate human ends, where "needs" or "jobs-to-be-done" thin the question.
*Stewards.*

---

## Stretch candidates

If you want a fuller library (in the 32–34 range), four additional cards could land:

**S1. Pramana taxonomy** — meta-card framing the six means of valid cognition as a system; functions as an orientation card for the Nyaya, Mimamsa, and Vedanta sections.

**S2. Vrittis as a system** — meta-card framing the five modes of mental activity in Yoga; functions as an orientation card for the Yoga section.

**S3. Drik-drishya** — *The seer-and-the-seen distinction.* The Sankhya-Yoga structural separation of the witness from what is witnessed. Relevant to agent-environment loops, to the design of AI assistants that observe vs act, and to the question of where in a system "noticing" happens.

**S4. Akhyata and Nama** — *The verb as the heart of language.* The Vyakarana claim that the verb organises the sentence, against the noun-centric assumption of much European linguistics. Relevant to how prompts and instructions should be structured around action rather than entity.

---

## Considered and cut

Concepts that were considered and dropped, with reasoning. Listed so the discrimination is visible and you can pull any of these back if you disagree.

**Smriti** (memory, as a *pramana*). Cut because the English term "memory" does the same work in practice; the card would only rename.

**Pratyaksha** (perception, as a *pramana*). Cut for the same reason — "perception" is well-served in English. The technical Indian theory has nuances, but they do not yield a meeting-room move that the English word fails to support.

**Maya** (the Vedantic principle of cosmic appearance). Cut because the term is heavily loaded with new-age and theological connotations that would force the "ancient wisdom" register the library is specifically refusing.

**Brahman, Atman, Moksha** (Vedantic ultimate categories). Cut because these are religious-metaphysical concepts, not operational analytic tools, and trying to make them operational at this level would distort them.

**Saguna / Nirguna** (with-attributes / without-attributes). Cut for the same reason as maya — too theologically loaded to land as a field tool.

**Shadgunya** (the six measures of statecraft). Cut because the political-strategic register is far from the AI-and-design use case the library is aimed at; would belong in a different library.

**Mandala** (the geopolitical concentric-circle theory). Cut for the same reason as shadgunya.

**Niyoga vs Bhavana** (Mimamsa theories of prescriptive force). Cut because the distinction is too technical and the operational lever is already covered by the broader *vidhi / nishedha* card.

**Pratyabhijna** (Abhinavagupta's category of recognition). Cut because the concept does real work in Kashmir Shaiva metaphysics but the operational lever for design and AI work is thin.

**Anubhava / Vibhava / Vyabhicari-bhava** (the engineering of *rasa*). Cut because these are the internal structure of *rasa*; mentioning them in the rasa card is enough.

**Padartha** (the categories of word-meaning). Cut because the Vaisheshika treatment is foundational philosophy but the operational lever is thin; the work it does is mostly already covered by *karaka* and *lakshana*.

**Anyathasiddhi and Upadhi** (Nyaya: the otherwise-established factor, and the spurious qualifier). Held inside the *vyapti* card rather than broken out, because they only do their work as moves within the vyapti test; standalone cards would feel partial.

---

## What I need from you before the writing phase starts

Three locks:

— **Roster confirmation.** Approve, edit, cut, or add to the 30-card roster. Comment in the doc, or just tell me the changes.

— **Numbering and file layout.** Option A or B on each. My recommendation is tradition-prefixed numbering (N1, Y1, M1…) and a single master file for the markdown stage.

— **Stretch range.** Lock to 30 cards, or take 32–34 by selecting one to all four stretch candidates.

Once those three are locked, I will unify v2 and v3 into the master file with the existing six cards under their new tradition-anchored IDs, and start writing batch one — likely the rest of Nyaya, since that is the largest section and the most internally referenced.
