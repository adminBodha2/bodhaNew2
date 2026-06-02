---
id: G1
slug: karaka
title: "Semantic Roles in Action"
sanskrit:
  transliteration: "kāraka"
  devanagari: "कारक"
register:
  tradition: Vyakarana
  text: "Vyakarana - Sanskrit grammar. Root text: Panini's *Aṣṭādhyāyī* (4th c. BCE), book 1.4."
applicability:
  - Users
  - Builders
cross_refs:
  - G3
  - G4
gist: |
  Every action involves a small number of distinct roles - agent, object, instrument, recipient, source, locus. Many design and communication failures are failures to keep these straight.
question: What is the agent here, what is the object, what is the instrument, what is the recipient, what is the source, what is the locus - and where have any of these been left implicit or merged?
---

Panini, working in the fourth century BCE, mapped the structure of how participants relate to actions. Every action, he observed, involves a small number of distinct roles. Six of them. Together they account for the complete relational structure of any event.

*Kartr* - the agent, the participant who acts independently. *Karma* - the object, the participant most affected by the action. *Karana* - the instrument, the means by which the action is accomplished. *Sampradan* - the recipient, the one for whose sake the action is done. *Apadana* - the source, that from which something proceeds or is separated. *Adhikarana* - the locus, the place, time, or circumstance in which the action occurs.

These are functional categories, not grammatical ones. They are roles in the structure of the event itself - independent of whatever surface form a sentence happens to give them. A sentence may make any of them the grammatical subject, depending on emphasis and voice. That is a matter of case-ending, a separate layer. The karakas live one level deeper, in the action-structure that the case system expresses.

The discriminations are sharp and practically useful. The instrument is what you do something with. The recipient is the one for whose sake you do it. These are routinely conflated in everyday prompt-writing and design communication - and the conflation is where the ambiguity enters. The locus (*adhikarana*) is broader than any English equivalent: it covers spatial, temporal, conditional, and circumstantial ground together. Many design frameworks have no clean single term for it.

## Where English Falls Short

Modern linguistics has thematic roles - agent, patient, instrument, beneficiary, source, location - descended in part from Panini, often through Fillmore's case grammar. The concept exists in English vocabulary. The trouble is operational: most practitioners work with a smaller, fuzzier set (subject, object, indirect object) and lose the discriminating force of the six-category grid. Panini's grammarians treated the discriminations as the point. The operational value is exactly in the distinctions that the simplified vocabulary collapses.

The instrument-recipient distinction is the most important to recover. "Write me a poem using simple language for my five-year-old" - the instrument (simple language) and the recipient (the five-year-old) are sitting ambiguously in the same phrase. Disambiguation consistently improves the output.

## Where it Shows Up

**Prompt design.** Most prompts producing uneven output have a karaka problem. Explicit karaka structure - naming agent, object, instrument, recipient, source, locus where applicable - sharpens what the model has to work with. The discipline is to ask which roles are present and which have been left implicit or merged.

**Structured input design.** Forms, configuration schemas, function signatures, API parameters. The karaka grid is a checklist for whether the structure of the action is being made explicit, or quietly smuggled into "context."

**Reading model outputs.** When output feels off, the role structure has often shifted - the agent has slid into being the object, the instrument is performing the action, the locus has been erased. Naming what has moved is the diagnostic first step.

**Eval rubric design.** Rubrics for AI output often conflate "did the model do the task" with "did the model do it for whom, with what, on what, in what conditions." The karaka grid forces these apart.

**UX copy in instruction-heavy interfaces.** Onboarding, error states, empty states. The grid clarifies what the user is being asked to do, to what, with what, in what conditions, from what, toward what.

## Diagnostic Question

*What is the agent here, what is the object, what is the instrument, what is the recipient, what is the source, what is the locus - and where have any of these been left implicit or merged?*

## IKS Roots

The Sanskrit term is *karaka* (कारक), from *kara* (doing, making) - literally "the factor in action." Panini's *Ashtadhyayi* (4th century BCE) lays out the six in sutras 1.4.23-1.4.55. The six are *kartr* (agent), *karma* (object), *karana* (instrument), *sampradan* (recipient), *apadana* (source), and *adhikarana* (locus). These are semantic categories, distinct from *vibhakti* (the morphological case-endings): the surface case-marking realises the karaka structure, but the karaka structure is prior to and independent of the surface. Patanjali's *Mahabhasya* (the great commentary on Panini, 2nd century BCE) develops and debates fine points; the Sanskrit grammatical tradition continued this elaboration for over two thousand years, making it the most rigorously developed grammar of any pre-modern civilization.

See also G3 (lakshana - secondary meaning, where words shift their karaka-implied roles under figurative pressure) and G4 (shaktigraha - the means by which word-meaning, including the role-marking particles, is grasped).

## Further Reading

George Cardona, *Panini: A Survey of Research* (Motilal Banarsidass), for the scholarly state of the field. Bimal Krishna Matilal, *The Word and the World*, for an accessible entry to Indian theories of meaning that situates karaka in the broader frame. S.D. Joshi and J.A.F. Roodbergen's annotated translations of the *Mahabhasya* for the canonical debate.
