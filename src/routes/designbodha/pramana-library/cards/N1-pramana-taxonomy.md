---
id: N1
slug: pramana-taxonomy
title: "Orientation to valid cognition"
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
---

# Orientation to valid cognition

*Sanskrit: pramāṇa-vichāra (प्रमाणविचार)*

## What it is

The Indian schools converged on a question Western epistemology has tended to leave loose: when someone says they know something, by which cognitive route did they come to know it? *Pramāṇa*-theory is the answer — the systematic mapping of the distinct routes that produce valid cognition. Different schools accept different numbers, but the operational gain is the same in each: instead of treating "evidence" as a uniform category, you can locate any knowledge claim within a specific cognitive structure and ask whether the conditions for that structure are met.

The six routes that the Mimamsakas accept, and which between them cover the bulk of the territory:

**Perception** (*pratyakṣa*) — direct cognition through the senses, when the object is present and the perceptual conditions are right.

**Inference** (*anumāna*) — cognition grounded in pervasion (see N2): "wherever smoke is, fire is; smoke is here; therefore fire is here."

**Comparison** (*upamāna*) — cognition by similarity: knowing what a *gavaya* (wild ox) is by being told "it is like a cow," and then seeing one. Different from inference because it does not rest on pervasion.

**Testimony** (*śabda*) — cognition from a reliable verbal source. See N8.

**Postulation** (*arthāpatti*) — cognition forced by the requirement of coherence: an observation that cannot stand on its own implies an unobserved fact. See M1.

**Non-perception** (*anupalabdhi*) — cognition of absence in a context where the absent thing would have been perceived if present. See N7.

Each *pramāṇa* has its own validity conditions, its own characteristic failure modes, and its own typical operational use. A knowledge claim that looks like one *pramāṇa* but is actually another — or one whose conditions are not actually met — is a failure waiting to be named.

## Where English falls short

Western epistemology has worked out particular *pramāṇa*s — perception, inference, testimony — at varying levels of detail, but it has not produced a unified taxonomy of cognitive routes the way the Indian schools did. "Evidence" or "justification" in English-language epistemology is typically treated as a uniform category, with the work being to ask "how strong is the evidence." The Indian question is different: what kind of cognitive route produced this knowledge claim, and are its conditions met? The Indian frame is more discriminating at the input layer.

The practical consequence is that English-language design and AI work conflates routes that the Indian frame keeps apart. A model that hallucinates a citation is doing one kind of failed cognition; a model that misperceives an image is doing another; a model that postulates a hidden state to explain an observation is doing a third. The taxonomy lets you see these as different problems with different fixes.

## Where it shows up

**AI evaluation.** Most evaluation frameworks treat model output as a uniform category and ask "is it right?" The *pramāṇa* frame asks first: which cognitive route is the model claiming to use? Perception (interpreting an image)? Inference (reasoning)? Testimony (reporting what a source said)? Postulation (filling in an unstated fact)? Each route has different validity conditions, and "is it right?" decomposes into different questions for each.

**Research methodology.** When summarising findings, ask: by which *pramāṇa* is each claim known? A claim resting on direct measurement, a claim resting on inference from correlation, and a claim resting on testimony from interviewees are not interchangeable, even when they appear in the same paragraph.

**Decision-making under uncertainty.** When teams disagree on a question, the disagreement is often at the *pramāṇa* level; the data level is downstream. One side is reasoning by inference, the other by testimony, the third by postulation. Naming which route is in play unsticks the conversation.

**Auditing knowledge claims in product strategy.** "Users want X" — by which route is this known? Survey testimony, observed behaviour (perception), postulation from coherence with other facts, inference from comparable products? The answer changes how much weight the claim can bear.

**Designing trust systems.** Any system that propagates claims (citation networks, AI-generated summaries, knowledge graphs) implicitly takes a position on which *pramāṇa*s its content is resting on. Making this explicit lets you design appropriate validation for each route.

## Diagnostic question

*"By which *pramāṇa* is this claim being made — and have the conditions for that route to be valid actually been met?"*

## Indic roots

The Sanskrit term is *pramāṇa* (प्रमाण), literally "the means by which *pramā* — valid cognition — is produced." The schools differ on how many *pramāṇa*s they accept. Charvaka (the materialist school) accepts only *pratyakṣa*. Vaisheshika accepts *pratyakṣa* and *anumāna*. Nyaya accepts four: *pratyakṣa*, *anumāna*, *upamāna*, *śabda*. Mimamsa (Bhatta) accepts all six listed above. Advaita Vedanta follows Bhatta Mimamsa. The disputes between schools about which *pramāṇa*s are independent (and which can be reduced to others) are themselves a major part of Indian epistemology — Nyaya's argument that *arthāpatti* reduces to *anumāna*, and Mimamsa's response, is the canonical example.

See N2 (*vyāpti* — the relation that grounds inference), N7 (*anupalabdhi* — non-perception), N8 (*śabda* — testimony), and M1 (*arthāpatti* — postulation) for the individual *pramāṇa*s the library treats in depth.

## Further reading

Bimal Krishna Matilal, *Perception: An Essay on Classical Indian Theories of Knowledge* (Oxford), for the canonical scholarly treatment. Stephen Phillips, *Epistemology in Classical India*, for an accessible entry. The Karl Potter *Encyclopedia of Indian Philosophies* volumes on Nyaya and Mimamsa for technical depth on individual schools.
