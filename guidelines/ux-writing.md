# UX writing for sensitive contexts

Language in trauma-informed interfaces carries as much weight as visual design.
A well-structured component with poor copy re-traumatises. This guide covers
the specific language patterns that matter most.

---

## The core principle: warm specificity

Good sensitive-context writing is neither minimising nor clinical. It
acknowledges reality without amplifying it.

| ❌ Minimising | ❌ Clinical | ✓ Warm specificity |
|---|---|---|
| "Don't worry, this is quick" | "This section contains potentially traumatising content" | "This section asks about your pregnancy history" |
| "Almost there!" | "Complete mandatory fields before proceeding" | "Just a few more questions — take your time" |
| "This is easy" | "Indicate your medical history below" | "There's no right or wrong answer here" |
| "Just one more step" | "Submit form to continue" | "You can stop here if you need to" |

---

## Error messages

Error messages are the single highest-risk copy in most interfaces. They arrive
at moments of failure, often when the user is already stressed.

### Rules

**Never blame the user for system errors.**
The system has failed, not the person. Even if the user did something "wrong",
the system should have anticipated it.

**Be specific about what happened and what to do next.**
Vague errors create helplessness. Specific errors create a path forward.

**Never use exclamation marks in error states.**
"Something went wrong!" — the exclamation is jarring at a moment of frustration.

**Avoid language of obligation.** "You must", "You need to", "Required" — these
are authoritarian. Prefer: "To continue, add a date of birth."

### Examples

```
❌ "Invalid input"
✓  "The date format should be DD/MM/YYYY — for example, 04/03/1985"

❌ "Error: required field missing"
✓  "We need your email address to send your confirmation. Add it above."

❌ "You entered an incorrect password"
✓  "That password didn't match. Try again, or reset your password below."

❌ "Session expired. Please log in again."
✓  "You've been away for a while. Sign in again to pick up where you left off."

❌ "Upload failed"
✓  "That file couldn't be uploaded — it might be too large (maximum 5MB).
    Try a smaller file, or contact us for help."
```

---

## Consent language

Consent copy is legally and ethically high-stakes. The goal is genuine informed
choice — not the appearance of it.

### Rules

**One thing at a time.** Each consent question addresses one decision.

**Plain language, not legal language.** If the person needs a law degree to
understand what they're agreeing to, it isn't informed consent.

**State what you will and won't do.** Not just "we take your privacy seriously"
but "your data is stored on our servers and never sold."

**Make refusal equally accessible.** The "no" option should be as easy to find
and select as the "yes" option.

**No pre-ticked boxes.** Ever.

### Examples

```
❌ "By proceeding, you agree to our Terms of Service and Privacy Policy."
✓  "Can we store your responses securely?
    Your answers stay on our servers and are never sold or shared.
    You can request deletion at any time."

❌ "I consent to the collection and processing of my personal data in accordance
    with the General Data Protection Regulation (EU) 2016/679."
✓  "Can a member of our team follow up with you by email?"

❌ [checkbox pre-ticked] "Send me updates about new services"
✓  [checkbox empty]      "I'd like to hear about services that might help me"
```

---

## Content warnings

Content warnings should be specific enough to allow neurological preparation.

**Specificity rule:** The user should be able to form a rough mental image of
what they're about to see from the warning alone.

```
❌ "Sensitive content ahead"
✓  "This section includes clinical descriptions of self-harm symptoms"

❌ "Warning: this may be upsetting"
✓  "The next section includes detailed accounts of childhood abuse,
    written by survivors"

❌ "Graphic content"
✓  "This image shows the results of surgical wound closure.
    It is medically accurate and some people find it distressing."
```

**Tone guidance for the follow-through text** (after the warning):
- "Take a moment if you need one — you can return here any time"
- "There's no obligation to read this section"
- "Your care team will not know whether you opened this"

Avoid:
- "Viewer discretion is advised" — broadcast language, too formal
- "This content may trigger you" — clinical jargon, and "trigger" is contested
- "Please be aware that..." — padding that delays the actual information

---

## Pacing prompts

When asking users to slow down or take a break.

### Rules

"Keep going" should always be the first and primary option.
The prompt should not imply the pause was unusual or problematic.
Do not describe how long they've been inactive ("you've been here 4 minutes").

```
❌ "Are you still there?"
✓  "No rush — take as long as you need"

❌ "You've been inactive for 90 seconds. Continue?"
✓  "You've been here a little while. Would you like to keep going,
    save your progress, or take a break?"

❌ "Session will expire in 2 minutes"
✓  "Your progress is saved. You can come back to this any time."
```

---

## Confirmations and completions

What you say when something is done — or undone.

```
❌ "Success!"
✓  "Your response has been submitted"

❌ "Form submitted successfully"
✓  "All done. You'll hear from us within 3 working days."

❌ "Action reversed"
✓  "Undone — no harm done"

❌ "Your data has been deleted. This action cannot be undone."
✓  "Your account has been removed. If you change your mind,
    contact us within 30 days and we can restore it."
```

---

## Gender-inclusive language

Do not assume gender in any system-generated copy.

```
❌ "Hi, she'll be with you shortly"
✓  "Your counsellor will be with you shortly"

❌ "Please ask your husband or wife..."
✓  "Please ask your partner or spouse..."

❌ "Mother's name" / "Father's name"
✓  "Parent or guardian's name"

❌ "He/she will review your application"
✓  "They will review your application" (or: "The reviewer will...")
```

**Name fields:** Accept any characters. Do not impose first/last order.
Label: "Your name" not "First name + Last name."
Include a "preferred name" or "name you go by" field separately from legal name
when the distinction matters.

---

## Care worker interfaces

Language in tools that care workers use has different considerations.

**Do not gamify care metrics.**
```
❌ "You've closed 12 cases today! Keep it up!"
✓  [No unsolicited performance commentary]
```

**Acknowledge emotional load at transition moments.**
```
❌ [Immediate redirect to next intake]
✓  "Case closed. Take a moment before the next one loads."
```

**Make break options visible without implying they're necessary.**
```
❌ "You've been working for 4 hours. You should take a break."
✓  "Take a break" [persistent, quiet button — not a pop-up]
```

---

## What to avoid in all contexts

- Exclamation marks in serious moments
- Countdown timers that create urgency ("Act now! Offer expires in 3:24")
- Progress bars that reset unexpectedly
- "Almost there!" when there are still many steps
- "Simple", "easy", "quick", "just" — these minimise the user's experience
- Passive voice to avoid accountability: "An error occurred" → "Something went wrong on our end"
- Jargon that assumes clinical or legal literacy

---

*Maintained by Luana Micheau / Care-Conscious Design*
*Last updated: March 2026*
