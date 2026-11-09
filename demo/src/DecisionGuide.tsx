import React, { useEffect, useMemo, useState } from 'react'

type ScenarioId = 'consent' | 'sensitive-content' | 'consequential-action' | 'care-work'
type Jurisdiction = 'eu' | 'us' | 'global'
type ContextKey = 'personalData' | 'sharedDevice' | 'hardToReverse' | 'aiInfluence' | 'healthData'
type GuideMode = 'quick' | 'full'
type SavedGuide = { scenarioId: ScenarioId; jurisdiction: Jurisdiction; context: Record<ContextKey, boolean>; mode: GuideMode }

const savedGuideKey = 'ti-ui-decision-guide-v1'
const defaultContext: Record<ContextKey, boolean> = {
  personalData: false,
  sharedDevice: false,
  hardToReverse: false,
  aiInfluence: false,
  healthData: false,
}

function readSavedGuide(): SavedGuide | null {
  try {
    const raw = sessionStorage.getItem(savedGuideKey)
    if (!raw) return null
    const value = JSON.parse(raw) as Partial<SavedGuide>
    if (!value.scenarioId || !['consent', 'sensitive-content', 'consequential-action', 'care-work'].includes(value.scenarioId)) return null
    if (!value.jurisdiction || !['eu', 'us', 'global'].includes(value.jurisdiction)) return null
    if (!value.context || typeof value.context !== 'object' || value.context.sharedDevice) return null
    if (Object.keys(defaultContext).some((key) => typeof value.context?.[key as ContextKey] !== 'boolean')) return null
    return { scenarioId: value.scenarioId, jurisdiction: value.jurisdiction, context: value.context as SavedGuide['context'], mode: value.mode === 'full' ? 'full' : 'quick' }
  } catch { return null }
}

export const scenarios: Record<ScenarioId, {
  label: string
  pattern: string
  patternId: string
  reason: string
  sample: string
  snippet: string
  checks: string[]
}> = {
  consent: {
    label: 'Ask for a data choice',
    pattern: 'Consent Stepper',
    patternId: 'consent-stepper',
    reason: 'Separate each decision, explain its consequence, and give refusal equal visibility.',
    sample: 'May we use your answers to tailor examples during this visit? You can still use the guide if you say no.',
    snippet: "<ConsentStepper\n  steps={consentQuestions}\n  onComplete={saveConsentChoices}\n/>",
    checks: ['Can someone decline without losing the main service?', 'Can they review and change a choice later?', 'Does the interface say what happens to the data?', 'If saving fails, does the page say so and preserve the choice?'],
  },
  'sensitive-content': {
    label: 'Show sensitive material',
    pattern: 'Content Warning',
    patternId: 'content-warning',
    reason: 'Describe the material before it appears and let the person choose whether to reveal it.',
    sample: 'The next section describes medical symptoms. Show it, or skip this example for now.',
    snippet: "<ContentWarning\n  category=\"medical\"\n  detail=\"This section describes symptoms.\"\n  skipLabel=\"Skip for now\"\n  onSkip={skipSection}\n>\n  <SensitiveSection />\n</ContentWarning>",
    checks: ['Is the warning specific enough to help someone decide?', 'Does skipping actually bypass the material?', 'Can someone return without a penalty?'],
  },
  'consequential-action': {
    label: 'Confirm a consequential action',
    pattern: 'Regret Button',
    patternId: 'regret-button',
    reason: 'Explain the consequence before action and provide a real recovery path where one is possible.',
    sample: 'Submit this response. You will have 7 seconds to cancel before it is sent.',
    snippet: "<RegretButton\n  label=\"Submit response\"\n  toastMessage=\"Response will submit shortly\"\n  windowMs={7000}\n  onAction={submitResponse}\n/>",
    checks: ['Is the action genuinely reversible during the stated window?', 'Is the undo control visible and keyboard accessible?', 'Does the confirmation say what happened?'],
  },
  'care-work': {
    label: 'Support a care worker task',
    pattern: 'Pause and return',
    patternId: 'referral-comparison',
    reason: 'Keep the worker’s place, and let them pause themselves. An automatic inactivity prompt is a separate version in the referral comparison, because it can interrupt someone who is still reading.',
    sample: 'Pause and keep my place. The referral stays here until you come back.',
    snippet: "Save the draft at each meaningful change.\nOffer an explicit pause.\nReturn the worker to the same field.\nDo not load the next case until they say they are ready.",
    checks: ['Does the draft survive an interruption without asking the worker to reconstruct it?', 'Can they refuse a share and still finish the task?', 'Does an automatic prompt appear while they are still working?', 'Is any check-in private, optional, and kept away from management metrics?'],
  },
}

const contextOptions: { key: ContextKey; label: string; advice: string }[] = [
  { key: 'personalData', label: 'Personal data is collected', advice: 'Explain what is collected, why, how long it is kept, and how to change the choice.' },
  { key: 'sharedDevice', label: 'A shared device may be used', advice: 'Avoid storing sensitive progress by default. Offer a discreet exit and explain what the browser can retain.' },
  { key: 'hardToReverse', label: 'The action is hard to reverse', advice: 'Add a review step before submission. Do not promise undo unless the action can truly be stopped.' },
  { key: 'aiInfluence', label: 'AI influences the decision', advice: 'Show what the recommendation is based on, its limits, and a route to human review.' },
  { key: 'healthData', label: 'Health information is handled', advice: 'Limit exposure of health information and check which privacy rules apply to the organisation.' },
]

export function getLegalChecks(jurisdiction: Jurisdiction, context: Record<ContextKey, boolean>) {
  const eu = jurisdiction === 'eu' || jurisdiction === 'global'
  const us = jurisdiction === 'us' || jurisdiction === 'global'
  const checks = [{ label: 'WCAG 2.2 AA', detail: 'Use as the accessibility design target; test the actual flow.', href: 'https://www.w3.org/TR/WCAG22/' }]

  if (eu && context.personalData) {
    checks.push({ label: 'GDPR', detail: 'Check the lawful basis, transparency, retention, and rights for EU personal data.', href: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' })
  }
  if (eu) {
    checks.push({ label: 'European Accessibility Act', detail: 'Check whether this is a covered product or service in the relevant EU market.', href: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj' })
  }
  if (us) {
    checks.push({ label: 'ADA', detail: 'Check accessibility duties for the organisation and service.', href: 'https://www.ada.gov/resources/web-guidance/' })
  }
  if (us && context.healthData) {
    checks.push({ label: 'HIPAA', detail: 'Check only if the organisation is a covered entity or business associate handling protected health information.', href: 'https://www.hhs.gov/hipaa/for-professionals/privacy/index.html' })
  }
  if (eu && context.aiInfluence) {
    checks.push({ label: 'EU AI Act', detail: 'Classify the AI use case and check the duties that apply to it.', href: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj' })
  }
  return checks
}

export function DecisionGuide() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('consent')
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('eu')
  const [context, setContext] = useState<Record<ContextKey, boolean>>(defaultContext)
  const [mode, setMode] = useState<GuideMode>('quick')
  const [savedGuide, setSavedGuide] = useState<SavedGuide | null>(readSavedGuide)
  const [rememberInTab, setRememberInTab] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const scenario = scenarios[scenarioId]
  const selectedAdvice = contextOptions.filter(({ key }) => context[key])
  const legalChecks = useMemo(() => getLegalChecks(jurisdiction, context), [jurisdiction, context])

  useEffect(() => {
    if (!rememberInTab || context.sharedDevice) return
    const snapshot = { scenarioId, jurisdiction, context, mode }
    try {
      sessionStorage.setItem(savedGuideKey, JSON.stringify(snapshot))
      setSavedGuide(snapshot)
    } catch { setSaveStatus('This browser could not save the brief. Your current view still works.') }
  }, [rememberInTab, scenarioId, jurisdiction, context, mode])

  function clearSavedGuide() {
    try { sessionStorage.removeItem(savedGuideKey) } catch { /* Storage may be unavailable. */ }
    setSavedGuide(null)
    setRememberInTab(false)
    setSaveStatus('Saved brief removed from this tab.')
  }

  function updateContext(key: ContextKey, checked: boolean) {
    if (key === 'sharedDevice' && checked) clearSavedGuide()
    setContext((current) => ({ ...current, [key]: checked }))
    setCopyStatus('')
  }

  function saveForThisTab() {
    if (context.sharedDevice) return
    try {
      const snapshot = { scenarioId, jurisdiction, context, mode }
      sessionStorage.setItem(savedGuideKey, JSON.stringify(snapshot))
      setSavedGuide(snapshot)
      setRememberInTab(true)
      setSaveStatus('Brief saved in this browser tab. Changes will stay saved until you clear it.')
    } catch { setSaveStatus('This browser could not save the brief. Your current view still works.') }
  }

  function resumeSavedGuide() {
    if (!savedGuide) return
    setScenarioId(savedGuide.scenarioId)
    setJurisdiction(savedGuide.jurisdiction)
    setContext(savedGuide.context)
    setMode(savedGuide.mode)
    setRememberInTab(true)
    setSaveStatus(`Resumed: ${scenarios[savedGuide.scenarioId].label}.`)
  }

  const brief = [
    `Task: ${scenario.label}`,
    `Recommended pattern: ${scenario.pattern}`,
    `Why: ${scenario.reason}`,
    `Example wording: “${scenario.sample}”`,
    `Implementation sketch:\n${scenario.snippet}`,
    ...selectedAdvice.map(({ advice }) => `Also consider: ${advice}`),
    ...scenario.checks.map((check) => `Before shipping: ${check}`),
    ...legalChecks.map(({ label, detail, href }) => `Check applicability: ${label}: ${detail} ${href}`),
  ].join('\n')

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief)
      setCopyStatus('Brief copied to clipboard.')
    } catch {
      setCopyStatus('Copy was unavailable. You can select and copy the brief above.')
    }
  }

  return (
    <section className="decision-lab" id="decision-guide" aria-labelledby="decision-lab-title">
      <div className="decision-lab__header">
        <div>
          <p className="demo-kicker">Start with the task</p>
          <h2 id="decision-lab-title">Find a pattern for your situation</h2>
          <p>Choose the task. Get the next move now, then open the full brief when you need wording, implementation, and release checks.</p>
        </div>
        <span className="decision-lab__time">No account needed</span>
      </div>

      {savedGuide && !rememberInTab && (
        <div className="decision-resume" role="region" aria-label="Saved guide available">
          <div><strong>Pick up where you left off</strong><p>Saved in this browser tab: {scenarios[savedGuide.scenarioId].label}. Resume or remove it before continuing.</p></div>
          <div className="decision-resume__actions"><button type="button" className="demo-button demo-button--primary" onClick={resumeSavedGuide}>Resume brief</button><button type="button" className="demo-button demo-button--secondary" onClick={clearSavedGuide}>Remove saved brief</button></div>
        </div>
      )}

      {(!savedGuide || rememberInTab) && <><div className="decision-lab__controls" aria-label="Guide detail level">
        <div className="decision-lab__modes" role="group" aria-label="Choose guide length">
          <button type="button" className={mode === 'quick' ? 'is-active' : ''} aria-pressed={mode === 'quick'} onClick={() => setMode('quick')}>Quick answer</button>
          <button type="button" className={mode === 'full' ? 'is-active' : ''} aria-pressed={mode === 'full'} onClick={() => setMode('full')}>Full brief</button>
        </div>
        <span>{mode === 'quick' ? 'One task. One next move.' : 'Context, wording, code, and checks.'}</span>
      </div>

      <div className="decision-lab__workspace">
        <form className="decision-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="guide-scenario">What is the task?</label>
          <select id="guide-scenario" value={scenarioId} onChange={(event) => { setScenarioId(event.target.value as ScenarioId); setCopyStatus('') }}>
            {Object.entries(scenarios).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}
          </select>

          {mode === 'full' && <fieldset>
            <legend>What else is true?</legend>
            <p className="decision-form__hint">Select only the conditions that apply. These change the brief.</p>
            {contextOptions.map(({ key, label }) => (
              <label className="decision-form__choice" key={key}>
                <input type="checkbox" checked={context[key]} onChange={(event) => updateContext(key, event.target.checked)} />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>}

          {mode === 'full' && <><label htmlFor="guide-jurisdiction">Where will the service be used?</label>
          <select id="guide-jurisdiction" value={jurisdiction} onChange={(event) => { setJurisdiction(event.target.value as Jurisdiction); setCopyStatus('') }}>
            <option value="eu">EU / Ireland</option>
            <option value="us">United States</option>
            <option value="global">EU and United States</option>
          </select></>}
          {mode === 'quick' && <p className="decision-form__shortcut">Need to account for data, shared devices, AI, or local rules? <button type="button" onClick={() => setMode('full')}>Refine in the full brief</button>.</p>}
        </form>

        <div className="decision-output">
          <div className="decision-output__lead">
            <span className="demo-kicker">Your design brief</span>
            <h3>{scenario.pattern}</h3>
            <p>{scenario.reason}</p>
            <a href={`#${scenario.patternId}`}>Try the {scenario.pattern} example <span aria-hidden="true">↗</span></a>
          </div>

          {mode === 'quick' ? (
            <div className="decision-quick">
              <div><span>Next move</span><p>{scenario.sample}</p></div>
              <div><span>Check this first</span><p>{context.sharedDevice ? 'Avoid storing sensitive progress on a shared device. Explain what the browser may retain.' : selectedAdvice[0]?.advice ?? scenario.checks[0]}</p></div>
              <button type="button" className="demo-button demo-button--secondary" onClick={() => setMode('full')}>Open full brief</button>
            </div>
          ) : <>

          <div className="decision-output__section">
            <h4>Wording to adapt</h4>
            <blockquote>“{scenario.sample}”</blockquote>
          </div>

          <div className="decision-output__section">
            <h4>Implementation sketch</h4>
            <pre><code>{scenario.snippet}</code></pre>
            <p className="decision-output__hint">Connect these handlers to working service behavior before use.</p>
          </div>

          {selectedAdvice.length > 0 && (
            <div className="decision-output__section">
              <h4>Because of your context</h4>
              <ul>{selectedAdvice.map(({ key, advice }) => <li key={key}>{advice}</li>)}</ul>
            </div>
          )}

          <div className="decision-output__section">
            <h4>Check before shipping</h4>
            <ul>{scenario.checks.map((check) => <li key={check}>{check}</li>)}</ul>
          </div>

          <details className="decision-output__sources">
            <summary>Accessibility and legal checks ({legalChecks.length})</summary>
            <ul>{legalChecks.map(({ label, detail, href }) => (
              <li key={label}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a>: {detail}</li>
            ))}</ul>
            <p>These are prompts to check applicability, not a legal determination.</p>
          </details>
          </>}

          <div className="decision-output__footer">
            {mode === 'full' && <button type="button" className="demo-button demo-button--secondary" onClick={copyBrief}>Copy design brief</button>}
            {!rememberInTab && !context.sharedDevice && <button type="button" className="demo-button demo-button--secondary" onClick={saveForThisTab}>Save for this tab</button>}
            {savedGuide && <button type="button" className="decision-output__clear" onClick={clearSavedGuide}>Remove saved brief</button>}
            <span role="status" aria-live="polite">{copyStatus}</span>
          </div>
          <p className="decision-output__save-status" role="status" aria-live="polite">{saveStatus}</p>
          <p className="decision-output__save-note">Saving is optional and uses this browser tab only. Browser session restore may keep it; remove it here when finished. Saving is unavailable when a shared device is selected.</p>
          <p className="decision-output__caveat">This is a design starting point, not a clinical assessment. Validate it with the people who will use the service.</p>
        </div>
      </div></>}
    </section>
  )
}
