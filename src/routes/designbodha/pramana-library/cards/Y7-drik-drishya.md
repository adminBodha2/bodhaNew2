---
id: Y7
slug: drik-drishya
title: "The seer and the seen"
sanskrit:
  transliteration: "dṛk / dṛśya"
  devanagari: "दृक् / दृश्य"
register:
  tradition: Yoga
  text: "Sankhya-Yoga. Root text: Yoga-sutra 2.17–2.20; foundational to Sankhya cosmology and Advaita Vedanta inheritance."
applicability:
  - Builders
  - Stewards
cross_refs:
  - V1
  - Y1
  - Y5
gist: |
  A structural separation: the witnessing capacity and everything that can be witnessed are different in kind. The frame keeps the question of where observation lives in a system distinct from the question of what is being observed — and matters wherever an architecture must decide which parts watch and which parts act.
---

# The seer and the seen

*Sanskrit: dṛk / dṛśya (दृक् / दृश्य)*

## What it is

Sankhya-Yoga draws a structural line through what otherwise looks continuous. On one side is *dṛk*, the witnessing capacity — the bare fact of awareness, the seeing that does not become any of what it sees. On the other side is *dṛśya*, the entire field of the seen: every sensation, every emotion, every thought, every memory, every mental modification — everything that arises and can be cognised. The mind itself, on this map, sits on the *dṛśya* side. The witness witnesses the mind.

The claim is not psychological but ontological. The witness and the seen are different in kind. The seen has form, change, qualities, succession; the witness has none of these. Whatever can be objectified, whatever can be described, whatever can be the object of attention — that is *dṛśya*. The capacity that does the objectifying, describing, attending — that is *dṛk*. The Yoga sutras at 2.17–2.20 state the position and the practice that follows: confusion of *dṛk* with *dṛśya* is the structural condition of bondage, and the disciplined disjunction is the route to release.

The operational consequence sits at a different level from the metaphysical claim. Even without taking on the full Sankhya ontology, the disjunction is useful as an analytic move. Wherever a system involves both observation and acted-upon content, the disjunction asks: where is the witnessing happening, what is being witnessed, and are these two collapsed in the system's self-description in ways that hide what is actually going on?

The Yoga discipline also turns the disjunction inward. The practitioner learns to ask, of any arising mental event — anger, anxiety, an idea, a sensation — "this is seen; where is the seeing?" The answer cannot itself be objectified (the moment you try, you are again seeing the seeing, and the actual witness has receded). The discipline is not to find the witness as an object but to dwell as the witness while the *dṛśya* continues to arise.

## Where English falls short

Western philosophy has analogous distinctions — the transcendental subject in Kant, the noema-noesis structure in Husserl, the witness-consciousness in some strands of phenomenology — but these are technical philosophical positions; the everyday operational distinction the Sanskrit terms make available is missing. The *dṛk*-*dṛśya* frame in Sankhya-Yoga is built for cultivation: it is meant to be used in practice, and to live below the level of philosophical reflection.

The English "subject-object" distinction is structurally close but evaluatively contaminated. "Subjective" tends to mean "merely personal," "objective" tends to mean "real." The *dṛk*-*dṛśya* distinction is not about reality grades; it is about kinds. The witness is not more real than the seen; it is differently real.

"Awareness" in English carries some of the *dṛk* freight in contemplative usage but in cognitive science usually means a brain state — which puts the *dṛk* on the *dṛśya* side and loses the structural point. The Sanskrit term separates these levels cleanly.

In AI work, the absence of the distinction shows up as a category confusion. "The model is observing the conversation" treats the observer and the observed as a single computational process — they are the same thing happening in the same place. The *dṛk*-*dṛśya* frame asks: but where is the witnessing happening, structurally; what part of the system actually does the noticing, and what part is what is noticed? Many architectures collapse these and then are surprised when the resulting system cannot tell its inputs from itself.

## Where it shows up

**System architecture for observation.** Designing a system that watches something requires asking which components do the witnessing and which constitute the watched. Logging, monitoring, observability tooling — all of it depends on the separation. A system that tries to monitor itself from inside itself runs into the *dṛk*-*dṛśya* collapse: the watcher is part of what is watched, and the report is structurally compromised. External witnesses (separate observation systems) are the operational expression of the disjunction.

**Agent-environment loops in RL and embodied AI.** The standard formulation already encodes the disjunction — the agent observes the environment, takes actions, observes the consequences. The frame helps with the harder question of where the agent's internal model sits: when the agent reflects on its own state, is it acting as witness, or has the internal model become part of what is being witnessed? Cleaning this up changes how introspection layers are designed.

**Self-reporting in user research.** A user reports on their own experience. The disjunction asks: which part of the user's mind is being the witness in this report, and which part is what is being reported on — and is the report compromised by collapse of the two? The classical problem of self-report data has a structural diagnosis here.

**Designing AI that watches user behaviour without acting on it.** A purely observational AI is structurally different from an agentic one, and the difference is *dṛk*-shaped: pure witnessing without acting. Most product AIs collapse these, with observation immediately feeding action. The frame asks whether the collapse is intentional and what is lost by it.

**Reflective interfaces.** An interface that shows the user their own activity (analytics, dashboards, self-tracking apps) is offering the user a *dṛśya* — the user's activity becomes the seen, with the user as witness. The design question the frame surfaces: is the interface helping the user occupy the witness position, or is it inviting them to identify with what is shown and lose the disjunction (compare Y5)?

**Meditation and cultivation practice.** The frame is operationally direct in the contemplative register: the practice is to dwell as *dṛk* while *dṛśya* — sensations, thoughts, emotions — continues to arise. The discipline is not to suppress the *dṛśya* but to stop fusing with it.

## Diagnostic question

*"Where does the witnessing live in this system, what is the witnessed, and have they been collapsed in a way that hides what is actually going on?"*

## Indic roots

The Sanskrit terms are *dṛk* (दृक्, the seeing, the witnessing power) and *dṛśya* (दृश्य, the seen, that which is to be seen). Both derive from *dṛś* (दृश्, to see). Patanjali at sutra 2.17 names confusion of *draṣṭṛ* (the seer) and *dṛśya* (the seen) as the cause of what is to be avoided (*heya-hetu*); at 2.18 he characterises *dṛśya* as having the three *guṇa*s and as existing for the purpose of experience and release; at 2.20 he characterises the *draṣṭṛ* as bare seeing-power, pure though apparently coloured by its objects (*draṣṭā dṛśi-mātraḥ śuddho 'pi pratyayānupaśyaḥ*). The distinction is foundational to Sankhya — *puruṣa* (the witness) and *prakṛti* (the field of the seen, including the mind) are the two ontological poles of the system. Advaita Vedanta inherits the apparatus with a different metaphysical conclusion: the witness is ultimately not separate from the *brahman*, and what appears as *dṛśya* is superimposition (see V1). A short text in the Advaita tradition called the *Dṛg-dṛśya-viveka* (दृग्दृश्यविवेक, "Discrimination of Seer and Seen"), traditionally attributed to Sankara, walks the distinction as a contemplative exercise.

See also Y5 (*asmitā* — the *kleśa* in which *dṛk* collapses into *dṛśya*), Y1 (the *vṛtti* frame — *vṛttis* are the immediate contents of *dṛśya*), and V1 (*adhyāsa* — the Vedantic analysis of the structural confusion of seer and seen).

## Further reading

Edwin Bryant, *The Yoga Sutras of Patanjali*, for translation and commentary on sutras 2.17–2.20. Gerald Larson, *Classical Sāṃkhya*, for the *puruṣa*–*prakṛti* metaphysics that grounds the distinction. The *Dṛg-dṛśya-viveka* (with translations available from Ramakrishna Math and elsewhere) for the contemplative application in the Advaita register. Mikel Burley, *Classical Sāṃkhya and Yoga*, for an accessible scholarly entry to the witness-and-seen structure.
