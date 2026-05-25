---
id: V4
slug: vivarta-parinama
title: "Apparent and real transformation"
sanskrit:
  transliteration: "vivarta / pariṇāma"
  devanagari: "विवर्त / परिणाम"
register:
  tradition: Vedanta
  text: "Vedanta. The two theories of causal transformation, contested across Advaita (which favours *vivarta*) and other Vedanta schools (which favour *pariṇāma*). Root texts: Sankara's *Brahma-sūtra-bhāṣya* for *vivarta-vāda*; Ramanuja's *Śrī-bhāṣya* for the *pariṇāma* reading."
applicability:
  - Builders
  - Stewards
cross_refs:
  - V1
  - V2
  - Y6
gist: |
  Two distinct theories of how transformation happens. *Pariṇāma* — the substrate actually changes into the new form (milk to yoghurt). *Vivarta* — the substrate appears as the new form without itself changing (rope appears as snake). The frame distinguishes surface change from substrate change wherever the difference matters — in product updates, in model versioning, in personal transformation.
---

# Apparent and real transformation

*Sanskrit: vivarta / pariṇāma (विवर्त / परिणाम)*

## What it is

When clay is made into a pot, what has happened? The clay is still there. The pot is new. The Indian tradition asks the question precisely: is the new form a real modification of the substrate (the clay has actually become pot-shaped, and the change is in the substrate itself), or is it an apparent modification (the substrate is unchanged in itself, and the pot-form is overlaid on it without transforming it)? The two answers are *pariṇāma* (real transformation) and *vivarta* (apparent transformation), and they are not the same theory of change.

*Pariṇāma-vāda* — the doctrine of real transformation — says the substrate genuinely changes. Milk becomes yoghurt; the milk-properties are gone, the yoghurt-properties are present, and the substrate has actually been transformed. Sankhya holds this view of how *prakṛti* evolves into the world. Ramanuja's Visistadvaita Vedanta holds it of how *brahman* relates to the world. The world is a real modification of the substrate, with its own properties, its own causal powers, its own ontological standing.

*Vivarta-vāda* — the doctrine of apparent transformation — says the substrate does not actually change. The rope appears as a snake; no transformation has occurred in the rope. The snake-form is overlaid on the rope through *adhyāsa* (V1). The substrate is what it was; the apparent form is a cognition-event with no corresponding substrate-change. Sankara's Advaita Vedanta uses *vivarta-vāda* for the world's relation to *brahman*: the world appears as modification of *brahman* without *brahman* having actually undergone any modification.

The disagreement is metaphysical and was the central contested question in the post-Sankara Vedanta tradition. The disagreement aside, the analytic distinction is useful at any scale. There are transformations in which the substrate actually changes — call these *pariṇāma* — and transformations in which the appearance changes while the substrate is undisturbed — call these *vivarta*. Confusing the two produces predictable errors. Treating a *vivarta* as a *pariṇāma* is the error of believing the new form has substrate-grade properties when it does not. Treating a *pariṇāma* as a *vivarta* is the error of believing the substrate is unchanged when it has actually been transformed.

## Where English falls short

English has "real change" versus "apparent change" as a folk distinction and no technical apparatus for it. The folk distinction is also wrong in the direction it points: "apparent" sounds like "not really happening," which mishandles the *vivarta* case. *Vivarta* is not nothing — the snake-cognition is happening, the fear is real, the body is responding. The Sanskrit term means "rolling-over," "turning-into-appearance" — there is a happening, just not a happening in the substrate.

"Surface change versus deep change" gets closer and is loose. Whether something counts as "surface" or "deep" tends to be a matter of how much one cares about it; the distinction has no precision. *Vivarta* / *pariṇāma* is precise: did the substrate transform, or did only the appearance transform.

The materials-science vocabulary of "phase change" versus "configuration change" maps closely onto *pariṇāma* for some physical cases. Ice to water is *pariṇāma*; the water is what the ice has become, with new properties, the old ones gone. Reflection of a tree in water is *vivarta* on the water — the water is unchanged in itself, the tree-image is an appearance on it that disappears when the tree moves. The Sanskrit distinction works as a general structural tool across substrate types, not only physical ones.

In philosophy of mind, the distinction maps onto the question of whether mental properties are real modifications of brain states (a *pariṇāma* reading) or supervenient appearances that do not themselves modify the substrate (closer to a *vivarta* reading). The debate runs without the clean vocabulary; the Sanskrit terms would force the distinction to be made explicitly.

## Where it shows up

**Model updates versus prompt variation.** A fine-tuned model is a *pariṇāma* of the base model — the parameters have actually changed; the substrate has been transformed. A prompted response from the unchanged base model is a *vivarta* on the substrate — the parameters are what they were, the surface output is a new appearance that leaves the model itself untouched. Confusing the two produces predictable failures in evaluation and deployment: treating prompt-variation as if it had substrate-grade durability, or treating fine-tuning as if it were as reversible as a prompt change.

**Product update versus UI change.** A new feature that changes the underlying data model is a *pariṇāma* — the substrate of the product has been modified. A new UI on the same data model is closer to *vivarta* — the substrate is unchanged, the appearance is new. The strategic implications differ: a *pariṇāma* update is migration territory with backward-compatibility questions; a *vivarta* update is theming territory with rollback ease. Treating one as the other generates incident reports.

**Personal change.** A meditator who has been practicing for a year might be experiencing *pariṇāma* — accumulated *saṁskāra* (Y6) has actually modified the dispositional substrate — or might be experiencing *vivarta* — the everyday mood is being held in a more skilful frame without the substrate having changed yet. Both are happening; they are different in kind. The Yoga frame insists the distinction matters for evaluating where one is in cultivation. The *vivarta* case will revert when conditions change; the *pariṇāma* case will not.

**Organisational change.** A company restructure that moves people around without modifying the underlying culture is *vivarta* — the appearance has changed, the substrate has not. A change that modifies what people are rewarded for, how decisions get made, what counts as good work, is *pariṇāma* — the substrate is being transformed. The same announcement can be either, and the leadership question is which one is actually being attempted.

**Database schema migrations.** The textbook *pariṇāma* / *vivarta* case in software. A view is *vivarta* over the underlying tables — the appearance is rearranged; the substrate is unchanged. A migration that alters the tables is *pariṇāma* — the substrate is genuinely modified. The engineering discipline around the two is different; the conceptual distinction is the same one Vedanta worked out for the world.

**Brand refresh versus brand repositioning.** New logo, new colours, same product, same value proposition — *vivarta*. New product, new value proposition, new market, same name — *pariṇāma* wearing the costume of *vivarta*. The strategic conversation gets confused when the two are not distinguished.

## Diagnostic question

*"Is this a transformation of the substrate or a transformation of the appearance on an unchanged substrate — because the durability, the reversibility, and the downstream consequences differ."*

## Indic roots

The Sanskrit terms are *vivarta* (विवर्त, from *vi-vṛt*, "to turn around," "to revolve" — the rolling-over of the substrate into an apparent form without the substrate's actual modification) and *pariṇāma* (परिणाम, from *pari-nam*, "to bend around," "to develop" — the substrate's own actual modification into a new state). The terms are inherited from older Sankhya usage, where *pariṇāma* names the doctrine of how *prakṛti* unfolds into the world through real transformations of its *guṇa* equilibrium. Sankara, in his *Brahma-sūtra-bhāṣya* and especially in commentary on sutras such as 2.1.14 and 2.1.27, develops *vivarta-vāda* as the appropriate doctrine for *brahman*'s relation to the world: the world is *vivarta*, not *pariṇāma*, of *brahman*, because *brahman* is unchanging. Post-Sankara Advaitins, especially Padmapada, Vacaspati Misra, and Prakasatman, work out the technical apparatus of *vivarta-vāda* in detail. Ramanuja, in his *Śrī-bhāṣya*, contests this and argues for a *pariṇāma* reading: the world is a real modification of *brahman*, the substrate that has the world as its body. The Madhva tradition has its own position. The dispute is the central post-Sankara debate in Vedanta, and the technical analysis on both sides is substantial. The card draws on the structural use of the *vivarta* / *pariṇāma* distinction, which has clean application well beyond the metaphysical dispute.

See also V1 (*adhyāsa* — the cognitive mechanism by which *vivarta* generates the apparent form), V2 (*sat / asat / anirvachanīya* — the ontological status of objects generated through *vivarta*), and Y6 (*saṁskāra* — the substrate-level deposit that distinguishes *pariṇāma* personal change from *vivarta* personal change).

## Further reading

Eliot Deutsch, *Advaita Vedanta: A Philosophical Reconstruction*, for accessible philosophical entry to *vivarta-vāda*. Julius Lipner, *The Face of Truth*, for Ramanuja's *pariṇāma* position. Sankara's *Brahma-sūtra-bhāṣya* (Swami Gambhirananda translation) on sutras 2.1.14 and 2.1.27 for the source treatment. Karl Potter, *Advaita Vedānta up to Śaṁkara and his Pupils*, for the technical literature.
