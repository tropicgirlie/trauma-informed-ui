import { useCallback } from 'react'

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
