---
id: N2
slug: vyapti
title: "Necessary co-occurrence"
sanskrit:
  transliteration: "vyāpti"
  devanagari: "व्याप्ति"
register:
  tradition: Nyaya
  text: "Nyaya — Indian logic. Root text: Nyaya-sutras; canonical technical treatment in the *Tattvacintamani* (14th c.)."
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
---

# Necessary co-occurrence

*Sanskrit: vyāpti (व्याप्ति)*

## What it is

A claim that "wherever smoke is, fire is" does more than report that smoke and fire tend to appear together. It asserts that the relation is invariable — that there is no instance of smoke without fire, and that the conditions under which the link might fail have been ruled out. The Indian logical tradition treats this distinction as the foundation of valid inference: an inference is sound when the reason offered and what it is offered for are bound by necessity, and much of the technical apparatus is devoted to testing whether a claimed link of this kind actually holds.

Two tests do most of the work. One looks for a hidden third factor that, if removed, breaks the link — a qualifier silently doing the explanatory work all along. The other looks for the possibility that some otherwise-established factor explains the co-occurrence on its own, so the postulated relation is unnecessary. A claim of necessity must survive both.

## Where English falls short

The closest term is *correlation*, but correlation is statistical and graded — it reports that X and Y tend to co-occur, and asks how much. The necessity-test of Nyaya is categorical and structural — it asks whether the co-occurrence holds invariably and whether the conditions under which it might fail have been actively eliminated. Bayesian frameworks approximate parts of this, and modern causal inference (Pearl, Rubin) gets closer still, but the discipline of looking for the silent qualifier and the otherwise-established factor is treated by statistical frameworks as one consideration among many. Here it is the central one.

## Where it shows up

**Evaluating prompt reliability.** A prompt format produced good output three times. The necessity question is whether the relation is invariable, or whether there is a hidden qualifier — a model version, a temperature setting, a position in the conversation — doing the actual work.

**A/B testing.** Most A/B claims are correlational. The discipline asks what would have to be true for this lift to not hold, and forces active elimination of the candidates.

**Feature attribution in ML.** When a feature is said to "cause" a prediction, the test asks for the silent-qualifier elimination before the causal language is allowed to travel.

**Heuristic evaluation.** "Users who clicked X then did Y" is correlational. The audit asks whether Y holds invariably given X, once self-selection, session structure, and time-of-day effects have been removed.

**Research synthesis.** Stakeholders routinely upgrade correlation to necessity in their language ("X drives Y"). The test forces the disambiguation before the language gets into a roadmap.

## Diagnostic question

*"Have we ruled out the hidden qualifier and the otherwise-established factor — or have we only observed co-occurrence and called it a relation?"*

## Indic roots

The Sanskrit term is *vyāpti* (व्याप्ति), pervasion. It is the relation that grounds *anumāna* (अनुमान), inferential cognition. The two tests above are *upādhi-nirāsa* (the elimination of the spurious qualifier, *upādhi*) and *anyathāsiddhi-vicāra* (the consideration of factors otherwise established, *anyathāsiddhi*). The technical vocabulary also includes *hetu* (the reason offered), *sādhya* (what is to be established), *sapakṣa* (instances where the *sādhya* is present), and *vipakṣa* (instances where it is absent). The Navya-Nyaya school, beginning with Gangesha in the fourteenth century, made the discipline of testing *vyāpti* the most developed branch of Indian logic. Root verse at Nyaya-sutra 1.1.5; the canonical technical text is the *Anumana-khanda* of the *Tattvacintamani*.

See also N1 (the wider *pramāṇa* frame), N3 (*sapakṣa* / *vipakṣa* — the instance sets used to test pervasion), N4 (*pakṣatā* — the locus of the inference), N5 (*satpratipakṣa* — counterbalanced reasons that can stall an inference), and N6 (*tarka* — the reductio method used to support pervasion).

## Further reading

Bimal Krishna Matilal, *Logic, Language and Reality* (Motilal Banarsidass), is the most accessible scholarly entry. J.N. Mohanty's *Classical Indian Philosophy* gives context. For the technical reader, Stephen Phillips' work on Navya-Nyaya.
