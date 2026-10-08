# Trauma-Informed UI

A React component library of trauma-aware interaction patterns for interfaces that centre dignity, care, and user control.

Created by **Luana Micheau** within [Care-Conscious Design](https://www.luana.systems/glossary/care-conscious-design). [Care Under Load](https://www.luana.systems/writing/care-under-load) is its field chapter on cognition, interruption, and re-entry; these trauma-aware patterns are one implementation area of the wider method.

---

## Why this exists

Many design systems optimise for conversion, retention, and engagement. Those measures may miss whether someone understood a choice, could refuse it, or recovered from an error.

Trauma-Informed UI is a response to that gap. It provides React primitives for clear choices, pacing, and recovery, with guidance on where each pattern may help and what needs validation.

The library packages these patterns so designers and developers can examine and test them in their own services.

---

## What's inside

```
src/
  components/         React components with full prop APIs
  hooks/              Utility hooks (useReducedMotion, useSafeExit, usePauseDetection)
  tokens/             Design tokens — colour, motion, spacing, typography
  utils/              Helpers for content warnings, timing, safe redirect

guidelines/
  samhsa-to-ui.md     Mapping SAMHSA's 6 principles to component decisions
  ux-writing.md       Language guide for sensitive contexts
  care-worker-ux.md   Designing for people who do care work, not just recipients
  audit-checklist.md  How to audit an existing interface for trauma-awareness

research/
  annotated-bibliography.md   Full reference list with annotations
  polyvagal-primer.md         Nervous system theory translated for designers
  field-gaps.md               What the literature doesn't address yet
  honest-critique.md          Limitations of the TI framework and risks of misuse
```

---

## Components

| Component | SAMHSA Principle | What it does |
|---|---|---|
| `<RegretButton>` | Empowerment | Delay an action and allow cancellation before it completes |
| `<DisclosureCard>` | Safety | Progressive reveal with content warning before sensitive material |
| `<ConsentStepper>` | Voice & Choice | One granular decision per step, never bundled |
| `<SafeExit>` | Safety | One-click exit to a neutral destination; can replace the current history entry |
| `<CalmingMessage>` | Trustworthiness | Nervous-system-aware framing before hard content |
| `<PauseAware>` | Empowerment | Detects inactivity and offers optional pacing |
| `<TraumaInformedProvider>` | All | Context wrapper — sets global defaults for motion, palette, timing |

---

## Install

```bash
npm install trauma-informed-ui
# or
yarn add trauma-informed-ui
```

> **Note:** This library is built on [Radix UI](https://radix-ui.com) primitives for accessibility. Radix is a peer dependency.

```bash
npm install @radix-ui/react-dialog @radix-ui/react-collapsible @radix-ui/react-progress
npm install @radix-ui/react-radio-group
```

## Explore the website locally

[Open the published website](https://tropicgirlie.github.io/trauma-informed-ui/).

```bash
npm install
npm run demo
```

The demo includes a task-based guide with a quick answer and full brief, plus working examples. Guide selections stay in page memory unless a visitor explicitly chooses **Save for this tab**. That option stores only the guide selections in browser session storage and can be cleared in the guide. It is unavailable when a shared device is selected. Consent choices and demo submissions stay in page memory; nothing is sent to a server. Run `npm run build-demo` to verify the website build.

---

## Quick start

```tsx
import { TraumaInformedProvider, RegretButton, SafeExit } from 'trauma-informed-ui'
import 'trauma-informed-ui/tokens.css'

export default function App() {
  return (
    <TraumaInformedProvider calmPalette motionSafe>
      <SafeExit redirectTo="https://weather.com" replaceCurrentEntry />
      <RegretButton
        label="Submit response"
        onAction={() => handleSubmit()}
        windowMs={7000}
      />
    </TraumaInformedProvider>
  )
}
```

`replaceCurrentEntry` uses `location.replace` to replace the current entry. Browsers do
not allow a website to reliably erase earlier history entries. If the service
stores sensitive session data, clear it in the application before redirecting;
the component does not do that automatically. For an embedded demo, pass
`enableShortcut={false}` so the page-wide Escape shortcut is inactive. The older
`clearHistory` prop remains available as a compatibility alias.

---

## Who this is for

- **Product designers** working in health, care, or justice tech
- **Frontend developers** building interfaces for vulnerable users
- **Researchers and therapists** collaborating with tech teams
- **Policy designers** translating trauma-informed care into digital services
- Anyone building tools that **care workers use** — not just care recipients

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

## Design tokens

The current token set uses blue for primary actions, neutrals for reading, amber for caution, and red for a high-visibility exit. Colour choices are design decisions to validate with users; they do not by themselves establish psychological safety.

```css
/* Install and import tokens.css, then use: */
--ti-color-sage: #1868db;
--ti-color-sage-light: #e9f2ff;
--ti-color-dust: #9e4c00;
--ti-color-plum: #803fa5;
--ti-color-blush: #ae2e24;
--ti-color-cream: #ffffff;

--ti-motion-fast: 150ms ease;
--ti-motion-med: 300ms ease;
--ti-motion-slow: 500ms ease;
/* No bounce or spring — predictable motion only, and reduced-motion is honored */
```

Full token reference: [`src/tokens/`](./src/tokens/)

---

## Theoretical grounding

This library sits at the intersection of three bodies of knowledge:

- **SAMHSA's six principles of trauma-informed care** (2014) — operational backbone
- **Polyvagal theory** (Porges, 1995/2011) and the **window of tolerance** (Siegel, 1999) — neurobiological rationale for design decisions
- **Care ethics** (Tronto, Noddings, Held) and **design justice** (Costanza-Chock, 2020) — political and ethical mandate

Read the annotated bibliography: [`research/annotated-bibliography.md`](./research/annotated-bibliography.md)  
Read the honest critique of the field: [`research/honest-critique.md`](./research/honest-critique.md)
Use the website study plan: [`research/usability-test-plan.md`](./research/usability-test-plan.md)

---

## What makes this different from existing work

- **Reusable implementation examples.** The library connects written guidance to React components that teams can try and adapt.
- **Care workers are a first-class audience.** The existing literature almost exclusively addresses care recipients. This library explicitly designs for the people who do care work — whose tools also need to support their nervous systems.
- **Honest about evidence limitations.** Polyvagal theory's specific neurobiological claims face scientific scrutiny. The library flags this in the research folder and grounds component decisions in what is empirically solid.
- **Part of a larger framework.** Trauma-Informed UI is the implementation layer of Care-Conscious Design — a validation methodology for identifying where digital products assume uninterrupted, care-free users.

---

## Related resources

- [Chayn's Trauma-Informed Design Whitepaper](https://chayn.co) — eight principles from lived practice
- [Design Patterns for Mental Health](https://designpatternsformentalhealth.org) — documented interaction patterns
- [GOV.UK "Exit this page" component](https://design-system.service.gov.uk) — production implementation in vanilla JS
- [Trauma-Informed Computing (CHI 2022)](https://dl.acm.org/doi/10.1145/3491102.3517475) — the foundational academic paper

---

## Contributing

Contributions welcome — especially from clinicians, social workers, or designers with lived experience. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

Please read [`research/honest-critique.md`](./research/honest-critique.md) before contributing. Trauma-washing is a real risk.

---

## License

MIT — use freely with credit.

Created by Luana Micheau · [MomOps](https://momops.io) · [Care-Conscious Design](https://momops.io/ccd)
