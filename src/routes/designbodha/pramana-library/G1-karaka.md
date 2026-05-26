---
id: G1
slug: karaka
title: "Semantic Roles in Action"
sanskrit:
  transliteration: "kāraka"
  devanagari: "कारक"
register:
  tradition: Vyakarana
  text: "Vyakarana — Sanskrit grammar. Root text: Panini's *Aṣṭādhyāyī* (4th c. BCE), book 1.4."
applicability:
  - Users
  - Builders
cross_refs:
  - G3
  - G4
gist: |
  Every action involves a small number of distinct roles — agent, object, instrument, recipient, source, locus. Many design and communication failures are failures to keep these straight.
---

The grammarian Panini, working in the fourth century BCE, set out a tight theory of how participants relate to actions. There are six roles — the *kāraka*s — defined by their function in the structure of the action denoted by the verb.

The agent — the participant that acts independently. The object — the participant most affected by the action. The instrument — the means by which the action is accomplished. The recipient — the one for whose benefit the action is done. The source — that from which something proceeds or is separated. The locus — the place, time, or circumstance in which the action occurs.

The six are functional categories, distinct from grammatical ones. They are roles in the action-structure of the world, regardless of what surface form a sentence gives them. A sentence may make any of them grammatical subject, depending on emphasis and voice; that is a matter of case-ending, a separate layer. The *kāraka*s live a level deeper, in the structure of the event itself.

The discriminations are sharp. The instrument is what you do something with. The recipient is the one for whose sake you do it. The source is that from which something proceeds, including a state of being you are leaving. The locus is broad — spatial, temporal, conditional, situational. A given sentence will instantiate some of these and not others, and the discipline is to ask which.

## Where English Falls Short

Modern linguistics has thematic roles — agent, patient, instrument, beneficiary, source, location — descended in part from Panini, often through Fillmore's case grammar. So the concept exists in the English-language vocabulary. The trouble is operational: most practitioners use a smaller, fuzzier set in practice ("subject, object, indirect object") and lose the discriminating force of the six-category grid. The Sanskrit grammarians treated the discriminations as the point.

The instrument-recipient distinction in particular is sharply drawn in *kāraka* analysis and routinely conflated in English design and prompt writing. The other gap is the locus — *adhikaraṇa* — which covers spatial, temporal, and circumstantial ground together. Many English-language frameworks have no clean single term for this; the Sanskrit category is more inclusive and consequently more useful when designing structured inputs.

## Where it Shows Up

**Prompt design.** Most prompts producing uneven output have a *kāraka* problem. "Write me a poem using simple language for my five-year-old" — the instrument (simple language) and the recipient (the five-year-old) sit ambiguously, and disambiguation often improves the output. Explicit *kāraka* structure in a prompt — naming agent, object, instrument, recipient, source, locus where applicable — sharpens what the model has to work with.

**Structured input design.** Forms, configuration schemas, function signatures, API parameters. The grid gives you a checklist for whether the structure of the action is being made explicit, or smuggled into "context."

**Reading model outputs.** When a model produces text that feels off, the role structure has often shifted — the agent has slid into being the object, the instrument is performing the action, the locus has been erased. Naming what has moved is the first step in fixing it.

**Eval rubric design.** Rubrics for AI output often confuse "did the model do the task" with "did the model do it for whom, with what, on what, in what conditions." The grid forces these apart.

**UX copy in instruction-heavy interfaces.** Onboarding, error states, empty states. The grid clarifies what the user is doing, to what, with what, in what conditions, from what, toward what.

## Diagnostic Question

*"What is the agent here, what is the object, what is the instrument, what is the recipient, what is the source, what is the locus — and where have any of these been left implicit or merged?"*

## IKS Roots

The Sanskrit term is *kāraka* (कारक), literally "doer" or "factor in action." Panini's *Aṣṭādhyāyī* (4th c. BCE) lays out the six in sutras 1.4.23–1.4.55. The six are *kartṛ* (agent), *karma* (object), *karaṇa* (instrument), *sampradāna* (recipient), *apādāna* (source), and *adhikaraṇa* (locus). These are semantic categories, distinct from *vibhakti* (the morphological case-endings) — a sentence's surface case-marking realises the *kāraka* structure under it. Patanjali's *Mahābhāṣya* (the great commentary on Panini, 2nd c. BCE) develops and debates fine points; the later Sanskrit grammatical tradition continued the elaboration for over two thousand years.

See also G3 (*lakṣaṇā* — secondary meaning, where words shift their role under figurative pressure) and G4 (*śaktigraha* — the means by which the meaning of any word, including *kāraka*-marking words, is grasped).

## Further Reading

George Cardona, *Pāṇini: A Survey of Research* (Motilal Banarsidass), for the scholarly state of the field. Bimal Krishna Matilal, *The Word and the World*, gives an accessible entry to Indian theories of meaning that situates *kāraka* in the broader frame. S.D. Joshi and J.A.F. Roodbergen's annotated translations of the *Mahābhāṣya* for the canonical debate.
