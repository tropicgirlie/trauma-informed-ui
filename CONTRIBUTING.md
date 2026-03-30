# Contributing

Contributions are welcome — and especially from clinicians, social workers,
community health workers, and designers with lived experience of trauma,
care work, or marginalised identity.

Please read `research/honest-critique.md` before contributing. This document
explains the field's limitations and the specific risks of "trauma-washing."
It is not a barrier to entry — it is context you need to contribute well.

---

## What we need

- **Component contributions** — React components implementing new patterns
  (see the planned care worker components in `guidelines/care-worker-ux.md`)
- **Guideline contributions** — Additions to the UX writing guide,
  the audit checklist, or the SAMHSA mapping document
- **Research contributions** — Annotations for the bibliography,
  corrections to cited studies, new peer-reviewed sources
- **Translation** — Adapting language guidelines for non-English contexts
- **Clinical review** — Clinicians checking that the neurobiological and
  clinical rationales are accurate and appropriately caveated
- **Community co-design** — If you work with or are part of a community
  this library claims to serve, your input on whether it actually does
  is the most valuable contribution of all

---

## What we won't merge

- Components that implement dark patterns (pre-selected options, bundled consent,
  hidden opt-outs) even in configurable or optional forms
- Gamification of care work metrics
- Claims that this library makes a product "trauma-informed" — it makes
  components available; the rest is organisational process
- Components designed for contexts that contradict the library's values
  (predatory financial products, surveillance systems, carceral tech)

---

## How to contribute

1. Open an issue describing what you want to add or change
2. For new components, include: the SAMHSA principle it serves,
   the neurobiological rationale, and the anti-pattern it addresses
3. For guidelines, include your primary sources
4. Fork, branch, and open a PR against `main`

---

## Code style

- TypeScript — strict mode, no `any`
- Components are functional with hooks
- Props interfaces are exported with full JSDoc
- Every component documents its SAMHSA principle and neurobiological rationale
  in its JSDoc comment
- No default exports — named exports only

---

*Questions? Open an issue or email luana@momops.io*
