# Trauma-Informed UI

Experimental interaction patterns for services where a person has to understand a choice, refuse it, recover from it, or return after an interruption.

Created by **Luana Micheau** within [Care-Conscious Design](https://www.luana.systems/glossary/care-conscious-design). [Care Under Load](https://www.luana.systems/writing/care-under-load) is the field chapter on cognition, interruption, and re-entry. These patterns are one implementation area of that method.

This repository is a prototype and a research record. It is not a published package, and it is not a clinical intervention.

---

## Status

Run it locally. There is no npm release and no GitHub release, so `npm install trauma-informed-ui` will not work.

```bash
npm install
npm run demo
```

The page opens a decision guide and a fictional referral comparison. `npm run build-demo` checks that the website builds. `npm test` runs the guide and referral checks.

The patterns are hypotheses. The Harbor referral case is the comparison that would keep, narrow, or retire them. That study has not been run. Read [`research/harbor-referral.md`](./research/harbor-referral.md) before treating any component as a recommendation.

---

## The case under test

A community health worker at a fictional service, Harbor Community Health, is closing referral RH-2041. The note mentions nausea after a new medication, a missed rent payment, and a phone number. The worker decides what Northside Housing Advice will receive, sends it, and is interrupted by a call.

The demo runs that task three ways:

| Version | What the worker encounters |
|---|---|
| Conventional | The clinical paragraph is visible immediately. One checkbox bundles the paragraph, the phone number, and permission to contact Alex. Send is immediate. A timeout discards the draft. The next case opens on its own. |
| Care-conscious | The worker can open or skip the paragraph. Three sharing decisions are separate, and “No” still sends the referral. The copy sent onward leaves the phone number out of the paragraph. Send can be cancelled for 7 seconds. The draft survives the call. The next case waits. |
| Care-conscious, with prompt | The care-conscious version, plus an automatic prompt after 8 seconds without input. |

The automatic prompt is in the study because it may fail. It can interrupt someone who is still reading, and it can feel as if the software is managing the worker.

These behaviors are compositions on top of existing primitives, including [Radix UI](https://www.radix-ui.com/) for disclosure, progress, and radio groups. [GOV.UK’s Exit this page](https://design-system.service.gov.uk/components/exit-this-page/) is the production reference for a quick exit with an honest limit: a page can replace the current history entry, and it cannot promise to erase earlier history. The repository also contains general controls used to build the demo. Those controls are scaffolding. The behavior worth evaluating is the referral comparison.

---

## What would change the recommendation

The case study writes these down before any session:

- Disclosure leaves the care-worker recommendation if workers expected this paragraph and the extra step only adds time.
- Separate sharing leaves if workers cannot say what the partner will receive, or if a “no” to the phone number still leaks it.
- The 7 second cancel window leaves if nobody uses it. The replacement is an explicit confirmation.
- The automatic prompt leaves if it appears while someone is still working, or if workers describe it as patronising. The explicit pause stays only if the draft is actually there when they return.

A care-conscious pattern is not assumed to be better. The session record in the demo is there so a facilitator can see what was shared, what was cancelled, and whether a prompt appeared.

---

## Decisions already changed

Two decisions changed while the work was being specified, before any new participant sessions.

**A quick exit cannot clear the browser’s earlier history.** `SafeExit` replaces the current history entry when asked. The service has to clear its own session data. The component does not claim to do that.

**An automatic pause is no longer the default recommendation for a care-worker task.** The decision guide now points that task at “Pause and return” in the referral comparison. The worker pauses from an explicit control, and the draft remains. `PauseAware` remains available as the third arm of the comparison. Its own implementation notes already reject copy such as “Are you still there?”. The care-worker guideline also records that mandatory check-ins are resented and often gamed. That was enough to stop recommending the automatic prompt as the pattern. It was not enough to delete it before the sessions.

A third decision showed up while building the fictional record. The phone number lived inside the clinical paragraph. A separate “do not share the phone number” answer would have been false if the paragraph went out whole. In the care-conscious version, the partner copy of the paragraph has the number removed, and the preview says so before send. The conventional version still sends the number inside the paragraph, which is the point of the comparison.

---

## Principles

Taken from [`PRODUCT.md`](./PRODUCT.md):

1. Start with the person’s task and its consequences.
2. Show choice, refusal, and recovery as working paths.
3. State exactly what the interface does with data and browser history.
4. Keep guidance specific, source-linked, and conditional on context.
5. Treat each pattern as a hypothesis to test with its intended users.

The practical measures for the Harbor case are task completion, time, comprehension of what will be shared, errors, recovery, unwanted interruptions, and whether the screen felt respectful or managing. “Felt safe” is not used as a stand-in for those observations. Colour is not treated as evidence of psychological safety. The token name `--ti-color-sage` is historical; the value in `src/tokens/tokens.css` is a blue action colour.

Polyvagal theory is discussed in [`research/polyvagal-primer.md`](./research/polyvagal-primer.md) and challenged in [`research/honest-critique.md`](./research/honest-critique.md). It is not the justification for the Harbor decisions. Those decisions rest on comprehension, refusal, recovery, interruption, and the published record on unannounced exposure in moderation tools.

---

## Two different studies

| Document | Question it asks | Status |
|---|---|---|
| [`research/harbor-referral.md`](./research/harbor-referral.md) | Does this referral behavior help or harm a care worker closing one fictional case? | Protocol written. Sessions not run. |
| [`research/usability-test-plan.md`](./research/usability-test-plan.md) | Can a practitioner use this website to choose and explain a pattern? | Plan written. Sessions not run. |

The website study does not validate the components. The referral study does not validate the website.

---

## What else is in the repository

```
src/components/     Patterns and the demo’s general controls
src/hooks/          Reduced motion, safe exit, pause detection
src/tokens/         Colour, motion, spacing, typography
guidelines/         SAMHSA mapping, writing, care-worker notes, audit checklist
research/           Bibliography, critique, both study plans, authorship
demo/               Decision guide and the Harbor comparison
```

`CalmingMessage`, `EmotionCheckIn`, and `BreathingGuide` are still in the source. They sit outside the Harbor case. They can imply an emotional state the interface has not earned. [`PRODUCT.md`](./PRODUCT.md) lists emotional-state scoring as something this product should not suggest. Do not lead a service with them.

The care-worker components named in [`guidelines/care-worker-ux.md`](./guidelines/care-worker-ux.md) — session transition, exposure pacing, voluntary check-in — stay specifications. They get built if the Harbor sessions give them a reason.

---

## Authorship

Luana Micheau leads the design decisions. AI tools have been used to draft and revise implementation. The judgment that matters is which behavior was kept, which was rejected, and what check was used. The short account is in [`research/authorship.md`](./research/authorship.md).

---

## Contributing

Contributions are welcome, especially from clinicians, social workers, community health workers, and designers with relevant lived experience. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

Read [`research/honest-critique.md`](./research/honest-critique.md) before contributing. Using these patterns to make a harmful service feel nicer, without changing the service, is a misuse.

---

## License

MIT — use freely with credit.

Created by Luana Micheau · [MomOps](https://momops.io) · [Care-Conscious Design](https://momops.io/ccd)
