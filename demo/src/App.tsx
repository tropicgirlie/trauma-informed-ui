import React, { useState } from 'react'
import {
  TraumaInformedProvider,
  RegretButton,
  SafeExit,
  ConsentStepper,
  DisclosureCard,
  CalmingMessage,
  PauseAware,
  Button,
  TriggerWarning,
  EmotionCheckIn,
  BreathingGuide,
  SafeInput,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  TextArea,
  Select,
  Badge,
  Chip,
  Alert,
  ToastProvider,
  useToast,
  Modal,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Skeleton,
  SkeletonText,
  ProgressBar,
  Card,
} from 'trauma-informed-ui'

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '56px' }}>
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#2F3134', margin: '0 0 6px' }}>{title}</h2>
      <p style={{ fontSize: '14px', color: '#62666D', margin: 0, lineHeight: 1.6 }}>{description}</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {children}
    </div>
  </section>
)

const consentSteps = [
  {
    question: 'Can we store your responses securely?',
    hint: 'Your data stays on our servers and is never sold or shared with third parties.',
    options: [
      { label: 'Yes, that\'s fine', value: 'yes' },
      { label: 'No, session only please', value: 'no' },
    ],
  },
  {
    question: 'Would you like to receive follow-up support resources?',
    hint: 'We\'ll only send information directly relevant to what you share today.',
    options: [
      { label: 'Yes, please send resources', value: 'yes' },
      { label: 'No thank you', value: 'no', caution: false },
    ],
  },
  {
    question: 'Can a care coordinator reach out to check in?',
    hint: 'This is always optional. You can change this at any time.',
    options: [
      { label: 'Yes, that would be helpful', value: 'yes' },
      { label: 'Not right now', value: 'no' },
    ],
  },
]

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Section
      title="Modal"
      description="Focus-trapped dialog. Always escapable via Escape key and backdrop click. Never traps the user."
    >
      <Button variant="secondary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Before you continue"
        subtitle="This section discusses sensitive topics."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Not right now</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Continue</Button>
          </>
        }
      >
        <p style={{ margin: '0 0 14px' }}>
          The next section covers your mental health history. There's no right or wrong answer.
        </p>
        <Alert variant="info">
          You can stop or save your progress at any point. Take your time.
        </Alert>
      </Modal>
    </Section>
  )
}

function ToastDemo() {
  const { toast } = useToast()
  return (
    <Section
      title="Toast Notifications"
      description="Non-blocking feedback messages. Auto-dismiss with manual close. Never flash or alarm."
    >
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'info', message: 'Your progress has been saved.' })}>
          Info
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'success', title: 'Saved', message: 'Your response has been recorded securely.' })}>
          Success
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'warning', title: 'Take a moment', message: 'Sensitive content follows.', duration: 8000 })}>
          Warning
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'danger', title: 'Something went wrong', message: "We couldn't save. Your work is still here." })}>
          Danger
        </Button>
      </div>
    </Section>
  )
}

export default function App() {
  const [consentKey, setConsentKey] = useState(0)
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <ToastProvider>
    <TraumaInformedProvider regretWindowMs={7000} pauseThresholdMs={30000}>
      <div style={{
        minHeight: '100vh',
        background: '#F6F4F0',
        fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        {/* Safe Exit — fixed top right */}
        <SafeExit
          position="top-right"
          redirectTo="https://weather.com"
          label="Leave this page safely"
        />

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px 96px' }}>

          {/* Header */}
          <header style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#D1E5E8',
              color: '#2D6473',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '20px',
              marginBottom: '16px',
            }}>
              Component Preview
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#2F3134', margin: '0 0 12px', lineHeight: 1.3 }}>
              Trauma-Informed UI
            </h1>
            <p style={{ fontSize: '15px', color: '#62666D', lineHeight: 1.75, margin: 0, maxWidth: '520px' }}>
              A React design system rooted in care ethics, nervous system literacy, and design for dignity.
              All components follow the six SAMHSA principles of trauma-informed care.
            </p>
          </header>

          {/* RegretButton */}
          <Section
            title="RegretButton"
            description="Wraps any action in a generous undo window. Reduces shame when users second-guess a submission, deletion, or disclosure."
          >
            <CalmingMessage timeEstimate="~7 second undo window">
              Click the buttons below. Notice how Submit (sage) and Delete (clay/dark) are visually distinct — variant, colour, and icon all differ. Never the same style.
            </CalmingMessage>

            {lastAction && (
              <div style={{
                padding: '12px 16px',
                background: '#D1E5E8',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#2D6473',
                lineHeight: 1.5,
              }}>
                ✓ {lastAction}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <RegretButton
                variant="primary"
                label="Submit response"
                onAction={() => setLastAction('Response submitted')}
                onUndo={() => setLastAction(null)}
                toastMessage="Response queued…"
              />
              <RegretButton
                variant="destructive"
                label="Delete note"
                onAction={() => setLastAction('Note deleted')}
                onUndo={() => setLastAction(null)}
                toastMessage="Note will be deleted…"
                windowMs={5000}
              />
            </div>
          </Section>

          {/* DisclosureCard */}
          <Section
            title="DisclosureCard"
            description="Progressively reveals sensitive content. Users choose how deep to go — surprise is a threat signal."
          >
            <DisclosureCard
              label="Medication side effects"
              badge="may be distressing"
              warningText="This section includes clinical descriptions that some people find upsetting. Take a moment if you need one before reading on."
            >
              <p style={{ margin: '0 0 10px' }}>
                Some people experience nausea, dizziness, or changes in sleep during the first few weeks.
                These effects are usually temporary.
              </p>
              <p style={{ margin: 0 }}>
                If you experience severe symptoms, contact your care team right away.
              </p>
            </DisclosureCard>

            <DisclosureCard
              label="Your previous trauma history"
              badge="sensitive content"
              warningText="The following is a summary of what you shared with us during your intake. It's okay to read this in parts."
            >
              <p style={{ margin: 0 }}>
                You noted experiences of childhood adversity and indicated these have had lasting effects on
                your daily life. Your care team has reviewed this and it will inform your support plan.
              </p>
            </DisclosureCard>
          </Section>

          {/* CalmingMessage */}
          <Section
            title="CalmingMessage"
            description="Orients users before hard content. Neither minimising nor clinically cold. Time estimates reduce uncertainty."
          >
            <CalmingMessage timeEstimate="Takes about 2 minutes">
              This next section asks about your pregnancy history. There's no right or wrong answer — just take it at your own pace.
            </CalmingMessage>

            <CalmingMessage variant="dust" timeEstimate="Takes about 5 minutes">
              We're going to ask a few questions about your housing situation. You can skip anything you're not ready to answer.
            </CalmingMessage>
          </Section>

          {/* ConsentStepper */}
          <Section
            title="ConsentStepper"
            description="Presents granular consent decisions one at a time. Never bundles choices. Every step is reversible."
          >
            <ConsentStepper
              key={consentKey}
              steps={consentSteps}
              onComplete={(results) => {
                console.log('Consent results:', results)
              }}
            />
            <button
              onClick={() => setConsentKey((k) => k + 1)}
              style={{
                alignSelf: 'flex-start',
                fontSize: '12px',
                color: '#999',
                background: 'none',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '5px 12px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ↺ Reset stepper
            </button>
          </Section>

          {/* PauseAware */}
          <Section
            title="PauseAware"
            description="Detects inactivity during sensitive flows and gently offers pacing options — without judgement."
          >
            <CalmingMessage>
              PauseAware is active on this page with a 30-second threshold. Stay still and it will appear automatically.
              Or render it directly below in demo mode.
            </CalmingMessage>

            <PauseAware
              thresholdMs={0}
              message="No rush at all. Would you like to take a break, save your progress, or keep going?"
              actions={[
                { label: 'Keep going', onClick: () => {}, variant: 'primary' },
                { label: 'Save and pause', onClick: () => {} },
                { label: 'Exit safely', onClick: () => {} },
              ]}
            />
          </Section>

          {/* SafeExit inline */}
          <Section
            title="SafeExit"
            description="A persistent, one-click exit to a neutral destination. Optionally clears browser history. The fixed button is active in the top-right corner of this page."
          >
            <CalmingMessage>
              The pink "Leave this page safely" button is fixed to the top-right corner. It redirects to
              weather.com and supports double-press Escape as a keyboard shortcut.
            </CalmingMessage>

            <SafeExit
              position="inline"
              redirectTo="https://weather.com"
              label="Leave this page safely"
              showShortcutHint={false}
            />
          </Section>

          {/* TriggerWarning */}
          <Section
            title="TriggerWarning"
            description="A layered content warning with topic chips and explicit continue/skip choices. Never hides content unexpectedly."
          >
            <TriggerWarning
              heading="Content warning"
              message="This section contains descriptions of medical procedures and may include references to physical pain."
              topics={['Medical procedures', 'Physical pain', 'Clinical language']}
              onContinue={() => {}}
              onSkip={() => {}}
            >
              <p style={{ fontSize: '15px', color: '#62666D', lineHeight: 1.75, margin: 0 }}>
                This is the protected content that will be shown after the user chooses to continue.
              </p>
            </TriggerWarning>
          </Section>

          {/* EmotionCheckIn */}
          <Section
            title="EmotionCheckIn"
            description="A non-clinical mood check-in before sensitive sections. Names the emotion — no numbers, no clinical labels."
          >
            <EmotionCheckIn
              question="How are you feeling right now?"
              onSubmit={(v) => console.log('Checked in:', v)}
            />
          </Section>

          {/* BreathingGuide */}
          <Section
            title="BreathingGuide"
            description="Paced breathing exercise for in-session regulation. Activates the parasympathetic nervous system via vagal tone."
          >
            <BreathingGuide pattern="4-7-8" cycles={3} />
          </Section>

          {/* ─── FORM CONTROLS ─── */}
          <Section
            title="Form Controls"
            description="Accessible selection controls — Checkbox, Radio, Switch, TextArea, Select. Every control has a label, hint, and error state. 44px minimum touch target throughout."
          >
            <Tabs defaultTab="checkbox">
              <TabList>
                <Tab id="checkbox">Checkbox</Tab>
                <Tab id="radio">Radio</Tab>
                <Tab id="switch">Switch</Tab>
                <Tab id="textarea">TextArea</Tab>
                <Tab id="select">Select</Tab>
              </TabList>
              <TabPanel id="checkbox">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '420px' }}>
                  <Checkbox label="I understand this section may be difficult to read" hint="You can close this at any time." />
                  <Checkbox label="Save my responses for my next visit" defaultChecked />
                  <Checkbox label="Receive follow-up support resources" indeterminate />
                  <Checkbox label="Disabled option" disabled />
                  <Checkbox label="This field is required" error="Please confirm before continuing." />
                </div>
              </TabPanel>
              <TabPanel id="radio">
                <RadioGroup legend="How would you like to continue?" hint="There is no wrong answer.">
                  <Radio value="now" label="Continue now" hint="Go straight to the next section." />
                  <Radio value="later" label="Save and come back later" hint="Your progress will be kept for 30 days." />
                  <Radio value="exit" label="Exit safely" hint="You can return any time." />
                </RadioGroup>
              </TabPanel>
              <TabPanel id="switch">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '440px' }}>
                  <Switch label="Receive follow-up messages" hint="We will only contact you about what you share today." />
                  <Switch label="Save session progress" defaultChecked />
                  <Switch label="Allow care coordinator access" onLabel="Allowed" offLabel="Not allowed" />
                  <Switch label="Disabled setting" disabled />
                </div>
              </TabPanel>
              <TabPanel id="textarea">
                <TextArea
                  label="What would you like us to know?"
                  hint="Share only what feels right. You can skip this."
                  placeholder="Type here…"
                  maxLength={500}
                  rows={5}
                  optional
                />
              </TabPanel>
              <TabPanel id="select">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
                  <Select
                    label="Preferred contact method"
                    options={[
                      { value: 'email', label: 'Email' },
                      { value: 'phone', label: 'Phone' },
                      { value: 'post', label: 'Post (letter)' },
                    ]}
                    placeholder="Choose one — or skip this field"
                    hint="We only use this for essential communications."
                    optional
                  />
                  <SafeInput
                    label="Your preferred name"
                    hint="This is how your care team will address you."
                    placeholder="e.g. Alex"
                    optional
                  />
                </div>
              </TabPanel>
            </Tabs>
          </Section>

          {/* ─── BADGES, CHIPS, ALERTS ─── */}
          <Section
            title="Badges, Chips & Alerts"
            description="Status indicators and feedback messages. Colour alone is never the sole differentiator."
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <Badge variant="default">Default</Badge>
              <Badge variant="primary" dot>In progress</Badge>
              <Badge variant="success">Saved</Badge>
              <Badge variant="warning">Needs review</Badge>
              <Badge variant="danger">Action needed</Badge>
              <Badge variant="accent">New</Badge>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <Chip>Mental health</Chip>
              <Chip selected onClick={() => {}}>Housing (active)</Chip>
              <Chip onRemove={() => {}}>Anxiety</Chip>
              <Chip selected onRemove={() => {}}>Today</Chip>
            </div>

            <Alert variant="info" title="Before you begin">
              This section covers your support preferences. You can update them at any time.
            </Alert>
            <Alert variant="success" title="Progress saved" onDismiss={() => {}}>
              Your responses have been saved securely.
            </Alert>
            <Alert variant="warning" title="Take a moment">
              The next section contains descriptions of medical procedures that some people find distressing.
            </Alert>
            <Alert variant="danger" title="Something went wrong" onDismiss={() => {}}>
              We couldn't save your last response. Please try again — your work is still here.
            </Alert>
          </Section>

          {/* ─── MODAL ─── */}
          <ModalDemo />

          {/* ─── TOAST ─── */}
          <ToastDemo />

          {/* ─── CARD ─── */}
          <Section
            title="Card"
            description="Surface container with header, body, footer slots. Supports default, outlined, elevated, and filled variants."
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Card header="Support resources" footer={<Button variant="secondary" size="sm">Browse all</Button>}>
                <p style={{ fontSize: '14px', color: '#62666D', margin: 0, lineHeight: 1.7 }}>
                  Peer support, helplines, and local services are available whenever you're ready.
                </p>
              </Card>
              <Card variant="elevated" header="Your progress">
                <ProgressBar value={60} label="Section 3 of 5" showValue />
                <p style={{ fontSize: '13px', color: '#8B8F96', margin: '12px 0 0', lineHeight: 1.6 }}>
                  You're doing well. Take your time.
                </p>
              </Card>
              <Card variant="outlined">
                <SkeletonText lines={3} />
              </Card>
              <Card variant="filled" onClick={() => {}} header="Crisis line">
                <p style={{ fontSize: '14px', color: '#62666D', margin: 0 }}>Available 24/7 · Free · Confidential</p>
              </Card>
            </div>
          </Section>

          {/* ─── LOADERS ─── */}
          <Section
            title="Loaders"
            description="Skeleton content placeholders and a progress bar. Gentle shimmer instead of aggressive spinners."
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '420px' }}>
              <ProgressBar value={35} label="Uploading your file…" showValue variant="primary" />
              <ProgressBar value={100} variant="success" label="Upload complete" showValue />
              <ProgressBar value={72} variant="warning" label="Storage nearly full" showValue />
              <div style={{ padding: '20px', background: '#ECE7DF', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Skeleton circle width="40px" height="40px" />
                  <div style={{ flex: 1 }}><Skeleton height="14px" width="55%" /></div>
                </div>
                <SkeletonText lines={3} />
                <Skeleton height="36px" borderRadius="12px" width="40%" />
              </div>
            </div>
          </Section>

          {/* Footer */}
          <footer style={{
            borderTop: '1px solid #D7D2C8',
            paddingTop: '32px',
            fontSize: '12px',
            color: '#8B8F96',
            lineHeight: 1.7,
          }}>
            <p style={{ margin: 0 }}>
              Built with care · trauma-informed-ui ·{' '}
              <a href="https://github.com" style={{ color: '#3C7F8C' }}>GitHub</a>
            </p>
          </footer>

        </div>
      </div>
    </TraumaInformedProvider>
    </ToastProvider>
  )
}
