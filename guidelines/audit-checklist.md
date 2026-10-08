# Trauma-informed interface audit checklist

Use this checklist to evaluate an existing interface for trauma-awareness.
It maps to the five lenses of Care-Conscious Design and to SAMHSA's six principles.

Score each item: ✓ Present / ✗ Absent / ~ Partially met / N/A Not applicable

---

## 1. Safety signals

> Does the interface feel physically and emotionally safe to use?

- [ ] There is a visible, persistent exit option on sensitive flows
- [ ] The exit clears history / does not leave trace on shared devices
- [ ] There are no auto-advancing flows (timed transitions, auto-play)
- [ ] There are no blinking, flashing, or rapidly moving elements
- [ ] Motion respects `prefers-reduced-motion` system setting
- [ ] Colour palette avoids urgency-coded reds and high contrast on sensitive forms
- [ ] The interface does not time out during sensitive tasks without warning
- [ ] If it does time out, it warns with enough time to save progress
- [ ] There are no notifications or pop-ups that interrupt unexpectedly during sensitive flows

**Notes:**

---

## 2. Trustworthiness & transparency

> Does the user always know what is happening and what will happen next?

- [ ] Content warnings appear before sensitive material — not after
- [ ] Content warnings are specific (describe what the user will encounter)
- [ ] Progress indicators show accurate step counts (no hidden steps)
- [ ] Data use is explained in plain language at the point of collection
- [ ] Links to privacy policy are present but do not substitute for plain-language explanation
- [ ] Error messages explain what happened and what to do next
- [ ] Error messages do not blame the user for system failures
- [ ] Confirmation states are clear and specific (not just "Success!")

**Notes:**

---

## 3. Granular consent

> Does the user have genuine, unbundled control over what they share and agree to?

- [ ] Consent decisions are presented one at a time — not bundled
- [ ] No options are pre-ticked or pre-selected
- [ ] "No" is as visually accessible as "Yes"
- [ ] Hint text explains why each piece of information is needed
- [ ] Users can go back and change consent decisions
- [ ] Consent can be withdrawn after the fact (with clear path to do so)
- [ ] The interface does not use dark patterns (confusing opt-outs, buried refusal options)
- [ ] Consent language is plain — no legal jargon

**Notes:**

---

## 4. Pacing & agency

> Does the user have meaningful control over the pace and depth of the experience?

- [ ] There are no forced timers or countdown clocks on decisions
- [ ] Users can save progress and return without penalty
- [ ] Users can stop mid-flow without losing all progress
- [ ] There is a mechanism to detect hesitation and offer support (PauseAware pattern)
- [ ] Progressive disclosure is used for optional detail — users choose depth
- [ ] "Keep going" is always the first/primary option in pacing prompts
- [ ] There are no "you must complete this section" blocks without explanation

**Notes:**

---

## 5. Repair & recovery

> When something goes wrong — or when the user changes their mind — is recovery possible?

- [ ] Consequential actions (submit, delete, disclose) have an undo window
- [ ] The undo mechanism is clearly visible and non-judgmental
- [ ] Undo language is warm: "No harm done" not "Action reversed"
- [ ] Deleted data is recoverable for a defined period (displayed to user)
- [ ] Error states do not dead-end — there is always a next step
- [ ] 404 and error pages offer a path back to something useful
- [ ] Session expiry gives the user a chance to recover their work

**Notes:**

---

## 6. Language & tone

> Does the copy treat users as capable adults without minimising their experience?

- [ ] No use of "simple", "easy", "just", "quick" in sensitive contexts
- [ ] No exclamation marks in error states or serious moments
- [ ] No gendered assumptions in system-generated copy
- [ ] Names and family structures are not assumed (avoids "mother", "husband" defaults)
- [ ] Progress language is honest ("5 of 12 steps" not "almost there!")
- [ ] Error messages are specific, not vague ("Invalid input" is not acceptable)
- [ ] The interface does not shame users for mistakes
- [ ] Time estimates are provided where content is emotionally demanding

**Notes:**

---

## 7. Cultural & intersectional considerations

> Does the interface avoid assumptions rooted in Western, white, cisgender, or able-bodied norms?

- [ ] Name fields accept any character set and do not impose Western name order
- [ ] Gender fields are inclusive (free-text or multi-option, skip available)
- [ ] Imagery reflects the diversity of the actual user population
- [ ] Default visuals (icons, avatars, illustrations) are not white-coded
- [ ] Language does not assume formal housing, stable family structure, or financial security
- [ ] Support resources are relevant to users' actual geographic and social context
- [ ] The interface is available in the languages users actually speak

**Notes:**

---

## 8. Care worker considerations (if applicable)

> If the interface is used by people who do care work, does it support their nervous systems?

- [ ] There is no gamification of care metrics (streaks, leaderboards, throughput targets)
- [ ] The interface auto-saves continuously — work is never lost to unexpected exits
- [ ] There is a decompression buffer between intake cases or sessions
- [ ] Content is not displayed suddenly without a disclosure layer (even in "work" contexts)
- [ ] Emotional check-ins are available, voluntary, and confidential
- [ ] Break options are visible without being coercive
- [ ] Workflow does not time out during complex, emotionally demanding tasks

**Notes:**

---

## Scoring summary

Count totals in each section:

| Section | ✓ | ✗ | ~ | N/A |
|---|---|---|---|---|
| 1. Safety signals | | | | |
| 2. Trustworthiness | | | | |
| 3. Granular consent | | | | |
| 4. Pacing & agency | | | | |
| 5. Repair & recovery | | | | |
| 6. Language & tone | | | | |
| 7. Cultural considerations | | | | |
| 8. Care worker (if applicable) | | | | |

---

## Priority triage

After completing the checklist, identify the three most critical gaps using this framework:

**P1 — Fix before launch:** Safety signals (exit, session expiry warning), content warnings,
no-blame error messages, undo on consequential actions.

**P2 — Fix in next sprint:** Granular consent, progress honesty, gendered language,
pacing mechanisms.

**P3 — Plan for next quarter:** Cultural/intersectional review, care worker features,
intersectional imagery audit.

---

## How to use this checklist

This checklist is not a certification. A product that scores highly here is not
automatically "trauma-informed" — that requires process, research, and community
involvement, not just component compliance.

Use it as: a structured conversation starter, a gap analysis tool, a basis for
a design audit report, or a roadmap for iterative improvement.

See also: `guidelines/samhsa-to-ui.md`, `research/honest-critique.md`

---

*Maintained by Luana Micheau / Care-Conscious Design*
*Last updated: March 2026*
