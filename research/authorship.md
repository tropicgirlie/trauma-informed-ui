# Authorship and judgment

Luana Micheau is the author of the design argument, the component behavior, and the decision to prove the work through the Harbor referral rather than through more components.

AI tools have been used to draft and revise code, interface copy, and research notes. A review of the GitHub project treated Claude as a contributor. The useful account is which decisions were accepted, which generated output was rejected, and how the output was checked. The presence of working code is not, by itself, evidence of design judgment.

Checks used on this work:

- A behavior has to be explainable as a consequence for a specific task: what the person can understand, refuse, recover, or return to.
- Generated copy that assumes an emotional state, promises clinical benefit, or hides what will be shared does not stay.
- A claim in the README has to be true of the repository. An install command without a release was one such claim. It has been removed.
- Rules that can be wrong in code are unit-tested. The Harbor sharing, redaction, interruption, and next-case rules are in `demo/src/referralModel.test.ts`.

Decisions that illustrate the standard:

- `SafeExit` no longer implies that a quick exit erases earlier browser history. The platform cannot promise that. The docs say the service must clear its own session.
- `PauseAware` is no longer the decision guide’s recommendation for care-worker tasks. The guide points to an explicit pause in the Harbor comparison. The automatic prompt remains a third version so a study can retire it. That change follows the component’s own rejected copy, the care-worker note on resented check-ins, and review of the pattern. It does not follow a participant session. Those sessions are still ahead, and they can reverse this.
- The Harbor partner preview removes the phone number from the shared clinical paragraph. A separate “no” was false while the number lived inside the paragraph. That showed up while specifying the fictional record.

`EmotionCheckIn`, `BreathingGuide`, and `CalmingMessage` remain in the source and outside the case being proved. They are the kind of output that should not lead the project, because they invite the interface to comment on a person’s emotional state.

The Harbor protocol in [`harbor-referral.md`](./harbor-referral.md) is the next check. A recommendation that survives contact with the code, and then breaks contact with care workers, has to change.
