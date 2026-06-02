---
id: N1
slug: pramana-taxonomy
title: "Orientation to Valid Cognition"
sanskrit:
  transliteration: "pramāṇa-vichāra"
  devanagari: "प्रमाणविचार"
register:
  tradition: Nyaya
  text: "Nyaya, Mimamsa, and the broader Indian epistemological tradition. Treated systematically across schools, with variation in how many *pramāṇa*s each accepts. Root reference: Nyaya-sutra 1.1.3, with later elaboration across the schools."
applicability:
  - Users
  - Builders
  - Stewards
cross_refs:
  - M1
  - N2
  - N7
  - N8
gist: |
  Not all knowledge has the same shape. The Indian epistemological tradition maps six distinct routes by which a knowledge claim can be valid, each with its own structure and its own failure modes. Knowing which route is in play sharpens what you are doing.
question: By which route is this claim being made - and have the conditions for that route to be valid actually been met?
---

The Indian philosophical schools asked a question Western epistemology has largely left unformed: not "what do you know?" but "by which route did you come to know it?" *Pramana*-vichara is the systematic answer - a mapping of the distinct cognitive routes that produce valid knowing, each with its own conditions, each with its own characteristic failure modes. Different schools accept different numbers, but the operational gain is the same in each: instead of treating "evidence" as a uniform category, you locate any knowledge claim inside a specific cognitive structure and ask whether the conditions for that structure are actually met.

The six routes the Mimamsakas accept, which together cover the bulk of the territory:

*Pratyaksha* - direct cognition through the senses, when the object is present and the perceptual conditions hold.

*Anumana* - cognition grounded in pervasion: wherever smoke is, fire is; smoke is here; fire, therefore, is here.

*Upamana* - cognition by recognized similarity: knowing what a gavaya (wild ox) is by being told "it is like a cow," then seeing one. Different from inference because it rests on resemblance, not on pervasion.

*Shabda* - cognition from a reliable verbal source. See N8.

*Arthapatti* - cognition forced by the requirement of coherence: an observation that cannot stand alone implies an unobserved fact. See M1.

*Anupalabdhi* - cognition of absence in a context where the absent thing would have been perceived if present. See N7.

Each pramana has validity conditions. Each has failure modes. A claim that looks like one pramana but is actually another - or one whose conditions are not actually met - is a failure waiting to be named. The taxonomy makes the failure visible.

## Where English Falls Short

Western epistemology has worked at particular pramanas - perception, inference, testimony - at varying levels of technical depth. What it has never produced is a unified taxonomy of cognitive routes. "Evidence" or "justification" in the English tradition is typically a uniform category; the question is how strong the evidence is. The Indian question is prior: what kind of cognitive route produced this knowledge claim, and are that route's conditions met? The Indian frame is more discriminating at the input layer.

The practical consequence surfaces everywhere in design and AI work. A model that hallucinates a citation is doing one kind of failed cognition. A model that misperceives an image is doing another. A model that postulates a hidden state to explain an observation is doing a third. Without the taxonomy, all three collapse into "hallucination." With it, you see three different problems requiring three different fixes.

## Where it Shows Up

**AI evaluation.** Most evaluation frameworks treat model output as a uniform category and ask "is it right?" The pramana frame asks first: which cognitive route is the model claiming to use? Pratyaksha (interpreting an image)? Anumana (reasoning)? Shabda (reporting what a source said)? Arthapatti (filling in an unstated fact)? Each route has different validity conditions, and "is it right?" decomposes differently for each.

**Research methodology.** When summarising findings, ask: by which pramana is each claim known? A claim resting on direct measurement, a claim resting on inference from correlation, and a claim resting on testimony from interviewees are not interchangeable - even when they appear in the same paragraph.

**Decision-making under uncertainty.** When teams disagree, the disagreement is often at the pramana level, not the data level. One side is reasoning by anumana, another by shabda, a third by arthapatti. Naming which route is in play unsticks the conversation faster than relitigating the data.

**Auditing knowledge claims in product strategy.** "Users want X" - by which route is this known? Survey testimony, observed behaviour, postulation from coherence with other facts, inference from comparable products? The answer changes how much weight the claim can actually bear.

**Designing trust systems.** Any system that propagates claims - citation networks, AI-generated summaries, knowledge graphs - implicitly takes a position on which pramanas its content is resting on. Making this explicit lets you design appropriate validation for each route.

## IKS Roots

The Sanskrit term is *pramana* (प्रमाण), literally "the means by which *prama* - valid cognition - is produced," from the root *ma* (to measure, to know) with the prefix *pra* (forward, out). The schools differ on how many pramanas they accept. The Charvaka (the materialist school) accepts only pratyaksha. Vaisheshika accepts pratyaksha and anumana. Nyaya accepts four: pratyaksha, anumana, upamana, shabda. Mimamsa (Bhatta school) accepts all six listed here; Advaita Vedanta follows Bhatta Mimamsa. The disputes between schools about which pramanas are actually independent - and which reduce to others - are themselves a major branch of Indian epistemology. Nyaya's argument that arthapatti reduces to anumana, and Mimamsa's response, is the canonical example. These are not merely definitional quarrels; the position a school takes on the number of pramanas carries consequences for its entire account of how knowledge is possible.

See N2 (vyapti - the relation that grounds inference), N7 (anupalabdhi - non-perception), N8 (shabda - testimony), and M1 (arthapatti - postulation) for the individual pramanas the library treats in depth.

## Further Reading

Bimal Krishna Matilal, *Perception: An Essay on Classical Indian Theories of Knowledge* (Oxford), for the canonical scholarly treatment. Stephen Phillips, *Epistemology in Classical India*, for an accessible entry. The Karl Potter *Encyclopedia of Indian Philosophies* volumes on Nyaya and Mimamsa for technical depth on individual schools.
