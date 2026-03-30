# Honest critique: limitations of the trauma-informed design framework

This document exists because trauma-washing is a real risk. "Trauma-informed"
has become a signifier that organisations use to indicate progressive values
without necessarily changing anything structural. This library is committed to
not doing that.

Read this before contributing. Read it before using this library with clients.

---

## The evidence base is thin

The 2025 scoping review by Eggleston et al. examined 118 digital interventions
and found that **99% did not explicitly reference a trauma-informed framework**
despite working with trauma-affected populations. This means the literature is
largely aspirational and practitioner-driven, not experimentally validated.

What we do not have:

- Controlled trials testing whether trauma-informed UI components actually reduce
  user distress compared to standard components
- Longitudinal evidence that these design patterns support trauma recovery
- Validated instruments for measuring the trauma-informedness of an interface
- Evidence on which specific components matter most for which populations

What this means for this library: the component rationales are based on
theoretical coherence and clinical analogy, not randomised controlled trials.
They should be treated as informed hypotheses, not proven interventions.

---

## Polyvagal theory has scientific critics

Polyvagal theory (Porges, 1995/2011) is widely used in trauma therapy and is
the neurobiological foundation cited most often in trauma-informed design writing,
including in this library's component rationales.

Its core claims — that the vagus nerve has two distinct branches that mediate
social engagement and shutdown states respectively — have been challenged by
neurophysiologists. A 2023 review by Paul Grossman found "broad consensus among
experts that each basic physiological assumption of the polyvagal theory is
untenable."

This does not mean the clinical heuristics derived from polyvagal theory are
wrong. The concepts of neuroception, the window of tolerance, and co-regulation
remain influential and clinically useful even if the specific neuroanatomy they
invoke is contested. But designers using polyvagal theory as a justification for
specific design decisions should know they are working with contested science.

**What this library does:** Component rationales reference polyvagal theory where
relevant but do not present it as settled fact. Where possible, rationales are
also grounded in better-validated mechanisms (predictability, cognitive load,
perceived control).

---

## "Trauma-informed" can individualise systemic problems

The dominant framing of trauma-informed design focuses on individual users'
trauma responses. This risks treating trauma as a private condition to be
accommodated, rather than asking why the conditions that produce trauma exist
in the first place.

A trauma-informed intake form for asylum seekers does not address the asylum
system that traumatises them. A trauma-informed interface for DV survivors does
not address housing policy or economic dependency. A trauma-informed EHR does
not address healthcare workers' wages or staffing ratios.

This library does not resolve this tension. It operates at the interface layer
and cannot reach the systemic layer. But it tries not to pretend the systemic
layer doesn't exist — which is why the Care-Conscious Design framework it sits
within includes an organisational methodology (MomOps) and a critique of
extractive design methodology ("Touchpoints Owe Us Something").

**The risk to watch for:** using this library to make a harmful system feel
nicer to use, without changing the system. A trauma-informed interface for a
predatory lending product is still a predatory lending product.

---

## Cultural specificity is under-developed

SAMHSA's sixth principle (Cultural, Historical, and Gender Issues) is the least
translated to digital design practice. The existing literature almost exclusively
addresses white Western users, and the dominant frameworks draw on clinical
traditions that have their own cultural biases.

Racial trauma is clinically distinct from other forms of trauma in important ways
(Cénat et al., 2023). It is interpersonal and systemic simultaneously, it is
often disbelieved or minimised by institutions, and it is re-triggered by the
very systems that are supposed to help.

This library's current components do not adequately address racial trauma. They
implement structural principles (predictability, agency, exit) that are broadly
applicable but have not been co-designed with communities who experience
intersecting traumas.

**Commitments:** the research folder documents racial trauma theory. The
contributing guidelines invite contributions from clinicians and designers with
relevant lived experience. The library will not claim to be intersectionally
rigorous until it has been co-developed with the communities it aims to serve.

---

## The care worker dimension is almost entirely absent from the field

See `guidelines/care-worker-ux.md` for the full analysis.

The short version: the existing trauma-informed design literature does not address
people whose job involves sustained exposure to others' trauma. This is a gap this
library explicitly sets out to fill — but the planned care worker components
(SessionTransition, ExposurePacingProvider, VoluntaryCheckIn) are not yet built.
What is documented is a specification, not a validated implementation.

---

## What this library is not

- **Not a clinical intervention.** Components do not replace trauma therapy,
  crisis support, or clinical assessment.
- **Not a certification.** Using this library does not make a product
  "trauma-informed." That requires process, research, and community involvement.
- **Not a substitute for user research.** The most important thing you can do
  is research with the specific people who will use your interface, in their
  actual context.
- **Not politically neutral.** This library makes an argument: that the default
  logics of product design are extractive and often harmful, and that design can
  choose differently. This is a position, not a methodology.

---

## What to do with this

1. Use the components as a starting point, not an endpoint
2. Do research with the people who will use what you build
3. Be honest with clients about what is and isn't evidenced
4. Do not use this library to make harmful systems feel safer to use
5. Contribute — especially if you have clinical, community, or lived experience
   this library currently lacks

---

## References

- Berliner, L. & Kolko, D. J. (2016). "Trauma Informed Care: A Commentary and Critique." *Child Maltreatment*, 21(2), 168–172.
- Cénat, J. M., et al. (2023). "Complex Racial Trauma: Evidence, Theory, Assessment, and Treatment." *Psychiatric Annals*, 53(4).
- Eggleston, M., et al. (2025). "A Scoping Review of Trauma-Informed Care Principles Applied in Design and Technology." *Digital Health*, 11.
- Grossman, P. (2023). "The Polyvagal Theory: An Inadequate Model for the Neurobiological Underpinnings of Psychotherapy." Preprint/lecture.
- Porges, S. W. (2011). *The Polyvagal Theory.* W.W. Norton.

---

*Maintained by Luana Micheau / Care-Conscious Design*  
*Last updated: March 2026*
