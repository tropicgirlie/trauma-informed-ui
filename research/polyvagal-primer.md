# Nervous system literacy for designers: a polyvagal primer

This document translates nervous system science into design-relevant concepts.
It is written for designers and developers who want to understand the neurobiological
rationale behind this library's component decisions — without needing a clinical background.

It also flags where the science is contested. Read the caveats.

---

## Why nervous system theory matters to UI design

Every digital interface is a sensory environment. Users encounter it through
their bodies — through screens that flicker and buzz, through text that demands
cognitive processing, through interactions that either confirm or deny their
sense of control.

The nervous system does not distinguish between "this is just an app" and
"this is a real threat." It responds to stimuli — light, sound, surprise,
unpredictability, loss of control — with the same physiological machinery
regardless of whether the source is a predator or a poorly designed form.

This is not metaphor. High cognitive load measurably elevates cortisol.
Perceived lack of control activates the amygdala. Sudden unexpected stimuli
produce a startle response with measurable cardiac and respiratory effects.

Designing with nervous system literacy means understanding what your interface
does to users who are already in a stressed or dysregulated state — and making
choices that support rather than exacerbate that state.

---

## The window of tolerance

The most directly applicable concept from trauma neuroscience to interface design.

Developed by Daniel Siegel (1999), the window of tolerance describes the optimal
zone of arousal for learning, decision-making, and engagement.

```
         HYPERAROUSAL
    ─────────────────────
    Anxiety, panic, overwhelm
    Difficulty thinking clearly
    Fight or flight response
    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
          WINDOW OF TOLERANCE
    Engaged, present, able to think
    Can process difficult information
    Can make genuine decisions
    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
    Numbness, shutdown, withdrawal
    Difficulty engaging
    Freeze response
    ─────────────────────
         HYPOAROUSAL
```

**The design goal:** keep users in the window. Interfaces that push users into
hyperarousal or hypoarousal impair the very capacities — attention, decision-making,
emotional regulation — that the interface requires.

**What pushes toward hyperarousal:**
- Information overload (too much at once)
- Countdown timers and urgency signals
- Unexpected sounds, motion, or visual changes
- Loss of control (auto-advancing flows, locked navigation)
- Blame in error messages
- Ambiguous or unpredictable interfaces

**What pushes toward hypoarousal:**
- Dead ends (no clear next step)
- Helplessness (actions that don't work)
- Repetitive failure (same error, no guidance)
- Being ignored (no feedback to actions)
- Overwhelming complexity that produces shutdown

**What supports staying in the window:**
- Predictability (consistent navigation, honest progress)
- Legibility (clear language, obvious affordances)
- Agency (genuine control over pace and depth)
- Repair (undo, recovery from mistakes)
- Co-regulation cues (warm language, human presence signals)

---

## Neuroception: the nervous system's threat scanner

A concept from Stephen Porges' polyvagal theory.

Neuroception is the nervous system's subconscious, continuous scanning for cues
of safety or threat — operating below conscious awareness, faster than deliberate
thought.

This is why visual design has physiological effects that bypass rational evaluation.
A user does not consciously decide "this interface looks threatening." Their nervous
system makes that assessment first, and the felt sense of threat shapes how they
engage with everything that follows.

**Neuroceptive safety cues in interfaces:**
- Warm, consistent colour palettes (associated with safe environments)
- Human-toned language (signals another person is present)
- Predictable motion (no surprise changes)
- Persistent exit options (signals "you can always leave")
- Progress that reflects genuine advancement (signals forward movement, not entrapment)

**Neuroceptive threat cues in interfaces:**
- Sudden changes (colour, sound, motion, layout)
- Authoritarian language ("You must", "Required", "Invalid")
- Invisible exits (trapped is a physiological state)
- Countdown timers (urgency activates threat response)
- Error messages that blame (shame is a social threat signal)

---

## Polyvagal theory: what it is and why it's contested

Polyvagal theory (Porges, 1995/2011) proposes that the autonomic nervous system
has three hierarchical states, mediated by two branches of the vagus nerve:

1. **Ventral vagal** (safe and social): the state in which social engagement,
   connection, and learning are possible. Associated with calm, curiosity, and
   presence.
2. **Sympathetic** (mobilise): fight-or-flight response. Activated by perceived
   threat. Resources are diverted from higher cognitive functions to survival.
3. **Dorsal vagal** (shutdown): freeze/collapse response. Activated when threat
   is perceived as inescapable. Associated with dissociation, numbness, withdrawal.

The clinical heuristics derived from this framework — that safety enables
engagement, that control reduces threat, that predictability supports regulation —
are widely supported and practically useful.

**However:** the specific neuroanatomical claims of polyvagal theory are contested.
A 2023 review found that the proposed dual-branch structure of the vagus nerve
does not match current neuroanatomical evidence. Several neuroscientists have
described the theory as "untenable" in its specific biological claims.

**What this means for designers:** use the concepts (window of tolerance,
neuroception, the value of safety cues and co-regulation) as design heuristics,
not as scientific facts. The design decisions they motivate are sound even if
the specific neuroscience behind them is debated.

This library uses polyvagal concepts as explanatory metaphors grounded in broader
stress physiology research, not as claims about specific nerve anatomy.

---

## Co-regulation: the design implication

Co-regulation is the process by which one nervous system helps another regulate.
In clinical settings, a calm therapist's presence genuinely alters a client's
physiological state. This is measurable.

In digital interfaces, co-regulation is indirect but not absent. The "tone" of
an interface — its language, its visual rhythm, its responsiveness — functions
as a co-regulatory signal. A calm, predictable, responsive interface signals
"you are safe here." A chaotic, unpredictable, demanding interface signals
the opposite.

This is the underlying rationale for:
- **CalmingMessage** — explicit co-regulation before hard content
- **PauseAware** — a check-in at moments of potential dysregulation
- **Muted palette** — visual environment that does not activate the threat response
- **No bounce/spring easing** — predictable, non-alarming motion
- **Warm error messages** — shame is a social threat; warm language reduces it

---

## Practical summary for component rationale

When you see a rationale in this library's component JSDoc like "keeps users
within their window of tolerance" or "reduces threat appraisal," it means:

1. The component addresses a feature of digital environments that can push users
   toward hyperarousal (overwhelm) or hypoarousal (shutdown)
2. It does so by adding predictability, agency, repair, or a co-regulation signal
3. These changes are grounded in stress physiology and clinical practice, even
   where the specific neuroanatomy cited is contested

---

## Further reading

- Siegel, D. J. (1999). *The Developing Mind.* Guilford Press. [Source of window of tolerance]
- Porges, S. W. (2011). *The Polyvagal Theory.* W.W. Norton. [Original theory — read with the caveats above]
- Dana, D. (2018). *The Polyvagal Theory in Therapy.* W.W. Norton. [Most accessible clinical translation]
- van der Kolk, B. (2014). *The Body Keeps the Score.* Viking. [Trauma's somatic dimension]
- Levine, P. A. (2010). *In an Unspoken Voice.* North Atlantic Books. [Somatic experience approach]
- `research/honest-critique.md` — including the Grossman (2023) critique of polyvagal theory

---

*Maintained by Luana Micheau / Care-Conscious Design*
*Last updated: March 2026*
