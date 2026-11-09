import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ConsentStepper, DisclosureCard, PauseAware, RegretButton } from '../../src'
import {
  CLINICAL_PARAGRAPH,
  type VariantId,
  applyDisclosure,
  careChoicesFromResults,
  consentSteps,
  createDraft,
  interruptionResult,
  nextCaseAfterSend,
  partnerPreview,
  usesAutomaticPrompt,
  variants,
} from './referralModel'

function ReferralScreen({ variant }: { variant: VariantId }) {
  const [draft, setDraft] = useState(createDraft)
  const [consentKey, setConsentKey] = useState(0)
  const [phase, setPhase] = useState<'editing' | 'sent' | 'next'>('editing')
  const [paused, setPaused] = useState(false)
  const [notice, setNotice] = useState('')
  const [log, setLog] = useState<string[]>([])
  const returnRef = useRef<HTMLButtonElement>(null)

  const record = useCallback((message: string) => {
    setLog((items) => [...items, message])
    setNotice(message)
  }, [])

  useEffect(() => {
    if (paused) returnRef.current?.focus()
  }, [paused])

  function resetCase() {
    setDraft(createDraft())
    setConsentKey((key) => key + 1)
    setPhase('editing')
    setPaused(false)
    setLog([])
    setNotice('This version is back to the start of referral RH-2041.')
  }

  function simulateCall() {
    if (phase !== 'editing') {
      record('The referral has already been sent. Ending the call does not bring it back.')
      return
    }
    const result = interruptionResult(variant, draft)
    setDraft(result.draft)
    if (!result.preserved) setConsentKey((key) => key + 1)
    setPaused(false)
    record(result.message)
  }

  const onAutomaticPrompt = useCallback(() => {
    record('Automatic prompt appeared after 8 seconds without input on this page.')
  }, [record])

  function finishSend() {
    const outcome = partnerPreview(variant, draft)
    if (outcome.state === 'blocked') {
      record(outcome.reason)
      return
    }
    const next = nextCaseAfterSend(variant)
    const messages = [`${outcome.summary} ${outcome.warnings.join(' ')}`.trim()]
    if (next === 'immediate') messages.push('Next case RH-2042 opened without asking.')
    setPhase(next === 'immediate' ? 'next' : 'sent')
    setPaused(false)
    setLog((items) => [...items, ...messages])
    setNotice(messages.join(' '))
  }

  const outcome = partnerPreview(variant, draft)
  const careful = variant !== 'conventional'
  const editing = phase === 'editing' && !paused

  return (
    <div className="referral__layout">
      <div className="referral__screen">
        <p className="demo-kicker">Fictional case / RH-2041</p>
        <h3>Close Alex Rivera’s referral to Northside Housing Advice</h3>
        <p className="referral__lede">Alex, 34, asked Harbor Community Health for help with a repeat prescription and last month’s rent. Nothing here is a real record, and nothing is sent to a server.</p>

        {paused && (
          <div className="referral__cover" role="region" aria-label="Paused referral">
            <h4>Paused. This referral is still here.</h4>
            <p>The note and the sharing choices stay on this page. Nothing has been sent.</p>
            <button ref={returnRef} type="button" className="demo-button demo-button--task" onClick={() => { setPaused(false); record('Returned to the same referral.') }}>Return to the referral</button>
          </div>
        )}

        {editing && careful && (
          <div className="referral__block">
            <DisclosureCard
              label="Clinical paragraph"
              badge="medication and housing"
              warningText="This paragraph describes nausea after a new medication and a missed rent payment. The phone number is included for you. It is removed from the copy a partner would receive."
              onOpen={() => setDraft((current) => ({ ...current, disclosure: applyDisclosure(current.disclosure, 'open') }))}
            >
              <p>{CLINICAL_PARAGRAPH}</p>
            </DisclosureCard>
            {draft.disclosure === 'opened'
              ? <p className="referral__hint">Opened by choice.</p>
              : <button type="button" className="demo-button demo-button--secondary" onClick={() => setDraft((current) => ({ ...current, disclosure: applyDisclosure(current.disclosure, 'skip') }))}>Skip this paragraph</button>}
          </div>
        )}

        {editing && !careful && (
          <div className="referral__block">
            <h4>Clinical record</h4>
            <p className="referral__paragraph">{CLINICAL_PARAGRAPH}</p>
            <label className="decision-form__choice">
              <input
                type="checkbox"
                checked={draft.bundledShare}
                onChange={(event) => setDraft((current) => ({ ...current, bundledShare: event.target.checked }))}
              />
              <span>Share the full record, Alex’s phone number, and permission for Northside to contact Alex.</span>
            </label>
          </div>
        )}

        {editing && (
          <label className="referral__field">
            <span>Note for the referral</span>
            <textarea
              value={draft.note}
              onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))}
              placeholder="Write what you want the partner service to do."
            />
          </label>
        )}

        {editing && careful && (
          <div className="referral__block">
            <h4>What may be shared</h4>
            <ConsentStepper
              key={consentKey}
              steps={consentSteps}
              completionHeading="Sharing choices recorded"
              completionBody="You can still change them before sending. Refusal does not stop you closing the referral."
              onComplete={(results) => setDraft((current) => ({ ...current, care: careChoicesFromResults(results) }))}
              onStepChange={(_index, result) => setDraft((current) => {
                const care = careChoicesFromResults([result])
                return {
                  ...current,
                  care: {
                    shareClinical: result.stepIndex === 0 ? care.shareClinical : current.care.shareClinical,
                    sharePhone: result.stepIndex === 1 ? care.sharePhone : current.care.sharePhone,
                    allowFollowUp: result.stepIndex === 2 ? care.allowFollowUp : current.care.allowFollowUp,
                  },
                }
              })}
            />
            {outcome.state === 'ready' && (
              <button type="button" className="demo-button demo-button--secondary" onClick={() => {
                setDraft((current) => ({ ...current, care: createDraft().care }))
                setConsentKey((key) => key + 1)
              }}>Change sharing choices</button>
            )}
          </div>
        )}

        {editing && careful && (
          <div className="referral__preview" role="region" aria-label="What the partner service would receive">
            <h4>What Northside would receive</h4>
            {outcome.state === 'blocked'
              ? <p>{outcome.reason}</p>
              : <>
                <p>{outcome.summary}</p>
                {outcome.warnings.map((warning) => <p key={warning}>{warning}</p>)}
              </>}
          </div>
        )}

        {editing && careful && (
          <RegretButton
            label="Send referral"
            toastMessage={outcome.state === 'ready' ? `Sending in 7 seconds. ${outcome.summary}` : 'Answer each sharing question before sending.'}
            undoneMessage="Cancelled. Nothing was sent."
            windowMs={7000}
            disabled={outcome.state === 'blocked'}
            onUndo={() => record('Send cancelled during the 7 second window. Nothing was delivered.')}
            onAction={finishSend}
          />
        )}

        {editing && !careful && (
          <button type="button" className="demo-button demo-button--task" onClick={finishSend}>Send referral</button>
        )}

        {phase === 'sent' && outcome.state === 'ready' && (
          <div className="demo-result">
            <p>{outcome.summary}</p>
            {outcome.warnings.map((warning) => <p key={warning}>{warning}</p>)}
            <p>The next case is waiting. It will not open until you say so.</p>
            <button type="button" className="demo-button demo-button--task" onClick={() => { setPhase('next'); record('Worker opened the next case.') }}>I’m ready for the next case</button>
          </div>
        )}

        {phase === 'next' && (
          <div className="referral__next" role="region" aria-label="Next case">
            <h4>RH-2042 is open</h4>
            <p>{variant === 'conventional'
              ? 'This case replaced RH-2041 as soon as the referral was sent.'
              : 'This case opened because you asked for it.'}</p>
            {outcome.state === 'ready' && <p>{outcome.summary}</p>}
          </div>
        )}

        {usesAutomaticPrompt(variant) && editing && (
          <PauseAware
            thresholdMs={8000}
            message="No rush. You can keep going, or pause here and keep this referral."
            onPause={onAutomaticPrompt}
            actions={[
              { label: 'Keep going', variant: 'primary', onClick: () => record('Automatic prompt dismissed with Keep going.') },
              { label: 'Pause here', onClick: () => { setPaused(true); record('Automatic prompt used to pause. The referral stayed here.') } },
            ]}
          />
        )}

        <div className="referral__actions">
          {editing && careful && <button type="button" className="demo-button demo-button--secondary" onClick={() => { setPaused(true); record('Paused from the explicit control. The referral stayed here.') }}>Pause and keep my place</button>}
          <button type="button" className="demo-button demo-button--secondary" onClick={simulateCall}>Simulate a phone call</button>
          <button type="button" className="demo-button demo-button--secondary" onClick={resetCase}>Reset this version</button>
        </div>
        <p className="referral__status" role="status" aria-live="polite">{notice}</p>
      </div>

      <aside className="referral__meta" aria-label="What this version is testing">
        <h3>What this version changes</h3>
        <p>{variants.find((item) => item.id === variant)?.summary}</p>
        <h3>Session record</h3>
        {log.length === 0
          ? <p>Actions in this version will be listed here. The list stays on this page.</p>
          : <ol>{log.map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li>)}</ol>}
        <h3>A result that would retire a pattern</h3>
        <ul>
          <li>Disclosure goes if workers expected this paragraph and the extra step only adds time.</li>
          <li>Separate sharing goes if workers miss the consequence or the redaction still leaks the phone number.</li>
          <li>The 7 second window goes if nobody uses it.</li>
          <li>The automatic prompt goes if it appears while someone is still reading, or if they describe it as the software managing them.</li>
        </ul>
      </aside>
    </div>
  )
}

export function ReferralComparison() {
  const [variant, setVariant] = useState<VariantId>('care-conscious')

  return (
    <section className="referral" id="referral-comparison" aria-labelledby="referral-title">
      <div className="section-heading">
        <p className="demo-kicker">One case / Three versions</p>
        <h2 id="referral-title">Compare one referral</h2>
        <p>A fictional community health worker is closing a sensitive referral. The same task runs on a conventional screen, a care-conscious screen, and a care-conscious screen that adds an automatic prompt. The study that would decide between them has not been run.</p>
      </div>
      <div className="referral__switch" role="radiogroup" aria-label="Choose a version of the referral">
        {variants.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={variant === item.id}
            className={variant === item.id ? 'is-active' : ''}
            onClick={() => setVariant(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ReferralScreen key={variant} variant={variant} />
    </section>
  )
}
