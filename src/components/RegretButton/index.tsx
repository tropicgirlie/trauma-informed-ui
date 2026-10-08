import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTraumaInformed } from '../TraumaInformedProvider'

export interface RegretButtonProps {
  /** The label shown on the primary action button */
  label: string
  /** Use destructive styling for deletion and removal actions. */
  variant?: 'primary' | 'destructive'
  /** Called when the user confirms the action (undo window expires without undo) */
  onAction: () => void | Promise<void>
  /** Called when the user clicks Undo before the action runs. */
  onUndo?: () => void
  /** Override the undo window from TraumaInformedProvider. Default: 7000ms */
  windowMs?: number
  /** Text shown during the undo window. Default: "Action will complete shortly" */
  toastMessage?: string
  /** Text on the undo button inside the toast. Default: "Undo" */
  undoLabel?: string
  /** Message shown after cancelling within the undo window. Default: "Cancelled — no harm done" */
  undoneMessage?: string
  /** Icon element rendered inside the button */
  icon?: React.ReactNode
  /** Additional className for the trigger button */
  className?: string
  /** Disable the button */
  disabled?: boolean
}

type State = 'idle' | 'pending' | 'undone'

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
  label,
  variant = 'primary',
  onAction,
  onUndo,
  windowMs,
  toastMessage = 'Action will complete shortly',
  undoLabel = 'Undo',
  undoneMessage = 'Cancelled — no harm done',
  icon = <UndoIcon />,
  className,
  disabled = false,
}: RegretButtonProps) {
  const config = useTraumaInformed()
  const duration = windowMs ?? config.regretWindowMs

  const [state, setState] = useState<State>('idle')
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimeRef = useRef<number>(0)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (resetRef.current) {
      clearTimeout(resetRef.current)
      resetRef.current = null
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
    resetRef.current = setTimeout(() => setState('idle'), 3000)
  }, [clearTimer, onUndo])

  useEffect(() => () => clearTimer(), [clearTimer])

  const circumference = 2 * Math.PI * 11 // r=11
  const dashOffset = circumference * progress

  return (
    <div data-ti-regret-button className="ti-regret-button">
      <button
        onClick={handleTrigger}
        disabled={disabled || state === 'pending'}
        className={['ti-button', variant === 'destructive' ? 'ti-button--destructive' : 'ti-button--primary', className].filter(Boolean).join(' ')}
        aria-busy={state === 'pending'}
      >
        {icon}
        {label}
      </button>

      {state === 'pending' && (
        <div
          role="status"
          aria-live="polite"
          aria-label={`${toastMessage}. ${undoLabel} available for ${Math.ceil(duration / 1000)} seconds.`}
          className="ti-regret-button__toast"
        >
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
              style={{ transition: 'stroke-dashoffset var(--ti-motion-fast)' }}
            />
          </svg>

          <span className="ti-regret-button__toast-message">{toastMessage}</span>

          <button
            onClick={handleUndo}
            className="ti-regret-button__undo"
          >
            {undoLabel}
          </button>
        </div>
      )}

      {state === 'undone' && (
        <div
          role="status"
          aria-live="polite"
          className="ti-regret-button__undone"
        >
          ✓ {undoneMessage}
        </div>
      )}
    </div>
  )
}
