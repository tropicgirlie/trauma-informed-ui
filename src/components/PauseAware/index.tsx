import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTraumaInformed } from '../TraumaInformedProvider'

export interface PauseAwareAction {
  /** Button label */
  label: string
  /** Handler called when this action is selected */
  onClick: () => void
  /**
   * Visual variant.
   * - primary: filled sage button — used for "Keep going" (always first)
   * - secondary: outlined button (default)
   */
  variant?: 'primary' | 'secondary'
}

export interface PauseAwareProps {
  /**
   * Message shown when inactivity is detected.
   * Default: "No rush at all. Would you like to take a break,
   * save your progress, or keep going?"
   *
   * Language note: the message should be companionate, not apologetic.
   * It should not imply that the pause was a problem or unusual.
   */
  message?: string
  /**
   * Actions to offer. Always put "Keep going" first and as primary.
   * This normalises continuing — the pause is not the expected outcome.
   *
   * If omitted, the default action is: Keep going. Add save or exit actions
   * only when those handlers perform the promised behavior.
   */
  actions?: PauseAwareAction[]
  /**
   * Inactivity threshold in milliseconds before the prompt appears.
   * Overrides the TraumaInformedProvider default (90000ms = 90 seconds).
   */
  thresholdMs?: number
  /**
   * Called when the pause prompt appears.
   * Use for analytics or to pause background timers.
   */
  onPause?: () => void
  /**
   * Called when the user takes any action from the prompt.
   * Use to resume background timers or log resumption.
   */
  onResume?: () => void
  /** Additional className */
  className?: string
  /** Additional inline styles */
  style?: React.CSSProperties
}

/**
 * PauseAware
 *
 * Detects inactivity during sensitive flows and gently offers pacing options
 * without judgement, pressure, or implied expectation.
 *
 * SAMHSA principle: Empowerment, Voice & Choice
 *
 * Neurobiological rationale: Sustained exposure to difficult content without
 * a support signal can push users toward hypoarousal (shutdown/dissociation)
 * or hyperarousal (anxiety/panic). This component acts as a gentle co-regulation
 * cue — acknowledging the user's presence and offering agency over pace.
 *
 * Critical design decision: "Keep going" is ALWAYS the first option and styled
 * as primary. This normalises continuing. Positioning exit or pause first
 * would imply these are the expected or correct responses, which creates subtle
 * coercive pressure.
 *
 * Anti-patterns:
 * - "Are you still there?" — implies the user's absence is a problem
 * - "You've been inactive for 90 seconds" — clinical and shame-adjacent
 * - Making exit the primary action — implies continuing is wrong
 * - Auto-saving and redirecting without asking — removes agency
 *
 * @example
 * <PauseAware
 *   thresholdMs={120000}
 *   actions={[
 *     { label: 'Keep going', onClick: () => {}, variant: 'primary' },
 *     { label: 'Save and come back', onClick: () => saveProgress() },
 *     { label: 'Leave safely', onClick: () => exit() },
 *   ]}
 *   onPause={() => analytics.track('pause_prompt_shown')}
 * />
 */
export function PauseAware({
  message = 'No rush. You can keep going, pause here, or choose another option if one is available.',
  actions,
  thresholdMs,
  onPause,
  onResume,
  className,
  style,
}: PauseAwareProps) {
  const config = useTraumaInformed()
  const threshold = thresholdMs ?? config.pauseThresholdMs
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasTriggeredRef = useRef(false)

  const dismiss = useCallback(() => {
    setVisible(false)
    hasTriggeredRef.current = false
    onResume?.()
  }, [onResume])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (hasTriggeredRef.current) return
    timerRef.current = setTimeout(() => {
      hasTriggeredRef.current = true
      setVisible(true)
      onPause?.()
    }, threshold)
  }, [threshold, onPause])

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
    const handler = () => {
      if (!hasTriggeredRef.current) resetTimer()
    }
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }))
    resetTimer()
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [resetTimer])

  const defaultActions: PauseAwareAction[] = [
    { label: 'Keep going', onClick: dismiss, variant: 'primary' },
  ]

  const activeActions = actions ?? defaultActions

  if (!visible) return null

  return (
    <div
      data-ti-pause-aware
      role="region"
      aria-live="polite"
      aria-label="Pacing check-in"
      className={['ti-surface', 'ti-pause-aware', className].filter(Boolean).join(' ')}
      style={style}
    >
      <p className="ti-eyebrow">
        Pacing Check-In
      </p>

      <p className="ti-copy" style={{ marginBottom: 'var(--ti-space-4)' }}>
        {message}
      </p>

      <div className="ti-pause-aware__actions">
        {activeActions.map((action, i) => (
          <button
            key={i}
            onClick={() => {
              action.onClick()
              dismiss()
            }}
            className={`ti-button ${action.variant === 'primary' ? 'ti-button--primary' : 'ti-button--secondary'}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
