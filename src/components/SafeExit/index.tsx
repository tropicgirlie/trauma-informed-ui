import React, { useCallback, useEffect } from 'react'
import { useTraumaInformed } from '../TraumaInformedProvider'

export interface SafeExitProps {
  /** URL to redirect to. Overrides provider default. */
  redirectTo?: string
  /** Whether to replace this history entry with the destination. Earlier entries may remain. */
  replaceCurrentEntry?: boolean
  /** @deprecated Use replaceCurrentEntry. This does not clear browser history. */
  clearHistory?: boolean
  /** Label on the exit button. Default: "Leave this page" */
  label?: string
  /** Keyboard shortcut that triggers exit. Default: 'Escape' (double-press) */
  shortcutKey?: string
  /** Number of shortcut presses to trigger. Default: 2 */
  shortcutPresses?: number
  /** Whether to show keyboard shortcut hint beneath button. Default: true */
  showShortcutHint?: boolean
  /** Whether the keyboard shortcut is active. Default: true. Disable for embedded examples. */
  enableShortcut?: boolean
  /** Where to position the button. Default: 'top-right' */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'
  /** Custom className */
  className?: string
  /** Synchronous cleanup just before redirect. Do not rely on an async request completing. */
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
 * A persistent, one-click exit to a neutral destination. Can replace the
 * current history entry, but cannot clear earlier browser history.
 *
 * SAMHSA principle: Safety
 * Neurobiological rationale: Perceived entrapment activates the threat response.
 * A visible, reliable exit path maintains neuroception of safety throughout
 * the session — even if the user never uses it.
 *
 * Design note: The blush colour is a deliberate break from the sage system
 * to make this component immediately distinct without reading as danger/alert.
 *
 * This is a navigation primitive for contexts where someone may need to
 * leave immediately. A production service must also consider session cleanup,
 * loading delay, destination choice, and the limits of browser history control.
 *
 * @example
 * <SafeExit redirectTo="https://weather.com" replaceCurrentEntry position="top-right" />
 */
export function SafeExit({
  redirectTo,
  replaceCurrentEntry,
  clearHistory,
  label = 'Leave this page',
  shortcutKey = 'Escape',
  shortcutPresses = 2,
  showShortcutHint = true,
  enableShortcut = true,
  position = 'top-right',
  className,
  onBeforeExit,
}: SafeExitProps) {
  const config = useTraumaInformed()
  const destination = redirectTo ?? config.defaultSafeRedirect
  const shouldReplaceCurrentEntry = replaceCurrentEntry ?? clearHistory ?? config.clearHistoryOnExit

  const pressCountRef = React.useRef(0)
  const pressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const exit = useCallback(() => {
    onBeforeExit?.()

    if (shouldReplaceCurrentEntry) {
      window.location.replace(destination)
      return
    }

    window.location.assign(destination)
  }, [destination, shouldReplaceCurrentEntry, onBeforeExit])

  // Keyboard shortcut: double-press Escape
  useEffect(() => {
    if (!enableShortcut) return
    const handler = (e: KeyboardEvent) => {
      if (e.key !== shortcutKey) return
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return

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
  }, [shortcutKey, shortcutPresses, exit, enableShortcut])

  return (
    <div
      data-ti-safe-exit
      data-position={position}
      className={['ti-safe-exit', className].filter(Boolean).join(' ')}
      style={position === 'inline' ? positionStyles.inline : undefined}
    >
      <button
        onClick={exit}
        className="ti-button ti-button--safe-exit"
        aria-label={`${label}. Opens ${destination}.`}
      >
        <ExitArrow />
        {label}
      </button>

      {enableShortcut && showShortcutHint && (
        <p
          className="ti-safe-exit__hint"
          aria-hidden="true"
        >
          or press {shortcutKey} twice
        </p>
      )}
    </div>
  )
}
