import { useCallback, useEffect, useRef, useState } from 'react'

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
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

export interface UseSafeExitOptions {
  redirectTo?: string
  replaceCurrentEntry?: boolean
  /** @deprecated Use replaceCurrentEntry. */
  clearHistory?: boolean
}

/**
 * useSafeExit
 *
 * Returns an exit function that redirects to a safe destination and optionally
 * replaces the current history entry. Browsers do not allow reliable clearing
 * of prior cross-origin history entries.
 *
 * @example
 * const exit = useSafeExit({ redirectTo: 'https://weather.com' })
 * <button onClick={exit}>Leave safely</button>
 */
export function useSafeExit({
  redirectTo = 'https://weather.com',
  replaceCurrentEntry,
  clearHistory,
}: UseSafeExitOptions = {}) {
  return useCallback(() => {
    if (typeof window === 'undefined') return
    if (replaceCurrentEntry ?? clearHistory ?? true) {
      window.location.replace(redirectTo)
      return
    }
    window.location.assign(redirectTo)
  }, [redirectTo, replaceCurrentEntry, clearHistory])
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
    if (typeof window === 'undefined') return
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
