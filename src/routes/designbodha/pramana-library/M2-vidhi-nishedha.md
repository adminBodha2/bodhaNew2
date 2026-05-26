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
---

Mimamsa is the Indian philosophical tradition that grew up around the question of how the Vedic injunctions actually function as language. The Veda contains many sentences. Some describe how the world is (*arthavāda*, eulogistic or descriptive material). Some name things (*nāmadheya*). And a specific subset — the operative core, for Mimamsa — *enjoin* action: do this, do not do that, do this in this way. These last are *vidhi* (positive injunction) and *niṣedha* (prohibition), and Mimamsa builds an elaborate machinery for analysing them as a distinct grade of utterance with its own logic.

The first move is to recognise that an injunction is doing something different from a description. "Water is wet" and "perform the agnihotra at dawn" are not two facts of the same kind; the second is generating an obligation, structuring an action, configuring the recipient as one who is now bound. Mimamsa's analysis works out what makes an injunction operative: the verbal form (the optative, the imperative), the existence of a qualified subject (*adhikārin*), the specification of the act, the result it points toward, the procedure by which it is to be executed. Each part is analysed separately because each can fail separately.

The companion analysis of *niṣedha* — prohibition — is parallel but not symmetric. A prohibition does not simply enjoin the opposite of what it forbids; it carves out a specific class of acts as not-to-be-done, leaving the rest of the action-space untouched. Mimamsa distinguishes *paryudāsa* (the prohibition that picks out a particular item from a larger class, leaving the class intact) from *prasajya-pratiṣedha* (the prohibition that negates the act entirely). The distinction matters because the same surface form — "do not do X" — operates in two structurally different ways depending on which kind of negation is in play.

The further apparatus is large. Mimamsa distinguishes injunctions by their relation to the result (the *apūrva-vidhi* that establishes a previously unknown obligation, the *niyama-vidhi* that restricts the means among already-available options, the *parisaṅkhyā-vidhi* that excludes alternatives). It distinguishes by their relation to the subject (who is qualified to be enjoined, who is not). It distinguishes by their relation to time and context. The whole apparatus is built around treating injunction as a structured object of analysis, with components that can be examined and revised.

## Where English Falls Short

English has the speech-act distinction in technical philosophy — Austin and Searle on illocutionary force, the difference between constatives and performatives, the imperative as its own utterance-type. The Mimamsa treatment is older and more operational, and it covers ground English speech-act theory has not systematically worked.

The English vocabulary of "rule," "policy," "guideline," "command," "instruction" treats injunction as an undifferentiated category. A user-facing instruction, a developer-facing policy, a moderation rule, and a legal prohibition are all called "rules" in ordinary discourse. The Mimamsa frame asks: what kind of *vidhi* is this? Is it establishing a new obligation, restricting the means by which an existing obligation can be met, or excluding alternatives? Each kind has different conditions for being operative and different conditions for being violated.

The English vocabulary also collapses the *paryudāsa*–*prasajya* distinction. "Do not include personally identifying information" can mean either "this is one prohibited item within the larger class of allowed information" or "negate this entire kind of inclusion." The two have different operational consequences: the first leaves the class intact and asks where the boundary is; the second negates the kind. Many policy disputes are really disputes about which kind of prohibition was issued, but the dispute cannot be articulated cleanly because the English term covers both.

## Where it Shows Up

**Interface affordances as injunctions.** A button labelled "Submit" is a *vidhi* of sorts — it enjoins an action with a specified result. A red exclamation mark next to a field is a *niṣedha* — a prohibition with paryudāsa structure (this particular input is forbidden, others remain available). Treating these as injunctive utterances — and not only as "UI elements" — surfaces the structural questions that the Mimamsa apparatus is built around: who is the qualified subject, what is the result, what is being restricted versus excluded.

**Policy and content moderation rules.** A moderation rule is an injunction-utterance directed at a population of users. The Mimamsa frame asks: is this *apūrva-vidhi* (establishing a new obligation users could not have known on their own), *niyama-vidhi* (restricting which means may be used to a permitted end), or *parisaṅkhyā-vidhi* (excluding alternatives among means)? Most platform rules collapse these and produce predictable failure modes when users dispute the rule's reach.

**Prompt instructions to language models.** A system prompt is a complex injunction-utterance directed at a non-human qualified subject. The conditions of efficacy — the *adhikārin*, the result, the procedure — are unstable in ways the Vedic case did not face, but the analytic decomposition is structurally the same. Asking "what kind of *vidhi* is each clause of this prompt" is more rigorous than asking "what does the prompt say."

**Codes of conduct and ethical guidelines.** A code of conduct mixes descriptive (*arthavāda*) and injunctive (*vidhi*) material. Mimamsa would insist that only the injunctive material is operative as obligation; the descriptive frames context. Many codes fail by burying the injunctive core in *arthavāda*, leaving readers unable to tell what is enjoined and what is being illustrated.

**Legal drafting.** The Mimamsa machinery was historically used in classical Indian jurisprudence (in Dharmaśāstra) to analyse the operative core of legal injunctions. The same analytic discipline applies to contemporary legal drafting: separating the operative *vidhi* from the *arthavāda* that surrounds it, identifying the kind of negation in a prohibition, locating the qualified subject.

**Recommender systems framed as injunctions.** A recommender that says "you should watch X" is issuing a quasi-injunction. Whether it functions as one depends on the framing. The Mimamsa frame asks: is the recommendation being read by the user as descriptive ("here is what you might watch") or injunctive ("watch this")? The two readings produce different downstream behaviours and different ethical loads.

## Diagnostic Question

*"What kind of injunction-utterance is this — is it establishing new obligation, restricting means, or excluding alternatives — and who is the qualified subject it presupposes?"*

## IKS Roots

The Sanskrit terms are *vidhi* (विधि, injunction, ordinance, from *vi-dhā*, "to ordain") and *niṣedha* (निषेध, prohibition, from *ni-sidh*, "to ward off"). Jaimini's *Mīmāṁsā-sūtras* (c. 2nd century BCE) lay out the foundational analysis of injunction. Sabara's *bhāṣya* (4th–5th century CE) is the major commentary, and Kumarila Bhatta and Prabhakara Misra (7th–8th centuries) elaborate the two great schools of Mimamsa around how to read injunctions. The classification of *vidhi* into *apūrva-vidhi*, *niyama-vidhi*, and *parisaṅkhyā-vidhi*, and the distinction of *niṣedha* into *paryudāsa* and *prasajya-pratiṣedha*, are technical Mimamsa contributions. The Mimamsa tradition also developed the theory of *bhāvanā* — the productive force of the injunction — which analyses how an injunctive utterance generates the disposition to act. Sanskrit grammar (Vyakarana, see G1 *kāraka*) interacts with Mimamsa in this analysis, since the verbal form of the injunction carries part of its force.

See also N1 (the *pramāṇa* frame within which *śabda*, including *vidhi*, sits as a means of knowing), N8 (*śabda* — testimony, the broader category to which injunctive utterance belongs), and G1 (*kāraka* — the case-relations through which an action's structure is specified, complementing Mimamsa's injunction-analysis).

## Further Reading

Francis X. Clooney, *Thinking Ritually: Rediscovering the Pūrva Mīmāṁsā of Jaimini*, for an accessible scholarly entry to Mimamsa's analysis of injunction. Othmar Gachter, *Hermeneutics and Language in Pūrva Mīmāṁsā*, for the speech-act dimension. Kunjunni Raja, *Indian Theories of Meaning*, for the language-philosophical apparatus. Wilhelm Halbfass, *India and Europe*, chapters on Mimamsa for comparative framing.
