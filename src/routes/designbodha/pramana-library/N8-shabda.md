---
id: N8
slug: shabda
title: "Testimony as a Means of Knowing"
sanskrit:
  transliteration: "śabda"
  devanagari: "शब्द"
register:
  tradition: Nyaya
  text: "Nyaya, Mimamsa, and Vedanta. One of the four *pramāṇa*s accepted by Nyaya and one of the six accepted by Mimamsa. Treated systematically in Nyaya-sutra 1.1.7 and Kumarila's *Ślokavārttika*."
applicability:
  - Users
  - Builders
  - Stewards
cross_refs:
  - G3
  - G4
  - N1
gist: |
  A great deal of what anyone knows comes from being told. The Indian schools worked out a structured account of when verbal communication is a valid route to knowledge and when it fails — operational at a level Western epistemology only recently caught up to.
---

When you read that the capital of Mongolia is Ulaanbaatar, you come to know it. Not by perception (you have not been there), not by inference (no general rule entails it), not by postulation (the world makes sense without you knowing this). You know it because a source told you, and the source is the kind that knows. The Indian schools call this cognitive route *śabda* — testimony — and treat it as a distinct *pramāṇa* with its own validity conditions.

The Nyaya analysis is precise. Valid testimony requires a reliable speaker (*āpta* — one who knows the truth and is willing to communicate it), a coherent utterance (each word having an understood meaning, the words combining grammatically, the combination being interpretable), and a competent hearer who grasps the utterance correctly. When these conditions are met, the hearer comes to know what the utterance says. When any one fails, the cognitive route fails — and the failure modes are distinct, calling for different responses.

A speaker who does not know the truth produces *unreliable* testimony — the failure is at the source. A speaker who knows but distorts produces *lying* testimony — the failure is in transmission. An utterance whose words do not combine produces *incoherent* testimony — the failure is in the message. A hearer who mis-parses produces *misunderstood* testimony — the failure is in reception. Each is a separate route to invalidity, and the *śabda* frame keeps them straight.

The Mimamsakas added a further distinction that does not concern us here (testimony from an authored source vs from the Vedas), but the operational structure for general testimony is shared across the schools.

## Where English Falls Short

Western epistemology has only recently — in the last few decades, through writers like Coady, Lackey, Goldberg, and Fricker — taken testimony seriously as an independent source of knowledge. The default position for much of the twentieth century was reductionist: testimony works only insofar as it can be backed by inference from the hearer's own evidence. The Indian schools never had this prejudice. *Śabda* has been treated as a structured cognitive route, with its own validity conditions, for over two thousand years.

The practical consequence is that the Indian frame is more developed at the operational level. Western testimony epistemology asks the high-level question "is testimony reducible to other sources?" The Indian frame asks the working questions: is the speaker reliable, is the utterance coherent, is the hearer competent, and which of these conditions is failing when the testimony fails? For practical work with AI output, expert claims, and information systems, the working questions are the useful ones.

## Where it Shows Up

**AI as a testimonial source.** Much of what LLMs do is testimonial in structure — they tell you things, and you come to know them via testimony; the underlying facts go unchecked. The *śabda* frame lets you ask the right questions. Is the model the kind of source that knows what it is saying (the reliability question)? Is the output coherent and parseable (the message question)? Is the user in a position to understand it correctly (the reception question)? Different AI failures sit at different points in the chain.

**Citation chains.** "Source A says X, citing source B." The *śabda* validity propagates only if each link is reliable, coherent, and competently received. Citation chains break in characteristic ways: the original source did not say what is attributed to it (failure at the source), the citation distorts the original (failure in transmission), the cited paper itself rested on bad testimony from elsewhere (recursive failure).

**Expert claims.** "The expert says X." The frame breaks this into: does this person actually know X (are they an *āpta* on this topic)? Is what they said well-formed and interpretable? Was it received without distortion? Stakeholders often treat expert testimony as monolithic; the frame pulls it apart.

**Research review.** A paper claims something based on interview data. The data is testimony from the interviewees. The paper's validity depends partly on whether the *śabda* conditions were met at the interview level — were the interviewees in a position to know, did they communicate clearly, did the researchers interpret correctly?

**Onboarding and documentation.** Documentation is testimony from past engineers to future ones. The conditions for valid *śabda* — reliable speaker, coherent message, competent hearer — apply directly. Documentation failures usually trace to one of these conditions failing.

**Disinformation analysis.** The *śabda* frame is operational for evaluating claims at scale. A claim is invalid testimony if any condition fails. Most disinformation lives at the source-reliability layer (the speaker does not know or is lying), but a non-trivial portion lives at the reception layer (the hearer mis-parses an otherwise valid utterance).

## Diagnostic Question

*"Is the source the kind that knows, is the message coherent, and am I in a position to receive it correctly — and if the testimony is going wrong, which of these three is the failure point?"*

## IKS Roots

The Sanskrit term is *śabda* (शब्द), literally "word" or "sound," used technically for testimony as a *pramāṇa*. Nyaya defines it at sutra 1.1.7: *āptopadeśaḥ śabdaḥ* — testimony is the instruction of a reliable person. The key term is *āpta* (आप्त), the reliable one — defined as one who has true knowledge and the disposition to communicate it. The technical apparatus of *śabda* includes *padārtha* (word-meaning), *vākya* (the sentence as a unit of meaning), and *tātparya* (the speaker's intended import) — the analysis of how words combine into meaningful utterances is itself a major branch of the tradition and overlaps with Vyakarana (see G3, G4). The Mimamsa school's treatment of *śabda* extends to the question of *apauruṣeya* utterance — testimony without an author — which is a doctrinally specific concept applied within Mimamsa to the Vedas and is not relevant to the operational use of testimony in design and AI work.

See N1 (the wider *pramāṇa* frame), G3 (*lakṣaṇā* — secondary meaning, important when testimony is figurative), and G4 (*śaktigraha* — how word-meaning is grasped, the reception side of *śabda*).

## Further Reading

Bimal Krishna Matilal, *Word and the World* (Oxford), is the most accessible scholarly entry to the Indian theory of testimony and its overlap with the philosophy of language. Arindam Chakrabarti's essays on *śabda* in *Knowing from Words* (edited with Matilal). For modern Western testimony epistemology that has independently arrived at similar territory, Jennifer Lackey's *Learning from Words*. The Karl Potter *Encyclopedia of Indian Philosophies* volumes on Nyaya and Mimamsa for the canonical positions.
