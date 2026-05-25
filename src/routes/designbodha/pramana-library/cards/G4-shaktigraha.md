---
id: G4
slug: shaktigraha
title: "The means by which meaning is grasped"
sanskrit:
  transliteration: "śaktigraha"
  devanagari: "शक्तिग्रह"
register:
  tradition: Vyakarana
  text: "Vyakarana, with substantial treatment in Nyaya. Standard summary in Mammata's *Kāvyaprakāśa* and in the Navya-Nyaya tradition."
applicability:
  - Builders
  - Stewards
cross_refs:
  - A1
  - G2
  - G3
  - M2
  - N8
gist: |
  The classical Indian analysis of how the relation between a word and its meaning is learned. Eight named means: grammar, lexicon, dictionary, the word of a trusted authority, the speech of elders, the context of usage, association with a known word, and the sentential context itself. The frame is what model training, language acquisition, and onboarding to specialised vocabulary all are at the level of process.
---

# The means by which meaning is grasped

*Sanskrit: śaktigraha (शक्तिग्रह)*

## What it is

Words have meanings. How does anyone come to know which word means which thing? The Indian tradition takes this question seriously and answers it operationally. The relation between a word and its meaning is called *śakti* (literally "power" — the power of the word to designate its meaning). The grasp of this relation is *śaktigraha* — the cognitive act of coming to know what a word means. The standard classical list names eight means by which *śaktigraha* happens.

The list, with its operational character intact:

*Vyākaraṇa* — grammar. The structural rules of word-formation, prefix-and-suffix analysis, and verbal-root identification let you grasp that a word built on this root with that suffix designates this kind of meaning.

*Upamāna* — comparison. Someone tells you a *gavaya* is like a cow, and the next time you see a creature that is like a cow you grasp the *śakti* of *gavaya* in extending to it.

*Kośa* — lexicon. The dictionary or compiled word-list gives you the word-meaning relation directly.

*Āptavākya* — the word of a trusted authority. A reliable speaker tells you what a word means, and you take it on the authority of the speaker.

*Vyavahāra* — the usage of elders. You watch how more experienced speakers use the word in real situations and infer the *śakti* from the pattern of use.

*Vākyaśeṣa* — the rest of the sentence. The context of the surrounding words fixes what an ambiguous word must mean in this usage.

*Vivṛti* — the explanation, especially in commentary. A teacher or text explicitly explicates the meaning of a word that would otherwise be obscure.

*Prasiddhapadasānnidhya* — proximity to a familiar word. The unfamiliar word, placed next to a familiar one, takes on a related meaning by inference from the pairing.

The list is not exhaustive in the strict sense; different commentators add or subtract. The point is the structural one: meaning is grasped through multiple distinct procedures, and the procedures are different in kind. Grasping a word's meaning through the lexicon is a different cognitive act from grasping it through watching elders use it, which is different from grasping it through grammatical analysis. A speaker's facility with a word reflects which of these procedures has been operative, and the operational profile differs.

The further classical move is the distinction between *śakti* — the conventional, direct relation between word and meaning — and the operations that ride on top of it (*lakṣaṇā*, see G3; *vyañjanā*, see A1). *Śaktigraha* is what is being learned at the foundational level. Without it the further operations have nothing to operate on.

## Where English falls short

The Western tradition has descriptive vocabulary for language acquisition (first-language acquisition, second-language acquisition, ostension, definition, contextual inference) and lacks a unified operational frame. The Indian list does the work of a unified frame: it names the distinct procedures by which the foundational word-meaning relation is grasped, and treats them as alternative or complementary routes to the same target.

The English vocabulary also lacks the *śakti* concept itself — the word-meaning relation as a distinct kind of thing that is the target of grasp. In English the question "what does the word mean" runs together two questions the Indian frame separates: what is the meaning (the thing designated, in some accounts) and what is the relation between the word and the meaning (the *śakti*, the conventional power). The separation matters because the relation can be in place when the meaning is not fully known (you know *gavaya* designates a cow-like creature without having seen one), and the meaning can be fully known when the relation is not (you know the creature without knowing what it is called).

In the AI training context, the English vocabulary is loaded with "training," "learning," and "fine-tuning" without distinguishing the procedures by which different parts of a model's competence are acquired. The *śaktigraha* list, applied at this level, makes the distinctions: some of a model's word-meaning competence is acquired *kośa*-style (from explicit dictionary and definitional data), some *vyavahāra*-style (from pattern of use across the corpus), some *vākyaśeṣa*-style (from contextual disambiguation across the training data). The operational profile of the model with respect to a given word depends on which route was dominant for it.

## Where it shows up

**Model training and corpus composition.** A model's competence with a word reflects the mix of *śaktigraha* routes that were available in its training data. Words frequent in definitional contexts (*kośa* dominant) behave differently at inference than words frequent only in usage (*vyavahāra* dominant). The frame asks: for a given vocabulary item, what was the dominant *śaktigraha* route in training, and does the inference behaviour match what that route would produce?

**Onboarding to specialised vocabulary.** A new hire learning the trade vocabulary of a company is undergoing a *śaktigraha* process. The eight routes are differentially available — there may be no *kośa* (no internal glossary), heavy *vyavahāra* (learn by watching), occasional *āptavākya* (a senior person explains), and substantial *vākyaśeṣa* (figure it out from how people use the word in meetings). The completeness and reliability of the acquired competence depends on the mix. Companies that rely entirely on *vyavahāra* produce slow onboarding and idiosyncratic competence; adding *kośa* and structured *vivṛti* accelerates and standardises.

**Glossary design.** A well-designed glossary is doing *kośa* explicitly. A glossary that defines a term by listing example usages is mixing *kośa* with *vyavahāra*. A glossary that defines a term by reference to a more familiar term is *prasiddhapadasānnidhya*. The choice of route affects how the reader's competence with the term develops.

**User research and the elicitation of language.** When a researcher asks users to define a term they use casually, the user is being asked to articulate a *śakti* that was grasped through *vyavahāra*. Definitions extracted under interview conditions often misrepresent the actual *vyavahāra*-grasped meaning, because the articulation forces the user to manufacture a *kośa*-style answer they did not in fact possess. The methodological corrective is to observe usage; the definition-question elicits a different competence from the one the user actually has.

**Translation and lexicography.** A bilingual dictionary is offering *upamāna* — this word is like that word. The translation works to the extent that the *śakti* of the two words is genuinely parallel, and fails when the two words have *śakti*-relations that diverge. Translation problems are often *śakti*-mismatch problems even when the surface meanings appear to match.

**Documentation and developer education.** Technical documentation is operating across the *śaktigraha* routes: it gives definitions (*kośa*), it shows examples (*vyavahāra*), it explains the underlying model (*vivṛti*), it references related familiar terms (*prasiddhapadasānnidhya*). Documentation that runs on a single route teaches narrowly; documentation that uses multiple routes builds a more robust grasp of the vocabulary.

## Diagnostic question

*"By which of these routes is the word-meaning relation being grasped here, and is the grasp robust enough for what it has to do downstream?"*

## Indic roots

The Sanskrit term is *śaktigraha* (शक्तिग्रह), from *śakti* (the power of a word to designate its meaning) and *graha* (the grasp, the act of taking hold of). The eight-fold list of means by which *śaktigraha* occurs is canonical in the Sanskrit grammatical and poetic literature. Mammata's *Kāvyaprakāśa* (11th century, second chapter) gives a standard summary; the list also appears in the Nyaya analyses of meaning and in the Navya-Nyaya literature. The verses summarising the eight routes circulate in slightly different forms across schools — śaktigraha is treated by *vyākaraṇa* (grammar), *upamāna* (comparison), *kośa* (lexicon), *āptavākya* (the trusted speaker), *vyavahāra* (usage), *vākyaśeṣa* (the rest of the sentence), *vivṛti* (explanation), and *prasiddhapadasānnidhya* (proximity to a familiar word). The standard mnemonic verse begins *śaktigrahaṁ vyākaraṇopamānakośāptavākyād vyavahārataśca* ("*śaktigraha* happens through grammar, comparison, lexicon, the word of a trusted speaker, and usage…"). The Mimamsa tradition adds its own treatment of how injunctive meaning is grasped (see M2). The Nyaya treatment of *śakti* as the verbal power of designation, contested by Mimamsa and Vyakarana, generates a substantial classical debate about the nature of the word-meaning relation itself.

See also G2 (*sphoṭa* — the unity that the *śakti* relates the word to), G3 (*lakṣaṇā* — the secondary meaning that operates on the primary *śakti* when context demands), and N8 (*śabda* — verbal testimony as a *pramāṇa*, the broader epistemological frame).

## Further reading

Kunjunni Raja, *Indian Theories of Meaning*, chapter on *śakti*, for the standard treatment. Bimal Krishna Matilal, *The Word and the World*, for the philosophical analysis. Mammata's *Kāvyaprakāśa*, second chapter, in R.C. Dwivedi or Ganganath Jha translation. Karl Potter's *Encyclopedia of Indian Philosophies*, volumes on Nyaya and on Navya-Nyaya, for the technical treatment of *śakti*.
