import React, { useState } from 'react'
import {
  TraumaInformedProvider,
  ToastProvider,
  useToast,
  Button,
  Badge,
  Chip,
  Alert,
  Card,
  Switch,
  Checkbox,
  ProgressBar,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Modal,
  Skeleton,
  SkeletonText,
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

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(246,244,240,0.92)', backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${T.border}`,
      padding: '0 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: '56px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px',
          background: T.primary, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '14px',
        }}>🌿</div>
        <span style={{ fontWeight: 600, fontSize: '15px', color: T.text, letterSpacing: '-0.01em' }}>
          trauma-informed-ui
        </span>
        <Badge variant="primary">v0.1</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a href="#principles" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', padding: '4px 10px' }}>Principles</a>
        <a href="#components" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', padding: '4px 10px' }}>Components</a>
        <a href="#tokens" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', padding: '4px 10px' }}>Tokens</a>
        <a href="#install" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none', padding: '4px 10px' }}>Install</a>
        <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" target="_blank" rel="noreferrer">
          <Button size="sm" variant="secondary">Storybook ↗</Button>
        </a>
        <a href="https://github.com/tropicgirlie/trauma-informed-ui" target="_blank" rel="noreferrer">
          <Button size="sm" variant="ghost">GitHub ↗</Button>
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      maxWidth: '860px', margin: '0 auto', padding: '96px 24px 80px',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: T.primarySoft, color: T.primary, borderRadius: '24px',
        padding: '5px 14px', fontSize: '12px', fontWeight: 500,
        letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '28px',
      }}>
        <span>🌱</span> React · MIT · Trauma-informed by design
      </div>
      <h1 style={{
        fontSize: 'clamp(36px, 6vw, 62px)', fontWeight: 700, color: T.text,
        lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 24px',
      }}>
        Design that{' '}
        <span style={{ color: T.primary }}>holds space.</span>
      </h1>
      <p style={{
        fontSize: 'clamp(16px, 2.5vw, 20px)', color: T.textMuted,
        lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 40px',
      }}>
        A React component library and design system for interfaces that centre
        dignity, nervous system safety, and genuine agency. Built on{' '}
        <strong style={{ color: T.text }}>SAMHSA's six principles</strong> of
        trauma-informed care.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" target="_blank" rel="noreferrer">
          <Button variant="primary" size="lg">View Storybook →</Button>
        </a>
        <a href="#install">
          <Button variant="secondary" size="lg">Get started</Button>
        </a>
        <a href="https://github.com/tropicgirlie/trauma-informed-ui" target="_blank" rel="noreferrer">
          <Button variant="ghost" size="lg">GitHub ↗</Button>
        </a>
      </div>
      <div style={{
        marginTop: '64px', display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
        background: T.border, borderRadius: '16px', overflow: 'hidden',
      }}>
        {[
          { n: '25+', label: 'Components' },
          { n: '6', label: 'SAMHSA principles' },
          { n: '100%', label: 'Accessible' },
        ].map(({ n, label }) => (
          <div key={label} style={{ background: T.white, padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: T.primary, letterSpacing: '-0.02em' }}>{n}</div>
            <div style={{ fontSize: '13px', color: T.textSubtle, marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Principles ───────────────────────────────────────────────────────────────
const PRINCIPLES = [
  { icon: '🛡️', title: 'Safety', desc: 'Users always know where they are, what comes next, and how to exit. No surprises.' },
  { icon: '🤝', title: 'Trustworthiness', desc: 'Transparent language, predictable patterns, and honest error messages. Never blame.' },
  { icon: '👥', title: 'Peer support', desc: 'Tone that feels alongside, not above. Language that normalises rather than pathologises.' },
  { icon: '🌀', title: 'Collaboration', desc: 'Consent before disclosure. One decision at a time. Nothing bundled or irreversible.' },
  { icon: '✨', title: 'Empowerment', desc: 'Undo windows reduce shame. Progress saves automatically. Agency is structural, not cosmetic.' },
  { icon: '🌍', title: 'Cultural humility', desc: 'Muted palette, no urgency-coded reds, no blinking or bouncing. Design for a nervous system, not a notification.' },
]

function Principles() {
  return (
    <section id="principles" style={{ background: T.surface, padding: '80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Six principles. Baked in.
          </h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Every component maps to at least one SAMHSA principle of trauma-informed care — not as a label, but as a constraint.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {PRINCIPLES.map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: T.white, borderRadius: '16px', padding: '24px',
              border: `1px solid ${T.border}`,
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: T.text, margin: '0 0 8px' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: T.textMuted, margin: 0, lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Component showcase ────────────────────────────────────────────────────────
function ShowcaseFeedback() {
  const { toast } = useToast()
  const [chips, setChips] = useState(['Mental health', 'Housing', 'Anxiety'])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Badges</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary" dot>In progress</Badge>
          <Badge variant="success">Saved</Badge>
          <Badge variant="warning">Needs review</Badge>
          <Badge variant="danger">Action needed</Badge>
          <Badge variant="accent">New</Badge>
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Chips</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {chips.map(c => (
            <Chip key={c} onRemove={() => setChips(prev => prev.filter(x => x !== c))}>{c}</Chip>
          ))}
          {chips.length === 0 && <span style={{ fontSize: '13px', color: T.textSubtle }}>All chips removed — refresh to reset.</span>}
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Alerts</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Alert variant="info" title="Before you begin">This section covers your support preferences. You can update them any time.</Alert>
          <Alert variant="success" title="Progress saved" onDismiss={() => {}}>Your responses have been recorded securely.</Alert>
          <Alert variant="warning" title="Take a moment">The next section contains descriptions some find distressing.</Alert>
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Toast notifications</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'info', message: 'Your progress has been saved.' })}>Info</Button>
          <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'success', title: 'Saved', message: 'Recorded securely.' })}>Success</Button>
          <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'warning', message: 'Sensitive content follows.' })}>Warning</Button>
          <Button size="sm" variant="secondary" onClick={() => toast({ variant: 'danger', title: 'Error', message: "Couldn't save — your work is still here." })}>Danger</Button>
        </div>
      </div>
    </div>
  )
}

function ShowcaseForms() {
  const [sw, setSw] = useState(false)
  const [ck, setCk] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Checkbox</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '420px' }}>
          <Checkbox label="I understand this section may be difficult to read" hint="You can close this at any time." checked={ck} onChange={(checked) => setCk(checked)} />
          <Checkbox label="Save my responses for my next visit" defaultChecked />
          <Checkbox label="Receive follow-up support resources" indeterminate />
          <Checkbox label="This field is required" error="Please confirm before continuing." />
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Switch</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '420px' }}>
          <Switch label="Receive follow-up messages" hint="Only about what you share today." checked={sw} onChange={(checked) => setSw(checked)} />
          <Switch label="Allow care coordinator access" onLabel="Allowed" offLabel="Not allowed" />
          <Switch label="Save session progress" defaultChecked />
        </div>
      </div>
    </div>
  )
}

function ShowcaseLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <Card header="Support resources" footer={<Button variant="secondary" size="sm">Browse all</Button>}>
          <p style={{ fontSize: '13px', color: T.textMuted, margin: 0, lineHeight: 1.7 }}>Peer support, helplines, and local services — available whenever you're ready.</p>
        </Card>
        <Card variant="elevated" header="Your progress">
          <ProgressBar value={60} label="Section 3 of 5" showValue />
          <p style={{ fontSize: '12px', color: T.textSubtle, margin: '10px 0 0' }}>You're doing well. Take your time.</p>
        </Card>
        <Card variant="outlined">
          <SkeletonText lines={3} />
        </Card>
        <Card variant="filled" header="Crisis line">
          <p style={{ fontSize: '13px', color: T.textMuted, margin: 0 }}>Available 24/7 · Free · Confidential</p>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '420px' }}>
        <ProgressBar value={35} label="Step 2 of 5" showValue />
        <ProgressBar value={100} variant="success" label="Upload complete" showValue />
        <ProgressBar value={72} variant="warning" label="Storage nearly full" showValue />
      </div>
      <div style={{ padding: '18px', background: T.surface, borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '340px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton circle width="38px" height="38px" />
          <div style={{ flex: 1 }}><Skeleton height="13px" width="55%" /></div>
        </div>
        <SkeletonText lines={2} />
        <Skeleton height="34px" borderRadius="10px" width="42%" />
      </div>
    </div>
  )
}

function ShowcaseOverlays() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState<string | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Modal</p>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open} onClose={() => setOpen(false)}
          title="Before you continue"
          subtitle="This section discusses sensitive topics."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Not right now</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Continue</Button>
            </>
          }
        >
          <p style={{ margin: '0 0 14px' }}>The next section covers your mental health history. There's no right or wrong answer.</p>
          <Alert variant="info">You can stop or save your progress at any point. Take your time.</Alert>
        </Modal>
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 500, color: T.textSubtle, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>RegretButton — undo within 7 s</p>
        {last && <div style={{ marginBottom: '10px', padding: '10px 14px', background: T.primarySoft, borderRadius: '10px', fontSize: '13px', color: T.primary }}>✓ {last}</div>}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <RegretButton variant="primary" label="Submit response" onAction={() => setLast('Response submitted')} onUndo={() => setLast(null)} toastMessage="Response queued…" />
          <RegretButton variant="destructive" label="Delete note" onAction={() => setLast('Note deleted')} onUndo={() => setLast(null)} toastMessage="Note will be deleted…" windowMs={5000} />
        </div>
      </div>
    </div>
  )
}

function ComponentShowcase() {
  return (
    <section id="components" style={{ padding: '80px 24px', background: T.bg }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Live components
          </h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            All components are interactive. Try them — including undo, dismiss, and keyboard navigation.
          </p>
        </div>
        <Tabs defaultTab="feedback">
          <TabList>
            <Tab id="feedback">Feedback</Tab>
            <Tab id="forms">Forms</Tab>
            <Tab id="layout">Cards & Loaders</Tab>
            <Tab id="overlays">Overlays</Tab>
          </TabList>
          <TabPanel id="feedback"><div style={{ padding: '24px 0' }}><ShowcaseFeedback /></div></TabPanel>
          <TabPanel id="forms"><div style={{ padding: '24px 0' }}><ShowcaseForms /></div></TabPanel>
          <TabPanel id="layout"><div style={{ padding: '24px 0' }}><ShowcaseLayout /></div></TabPanel>
          <TabPanel id="overlays"><div style={{ padding: '24px 0' }}><ShowcaseOverlays /></div></TabPanel>
        </Tabs>
      </div>
    </section>
  )
}

// ─── Token palette ────────────────────────────────────────────────────────────
const PALETTE = [
  { name: '--ti-bg', hex: '#F6F4F0', label: 'Background' },
  { name: '--ti-surface', hex: '#ECE7DF', label: 'Surface' },
  { name: '--ti-primary', hex: '#3C7F8C', label: 'Primary (teal)' },
  { name: '--ti-primary-soft', hex: '#D1E5E8', label: 'Primary soft' },
  { name: '--ti-secondary', hex: '#7C8F7A', label: 'Secondary (sage)' },
  { name: '--ti-accent', hex: '#8C7BAF', label: 'Accent (lavender)' },
  { name: '--ti-danger', hex: '#B06565', label: 'Danger (rose)' },
  { name: '--ti-warning', hex: '#C39A4A', label: 'Warning (ochre)' },
  { name: '--ti-text', hex: '#2F3134', label: 'Text' },
  { name: '--ti-border', hex: '#D7D2C8', label: 'Border' },
]

function TokenPalette() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    setCopied(val)
    setTimeout(() => setCopied(null), 1500)
  }
  return (
    <section id="tokens" style={{ background: T.surface, padding: '80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Design tokens</h2>
          <p style={{ fontSize: '16px', color: T.textMuted, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Muted teal, sage, and parchment. No pure black. No urgency-coded reds.
            Desaturated palettes reduce physiological arousal. Click any token to copy.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {PALETTE.map(({ name, hex, label }) => (
            <button key={name} onClick={() => copy(hex)} style={{
              background: 'none', border: `1px solid ${T.border}`, borderRadius: '14px',
              padding: '0', cursor: 'pointer', overflow: 'hidden', textAlign: 'left',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(60,127,140,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ height: '56px', background: hex, borderBottom: `1px solid ${T.border}` }} />
              <div style={{ padding: '10px 12px', background: T.white }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: T.text, marginBottom: '2px' }}>
                  {copied === hex ? '✓ Copied!' : label}
                </div>
                <div style={{ fontSize: '11px', color: T.textSubtle, fontFamily: 'monospace' }}>{hex}</div>
              </div>
            </button>
          ))}
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
    <section id="install" style={{ padding: '80px 24px', background: T.bg }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: T.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Get started</h2>
          <p style={{ fontSize: '16px', color: T.textMuted, lineHeight: 1.7 }}>Two imports. Done.</p>
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
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: T.text, marginBottom: '4px' }}>trauma-informed-ui</div>
          <div style={{ fontSize: '12px', color: T.textSubtle }}>
            MIT · Built with care by{' '}
            <a href="https://momops.io" style={{ color: T.primary, textDecoration: 'none' }}>Luana Micheau</a>
            {' '}·{' '}
            <a href="https://momops.io/ccd" style={{ color: T.primary, textDecoration: 'none' }}>Care-Conscious Design</a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://tropicgirlie.github.io/trauma-informed-ui/storybook/" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none' }} target="_blank" rel="noreferrer">Storybook</a>
          <a href="https://github.com/tropicgirlie/trauma-informed-ui" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none' }} target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/tropicgirlie/trauma-informed-ui/blob/main/LICENSE" style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'none' }} target="_blank" rel="noreferrer">License</a>
        </div>
      </div>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: T.bg, fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: T.text }}>
      <Nav />
      <Hero />
      <Principles />
      <ComponentShowcase />
      <TokenPalette />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <TraumaInformedProvider>
        <LandingPage />
      </TraumaInformedProvider>
    </ToastProvider>
  )
}
