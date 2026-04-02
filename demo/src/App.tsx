import React, { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Globe2,
  HeartHandshake,
  Layers3,
  MessageCircleHeart,
  MoonStar,
  PanelTop,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import {
  TraumaInformedProvider,
  ToastProvider,
  useToast,
  Button,
  Badge,
  Alert,
  Card,
  Chip,
  Checkbox,
  Switch,
  ProgressBar,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Modal,
  RegretButton,
} from 'trauma-informed-ui'

// ─── Tokens ──────────────────────────────────────────────────────────────────
const T = {
  bg: '#F6F4F0',
  surface: '#ECE7DF',
  surfaceDeep: '#DDD6CC',
  primary: '#3C7F8C',
  primarySoft: '#D1E5E8',
  primaryMid: '#6ABFCC',
  secondary: '#7C8F7A',
  accent: '#8C7BAF',
  danger: '#B06565',
  text: '#2F3134',
  textMuted: '#62666D',
  textSubtle: '#8B8F96',
  border: '#D7D2C8',
  white: '#FDFCFA',
}

const S = {
  sectionY: '88px',
  gutter: '32px',
  container: '1120px',
  narrow: '900px',
  radius: '24px',
}

const SECTION_LABEL_STYLE: CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: T.textMuted,
  marginBottom: '10px',
}

const SAMHSA_PATTERNS = [
  {
    principle: 'Safety',
    pattern: 'Visible exits, progressive disclosure, content warnings, and low-arousal visual design.',
    whyItMatters: 'Predictability lowers threat scanning and helps the body stay oriented.',
  },
  {
    principle: 'Trustworthiness & transparency',
    pattern: 'Explain what happens next, what is stored, and how a user can stop or return later.',
    whyItMatters: 'Clear expectations reduce uncertainty, which is a common trigger for defensive activation.',
  },
  {
    principle: 'Peer support',
    pattern: 'Use language that feels alongside the user, not above them, with human examples and repair-friendly flows.',
    whyItMatters: 'Co-regulating tone can reduce shame and increase willingness to continue.',
  },
  {
    principle: 'Collaboration & mutuality',
    pattern: 'Break decisions into steps, offer genuine choices, and avoid bundled consent.',
    whyItMatters: 'Agency supports nervous system stability better than coercive completion.',
  },
  {
    principle: 'Empowerment, voice & choice',
    pattern: 'Undo windows, editable answers, pause options, and explicit opt-outs.',
    whyItMatters: 'Repair pathways reduce threat, freeze, and shame responses after action.',
  },
  {
    principle: 'Cultural, historical & gender issues',
    pattern: 'Write for different lived realities, avoid dominant-culture defaults, and support diverse care contexts.',
    whyItMatters: 'Misrecognition increases vigilance; recognition supports safety and trust.',
  },
]

const LIBRARY_ROADMAP = [
  {
    name: 'ConsentStepper',
    status: 'In development',
    summary: 'A one-decision-at-a-time flow for consent, disclosure, and paced progression.',
    rationale: 'Reduces cognitive overload and protects agency during high-stakes decisions.',
  },
  {
    name: 'SafeExit',
    status: 'Available now',
    summary: 'A persistent, one-click exit for situations that become overwhelming or unsafe.',
    rationale: 'A visible escape route lowers sympathetic activation because the body is not trapped.',
  },
  {
    name: 'RegretButton',
    status: 'Available now',
    summary: 'An action pattern with an immediate undo window for submissions and irreversible steps.',
    rationale: 'Repair capacity reduces shame spirals and the threat response associated with mistakes.',
  },
  {
    name: 'BreathingGuide',
    status: 'In development',
    summary: 'An embedded regulation tool for moments of escalation, fatigue, or overload.',
    rationale: 'Paced breath cues can support down-regulation and help widen the window of tolerance.',
  },
]

const GLOBAL_ALIGNMENT = [
  {
    label: 'Canada · TVIC',
    title: 'Trauma- and violence-informed care treats systems as part of the harm context.',
    body: 'Canadian TVIC frameworks emphasize that trauma is not only personal history. Violence, poverty, racism, migration, and institutional conditions shape how people meet services and digital systems. The interface has to respond to that context instead of assuming a neutral user.',
  },
  {
    label: 'Ireland · HSE',
    title: 'Trauma-informed practice is becoming an operational expectation across health and social care.',
    body: 'The Irish HSE approach emphasizes safety, trust, collaboration, empowerment, and awareness of trauma impacts across service delivery. This library translates those expectations into product decisions so digital tools support care practice rather than quietly undermining it.',
  },
]

const PROVIDER_FOCUS_PILLARS = [
  {
    title: 'Reduce provider cognitive load',
    body: 'Interfaces for care workers should not demand constant vigilance. Calm defaults, clear hierarchy, and low-friction decision support protect attention in already stressed environments.',
  },
  {
    title: 'Design for secondary trauma exposure',
    body: 'Providers read distressing material all day. Progressive reveal, content previews, and pause affordances reduce repeated nervous system hits during documentation and triage.',
  },
  {
    title: 'Support continuity, not speed theatre',
    body: 'Autosave, repairable actions, and recoverable workflows help providers keep care consistent without adding fear of mistakes.',
  },
  {
    title: 'Protect dignity on both sides of the screen',
    body: 'Care-conscious systems should regulate the experience of the worker as well as the client. That is where service quality becomes sustainable.',
  },
]

const NAV_LINKS = [
  { href: '#principles', label: 'Principles' },
  { href: '#library', label: 'The Library' },
  { href: '#live-components', label: 'Live Components' },
  { href: '#global-alignment', label: 'Global Alignment' },
  { href: '#provider-focus', label: 'Care Worker Focus' },
  { href: '#install', label: 'Install' },
]

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: T.primarySoft,
      color: T.primary,
      marginBottom: '16px',
      flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ providerPage, activeHash }: { providerPage: boolean, activeHash: string }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(246,244,240,0.92)', backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${T.border}`,
      padding: `0 ${S.gutter}`, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', minHeight: '72px', gap: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '12px',
          background: T.primarySoft, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: T.primary,
        }}><ShieldCheck size={18} strokeWidth={2} /></div>
        <span style={{ fontWeight: 600, fontSize: '15px', color: T.text, letterSpacing: '-0.01em' }}>
          trauma-informed-ui
        </span>
        <Badge variant="primary">v0.1</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            aria-current={activeHash === href ? 'page' : undefined}
            style={{
              fontSize: '13px',
              color: activeHash === href ? T.primary : T.textMuted,
              textDecoration: 'none',
              padding: '7px 12px',
              borderRadius: '999px',
              background: activeHash === href ? T.primarySoft : 'transparent',
              fontWeight: activeHash === href ? 600 : 500,
            }}
          >
            {label}
          </a>
        ))}
        {providerPage && (
          <a href="#top" style={{ textDecoration: 'none' }}>
            <Button size="sm" variant="secondary">Back to landing</Button>
          </a>
        )}
        <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" target="_blank" rel="noreferrer">
          <Button size="sm" variant="secondary">Storybook</Button>
        </a>
        <a href="https://github.com/tropicgirlie/trauma-informed-ui" target="_blank" rel="noreferrer">
          <Button size="sm" variant="ghost">GitHub</Button>
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{
      maxWidth: S.container, margin: '0 auto', padding: `104px ${S.gutter} ${S.sectionY}`,
      textAlign: 'center',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: T.primarySoft, color: T.primary, borderRadius: '24px',
        padding: '5px 14px', fontSize: '12px', fontWeight: 500,
        letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '28px',
      }}>
        <Sparkles size={14} strokeWidth={2} /> React · MIT · Trauma-informed by design
      </div>
      <h1 style={{
        fontSize: 'clamp(36px, 6vw, 62px)', fontWeight: 700, color: T.text,
        lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 12px',
      }}>
        Trauma Informed design.
      </h1>
      <p style={{
        fontSize: 'clamp(22px, 3vw, 30px)',
        color: T.primary,
        fontWeight: 600,
        lineHeight: 1.3,
        margin: '0 0 18px',
      }}>
        From aspirational to functional.
      </p>
      <p style={{
        fontSize: 'clamp(16px, 2.5vw, 20px)', color: T.textMuted,
        lineHeight: 1.7, maxWidth: '640px', margin: '0 auto 40px',
      }}>
        First open-source React library for building care-conscious, safety-critical interfaces. Built to translate SAMHSA, trauma-informed practice, and care-worker reality into patterns teams can actually ship.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" target="_blank" rel="noreferrer">
          <Button variant="primary" size="lg">View Storybook</Button>
        </a>
        <a href="#install">
          <Button variant="secondary" size="lg">Install the library</Button>
        </a>
        <a href="#provider-focus">
          <Button variant="secondary" size="lg">Provider focus</Button>
        </a>
      </div>
      <a href="#principles" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '28px', color: T.textMuted, textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>
        <span>Scroll to explore</span>
        <span aria-hidden="true" style={{ fontSize: '20px', color: T.primary }}>↓</span>
      </a>
      <div style={{
        marginTop: '64px', display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
        background: T.border, borderRadius: '16px', overflow: 'hidden',
      }}>
        {[
          { n: '6', label: 'SAMHSA principles mapped to UI' },
          { n: '4', label: 'Flagship library patterns' },
          { n: '2', label: 'Public-sector frameworks aligned' },
        ].map(({ n, label }) => (
          <div key={label} style={{ background: T.white, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: T.primary, letterSpacing: '-0.02em' }}>{n}</div>
            <div style={{ fontSize: '13px', color: T.textSubtle, marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Principles ───────────────────────────────────────────────────────────────
function Principles() {
  return (
    <section id="principles" style={{ background: T.surface, padding: `${S.sectionY} ${S.gutter}` }}>
      <div style={{ maxWidth: S.container, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Principles mapped directly to interface patterns.
          </h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
            This is not trauma-informed branding. Each SAMHSA principle becomes a design rule, interaction pattern, and content decision that can be implemented in code.
          </p>
        </div>
        <div style={{ display: 'grid', gap: '16px' }}>
          {SAMHSA_PATTERNS.map(({ principle, pattern, whyItMatters }, index) => (
            <div
              key={principle}
              style={{
                background: T.white,
                borderRadius: S.radius,
                padding: '28px',
                border: `1px solid ${T.border}`,
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 220px) minmax(0, 1fr) minmax(0, 260px)',
                gap: '22px',
                alignItems: 'start',
              }}
            >
              <div style={{ paddingRight: '14px', borderRight: `1px solid ${T.border}` }}>
                <IconWrap><Compass size={18} strokeWidth={2} /></IconWrap>
                <div style={SECTION_LABEL_STYLE}>
                  SAMHSA principle
                </div>
                <div style={{ fontSize: '12px', color: T.primary, fontWeight: 700, marginBottom: '8px' }}>
                  0{index + 1}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: T.text, margin: 0 }}>{principle}</h3>
              </div>
              <div style={{ paddingRight: '14px', borderRight: `1px solid ${T.border}` }}>
                <div style={SECTION_LABEL_STYLE}>
                  UI pattern
                </div>
                <p style={{ fontSize: '14px', color: T.textMuted, margin: 0, lineHeight: 1.7 }}>{pattern}</p>
              </div>
              <div>
                <div style={SECTION_LABEL_STYLE}>
                  Neurobiological implication
                </div>
                <p style={{ fontSize: '14px', color: T.textMuted, margin: 0, lineHeight: 1.7 }}>{whyItMatters}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LibraryRoadmap() {
  return (
    <section id="library" style={{ padding: `${S.sectionY} ${S.gutter}`, background: T.bg }}>
      <div style={{ maxWidth: S.container, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            The library
          </h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
            A focused roadmap of care-conscious primitives. Each pattern is designed around nervous system realities, not just interface conventions.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
          {LIBRARY_ROADMAP.map(({ name, status, summary, rationale }) => (
            <Card
              key={name}
              header={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, width: '100%' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: T.primarySoft, color: T.primary, flexShrink: 0 }}>
                      <Layers3 size={16} strokeWidth={2} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'block', minWidth: 0, lineHeight: 1.35, fontWeight: 600, color: T.text, wordBreak: 'break-word' }}>
                        {name}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '28px',
                      padding: '0 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      lineHeight: 1,
                      flexShrink: 0,
                      background: status === 'Available now' ? '#E2EEE6' : T.primarySoft,
                      color: status === 'Available now' ? T.secondary : T.primary,
                    }}
                  >
                    {status}
                  </span>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '240px', height: '100%' }}>
                <p style={{ fontSize: '14px', color: T.textMuted, margin: '0 0 14px', lineHeight: 1.7 }}>{summary}</p>
                <div style={{ marginTop: 'auto', padding: '12px 14px', borderRadius: '12px', background: T.primarySoft, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '120px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.primary, marginBottom: '6px' }}>
                    Neurobiological rationale
                  </div>
                  <p style={{ fontSize: '13px', color: T.text, margin: 0, lineHeight: 1.7 }}>{rationale}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <Alert variant="info" title="Available today">
            SafeExit and RegretButton are already available in the library and in the install example below. ConsentStepper and BreathingGuide are the next roadmap additions.
          </Alert>
        </div>
      </div>
    </section>
  )
}

function LiveComponentsPreview() {
  const { toast } = useToast()
  const [consentChecked, setConsentChecked] = useState(false)
  const [followUp, setFollowUp] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [tags, setTags] = useState(['Mental health', 'Housing', 'Anxiety'])
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <section id="live-components" style={{ padding: `${S.sectionY} ${S.gutter}`, background: T.surfaceDeep }}>
      <div style={{ maxWidth: S.container, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <IconWrap><PanelTop size={18} strokeWidth={2} /></IconWrap>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Live components
          </h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '720px', margin: '0 auto 20px', lineHeight: 1.7 }}>
            These previews use the actual component library, not static marketing mockups. The interaction patterns are tuned for healthcare, support work, and other safety-critical contexts where pacing, clarity, and repair matter.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" target="_blank" rel="noreferrer">
              <Button variant="primary">Open Storybook</Button>
            </a>
            <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/?path=/story/alert--default" target="_blank" rel="noreferrer">
              <Button variant="secondary">Review component docs</Button>
            </a>
          </div>
        </div>

        <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: S.radius, padding: '28px' }}>
          <Tabs defaultTab="feedback">
            <TabList>
              <Tab id="feedback" icon={<MessageCircleHeart size={16} />}>Feedback</Tab>
              <Tab id="forms" icon={<SlidersHorizontal size={16} />}>Forms</Tab>
              <Tab id="progress" icon={<CheckCircle2 size={16} />}>Progress</Tab>
              <Tab id="repair" icon={<ArrowRight size={16} />}>Repair and exit</Tab>
            </TabList>

            <TabPanel id="feedback">
              <div style={{ paddingTop: '28px', display: 'grid', gap: '22px' }}>
                <div>
                  <div style={SECTION_LABEL_STYLE}>Status language</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary" dot>In progress</Badge>
                    <Badge variant="success">Saved</Badge>
                    <Badge variant="danger">Action needed</Badge>
                    <Badge variant="accent">New</Badge>
                  </div>
                </div>

                <div>
                  <div style={SECTION_LABEL_STYLE}>Topic chips</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {tags.map((tag) => (
                      <Chip key={tag} onRemove={() => setTags((prev) => prev.filter((item) => item !== tag))}>{tag}</Chip>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                  <Alert variant="info" title="Before you begin">
                    This section covers support preferences. The user can pause, skip, or return later.
                  </Alert>
                  <Alert variant="success" title="Progress saved" onDismiss={() => {}}>
                    Responses have been recorded without forcing the user to continue immediately.
                  </Alert>
                </div>

                <div>
                  <div style={SECTION_LABEL_STYLE}>Toast notifications</div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'info', message: 'Your progress has been saved.' })}>Info</Button>
                    <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'success', title: 'Saved', message: 'Recorded securely.' })}>Success</Button>
                    <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'danger', title: 'Error', message: 'Nothing was lost. You can retry when ready.' })}>Danger</Button>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel id="forms">
              <div style={{ paddingTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={SECTION_LABEL_STYLE}>Consent and choice</div>
                  <Checkbox
                    label="I understand this section may feel difficult"
                    hint="The user can leave this section at any time."
                    checked={consentChecked}
                    onChange={(checked) => setConsentChecked(checked)}
                  />
                  <Checkbox label="Save this preference for next visit" defaultChecked />
                  <Checkbox label="This step requires confirmation" error="Please confirm before continuing." />
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={SECTION_LABEL_STYLE}>Care coordination settings</div>
                  <Switch
                    label="Receive follow-up messages"
                    hint="Only about what the user shares today."
                    checked={followUp}
                    onChange={(checked) => setFollowUp(checked)}
                  />
                  <Switch label="Save session progress" defaultChecked />
                </div>
              </div>
            </TabPanel>

            <TabPanel id="progress">
              <div style={{ paddingTop: '28px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.9fr)', gap: '24px' }}>
                <Card header="Example care journey">
                  <div style={{ display: 'grid', gap: '14px' }}>
                    <ProgressBar value={32} label="Check-in completed" showValue />
                    <ProgressBar value={64} label="Support preferences saved" showValue />
                    <ProgressBar value={84} label="Referral notes reviewed" showValue />
                  </div>
                </Card>

                <Card header="Why this matters">
                  <p style={{ margin: 0, color: T.textMuted, lineHeight: 1.75, fontSize: '14px' }}>
                    In healthcare and social care interfaces, visible progress should orient, not pressure. Labels need to communicate where the user is without implying urgency or failure.
                  </p>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="repair">
              <div style={{ paddingTop: '28px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.9fr)', gap: '24px' }}>
                <Card header="Repairable action">
                  <div style={{ display: 'grid', gap: '14px' }}>
                    {lastAction && (
                      <div style={{ padding: '10px 14px', background: T.primarySoft, borderRadius: '12px', color: T.primary, fontSize: '13px', fontWeight: 600 }}>
                        {lastAction}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <RegretButton label="Submit response" onAction={() => setLastAction('Response submitted')} onUndo={() => setLastAction(null)} toastMessage="Response queued" />
                      <Button variant="secondary" onClick={() => setModalOpen(true)}>Open supportive modal</Button>
                    </div>
                  </div>
                </Card>

                <Card header="Storybook sync">
                  <p style={{ margin: '0 0 12px', color: T.textMuted, lineHeight: 1.75, fontSize: '14px' }}>
                    This section exists to mirror actual Storybook behaviour and give a product team a quick, realistic view of how the patterns feel in context.
                  </p>
                  <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <Button variant="ghost">Open full component library</Button>
                  </a>
                </Card>
              </div>

              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Before you continue"
                subtitle="This step may include sensitive information."
                footer={
                  <>
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>Not right now</Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>Continue</Button>
                  </>
                }
              >
                <p style={{ margin: '0 0 12px', color: T.textMuted, lineHeight: 1.7 }}>
                  The user can continue now, pause, or step away. Healthcare UX should never collapse choice into one path.
                </p>
                <Alert variant="info">Take your time. Nothing here is time-critical.</Alert>
              </Modal>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

function GlobalAlignment() {
  return (
    <section id="global-alignment" style={{ background: T.surface, padding: `${S.sectionY} ${S.gutter}` }}>
      <div style={{ maxWidth: S.container, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Global alignment
          </h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '760px', margin: '0 auto', lineHeight: 1.7 }}>
            Trauma-informed interaction design is not a niche preference. Canada and Ireland are both moving toward trauma-informed service standards. This library positions UI work inside that shared direction of travel.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {GLOBAL_ALIGNMENT.map(({ label, title, body }) => (
            <Card key={label} variant="elevated" header={label}>
              <IconWrap><Globe2 size={18} strokeWidth={2} /></IconWrap>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: T.text, margin: '0 0 10px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: T.textMuted, lineHeight: 1.7, margin: 0 }}>{body}</p>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <Alert variant="info" title="Why this matters for product teams">
            When policy and practice frameworks already name safety, trust, collaboration, and empowerment, design systems can stop treating trauma-informed work as optional polish and start treating it as infrastructure.
          </Alert>
        </div>
      </div>
    </section>
  )
}

function ProviderFocusPreview() {
  return (
    <section id="provider-focus" style={{ background: T.surfaceDeep, padding: `${S.sectionY} ${S.gutter}` }}>
      <div style={{ maxWidth: S.container, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)', gap: '24px', alignItems: 'stretch' }}>
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: S.radius, padding: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '999px', background: T.primarySoft, color: T.primary, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '18px' }}>
              <HeartHandshake size={14} strokeWidth={2} /> Provider lens
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
              Designing for the provider
            </h2>
            <p style={{ fontSize: '16px', color: T.textMuted, margin: '0 0 24px', lineHeight: 1.8 }}>
              Most trauma-informed digital products focus on the client. But care quality also depends on the nervous system state of the worker using the interface. This sub-page focuses on the provider as a safety-critical user.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#provider-focus-page">
                <Button variant="primary">Read the provider page →</Button>
              </a>
              <a href="#global-alignment">
                <Button variant="secondary">See policy alignment</Button>
              </a>
            </div>
          </div>
          <div style={{ background: T.surface, borderRadius: S.radius, padding: '24px', border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.textSubtle, marginBottom: '14px' }}>
              Provider design priorities
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {PROVIDER_FOCUS_PILLARS.slice(0, 3).map(({ title, body }) => (
                <div key={title} style={{ background: T.white, borderRadius: '18px', padding: '18px', border: `1px solid ${T.border}` }}>
                  <h3 style={{ fontSize: '15px', color: T.text, margin: '0 0 8px' }}>{title}</h3>
                  <p style={{ fontSize: '13px', color: T.textMuted, margin: 0, lineHeight: 1.65 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Token palette ────────────────────────────────────────────────────────────
const PALETTE = [
  { name: '--ti-bg', hex: '#F6F4F0', label: 'Background', usage: 'Page background', contrast: 'Use dark text only' },
  { name: '--ti-surface', hex: '#ECE7DF', label: 'Surface', usage: 'Cards and panels', contrast: 'Use dark text only' },
  { name: '--ti-primary', hex: '#3C7F8C', label: 'Primary', usage: 'Primary actions', contrast: 'AA with light text at large sizes' },
  { name: '--ti-primary-soft', hex: '#D1E5E8', label: 'Primary soft', usage: 'Supportive fills', contrast: 'Use dark text only' },
  { name: '--ti-secondary', hex: '#7C8F7A', label: 'Secondary', usage: 'Grounding accents', contrast: 'Check small text use' },
  { name: '--ti-accent', hex: '#8C7BAF', label: 'Accent', usage: 'Highlights only', contrast: 'Avoid for tiny text' },
  { name: '--ti-danger', hex: '#B06565', label: 'Danger', usage: 'Destructive actions', contrast: 'Check against parchment' },
  { name: '--ti-text', hex: '#2F3134', label: 'Text', usage: 'Primary copy', contrast: 'Primary accessible text' },
  { name: '--ti-border', hex: '#D7D2C8', label: 'Border', usage: 'Quiet dividers', contrast: 'Decorative only' },
]

const DARK_PALETTE = [
  { name: '--ti-bg-dark', hex: '#15191C', label: 'Dark background', usage: 'Low light surfaces' },
  { name: '--ti-surface-dark', hex: '#1F2529', label: 'Dark surface', usage: 'Cards and panels' },
  { name: '--ti-primary-dark', hex: '#6ABFCC', label: 'Dark primary', usage: 'Actions in dark mode' },
  { name: '--ti-text-dark', hex: '#E7ECEF', label: 'Dark text', usage: 'Readable body copy' },
]

function TokenPalette() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    setCopied(val)
    setTimeout(() => setCopied(null), 1500)
  }
  return (
    <section id="tokens" style={{ background: T.surface, padding: `${S.sectionY} ${S.gutter}` }}>
      <div style={{ maxWidth: S.narrow, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Design tokens</h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Muted teal, sage, and parchment. No pure black. No warm warning colours.
            Desaturated palettes reduce physiological arousal. Each token includes usage notes and contrast guidance.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', alignItems: 'stretch' }}>
          {PALETTE.map(({ name, hex, label, usage, contrast }) => (
            <button key={name} onClick={() => copy(hex)} style={{
              background: 'none', border: `1px solid ${T.border}`, borderRadius: '14px',
              padding: '0', cursor: 'pointer', overflow: 'hidden', textAlign: 'left',
              display: 'flex', flexDirection: 'column', height: '100%',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(60,127,140,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ height: '72px', width: '100%', background: hex, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }} />
              <div style={{ padding: '12px', background: T.white, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: T.text, marginBottom: '2px' }}>
                  {copied === hex ? '✓ Copied!' : label}
                </div>
                <div style={{ fontSize: '11px', color: T.textSubtle, fontFamily: 'monospace' }}>{hex}</div>
                <div style={{ fontSize: '11px', color: T.textMuted, marginTop: '8px', lineHeight: 1.55 }}>{usage}</div>
                <div style={{ fontSize: '11px', color: T.textMuted, marginTop: '4px', lineHeight: 1.55 }}>{contrast}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: '28px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <IconWrap><MoonStar size={18} strokeWidth={2} /></IconWrap>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: T.text, margin: '0 0 8px' }}>Dark mode tokens</h3>
            <p style={{ fontSize: '15px', color: T.textMuted, margin: 0, lineHeight: 1.7 }}>
              Low light environments matter in care settings too. These dark mode tokens support calmer use in evening, triage, and on-call contexts.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'stretch' }}>
            {DARK_PALETTE.map(({ name, hex, label, usage }) => (
              <div key={name} style={{ border: `1px solid ${T.border}`, borderRadius: '14px', overflow: 'hidden', background: T.white, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '72px', background: hex, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }} />
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: T.text }}>{label}</div>
                  <div style={{ fontSize: '11px', color: T.textSubtle, fontFamily: 'monospace', marginTop: '4px' }}>{hex}</div>
                  <div style={{ fontSize: '11px', color: T.textMuted, marginTop: '8px', lineHeight: 1.55 }}>{usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProviderFocusPage() {
  return (
    <section id="provider-focus-page" style={{ background: T.bg, padding: `48px ${S.gutter} ${S.sectionY}` }}>
      <div style={{ maxWidth: S.container, margin: '0 auto' }}>
        <a href="#top" style={{ color: T.primary, textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>← Back to landing</a>
        <div style={{ maxWidth: '780px', marginTop: '20px', marginBottom: '36px' }}>
          <Badge variant="primary">Sub-page</Badge>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: T.text, margin: '14px 0 18px' }}>
            Designing for the provider
          </h1>
          <p style={{ fontSize: '18px', color: T.textMuted, lineHeight: 1.8, margin: 0 }}>
            The provider interface is where trauma-informed practice often breaks down. If the system overwhelms the worker, safety degrades for everyone downstream. Designing for the provider means designing for regulated attention, repairable action, and humane documentation conditions.
          </p>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Alert variant="info" title="Core thesis">
            Care workers are not neutral operators of technology. They are embodied users under pressure, often navigating risk, grief, urgency, and fragmented systems. Their interface must reduce load, not add to it.
          </Alert>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {PROVIDER_FOCUS_PILLARS.map(({ title, body }) => (
            <Card key={title} header={title}>
              <p style={{ fontSize: '14px', color: T.textMuted, lineHeight: 1.7, margin: 0 }}>{body}</p>
            </Card>
          ))}
        </div>
        <div style={{ background: T.surface, borderRadius: S.radius, padding: '28px', border: `1px solid ${T.border}` }}>
          <h2 style={{ fontSize: '24px', color: T.text, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
            What this means in product terms
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              'Make difficult content previewable before full exposure.',
              'Support pause, save, and resumption without punishment.',
              'Prefer repairable actions over irreversible flows.',
              'Reduce visual alarm and notification noise in core workflows.',
              'Design documentation tools for continuity and emotional stamina, not just speed.',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '999px', background: T.primary, marginTop: '7px', flexShrink: 0 }} />
                <p style={{ margin: 0, color: T.textMuted, lineHeight: 1.7, fontSize: '15px' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Get started ──────────────────────────────────────────────────────────────
function GetStarted() {
  const [copiedInstall, setCopiedInstall] = useState(false)
  const installCmd = 'npm install trauma-informed-ui'
  const copy = () => { navigator.clipboard.writeText(installCmd); setCopiedInstall(true); setTimeout(() => setCopiedInstall(false), 1800) }
  return (
    <section id="install" style={{ padding: `${S.sectionY} ${S.gutter}`, background: T.bg }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Get started</h2>
          <p style={{ fontSize: '16px', color: T.textMuted, lineHeight: 1.7 }}>Two imports. Done. SafeExit and RegretButton are available now.</p>
        </div>
        <div style={{ background: '#1B1F23', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Terminal</span>
            <button onClick={copy} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '6px', color: 'rgba(255,255,255,0.6)', fontSize: '11px', padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>
              {copiedInstall ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div style={{ padding: '18px 20px', fontFamily: 'monospace', fontSize: '14px', color: '#9BE8A0' }}>
            $ npm install trauma-informed-ui
          </div>
        </div>
        <div style={{ background: '#1B1F23', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>App.tsx</span>
          </div>
          <pre style={{ padding: '20px', margin: 0, fontSize: '13px', lineHeight: 1.7, color: '#CDD9E5', overflow: 'auto' }}>{`import { TraumaInformedProvider, RegretButton, SafeExit } from 'trauma-informed-ui'
import 'trauma-informed-ui/tokens.css'

export default function App() {
  return (
    <TraumaInformedProvider calmPalette>
      <SafeExit redirectTo="https://weather.com" clearHistory />
      <RegretButton
        label="Submit response"
        onAction={() => handleSubmit()}
        windowMs={7000}
      />
    </TraumaInformedProvider>
  )
}`}</pre>
        </div>
        <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" target="_blank" rel="noreferrer">
            <Button variant="primary">Open Storybook →</Button>
          </a>
          <a href="https://github.com/tropicgirlie/trauma-informed-ui" target="_blank" rel="noreferrer">
            <Button variant="secondary">View source on GitHub</Button>
          </a>
        </div>
        <p style={{ marginTop: '18px', textAlign: 'center', color: T.textSubtle, fontSize: '13px', lineHeight: 1.7 }}>
          Early library version. Check Storybook and GitHub before production adoption.
        </p>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: `40px ${S.gutter}` }}>
      <div style={{ maxWidth: S.container, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: T.primarySoft, color: T.primary, flexShrink: 0 }}>
            <BookOpen size={18} strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: T.text, marginBottom: '4px' }}>trauma-informed-ui</div>
            <div style={{ fontSize: '12px', color: T.textSubtle, lineHeight: 1.7, maxWidth: '420px' }}>
              MIT · Built with care by{' '}
              <a href="https://momops.io" style={{ color: T.primary, textDecoration: 'none' }}>Luana Micheau</a>
              {' '}· part of{' '}
              <a href="https://momops.org" style={{ color: T.primary, textDecoration: 'none' }}>MomOps.org</a>
              {' '}and{' '}
              <a href="https://momops.io/ccd" style={{ color: T.primary, textDecoration: 'none' }}>Care-Conscious Design</a>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(120px, 1fr))', gap: '12px 20px', justifyItems: 'start' }}>
          <a href="https://www.npmjs.com/package/trauma-informed-ui" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }} target="_blank" rel="noreferrer"><ArrowUpRight size={14} strokeWidth={2} /> npm</a>
          <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }} target="_blank" rel="noreferrer"><ArrowUpRight size={14} strokeWidth={2} /> Storybook</a>
          <a href="https://github.com/tropicgirlie/trauma-informed-ui" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }} target="_blank" rel="noreferrer"><ArrowUpRight size={14} strokeWidth={2} /> GitHub</a>
          <a href="https://github.com/tropicgirlie/trauma-informed-ui/blob/main/CONTRIBUTING.md" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }} target="_blank" rel="noreferrer"><ArrowUpRight size={14} strokeWidth={2} /> Contributing</a>
        </div>
      </div>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function LandingPage({ activeHash }: { activeHash: string }) {
  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: T.text }}>
      <Nav providerPage={false} activeHash={activeHash} />
      <Hero />
      <Principles />
      <LibraryRoadmap />
      <LiveComponentsPreview />
      <GlobalAlignment />
      <ProviderFocusPreview />
      <TokenPalette />
      <GetStarted />
      <Footer />
    </div>
  )
}

function ProviderPage() {
  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: T.text }}>
      <Nav providerPage activeHash="#provider-focus" />
      <ProviderFocusPage />
      <Footer />
    </div>
  )
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)

    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const providerPage = useMemo(() => hash === '#provider-focus-page', [hash])

  useEffect(() => {
    if (!providerPage && hash && hash !== '#provider-focus-page') {
      window.setTimeout(() => {
        const target = document.getElementById(hash.replace('#', ''))
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
  }, [hash, providerPage])

  return (
    <ToastProvider>
      <TraumaInformedProvider>
        {providerPage ? <ProviderPage /> : <LandingPage activeHash={hash || '#top'} />}
      </TraumaInformedProvider>
    </ToastProvider>
  )
}
