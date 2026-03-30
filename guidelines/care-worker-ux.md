# Designing for care workers

This document addresses a critical gap in the trauma-informed design literature:
**the people who do care work are almost never considered as users.**

The existing field focuses almost entirely on people receiving care — patients,
survivors, service users. The interfaces that social workers, healthcare providers,
crisis counsellors, content moderators, and community health workers use every day
are designed with the same extractive logic as every other enterprise software.

This is a problem. Tools that do not support the nervous systems of care workers
contribute to compassion fatigue, secondary traumatic stress, and burnout —
which ultimately harms care recipients too.

---

## Who this is for

- Social workers using case management software
- Healthcare providers using EHR and patient portal systems
- Crisis counsellors using intake and dispatch tools
- Content moderators reviewing harmful material
- Community health workers navigating benefit and referral systems
- Therapists using session notes and scheduling platforms
- Anyone whose paid or unpaid work involves sustained emotional exposure

---

## The problem: compassion fatigue and tool design

Compassion fatigue (Figley, 1995) and secondary traumatic stress (Stamm, 1995)
are well-documented occupational hazards for care workers. Between 16% and 85% of
healthcare workers report compassion fatigue depending on the study and speciality.

What is barely documented: **how the design of the tools they use contributes to
or mitigates this.**

A social worker using a poorly designed case management system is simultaneously
trying to hold space for a client and fight with a form. The cognitive load imposed
by a bad UI is not neutral — it depletes exactly the attentional resources care
requires. An EHR with a hostile date-picker is a compassion fatigue event at 3pm
on a Thursday.

Content moderation is the starkest case. A 2021 CHI paper ("The Psychological
Well-Being of Content Moderators") found that the design of moderation interfaces
— particularly sudden, unannounced exposure to graphic content — is a direct
contributor to moderator trauma. A 2025 arXiv paper ("Wellbeing-Centered UX:
Supporting Content Moderators") proposes specific design interventions.

---

## Principles for care worker interfaces

### 1. Acknowledge cumulative load

Care workers carry context across cases, clients, and sessions. Interfaces should:

- Not require re-entry of information that exists elsewhere in the system
- Allow notes to persist across partial sessions without penalising interruption
- Show progress indicators that reflect effort, not just completion
- Not reset or time-out unexpectedly — losing work is a trauma event

### 2. Protect transition moments

The moments between cases, clients, or sessions are critical. Interfaces should:

- Offer a decompression buffer before the next intake or case loads
- Not immediately surface the next difficult item without permission
- Allow workers to signal "not ready" without affecting workflow metrics

**Pattern: Session transition component**

```tsx
// Not yet in library — documented here as a specification
<SessionTransition
  currentCase="closed"
  nextCase="pending"
  decompressMs={60000}   // 60 seconds of clear screen before next case auto-loads
  onReady={() => loadNextCase()}
  message="Case closed. Take a moment before the next one loads."
/>
```

### 3. Protect from unannounced exposure

Content moderators and crisis workers encounter graphic or distressing content
as part of their work. Interfaces should:

- Never display graphic content without a disclosure layer (even in "work" contexts)
- Allow workers to configure their exposure pacing (number of items per session,
  mandatory breaks after N items)
- Provide a desaturation or blur layer that the worker can toggle on/off

**Pattern: Exposure pacing controls**

```tsx
<ExposurePacingProvider
  maxItemsPerSession={20}
  breakAfter={10}
  breakDurationMs={300000}   // 5-minute mandatory break
  onBreakStart={() => showBreakScreen()}
>
  {/* moderation queue */}
</ExposurePacingProvider>
```

### 4. Make emotional check-ins optional and fast

Mandatory wellness surveys mid-workflow are widely resented and often gamed.
Voluntary, fast emotional check-ins — offered at natural transition points —
are more effective.

**Pattern: Voluntary check-in**

The prompt should appear after a session ends, not before the next one starts.
It should be 1-2 questions maximum. Results should never be surfaced to managers
without explicit worker consent.

```tsx
<VoluntaryCheckIn
  trigger="session-end"
  questions={[
    { id: 'load', prompt: 'How are you carrying this one?', scale: 5 }
  ]}
  onSubmit={(data) => logAnonymousCheckIn(data)}
  // Results NEVER go to management without consent
  confidential
/>
```

### 5. Don't gamify care work

Care work is inherently non-linear, relational, and often cannot be measured.
Interfaces that introduce:

- Completion streaks
- Gamified productivity metrics
- Case resolution timers with visual pressure indicators
- Leaderboards for throughput

...are actively harmful. They impose the logic of extraction onto the logic of care.

**Anti-pattern: never do this**

```
❌ "You've resolved 12 cases today! 3 more to beat your personal best!"
❌ "Your average call time is 2 minutes above team average"
❌ "🔥 5-day streak on meeting your intake targets"
```

### 6. Design for interrupted workflows

Care work is not a focused solo task. Care workers are interrupted constantly.
Interfaces should:

- Auto-save at every meaningful state change (not just "save and continue")
- Return to the exact position after interruption — no "you were working on..."
  screens that require the worker to reconstruct their context
- Never penalise partial sessions or mid-form exits

---

## What this library will add

The following components are planned for care worker contexts. They do not exist
in the current release.

| Planned component | What it does |
|---|---|
| `<SessionTransition>` | Decompression buffer between cases |
| `<ExposurePacingProvider>` | Configurable exposure limits for content-heavy workflows |
| `<VoluntaryCheckIn>` | Opt-in emotional check-in at session end |
| `<WorkflowAutoSave>` | Silent, continuous save with interruption recovery |
| `<CareWorkerMode>` | Global toggle that reduces visual intensity, slows pace |

---

## References

- Figley, C. R. (1995). *Compassion Fatigue: Coping with Secondary Traumatic Stress Disorder.* Brunner/Mazel.
- Stamm, B. H. (1995). *Secondary Traumatic Stress.* Sidran Press.
- Karunakaran, D., et al. (2021). "The Psychological Well-Being of Content Moderators." *CHI '21.*
- arXiv 2509.07187 (2025). "Wellbeing-Centered UX: Supporting Content Moderators."
- SAMHSA (2014). *SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach.*

---

*This document is a living specification. Contributions from social workers,
healthcare providers, and community health workers are especially welcome.*  
*Maintained by Luana Micheau / Care-Conscious Design*
