import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * useReducedMotion
 *
 * Returns true if the user has requested reduced motion via OS settings.
 * Use to disable or simplify animations in any component.
 *
 * @example
 * const prefersReduced = useReducedMotion()
 * const duration = prefersReduced ? 0 : 300
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

// ─────────────────────────────────────────

export interface UseSafeExitOptions {
  redirectTo?: string
  clearHistory?: boolean
}

/**
 * useSafeExit
 *
 * Returns an exit function that redirects to a safe destination and optionally
 * clears browser history. Use when you need programmatic control over the exit.
 *
 * @example
 * const exit = useSafeExit({ redirectTo: 'https://weather.com' })
 * <button onClick={exit}>Leave safely</button>
 */
export function useSafeExit({
  redirectTo = 'https://weather.com',
  clearHistory = true,
}: UseSafeExitOptions = {}) {
  return useCallback(() => {
    if (clearHistory) {
      try {
        const steps = window.history.length
        for (let i = 0; i < steps; i++) {
          window.history.pushState(null, '', redirectTo)
        }
      } catch {
        // history manipulation may be blocked
      }
    }
    window.location.replace(redirectTo)
  }, [redirectTo, clearHistory])
}

// ─────────────────────────────────────────

export interface UsePauseDetectionOptions {
  thresholdMs?: number
  onPause?: () => void
  onResume?: () => void
}

/**
 * usePauseDetection
 *
 * Detects inactivity after a configurable threshold. Returns whether the user
 * is currently in a pause state and a function to manually reset the timer.
 *
 * @example
 * const { isPaused, reset } = usePauseDetection({ thresholdMs: 90000 })
 * if (isPaused) return <PauseAware />
 */
export function usePauseDetection({
  thresholdMs = 90000,
  onPause,
  onResume,
}: UsePauseDetectionOptions = {}) {
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (isPaused) {
      setIsPaused(false)
      onResume?.()
    }
    timerRef.current = setTimeout(() => {
      setIsPaused(true)
      onPause?.()
    }, thresholdMs)
  }, [thresholdMs, isPaused, onPause, onResume])

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [reset])

  return { isPaused, reset }
}
