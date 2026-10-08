# Field gaps: what the existing literature doesn't address

This document maps the unresolved gaps in the trauma-informed design field —
both to position this library accurately within the existing work, and to
identify where original contributions are most needed.

---

## Gap 1: Care workers as users

**What exists:** Almost all TI design literature addresses people receiving care.
The user is assumed to be a patient, survivor, or service user.

**What's missing:** Design guidance for the people who do care work. Social workers,
healthcare providers, crisis counsellors, content moderators, and community health
workers use interfaces every day that are built with the same extractive assumptions
as every other enterprise software. The psychological cost of poorly designed care
worker tools is well-documented (compassion fatigue, secondary traumatic stress)
but not connected to interface design in any published framework.

**What this library contributes:** `guidelines/care-worker-ux.md` — the only
published framework specifically addressing this population. Component specifications
for `SessionTransition`, `ExposurePacingProvider`, and `VoluntaryCheckIn` are
documented, not yet implemented.

**What's still needed:** User research with actual care workers. Co-design.
Validation that the proposed patterns actually help.

---

## Gap 2: Intersectionality beyond health and crisis contexts

**What exists:** SAMHSA's sixth principle (Cultural, Historical, and Gender Issues)
is defined but poorly translated into digital design practice. The Chayn whitepaper
addresses gender and domestic abuse. A 2023 CHI paper addresses racial trauma on
social media.

**What's missing:** Practical guidance on designing for racial trauma specifically.
How does an interface read differently to a Black user navigating a government
benefits system that has historically discriminated against them? How does an
interface for a trans user navigating a healthcare system that has repeatedly
misgendered them need to be different? These are not abstract questions — they
affect millions of users in ordinary product contexts.

**What this library contributes:** Acknowledgement of the gap, citation of racial
trauma theory (Cénat et al., 2023), explicit invitation for co-design contributions
from affected communities.

**What's still needed:** Co-design research. Community review of component
language and imagery. Specific guidelines for racially and culturally diverse
contexts. Probably: a collaborator who brings lived experience this library
currently lacks.

---

## Gap 3: Extension beyond health and crisis contexts

**What exists:** TI design is documented almost entirely in health, crisis, and
justice tech contexts. The field rarely asks: what would a trauma-informed bank
interface look like? A trauma-informed HR system? A trauma-informed social media
platform?

**What's missing:** Application of TI principles to everyday digital contexts
where users may be in distressed states — financial services (debt, benefits),
workplace tools (performance reviews, absence management), housing platforms,
immigration and border systems, child welfare.

The CHI 2022 paper "Trauma-Informed Computing" is the most important attempt at
generalisation, proposing that TI principles should apply across all computing
contexts, not just clinical ones.

**What this library contributes:** Components designed to be domain-agnostic.
`<RegretButton>` and `<ConsentStepper>` are as applicable to a fintech onboarding
as to a health assessment.

**What's still needed:** Case studies in non-health contexts. Sector-specific
guidelines for fintech, housing, workplace tools, and immigration tech. Advocacy
for TI practice in mainstream product design — not just specialist contexts.

---

## Gap 4: The evidence base

**What exists:** A growing body of practitioner writing and some peer-reviewed
papers. The 2025 Eggleston et al. scoping review is the most systematic overview.

**What's missing:** Controlled studies. We do not have randomised trials showing
that trauma-informed UI components reduce user distress compared to standard
components. We do not have validated instruments for measuring an interface's
trauma-informedness. We do not know which components matter most for which
populations, or whether the effect sizes are meaningful.

This is a genuine problem. It means the field risks becoming performative — adopted
as a signal of progressive values without demonstrable benefit.

**What this library contributes:** Transparency about the evidence gap
(`research/honest-critique.md`). Component rationales grounded in what is
empirically solid (stress physiology, perceived control, predictability) rather
than only in contested theories.

**What's still needed:** Longitudinal research. Partnership with clinical
researchers who can design and run valid studies. Metrics that go beyond
"users report feeling safer" to measurable physiological and behavioural outcomes.

---

## Gap 5: Designer and developer adoption

**What exists:** Growing awareness among practitioners. UXPA now offers TI
professional development. Several large organisations (GOV.UK, GSA) have adopted
TI principles.

**What's missing:** A reusable, well-documented, npm-installable component library.
This is the most actionable gap — and the one this library directly fills.

The existing field produces writing, principles, and occasionally one-off
implementations. Nobody has packaged the patterns as something a developer can
`npm install`. This is why TI design remains a specialist practice rather than
default practice.

**What this library contributes:** The library itself.

**What's still needed:** Storybook documentation, TypeScript types, comprehensive
test coverage, Figma component kit, and a community of contributors who can
maintain it over time.

---

## What this library does not address

- **AI and machine learning systems:** The CHI 2022 paper extends TI principles
  to AI/ML — this library does not yet address model design, training data, or
  algorithmic decision-making.
- **Accessibility for specific disabilities:** TI principles overlap with
  accessibility but are not identical. This library does not replace WCAG or
  ARIA compliance — it should be used alongside, not instead of, accessibility
  standards.
- **The researcher's role:** Trauma-informed user research practice (how to
  conduct interviews with vulnerable populations, how to handle disclosure,
  how to protect participants) is documented by ResearchOps Community and others.
  This library addresses the design layer, not the research layer.

---

*Maintained by Luana Micheau / Care-Conscious Design*
*Last updated: March 2026*
