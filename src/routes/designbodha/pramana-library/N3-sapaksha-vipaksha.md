---
id: N3
slug: sapaksha-vipaksha
title: "Positive and Negative Instance Sets"
sanskrit:
  transliteration: "sapakṣa / vipakṣa"
  devanagari: "सपक्ष / विपक्ष"
register:
  tradition: Nyaya
  text: "Nyaya — Indian logic. Part of the technical apparatus of *anumāna* (inferential cognition). Treated systematically in Nyaya-sutra 1.1.34–35 and elaborated in Navya-Nyaya from the fourteenth century."
applicability:
  - Builders
  - Stewards
cross_refs:
  - N1
  - N2
  - N5
gist: |
  Valid inference requires not just instances where the relation holds, but instances where it would have failed if the relation were false. The two sets do different work, and using only one is a failure mode.
---

In Indian inferential logic, any claim that "where X is, Y is" is supported by two structured sets of instances. The *sapakṣa* — the "similar locus" — is the set of cases where the property being established (the *sādhya*) is known to be present, and where the reason being offered (the *hetu*) is also present. The kitchen, the iron-foundry: places where fire is known to be present and where smoke is also observed. The *vipakṣa* — the "dissimilar locus" — is the set of cases where the property is known to be absent. The lake at dawn: a place where fire is known to be absent, and where smoke is also absent. Both sets are needed. The *sapakṣa* shows the reason accompanying the property; the *vipakṣa* shows the reason absent when the property is absent.

A reason that appears in the *sapakṣa* but also in the *vipakṣa* is doing no work — its presence does not discriminate. A reason that fails to appear in the *sapakṣa* is doing no work for a different reason. The two-set discipline is what distinguishes inference from accidental co-occurrence. Pervasion (*vyāpti*, N2) is established by surveying both sets and finding the structure right.

## Where English Falls Short

Machine learning has positive and negative training data, and statistics has control groups, so the structure is recognisable in English. What is missing is the normative force. ML positive and negative sets are descriptive — these are the labels we happen to have. The Nyaya treatment is prescriptive — these are the kinds of instances that must be surveyed for the inference to be valid, and the failure modes of each are named.

In particular, the Indian frame foregrounds a question ML practice often elides: are there counter-instances we have not seen? A reason can pass the *sapakṣa* test on every instance we have and still fail because the *vipakṣa* search was thin. The classic Nyaya example asks whether a reason that has only been surveyed in some loci can be relied on as pervading — and the answer, repeatedly, is that the *vipakṣa* must be canvassed systematically. Casual observation in passing does not meet the test.

## Where it Shows Up

**Training data design.** Most failure modes in ML come from inadequate negative instance sets. Models that learn to detect cats by being shown many cats but few non-cats end up with reason structures that pass the *sapakṣa* and fail the *vipakṣa* — they classify almost anything as a cat. The Nyaya discipline asks whether the dissimilar locus has been canvassed at the same depth as the similar locus.

**A/B test interpretation.** The treatment group is the *sapakṣa*; the control is the *vipakṣa*. A lift in treatment is suggestive; a lift in treatment together with a flat control is what actually carries the inference. Many product teams report the treatment effect without examining whether the control behaved as expected, which is a *vipakṣa*-side failure.

**Counterexample search in research synthesis.** When summarising "what we know about X," the *sapakṣa* (papers where X is found) is easy. The *vipakṣa* (papers where the conditions for X were present but X did not appear) is harder, and its absence in the synthesis is a hidden invalidity.

**Eval rubric design.** "When does the model succeed?" is the *sapakṣa* question. "Under what conditions does the model fail when it should not?" is the *vipakṣa* question. Many AI evals have rich positive batteries and thin negative ones.

**Safety testing.** Red-teaming is a structured *vipakṣa* search — the discipline of finding the conditions under which a system fails. A safety claim that has only been tested against the *sapakṣa* (the cases where the system worked) is unsupported in the Nyaya sense.

## Diagnostic Question

*"Have I canvassed the *vipakṣa* at the same depth as the *sapakṣa* — and have I actually looked for the cases where the property was absent and the reason should have been absent too?"*

## IKS Roots

The Sanskrit terms are *sapakṣa* (सपक्ष), literally "with the same side," and *vipakṣa* (विपक्ष), literally "with the opposite side." Both are technical terms within the structure of *anumāna* (inferential cognition). Their formal role appears in the analysis of any inference: the reason (*hetu*) must be present in the *sapakṣa* and absent in the *vipakṣa* — and the technical machinery for testing this becomes the heart of Navya-Nyaya from Gangesha onward. The set of fallacies of the reason (*hetvābhāsa*) is partly defined by failures at the *sapakṣa*-*vipakṣa* level: *anaikāntika* (where the *hetu* appears in both), *asiddha* (where it appears in neither), and so on. See N5 for one of these (*satpratipakṣa*).

See also N2 (*vyāpti* — the relation these instance sets are used to establish) and N1 (the wider *pramāṇa* frame).

## Further Reading

Bimal Krishna Matilal, *Logic, Language and Reality* (Motilal Banarsidass), for the integration of *sapakṣa-vipakṣa* into the broader theory of inference. Stephen Phillips, *Classical Indian Metaphysics*, for the Navya-Nyaya elaboration. The *Anumana-khanda* of Gangesha's *Tattvacintamani* is the canonical technical treatment, available in modern translation.
