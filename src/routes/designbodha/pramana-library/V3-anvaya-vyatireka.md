---
id: V3
slug: anvaya-vyatireka
title: "Positive and Negative Concomitance"
sanskrit:
  transliteration: "anvaya-vyatireka"
  devanagari: "अन्वय-व्यतिरेक"
register:
  tradition: Vedanta
  text: "Used across Nyaya, Mimamsa, and Vedanta. Vedanta develops it most systematically as method; Nyaya formalises it in inference (see N2 *vyāpti* and N3 *sapakṣa / vipakṣa*)."
applicability:
  - Builders
  - Stewards
cross_refs:
  - N2
  - N3
  - V1
gist: |
  A disciplined paired test: hold the conditions, vary the candidate property, see what tracks. The Indian formulation makes the positive and negative arms a single methodological unit - you have not established concomitance until you have done both. The frame is what causal inference, ablation studies, and A/B testing all are at the level of method.
question: Have I done both arms here - is the candidate concomitance established by what happens when the property is present, and what happens when it is absent, or only by one of these?
---

The Indian epistemological traditions converge on a methodological pair. *Anvaya* - positive concomitance - is the observation that when X is present, Y is also present. *Vyatireka* - negative concomitance - is the observation that when X is absent, Y is also absent. The two observations are different in kind, and the Indian frame treats them as a single methodological unit: you have not established concomitance until you have done both arms.

The discipline looks obvious in retrospect and is routinely skipped in practice. People notice that the kitchen is fragrant whenever bread is baking - anvaya established - and proceed to attribute the fragrance to bread. The vyatireka arm has not been done. Was the kitchen fragrant on days bread was not baking? If yes - the windows were open onto the bakery downstairs - the anvaya observation was true and the causal attribution was wrong. Without vyatireka, "bread causes the fragrance" rests on half the required evidence.

The Nyaya tradition develops the formal use of the pair in inference. To establish vyapti (the necessary co-occurrence that grounds inference - see N2), Nyaya requires both anvaya (the reason is present in the sapaksha, the similar instances where the inferred is known to occur - see N3) and vyatireka (the reason is absent from the vipaksha, the contrary instances where the inferred is known not to occur). Either alone is insufficient. The pair is what separates real concomitance from accidental co-occurrence.

The Vedanta application takes the pair beyond inference and uses it as a general analytic method for figuring out what depends on what. The classical Advaita use is the discrimination of the witness from what is witnessed: the witness is anvaya-present in all cognitions (every cognition has a witness) and would be vyatireka-absent from no cognition (you cannot find a cognition where the witness is gone). This establishes the witness as something different in kind from the cognitions it witnesses. The same paired discipline is applied to the kosha layers, the states of consciousness, and the substrate-modification relation.

## Where English Falls Short

Western methodology has the same machinery under different names. Mill's Method of Agreement is close to anvaya; the Method of Difference is close to vyatireka. Causal inference, counterfactual analysis, ablation studies, and A/B testing all implement the paired structure. What the Indian formulation contributes is the framing as a unit. Anvaya-vyatireka is one method with two arms; neither arm alone is the method. English methodology tends to treat the arms as alternatives - Method of Agreement *or* Method of Difference - and compose them additively when needed. The Indian frame builds the composition into the concept.

This matters in practice because the absent arm is the one routinely skipped. In product analytics, the team builds an attribution model and has done anvaya: the metric moves when the feature ships. The vyatireka arm - did the metric also move on unrelated changes, would it have moved without the feature - is structurally harder and often omitted. The Indian frame makes the omission visible.

## Where it Shows Up

**Ablation studies in machine learning.** An ablation study is anvaya-vyatireka applied to a model architecture. The component is present (does the metric hold?) and then the component is removed (does the metric drop?). Doing both arms is what makes the conclusion attributable. Reporting only the presence-arm is the standard ML failure the frame names structurally.

**A/B testing and causal inference.** A clean A/B test is anvaya-vyatireka with randomisation handling confounds. The treatment-arm gives anvaya; the control-arm gives vyatireka. The full causal-inference literature on counterfactuals, propensity-matching, and synthetic controls is elaborated machinery for executing the paired observation where direct randomisation is unavailable.

**Debugging and bisection.** When a bug appeared after changes A, B, and C, bisection is anvaya-vyatireka applied to the change set. Each change is held out in turn; the bug's presence or absence in each case localises the cause. The discipline is structural: presence-arm and absence-arm together. Either alone is insufficient.

**User research with claim and counter-claim.** A user reports that a feature helps with task X. The anvaya arm: users with the feature complete task X faster. The vyatireka arm: users without the feature also complete task X faster, because the population that adopted the feature was self-selected for prior facility. The paired test catches the selection effect; anvaya alone misses it.

**Personal cultivation and habit attribution.** "Meditating in the morning makes my day go better." Anvaya: on days you meditate, the day goes better. Vyatireka: on days you do not meditate, what happens? If the days you skip are also the days you slept badly, the meditation may be a marker for sleep quality rather than the cause of the day's quality. The paired discipline is what separates correlation from cause in personal observation.

## Diagnostic Question

*"Have I done both arms here - is the candidate concomitance established by what happens when the property is present and what happens when it is absent, or only by one of these?"*

## IKS Roots

The Sanskrit terms are *anvaya* (अन्वय, "following along with," concomitance in presence, from *anu-i*, "to go along with") and *vyatireka* (व्यतिरेक, "exclusion," concomitance in absence, from *vyati-ric*, "to leave out"). The pair is used across the Indian darshanas with consistent meaning. In Nyaya it formalizes the establishment of vyapti (N2): the reason must be present in the sapaksha (N3) and absent from the vipaksha. In Mimamsa it operates in the analysis of which Vedic injunctions apply to which conditions. In Advaita Vedanta it is the method of viveka (discrimination) by which the witness is distinguished from what is witnessed, the substrate from what is superimposed (V1). The Sankhya-Yoga tradition uses it in the analysis of the gunas. The convergence across schools makes anvaya-vyatireka one of the most reliably applicable methodological transfers from the Indian traditions.

See also N2 (vyapti - the formal target the paired observation establishes in Nyaya inference) and N3 (sapaksha / vipaksha - the instance-sets across which the paired observation is conducted).

## Further Reading

Bimal Krishna Matilal, *The Character of Logic in India*, for the Nyaya-Vedanta methodological apparatus. J.N. Mohanty, *Classical Indian Philosophy*, for the cross-school use of the pair. Karl Potter, *Presuppositions of India's Philosophies*, for the deeper methodological framing. Stephen Phillips, *Epistemology in Classical India*, for the modern reconstruction of the inferential machinery.
