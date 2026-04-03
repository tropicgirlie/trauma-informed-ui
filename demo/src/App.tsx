import React, { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Compass,
  Globe2,
  HeartHandshake,
  Layers3,
  MessageCircleHeart,
  MoonStar,
  PanelTop,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Menu,
  X,
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

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

const LIGHT_TOKENS = {
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

const DARK_TOKENS = {
  bg: '#15191C',
  surface: '#1F2529',
  surfaceDeep: '#2A3136',
  primary: '#6ABFCC',
  primarySoft: '#2A4F54',
  primaryMid: '#4A9BA6',
  secondary: '#8B9A89',
  accent: '#A99BC7',
  danger: '#C97A7A',
  text: '#E7ECEF',
  textMuted: '#A8B0B6',
  textSubtle: '#6B757C',
  border: '#3A4248',
  white: '#0D1114',
}

type Theme = 'light' | 'dark'

const useTokens = (theme: Theme) => theme === 'dark' ? DARK_TOKENS : LIGHT_TOKENS

// ═══════════════════════════════════════════════════════════════════════════════
// SPACING & LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════

const S = {
  sectionY: '88px',
  gutter: '32px',
  container: '1120px',
  narrow: '900px',
  radius: '24px',
  mobileContainer: '358px',
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT DATA
// ═══════════════════════════════════════════════════════════════════════════════

type ComponentCategory = 'feedback' | 'form' | 'layout' | 'overlay' | 'navigation' | 'foundation'

interface ComponentSpec {
  id: string
  name: string
  category: ComponentCategory
  tagline: string
  samhsaPrinciple: string
  purpose: string
  anatomy: string[]
  props: { name: string; type: string; description: string; required?: boolean }[]
  states: string[]
  tokenMapping: Record<string, string>
  nervousSystemNotes: string[]
  accessibilityNotes: string[]
  contrastChecks: string[]
  calmCopy: {
    example: string
    do: string[]
    dont: string[]
  }
}

const COMPONENT_SPECS: ComponentSpec[] = [
  {
    id: 'regret-button',
    name: 'RegretButton',
    category: 'feedback',
    tagline: 'Repair is possible',
    samhsaPrinciple: 'Empowerment, voice & choice',
    purpose: 'Provides an undo window after action — reduces shame and allows repair.',
    anatomy: ['Primary action trigger', 'Undo affordance with countdown', 'Confirmation state', 'Progress indicator'],
    props: [
      { name: 'label', type: 'string', description: 'Button label text', required: true },
      { name: 'windowMs', type: 'number', description: 'Undo window duration in milliseconds (default: 7000)', required: false },
      { name: 'onAction', type: '() => void', description: 'Callback when action is triggered', required: true },
      { name: 'onUndo', type: '() => void', description: 'Callback when undo is clicked', required: false },
      { name: 'variant', type: 'primary | destructive', description: 'Visual treatment', required: false },
    ],
    states: ['Before action (idle)', 'Action occurred (undo available)', 'Undo clicked', 'Expired (final state)'],
    tokenMapping: {
      'Primary button': 'primary',
      'Undo background': 'primarySoft',
      'Destructive variant': 'danger',
      'Text': 'text',
      'Countdown ring': 'primaryMid',
    },
    nervousSystemNotes: [
      'Clear undo affordance prevents shame spirals after mistakes',
      'Non-judgmental copy: "Undo" rather than "Cancel" or "Revert"',
      'Sufficient time window (7s default) for comprehension',
    ],
    accessibilityNotes: [
      'Timer announced to screen readers with aria-live="polite"',
      'Focus moves to undo button when available',
      'Escape key dismisses undo without triggering action',
    ],
    contrastChecks: [
      'Primary button: AA with white text (3:1 for large, 4.5:1 for small)',
      'Undo state: Text on primarySoft requires dark text',
    ],
    calmCopy: {
      example: 'Submitted — Undo',
      do: ['Use neutral language', 'Acknowledge action without judgment', 'Offer clear repair path'],
      dont: ['Shame-inducing language', 'Hidden or unclear undo paths', 'Too-short time windows'],
    },
  },
  {
    id: 'consent-stepper',
    name: 'ConsentStepper',
    category: 'form',
    tagline: 'One decision at a time',
    samhsaPrinciple: 'Collaboration & mutuality',
    purpose: 'Present one granular decision per step; never bundle choices.',
    anatomy: ['Step indicator', 'Decision content area', 'Choice options', 'Navigation (back/next)', 'Progress indicator'],
    props: [
      { name: 'steps', type: 'Step[]', description: 'Array of decision steps', required: true },
      { name: 'currentStep', type: 'number', description: 'Current step index', required: false },
      { name: 'onNext', type: '(stepIndex: number) => void', description: 'Navigate forward', required: true },
      { name: 'onBack', type: '(stepIndex: number) => void', description: 'Navigate backward', required: true },
      { name: 'allowSkip', type: 'boolean', description: 'Show skip affordance', required: false },
    ],
    states: ['Step base', 'Step with caution/warning', 'Final confirmation', 'Completed'],
    tokenMapping: {
      'Active step': 'primary',
      'Inactive steps': 'textSubtle',
      'Card background': 'surface',
      'Border': 'border',
      'Progress fill': 'primarySoft',
    },
    nervousSystemNotes: [
      'Progress visibility reduces uncertainty about remaining steps',
      'Skip/defer options honor agency without forcing false choices',
      'Pause between steps allows processing time',
    ],
    accessibilityNotes: [
      'Step announcements via aria-live on navigation',
      'Skip link available at top of each step',
      'Keyboard-only navigation supported',
    ],
    contrastChecks: [
      'Inactive step text on background meets AA',
      'Active step indicator clear at all sizes',
    ],
    calmCopy: {
      example: 'Step 2 of 4 — You can skip this and return later',
      do: ['Granular, unbundled choices', 'Clear step count', 'Explicit defer/skip options'],
      dont: ['Bundled consent (agree to all)', 'Hidden total steps', 'Forced progression'],
    },
  },
  {
    id: 'disclosure-card',
    name: 'DisclosureCard',
    category: 'layout',
    tagline: 'Progressive reveal',
    samhsaPrinciple: 'Safety',
    purpose: 'Progressive disclosure and content warnings before sensitive material.',
    anatomy: ['Preview/collapsed state', 'Trigger warning badge', 'Expand affordance', 'Full content area', 'Dismiss option'],
    props: [
      { name: 'warningText', type: 'string', description: 'Content warning label', required: false },
      { name: 'preview', type: 'ReactNode', description: 'Preview content when collapsed', required: true },
      { name: 'fullContent', type: 'ReactNode', description: 'Full content when expanded', required: true },
      { name: 'revealLabel', type: 'string', description: 'Label for reveal action', required: false },
      { name: 'onReveal', type: '() => void', description: 'Callback when revealed', required: false },
    ],
    states: ['Collapsed (preview)', 'Expanded (full content)', 'Expanded with dismiss'],
    tokenMapping: {
      'Card background': 'surface',
      'Warning badge': 'danger',
      'Reveal button': 'secondary',
      'Border': 'border',
      'Icon': 'accent',
    },
    nervousSystemNotes: [
      'Explicit content warnings allow nervous system preparation',
      'User controls pacing of disclosure',
      'Dismiss option provides escape if content becomes overwhelming',
    ],
    accessibilityNotes: [
      'Warning announced before content via aria-describedby',
      'Focus moves to content on expand',
      'Collapsible via keyboard and screen reader',
    ],
    contrastChecks: [
      'Warning badge (danger) on surface needs sufficient contrast',
      'Preview text must meet AA on surface background',
    ],
    calmCopy: {
      example: 'Content note: discussion of medical trauma — continue or skip',
      do: ['Explicit content labels', 'Neutral, non-dramatic language', 'Optional skip/close'],
      dont: ['Surprise disclosure', 'Vague warnings', 'Forced viewing'],
    },
  },
  {
    id: 'safe-exit',
    name: 'SafeExit',
    category: 'overlay',
    tagline: 'Leave safely, immediately',
    samhsaPrinciple: 'Safety',
    purpose: 'Single-click exit to neutral destination, clears history.',
    anatomy: ['Exit trigger', 'Confirm overlay (optional)', 'Redirect handling', 'History clearing'],
    props: [
      { name: 'redirectTo', type: 'string', description: 'URL to redirect to', required: true },
      { name: 'label', type: 'string', description: 'Button label', required: false },
      { name: 'clearHistory', type: 'boolean', description: 'Clear browser history', required: false },
      { name: 'showConfirm', type: 'boolean', description: 'Show confirmation dialog', required: false },
    ],
    states: ['Visible action', 'Confirm overlay (if enabled)', 'Redirecting'],
    tokenMapping: {
      'Button': 'primary',
      'Overlay background': 'surface',
      'Confirm text': 'text',
      'Icon': 'accent',
    },
    nervousSystemNotes: [
      'Visible escape route lowers sympathetic activation',
      'History clearing protects privacy in shared/surveilled environments',
      'Confirm step prevents accidental exits',
    ],
    accessibilityNotes: [
      'Exit button always reachable via keyboard',
      'Confirm dialog uses modal pattern with focus trap',
      'Announced to screen readers on activation',
    ],
    contrastChecks: [
      'Exit button clearly visible at all times',
      'Confirm overlay maintains readability',
    ],
    calmCopy: {
      example: 'Leave this page — Go to Google',
      do: ['Clear destination', 'Non-alarming language', 'Immediate action'],
      dont: ['Alarming labels', 'Hidden placement', 'No privacy protection'],
    },
  },
  {
    id: 'breathing-guide',
    name: 'BreathingGuide',
    category: 'feedback',
    tagline: 'Regulate in place',
    samhsaPrinciple: 'Safety',
    purpose: 'Gentle, optional regulation tool for moments of escalation.',
    anatomy: ['Invitation (collapsed)', 'Visual breath cue', 'Instructional text', 'Timer/progress', 'Dismiss control'],
    props: [
      { name: 'prompt', type: 'string', description: 'Opening invitation text', required: false },
      { name: 'breaths', type: 'number', description: 'Number of breath cycles', required: false },
      { name: 'silentMode', type: 'boolean', description: 'Disable animations', required: false },
      { name: 'onComplete', type: '() => void', description: 'Callback on completion', required: false },
    ],
    states: ['Invitation (collapsed)', 'Active (breathing)', 'Completed'],
    tokenMapping: {
      'Container': 'surface',
      'Breath visual': 'primarySoft',
      'Text': 'textMuted',
      'Progress': 'secondary',
      'Dismiss': 'textSubtle',
    },
    nervousSystemNotes: [
      'Optional invitation respects autonomy',
      'Paced breath cues support down-regulation',
      'Silent mode for users with motion sensitivity',
      'Easy dismiss if intervention feels wrong',
    ],
    accessibilityNotes: [
      'Reduced-motion variant available',
      'Breath timing announced for screen readers',
      'No auto-play; user must initiate',
    ],
    contrastChecks: [
      'Breath visual subtle but perceptible',
      'Text on surface background meets AA',
    ],
    calmCopy: {
      example: 'A few slow breaths can help — Try it?',
      do: ['Optional invitation', 'Gentle, permissive language', 'Clear exit'],
      dont: ['Prescriptive tone', 'Forced participation', 'Judgment of state'],
    },
  },
  {
    id: 'calming-message',
    name: 'CalmingMessage',
    category: 'feedback',
    tagline: 'Co-regulating tone',
    samhsaPrinciple: 'Peer support',
    purpose: 'Supportive messages during wait states or transitions.',
    anatomy: ['Message text', 'Optional icon', 'Context indicator'],
    props: [
      { name: 'message', type: 'string', description: 'Supportive text', required: true },
      { name: 'tone', type: 'calm | encouraging | neutral', description: 'Emotional tone', required: false },
      { name: 'showIcon', type: 'boolean', description: 'Show companion icon', required: false },
    ],
    states: ['Visible', 'Dismissed'],
    tokenMapping: {
      'Background': 'primarySoft',
      'Text': 'text',
      'Icon': 'secondary',
      'Border': 'border',
    },
    nervousSystemNotes: [
      'Co-regulating tone reduces isolation',
      'During waits, uncertainty is reduced',
      'Non-clinical, alongside language',
    ],
    accessibilityNotes: [
      'Announced if content changes',
      'Dismissible via keyboard',
    ],
    contrastChecks: [
      'Text on primarySoft meets contrast requirements',
    ],
    calmCopy: {
      example: 'This may take a moment — no rush',
      do: ['Alongside language', 'Acknowledge difficulty', 'Normalize pacing'],
      dont: ['Clinical detachment', 'False urgency', 'Minimizing language'],
    },
  },
  {
    id: 'safe-input',
    name: 'SafeInput',
    category: 'form',
    tagline: 'Input with consent context',
    samhsaPrinciple: 'Trustworthiness & transparency',
    purpose: 'Accessible inputs with helper text for consent and optional pause affordances.',
    anatomy: ['Label', 'Input field', 'Helper text', 'Optional warning flag', 'Error message area', 'Pause affordance'],
    props: [
      { name: 'label', type: 'string', description: 'Field label', required: true },
      { name: 'helperText', type: 'string', description: 'Consent/purpose explanation', required: false },
      { name: 'errorText', type: 'string', description: 'Error message', required: false },
      { name: 'triggerWarning', type: 'boolean', description: 'Flag for caution', required: false },
      { name: 'type', type: 'text | textarea | email | password', description: 'Input type', required: false },
    ],
    states: ['Default', 'Focus', 'Error', 'Disabled', 'With helper/caution text'],
    tokenMapping: {
      'Input background': 'surface',
      'Border default': 'border',
      'Border focus': 'primary',
      'Error': 'danger',
      'Label': 'text',
      'Helper': 'textMuted',
    },
    nervousSystemNotes: [
      'Helper text explains why input is needed',
      'Inline validation gentle, not alarming',
      'Avoid red-only error indicators',
      'Clear repair paths for corrections',
    ],
    accessibilityNotes: [
      'Label programmatically associated',
      'Error announced via aria-live',
      'Keyboard focus visible and clear',
    ],
    contrastChecks: [
      'Input border visible against surface',
      'Error state clear without relying solely on color',
    ],
    calmCopy: {
      example: 'Email — Used only for appointment reminders. You can change this anytime.',
      do: ['Explain purpose', 'Mention control/change options', 'Normalize pauses'],
      dont: ['Vague purpose', 'Mandatory fields without explanation', 'Shaming error language'],
    },
  },
]

const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  feedback: 'Feedback',
  form: 'Form Controls',
  layout: 'Layout',
  overlay: 'Overlays',
  navigation: 'Navigation',
  foundation: 'Foundation',
}

// ─── Tokens ──────────────────────────────────────────────────────────────────
const T = LIGHT_TOKENS

const SECTION_LABEL_STYLE: CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: T.textMuted,
  marginBottom: '10px',
}

type View = 'landing' | 'tokens' | 'gallery' | 'component'

interface TokenSwatchProps {
  name: string
  hex: string
  usage: string
  textTreatment: string
  contrast: string
  theme: Theme
}

function TokenSwatch({ name, hex, usage, textTreatment, contrast, theme }: TokenSwatchProps) {
  const t = theme === 'dark' ? DARK_TOKENS : LIGHT_TOKENS
  const isDark = hex.toLowerCase() === '#15191c' || hex.toLowerCase() === '#1f2529' || hex.toLowerCase() === '#2a3136' || hex.toLowerCase() === '#0d1114'
  
  return (
    <div style={{
      background: t.surface,
      borderRadius: '16px',
      padding: '20px',
      border: `1px solid ${t.border}`,
    }}>
      <div style={{
        background: hex,
        borderRadius: '12px',
        height: '80px',
        marginBottom: '16px',
        border: isDark ? `1px solid ${t.border}` : 'none',
      }} />
      <div style={{ fontSize: '14px', fontWeight: 600, color: t.text, marginBottom: '4px' }}>
        {name}
      </div>
      <div style={{ fontSize: '13px', fontFamily: 'monospace', color: t.textMuted, marginBottom: '12px' }}>
        {hex}
      </div>
      <div style={{ fontSize: '12px', color: t.textMuted, lineHeight: 1.6 }}>
        <div style={{ marginBottom: '8px' }}>
          <strong style={{ color: t.text }}>Usage:</strong> {usage}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong style={{ color: t.text }}>Text:</strong> {textTreatment}
        </div>
        <div>
          <strong style={{ color: t.text }}>Contrast:</strong> {contrast}
        </div>
      </div>
    </div>
  )
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

// ─── Design Kit: Tokens Page ──────────────────────────────────────────────────
interface TokensPageProps {
  theme: Theme
  onToggleTheme: () => void
  onNavigate: (view: View, componentId?: string) => void
}

function TokensPage({ theme, onToggleTheme, onNavigate }: TokensPageProps) {
  const t = useTokens(theme)
  const [copied, setCopied] = useState<string | null>(null)
  
  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    setCopied(val)
    setTimeout(() => setCopied(null), 1500)
  }

  const lightTokens = [
    { name: 'Background', hex: LIGHT_TOKENS.bg, usage: 'Page background. Use dark text only.', text: 'Dark text only', contrast: 'AA for body copy at standard sizes' },
    { name: 'Surface', hex: LIGHT_TOKENS.surface, usage: 'Cards and panels. Use dark text only.', text: 'Dark text only', contrast: 'Check small text; prefer larger sizes' },
    { name: 'Primary', hex: LIGHT_TOKENS.primary, usage: 'Primary actions (buttons, important links).', text: 'Light text at large sizes', contrast: 'AA with light text at large sizes' },
    { name: 'Primary Soft', hex: LIGHT_TOKENS.primarySoft, usage: 'Supportive fills and gentle backgrounds.', text: 'Dark text only', contrast: 'Suitable for component backgrounds' },
    { name: 'Secondary', hex: LIGHT_TOKENS.secondary, usage: 'Grounding accents, subtle controls.', text: 'Dark text (check small use)', contrast: 'Verify small text legibility' },
    { name: 'Accent', hex: LIGHT_TOKENS.accent, usage: 'Highlights only (icons, affordances). Avoid tiny text.', text: 'Avoid for tiny text', contrast: 'Decorative/affordance use' },
    { name: 'Danger', hex: LIGHT_TOKENS.danger, usage: 'Destructive actions.', text: 'Light text on danger', contrast: 'Check against parchment background' },
    { name: 'Text', hex: LIGHT_TOKENS.text, usage: 'Primary copy color. Accessible body text.', text: 'On light backgrounds', contrast: 'Primary accessible text' },
    { name: 'Border', hex: LIGHT_TOKENS.border, usage: 'Quiet dividers and decorative lines.', text: 'N/A', contrast: 'Decorative only' },
  ]

  const darkTokens = [
    { name: 'Dark Background', hex: DARK_TOKENS.bg, usage: 'Page background in low-light contexts.', text: 'Light text only', contrast: 'Evening, on-call, triage use' },
    { name: 'Dark Surface', hex: DARK_TOKENS.surface, usage: 'Cards and panels in dark mode.', text: 'Light text only', contrast: 'Supports layered hierarchy' },
    { name: 'Dark Primary', hex: DARK_TOKENS.primary, usage: 'Actions in dark mode.', text: 'Dark text for contrast', contrast: 'Brighter for visibility in dark' },
    { name: 'Dark Text', hex: DARK_TOKENS.text, usage: 'Primary accessible text in dark mode.', text: 'On dark backgrounds', contrast: 'Readable body copy' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: t.text }}>
      {/* Header */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: theme === 'dark' ? 'rgba(21,25,28,0.92)' : 'rgba(246,244,240,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${t.border}`,
        padding: `0 ${S.gutter}`, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', minHeight: '72px', gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => onNavigate('landing')}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '12px',
            background: t.primarySoft, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: t.primary,
          }}><ShieldCheck size={18} strokeWidth={2} /></div>
          <span style={{ fontWeight: 600, fontSize: '15px', color: t.text, letterSpacing: '-0.01em' }}>
            trauma-informed-ui
          </span>
          <Badge variant="primary">Design Kit</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onToggleTheme}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', borderRadius: '999px',
              border: `1px solid ${t.border}`, background: t.surface,
              color: t.text, cursor: 'pointer', fontSize: '13px',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <MoonStar size={16} />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            style={{
              padding: '8px 16px', borderRadius: '999px',
              border: 'none', background: t.primary,
              color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            }}
          >
            Component Gallery
          </button>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `${S.sectionY} ${S.gutter}` }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, color: t.text, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Design Tokens
          </h1>
          <p style={{ fontSize: '18px', color: t.textMuted, maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
            Muted, desaturated palettes to reduce physiological arousal. No pure black. No warm warning colors.
            Each token includes usage notes, text treatment guidance, and contrast checks.
          </p>
        </div>

        {/* Light Mode Tokens */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Sun size={24} color={t.primary} />
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: t.text, margin: 0 }}>Light Mode Tokens</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {lightTokens.map(({ name, hex, usage, text, contrast }) => (
              <TokenSwatch
                key={name}
                name={name}
                hex={hex}
                usage={usage}
                textTreatment={text}
                contrast={contrast}
                theme={theme}
              />
            ))}
          </div>
        </section>

        {/* Dark Mode Tokens */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <MoonStar size={24} color={t.primary} />
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: t.text, margin: 0 }}>Dark Mode Tokens</h2>
            <span style={{ fontSize: '13px', color: t.textMuted, marginLeft: '8px' }}>
              For night, on-call, and triage contexts
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {darkTokens.map(({ name, hex, usage, text, contrast }) => (
              <TokenSwatch
                key={name}
                name={name}
                hex={hex}
                usage={usage}
                textTreatment={text}
                contrast={contrast}
                theme={theme}
              />
            ))}
          </div>
        </section>

        {/* Contrast Guidance */}
        <section style={{
          background: t.surface, borderRadius: S.radius, padding: '32px',
          border: `1px solid ${t.border}`
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>
            Contrast Validation Guidelines
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: t.text, margin: '0 0 12px' }}>Text on Background</h3>
              <p style={{ fontSize: '14px', color: t.textMuted, lineHeight: 1.7, margin: 0 }}>
                Dark text (#2F3134) on parchment (#F6F4F0) meets AA for all sizes. 
                For small text below 14px, ensure 4.5:1 minimum.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: t.text, margin: '0 0 12px' }}>Text on Primary</h3>
              <p style={{ fontSize: '14px', color: t.textMuted, lineHeight: 1.7, margin: 0 }}>
                White/light text on teal (#3C7F8C) — AA at large sizes only (18px+ or 14px bold).
                For smaller text, use Primary Soft with dark text.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: t.text, margin: '0 0 12px' }}>Danger Token Usage</h3>
              <p style={{ fontSize: '14px', color: t.textMuted, lineHeight: 1.7, margin: 0 }}>
                Danger (#B06565) signals without warm hues. Check contrast against parchment 
                for legibility. Use sparingly to avoid alarm response.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: t.text, margin: '0 0 12px' }}>Dark Mode Contrast</h3>
              <p style={{ fontSize: '14px', color: t.textMuted, lineHeight: 1.7, margin: 0 }}>
                Light text (#E7ECEF) on dark backgrounds (#15191C, #1F2529) maintains AA.
                Primary accent (#6ABFCC) ensures visibility in low-light contexts.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// ─── Design Kit: Gallery Page ─────────────────────────────────────────────────
interface GalleryPageProps {
  theme: Theme
  onToggleTheme: () => void
  onNavigate: (view: View, componentId?: string) => void
}

function GalleryPage({ theme, onToggleTheme, onNavigate }: GalleryPageProps) {
  const t = useTokens(theme)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all')

  const categories: { id: ComponentCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Components' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'form', label: 'Form Controls' },
    { id: 'layout', label: 'Layout' },
    { id: 'overlay', label: 'Overlays' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'foundation', label: 'Foundation' },
  ]

  const filteredComponents = COMPONENT_SPECS.filter((component) => {
    const matchesSearch = component.name.toLowerCase().includes(search.toLowerCase()) ||
                         component.purpose.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: t.text }}>
      {/* Header */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: theme === 'dark' ? 'rgba(21,25,28,0.92)' : 'rgba(246,244,240,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${t.border}`,
        padding: `0 ${S.gutter}`, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', minHeight: '72px', gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => onNavigate('landing')}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '12px',
            background: t.primarySoft, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: t.primary,
          }}><ShieldCheck size={18} strokeWidth={2} /></div>
          <span style={{ fontWeight: 600, fontSize: '15px', color: t.text, letterSpacing: '-0.01em' }}>
            trauma-informed-ui
          </span>
          <Badge variant="primary">Design Kit</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onToggleTheme}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', borderRadius: '999px',
              border: `1px solid ${t.border}`, background: t.surface,
              color: t.text, cursor: 'pointer', fontSize: '13px',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <MoonStar size={16} />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            onClick={() => onNavigate('tokens')}
            style={{
              padding: '8px 16px', borderRadius: '999px',
              border: `1px solid ${t.border}`, background: 'transparent',
              color: t.text, cursor: 'pointer', fontSize: '13px',
            }}
          >
            Tokens
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            style={{
              padding: '8px 16px', borderRadius: '999px',
              border: 'none', background: t.primary,
              color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            }}
          >
            Component Gallery
          </button>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `${S.sectionY} ${S.gutter}` }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: t.text, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Component Gallery
          </h1>
          <p style={{ fontSize: '18px', color: t.textMuted, maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
            Trauma-informed UI primitives with nervous-system-informed usage notes.
            Each component includes anatomy, states, token mapping, and accessibility guidance.
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: t.textMuted }} />
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 16px 14px 48px',
                borderRadius: '12px', border: `1px solid ${t.border}`,
                background: t.surface, color: t.text,
                fontSize: '16px', outline: 'none',
              }}
            />
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                style={{
                  padding: '8px 16px', borderRadius: '999px',
                  border: `1px solid ${selectedCategory === id ? t.primary : t.border}`,
                  background: selectedCategory === id ? t.primary : t.surface,
                  color: selectedCategory === id ? '#fff' : t.text,
                  cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              onClick={() => onNavigate('component', component.id)}
              style={{
                background: t.surface,
                borderRadius: '16px',
                padding: '24px',
                border: `1px solid ${t.border}`,
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(60,127,140,0.12)'}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: t.primary,
                  padding: '4px 10px', borderRadius: '999px', background: t.primarySoft,
                }}>
                  {CATEGORY_LABELS[component.category]}
                </span>
                <span style={{ fontSize: '12px', color: t.textMuted }}>
                  {Object.keys(component.tokenMapping).length} tokens
                </span>
              </div>

              {/* Component Name */}
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 8px' }}>
                {component.name}
              </h3>

              {/* Tagline */}
              <p style={{ fontSize: '14px', color: t.textMuted, margin: '0 0 16px', lineHeight: 1.6 }}>
                {component.tagline}
              </p>

              {/* SAMHSA Principle */}
              <div style={{ fontSize: '13px', color: t.textSubtle, marginBottom: '16px' }}>
                <strong style={{ color: t.text }}>SAMHSA:</strong> {component.samhsaPrinciple}
              </div>

              {/* Purpose Preview */}
              <p style={{ fontSize: '13px', color: t.textMuted, margin: '0 0 20px', lineHeight: 1.7 }}>
                {component.purpose}
              </p>

              {/* Token Preview */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {Object.entries(component.tokenMapping).slice(0, 3).map(([key, token]) => (
                  <span
                    key={key}
                    style={{
                      fontSize: '11px', padding: '4px 8px',
                      borderRadius: '6px', background: t.bg,
                      color: t.textMuted, border: `1px solid ${t.border}`,
                    }}
                  >
                    {token}
                  </span>
                ))}
                {Object.keys(component.tokenMapping).length > 3 && (
                  <span style={{ fontSize: '11px', color: t.textSubtle, padding: '4px 8px' }}>
                    +{Object.keys(component.tokenMapping).length - 3} more
                  </span>
                )}
              </div>

              {/* View Details Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: t.primary, fontSize: '14px', fontWeight: 500 }}>
                <span>View full spec</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 8px' }}>
              No components found
            </h3>
            <p style={{ fontSize: '15px', color: t.textMuted, margin: 0 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

// ─── Design Kit: Component Detail Page ───────────────────────────────────────
interface ComponentDetailProps {
  componentId: string
  theme: Theme
  onToggleTheme: () => void
  onNavigate: (view: View, componentId?: string) => void
}

function ComponentDetail({ componentId, theme, onToggleTheme, onNavigate }: ComponentDetailProps) {
  const t = useTokens(theme)
  const component = COMPONENT_SPECS.find(c => c.id === componentId)

  if (!component) {
    return (
      <div style={{ minHeight: '100vh', background: t.bg, color: t.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Component not found</h1>
          <button onClick={() => onNavigate('gallery')} style={{ padding: '12px 24px', borderRadius: '8px', background: t.primary, color: '#fff', border: 'none', cursor: 'pointer' }}>
            Back to Gallery
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: t.text }}>
      {/* Header */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: theme === 'dark' ? 'rgba(21,25,28,0.92)' : 'rgba(246,244,240,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${t.border}`,
        padding: `0 ${S.gutter}`, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', minHeight: '72px', gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => onNavigate('landing')}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '12px',
            background: t.primarySoft, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: t.primary,
          }}><ShieldCheck size={18} strokeWidth={2} /></div>
          <span style={{ fontWeight: 600, fontSize: '15px', color: t.text, letterSpacing: '-0.01em' }}>
            trauma-informed-ui
          </span>
          <Badge variant="primary">Design Kit</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => onNavigate('gallery')} style={{ padding: '8px 16px', borderRadius: '999px', border: `1px solid ${t.border}`, background: 'transparent', color: t.text, cursor: 'pointer', fontSize: '13px' }}>
            <ChevronLeft size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Back to Gallery
          </button>
          <button onClick={onToggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '999px', border: `1px solid ${t.border}`, background: t.surface, color: t.text, cursor: 'pointer', fontSize: '13px' }}>
            {theme === 'dark' ? <Sun size={16} /> : <MoonStar size={16} />}
          </button>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `${S.sectionY} ${S.gutter}` }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '32px', fontSize: '14px', color: t.textMuted }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('gallery')}>Components</span>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: t.text }}>{component.name}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              fontSize: '12px', fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: t.primary,
              padding: '6px 12px', borderRadius: '999px', background: t.primarySoft,
            }}>
              {CATEGORY_LABELS[component.category]}
            </span>
            <span style={{ fontSize: '14px', color: t.textMuted }}>
              SAMHSA: {component.samhsaPrinciple}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: t.text, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
            {component.name}
          </h1>
          <p style={{ fontSize: '20px', color: t.primary, fontWeight: 600, margin: '0 0 16px' }}>
            {component.tagline}
          </p>
          <p style={{ fontSize: '16px', color: t.textMuted, maxWidth: '680px', lineHeight: 1.7 }}>
            {component.purpose}
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          {/* Left Column - Visuals */}
          <div>
            {/* States */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>States</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {component.states.map((state, index) => (
                  <div key={index} style={{
                    background: t.surface, borderRadius: '12px', padding: '20px',
                    border: `1px solid ${t.border}`,
                  }}>
                    <span style={{
                      fontSize: '12px', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: t.textMuted, marginBottom: '8px', display: 'block',
                    }}>
                      State {index + 1}
                    </span>
                    <span style={{ fontSize: '15px', color: t.text }}>{state}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Anatomy */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>Anatomy</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {component.anatomy.map((part, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: t.surface, borderRadius: '10px', padding: '16px',
                    border: `1px solid ${t.border}`,
                  }}>
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%', background: t.primarySoft,
                      color: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 600,
                    }}>{index + 1}</span>
                    <span style={{ fontSize: '15px', color: t.text }}>{part}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Specs */}
          <div>
            {/* Props */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>Props & Content</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {component.props.map((prop) => (
                  <div key={prop.name} style={{
                    background: t.surface, borderRadius: '10px', padding: '16px',
                    border: `1px solid ${t.border}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <code style={{ fontSize: '14px', color: t.primary, fontFamily: 'monospace', fontWeight: 600 }}>
                        {prop.name}
                      </code>
                      <span style={{
                        fontSize: '11px', padding: '2px 8px', borderRadius: '4px',
                        background: t.primarySoft, color: t.primary,
                      }}>{prop.type}</span>
                      {prop.required && (
                        <span style={{
                          fontSize: '11px', padding: '2px 8px', borderRadius: '4px',
                          background: t.danger + '20', color: t.danger,
                        }}>required</span>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', color: t.textMuted, margin: 0 }}>{prop.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Token Mapping */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>Token Mapping</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.entries(component.tokenMapping).map(([key, token]) => (
                  <div key={key} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: t.surface, borderRadius: '10px', padding: '14px 16px',
                    border: `1px solid ${t.border}`,
                  }}>
                    <span style={{ fontSize: '14px', color: t.text }}>{key}</span>
                    <code style={{ fontSize: '13px', color: t.primary, fontFamily: 'monospace', background: t.primarySoft, padding: '4px 8px', borderRadius: '4px' }}>
                      {token}
                    </code>
                  </div>
                ))}
              </div>
            </section>

            {/* Nervous System Notes */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>Nervous-System Notes</h2>
              <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {component.nervousSystemNotes.map((note, index) => (
                  <li key={index} style={{ fontSize: '14px', color: t.textMuted, lineHeight: 1.7 }}>{note}</li>
                ))}
              </ul>
            </section>

            {/* Accessibility */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>Accessibility</h2>
              <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {component.accessibilityNotes.map((note, index) => (
                  <li key={index} style={{ fontSize: '14px', color: t.textMuted, lineHeight: 1.7 }}>{note}</li>
                ))}
              </ul>
            </section>

            {/* Contrast Checks */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: t.text, margin: '0 0 24px' }}>Contrast Checks</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {component.contrastChecks.map((check, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: t.surface, borderRadius: '10px', padding: '14px 16px',
                    border: `1px solid ${t.border}`,
                  }}>
                    <CheckCircle2 size={18} color={t.secondary} />
                    <span style={{ fontSize: '14px', color: t.textMuted }}>{check}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Calm Copy */}
            <section style={{
              background: t.primarySoft, borderRadius: S.radius, padding: '24px',
              border: `1px solid ${t.border}`,
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: t.text, margin: '0 0 16px' }}>Calm Copy Guidance</h2>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.textMuted }}>Example</span>
                <p style={{ fontSize: '15px', color: t.text, margin: '8px 0 0', fontStyle: 'italic' }}>"{component.calmCopy.example}"</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.secondary }}>Do</span>
                  <ul style={{ margin: '8px 0 0', padding: '0 0 0 18px', fontSize: '13px', color: t.textMuted }}>
                    {component.calmCopy.do.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.danger }}>Don't</span>
                  <ul style={{ margin: '8px 0 0', padding: '0 0 0 18px', fontSize: '13px', color: t.textMuted }}>
                    {component.calmCopy.dont.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
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
function LandingPage({ activeHash, onNavigate }: { activeHash: string; onNavigate: (view: View, componentId?: string) => void }) {
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
  const [view, setView] = useState<View>('landing')
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null)
  const [theme, setTheme] = useState<Theme>('light')
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Handle provider-focus-page hash for backward compatibility
  const isProviderPage = hash === '#provider-focus-page'

  const handleNavigate = useCallback((newView: View, componentId?: string) => {
    setView(newView)
    if (componentId) {
      setActiveComponentId(componentId)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleToggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  // If hash is provider-focus-page, render ProviderPage directly
  if (isProviderPage) {
    return (
      <ToastProvider>
        <TraumaInformedProvider>
          <ProviderPage />
        </TraumaInformedProvider>
      </ToastProvider>
    )
  }

  // Render based on current view
  const renderContent = () => {
    switch (view) {
      case 'tokens':
        return (
          <TokensPage
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onNavigate={handleNavigate}
          />
        )
      case 'gallery':
        return (
          <GalleryPage
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onNavigate={handleNavigate}
          />
        )
      case 'component':
        return (
          <ComponentDetail
            componentId={activeComponentId || 'regret-button'}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onNavigate={handleNavigate}
          />
        )
      case 'landing':
      default:
        return <LandingPage activeHash={hash || '#top'} onNavigate={handleNavigate} />
    }
  }

  return (
    <ToastProvider>
      <TraumaInformedProvider>
        {renderContent()}
      </TraumaInformedProvider>
    </ToastProvider>
  )
}
