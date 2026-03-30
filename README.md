# Trauma-Informed UI

[![npm version](https://img.shields.io/npm/v/trauma-informed-ui?color=%233C7F8C&labelColor=%23ECE7DF)](https://www.npmjs.com/package/trauma-informed-ui)
[![Storybook](https://img.shields.io/badge/Storybook-live-%233C7F8C?logo=storybook&logoColor=white&labelColor=%23ECE7DF)](https://lmicheau.github.io/trauma-informed-ui/)
[![License: MIT](https://img.shields.io/badge/License-MIT-%23D1E5E8?labelColor=%23ECE7DF)](./LICENSE)

A React component library and design system for interfaces that centre dignity, care, and nervous system safety.

Created by **Luana Micheau** as part of the [MomOps](https://momops.io) and FemInnovate ecosystem.  
Grounded in the [Care-Conscious Design (CCD)](https://momops.io/ccd) framework.

> **Live component docs → [lmicheau.github.io/trauma-informed-ui](https://lmicheau.github.io/trauma-informed-ui/)**

---

## Why this exists

Most design systems optimise for conversion, retention, and engagement. None of those metrics account for the cost to the user's nervous system.

Trauma-Informed UI is a response to that. It provides React primitives that embed emotional safety, granular agency, and nervous system literacy directly into component APIs — so these considerations become structural rather than cosmetic.

There is no equivalent open-source library. This is the gap this project fills.

---

## Install

```bash
npm install trauma-informed-ui
```

```tsx
import { TraumaInformedProvider, RegretButton, SafeExit } from 'trauma-informed-ui'
import 'trauma-informed-ui/tokens.css'

export default function App() {
  return (
    <TraumaInformedProvider calmPalette>
      <SafeExit redirectTo="https://weather.com" clearHistory />
      <RegretButton
        label="Submit response"
        onAction={() => handleSubmit()}
        windowMs={7000}
      />
    </TraumaInformedProvider>
  )
}
```

---

## Components

### Trauma-informed primitives

| Component | SAMHSA Principle | What it does |
|---|---|---|
| `<TraumaInformedProvider>` | All | Context wrapper — injects CSS tokens, motion settings, calm palette |
| `<RegretButton>` | Empowerment | Undo any action within a configurable time window — reduces shame |
| `<SafeExit>` | Safety | One-click exit to a neutral destination, optionally clears history |
| `<ConsentStepper>` | Voice & Choice | One granular decision per step, never bundled, always reversible |
| `<DisclosureCard>` | Safety | Progressive reveal with content warning before sensitive material |
| `<TriggerWarning>` | Safety | Topic chips + explicit continue/skip — no surprise reveals |
| `<CalmingMessage>` | Trustworthiness | Nervous-system-aware framing before hard content with time estimates |
| `<PauseAware>` | Empowerment | Detects inactivity, gently offers pacing options without pressure |
| `<EmotionCheckIn>` | Collaboration | Non-clinical mood check-in before sensitive sections |
| `<BreathingGuide>` | Safety | Paced breathing for in-session regulation (4-7-8, box, etc.) |
| `<SafeInput>` | Trustworthiness | Text input with warm validation — never blaming error language |

### Core components

| Component | Category | What it does |
|---|---|---|
| `<Button>` | Action | primary, secondary, ghost, destructive variants — distinct by shape+colour+icon |
| `<Checkbox>` | Form | With label, hint, indeterminate, error states. 44px touch target |
| `<Radio>` + `<RadioGroup>` | Form | Grouped radios with fieldset/legend, keyboard navigation |
| `<Switch>` | Form | Toggle with explicit on/off text labels — never colour-only |
| `<TextArea>` | Form | Multi-line with character counter and warm validation |
| `<Select>` | Form | Native `<select>` — always includes empty placeholder, never pre-selects |
| `<Badge>` | Feedback | Status labels — colour never sole differentiator |
| `<Chip>` | Feedback | Filter (clickable) and input (removable) chips |
| `<Alert>` | Feedback | info / success / warning / danger — desaturated, never alarming |
| `<ToastProvider>` + `useToast` | Feedback | Non-blocking slide-in notifications, auto-dismiss, always closeable |
| `<Modal>` | Overlay | Focus-trapped dialog — always escapable (Escape + backdrop) |
| `<Tabs>` + `<TabList>` + `<Tab>` + `<TabPanel>` | Navigation | ARIA tab pattern, full keyboard navigation |
| `<Skeleton>` + `<SkeletonText>` | Loader | Content placeholders with gentle shimmer |
| `<ProgressBar>` | Loader | Linear progress — orientation without time pressure |
| `<Card>` | Layout | Surface container with header/body/footer slots, 4 variants |

---

## Design tokens

The palette is intentionally muted — soft teal, sage, lavender, and parchment. No pure black or stark white. No urgency-coded reds.

```css
/* Import tokens.css and use CSS variables directly: */
import 'trauma-informed-ui/tokens.css'

--ti-bg:             #F6F4F0;   /* warm off-white background */
--ti-surface:        #ECE7DF;   /* card and panel surfaces */
--ti-primary:        #3C7F8C;   /* teal — primary actions */
--ti-primary-soft:   #D1E5E8;   /* light teal — chips, badges, selected */
--ti-secondary:      #7C8F7A;   /* sage — grounding accents */
--ti-accent:         #8C7BAF;   /* lavender — use sparingly */
--ti-danger:         #B06565;   /* desaturated rose — never alarm-red */
--ti-warning:        #C39A4A;   /* golden ochre — informational */
--ti-text:           #2F3134;   /* soft charcoal — no pure black */
--ti-border:         #D7D2C8;   /* low-noise dividers */
--ti-focus-ring:     0 0 0 3px rgba(60,127,140,0.4);

/* Dark / reduced-stimulation mode — via prefers-color-scheme or data-ti-dark */
--ti-bg (dark):      #15191C;
--ti-primary (dark): #6ABFCC;
```

---

## Design principles

Six principles — one per component family, each grounded in SAMHSA and nervous system science.

1. **Pacing over efficiency** — let users move at their own speed
2. **Repair is always possible** — undo windows reduce shame
3. **Granular consent** — one decision per moment, genuine opt-out
4. **Progressive disclosure** — warn before the hard material
5. **Exit is always visible** — trapped is a trauma state
6. **Predictable calm** — visual consistency is a safety signal

Full rationale: [`guidelines/samhsa-to-ui.md`](./guidelines/samhsa-to-ui.md)

---

## Storybook

Interactive component documentation is deployed at:

**[lmicheau.github.io/trauma-informed-ui](https://lmicheau.github.io/trauma-informed-ui/)**

To run locally:

```bash
npm install
npm run storybook
# opens at http://localhost:6006
```

---

## Project structure

```
src/
  components/         React components — each with index.tsx + *.stories.tsx
  hooks/              useReducedMotion · useSafeExit · usePauseDetection
  tokens/             tokens.css — full design token set (light + dark)

guidelines/
  samhsa-to-ui.md     Mapping SAMHSA's 6 principles to component decisions
  ux-writing.md       Language guide for sensitive contexts
  audit-checklist.md  How to audit an existing interface for trauma-awareness

research/
  annotated-bibliography.md
  polyvagal-primer.md
  honest-critique.md  Limitations of the TI framework — read before contributing
```

---

## Who this is for

- **Product designers** working in health, care, or justice tech
- **Frontend developers** building interfaces for vulnerable users
- **Researchers and therapists** collaborating with tech teams
- **Policy designers** translating trauma-informed care into digital services
- Anyone building tools that **care workers use** — not just care recipients

---

## Theoretical grounding

This library sits at the intersection of three bodies of knowledge:

- **SAMHSA's six principles of trauma-informed care** (2014) — operational backbone
- **Polyvagal theory** (Porges, 1995/2011) and the **window of tolerance** (Siegel, 1999) — neurobiological rationale for design decisions
- **Care ethics** (Tronto, Noddings, Held) and **design justice** (Costanza-Chock, 2020) — political and ethical mandate

Read the annotated bibliography: [`research/annotated-bibliography.md`](./research/annotated-bibliography.md)  
Read the honest critique of the field: [`research/honest-critique.md`](./research/honest-critique.md)

---

## Related resources

- [Chayn's Trauma-Informed Design Whitepaper](https://chayn.co)
- [Design Patterns for Mental Health](https://designpatternsformentalhealth.org)
- [GOV.UK "Exit this page" component](https://design-system.service.gov.uk)
- [Trauma-Informed Computing (CHI 2022)](https://dl.acm.org/doi/10.1145/3491102.3517475)

---

## Contributing

Contributions welcome — especially from clinicians, social workers, or designers with lived experience. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

Please read [`research/honest-critique.md`](./research/honest-critique.md) before contributing. Trauma-washing is a real risk.

---

## License

MIT — use freely with credit.

Created by Luana Micheau · [MomOps](https://momops.io) · [Care-Conscious Design](https://momops.io/ccd)
