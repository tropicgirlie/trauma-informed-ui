import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/newsreader/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import {
  CalmingMessage,
  ConsentStepper,
  ContentWarning,
  DisclosureCard,
  PauseAware,
  RegretButton,
  SafeExit,
  TraumaInformedProvider,
} from '../../src'
import type { ConsentStepResult } from '../../src'
import '../../src/tokens/tokens.css'
import './styles.css'
import { DecisionGuide } from './DecisionGuide'

function DemoApp() {
  const [warningSkipped, setWarningSkipped] = useState(false)
  const [consentResults, setConsentResults] = useState<ConsentStepResult[] | null>(null)
  const [consentKey, setConsentKey] = useState(0)
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [pauseDemoActive, setPauseDemoActive] = useState(false)
  const [pauseResult, setPauseResult] = useState('')

  return (
    <TraumaInformedProvider motionSafe={false} calmPalette={false}>
      <div className="system-shell">
        <header className="system-nav" aria-label="Site navigation">
          <a className="system-nav__brand" href="#overview"><span className="system-nav__mark">TI/UI</span><span className="system-nav__edition">The field guide<br />Issue 01 / 2026</span></a>
          <nav className="system-nav__links" aria-label="Main sections">
          <a className="system-nav__desktop-link" href="#decision-guide">Decision guide</a>
          <a className="system-nav__desktop-link" href="#care-under-load">Care under load</a>
          <a className="system-nav__desktop-link" href="#field-notes">Field notes</a>
          <a className="system-nav__desktop-link" href="#components">Try patterns</a>
          <a className="system-nav__desktop-link" href="#foundations">Principles</a>
          <a className="system-nav__desktop-link" href="#governance">Evidence and scope</a>
          </nav>
          <details className="system-nav__mobile">
            <summary>Sections</summary>
            <div onClick={(event) => { if ((event.target as HTMLElement).closest('a')) event.currentTarget.parentElement?.removeAttribute('open') }}>
              <a href="#decision-guide">Decision guide</a>
              <a href="#care-under-load">Care under load</a>
              <a href="#field-notes">Field notes</a>
              <a href="#components">Try patterns</a>
              <a href="#foundations">Principles</a>
              <a href="#governance">Evidence and scope</a>
            </div>
          </details>
        </header>

        <main className="system-content">
          <section className="system-hero" id="overview">
            <div>
              <p className="demo-kicker">Care-Conscious Design / A working atlas <span>— No. 01</span></p>
              <h1>A field guide to choice, consent &amp; repair.</h1>
              <p>
                For the moments when an interface asks someone to disclose,
                decide, continue, or leave. Find a pattern for the task, test its
                behavior, and examine its limits.
              </p>
              <div className="system-hero__actions">
                <a className="demo-button demo-button--primary" href="#decision-guide">Find a pattern</a>
                <a className="demo-button demo-button--secondary" href="#components">Try examples</a>
              </div>
            </div>
            <div className="system-hero__path" aria-label="How to use this site">
              <span className="system-hero__label">How to use this guide / 4 stops</span>
              <ol>
                <li>Describe the design task</li>
                <li>Get a pattern brief</li>
                <li>Try a working example</li>
                <li>Check before shipping</li>
              </ol>
            </div>
          </section>

          <DecisionGuide />

          <aside className="care-bridge" id="care-under-load" aria-labelledby="care-bridge-title">
            <div><p className="demo-kicker">From the practice / 01</p><span className="care-bridge__marker">↳</span></div>
            <div>
              <h2 id="care-bridge-title">Care under load</h2>
              <p>Capacity changes. A useful service gives the answer early, keeps the next step visible, and makes it possible to return after an interruption. This guide’s quick answer and optional saved brief put that idea into practice.</p>
              <div className="care-bridge__links"><a href="https://www.luana.systems/writing/care-under-load" target="_blank" rel="noopener noreferrer">Read Luana Micheau’s article <span aria-hidden="true">↗</span></a><a href="https://www.luana.systems/glossary/care-conscious-design" target="_blank" rel="noopener noreferrer">Explore Care-Conscious Design <span aria-hidden="true">↗</span></a></div>
            </div>
          </aside>

          <section className="system-section field-notes" id="field-notes">
            <div className="section-heading">
              <p className="demo-kicker">Field notes / Elsewhere and before</p>
              <h2>Design has a history. Use it carefully.</h2>
              <p>These are prompts for better questions, not proof that a past solution fits your service. Follow the source, context, and people behind each example.</p>
            </div>
            <div className="field-notes__list">
              <article className="field-note">
                <div className="field-note__index">01 <span>Wayfinding</span></div>
                <div><p className="field-note__meta">Okayama, Japan / 1967</p><h3>Information underfoot</h3><p>Seiichi Miyake’s tactile paving was first laid at a crosswalk in Okayama. It made route information perceptible beyond sight.</p><p className="field-note__question">Ask of your interface: what vital instruction is available only visually?</p></div>
                <a href="https://www.japan.go.jp/kizuna/2021/08/spirit_rooted_in_tokyo_1964_paralympics.html" target="_blank" rel="noopener noreferrer">Read source <span aria-hidden="true">↗</span></a>
              </article>
              <article className="field-note">
                <div className="field-note__index">02 <span>Provenance</span></div>
                <div><p className="field-note__meta">Benin City / Global collections</p><h3>Context travels with the object</h3><p>Digital Benin connects dispersed objects with Edo designations, provenance, and oral histories. It also makes harmful colonial catalogue language visible as a subject of care.</p><p className="field-note__question">Ask of your interface: what context and source travels with sensitive content?</p></div>
                <a href="https://digitalbenin.org/" target="_blank" rel="noopener noreferrer">Read source <span aria-hidden="true">↗</span></a>
              </article>
              <article className="field-note">
                <div className="field-note__index">03 <span>Exit</span></div>
                <div><p className="field-note__meta">United Kingdom / Public services</p><h3>An exit is a whole journey</h3><p>GOV.UK’s quick exit guidance addresses the destination, loading delay, and what a browser may retain. The control belongs where a visitor may face risk.</p><p className="field-note__question">Ask of your interface: what happens in the seconds after someone chooses to leave?</p></div>
                <a href="https://design-system.service.gov.uk/components/exit-this-page/" target="_blank" rel="noopener noreferrer">Read source <span aria-hidden="true">↗</span></a>
              </article>
            </div>
          </section>

          <section className="system-section" id="foundations">
            <div className="section-heading">
              <p className="demo-kicker">Foundations</p>
              <h2>What good decisions protect</h2>
              <p>
                Start with what someone needs to understand and control. Treat every
                component as a hypothesis to test in its real context.
              </p>
            </div>
            <div className="foundation-grid">
              <article>
                <span>01</span>
                <h3>Human outcome</h3>
                <p>Define what the user should understand, feel able to do, refuse, pause, or repair.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Interaction pattern</h3>
                <p>Match the pattern to the task and its consequences, without guessing a person's emotional state.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Evidence and law</h3>
                <p>Show the evidence and check which accessibility and legal duties apply.</p>
              </article>
            </div>
          </section>

          <section className="system-section" id="components">
            <div className="section-heading">
              <p className="demo-kicker">Components</p>
              <h2>Try the patterns</h2>
              <p>
                These examples respond to your choices. They do not collect or send personal information.
              </p>
            </div>

            <div className="component-doc-grid" aria-label="Component documentation previews">
              <article className="component-doc" id="calming-message">
                <header>
                  <span>Regulation</span>
                  <h3>Calming Message</h3>
                </header>
                <CalmingMessage timeEstimate="Example time estimate: 2 minutes">
                  This section asks for personal context. There is no right or wrong
                  answer here. Take it at your pace.
                </CalmingMessage>
                <dl>
                  <dt>Outcome</dt>
                  <dd>Reduce uncertainty before difficult content.</dd>
                  <dt>Use when</dt>
                  <dd>A user needs preparation, time expectation, or reassurance without minimising risk.</dd>
                </dl>
              </article>

              <article className="component-doc" id="content-warning">
                <header>
                  <span>Safety</span>
                  <h3>Content Warning</h3>
                </header>
                {warningSkipped ? (
                  <div className="demo-result" role="status">
                    <p>Section skipped. The clinical example remains hidden.</p>
                    <button className="demo-button demo-button--secondary" onClick={() => setWarningSkipped(false)}>Return to warning</button>
                  </div>
                ) : (
                  <ContentWarning
                    category="medical"
                    detail="This section includes clinical language about symptoms."
                    skipLabel="Skip for now"
                    onSkip={() => setWarningSkipped(true)}
                  >
                    <p className="demo-revealed">Example text: nausea and tiredness are possible side effects. This text was hidden until you chose to see it.</p>
                  </ContentWarning>
                )}
                <dl>
                  <dt>Outcome</dt>
                  <dd>Prevent surprise exposure to sensitive material.</dd>
                  <dt>Do not</dt>
                  <dd>Use vague warnings or compliance-coded labels as a consent substitute.</dd>
                </dl>
              </article>

              <article className="component-doc" id="disclosure-card">
                <header>
                  <span>Progressive disclosure</span>
                  <h3>Disclosure Card</h3>
                </header>
                <DisclosureCard
                  label="Medication side effects"
                  badge="clinical language"
                  warningText="This includes clinical descriptions. You can read the preparation note first, then choose whether to continue."
                >
                  <p>
                    Some people experience nausea, tiredness, or changes in appetite.
                    Contact a clinician if symptoms feel severe or unexpected.
                  </p>
                </DisclosureCard>
                <dl>
                  <dt>Outcome</dt>
                  <dd>Let users preview the nature of the content before opening it.</dd>
                  <dt>Behavior</dt>
                  <dd>Warning first, explicit reveal second.</dd>
                </dl>
              </article>

              <article className="component-doc component-doc--wide" id="consent-stepper">
                <header>
                  <span>Consent</span>
                  <h3>Consent Stepper</h3>
                </header>
                <ConsentStepper
                  key={consentKey}
                  steps={[
                    {
                      question: 'May this demo use your choices to tailor its example below?',
                      hint: 'This affects only this page while it stays open. Nothing is sent or stored.',
                      options: [
                        { label: 'Yes, tailor the example', value: 'yes' },
                        { label: 'No, show the standard example', value: 'no' },
                      ],
                    },
                    {
                      question: 'Can we include sensitive examples in previews?',
                      hint: 'The standard example remains available either way.',
                      options: [
                        { label: 'Show sensitive examples', value: 'show' },
                        { label: 'Keep examples neutral', value: 'neutral' },
                      ],
                    },
                  ]}
                  completionHeading="Demo choices applied"
                  completionBody="Your choices affect only this page. You can change them below; nothing was stored or sent."
                  onComplete={setConsentResults}
                />
                {consentResults && (
                  <div className="demo-result" role="status">
                    <strong>Resulting preview</strong>
                    <p>{consentResults[0]?.selectedValue === 'yes' && consentResults[1]?.selectedValue === 'show'
                      ? 'Tailored example: a clinical content warning would appear before sensitive material.'
                      : 'Standard example: a neutral preparation note appears before optional detail.'}</p>
                    <button className="demo-button demo-button--secondary" onClick={() => { setConsentResults(null); setConsentKey((key) => key + 1) }}>Change demo choices</button>
                  </div>
                )}
              </article>

              <article className="component-doc" id="regret-button">
                <header>
                  <span>Repair</span>
                  <h3>Regret Button</h3>
                </header>
                <RegretButton
                  label="Submit demo response"
                  toastMessage="Demo response will submit shortly"
                  onAction={() => setDemoSubmitted(true)}
                  onUndo={() => setDemoSubmitted(false)}
                  disabled={demoSubmitted}
                  windowMs={7000}
                />
                {demoSubmitted && <div className="demo-result" role="status"><p>Demo response submitted on this page. Nothing was sent to a server.</p><button className="demo-button demo-button--secondary" onClick={() => setDemoSubmitted(false)}>Reset submission demo</button></div>}
                <dl>
                  <dt>Outcome</dt>
                  <dd>Reduce shame and threat around irreversible actions.</dd>
                </dl>
              </article>

              <article className="component-doc" id="pause-aware">
                <header>
                  <span>Pacing</span>
                  <h3>Pause Aware</h3>
                </header>
                <p className="demo-note">Start the example, then leave this page idle for 5 seconds to see the optional check-in.</p>
                {!pauseDemoActive && <button className="demo-button demo-button--secondary" onClick={() => { setPauseResult(''); setPauseDemoActive(true) }}>Start pacing example</button>}
                {pauseDemoActive && <PauseAware
                  thresholdMs={5000}
                  actions={[
                    { label: 'Keep going', onClick: () => { setPauseResult('You chose to keep going.'); setPauseDemoActive(false) }, variant: 'primary' },
                    { label: 'Pause here', onClick: () => { setPauseResult('You chose to pause. Your place in this example is preserved.'); setPauseDemoActive(false) } },
                  ]}
                />}
                {pauseResult && <p className="demo-result" role="status">{pauseResult}</p>}
              </article>

              <article className="component-doc" id="safe-exit">
                <header>
                  <span>Safety in high-risk contexts</span>
                  <h3>Safe Exit</h3>
                </header>
                <p className="demo-note">This live example leaves the site for a neutral destination. It replaces this page's current history entry, but earlier history may remain.</p>
                <SafeExit position="inline" replaceCurrentEntry showShortcutHint={false} enableShortcut={false} />
                <dl>
                  <dt>Use when</dt>
                  <dd>Someone may need to leave sensitive content quickly. Plan session cleanup and a fast visual cover while the destination loads.</dd>
                  <dt>Do not</dt>
                  <dd>Describe this as clearing the full browser history.</dd>
                </dl>
              </article>
            </div>
          </section>

          <section className="system-section" id="governance">
            <div className="section-heading">
              <p className="demo-kicker">Governance</p>
              <h2>Evidence and scope</h2>
              <p>These trauma-aware patterns sit within Care-Conscious Design. They are informed starting points, not proven clinical interventions. Test them with the people and organisations who will use them.</p>
            </div>
            <div className="governance-grid">
              <article>
                <h3>What this site helps with</h3>
                <p>Choosing a pattern, trying its interaction, and checking what needs validation before release.</p>
              </article>
              <article>
                <h3>What still needs evidence</h3>
                <p>Whether a pattern improves understanding, control, or recovery for a particular population and task. The project research notes that controlled tests of these components are still missing.</p>
              </article>
            </div>
            <p className="demo-status">This design system is under active development. Review component behavior and claims before production use.</p>
          </section>
        </main>
      </div>
    </TraumaInformedProvider>
  )
}

createRoot(document.getElementById('root')!).render(<DemoApp />)
