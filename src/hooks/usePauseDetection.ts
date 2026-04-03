import { useCallback, useEffect, useRef, useState } from 'react'

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
    const t = setTimeout(reset, 0)
    return () => {
      clearTimeout(t)
      events.forEach((e) => window.removeEventListener(e, reset))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [reset])

  return { isPaused, reset }
}
