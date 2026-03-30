import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTraumaInformed } from '../TraumaInformedProvider'
import { Button } from '../Button'

// ─────────────────────────────────────────
// DisclosureCard
// ─────────────────────────────────────────

export interface DisclosureCardProps {
  /** The label shown on the collapsed header */
  label: string
  /** Short warning shown before the content reveals. Should be warm, not clinical. */
  warningText: string
  /** Optional badge text on the header e.g. "may be distressing" */
  badge?: string
  /** The sensitive content to reveal */
  children: React.ReactNode
  /** Whether the card starts expanded. Default: false */
  defaultOpen?: boolean
  /** Custom className */
  className?: string
  /** Called when the card opens */
  onOpen?: () => void
}

/**
 * DisclosureCard
 *
 * Progressively reveals sensitive content. Users choose how deep to go.
 * Shows a warm content warning before the material is visible.
 *
 * SAMHSA principle: Safety; Trustworthiness & Transparency
 * Neurobiological rationale: Surprise is a threat signal. Predictable,
 * layered disclosure keeps users in their window of tolerance by letting them
 * choose when and whether to engage with difficult content.
 *
 * @example
 * <DisclosureCard
 *   label="Medication side effects"
 *   badge="may be distressing"
 *   warningText="This section includes clinical descriptions. Take a moment if you need one."
 * >
 *   <p>Some people experience nausea...</p>
 * </DisclosureCard>
 */
export function DisclosureCard({
  label,
  warningText,
  badge,
  children,
  defaultOpen = false,
  className,
  onOpen,
}: DisclosureCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0)

  useEffect(() => {
    if (!contentRef.current) return
    if (open) {
      const h = contentRef.current.scrollHeight
      setHeight(h)
      setTimeout(() => setHeight(undefined), 350)
    } else {
      setHeight(contentRef.current.scrollHeight)
      requestAnimationFrame(() => setHeight(0))
    }
  }, [open])

  const toggle = useCallback(() => {
    setOpen((prev) => {
      if (!prev) onOpen?.()
      return !prev
    })
  }, [onOpen])

  return (
    <div
      data-ti-disclosure-card
      className={className}
      style={{
        background: '#ECE7DF',
        border: '1px solid #D7D2C8',
        borderRadius: '20px',
        overflow: 'hidden',
        maxWidth: '420px',
      }}
    >
      <button
        onClick={toggle}
        aria-expanded={open}
        style={{
          width: '100%',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#2F3134',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {label}
          {badge && (
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: '#D1E5E8',
                color: '#2D6473',
                fontWeight: 400,
              }}
            >
              {badge}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          style={{
            fontSize: '20px',
            color: '#8B8F96',
            transform: open ? 'rotate(90deg)' : 'none',
            transition: 'transform 250ms ease',
            lineHeight: 1,
          }}
        >
          ›
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          overflow: 'hidden',
          height: height === undefined ? 'auto' : `${height}px`,
          transition: 'height 350ms ease',
        }}
      >
        <div style={{ padding: '0 20px 12px' }}>
          <p
            style={{
              padding: '10px 14px',
              background: '#F4EDDB',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#8B6830',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {warningText}
          </p>
        </div>
        <div
          style={{
            padding: '0 20px 20px',
            fontSize: '14px',
            color: '#62666D',
            lineHeight: 1.8,
            borderTop: '1px solid #D7D2C8',
            paddingTop: '16px',
            marginTop: '0',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// CalmingMessage
// ─────────────────────────────────────────

export interface CalmingMessageProps {
  /** The main message text */
  children: React.ReactNode
  /** Estimated time shown beneath the message e.g. "Takes about 2 minutes" */
  timeEstimate?: string
  /** Colour variant — sage (default) or dust */
  variant?: 'sage' | 'dust'
  /** Custom className */
  className?: string
}

/**
 * CalmingMessage
 *
 * A nervous-system-aware message that orients users before hard content.
 * Neither minimising ("don't worry!") nor clinically cold.
 *
 * SAMHSA principle: Trustworthiness & Transparency; Safety
 * Neurobiological rationale: Predictability reduces threat appraisal. Time
 * estimates are particularly effective — knowing how long something takes
 * reduces uncertainty, a key nervous system regulator.
 *
 * @example
 * <CalmingMessage timeEstimate="Takes about 2 minutes">
 *   This next section asks about your pregnancy history. There's no right or
 *   wrong answer — just take it at your pace.
 * </CalmingMessage>
 */
export function CalmingMessage({
  children,
  timeEstimate,
  variant = 'sage',
  className,
}: CalmingMessageProps) {
  const isSage = variant === 'sage'
  const bg = isSage ? '#D1E5E8' : '#F4EDDB'
  const border = isSage ? '#3C7F8C' : '#C39A4A'
  const text = isSage ? '#2D6473' : '#8B6830'
  const timeColor = isSage ? '#3C7F8C' : '#C39A4A'

  return (
    <div
      data-ti-calming-message
      className={className}
      style={{
        background: bg,
        borderLeft: `3px solid ${border}`,
        borderRadius: '0 12px 12px 0',
        padding: '14px 18px',
        maxWidth: '380px',
      }}
    >
      <div style={{ fontSize: '13px', color: text, lineHeight: 1.75 }}>{children}</div>

      {timeEstimate && (
        <p
          style={{
            fontSize: '11px',
            marginTop: '8px',
            color: timeColor,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {timeEstimate}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// PauseAware
// ─────────────────────────────────────────

export interface PauseAwareAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export interface PauseAwareProps {
  /** Message shown when inactivity is detected */
  message?: string
  /** Actions to offer the user */
  actions?: PauseAwareAction[]
  /** Override the pause threshold from TraumaInformedProvider */
  thresholdMs?: number
  /** Custom className */
  className?: string
  /** Called when the pause prompt appears */
  onPause?: () => void
  /** Called when any action is taken */
  onResume?: () => void
}

/**
 * PauseAware
 *
 * Detects inactivity during sensitive flows and gently offers pacing options
 * — without judgement or implied expectation about what the user should do.
 *
 * SAMHSA principle: Empowerment; Peer Support
 * Neurobiological rationale: Lingering on difficult content without support
 * can push users toward hypoarousal or hyperarousal. This component notices
 * the pause and offers a moment of co-regulation.
 *
 * Design note: "Keep going" is always the FIRST and PRIMARY option. This
 * normalises continuing without implying the pause was a problem.
 *
 * @example
 * <PauseAware
 *   message="No rush at all. Would you like to take a break or keep going?"
 *   actions={[
 *     { label: 'Keep going', onClick: () => {}, variant: 'primary' },
 *     { label: 'Save and pause', onClick: () => saveProgress() },
 *     { label: 'Exit safely', onClick: () => exit() },
 *   ]}
 * />
 */
export function PauseAware({
  message = 'No rush at all. Would you like to take a break, save your progress, or keep going?',
  actions,
  thresholdMs,
  className,
  onPause,
  onResume,
}: PauseAwareProps) {
  const config = useTraumaInformed()
  const threshold = thresholdMs ?? config.pauseThresholdMs
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const defaultActions: PauseAwareAction[] = [
    { label: 'Keep going', onClick: () => handleAction(), variant: 'primary' },
    { label: 'Save and pause', onClick: () => handleAction() },
    { label: 'Exit safely', onClick: () => handleAction() },
  ]

  const activeActions = actions ?? defaultActions

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (visible) return
    timerRef.current = setTimeout(() => {
      setVisible(true)
      onPause?.()
    }, threshold)
  }, [threshold, visible, onPause])

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }))
    resetTimer()
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [resetTimer])

  const handleAction = useCallback(() => {
    setVisible(false)
    onResume?.()
    resetTimer()
  }, [onResume, resetTimer])

  if (!visible) return null

  return (
    <div
      data-ti-pause-aware
      role="dialog"
      aria-label="Pacing check-in"
      className={className}
      style={{
        background: '#ECE7DF',
        border: '1px solid #D7D2C8',
        borderRadius: '20px',
        padding: '22px 24px',
        maxWidth: '380px',
      }}
    >
      <p
        style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#8B8F96',
          marginBottom: '12px',
        }}
      >
        You've been here a little while
      </p>
      <p style={{ fontSize: '15px', color: '#2F3134', lineHeight: 1.7, marginBottom: '18px' }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {activeActions.map((action, i) => (
          <Button
            key={i}
            variant={action.variant === 'primary' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              action.onClick()
              handleAction()
            }}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
