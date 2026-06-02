---
id: G3
slug: lakshana
title: "Secondary or Indirect Meaning"
sanskrit:
  transliteration: "lakṣaṇā"
  devanagari: "लक्षणा"
register:
  tradition: Vyakarana
  text: "Vyakarana and Alankara-shastra. Treated in Mammata's *Kāvyaprakāśa* and extensively in the Nyaya analysis of meaning."
applicability:
  - Users
  - Builders
  - Stewards
cross_refs:
  - A1
  - G2
  - G4
  - N8
gist: |
  When the primary meaning of a word fails the context, the word generates a secondary meaning through a determinate semantic relation. The Indian tradition analyses the relation, the conditions for activation, and the kinds of secondary meaning. The frame is what every act of interpretation does when literal reading does not fit, and what no English vocabulary names cleanly.
question: Has the literal meaning failed the context here, and what determinate relation is generating the secondary meaning the reader is being asked to construct?
---

"The village on the Ganges." A village sits on land. The Ganges is a river. Taken literally, the sentence produces an incoherent cognition: a village floating in water. So you do not take it literally. The word *Ganges* generates a secondary meaning - "the bank of the Ganges" - and the cognition resolves. The shift is automatic. You may not even notice making it. But a determinate semantic procedure has occurred. The Indian tradition calls this procedure *lakshana* and analyzes it as a distinct mode of meaning-generation alongside the primary (*abhidha*) and the suggested (*vyanjana* - see A1).

Three conditions activate lakshana. First, the primary meaning must fail - the literal reading produces an incoherent or contextually impossible cognition. Second, there must be a determinate relation between the primary meaning and the secondary (the bank is related to the river by spatial contiguity; calling someone a "lion" is related to the lion by shared property of courage). Third, there must be a motivating purpose for the shift - efficiency, emphasis, intimacy, indirection.

The tradition further classifies lakshana by the relation that grounds the shift. *Jahal-lakshana*: the primary meaning is dropped entirely and replaced. The Ganges drops its river-meaning and uses bank-meaning. *Ajahal-lakshana*: the primary meaning is preserved and the secondary is added. "The red is running" can refer to a red horse; horse is added without losing the redness. *Jahad-ajahal-lakshana*: a mix, where part of the primary is retained and part is shifted.

The point of the analysis is that interpretation is constrained, not free. A reader who hears "the village on the Ganges" and supplies "bank" has performed a determinate operation, bounded by the available semantic relations. The same word in a different context licenses different lakshana shifts. The analysis tracks the structure of the permission.

## Where English Falls Short

English has "metaphor" and "metonymy" as overlapping categories with no clean operational distinction. The lakshana analysis is more precise. Metaphor is closer to the lakshana grounded in shared property (lion-as-courageous-man); metonymy is closer to the lakshana grounded in spatial or relational contiguity (bank-of-Ganges). The English categories are descriptive labels for what kind of relation is involved; lakshana names the underlying procedure of which they are all specifications.

The English vocabulary also lacks the activation-condition apparatus. Metaphor and metonymy are applied after the fact to identify what the speaker did. Lakshana is tied to the failure of the primary meaning as its trigger: the secondary meaning generates because the primary failed, and the analysis tracks this dependency. Gricean pragmatics works some of this out at the level of utterance pragmatics; the Indian apparatus is older, more compact, and applies to lexical semantics directly.

The "literal vs figurative" distinction is too coarse for the work lakshana does. Many lakshana shifts are not figurative in any rhetorical sense - they are routine semantic operations the language performs in ordinary use, invisible to the speaker. The Indian frame returns them to the mundane, which is what they are.

## Where it Shows Up

**Prompt interpretation by language models.** A user prompt taken literally often fails - produces an incoherent cognition, asks for the impossible, or violates context. The model performs a lakshana shift to a related meaning that fits. The shift may be apt or wildly off; whether it is depends on whether the model has the relevant relation available and whether the prompt licenses that relation. Debugging prompt-output mismatch frequently comes down to: what lakshana shift did the model perform, and why was that the relation it picked?

**Polite indirection in instructions.** "Could you possibly close the window?" is lakshana in the request-as-question form. The literal reading fails the conversational context; the secondary reading generates through a conventional relation between modal questions and requests. Cross-cultural communication systems that take the primary meaning are missing the shift the speaker depended on.

**Search query interpretation.** "Italian restaurant near me." The literal meaning involves geographic relation to the user; the secondary meaning involves walking or driving distance within a contextually appropriate range. Search systems perform the lakshana shift more or less well; the shift is contextually grounded and language-conventional, not free.

**Legal and contractual reading.** Statutory interpretation has "plain meaning" and "purposive interpretation" doctrines that map onto the abhidha / lakshana distinction. Disagreements about statutory scope are often disagreements about whether the primary meaning has failed and a secondary meaning should generate.

**Technical jargon and trade vocabulary.** "Driver" in software, "bug" in engineering, "tree" in data structures - each began as an ordinary word that underwent lakshana shift in a domain context. New entrants to the domain often grasp the primary meaning and miss the technically shifted one, producing characteristic miscomprehension.

**UX writing and microcopy.** The writer makes lakshana-aware choices when picking words whose primary or contextually licensed secondary meanings will land cleanly. "Press to advance" carries an unwanted association on a touch surface; "tap to continue" does not. The discipline is more rigorous when the underlying analysis is explicit.

## IKS Roots

The Sanskrit term is *lakshana* (लक्षणा), from *laksh* (to mark, to characterize) - the secondary meaning marks itself out where the primary fails. The technical analysis is shared between Vyakarana and Alankara-shastra and is also treated in Nyaya's analysis of meaning. Mammata's *Kavyaprakasha* (11th century) gives the standard textbook treatment, naming the three conditions (failure of primary meaning, a determinate relation, a motivating purpose) and the three classes (jahal, ajahal, jahad-ajahal) by what happens to the primary meaning in the shift. The doctrine of three meaning-functions - abhidha (primary), lakshana (secondary), vyanjana (suggested) - is the foundational Indian analysis of how words bear meaning. The Alankara use of lakshana underlies the higher analysis of dhvani (A1), since suggested meaning frequently rides on a prior secondary-meaning operation.

See also G2 (sphota - the word-level meaning-unity that lakshana operates on), G4 (shaktigraha - how the primary meaning is learned in the first place, which the lakshana operation presupposes), and N8 (shabda - testimony as a means of knowing, the broader frame in which the meaning-functions sit).

## Further Reading

Kunjunni Raja, *Indian Theories of Meaning*, for the classical treatment of abhidha / lakshana / vyanjana. Bimal Krishna Matilal, *The Word and the World*, for accessible philosophical entry. Mammata's *Kavyaprakasha*, especially the second chapter, in the translation by R.C. Dwivedi or the older translation by Ganganath Jha. K. Kunjunni Raja and Harold Coward, eds., *The Philosophy of the Grammarians*, for the cross-school philosophical context.
