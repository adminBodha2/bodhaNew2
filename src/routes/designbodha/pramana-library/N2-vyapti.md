---
id: N2
slug: vyapti
title: "Necessary Co-occurrence"
sanskrit:
  transliteration: "vyāpti"
  devanagari: "व्याप्ति"
register:
  tradition: Nyaya
  text: "Nyaya - Indian logic. Root text: Nyaya-sutras; canonical technical treatment in the *Tattvacintamani* (14th c.)."
applicability:
  - Users
  - Builders
  - Stewards
cross_refs:
  - N1
  - N3
  - N4
  - N5
  - N6
gist: |
  When you claim that X and Y go together, are they bound by necessity or running in parallel by coincidence? This card gives you the test that separates the two.
question: Have we ruled out the hidden qualifier and the otherwise-established factor - or have we only observed co-occurrence and called it a relation?
---

Claiming "wherever smoke is, fire is" does more than report a tendency. It asserts invariable relation - that there is no instance of smoke without fire, and that the conditions under which the link might break have been actively ruled out. The Indian logical tradition built its entire account of valid inference on this distinction. An inference is sound when the reason offered and the conclusion it supports are bound by necessity. Much of the Nyaya technical apparatus is devoted to testing whether a claimed necessity actually holds.

Two tests do the central work. One looks for a hidden third factor - an *upadhi*, a silent qualifier - that, if removed, would break the link between smoke and fire. Smoke accompanies fire in kitchens and forges, yes. But does that warrant "wherever smoke, fire"? Only once you have eliminated every candidate qualifier: mist, incense, dry ice. The other test looks for an *anyatha-siddha* factor - something otherwise established that might explain the co-occurrence independently, rendering the postulated necessity unnecessary. A claim of necessity must survive both.

## Where English Falls Short

The nearest English term is correlation - a statistical, graded measure of how often X and Y co-occur. Vyapti is categorical and structural. It asks whether the co-occurrence holds invariably and whether the conditions under which it could fail have been actively eliminated. Bayesian frameworks approximate parts of this; modern causal inference (Pearl, Rubin) approaches it; but the discipline of hunting the silent qualifier and the otherwise-established factor is, in those frameworks, one consideration among many. In Nyaya, it is the central question.

The practical consequence is that "strong correlation" gets upgraded to causal language in product work all the time, and the Indian frame names exactly what has been skipped.

## Where it Shows Up

**Evaluating prompt reliability.** A prompt format produced good output three times. The vyapti question: is the relation invariable, or is there a hidden qualifier - a model version, a temperature setting, a position in the conversation history - doing the actual work? Three positive cases are sapaksha (see N3). The upadhi may not have surfaced yet.

**A/B testing.** Most A/B claims are correlational. The discipline asks what would have to be true for this lift not to hold - and forces active elimination of candidates before "X drives Y" enters a roadmap.

**Feature attribution in ML.** When a feature is said to "cause" a prediction, the test demands upadhi-nirasa - elimination of the silent qualifier - before causal language is permitted to travel.

**Heuristic evaluation.** "Users who clicked X then did Y" is correlational. The audit asks whether Y holds invariably given X, once self-selection, session structure, and time-of-day effects have been separated out.

**Research synthesis.** Stakeholders routinely upgrade correlation to necessity - "X drives Y," "Y depends on X." The vyapti test forces the disambiguation before the language solidifies into strategy.

## IKS Roots

The Sanskrit term is *vyapti* (व्याप्ति), pervasion, from the root *vyap* (to pervade). It is the relation that grounds *anumana*, inferential cognition. The two tests named above have technical designations: *upadhi-nirasa* (elimination of the spurious qualifier, *upadhi*) and *anyathAsiddhi-vicara* (consideration of factors otherwise established, *anyathAsiddhi*). The wider technical vocabulary includes *hetu* (the reason offered), *sadhya* (what is to be established), *sapaksha* (instances where the sadhya is known to be present), and *vipaksha* (instances where it is absent). Gangesha's school - Navya-Nyaya, beginning in the fourteenth century - made the disciplined testing of vyapti the most developed branch of Indian formal logic. Root verse at Nyaya-sutra 1.1.5; the canonical technical text is the *Anumana-khanda* of the *Tattvacintamani*.

See also N1 (the wider pramana frame), N3 (sapaksha / vipaksha - the instance sets used to test pervasion), N4 (pakshata - the locus of the inference), N5 (satpratipaksha - counterbalanced reasons that can stall an inference), and N6 (tarka - the reductio method used to support pervasion).

## Further Reading

Bimal Krishna Matilal, *Logic, Language and Reality* (Motilal Banarsidass), is the most accessible scholarly entry. J.N. Mohanty's *Classical Indian Philosophy* gives context. For the technical reader, Stephen Phillips' work on Navya-Nyaya.
