import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTraumaInformed } from '../TraumaInformedProvider'
import { Button } from '../Button'

export interface RegretButtonProps {
  /** Controls the visual weight and colour of the trigger button.
   * Use `destructive` for delete / remove / irreversible actions.
   * NEVER use `primary` for both a submit and a delete in the same view. */
  variant?: 'primary' | 'destructive'
  /** The label shown on the primary action button */
  label: string
  /** Called when the user confirms the action (undo window expires without undo) */
  onAction: () => void | Promise<void>
  /** Called when the user clicks Undo — use to reverse the action */
  onUndo?: () => void
  /** Override the undo window from TraumaInformedProvider. Default: 7000ms */
  windowMs?: number
  /** Text shown in the toast. Default: "Action completed" */
  toastMessage?: string
  /** Text on the undo button inside the toast. Default: "Undo" */
  undoLabel?: string
  /** Message shown after a successful undo. Default: "Undone — no harm done" */
  undoneMessage?: string
  /** Icon element rendered inside the button */
  icon?: React.ReactNode
  /** Additional className for the trigger button */
  className?: string
  /** Disable the button */
  disabled?: boolean
}

type State = 'idle' | 'pending' | 'undone'

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
  </svg>
)

const UndoIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 14 4 9 9 4" />
    <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
  </svg>
)

/**
 * RegretButton
 *
 * Wraps any action in a generous undo window, reducing shame when users
 * second-guess a submission, deletion, or disclosure.
 *
 * SAMHSA principle: Empowerment, Voice & Choice
 * Neurobiological rationale: Removing irreversibility reduces threat appraisal
 * and keeps users within their window of tolerance.
 *
 * @example
 * <RegretButton
 *   label="Submit response"
 *   onAction={() => submitForm(data)}
 *   onUndo={() => clearSubmission()}
 *   windowMs={10000}
 * />
 */
export function RegretButton({
  variant = 'primary',
  label,
  onAction,
  onUndo,
  windowMs,
  toastMessage = 'Action completed',
  undoLabel = 'Undo',
  undoneMessage = 'Undone — no harm done',
  icon,
  className,
  disabled = false,
}: RegretButtonProps) {
  const config = useTraumaInformed()
  const duration = windowMs ?? config.regretWindowMs

  const [state, setState] = useState<State>('idle')
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()
    setProgress(0)
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      if (pct >= 1) {
        clearTimer()
        setState('idle')
        onAction()
      }
    }, 50)
  }, [duration, clearTimer, onAction])

  const handleTrigger = useCallback(() => {
    if (disabled || state === 'pending') return
    setState('pending')
    startTimer()
  }, [disabled, state, startTimer])

  const handleUndo = useCallback(() => {
    clearTimer()
    setState('undone')
    onUndo?.()
    // Reset to idle after showing undone message
    setTimeout(() => setState('idle'), 3000)
  }, [clearTimer, onUndo])

  useEffect(() => () => clearTimer(), [clearTimer])

  const circumference = 2 * Math.PI * 11 // r=11
  const dashOffset = circumference * progress

  const resolvedIcon = icon ?? (variant === 'destructive' ? <TrashIcon /> : <UndoIcon />)

  return (
    <div data-ti-regret-button>
      {/* Primary trigger */}
      <Button
        variant={variant}
        onClick={handleTrigger}
        disabled={disabled || state === 'pending'}
        className={className}
        aria-busy={state === 'pending'}
        iconBefore={resolvedIcon}
      >
        {label}
      </Button>

      {/* Undo toast */}
      {state === 'pending' && (
        <div
          role="status"
          aria-live="polite"
          aria-label={`${toastMessage}. ${undoLabel} available for ${Math.ceil(duration / 1000)} seconds.`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: '#3C7F8C',
            color: '#FFFFFF',
            borderRadius: '12px',
            fontSize: '13px',
            maxWidth: '320px',
            marginTop: '14px',
          }}
        >
          {/* Countdown ring */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            aria-hidden="true"
            style={{ flexShrink: 0, transform: 'rotate(-90deg)' }}
          >
            <circle
              cx="14"
              cy="14"
              r="11"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="3"
            />
            <circle
              cx="14"
              cy="14"
              r="11"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 50ms linear' }}
            />
          </svg>

          <span style={{ flex: 1, fontSize: '14px' }}>{toastMessage}</span>

          <button
            onClick={handleUndo}
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              flexShrink: 0,
              minHeight: '36px',
              letterSpacing: '0.01em',
            }}
          >
            {undoLabel}
          </button>
        </div>
      )}

      {/* Undone confirmation */}
      {state === 'undone' && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: '14px',
            padding: '10px 14px',
            background: '#D1E5E8',
            color: '#2D6473',
            borderRadius: '12px',
            fontSize: '13px',
          }}
        >
          ✓ {undoneMessage}
        </div>
      )}
    </div>
  )
}
