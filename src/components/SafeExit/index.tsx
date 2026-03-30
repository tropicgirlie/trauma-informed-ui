import React, { useCallback, useEffect } from 'react'
import { useTraumaInformed } from '../TraumaInformedProvider'

export interface SafeExitProps {
  /** URL to redirect to. Overrides provider default. */
  redirectTo?: string
  /** Whether to clear browser history entries before redirect. Overrides provider default. */
  clearHistory?: boolean
  /** Label on the exit button. Default: "Leave this page safely" */
  label?: string
  /** Keyboard shortcut that triggers exit. Default: 'Escape' (double-press) */
  shortcutKey?: string
  /** Number of shortcut presses to trigger. Default: 2 */
  shortcutPresses?: number
  /** Whether to show keyboard shortcut hint beneath button. Default: true */
  showShortcutHint?: boolean
  /** Where to position the button. Default: 'top-right' */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'
  /** Custom className */
  className?: string
  /** Called just before redirect fires — useful for analytics or cleanup */
  onBeforeExit?: () => void
}

const ExitArrow = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const positionStyles: Record<string, React.CSSProperties> = {
  'top-right': { position: 'fixed', top: '16px', right: '16px', zIndex: 9999 },
  'top-left': { position: 'fixed', top: '16px', left: '16px', zIndex: 9999 },
  'bottom-right': { position: 'fixed', bottom: '16px', right: '16px', zIndex: 9999 },
  'bottom-left': { position: 'fixed', bottom: '16px', left: '16px', zIndex: 9999 },
  inline: { position: 'relative' },
}

/**
 * SafeExit
 *
 * A persistent, one-click exit to a neutral destination. Optionally clears
 * browser history so the page cannot be easily found again.
 *
 * SAMHSA principle: Safety
 * Neurobiological rationale: Perceived entrapment activates the threat response.
 * A visible, reliable exit path maintains neuroception of safety throughout
 * the session — even if the user never uses it.
 *
 * Design note: The blush colour is a deliberate break from the sage system
 * to make this component immediately distinct without reading as danger/alert.
 *
 * Origins: This pattern was developed specifically for domestic violence
 * resource sites where a user may need to leave immediately if an abuser
 * enters the room. The CHI 2023 study "Click Here to Exit" found it present
 * on 80.3% of 2,045 DV support sites — but implementations vary widely in
 * effectiveness. This component implements the recommended specification.
 *
 * @example
 * <SafeExit redirectTo="https://weather.com" clearHistory position="top-right" />
 */
export function SafeExit({
  redirectTo,
  clearHistory,
  label = 'Leave this page safely',
  shortcutKey = 'Escape',
  shortcutPresses = 2,
  showShortcutHint = true,
  position = 'top-right',
  className,
  onBeforeExit,
}: SafeExitProps) {
  const config = useTraumaInformed()
  const destination = redirectTo ?? config.defaultSafeRedirect
  const shouldClearHistory = clearHistory ?? config.clearHistoryOnExit

  const pressCountRef = React.useRef(0)
  const pressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const exit = useCallback(() => {
    onBeforeExit?.()

    if (shouldClearHistory) {
      // Replace all history entries with the safe destination
      // This prevents the back button from returning to the original page
      const steps = window.history.length
      window.location.replace(destination)
      try {
        for (let i = 0; i < steps; i++) {
          window.history.pushState(null, '', destination)
        }
      } catch {
        // history manipulation may be blocked in some contexts
      }
    }

    window.location.replace(destination)
  }, [destination, shouldClearHistory, onBeforeExit])

  // Keyboard shortcut: double-press Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== shortcutKey) return

      pressCountRef.current += 1

      if (pressTimerRef.current) clearTimeout(pressTimerRef.current)

      if (pressCountRef.current >= shortcutPresses) {
        pressCountRef.current = 0
        exit()
        return
      }

      pressTimerRef.current = setTimeout(() => {
        pressCountRef.current = 0
      }, 800)
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current)
    }
  }, [shortcutKey, shortcutPresses, exit])

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 18px',
    minHeight: '44px',
    background: '#B06565',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 500,
    letterSpacing: '0.01em',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'opacity 150ms ease',
  }

  return (
    <div
      style={positionStyles[position]}
      data-ti-safe-exit
      className={className}
    >
      <button
        onClick={exit}
        style={buttonStyle}
        aria-label={`${label} — opens ${destination}`}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.85')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
      >
        <ExitArrow />
        {label}
      </button>

      {showShortcutHint && (
        <p
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.75)',
            marginTop: '5px',
            textAlign: 'center',
          }}
          aria-hidden="true"
        >
          or press {shortcutKey} twice
        </p>
      )}
    </div>
  )
}
