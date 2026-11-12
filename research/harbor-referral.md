# Harbor referral: a comparison case

**Status: prototype built, sessions not run.** This document is the case a hiring conversation can interrogate. It is not a findings report.

Fictional service. Fictional patient. No participant data is included because no sessions have happened.

---

## 1. Problem

A community health worker is closing a referral while holding someone else’s clinical and housing information, and while being interrupted.

Harbor Community Health is fictional. Alex Rivera, 34, has asked for help with a repeat prescription and last month’s rent. The worker writes a note and decides what Northside Housing Advice will receive:

- a short clinical paragraph about nausea after a new medication
- Alex’s phone number
- permission for Northside to contact Alex directly

The conventional screen treats this as one agreement, shows the paragraph immediately, sends at once, discards a draft if the session times out, and opens the next case by itself.

The worker’s job is not to feel soothed by the software. The job is to know what will be shared, to refuse a part of that share and still finish, to recover a mis-send, and to come back after a phone call without reconstructing the note.

This is the audience the care-worker guideline argues is missing from most trauma-informed interface writing. The ethical boundary of the study is the same: participants are workers reviewing a fictional case. They are not asked about their own histories.

## 2. Evidence used before any sessions

The comparison was specified from sources the repository already treats as stronger than a nervous-system story.

- Unannounced exposure is a documented harm in moderation work. Karunakaran and colleagues, CHI 2021, “The Psychological Well-Being of Content Moderators,” is cited in [`guidelines/care-worker-ux.md`](../guidelines/care-worker-ux.md). That supports a specific warning before a clinical paragraph. It does not prove that a warning helps a health worker who expected clinical text in a referral.
- Perceived control, comprehension, and the ability to undo are the mechanisms [`research/honest-critique.md`](./honest-critique.md) says are on firmer ground than polyvagal anatomy. Polyvagal theory is not used here as a reason to ship a behavior.
- GOV.UK’s Exit this page pattern is the model for scope honesty. A control should say what it actually does to history and session data. `SafeExit` was corrected to match that limit.
- The care-worker guideline already says mandatory wellbeing check-ins are resented and often gamed, and that interrupted work has to return to the same place. `PauseAware` already lists “Are you still there?” as copy it refuses.

What this evidence does not do: it does not show that the care-conscious Harbor screen is better. That is what the sessions are for.

## 3. Design decisions

The demo at `#referral-comparison` runs three versions of RH-2041. The rules live in `demo/src/referralModel.ts` and are covered by unit tests.

**Disclosure.** On the care-conscious screen the paragraph sits behind a specific warning: nausea, missed rent, and a phone number. The worker can open the warning, reveal the paragraph, or skip it. The paragraph counts as opened when they choose “Show this section,” not when the warning expands. Revealing it is latched; skipping later does not pretend they never saw it. Sharing the paragraph without opening it produces a visible warning in the partner preview.

**Separate refusal.** Three questions, one at a time: share the paragraph, share the phone number, allow direct contact. Each “No” still allows the referral to be sent. The conventional screen blocks send until one checkbox accepts all three.

**The phone number was pulled out of the partner copy.** While specifying the record, the number sat inside the clinical paragraph. A “no” to sharing the phone would have been false if that paragraph was forwarded whole. The care-conscious preview therefore sends a paragraph without the number, and it says so before the worker commits. The conventional screen still sends the number inside the paragraph. This decision changed because of the material, not because separate questions were already believed to be enough.

**Recovery.** Care-conscious send waits 7 seconds and can be cancelled. The toast states what Northside would receive. Conventional send completes on the click.

**Return.** “Simulate a phone call” discards the conventional draft and keeps the care-conscious draft, including the note and the sharing answers. “Pause and keep my place” is worker-initiated. The next case opens immediately on the conventional screen and only after “I’m ready for the next case” on the others.

**The automatic prompt is the third version, not the default.** After 8 seconds without input anywhere on the page, `PauseAware` offers “Keep going” or “Pause here.” The decision guide no longer recommends that prompt for a care-worker task. The guide points to this comparison instead. Keeping the prompt in a third arm is what makes the study able to retire it.

`CalmingMessage`, `EmotionCheckIn`, and `BreathingGuide` are not part of this case. Session transition, exposure pacing, and a voluntary check-in stay written specifications. A “next case waits” moment is flow behavior in the prototype. It becomes a component only if the sessions say the wait matters.

## 4. Validation

Not run. The protocol below is the commitment for how it will be run.

**Participants.** Six to eight people who do or have done case-based care work: community health workers, social workers, or clinicians who write referrals. No questions about personal trauma, health, or anyone’s real clients. Use the fictional names only. People can skip a task or stop. Recording consent is separate from participation consent. Report in aggregate.

**Design.** Within subjects. Every participant completes the conventional version and the care-conscious version, order counterbalanced. After those two, they are asked whether they want to continue into the automatic-prompt version. The prompt is last so it does not colour the first impression of the main comparison. Facilitators do not coach. The facilitator uses the on-screen session record and their own notes.

**Tasks.**

1. Send the referral so Northside receives the housing context and does not receive the phone number. Say aloud, before sending, what Northside will get.
2. On a second pass, cancel a send you did not mean to make. Say whether the referral went or not.
3. Start a note, take the simulated phone call, and continue the same note.

**Record.** Completion, time, comprehension of the partner payload, wrong shares, unread disclosure that was still shared, successful cancels, whether the note survived, whether a prompt appeared during reading or typing, and dismissals. After each version ask: “Where did this feel respectful, and where did it feel as if the software were managing you?” Do not ask whether the screen felt safe.

**Success.** A decision for each behavior: keep, narrow, or drop. A care-conscious version “winning” on preference is not the goal.

## 5. Limitations

- One fictional referral in one community-health frame. Housing advice plus a mild clinical sentence is not a crisis line, a content-moderation queue, or an emergency department.
- The researcher who designed the screens will hear the sessions unless someone else facilitates. That can flatter the care-conscious version.
- Eight people can overturn a recommendation for this task. They cannot estimate a population effect.
- The prototype stores nothing on a server. A production timeout, audit log, and partner payload may behave differently. In particular, the redaction has to happen in the payload the partner actually receives, not only in the preview sentence.
- The automatic prompt listens for input on the whole demo page. In a production case file it would have to be scoped to that file, or it will fire while someone is working nearby.
- The study does not measure distress, trauma recovery, or “how trauma-informed” a screen is. Those instruments are not available, and this case does not pretend to create them.
- People management, team coaching, and organisational rollout are outside what this repository can show.

## Pre-registered results that change the recommendation

Write the session synthesis against this table. Do not soften it after the fact.

| If the sessions show this | The recommendation becomes |
|---|---|
| Workers expected the clinical paragraph, and disclosure mainly added time or was described as getting in the way | Stop recommending `DisclosureCard` for professional review of an expected clinical field. Keep it available for material the worker did not expect. |
| Workers cannot accurately say what Northside will receive | Separate questions are not doing their job. Change the preview until comprehension holds, or drop the pattern from the recommendation. |
| A “no” to the phone number still reveals it, including from a pasted paragraph, an attachment, or an audit log | The care-conscious send is unsafe to recommend. Redaction has to be true of the payload. |
| Nobody uses the 7 second window, or people do not believe the send is still stoppable | Replace `RegretButton` on this task with an explicit confirmation, or change the window and test again. |
| The explicit pause returns people to a lost or partial note | Drop “pause and return” until preservation is true. |
| The automatic prompt appears while someone is still reading or writing, or people describe it as patronising or anxiety-provoking | Remove `PauseAware` from the care-work path in the decision guide. Do not replace it with softer wording of the same interruption. |
| Workers want a clear stop between cases and say the immediate next case costs them | That is the evidence for building the specified `SessionTransition`. Not before. |
| The conventional screen matches the care-conscious screen on comprehension, errors, recovery, and interruptions | Say so. Keep the care-conscious behaviors as options with no claim of advantage. |

## What this case is allowed to claim today

The repository can show a specified comparison, working behavior, and the conditions under which its author will change the recommendation. It cannot claim that care workers performed better, that anyone outside the project has adopted it, or that the screen is trauma-informed in a measured sense.
