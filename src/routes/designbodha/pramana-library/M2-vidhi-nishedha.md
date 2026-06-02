---
id: M2
slug: vidhi-nishedha
title: "Utterance Types"
sanskrit:
  transliteration: "vidhi / niṣedha"
  devanagari: "विधि / निषेध"
register:
  tradition: Mimamsa
  text: "Mimamsa. Root texts: Jaimini's *Mīmāṁsā-sūtras* and Sabara's *bhāṣya*, with elaboration by Kumarila Bhatta and Prabhakara."
applicability:
  - Builders
  - Stewards
cross_refs:
  - G1
  - N1
  - N8
gist: |
  An utterance that tells someone to do something is doing different work from an utterance that describes or one that prohibits. Mimamsa worked out the typology and the operational consequences. The frame names what interface affordances, policy rules, prompt instructions, and content moderation guidelines all are at the level of speech act.
question: What kind of injunction-utterance is this - is it establishing new obligation, restricting means, or excluding alternatives - and who is the qualified subject it presupposes?
---

Mimamsa - the Indian philosophical tradition of textual hermeneutics - grew up around a single pressing question: how do the Vedic injunctions actually function as language? The Veda contains many kinds of sentences. Some describe how the world is (*arthavada*, eulogistic or explanatory material). Some name things (*namadheya*). And a specific subset - the operative core, for Mimamsa - *enjoin* action. Do this. Do not do that. Do this in this way. These last are *vidhi* (positive injunction) and *nishedha* (prohibition), and Mimamsa builds an elaborate machinery for analyzing them as a distinct grade of utterance with its own logic.

The foundational move: an injunction does something different from a description. "Water is wet" and "perform the agnihotra at dawn" are not two facts of the same kind. The second generates an obligation, structures an action, configures the recipient as someone who is now bound. Mimamsa works out what makes an injunction operative: the verbal form (the optative, the imperative), the existence of a qualified subject (*adhikarin*), the specification of the act, the result it points toward, the procedure by which it is executed. Each component is analyzed separately because each can fail separately.

The analysis of nishedha runs parallel to vidhi but is not symmetric. A prohibition does not simply enjoin the opposite of what it forbids. It carves out a specific class of acts as not-to-be-done, leaving the rest of the action-space untouched. Mimamsa distinguishes *paryudasa* - the prohibition that picks out a particular item from a larger class, leaving the class intact - from *prasajya-pratishedha* - the prohibition that negates the act entirely. The surface form "do not do X" is the same in both; the structural consequences differ sharply.

The further apparatus is large. Mimamsa distinguishes injunctions by their relation to the result: the *apurva-vidhi* that establishes a previously unknown obligation, the *niyama-vidhi* that restricts the means among already-available options, the *parisankhya-vidhi* that excludes alternatives. The whole apparatus treats injunction as a structured object of analysis, with components that can be examined and revised.

## Where English Falls Short

Austin and Searle on illocutionary force, the constative-performative distinction, the imperative as its own utterance-type - the English speech-act tradition has some of this territory. The Mimamsa treatment is older and more operational, and it covers ground the English tradition has never systematically worked.

The English vocabulary of "rule," "policy," "guideline," "command," "instruction" treats injunction as an undifferentiated category. A user-facing instruction, a developer-facing policy, a moderation rule, and a legal prohibition are all "rules" in ordinary discourse. The Mimamsa frame asks: what kind of vidhi is this? Is it establishing a new obligation? Restricting the means by which an existing obligation can be met? Excluding alternatives? Each kind has different conditions for being operative and different conditions for being violated.

The English vocabulary also collapses the paryudasa-prasajya distinction. "Do not include personally identifying information" can mean either "this is one prohibited item within the larger class of allowed information" or "negate this entire kind of inclusion." The two have different operational consequences. Many policy disputes are structurally disputes about which kind of prohibition was issued - but the dispute cannot be articulated cleanly because the English term covers both.

## Where it Shows Up

**Interface affordances as injunctions.** A button labelled "Submit" is a vidhi of sorts - it enjoins an action with a specified result. A red exclamation mark next to a field is a nishedha with paryudasa structure: this particular input is forbidden, others remain available. Treating interface elements as injunctive utterances surfaces the structural questions the Mimamsa apparatus is built around: who is the qualified subject, what is the result, what is being restricted versus excluded?

**Policy and content moderation rules.** A moderation rule is an injunction directed at a population of users. The Mimamsa frame asks: is this apurva-vidhi (establishing an obligation users could not have derived on their own), niyama-vidhi (restricting which means may be used to a permitted end), or parisankhya-vidhi (excluding alternatives among means)? Most platform rules collapse these, and produce predictable failure modes when users dispute the rule's reach.

**Prompt instructions to language models.** A system prompt is a complex injunction directed at a non-human adhikarin. The conditions of efficacy - the qualified subject, the result, the procedure - are unstable in ways the Vedic case never faced, but the analytic decomposition is structurally the same. Asking "what kind of vidhi is each clause of this prompt?" is more rigorous than asking "what does the prompt say?"

**Codes of conduct and ethical guidelines.** A code of conduct mixes arthavada (descriptive, explanatory material) and vidhi (injunctive material). Mimamsa would insist that only the injunctive material is operative as obligation; the arthavada frames context. Many codes fail by burying the injunctive core in arthavada, leaving readers unable to distinguish what is enjoined from what is being illustrated.

**Legal drafting.** The Mimamsa machinery was historically applied in classical Indian jurisprudence (in Dharmashastra) to analyze the operative core of legal injunctions. The same discipline applies to contemporary legal drafting: separating the operative vidhi from the surrounding arthavada, identifying the kind of negation in a prohibition, locating the qualified subject.

## IKS Roots

The Sanskrit terms are *vidhi* (विधि, injunction, from *vi-dha*, "to ordain") and *nishedha* (निषेध, prohibition, from *ni-sidh*, "to ward off"). Jaimini's *Mimamsa-sutras* (c. 2nd century BCE) lay out the foundational analysis of injunction. Sabara's *bhashya* (4th-5th century CE) is the major commentary; Kumarila Bhatta and Prabhakara Misra (7th-8th centuries) elaborate the two great Mimamsa schools around how injunctions are to be read. The classification of vidhi into apurva-vidhi, niyama-vidhi, and parisankhya-vidhi, and the distinction of nishedha into paryudasa and prasajya-pratishedha, are technical Mimamsa contributions without parallel in Western philosophy of language. Mimamsa also developed the theory of *bhavana* - the productive force of the injunction - which analyzes how an injunctive utterance generates the disposition to act. Vyakarana (see G1, karaka) interacts with Mimamsa here, since the verbal form of the injunction carries part of its force.

See also N1 (the pramana frame within which shabda, including vidhi, sits as a means of knowing), N8 (shabda - testimony, the broader category to which injunctive utterance belongs), and G1 (karaka - the case-relations through which an action's structure is specified).

## Further Reading

Francis X. Clooney, *Thinking Ritually: Rediscovering the Purva Mimamsa of Jaimini*, for an accessible scholarly entry to Mimamsa's analysis of injunction. Othmar Gachter, *Hermeneutics and Language in Purva Mimamsa*, for the speech-act dimension. Kunjunni Raja, *Indian Theories of Meaning*, for the language-philosophical apparatus.
