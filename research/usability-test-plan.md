# Usability test plan for the design-system website

## Scope

This plan tests the decision-guide website: whether a practitioner can choose, understand, and apply a pattern. It does not test whether a pattern helps a care worker complete a referral. That comparison is specified in [`harbor-referral.md`](./harbor-referral.md), and those sessions have not been run. Neither plan has findings yet.

## Goal

Find out whether the website helps a practitioner choose, understand, and apply a pattern. This is a usability study, not a clinical assessment or a test of whether a component reduces distress.

## Participants

Recruit 5–8 people across product design, frontend development, and care-service practice. Include people with accessibility expertise where possible. Do not ask participants to disclose trauma histories.

## Task

> You are designing a consent choice for a sensitive intake form. Use this site to decide what interaction to use, what the person should be told, and what you would check before release.

Give participants a realistic service brief that states its region, data types, and whether refusal affects service access. Let them use the site without coaching. Ask some participants to start with **Quick answer** and others to use **Full brief**, then compare what each group can explain.

## Re-entry task

> You are helping a care worker design a review flow. Choose a pattern, then pause because another task needs your attention. Return to this browser tab and continue from where you left off.

Let the participant decide whether to save the guide. Reload the tab after a realistic interruption, then ask them to resume. Repeat the task with “A shared device may be used” selected and ask what they expect the site to retain. Use only fictional service details. This tests the design claim in [Care Under Load](https://www.luana.systems/writing/care-under-load) that a useful flow supports re-entry when capacity and attention change.

## Observe

1. Can they find the Decision Guide and select relevant task conditions?
2. Can they explain why the recommended pattern fits and what its limits are?
3. Can they find and try the related working example?
4. Can they identify how to implement the pattern and which callbacks require real service behavior?
5. Can they name at least one check they would run before shipping?
6. After an interruption, can they identify what was saved, resume the correct task, and find the next action?
7. Do they understand that saving is optional, tab-scoped, and disabled for a shared-device scenario?

Record task completion, errors, backtracking, and the participant's explanation. Ask after the task: “What would you trust here, and what would you need to verify?” Avoid asking whether the site “felt safe” as a stand-in for observed behavior.

## Success criteria

- At least 6 of 8 participants find a relevant pattern without help.
- At least 6 of 8 can describe one real refusal or recovery path.
- No participant leaves believing the demo stores their choices or clears earlier browser history.
- Developers can identify where application-specific callbacks must be connected.
- At least 6 of 8 participants resume a saved guide without help and correctly name their next action.
- No participant assumes the guide saved their selections when they did not choose to save.

Review findings by role and accessibility need, not just as one average score. Fix misleading behavior before tuning visual preferences.

## Session safeguards

Use fictional examples; do not request personal health or trauma information. Tell participants they may skip any question or stop. Obtain consent for recording separately. Report findings in aggregate and remove identifiable notes after synthesis.
