# SAMHSA principles → UI decisions

This document maps SAMHSA's six principles of trauma-informed care to specific,
actionable component and design decisions in this library.

The source framework: SAMHSA. (2014). *SAMHSA's Concept of Trauma and Guidance
for a Trauma-Informed Approach.* HHS Publication No. (SMA) 14-4884.

The bridge paper: Eggleston, M. & Noel, L.-A. (2024). "Trauma-Informed Design:
Leveraging Usability Heuristics on a Social Services Website." *JUS*, 19(3).
(Key finding: SAMHSA's principles overlap substantially with Nielsen's usability
heuristics — TI design is not a new framework, it is UX best practice applied
with intentionality toward traumatised users.)

---

## 1. Safety

> The organisation prioritises the physical and emotional safety of individuals.

### What this means for UI

Safety in digital contexts is primarily **neuroceptive** — the nervous system
evaluates safety cues before the conscious mind does (Porges, 2011). An interface
creates the conditions for felt safety through predictability, legibility, and
the persistent availability of exit.

### Component decisions

**`<SafeExit>`**
- Always visible, never scrolls out of view
- One click only — no confirmation dialog, no friction
- Replaces browser history (does not add to it) to prevent back-button exposure
- Warm but distinct colour (blush) — not red/alarm, not invisible
- Keyboard shortcut (double Escape) for urgent situations

**`<CalmingMessage>`**
- Placed before, not after, any difficult content
- Tone: warm, non-minimising, non-clinical
- Includes time estimate — uncertainty is a threat signal; knowing duration reduces it
- Never says "don't worry" or "this is easy"

**`<TraumaInformedProvider>`**
- Sets predictable motion defaults globally (no surprise animations)
- Muted palette as default — avoids urgency-coded reds, high contrast
- Respects `prefers-reduced-motion` system setting automatically

**General pattern rules**
- No auto-advancing flows (slides, carousels, timed progress)
- No countdown timers that create urgency pressure
- No blinking or flashing elements
- Error states should be non-blaming (see `guidelines/ux-writing.md`)

---

## 2. Trustworthiness & Transparency

> The organisation maintains transparency in policies and procedures, building
> and maintaining trust.

### What this means for UI

Trust is built through legibility — the user should always know what is happening,
what will happen next, and what their data is used for.

### Component decisions

**`<DisclosureCard>`**
- Shows a content warning *before* revealing sensitive material
- Warning text is warm, never clinical or dismissive
- The label and badge tell the user exactly what they are about to encounter
- The expand/collapse is visually clear — no mystery about what the affordance does

**`<ConsentStepper>`**
- Each step uses plain language, not legal language
- Hint text explains *why* each piece of information is needed
- Shows step count so users know their position in the sequence
- Back button is always available — decisions can be reviewed

**Progress indicators**
- Always show the user where they are in a flow
- Never hide or undercount steps ("only 2 more!" when there are 5)

---

## 3. Peer Support

> Peer support and mutual self-help are key vehicles for establishing safety,
> building trust, and empowerment.

### What this means for UI

This principle is the hardest to translate to component-level UI — it is primarily
organisational. However, in digital contexts it manifests as **not leaving users
alone in difficult moments**: offering resources, human contact options, and
co-regulation prompts at high-stress points.

### Component decisions

**`<PauseAware>`**
- Detects hesitation (not absence) and offers options without pressure
- "Keep going" is the first and primary option — continues always normalised
- Offers exit and save-and-return alongside continue
- Language is companionate: "no rush at all"

**Pattern guidance**
- In crisis-adjacent flows, surface peer support resources or human contact
  options at natural breaks — not only at the end
- "You are not alone" messaging should appear contextually, not generically

---

## 4. Collaboration & Mutuality

> Power differences between staff and clients are levelled as much as possible.
> Everyone has a role to play in the organisation's trauma-informed approach.

### What this means for UI

In digital interfaces, power imbalances live in defaults, pre-selections, and
dark patterns. Collaboration means genuinely sharing control — not simulating it.

### Component decisions

**`<ConsentStepper>`**
- No pre-selected options — every choice starts neutral
- No "recommended" framing that steers users toward the system-preferred option
- Back is available on every step — decisions can be reconsidered
- Completion message confirms what was chosen, not just that the form is done

**`<RegretButton>`**
- The system does not immediately act on the user's instruction
- The user has 7 seconds (configurable) to change their mind
- The undo confirmation is warm and non-judgmental ("no harm done")

**Pattern guidance**
- Avoid default opt-ins for data collection, marketing, or sharing
- "Accept all" should never be the only large button
- Settings should always be revisable

---

## 5. Empowerment, Voice & Choice

> The organisation creates an environment where individuals feel a sense of
> control over their experiences.

### What this means for UI

This is the principle most aligned with existing UX practice. The window of
tolerance framework (Siegel, 1999) maps directly: interfaces should keep users
in their optimal zone of arousal — avoiding both overwhelm (hyperarousal) and
helplessness (hypoarousal).

### Component decisions

**`<RegretButton>`**
- Makes consequential actions reversible, reducing the psychological weight of decisions
- The countdown is visible and manageable — never hidden or rushed

**`<ConsentStepper>`**
- One decision per step — cognitive and emotional load is bounded
- No bundled choices, no "I agree to all of the above"
- Every option has genuine parity — no dark patterns or misleading asymmetry

**`<PauseAware>`**
- Offers choice without coercion
- Does not imply the pause was wrong or unusual

**Pattern guidance**
- Offer meaningful control over pace, disclosure depth, and data sharing
- Never make the "easy" path the privacy-invading path
- Make "no" as visually accessible as "yes"

---

## 6. Cultural, Historical & Gender Issues

> The organisation moves past cultural stereotypes and biases, offers access to
> gender-responsive services, and leverages the healing value of traditional
> cultural connections.

### What this means for UI

This is the least developed principle in the design literature and the most
critical gap. At component level, it affects:

- Inclusive form fields (name formats, gender options, family structure)
- Avoiding visual defaults that assume a particular body type, skin tone, or family form
- Language that does not encode Western or cis-normative assumptions
- Acknowledging that "safety" is not experienced identically across racial, gender,
  or class positions

### Current state

This library's current components are culturally under-specified — they implement
the structural principles but have not been co-designed with communities who
experience intersecting traumas. This is acknowledged as a gap.

**Commitments in progress**
- Research folder documents racial trauma theory (Cénat et al., 2023)
- UX writing guide addresses gender-inclusive language
- Contributions from clinicians and community designers are explicitly welcomed

**Pattern guidance (interim)**
- Name fields should accept any character set and not enforce Western name order
- Gender fields should be free-text or use inclusive options, with skip available
- Imagery should not default to white, thin, or cisgender representations
- Do not assume family structure in any language ("mother", "spouse", "next of kin")

---

## Mapping summary

| SAMHSA Principle | Primary components | Key pattern |
|---|---|---|
| Safety | `SafeExit`, `CalmingMessage`, `TraumaInformedProvider` | Persistent exit, calm defaults, no surprises |
| Trustworthiness | `DisclosureCard`, `ConsentStepper` | Warn before, plain language, step count |
| Peer Support | `PauseAware` | Companionate check-in, human contact options |
| Collaboration | `ConsentStepper`, `RegretButton` | No pre-selections, genuine undo |
| Empowerment | `RegretButton`, `ConsentStepper`, `PauseAware` | Reversibility, one decision at a time, real choice |
| Cultural | (in development) | Inclusive forms, co-designed language |

---

*Last updated: March 2026*  
*Maintained by Luana Micheau / Care-Conscious Design*
