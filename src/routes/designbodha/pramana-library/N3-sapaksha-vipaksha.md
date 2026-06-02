---
id: N3
slug: sapaksha-vipaksha
title: "Positive and Negative Instance Sets"
sanskrit:
  transliteration: "sapakṣa / vipakṣa"
  devanagari: "सपक्ष / विपक्ष"
register:
  tradition: Nyaya
  text: "Nyaya - Indian logic. Part of the technical apparatus of *anumāna* (inferential cognition). Treated systematically in Nyaya-sutra 1.1.34–35 and elaborated in Navya-Nyaya from the fourteenth century."
applicability:
  - Builders
  - Stewards
cross_refs:
  - N1
  - N2
  - N5
gist: |
  Valid inference requires not just instances where the relation holds, but instances where it would have failed if the relation were false. The two sets do different work, and using only one is a failure mode.
question: Have I canvassed the dissimilar locus at the same depth as the similar locus - and have I actually looked for the cases where the property was absent and the reason should have been absent too?
---

Any inference in the Nyaya tradition is supported by two structured sets of instances, and both sets are required. The *sapaksha* - the similar locus - contains the cases where the property being established (the *sadhya*) is known to be present, and where the reason being offered (the *hetu*) is also present. The kitchen, the iron-foundry: places where fire is known to be present and smoke is also observed. The *vipaksha* - the dissimilar locus - contains the cases where the property is known to be absent. The lake at dawn: fire is absent, and smoke is also absent. The sapaksha shows the reason accompanying the property. The vipaksha shows the reason absent when the property is absent.

A reason that appears in the sapaksha but also in the vipaksha does no work - it fails to discriminate. A reason that fails to appear in the sapaksha does no work for a different reason. The two-set discipline is what separates inference from accidental co-occurrence. Pervasion (vyapti, N2) is established by surveying both sets and finding the structure holding in each.

## Where English Falls Short

Machine learning has positive and negative training data; statistics has control groups. The structure is recognizable. What is missing is the normative force. ML positive and negative sets are descriptive - these are the labels we happen to have. The Nyaya treatment is prescriptive: these are the kinds of instances that must be surveyed for the inference to be valid, and the failure modes of each set are named.

The Indian frame also foregrounds a question ML practice typically elides: are there counter-instances we have not yet seen? A reason can pass the sapaksha test on every instance available and still fail because the vipaksha search was thin. The Nyaya tradition insists the vipaksha must be canvassed systematically. What we have happened to observe is not the test. The test is whether the negative space has been deliberately searched.

## Where it Shows Up

**Training data design.** Most failure modes in ML come from inadequate negative instance sets. Models that learn to detect cats from many cats but few non-cats develop reason structures that pass the sapaksha and fail the vipaksha - they classify almost anything as a cat. The Nyaya discipline asks whether the dissimilar locus has been canvassed at the same depth as the similar locus.

**A/B test interpretation.** The treatment group is the sapaksha; the control is the vipaksha. A lift in treatment is suggestive. A lift in treatment together with a flat control is what actually carries the inference. Many product teams report the treatment effect without examining whether the control behaved as expected - a vipaksha-side failure.

**Counterexample search in research synthesis.** When summarising "what we know about X," the sapaksha (papers where X is found) is easy. The vipaksha (papers where the conditions for X were present but X did not appear) is harder - and its absence from the synthesis is a hidden invalidity.

**Eval rubric design.** "When does the model succeed?" is the sapaksha question. "Under what conditions does the model fail when it should not?" is the vipaksha question. Most AI evals have rich positive batteries and thin negative ones. The inference they support is correspondingly weak.

**Safety testing.** Red-teaming is a structured vipaksha search - the deliberate work of finding the conditions under which a system fails. A safety claim tested only against the sapaksha (cases where the system worked) is unsupported in the Nyaya sense, regardless of how many positive cases have been collected.

## IKS Roots

The Sanskrit terms are *sapaksha* (सपक्ष), literally "with the same side," and *vipaksha* (विपक्ष), literally "with the opposite side." Both are technical terms within the structure of anumana (inferential cognition). Their formal role is clear in any inference: the hetu must be present in the sapaksha and absent in the vipaksha. The technical machinery for testing this becomes the heart of Navya-Nyaya from Gangesha onward. The classical fallacies of the reason (hetvabhasa) are partly defined by failures at this level: *anaikantika* (the hetu appears in both sapaksha and vipaksha, and therefore discriminates nothing), *asiddha* (it appears in neither), and so on. See N5 for satpratipaksha, the fallacy of the counterbalanced reason.

See also N2 (vyapti - the relation these instance sets are used to establish) and N1 (the wider pramana frame).

## Further Reading

Bimal Krishna Matilal, *Logic, Language and Reality* (Motilal Banarsidass), for the integration of sapaksha-vipaksha into the broader theory of inference. Stephen Phillips, *Classical Indian Metaphysics*, for the Navya-Nyaya elaboration. The *Anumana-khanda* of Gangesha's *Tattvacintamani* is the canonical technical treatment, available in modern translation.
